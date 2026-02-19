import nodemailer from "nodemailer";
import { config } from "./config.js";

let transporter = null;

function getTransporter() {
  if (!config.smtpHost || !config.smtpUser || !config.smtpPass || !config.emailFrom) {
    throw new Error("SMTP config is incomplete. Set SMTP_HOST, SMTP_USER, SMTP_PASS, and EMAIL_FROM.");
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: config.smtpPort,
      secure: config.smtpSecure,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass
      }
    });
  }

  return transporter;
}

function buildReadyForReviewMessage(payload) {
  const { coach, question, applicant } = payload;
  if (!coach?.email) {
    throw new Error("Coach email is required for question_ready_for_review event.");
  }

  const applicantLine = applicant?.name || applicant?.email
    ? `${applicant?.name || "Applicant"} (${applicant?.email || "no email provided"})`
    : "Applicant";

  return {
    to: coach.email,
    subject: `Charter app response ready for review: ${question?.title || "Untitled question"}`,
    text: [
      `Hello ${coach?.name || "Coach"},`,
      "",
      `${applicantLine} marked a section ready for your rubric review.`,
      `Question: ${question?.title || "Untitled question"}`,
      `Section: ${question?.section || "Unknown section"}`,
      "",
      "Please review in the TN Incubator Charter Application App.",
      ""
    ].join("\n")
  };
}

function buildCoachCompletedMessage(payload) {
  const { applicant, question, review } = payload;
  if (!applicant?.email) {
    throw new Error("Applicant email is missing for coach completion notification.");
  }

  const scoreLabel = review?.score === "meet"
    ? "Meet Standard"
    : review?.score === "partial"
      ? "Partially Meet Standard"
      : "Do Not Meet Standard";

  return {
    to: applicant.email,
    subject: `Coach review completed: ${question?.title || "Untitled question"}`,
    text: [
      `Hello ${applicant?.name || "Applicant"},`,
      "",
      `Your response for "${question?.title || "this section"}" was reviewed.`,
      `Score: ${scoreLabel}`,
      `Coach feedback: ${review?.comment || "No written comment provided."}`,
      "",
      "Please return to the app to revise if needed.",
      ""
    ].join("\n")
  };
}

export async function sendEventEmail(event, payload) {
  const message = event === "question_ready_for_review"
    ? buildReadyForReviewMessage(payload)
    : event === "coach_review_completed"
      ? buildCoachCompletedMessage(payload)
      : null;

  if (!message) {
    throw new Error(`Unsupported event: ${event}`);
  }

  return sendEmailMessage({
    to: message.to,
    subject: message.subject,
    text: message.text
  });
}

export async function sendEmailMessage({ to, subject, text }) {
  const tx = getTransporter();
  const info = await tx.sendMail({
    from: config.emailFrom,
    to,
    subject,
    text
  });

  return {
    messageId: info.messageId,
    accepted: info.accepted
  };
}

export async function sendLoginAlertEmail({ to, user, requestMeta }) {
  const subject = `Login Alert: ${user?.email || "unknown user"}`;
  const text = [
    "A user logged into the TN Incubator Charter Application App.",
    "",
    `Name: ${user?.name || "Unknown"}`,
    `Email: ${user?.email || "Unknown"}`,
    `Role: ${user?.role || "user"}`,
    `Time (UTC): ${new Date().toISOString()}`,
    `IP: ${requestMeta?.ip || "Unknown"}`,
    `User-Agent: ${requestMeta?.userAgent || "Unknown"}`,
    `Origin: ${requestMeta?.origin || "Unknown"}`,
    "",
    "Please review and approve this user as needed."
  ].join("\n");

  return sendEmailMessage({ to, subject, text });
}
