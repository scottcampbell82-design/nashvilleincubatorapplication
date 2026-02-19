import { google } from "googleapis";
import { config } from "./config.js";

function getAuth() {
  if (!config.googleServiceAccountEmail || !config.googleServiceAccountPrivateKey) {
    throw new Error("Google service account config missing.");
  }

  return new google.auth.JWT({
    email: config.googleServiceAccountEmail,
    key: config.googleServiceAccountPrivateKey,
    scopes: [
      "https://www.googleapis.com/auth/documents",
      "https://www.googleapis.com/auth/drive"
    ]
  });
}

export async function createGoogleDoc({ title, body }) {
  if (!title || !body) {
    throw new Error("title and body are required");
  }

  const auth = getAuth();
  const docs = google.docs({ version: "v1", auth });
  const drive = google.drive({ version: "v3", auth });

  const created = await docs.documents.create({
    requestBody: { title }
  });

  const documentId = created.data.documentId;
  if (!documentId) {
    throw new Error("Failed to create Google Doc");
  }

  await docs.documents.batchUpdate({
    documentId,
    requestBody: {
      requests: [
        {
          insertText: {
            location: { index: 1 },
            text: body
          }
        }
      ]
    }
  });

  if (config.googleDriveFolderId) {
    await drive.files.update({
      fileId: documentId,
      addParents: config.googleDriveFolderId,
      removeParents: "root",
      fields: "id, parents"
    });
  }

  if (config.googleDocShareWith) {
    await drive.permissions.create({
      fileId: documentId,
      requestBody: {
        type: "user",
        role: "writer",
        emailAddress: config.googleDocShareWith
      },
      sendNotificationEmail: false
    });
  }

  return {
    documentId,
    url: `https://docs.google.com/document/d/${documentId}/edit`
  };
}
