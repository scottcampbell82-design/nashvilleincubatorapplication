import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { runAiTask } from "./ai.js";
import { buildResetEmailContent } from "./devMailer.js";
import { sendEmailMessage, sendEventEmail, sendLoginAlertEmail } from "./email.js";
import { createGoogleDoc } from "./googleDocs.js";
import {
  addCoachToApplication,
  createApplication,
  getAdminOverview,
  getApplicationById,
  listApplicationsForUser,
  listDocsForApplication,
  removeCoachFromApplication,
  saveGeneratedDoc,
  updateApplicationState
} from "./applications.js";
import {
  authenticateRequest,
  loginUser,
  registerUser,
  requestPasswordReset,
  requireAdmin,
  resetPassword
} from "./auth.js";

const app = express();
app.set("trust proxy", true);

app.use(cors({
  origin(origin, callback) {
    // Allow server-to-server calls and local file:// testing (no origin header).
    if (!origin) {
      callback(null, true);
      return;
    }

    // Wildcard allows all origins.
    if (config.allowedOrigin === "*" || config.allowedOrigins.includes("*")) {
      callback(null, true);
      return;
    }

    if (config.allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked origin: ${origin}`));
  }
}));
app.use(express.json({ limit: "3mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "tn-incubator-charter-backend" });
});

async function notifyLoginAlert(user, req) {
  if (!config.loginAlertEnabled || !config.loginAlertEmail) {
    return;
  }

  const ipHeader = req.headers["x-forwarded-for"];
  const forwardedIp = Array.isArray(ipHeader) ? ipHeader[0] : String(ipHeader || "").split(",")[0].trim();

  try {
    await sendLoginAlertEmail({
      to: config.loginAlertEmail,
      user,
      requestMeta: {
        ip: forwardedIp || req.ip || "Unknown",
        userAgent: req.headers["user-agent"] || "Unknown",
        origin: req.headers.origin || "Unknown"
      }
    });
  } catch (error) {
    console.warn("Login alert email failed:", error instanceof Error ? error.message : error);
  }
}

app.post("/auth/register", async (req, res) => {
  try {
    const user = registerUser(req.body || {});
    const login = loginUser({ email: user.email, password: req.body?.password });
    await notifyLoginAlert(login.user, req);
    res.json(login);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Registration failed" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const result = loginUser(req.body || {});
    await notifyLoginAlert(result.user, req);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Login failed" });
  }
});

app.post("/auth/forgot-password", async (req, res) => {
  try {
    const result = requestPasswordReset(req.body || {});

    if (result.resetToken && config.smtpHost && config.smtpUser && config.smtpPass && config.emailFrom) {
      const msg = buildResetEmailContent({ name: result.name, resetToken: result.resetToken });
      await sendEmailMessage({
        to: result.email,
        subject: msg.subject,
        text: msg.text
      });
    }

    res.json({
      ok: true,
      message: "If the email exists, a reset message has been sent.",
      devResetToken: config.smtpHost ? undefined : result.resetToken || undefined
    });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Forgot-password failed" });
  }
});

app.post("/auth/reset-password", (req, res) => {
  try {
    const result = resetPassword(req.body || {});
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Reset-password failed" });
  }
});

app.get("/auth/me", authenticateRequest, (req, res) => {
  res.json({ user: req.user });
});

app.post("/ai", authenticateRequest, async (req, res) => {
  try {
    const output = await runAiTask(req.body || {});
    res.json({ output });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "AI endpoint failed" });
  }
});

app.get("/applications", authenticateRequest, (req, res) => {
  try {
    const apps = listApplicationsForUser(req.user);
    res.json({ applications: apps });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to list applications" });
  }
});

app.post("/applications", authenticateRequest, (req, res) => {
  try {
    const application = createApplication({
      user: req.user,
      schoolName: req.body?.schoolName || "Untitled School"
    });
    res.json({ application });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to create application" });
  }
});

app.get("/applications/:id", authenticateRequest, (req, res) => {
  try {
    const application = getApplicationById({ user: req.user, id: req.params.id });
    const docs = listDocsForApplication({ user: req.user, applicationId: req.params.id });
    res.json({ application, docs });
  } catch (error) {
    res.status(404).json({ error: error instanceof Error ? error.message : "Application not found" });
  }
});

app.put("/applications/:id/state", authenticateRequest, (req, res) => {
  try {
    const application = updateApplicationState({
      user: req.user,
      id: req.params.id,
      state: req.body?.state || null
    });
    res.json({ application });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to update application state" });
  }
});

app.post("/applications/:id/coaches", authenticateRequest, (req, res) => {
  try {
    const application = addCoachToApplication({
      user: req.user,
      applicationId: req.params.id,
      coach: req.body || {}
    });
    res.json({ application });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to add coach" });
  }
});

app.delete("/applications/:id/coaches/:coachId", authenticateRequest, (req, res) => {
  try {
    const application = removeCoachFromApplication({
      user: req.user,
      applicationId: req.params.id,
      coachId: req.params.coachId
    });
    res.json({ application });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to remove coach" });
  }
});

app.post("/notify", authenticateRequest, async (req, res) => {
  try {
    const event = req.body?.event;
    const payload = req.body?.payload || {};

    if (!payload.applicationId) {
      return res.status(400).json({ error: "applicationId is required in payload" });
    }

    getApplicationById({ user: req.user, id: payload.applicationId });
    const result = await sendEventEmail(event, payload);
    return res.json({ ok: true, result });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: error instanceof Error ? error.message : "Notification endpoint failed"
    });
  }
});

app.post("/applications/:id/google-doc", authenticateRequest, async (req, res) => {
  try {
    getApplicationById({ user: req.user, id: req.params.id });

    const { title, body, sections } = req.body || {};
    const created = await createGoogleDoc({ title, body });

    saveGeneratedDoc({
      user: req.user,
      applicationId: req.params.id,
      title,
      url: created.url,
      documentId: created.documentId,
      sections
    });

    res.json(created);
  } catch (error) {
    res.status(400).json({
      error: error instanceof Error ? error.message : "Google doc endpoint failed"
    });
  }
});

app.post("/google-doc", authenticateRequest, async (req, res) => {
  try {
    const { applicationId, title, body, sections } = req.body || {};
    if (!applicationId) {
      return res.status(400).json({ error: "applicationId is required" });
    }

    getApplicationById({ user: req.user, id: applicationId });
    const created = await createGoogleDoc({ title, body });

    saveGeneratedDoc({
      user: req.user,
      applicationId,
      title,
      url: created.url,
      documentId: created.documentId,
      sections
    });

    return res.json(created);
  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : "Google doc endpoint failed"
    });
  }
});

app.get("/admin/overview", authenticateRequest, requireAdmin, (req, res) => {
  try {
    const overview = getAdminOverview();
    res.json(overview);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : "Failed to load admin overview" });
  }
});

app.listen(config.port, () => {
  console.log(`TN backend listening on http://localhost:${config.port}`);
});
