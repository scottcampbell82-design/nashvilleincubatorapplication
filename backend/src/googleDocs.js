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

function normalizeEmails(emails) {
  return [...new Set((emails || [])
    .map((e) => String(e || "").trim().toLowerCase())
    .filter(Boolean))];
}

async function ensureFilePermissions({ drive, fileId, emails }) {
  const targets = normalizeEmails(emails);
  for (const email of targets) {
    try {
      await drive.permissions.create({
        fileId,
        requestBody: {
          type: "user",
          role: "writer",
          emailAddress: email
        },
        sendNotificationEmail: false
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error || "");
      if (!msg.includes("already has")) {
        throw error;
      }
    }
  }
}

export async function createGoogleDoc({ title, body, sharedEmails = [] }) {
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

  await ensureFilePermissions({
    drive,
    fileId: documentId,
    emails: [...sharedEmails, config.googleDocShareWith]
  });

  return {
    documentId,
    url: `https://docs.google.com/document/d/${documentId}/edit`
  };
}

export async function updateGoogleDoc({ documentId, title, body, sharedEmails = [] }) {
  if (!documentId || !body) {
    throw new Error("documentId and body are required");
  }

  const auth = getAuth();
  const docs = google.docs({ version: "v1", auth });
  const drive = google.drive({ version: "v3", auth });

  const current = await docs.documents.get({ documentId });
  const endIndex = current.data.body?.content?.at(-1)?.endIndex || 1;
  const deleteEnd = Math.max(1, endIndex - 1);

  const requests = [];
  if (deleteEnd > 1) {
    requests.push({
      deleteContentRange: {
        range: { startIndex: 1, endIndex: deleteEnd }
      }
    });
  }

  requests.push({
    insertText: {
      location: { index: 1 },
      text: body
    }
  });

  await docs.documents.batchUpdate({
    documentId,
    requestBody: { requests }
  });

  if (title) {
    await drive.files.update({
      fileId: documentId,
      requestBody: { name: title }
    });
  }

  await ensureFilePermissions({
    drive,
    fileId: documentId,
    emails: [...sharedEmails, config.googleDocShareWith]
  });

  return {
    documentId,
    url: `https://docs.google.com/document/d/${documentId}/edit`
  };
}
