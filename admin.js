import { firebaseConfig } from "./admin-firebase-config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  addDoc,
  setDoc,
  getDocs,
  limit,
  where,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ADMIN_PASS = "momemo";
const ADMIN_UNLOCK_KEY = "ws_admin_gate_unlocked";
const ADMIN_UNLOCK_DAYS = 30;

const gateCard = document.getElementById("gateCard");
const gateForm = document.getElementById("gateForm");
const gatePass = document.getElementById("gatePass");
const gateMsg = document.getElementById("gateMsg");

const adminBadge = document.getElementById("adminBadge");
const logoutBtn = document.getElementById("logoutBtn");
const dashboard = document.getElementById("dashboard");

const statUsers = document.getElementById("statUsers");
const statLessons = document.getElementById("statLessons");
const statTasks = document.getElementById("statTasks");
const statTests = document.getElementById("statTests");
const statChats = document.getElementById("statChats");

const usersList = document.getElementById("usersList");
const lessonsList = document.getElementById("lessonsList");
const tasksList = document.getElementById("tasksList");
const testsList = document.getElementById("testsList");
const adminChatList = document.getElementById("adminChatList");
const adminChatHeader = document.getElementById("adminChatHeader");
const adminChatMessages = document.getElementById("adminChatMessages");
const adminChatForm = document.getElementById("adminChatForm");
const adminChatInput = document.getElementById("adminChatInput");
const adminChatStartForm = document.getElementById("adminChatStartForm");
const adminChatEmail = document.getElementById("adminChatEmail");
const slidersList = document.getElementById("slidersList");
const brandingForm = document.getElementById("brandingForm");
const faviconUrl = document.getElementById("faviconUrl");
const logoUrl = document.getElementById("logoUrl");
const webviewUrl = document.getElementById("webviewUrl");
const brandingMsg = document.getElementById("brandingMsg");

const sliderForm = document.getElementById("sliderForm");
const sliderTitle = document.getElementById("sliderTitle");
const sliderText = document.getElementById("sliderText");
const sliderHighlight = document.getElementById("sliderHighlight");
const sliderOrder = document.getElementById("sliderOrder");

let unlocked = false;
let unsubUsers = null;
let unsubLessons = null;
let unsubTasks = null;
let unsubTests = null;
let unsubChats = null;
let unsubAdminMessages = null;
let selectedAdminChat = null;
let unsubSliders = null;

function setMsg(el, message, isError = false) {
  el.textContent = message;
  el.style.color = isError ? "#fca5a5" : "#86efac";
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(ts) {
  const date = ts?.toDate ? ts.toDate() : new Date();
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function resetRealtime() {
  if (unsubUsers) unsubUsers();
  if (unsubLessons) unsubLessons();
  if (unsubTasks) unsubTasks();
  if (unsubTests) unsubTests();
  if (unsubChats) unsubChats();
  if (unsubSliders) unsubSliders();
  if (unsubAdminMessages) unsubAdminMessages();
}

function startRealtime() {
  unsubUsers = onSnapshot(query(collection(db, "users"), orderBy("createdAt", "desc")), (snapshot) => {
    statUsers.textContent = String(snapshot.size);
    usersList.innerHTML = snapshot.docs
      .map((docItem) => {
        const data = docItem.data();
        return `
          <div class="list-item">
            <strong>${escapeHtml(data.displayName || "User")}</strong>
            <p>${escapeHtml(data.email || "")}</p>
            <small>${escapeHtml(data.role || "unknown")} · ${escapeHtml(data.grade || "")}</small>
            <small>Status: ${escapeHtml(data.status || "pending")}</small>
            <small>Requested: ${escapeHtml(data.roleRequested || "")}</small>
            <small>Phone: ${escapeHtml(data.phone || "")}</small>
            <small>Degree: ${escapeHtml(data.degree || "")}</small>
            <small>Classes: ${escapeHtml(data.classes || "")}</small>
            <small>Experience: ${escapeHtml(data.experience || "")}</small>
            <small>Notes: ${escapeHtml(data.notes || "")}</small>
            <small>Free Access: ${data.freeAccess ? "Yes" : "No"}</small>
            <small>Fee Approved: ${data.feeApproved ? "Yes" : "No"}</small>
            <small>Manual Verified: ${data.manualEmailVerified ? "Yes" : "No"}</small>
            <label class="muted">Score</label>
            <input data-score-id="${docItem.id}" type="number" placeholder="Score" value="${data.score ?? ""}" />
            <div>
              <button type="button" data-action="approve" data-id="${docItem.id}" data-role="${escapeHtml(data.roleRequested || data.role || "student")}">Approve</button>
              <button type="button" data-action="approve-free" data-id="${docItem.id}" data-role="${escapeHtml(data.roleRequested || data.role || "student")}">Approve Free</button>
              <button type="button" data-action="approve-fee" data-id="${docItem.id}">Approve Fee</button>
              <button type="button" data-action="revoke-fee" data-id="${docItem.id}">Revoke Fee</button>
              <button type="button" data-action="chat" data-id="${docItem.id}" data-name="${escapeHtml(data.displayName || data.email || "User")}">Chat</button>
              <button type="button" data-action="mark-verified" data-id="${docItem.id}">Mark Email Verified</button>
              <button type="button" data-action="set-score" data-id="${docItem.id}">Set Score</button>
              <button type="button" data-action="role" data-id="${docItem.id}" data-role="student">Set Student</button>
              <button type="button" data-action="role" data-id="${docItem.id}" data-role="teacher">Set Teacher</button>
              <button type="button" data-action="role" data-id="${docItem.id}" data-role="admin">Set Admin</button>
              <button type="button" data-action="disable" data-id="${docItem.id}">Disable</button>
              <button type="button" data-action="enable" data-id="${docItem.id}">Enable</button>
              <button type="button" data-action="delete-user" data-id="${docItem.id}">Delete</button>
            </div>
          </div>
        `;
      })
      .join("");
  });

  unsubLessons = onSnapshot(query(collection(db, "lessons"), orderBy("createdAt", "desc")), (snapshot) => {
    statLessons.textContent = String(snapshot.size);
    lessonsList.innerHTML = snapshot.docs
      .map((docItem) => {
        const data = docItem.data();
        return `
          <div class="list-item">
            <strong>${escapeHtml(data.title || "Lesson")}</strong>
            <p>${escapeHtml(data.description || "")}</p>
            <small>${escapeHtml(data.teacherName || "")} → ${escapeHtml(data.studentName || "")} · ${formatDate(data.createdAt)}</small>
            <div>
              <button type="button" data-action="delete-lesson" data-id="${docItem.id}">Delete</button>
            </div>
          </div>
        `;
      })
      .join("") || "<p class=\"muted\">No lessons.</p>";
  });

  unsubTasks = onSnapshot(query(collection(db, "tasks"), orderBy("createdAt", "desc")), (snapshot) => {
    statTasks.textContent = String(snapshot.size);
    tasksList.innerHTML = snapshot.docs
      .map((docItem) => {
        const data = docItem.data();
        return `
          <div class="list-item">
            <strong>${escapeHtml(data.title || "Task")}</strong>
            <p>${escapeHtml(data.details || "")}</p>
            <small>${escapeHtml(data.type || "daily")} · ${escapeHtml(data.teacherName || "")} → ${escapeHtml(data.studentName || "")} · ${data.completed ? "Done" : "Pending"}</small>
            <div>
              <button type="button" data-action="delete-task" data-id="${docItem.id}">Delete</button>
            </div>
          </div>
        `;
      })
      .join("") || "<p class=\"muted\">No tasks.</p>";
  });

  unsubTests = onSnapshot(query(collection(db, "tests"), orderBy("createdAt", "desc")), (snapshot) => {
    statTests.textContent = String(snapshot.size);
    testsList.innerHTML = snapshot.docs
      .map((docItem) => {
        const data = docItem.data();
        return `
          <div class="list-item">
            <strong>${escapeHtml(data.title || "Test")}</strong>
            <p>${escapeHtml(data.details || "")}</p>
            <small>${escapeHtml(data.teacherName || "")} → ${escapeHtml(data.studentName || "")}</small>
            <label class="muted">Marks</label>
            <input data-marks-id="${docItem.id}" type="number" placeholder="Marks" value="${data.marks ?? ""}" />
            <div>
              <button type="button" data-action="set-marks" data-id="${docItem.id}">Set Marks</button>
              <button type="button" data-action="delete-test" data-id="${docItem.id}">Delete</button>
            </div>
          </div>
        `;
      })
      .join("") || "<p class=\"muted\">No tests.</p>";
  });

  unsubChats = onSnapshot(query(collection(db, "chats"), orderBy("updatedAt", "desc")), (snapshot) => {
    statChats.textContent = String(snapshot.size);
    adminChatList.innerHTML = snapshot.docs
      .map((docItem) => {
        const data = docItem.data();
        const label = data.lastMessage || "Chat";
        const participants = Array.isArray(data.participants) && data.participants.length
          ? data.participants.join(" ↔ ")
          : `${data.teacherId || ""} ↔ ${data.studentId || ""}`.trim();
        return `
          <div class="list-item">
            <strong>${escapeHtml(label)}</strong>
            <small>${escapeHtml(participants || "Participants")} · ${formatDate(data.updatedAt)}</small>
            <div>
              <button type="button" data-action="open-chat" data-id="${docItem.id}">Open</button>
              <button type="button" data-action="delete-chat" data-id="${docItem.id}">Delete</button>
            </div>
          </div>
        `;
      })
      .join("") || "<p class=\"muted\">No chats.</p>";
  });

  unsubSliders = onSnapshot(query(collection(db, "sliders"), orderBy("order", "asc")), (snapshot) => {
    slidersList.innerHTML = snapshot.docs
      .map((docItem) => {
        const data = docItem.data();
        return `
          <div class="list-item">
            <strong>${escapeHtml(data.title || "Slide")}</strong>
            <p>${escapeHtml(data.subtitle || "")}</p>
            <small>Order ${data.order || 1} · ${data.active === false ? "Hidden" : "Visible"}</small>
            <div>
              <button type="button" data-action="toggle" data-id="${docItem.id}" data-active="${data.active !== false}">${data.active === false ? "Show" : "Hide"}</button>
              <button type="button" data-action="delete-slider" data-id="${docItem.id}">Delete</button>
            </div>
          </div>
        `;
      })
      .join("") || "<p class=\"muted\">No sliders.</p>";
  });
}

gateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  setMsg(gateMsg, "");
  if (gatePass.value.trim() !== ADMIN_PASS) {
    setMsg(gateMsg, "Wrong secret password.", true);
    return;
  }
  setGateUnlock();
});

logoutBtn.addEventListener("click", async () => {
  localStorage.removeItem(ADMIN_UNLOCK_KEY);
  unlocked = false;
  resetRealtime();
  dashboard.classList.add("hidden");
  gateCard.classList.remove("hidden");
});

usersList.addEventListener("click", async (event) => {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;
  const id = btn.dataset.id;

  if (btn.dataset.action === "approve") {
    await updateDoc(doc(db, "users", id), {
      status: "approved",
      role: btn.dataset.role,
      manualEmailVerified: false,
      updatedAt: serverTimestamp(),
    });
    return;
  }

  if (btn.dataset.action === "role") {
    await updateDoc(doc(db, "users", id), { role: btn.dataset.role, updatedAt: serverTimestamp() });
  }

  if (btn.dataset.action === "approve-free") {
    await updateDoc(doc(db, "users", id), {
      status: "approved",
      role: btn.dataset.role,
      freeAccess: true,
      updatedAt: serverTimestamp(),
    });
  }

  if (btn.dataset.action === "approve-fee") {
    await updateDoc(doc(db, "users", id), {
      feeApproved: true,
      updatedAt: serverTimestamp(),
    });
  }

  if (btn.dataset.action === "revoke-fee") {
    await updateDoc(doc(db, "users", id), {
      feeApproved: false,
      updatedAt: serverTimestamp(),
    });
  }

  if (btn.dataset.action === "mark-verified") {
    await updateDoc(doc(db, "users", id), {
      manualEmailVerified: true,
      updatedAt: serverTimestamp(),
    });
  }

  if (btn.dataset.action === "set-score") {
    const input = btn.closest(".list-item")?.querySelector("input[data-score-id]");
    const score = input && input.value !== "" ? Number(input.value) : null;
    await updateDoc(doc(db, "users", id), {
      score,
      updatedAt: serverTimestamp(),
    });
  }

  if (btn.dataset.action === "chat") {
    const chatId = ["admin_panel", id].sort().join("_");
    await setDoc(doc(db, "chats", chatId), {
      teacherId: null,
      studentId: null,
      participants: ["admin_panel", id],
      lastMessage: "",
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    }, { merge: true });
    selectedAdminChat = chatId;
    adminChatHeader.textContent = btn.dataset.name || "Chat";
  }

  if (btn.dataset.action === "disable") {
    await updateDoc(doc(db, "users", id), { status: "disabled", updatedAt: serverTimestamp() });
  }

  if (btn.dataset.action === "enable") {
    await updateDoc(doc(db, "users", id), { status: "approved", updatedAt: serverTimestamp() });
  }

  if (btn.dataset.action === "delete-user") {
    await deleteDoc(doc(db, "users", id));
  }
});

lessonsList.addEventListener("click", async (event) => {
  const btn = event.target.closest("button[data-action='delete-lesson']");
  if (!btn) return;
  await deleteDoc(doc(db, "lessons", btn.dataset.id));
});

tasksList.addEventListener("click", async (event) => {
  const btn = event.target.closest("button[data-action='delete-task']");
  if (!btn) return;
  await deleteDoc(doc(db, "tasks", btn.dataset.id));
});

testsList.addEventListener("click", async (event) => {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;
  if (btn.dataset.action === "delete-test") {
    await deleteDoc(doc(db, "tests", btn.dataset.id));
    return;
  }
  if (btn.dataset.action === "set-marks") {
    const input = btn.closest(".list-item")?.querySelector("input[data-marks-id]");
    const marks = input && input.value !== "" ? Number(input.value) : null;
    await updateDoc(doc(db, "tests", btn.dataset.id), {
      marks,
      updatedAt: serverTimestamp(),
    });
  }
});

adminChatList.addEventListener("click", async (event) => {
  const btn = event.target.closest("button[data-action='delete-chat']");
  if (!btn) return;
  await deleteDoc(doc(db, "chats", btn.dataset.id));
});

adminChatList.addEventListener("click", async (event) => {
  const btn = event.target.closest("button[data-action='open-chat']");
  if (!btn) return;
  const chatId = btn.dataset.id;
  selectedAdminChat = chatId;
  adminChatHeader.textContent = "Chat " + chatId;
  if (unsubAdminMessages) unsubAdminMessages();
  unsubAdminMessages = onSnapshot(
    query(collection(db, "chats", chatId, "messages"), orderBy("createdAt", "asc")),
    (snapshot) => {
      adminChatMessages.innerHTML = snapshot.docs
        .map((docItem) => {
          const data = docItem.data();
          return `
            <div class="list-item">
              <strong>${escapeHtml(data.senderName || "User")}</strong>
              <p>${escapeHtml(data.text || "")}</p>
              <small>${formatDate(data.createdAt)}</small>
            </div>
          `;
        })
        .join("") || "<p class=\"muted\">No messages.</p>";
    }
  );
});

adminChatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!selectedAdminChat) return;
  const text = adminChatInput.value.trim();
  if (!text) return;
  await addDoc(collection(db, "chats", selectedAdminChat, "messages"), {
    senderId: "admin_panel",
    senderName: "Principal",
    text,
    createdAt: serverTimestamp(),
  });
  await updateDoc(doc(db, "chats", selectedAdminChat), {
    lastMessage: text,
    updatedAt: serverTimestamp(),
  });
  adminChatInput.value = "";
});

adminChatStartForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = adminChatEmail.value.trim().toLowerCase();
  if (!email) return;
  const snapshot = await getDocs(query(collection(db, "users"), where("email", "==", email), limit(1)));
  if (snapshot.empty) return;
  const userDoc = snapshot.docs[0];
  const userId = userDoc.id;
  const chatId = ["admin_panel", userId].sort().join("_");
  await setDoc(doc(db, "chats", chatId), {
    teacherId: null,
    studentId: null,
    participants: ["admin_panel", userId],
    lastMessage: "",
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp(),
  }, { merge: true });
  adminChatEmail.value = "";
});

slidersList.addEventListener("click", async (event) => {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;
  const id = btn.dataset.id;
  if (btn.dataset.action === "toggle") {
    const isActive = btn.dataset.active === "true";
    await updateDoc(doc(db, "sliders", id), { active: !isActive });
    return;
  }
  if (btn.dataset.action === "delete-slider") {
    await deleteDoc(doc(db, "sliders", id));
  }
});

sliderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  await addDoc(collection(db, "sliders"), {
    title: sliderTitle.value.trim(),
    subtitle: sliderText.value.trim(),
    highlight: sliderHighlight.value.trim(),
    order: Number(sliderOrder.value || 1),
    active: true,
    createdAt: serverTimestamp(),
  });
  sliderForm.reset();
});

brandingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMsg(brandingMsg, "");
  try {
    await setDoc(doc(db, "settings", "branding"), {
      faviconUrl: faviconUrl.value.trim(),
      logoUrl: logoUrl.value.trim(),
      webviewUrl: webviewUrl.value.trim(),
      updatedAt: serverTimestamp(),
    }, { merge: true });
    setMsg(brandingMsg, "Branding updated.");
  } catch (error) {
    setMsg(brandingMsg, error.message || "Could not update branding.", true);
  }
});
if (loadGateUnlock()) {
  unlocked = true;
  gateCard.classList.add("hidden");
  adminBadge.textContent = "Admin unlocked";
  dashboard.classList.remove("hidden");
  startRealtime();
}

function loadGateUnlock() {
  const value = localStorage.getItem(ADMIN_UNLOCK_KEY);
  if (!value) return false;
  const expiresAt = Number(value);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
    localStorage.removeItem(ADMIN_UNLOCK_KEY);
    return false;
  }
  return true;
}

function setGateUnlock() {
  const expiresAt = Date.now() + ADMIN_UNLOCK_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(ADMIN_UNLOCK_KEY, String(expiresAt));
  unlocked = true;
  gateCard.classList.add("hidden");
  adminBadge.textContent = "Admin unlocked";
  dashboard.classList.remove("hidden");
  startRealtime();
}
