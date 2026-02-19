window.SURVEY_CONFIG = {
  // Local backend endpoint for AI drafting/scoring/improving.
  AI_ENDPOINT: "http://localhost:8787/ai",

  // Optional fallback (browser-direct OpenAI call; not recommended for production).
  OPENAI_API_KEY: "",
  OPENAI_MODEL: "gpt-4o-mini",

  // Local backend endpoint that sends coach/applicant emails.
  NOTIFICATION_WEBHOOK_URL: "http://localhost:8787/notify",

  // Local backend endpoint that creates Google Docs and returns a URL.
  GOOGLE_DOC_WEBHOOK_URL: "http://localhost:8787/google-doc",

  // Optional: direct URL to editable budget sheet template.
  BUDGET_SHEET_URL: ""
};
