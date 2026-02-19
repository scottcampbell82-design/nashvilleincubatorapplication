import { readStore, uid, withStore } from "./store.js";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

export function canAccessApplication(user, app) {
  if (!user || !app) return false;
  if (user.role === "admin") return true;
  if (app.ownerUserId === user.id) return true;
  const emails = (app.coaches || []).map((c) => normalizeEmail(c.email));
  return emails.includes(normalizeEmail(user.email));
}

export function listApplicationsForUser(user) {
  const store = readStore();
  return store.applications
    .filter((app) => canAccessApplication(user, app))
    .map((app) => ({
      id: app.id,
      schoolName: app.schoolName,
      ownerUserId: app.ownerUserId,
      coaches: app.coaches || [],
      updatedAt: app.updatedAt,
      createdAt: app.createdAt
    }));
}

export function createApplication({ user, schoolName }) {
  if (!schoolName) {
    throw new Error("schoolName is required");
  }

  return withStore((store) => {
    const app = {
      id: uid("app"),
      schoolName,
      ownerUserId: user.id,
      coaches: [],
      state: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.applications.push(app);
    return app;
  });
}

export function getApplicationById({ user, id }) {
  const store = readStore();
  const app = store.applications.find((a) => a.id === id);
  if (!app) {
    throw new Error("Application not found");
  }
  if (!canAccessApplication(user, app)) {
    throw new Error("Access denied");
  }
  return app;
}

export function updateApplicationState({ user, id, state }) {
  return withStore((store) => {
    const app = store.applications.find((a) => a.id === id);
    if (!app) {
      throw new Error("Application not found");
    }
    if (!canAccessApplication(user, app)) {
      throw new Error("Access denied");
    }

    app.state = state;
    if (state?.style?.schoolName) {
      app.schoolName = state.style.schoolName;
    }
    app.updatedAt = new Date().toISOString();
    return app;
  });
}

export function addCoachToApplication({ user, applicationId, coach }) {
  if (!coach?.email) {
    throw new Error("Coach email is required");
  }

  return withStore((store) => {
    const app = store.applications.find((a) => a.id === applicationId);
    if (!app) {
      throw new Error("Application not found");
    }
    if (!(user.role === "admin" || app.ownerUserId === user.id)) {
      throw new Error("Only owner/admin can manage coaches");
    }

    const normalizedEmail = normalizeEmail(coach.email);
    const existing = (app.coaches || []).find((c) => normalizeEmail(c.email) === normalizedEmail);
    if (!existing) {
      app.coaches = app.coaches || [];
      if (app.coaches.length >= 8) {
        throw new Error("Maximum of 8 coaches per application");
      }

      app.coaches.push({
        id: uid("coach"),
        name: coach.name || normalizedEmail,
        email: normalizedEmail,
        addedAt: new Date().toISOString()
      });
      app.updatedAt = new Date().toISOString();
    }

    return app;
  });
}

export function removeCoachFromApplication({ user, applicationId, coachId }) {
  return withStore((store) => {
    const app = store.applications.find((a) => a.id === applicationId);
    if (!app) {
      throw new Error("Application not found");
    }
    if (!(user.role === "admin" || app.ownerUserId === user.id)) {
      throw new Error("Only owner/admin can manage coaches");
    }

    app.coaches = (app.coaches || []).filter((c) => c.id !== coachId);
    app.updatedAt = new Date().toISOString();
    return app;
  });
}

export function saveGeneratedDoc({ user, applicationId, title, url, documentId, sections }) {
  return withStore((store) => {
    const app = store.applications.find((a) => a.id === applicationId);
    if (!app) {
      throw new Error("Application not found");
    }
    if (!canAccessApplication(user, app)) {
      throw new Error("Access denied");
    }

    const doc = {
      id: uid("doc"),
      applicationId,
      title,
      url,
      documentId,
      sections: Array.isArray(sections) ? sections : [],
      createdByUserId: user.id,
      createdAt: new Date().toISOString()
    };

    store.docs.push(doc);
    app.updatedAt = new Date().toISOString();
    return doc;
  });
}

export function upsertMasterDocRecord({ user, applicationId, title, url, documentId, sections }) {
  return withStore((store) => {
    const app = store.applications.find((a) => a.id === applicationId);
    if (!app) {
      throw new Error("Application not found");
    }
    if (!canAccessApplication(user, app)) {
      throw new Error("Access denied");
    }

    const existing = store.docs.find((d) => d.applicationId === applicationId && d.isMaster === true);
    const now = new Date().toISOString();

    if (existing) {
      existing.title = title;
      existing.url = url;
      existing.documentId = documentId;
      existing.sections = Array.isArray(sections) ? sections : [];
      existing.updatedAt = now;
      app.updatedAt = now;
      return existing;
    }

    const doc = {
      id: uid("doc"),
      applicationId,
      title,
      url,
      documentId,
      sections: Array.isArray(sections) ? sections : [],
      createdByUserId: user.id,
      createdAt: now,
      updatedAt: now,
      isMaster: true
    };

    store.docs.push(doc);
    app.updatedAt = now;
    return doc;
  });
}

export function listDocsForApplication({ user, applicationId }) {
  const store = readStore();
  const app = store.applications.find((a) => a.id === applicationId);
  if (!app) {
    throw new Error("Application not found");
  }
  if (!canAccessApplication(user, app)) {
    throw new Error("Access denied");
  }

  return store.docs
    .filter((d) => d.applicationId === applicationId)
    .sort((a, b) => {
      const ad = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const bd = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return bd - ad;
    });
}

export function getAdminOverview() {
  const store = readStore();

  const users = store.users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt
  }));

  const applications = store.applications.map((a) => ({
    id: a.id,
    schoolName: a.schoolName,
    ownerUserId: a.ownerUserId,
    coachCount: (a.coaches || []).length,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt
  }));

  const docs = store.docs.map((d) => ({
    id: d.id,
    applicationId: d.applicationId,
    title: d.title,
    url: d.url,
    documentId: d.documentId,
    createdByUserId: d.createdByUserId,
    createdAt: d.createdAt,
    sections: d.sections || []
  }));

  return { users, applications, docs };
}
