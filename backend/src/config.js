import dotenv from "dotenv";

dotenv.config();

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

export const config = {
  port: Number(process.env.PORT || 8787),
  allowedOrigin: process.env.ALLOWED_ORIGIN || "*",
  allowedOrigins: (process.env.ALLOWED_ORIGIN || "*")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  openaiModel: process.env.OPENAI_MODEL || "gpt-4o-mini",
  jwtSecret: process.env.JWT_SECRET || "",
  adminEmail: process.env.ADMIN_EMAIL || "",
  loginAlertEnabled: String(process.env.LOGIN_ALERT_ENABLED || "true") === "true",
  loginAlertEmail: process.env.LOGIN_ALERT_EMAIL || "scott@nashvilleincubator.org",
  smtpHost: process.env.SMTP_HOST || "",
  smtpPort: Number(process.env.SMTP_PORT || 587),
  smtpSecure: String(process.env.SMTP_SECURE || "false") === "true",
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
  emailFrom: process.env.EMAIL_FROM || "",
  googleServiceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
  googleServiceAccountPrivateKey: (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  googleDriveFolderId: process.env.GOOGLE_DRIVE_FOLDER_ID || "",
  googleDocShareWith: process.env.GOOGLE_DOC_SHARE_WITH || ""
};

export function requireGoogleConfig() {
  return {
    clientEmail: required("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
    privateKey: required("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(/\\n/g, "\n")
  };
}
