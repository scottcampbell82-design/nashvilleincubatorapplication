export function buildResetEmailContent({ name, resetToken }) {
  return {
    subject: "TN Charter App password reset",
    text: [
      `Hello ${name || "User"},`,
      "",
      "Use this reset token to set a new password:",
      resetToken,
      "",
      "This token expires in 30 minutes."
    ].join("\n")
  };
}
