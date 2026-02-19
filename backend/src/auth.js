import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "./config.js";
import { readStore, uid, withStore } from "./store.js";

function jwtSecret() {
  if (!config.jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }
  return config.jwtSecret;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function roleForEmail(email) {
  const normalized = normalizeEmail(email);
  return config.adminEmail && normalized === normalizeEmail(config.adminEmail) ? "admin" : "user";
}

export function registerUser({ name, email, password }) {
  const normalizedEmail = normalizeEmail(email);
  if (!name || !normalizedEmail || !password || password.length < 8) {
    throw new Error("Name, email, and password (8+ chars) are required.");
  }

  return withStore((store) => {
    const existing = store.users.find((u) => normalizeEmail(u.email) === normalizedEmail);
    if (existing) {
      throw new Error("Email is already registered.");
    }

    const user = {
      id: uid("user"),
      name: String(name).trim(),
      email: normalizedEmail,
      passwordHash: bcrypt.hashSync(password, 10),
      role: roleForEmail(normalizedEmail),
      createdAt: new Date().toISOString(),
      lastLoginAt: null,
      resetTokenHash: null,
      resetTokenExpiresAt: null
    };

    store.users.push(user);
    return sanitizeUser(user);
  });
}

export function loginUser({ email, password }) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required.");
  }

  return withStore((store) => {
    const user = store.users.find((u) => normalizeEmail(u.email) === normalizedEmail);
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      throw new Error("Invalid email or password.");
    }

    user.lastLoginAt = new Date().toISOString();
    const token = signToken(user);
    return { token, user: sanitizeUser(user) };
  });
}

function signToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      role: user.role,
      email: user.email,
      name: user.name
    },
    jwtSecret(),
    { expiresIn: "7d" }
  );
}

export function authenticateRequest(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    if (!token) {
      return res.status(401).json({ error: "Missing auth token" });
    }

    const decoded = jwt.verify(token, jwtSecret());
    const store = readStore();
    const user = store.users.find((u) => u.id === decoded.sub);
    if (!user) {
      return res.status(401).json({ error: "Invalid auth token" });
    }

    req.user = sanitizeUser(user);
    return next();
  } catch {
    return res.status(401).json({ error: "Invalid auth token" });
  }
}

export function requestPasswordReset({ email }) {
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail) {
    throw new Error("Email is required.");
  }

  return withStore((store) => {
    const user = store.users.find((u) => normalizeEmail(u.email) === normalizedEmail);
    if (!user) {
      return { ok: true, resetToken: null, email: normalizedEmail };
    }

    const token = crypto.randomBytes(20).toString("hex");
    const hash = crypto.createHash("sha256").update(token).digest("hex");
    user.resetTokenHash = hash;
    user.resetTokenExpiresAt = new Date(Date.now() + 1000 * 60 * 30).toISOString();

    return { ok: true, resetToken: token, email: user.email, name: user.name };
  });
}

export function resetPassword({ token, newPassword }) {
  if (!token || !newPassword || newPassword.length < 8) {
    throw new Error("Reset token and new password (8+ chars) are required.");
  }

  const hash = crypto.createHash("sha256").update(token).digest("hex");

  return withStore((store) => {
    const now = Date.now();
    const user = store.users.find((u) => {
      if (!u.resetTokenHash || !u.resetTokenExpiresAt) return false;
      return u.resetTokenHash === hash && new Date(u.resetTokenExpiresAt).getTime() > now;
    });

    if (!user) {
      throw new Error("Invalid or expired reset token.");
    }

    user.passwordHash = bcrypt.hashSync(newPassword, 10);
    user.resetTokenHash = null;
    user.resetTokenExpiresAt = null;

    return { ok: true };
  });
}

export function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt
  };
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  return next();
}
