window.SURVEY_CONFIG = {
  // Deploy this to your public backend URL, e.g. https://api.yourapp.com
  // If blank, frontend tries same-origin /api in browser-hosted deployments.
  BACKEND_BASE_URL: "",

  // Optional explicit endpoint overrides (usually leave blank when using BACKEND_BASE_URL).
  AI_ENDPOINT: "",

  // Optional browser-direct OpenAI fallback (not recommended for production).
  OPENAI_API_KEY: "",
  OPENAI_MODEL: "gpt-4o-mini",

  NOTIFICATION_WEBHOOK_URL: "",
  GOOGLE_DOC_WEBHOOK_URL: "",

  // Optional: direct URL to editable budget sheet template.
  BUDGET_SHEET_URL: ""
};
