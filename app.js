import { firebaseConfig } from "./firebase-config.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
  sendEmailVerification,
  reload,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  addDoc,
  deleteDoc,
  serverTimestamp,
  limit,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const ADMIN_TRIGGER = "adminmomo";
const ADMIN_PASS = "momemo";
const ADMIN_UNLOCK_KEY = "ws_admin_gate_unlocked";
const ADMIN_UNLOCK_DAYS = 30;

const sliderTrack = document.getElementById("sliderTrack");
const sliderDots = document.getElementById("sliderDots");
const faviconLink = document.getElementById("faviconLink");
const brandLogo = document.getElementById("brandLogo");
const brandFallback = document.getElementById("brandFallback");
const brandLogoWrap = brandFallback?.closest(".logo");
const statTeachers = document.getElementById("statTeachers");
const statStudents = document.getElementById("statStudents");
const statLessons = document.getElementById("statLessons");
const installBtn = document.getElementById("installBtn");
const logoutBtn = document.getElementById("logoutBtn");

const authSection = document.getElementById("authSection");
const roleNotice = document.getElementById("roleNotice");
const approvalNotice = document.getElementById("approvalNotice");
const manualVerifyNotice = document.getElementById("manualVerifyNotice");
const publicHero = document.getElementById("publicHero");
const showLogin = document.getElementById("showLogin");
const showSignup = document.getElementById("showSignup");
const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginMsg = document.getElementById("loginMsg");
const signupForm = document.getElementById("signupForm");
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupRole = document.getElementById("signupRole");
const signupMsg = document.getElementById("signupMsg");
const googleLogin = document.getElementById("googleLogin");
const googleSignup = document.getElementById("googleSignup");

const verifyNotice = document.getElementById("verifyNotice");
const resendVerify = document.getElementById("resendVerify");
const refreshVerify = document.getElementById("refreshVerify");
const verifyMsg = document.getElementById("verifyMsg");

const studentView = document.getElementById("studentView");
const teacherView = document.getElementById("teacherView");
const studentWelcome = document.getElementById("studentWelcome");
const teacherWelcome = document.getElementById("teacherWelcome");
const pendingView = document.getElementById("pendingView");
const pendingChatHeader = document.getElementById("pendingChatHeader");
const pendingChatMessages = document.getElementById("pendingChatMessages");
const pendingChatForm = document.getElementById("pendingChatForm");
const pendingChatInput = document.getElementById("pendingChatInput");

const studentLessons = document.getElementById("studentLessons");
const studentTasks = document.getElementById("studentTasks");
const studentTests = document.getElementById("studentTests");
const studentChatList = document.getElementById("studentChatList");
const chatHeader = document.getElementById("chatHeader");
const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");

const teacherStudents = document.getElementById("teacherStudents");
const approvedStudents = document.getElementById("approvedStudents");
const addStudentForm = document.getElementById("addStudentForm");
const studentSelect = document.getElementById("studentSelect");
const addStudentMsg = document.getElementById("addStudentMsg");
const lessonForm = document.getElementById("lessonForm");
const lessonStudent = document.getElementById("lessonStudent");
const lessonTitle = document.getElementById("lessonTitle");
const lessonDesc = document.getElementById("lessonDesc");
const lessonPdfUrl = document.getElementById("lessonPdfUrl");
const lessonMsg = document.getElementById("lessonMsg");
const taskForm = document.getElementById("taskForm");
const taskStudent = document.getElementById("taskStudent");
const taskTitle = document.getElementById("taskTitle");
const taskDetails = document.getElementById("taskDetails");
const taskType = document.getElementById("taskType");
const taskDue = document.getElementById("taskDue");
const taskMsg = document.getElementById("taskMsg");
const teacherLessons = document.getElementById("teacherLessons");
const testForm = document.getElementById("testForm");
const testStudent = document.getElementById("testStudent");
const testTitle = document.getElementById("testTitle");
const testDetails = document.getElementById("testDetails");
const testDue = document.getElementById("testDue");
const testMsg = document.getElementById("testMsg");
const teacherTests = document.getElementById("teacherTests");

const teacherChatList = document.getElementById("teacherChatList");
const teacherChatHeader = document.getElementById("teacherChatHeader");
const teacherChatMessages = document.getElementById("teacherChatMessages");
const teacherChatForm = document.getElementById("teacherChatForm");
const teacherChatInput = document.getElementById("teacherChatInput");
const studentChatAddForm = document.getElementById("studentChatAddForm");
const studentChatEmail = document.getElementById("studentChatEmail");
const studentChatAddMsg = document.getElementById("studentChatAddMsg");
const teacherChatAddForm = document.getElementById("teacherChatAddForm");
const teacherChatEmail = document.getElementById("teacherChatEmail");
const teacherChatAddMsg = document.getElementById("teacherChatAddMsg");

const profileDialog = document.getElementById("profileDialog");
const profileForm = document.getElementById("profileForm");
const profileName = document.getElementById("profileName");
const profileMsg = document.getElementById("profileMsg");
const closeProfile = document.getElementById("closeProfile");
const studentProfileBtn = document.getElementById("studentProfileBtn");
const teacherProfileBtn = document.getElementById("teacherProfileBtn");

const onboardDialog = document.getElementById("onboardDialog");
const onboardForm = document.getElementById("onboardForm");
const onboardRole = document.getElementById("onboardRole");
const onboardGrade = document.getElementById("onboardGrade");
const onboardPhone = document.getElementById("onboardPhone");
const teacherExtra = document.getElementById("teacherExtra");
const teacherDegree = document.getElementById("teacherDegree");
const teacherClasses = document.getElementById("teacherClasses");
const teacherExperience = document.getElementById("teacherExperience");
const onboardNotes = document.getElementById("onboardNotes");
const onboardMsg = document.getElementById("onboardMsg");

const adminGate = document.getElementById("adminGate");
const adminGateForm = document.getElementById("adminGateForm");
const adminGatePass = document.getElementById("adminGatePass");
const adminGateMsg = document.getElementById("adminGateMsg");
const closeAdminGate = document.getElementById("closeAdminGate");

const studentPreviewDialog = document.getElementById("studentPreviewDialog");
const studentPreviewBody = document.getElementById("studentPreviewBody");
const selectStudentBtn = document.getElementById("selectStudentBtn");
const startChatBtn = document.getElementById("startChatBtn");
const closeStudentPreview = document.getElementById("closeStudentPreview");

let currentUser = null;
let currentProfile = null;
let secretBuffer = "";
let selectedStudentChat = null;
let selectedTeacherChat = null;
let selectedStudentProfile = null;
let selectedGroupChat = null;
let selectedPendingChat = null;
let sliderIndex = 0;
let sliderTimer = null;
let deferredPrompt = null;
const googleProvider = new GoogleAuthProvider();

const SLIDER_FALLBACK = [
  { title: "Live Chat", text: "Talk to your teacher instantly.", highlight: "Chat" },
  { title: "PDF Lessons", text: "Teachers upload lessons and notes.", highlight: "Lessons" },
  { title: "Daily Tasks", text: "Track daily and immediate tasks.", highlight: "Tasks" },
];

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function setStatus(el, message, isError = false) {
  if (!el) return;
  el.textContent = message;
  el.style.color = isError ? "#fca5a5" : "#86efac";
}

function formatDate(ts) {
  const date = ts?.toDate ? ts.toDate() : new Date();
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function showRoleNotice(message) {
  roleNotice.textContent = message;
  roleNotice.classList.remove("hidden");
}

function hideRoleNotice() {
  roleNotice.classList.add("hidden");
}

function toggleAuthTab(isLogin) {
  showLogin.classList.toggle("active", isLogin);
  showSignup.classList.toggle("active", !isLogin);
  loginForm.classList.toggle("hidden", !isLogin);
  signupForm.classList.toggle("hidden", isLogin);
}

function showDashboard(role) {
  authSection.classList.add("hidden");
  publicHero.classList.add("hidden");
  verifyNotice.classList.add("hidden");
  approvalNotice.classList.add("hidden");
  manualVerifyNotice.classList.add("hidden");
  pendingView.classList.add("hidden");
  logoutBtn.classList.remove("hidden");
  document.body.classList.remove("pending");
  studentView.classList.toggle("hidden", role !== "student");
  teacherView.classList.toggle("hidden", role !== "teacher");
}

function resetDashboard() {
  authSection.classList.remove("hidden");
  publicHero.classList.remove("hidden");
  verifyNotice.classList.add("hidden");
  approvalNotice.classList.add("hidden");
  manualVerifyNotice.classList.add("hidden");
  logoutBtn.classList.add("hidden");
  studentView.classList.add("hidden");
  teacherView.classList.add("hidden");
  pendingView.classList.add("hidden");
  document.body.classList.remove("pending");
}

function showPendingView() {
  authSection.classList.add("hidden");
  publicHero.classList.add("hidden");
  approvalNotice.classList.add("hidden");
  manualVerifyNotice.classList.add("hidden");
  studentView.classList.add("hidden");
  teacherView.classList.add("hidden");
  pendingView.classList.remove("hidden");
  logoutBtn.classList.remove("hidden");
  document.body.classList.add("pending");
}

function renderSlider(items) {
  const slides = items.length ? items : SLIDER_FALLBACK;
  sliderTrack.innerHTML = "";
  sliderDots.innerHTML = "";

  slides.forEach((slide, index) => {
    const imageUrl = slide.imageUrl || "./favicon.svg";
    const card = document.createElement("article");
    card.className = "slider-card";
    card.innerHTML = `
      <div class="slider-image" style="background-image: url('${escapeHtml(imageUrl)}');"></div>
      <h3>${escapeHtml(slide.title || "Lesson")}</h3>
      <p>${escapeHtml(slide.text || slide.subtitle || "Real-time learning updates.")}</p>
      <span class="eyebrow">${escapeHtml(slide.highlight || "Update")}</span>
    `;
    card.style.display = index === 0 ? "block" : "none";
    sliderTrack.appendChild(card);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = index === 0 ? "active" : "";
    dot.addEventListener("click", () => {
      sliderIndex = index;
      applySlider(slides.length);
      restartSlider(slides.length);
    });
    sliderDots.appendChild(dot);
  });
}

function applySlider(count) {
  const cards = [...sliderTrack.children];
  const dots = [...sliderDots.children];
  cards.forEach((card, idx) => {
    card.style.display = idx === sliderIndex ? "block" : "none";
  });
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === sliderIndex);
  });
}

function restartSlider(count) {
  if (sliderTimer) clearInterval(sliderTimer);
  sliderTimer = setInterval(() => {
    sliderIndex = (sliderIndex + 1) % count;
    applySlider(count);
  }, 4200);
}

function startSliderRealtime() {
  onSnapshot(query(collection(db, "sliders"), orderBy("order", "asc"), limit(5)), (snapshot) => {
    const items = snapshot.docs.map((docItem) => docItem.data()).filter((item) => item.active !== false);
    renderSlider(items);
    restartSlider(items.length || SLIDER_FALLBACK.length);
  });
}

function startStatsRealtime() {
  onSnapshot(doc(db, "stats", "overview"), (snapshot) => {
    const data = snapshot.exists() ? snapshot.data() : {};
    const teachers = Number(data.teachers ?? 0);
    const students = Number(data.students ?? 0);
    const lessons = Number(data.lessons ?? 0);
    // Inflate homepage stats for marketing presence.
    statTeachers.textContent = String(teachers + 120);
    statStudents.textContent = String(students + 1500);
    statLessons.textContent = String(lessons + 300);
  });
}

function startBrandingRealtime() {
  if (!faviconLink || !brandLogo) return;
  onSnapshot(doc(db, "settings", "branding"), (snapshot) => {
    if (!snapshot.exists()) return;
    const data = snapshot.data();
    if (data.faviconUrl) {
      faviconLink.href = data.faviconUrl;
    }
    if (data.logoUrl) {
      brandLogo.src = data.logoUrl;
      brandLogoWrap?.classList.add("has-image");
    } else {
      brandLogo.removeAttribute("src");
      brandLogoWrap?.classList.remove("has-image");
    }
  });
}

async function ensureUserProfile(user, formData = {}) {
  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    const newProfile = {
      uid: user.uid,
      email: user.email || "",
      displayName: formData.displayName || user.email?.split("@")[0] || "User",
      role: formData.role || "student",
      roleRequested: formData.role || "student",
      grade: formData.grade || "",
      phone: formData.phone || "",
      manualEmailVerified: false,
      feeApproved: false,
      notes: formData.notes || "",
      status: "pending",
      profileComplete: false,
      createdAt: serverTimestamp(),
    };
    await setDoc(ref, newProfile);
    return newProfile;
  }
  return { id: snap.id, ...snap.data() };
}

async function updateProfileName(name) {
  if (!currentUser) return;
  await updateDoc(doc(db, "users", currentUser.uid), {
    displayName: name,
    updatedAt: serverTimestamp(),
  });
}

function needsEmailVerification(user) {
  return user && user.email && !user.emailVerified;
}

function showVerifyNotice() {
  verifyNotice.classList.remove("hidden");
  authSection.classList.add("hidden");
  publicHero.classList.add("hidden");
  studentView.classList.add("hidden");
  teacherView.classList.add("hidden");
  approvalNotice.classList.add("hidden");
  logoutBtn.classList.remove("hidden");
}

function showApprovalNotice() {
  approvalNotice.classList.remove("hidden");
  manualVerifyNotice.classList.add("hidden");
  authSection.classList.add("hidden");
  publicHero.classList.add("hidden");
  studentView.classList.add("hidden");
  teacherView.classList.add("hidden");
  logoutBtn.classList.remove("hidden");
  document.body.classList.add("pending");
}

function showManualVerifyNotice() {
  manualVerifyNotice.classList.remove("hidden");
  approvalNotice.classList.add("hidden");
  authSection.classList.add("hidden");
  publicHero.classList.add("hidden");
  studentView.classList.add("hidden");
  teacherView.classList.add("hidden");
  logoutBtn.classList.remove("hidden");
  document.body.classList.add("pending");
}

function showDisabledNotice() {
  showRoleNotice("Your account has been disabled. Please contact the principal/admin.");
  authSection.classList.add("hidden");
  publicHero.classList.add("hidden");
  studentView.classList.add("hidden");
  teacherView.classList.add("hidden");
  approvalNotice.classList.add("hidden");
  logoutBtn.classList.remove("hidden");
}

function initHiddenAdminTrigger() {
  window.addEventListener("keydown", (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key.length !== 1) return;
    secretBuffer = `${secretBuffer}${event.key.toLowerCase().replace(/[^a-z]/g, "")}`.slice(-30);
    if (secretBuffer.includes(ADMIN_TRIGGER)) {
      secretBuffer = "";
      adminGateForm.reset();
      setStatus(adminGateMsg, "");
      adminGate.showModal();
    }
  });
}

function wirePwaInstall() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installBtn.classList.remove("hidden");
  });

  installBtn.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("./service-worker.js");
  }
}

function renderLessons(target, lessons, isStudent = false) {
  if (!lessons.length) {
    target.innerHTML = "<p class=\"muted\">No lessons yet.</p>";
    return;
  }
  target.innerHTML = lessons
    .map((lesson) => {
      const fileLink = lesson.pdfUrl ? `<a href=\"${escapeHtml(lesson.pdfUrl)}\" target=\"_blank\" rel=\"noreferrer\">Open PDF</a>` : "";
      const status = lesson.completed ? "Finished" : "Pending";
      const action = isStudent && !lesson.completed
        ? `<button class="btn ghost" data-id="${lesson.id}" data-action="finish-lesson">Mark finished</button>`
        : "";
      return `
        <div class="list-item">
          <strong>${escapeHtml(lesson.title || "Lesson")}</strong>
          <p>${escapeHtml(lesson.description || "")}</p>
          <small>${formatDate(lesson.createdAt)} · ${escapeHtml(lesson.studentName || "")} · ${status}</small>
          ${fileLink}
          ${action}
        </div>
      `;
    })
    .join("");
}

function renderTasks(target, tasks, isStudent) {
  if (!tasks.length) {
    target.innerHTML = "<p class=\"muted\">No tasks yet.</p>";
    return;
  }
  target.innerHTML = tasks
    .map((task) => {
      const action = isStudent
        ? `<button class=\"btn ghost\" data-id=\"${task.id}\" data-action=\"done\">${task.completed ? "Completed" : "Mark done"}</button>`
        : "";
      return `
        <div class="list-item">
          <strong>${escapeHtml(task.title || "Task")}</strong>
          <p>${escapeHtml(task.details || "")}</p>
          <small>${escapeHtml(task.type || "daily")} · ${task.dueDate || "No due"} · ${task.completed ? "Done" : "Pending"}</small>
          ${action}
        </div>
      `;
    })
    .join("");
}

function renderTests(target, tests) {
  if (!tests.length) {
    target.innerHTML = "<p class=\"muted\">No tests yet.</p>";
    return;
  }
  target.innerHTML = tests
    .map((test) => `
      <div class="list-item">
        <strong>${escapeHtml(test.title || "Test")}</strong>
        <p>${escapeHtml(test.details || "")}</p>
        <small>${test.dueDate || "No due"} · Marks: ${test.marks ?? "Pending"}</small>
      </div>
    `)
    .join("");
}

async function buildStudentSummary(studentId) {
  const [tasksSnap, lessonsSnap, testsSnap, userSnap] = await Promise.all([
    getDocs(query(collection(db, "tasks"), where("studentId", "==", studentId))),
    getDocs(query(collection(db, "lessons"), where("studentId", "==", studentId))),
    getDocs(query(collection(db, "tests"), where("studentId", "==", studentId))),
    getDoc(doc(db, "users", studentId)),
  ]);

  const tasks = tasksSnap.docs.map((docItem) => docItem.data());
  const lessons = lessonsSnap.docs.map((docItem) => docItem.data());
  const tests = testsSnap.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
  const score = userSnap.exists() ? userSnap.data().score : null;

  const tasksDone = tasks.filter((task) => task.completed).length;
  const tasksPending = tasks.length - tasksDone;
  const lessonsDone = lessons.filter((lesson) => lesson.completed).length;
  const lessonsPending = lessons.length - lessonsDone;

  const testsList = tests
    .map((test) => `<li>${escapeHtml(test.title || "Test")}: ${test.marks ?? "Pending"}</li>`)
    .join("") || "<li>No tests yet.</li>";

  return `
    <div class="list-item">
      <strong>Progress Summary</strong>
      <p>Tasks: ${tasksDone} done / ${tasksPending} pending</p>
      <p>Lessons: ${lessonsDone} finished / ${lessonsPending} pending</p>
      <p>Score: ${score ?? "Not set"}</p>
      <strong>Tests & Marks</strong>
      <ul>${testsList}</ul>
    </div>
  `;
}

function renderChatList(target, chats, selectedId) {
  if (!chats.length) {
    target.innerHTML = "<p class=\"muted\">No chats yet.</p>";
    return;
  }
  target.innerHTML = chats
    .map((chat) => {
      const name = chat.otherName || "Chat";
      const initial = escapeHtml(name.trim().charAt(0) || "?");
      const isGroup = chat.role === "group";
      return `
        <div class="chat-item ${chat.id === selectedId ? "active" : ""}" data-id="${chat.id}" data-name="${escapeHtml(name)}" data-other-id="${chat.otherId || ""}" data-role="${chat.role || ""}" data-group-type="${chat.groupType || ""}" data-grade="${chat.grade || ""}">
          <div class="chat-avatar">${initial}</div>
          <div class="chat-meta">
            <strong>${escapeHtml(name)}</strong>
            <p class="muted">${escapeHtml(chat.lastMessage || "Start a conversation")}</p>
            ${isGroup ? "<small class=\"muted\">Group</small>" : ""}
          </div>
        </div>
      `;
    })
    .join("");
}

function renderMessages(target, messages, uid) {
  if (!messages.length) {
    target.innerHTML = "<p class=\"muted\">No messages yet.</p>";
    return;
  }
  target.innerHTML = messages
    .map((msg) => {
      const isMe = msg.senderId === uid;
      return `
        <div class="chat-bubble ${isMe ? "me" : ""}" data-id="${msg.id}" data-sender="${escapeHtml(msg.senderId || "")}">
          <strong>${escapeHtml(msg.senderName || "User")}</strong>
          <p>${escapeHtml(msg.text || "")}</p>
          <small>${formatDate(msg.createdAt)}</small>
          ${isMe ? "<button class=\"btn ghost\" data-action=\"delete-msg\">Delete</button>" : ""}
        </div>
      `;
    })
    .join("");
  target.scrollTop = target.scrollHeight;
}

function setSelectedStudent(studentId) {
  if (!studentId) return;
  lessonStudent.value = studentId;
  taskStudent.value = studentId;
  testStudent.value = studentId;
}

async function ensureLink(teacherId, studentId) {
  const linkId = `${teacherId}_${studentId}`;
  await setDoc(doc(db, "links", linkId), {
    teacherId,
    studentId,
    createdAt: serverTimestamp(),
  }, { merge: true });
}

function getChatMetaForContact(contact) {
  if (!currentUser) return null;
  const myId = currentUser.uid;
  let chatId = "";
  let teacherId = null;
  let studentId = null;

  if (contact.role === "admin") {
    chatId = [myId, contact.id].sort().join("_");
  } else if (currentProfile?.role === "teacher" && contact.role === "student") {
    chatId = `${myId}_${contact.id}`;
    teacherId = myId;
    studentId = contact.id;
  } else if (currentProfile?.role === "student" && contact.role === "teacher") {
    chatId = `${contact.id}_${myId}`;
    teacherId = contact.id;
    studentId = myId;
  } else {
    chatId = [myId, contact.id].sort().join("_");
  }

  return { chatId, teacherId, studentId, participants: [myId, contact.id] };
}

async function ensureChatForContact(contact) {
  const meta = getChatMetaForContact(contact);
  if (!meta) return null;
  await setDoc(
    doc(db, "chats", meta.chatId),
    {
      teacherId: meta.teacherId || null,
      studentId: meta.studentId || null,
      participants: meta.participants,
      lastMessage: "",
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
  return meta.chatId;
}

async function sendMessageToChat(chatId, contact, text) {
  if (!currentUser || !text) return;
  const meta = getChatMetaForContact(contact);
  const chatRef = doc(db, "chats", chatId);
  const messagesRef = collection(chatRef, "messages");
  const payload = {
    senderId: currentUser.uid,
    senderName: currentProfile?.displayName || currentUser.email,
    text,
    createdAt: serverTimestamp(),
  };

  await setDoc(
    chatRef,
    {
      teacherId: meta?.teacherId || null,
      studentId: meta?.studentId || null,
      participants: meta?.participants || [currentUser.uid, contact.id],
      lastMessage: text,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
  await addDoc(messagesRef, payload);
}

function listenMessages(chatId, target, header, name) {
  header.textContent = name || "Chat";
  return onSnapshot(query(collection(db, "chats", chatId, "messages"), orderBy("createdAt", "asc")), (snapshot) => {
    const messages = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
    renderMessages(target, messages, currentUser.uid);
  });
}

async function ensureGroupChat(group) {
  const ref = doc(db, "group_chats", group.id);
  await setDoc(
    ref,
    {
      name: group.name,
      groupType: group.groupType,
      grade: group.grade || "",
      lastMessage: "",
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
  return group.id;
}

function listenGroupMessages(groupId, target, header, name) {
  header.textContent = name || "Group";
  return onSnapshot(query(collection(db, "group_chats", groupId, "messages"), orderBy("createdAt", "asc")), (snapshot) => {
    const messages = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
    renderMessages(target, messages, currentUser.uid);
  });
}

async function sendGroupMessage(groupId, name, text) {
  if (!currentUser || !text) return;
  await addDoc(collection(db, "group_chats", groupId, "messages"), {
    senderId: currentUser.uid,
    senderName: currentProfile?.displayName || currentUser.email,
    text,
    createdAt: serverTimestamp(),
  });
  await updateDoc(doc(db, "group_chats", groupId), {
    lastMessage: text,
    updatedAt: serverTimestamp(),
  });
}

let unsubscribeStudentChat = null;
let unsubscribeTeacherChat = null;
let unsubscribeGroupChat = null;
let unsubscribePendingChat = null;

function bindStudentChat(chatId, contact) {
  if (unsubscribeStudentChat) unsubscribeStudentChat();
  if (unsubscribeGroupChat) unsubscribeGroupChat();
  selectedGroupChat = null;
  selectedStudentChat = {
    chatId,
    contactId: contact.id,
    name: contact.name,
    role: contact.role,
  };
  unsubscribeStudentChat = listenMessages(chatId, chatMessages, chatHeader, contact.name);
}

function bindTeacherChat(chatId, contact) {
  if (unsubscribeTeacherChat) unsubscribeTeacherChat();
  if (unsubscribeGroupChat) unsubscribeGroupChat();
  selectedGroupChat = null;
  selectedStudentChat = null;
  selectedTeacherChat = {
    chatId,
    contactId: contact.id,
    name: contact.name,
    role: contact.role,
  };
  unsubscribeTeacherChat = listenMessages(chatId, teacherChatMessages, teacherChatHeader, contact.name);
}

function bindGroupChat(groupId, name) {
  if (unsubscribeStudentChat) unsubscribeStudentChat();
  if (unsubscribeGroupChat) unsubscribeGroupChat();
  selectedStudentChat = null;
  selectedGroupChat = { groupId, name };
  unsubscribeGroupChat = listenGroupMessages(groupId, chatMessages, chatHeader, name);
}

async function bindPendingChat() {
  if (!currentUser) return;
  const contact = { id: "admin_panel", name: "Principal", role: "admin" };
  const chatId = await ensureChatForContact(contact);
  if (!chatId) return;
  selectedPendingChat = { chatId, contact };
  if (unsubscribePendingChat) unsubscribePendingChat();
  unsubscribePendingChat = listenMessages(chatId, pendingChatMessages, pendingChatHeader, "Principal");
}

function startStudentRealtime(uid) {
  onSnapshot(query(collection(db, "lessons"), where("studentId", "==", uid)), (snapshot) => {
    const lessons = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
    lessons.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    renderLessons(studentLessons, lessons, true);
  });

  onSnapshot(query(collection(db, "tasks"), where("studentId", "==", uid)), (snapshot) => {
    const tasks = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
    tasks.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    renderTasks(studentTasks, tasks, true);
  });

  onSnapshot(query(collection(db, "tests"), where("studentId", "==", uid)), (snapshot) => {
    const tests = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
    tests.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    renderTests(studentTests, tests);
  });

  let groupContacts = [];
  let groupMetaMap = new Map();
  let chatItems = [];

  const renderStudentChats = () => {
    const combined = [...groupContacts, ...chatItems];
    combined.sort((a, b) => {
      if (a.role === "group" && b.role !== "group") return -1;
      if (a.role !== "group" && b.role === "group") return 1;
      if ((a.updatedAt || 0) !== (b.updatedAt || 0)) return (b.updatedAt || 0) - (a.updatedAt || 0);
      return (a.otherName || "").localeCompare(b.otherName || "");
    });
    renderChatList(studentChatList, combined, selectedStudentChat?.chatId);
  };

  onSnapshot(query(collection(db, "chats"), where("participants", "array-contains", uid)), async (snapshot) => {
    const items = await Promise.all(
      snapshot.docs.map(async (docItem) => {
        const data = docItem.data();
        const otherId = (data.participants || []).find((id) => id !== uid);
        if (!otherId) return null;
        if (otherId === "admin_panel") {
          return {
            id: docItem.id,
            otherId,
            otherName: "Principal",
            role: "admin",
            lastMessage: data.lastMessage || "",
            updatedAt: data.updatedAt?.toMillis?.() || 0,
          };
        }
        const otherSnap = await getDoc(doc(db, "users", otherId));
        if (!otherSnap.exists()) return null;
        const other = otherSnap.data();
        return {
          id: docItem.id,
          otherId,
          otherName: other.displayName || other.email || "User",
          role: other.role || "user",
          lastMessage: data.lastMessage || "",
          updatedAt: data.updatedAt?.toMillis?.() || 0,
        };
      })
    );
    chatItems = items.filter(Boolean);
    renderStudentChats();
  });

  const generalGroup = { id: "group_general", otherId: "group_general", otherName: "General (All Students)", role: "group", groupType: "general", lastMessage: "", updatedAt: 0 };
  const gradeLabel = (currentProfile?.grade || "").replace(/\s+/g, "_").toLowerCase();
  const gradeGroup = currentProfile?.grade
    ? { id: `group_grade_${gradeLabel}`, otherId: `group_grade_${gradeLabel}`, otherName: `${currentProfile.grade} Group`, role: "group", groupType: "grade", grade: currentProfile.grade, lastMessage: "", updatedAt: 0 }
    : null;
  groupContacts = gradeGroup ? [generalGroup, gradeGroup] : [generalGroup];

  groupContacts.forEach(async (group) => {
    await ensureGroupChat({ id: group.id, name: group.otherName, role: "group", groupType: group.groupType, grade: group.grade || "" });
    onSnapshot(doc(db, "group_chats", group.id), (snap) => {
      const data = snap.exists() ? snap.data() : {};
      groupMetaMap.set(group.id, {
        lastMessage: data.lastMessage || "",
        updatedAt: data.updatedAt?.toMillis?.() || 0,
      });
      const idx = groupContacts.findIndex((g) => g.id === group.id);
      if (idx >= 0) {
        groupContacts[idx].lastMessage = data.lastMessage || "";
        groupContacts[idx].updatedAt = data.updatedAt?.toMillis?.() || 0;
      }
      renderStudentChats();
    });
  });
}

function startTeacherRealtime(uid) {
  onSnapshot(query(collection(db, "links"), where("teacherId", "==", uid)), async (snapshot) => {
    const linkDocs = [...snapshot.docs].sort(
      (a, b) => (b.data().createdAt?.toMillis?.() || 0) - (a.data().createdAt?.toMillis?.() || 0)
    );
    const students = [];
    for (const docItem of linkDocs) {
      const data = docItem.data();
      const studentSnap = await getDoc(doc(db, "users", data.studentId));
      students.push({
        id: data.studentId,
        name: studentSnap.exists() ? studentSnap.data().displayName : "Student",
        email: studentSnap.exists() ? studentSnap.data().email : "",
      });
    }
    const options = students.map((student) => `<option value="${student.id}">${escapeHtml(student.name)}</option>`).join("");
    teacherStudents.innerHTML = students
      .map((student) => `<div class="list-item"><strong>${escapeHtml(student.name)}</strong><p>${escapeHtml(student.email)}</p></div>`)
      .join("") || "<p class=\"muted\">No students yet.</p>";

    lessonStudent.innerHTML = options;
    taskStudent.innerHTML = options;
    testStudent.innerHTML = options;
  });

  onSnapshot(
    query(collection(db, "users"), where("role", "==", "student"), where("status", "==", "approved")),
    (snapshot) => {
      const approvedList = snapshot.docs
        .map((docItem) => {
          const data = docItem.data();
          return { id: docItem.id, name: data.displayName || data.email || "Student", email: data.email || "" };
        })
        .sort((a, b) => a.name.localeCompare(b.name));
      studentSelect.innerHTML = approvedList
        .map((student) => `<option value="${student.id}">${escapeHtml(student.name)} (${student.id.slice(0, 6)})</option>`)
        .join("") || "<option value=\"\">No approved students</option>";
      approvedStudents.innerHTML = approvedList
        .map((student) => `
            <div class="list-item">
              <strong>${escapeHtml(student.name)}</strong>
              <p>${escapeHtml(student.email || "")}</p>
              <small>ID: ${escapeHtml(student.id)}</small>
              <div>
                <button type="button" data-action="preview" data-id="${student.id}">Preview</button>
                <button type="button" data-action="link" data-id="${student.id}">Link</button>
                <button type="button" data-action="select" data-id="${student.id}">Select</button>
              </div>
            </div>
          `)
        .join("") || "<p class=\"muted\">No approved students.</p>";
    }
  );

  onSnapshot(query(collection(db, "lessons"), where("teacherId", "==", uid)), (snapshot) => {
    const lessons = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
    lessons.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    renderLessons(teacherLessons, lessons, false);
  });

  onSnapshot(query(collection(db, "tests"), where("teacherId", "==", uid)), (snapshot) => {
    const tests = snapshot.docs.map((docItem) => ({ id: docItem.id, ...docItem.data() }));
    tests.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
    renderTests(teacherTests, tests);
  });

  let chatItems = [];

  const renderTeacherChats = () => {
    const items = [...chatItems];
    items.sort((a, b) => {
      if ((a.updatedAt || 0) !== (b.updatedAt || 0)) return (b.updatedAt || 0) - (a.updatedAt || 0);
      return (a.otherName || "").localeCompare(b.otherName || "");
    });
    renderChatList(teacherChatList, items, selectedTeacherChat?.chatId);
  };

  onSnapshot(query(collection(db, "chats"), where("participants", "array-contains", uid)), async (snapshot) => {
    const items = await Promise.all(
      snapshot.docs.map(async (docItem) => {
        const data = docItem.data();
        const otherId = (data.participants || []).find((id) => id !== uid);
        if (!otherId) return null;
        if (otherId === "admin_panel") {
          return {
            id: docItem.id,
            otherId,
            otherName: "Principal",
            role: "admin",
            lastMessage: data.lastMessage || "",
            updatedAt: data.updatedAt?.toMillis?.() || 0,
          };
        }
        const otherSnap = await getDoc(doc(db, "users", otherId));
        if (!otherSnap.exists()) return null;
        const other = otherSnap.data();
        return {
          id: docItem.id,
          otherId,
          otherName: other.displayName || other.email || "User",
          role: other.role || "user",
          lastMessage: data.lastMessage || "",
          updatedAt: data.updatedAt?.toMillis?.() || 0,
        };
      })
    );
    chatItems = items.filter(Boolean);
    renderTeacherChats();
  });
}
showLogin.addEventListener("click", () => toggleAuthTab(true));
showSignup.addEventListener("click", () => toggleAuthTab(false));

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus(loginMsg, "");
  try {
    await signInWithEmailAndPassword(auth, loginEmail.value.trim(), loginPassword.value);
  } catch (error) {
    setStatus(loginMsg, error.message || "Login failed", true);
  }
});

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus(signupMsg, "");
  try {
    const credential = await createUserWithEmailAndPassword(auth, signupEmail.value.trim(), signupPassword.value);
    await sendEmailVerification(credential.user);
    await ensureUserProfile(credential.user, {
      displayName: signupName.value.trim(),
      role: signupRole.value,
      grade: "",
      phone: "",
      notes: "",
    });
    signupForm.reset();
    setStatus(signupMsg, "Verification email sent. Please verify and then login.");
  } catch (error) {
    setStatus(signupMsg, error.message || "Signup failed", true);
  }
});

googleLogin.addEventListener("click", async () => {
  setStatus(loginMsg, "");
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    setStatus(loginMsg, error.message || "Google login failed", true);
  }
});

googleSignup.addEventListener("click", async () => {
  setStatus(signupMsg, "");
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await ensureUserProfile(result.user, { role: signupRole.value });
  } catch (error) {
    setStatus(signupMsg, error.message || "Google signup failed", true);
  }
});

logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  resetDashboard();
});

onboardForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentUser) return;
  setStatus(onboardMsg, "");
  try {
    if (!onboardPhone.value.trim()) {
      setStatus(onboardMsg, "Phone number is required.", true);
      return;
    }
    await updateDoc(doc(db, "users", currentUser.uid), {
      roleRequested: onboardRole.value,
      role: onboardRole.value,
      grade: onboardGrade.value,
      phone: onboardPhone.value.trim(),
      degree: teacherDegree.value.trim(),
      classes: teacherClasses.value.trim(),
      experience: teacherExperience.value.trim(),
      notes: onboardNotes.value.trim(),
      status: "pending",
      profileComplete: true,
      updatedAt: serverTimestamp(),
    });
    onboardDialog.close();
    showApprovalNotice();
  } catch (error) {
    setStatus(onboardMsg, error.message || "Could not submit.", true);
  }
});

addStudentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus(addStudentMsg, "");
  if (!currentUser) return;
  try {
    if (!studentSelect.value) {
      setStatus(addStudentMsg, "Select a student first.", true);
      return;
    }
    await ensureLink(currentUser.uid, studentSelect.value);
    setStatus(addStudentMsg, "Student linked successfully.");
    addStudentForm.reset();
  } catch (error) {
    setStatus(addStudentMsg, error.message || "Could not add student.", true);
  }
});

lessonForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus(lessonMsg, "");
  if (!currentUser) return;
  if (!lessonStudent.value) {
    setStatus(lessonMsg, "Add a student first.", true);
    return;
  }

  try {
    const studentSnap = await getDoc(doc(db, "users", lessonStudent.value));
    const studentName = studentSnap.exists() ? studentSnap.data().displayName : "";

    await addDoc(collection(db, "lessons"), {
      teacherId: currentUser.uid,
      teacherName: currentProfile?.displayName || "Teacher",
      studentId: lessonStudent.value,
      studentName,
      title: lessonTitle.value.trim(),
      description: lessonDesc.value.trim(),
      pdfUrl: lessonPdfUrl.value.trim(),
      createdAt: serverTimestamp(),
    });

    lessonForm.reset();
    setStatus(lessonMsg, "Lesson published.");
  } catch (error) {
    setStatus(lessonMsg, error.message || "Lesson upload failed.", true);
  }
});

taskForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus(taskMsg, "");
  if (!currentUser) return;
  if (!taskStudent.value) {
    setStatus(taskMsg, "Select a student first.", true);
    return;
  }

  try {
    const studentSnap = await getDoc(doc(db, "users", taskStudent.value));
    const studentName = studentSnap.exists() ? studentSnap.data().displayName : "";

    await addDoc(collection(db, "tasks"), {
      teacherId: currentUser.uid,
      teacherName: currentProfile?.displayName || "Teacher",
      studentId: taskStudent.value,
      studentName,
      title: taskTitle.value.trim(),
      details: taskDetails.value.trim(),
      type: taskType.value,
      dueDate: taskDue.value || "",
      completed: false,
      createdAt: serverTimestamp(),
    });

    taskForm.reset();
    setStatus(taskMsg, "Task assigned.");
  } catch (error) {
    setStatus(taskMsg, error.message || "Task assignment failed.", true);
  }
});

testForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  setStatus(testMsg, "");
  if (!currentUser) return;
  if (!testStudent.value) {
    setStatus(testMsg, "Select a student first.", true);
    return;
  }

  try {
    const studentSnap = await getDoc(doc(db, "users", testStudent.value));
    const studentName = studentSnap.exists() ? studentSnap.data().displayName : "";

    await addDoc(collection(db, "tests"), {
      teacherId: currentUser.uid,
      teacherName: currentProfile?.displayName || "Teacher",
      studentId: testStudent.value,
      studentName,
      title: testTitle.value.trim(),
      details: testDetails.value.trim(),
      dueDate: testDue.value || "",
      createdAt: serverTimestamp(),
    });

    testForm.reset();
    setStatus(testMsg, "Test assigned.");
  } catch (error) {
    setStatus(testMsg, error.message || "Test assignment failed.", true);
  }
});

studentTasks.addEventListener("click", async (event) => {
  const btn = event.target.closest("button[data-action='done']");
  if (!btn) return;
  const id = btn.dataset.id;
  await updateDoc(doc(db, "tasks", id), {
    completed: true,
    completedAt: serverTimestamp(),
  });
});

studentLessons.addEventListener("click", async (event) => {
  const btn = event.target.closest("button[data-action='finish-lesson']");
  if (!btn) return;
  const id = btn.dataset.id;
  await updateDoc(doc(db, "lessons", id), {
    completed: true,
    completedAt: serverTimestamp(),
  });
});

chatMessages.addEventListener("click", async (event) => {
  const btn = event.target.closest("button[data-action='delete-msg']");
  if (!btn) return;
  const bubble = btn.closest(".chat-bubble");
  if (!bubble || !currentUser) return;
  if (bubble.dataset.sender !== currentUser.uid) return;

  if (selectedGroupChat) {
    await deleteDoc(doc(db, "group_chats", selectedGroupChat.groupId, "messages", bubble.dataset.id));
    return;
  }

  if (selectedStudentChat) {
    await deleteDoc(doc(db, "chats", selectedStudentChat.chatId, "messages", bubble.dataset.id));
  }
});

teacherChatMessages.addEventListener("click", async (event) => {
  const btn = event.target.closest("button[data-action='delete-msg']");
  if (!btn) return;
  const bubble = btn.closest(".chat-bubble");
  if (!bubble || !currentUser) return;
  if (bubble.dataset.sender !== currentUser.uid) return;
  if (!selectedTeacherChat) return;
  await deleteDoc(doc(db, "chats", selectedTeacherChat.chatId, "messages", bubble.dataset.id));
});

studentChatList.addEventListener("click", async (event) => {
  const card = event.target.closest(".chat-item");
  if (!card || !currentUser) return;
  const role = card.dataset.role;
  if (role === "group") {
    await ensureGroupChat({
      id: card.dataset.id,
      name: card.dataset.name,
      role: "group",
      groupType: card.dataset.groupType || "general",
      grade: card.dataset.grade || "",
    });
    bindGroupChat(card.dataset.id, card.dataset.name);
    return;
  }
  const contact = {
    id: card.dataset.otherId,
    name: card.dataset.name,
    role,
  };
  const chatId = await ensureChatForContact(contact);
  if (!chatId) return;
  bindStudentChat(chatId, contact);
});

teacherChatList.addEventListener("click", async (event) => {
  const card = event.target.closest(".chat-item");
  if (!card || !currentUser) return;
  const contact = {
    id: card.dataset.otherId,
    name: card.dataset.name,
    role: card.dataset.role,
  };
  const chatId = await ensureChatForContact(contact);
  if (!chatId) return;
  bindTeacherChat(chatId, contact);
});

approvedStudents.addEventListener("click", async (event) => {
  const btn = event.target.closest("button[data-action]");
  if (!btn) return;
  const studentId = btn.dataset.id;
  const snap = await getDoc(doc(db, "users", studentId));
  if (!snap.exists()) return;
  const data = snap.data();

  if (btn.dataset.action === "select") {
    if (!currentUser) return;
    await ensureLink(currentUser.uid, studentId);
    setSelectedStudent(studentId);
    return;
  }

  if (btn.dataset.action === "preview") {
    selectedStudentProfile = { id: studentId, ...data };
    const summary = await buildStudentSummary(studentId);
    studentPreviewBody.innerHTML = `
      <div class="list-item">
        <strong>${escapeHtml(data.displayName || "Student")}</strong>
        <p>${escapeHtml(data.email || "")}</p>
        <small>${escapeHtml(data.grade || "")}</small>
        <small>Status: ${escapeHtml(data.status || "")}</small>
      </div>
      ${summary}
    `;
    studentPreviewDialog.showModal();
  }

  if (btn.dataset.action === "link") {
    if (!currentUser) return;
    await ensureLink(currentUser.uid, studentId);
  }
});

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  if (selectedGroupChat) {
    await sendGroupMessage(selectedGroupChat.groupId, selectedGroupChat.name, text);
    chatInput.value = "";
    return;
  }
  if (!selectedStudentChat || !currentUser) return;
  const contact = { id: selectedStudentChat.contactId, name: selectedStudentChat.name, role: selectedStudentChat.role };
  await sendMessageToChat(selectedStudentChat.chatId, contact, text);
  chatInput.value = "";
});

pendingChatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!selectedPendingChat || !currentUser) return;
  const text = pendingChatInput.value.trim();
  if (!text) return;
  await sendMessageToChat(selectedPendingChat.chatId, selectedPendingChat.contact, text);
  pendingChatInput.value = "";
});

teacherChatForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!selectedTeacherChat || !currentUser) return;
  const text = teacherChatInput.value.trim();
  if (!text) return;
  const contact = { id: selectedTeacherChat.contactId, name: selectedTeacherChat.name, role: selectedTeacherChat.role };
  await sendMessageToChat(selectedTeacherChat.chatId, contact, text);
  teacherChatInput.value = "";
});

studentChatAddForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentUser) return;
  setStatus(studentChatAddMsg, "");
  const email = studentChatEmail.value.trim().toLowerCase();
  if (!email) return;
  const snapshot = await getDocs(query(collection(db, "users"), where("email", "==", email), limit(1)));
  if (snapshot.empty) {
    setStatus(studentChatAddMsg, "User not found.", true);
    return;
  }
  const data = snapshot.docs[0].data();
  const contact = { id: data.uid, name: data.displayName || data.email || "User", role: data.role || "user" };
  const chatId = await ensureChatForContact(contact);
  bindStudentChat(chatId, contact);
  studentChatEmail.value = "";
});

teacherChatAddForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!currentUser) return;
  setStatus(teacherChatAddMsg, "");
  const email = teacherChatEmail.value.trim().toLowerCase();
  if (!email) return;
  const snapshot = await getDocs(query(collection(db, "users"), where("email", "==", email), limit(1)));
  if (snapshot.empty) {
    setStatus(teacherChatAddMsg, "Student not found.", true);
    return;
  }
  const data = snapshot.docs[0].data();
  const contact = { id: data.uid, name: data.displayName || data.email || "User", role: data.role || "user" };
  const chatId = await ensureChatForContact(contact);
  bindTeacherChat(chatId, contact);
  teacherChatEmail.value = "";
});

studentProfileBtn.addEventListener("click", () => {
  profileName.value = currentProfile?.displayName || "";
  profileMsg.textContent = "";
  profileDialog.showModal();
});

teacherProfileBtn.addEventListener("click", () => {
  profileName.value = currentProfile?.displayName || "";
  profileMsg.textContent = "";
  profileDialog.showModal();
});

profileForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    await updateProfileName(profileName.value.trim());
    setStatus(profileMsg, "Profile updated.");
    profileDialog.close();
  } catch (error) {
    setStatus(profileMsg, error.message || "Update failed.", true);
  }
});

closeProfile.addEventListener("click", () => profileDialog.close());

adminGateForm.addEventListener("submit", (event) => {
  event.preventDefault();
  setStatus(adminGateMsg, "");
  if (adminGatePass.value.trim() !== ADMIN_PASS) {
    setStatus(adminGateMsg, "Wrong password.", true);
    return;
  }
  const expiresAt = Date.now() + ADMIN_UNLOCK_DAYS * 24 * 60 * 60 * 1000;
  localStorage.setItem(ADMIN_UNLOCK_KEY, String(expiresAt));
  window.location.href = "./admin.html";
});

closeAdminGate.addEventListener("click", () => adminGate.close());
closeStudentPreview.addEventListener("click", () => studentPreviewDialog.close());

onboardRole.addEventListener("change", () => {
  const isTeacher = onboardRole.value === "teacher";
  teacherExtra.classList.toggle("hidden", !isTeacher);
  teacherDegree.required = isTeacher;
  teacherClasses.required = isTeacher;
  teacherExperience.required = isTeacher;
});

selectStudentBtn.addEventListener("click", () => {
  if (!selectedStudentProfile) return;
  setSelectedStudent(selectedStudentProfile.id);
  studentPreviewDialog.close();
});

startChatBtn.addEventListener("click", async () => {
  if (!selectedStudentProfile || !currentUser) return;
  const contact = {
    id: selectedStudentProfile.id,
    name: selectedStudentProfile.displayName || "Student",
    role: "student",
  };
  const chatId = await ensureChatForContact(contact);
  if (!chatId) return;
  bindTeacherChat(chatId, contact);
  studentPreviewDialog.close();
});

resendVerify.addEventListener("click", async () => {
  if (!currentUser) return;
  setStatus(verifyMsg, "");
  try {
    await sendEmailVerification(currentUser);
    setStatus(verifyMsg, "Verification email sent.");
  } catch (error) {
    setStatus(verifyMsg, error.message || "Could not resend verification.", true);
  }
});

refreshVerify.addEventListener("click", async () => {
  if (!currentUser) return;
  setStatus(verifyMsg, "");
  try {
    await reload(currentUser);
    if (currentUser.emailVerified) {
      verifyNotice.classList.add("hidden");
      setStatus(verifyMsg, "");
    } else {
      setStatus(verifyMsg, "Still not verified. Check your email.", true);
    }
  } catch (error) {
    setStatus(verifyMsg, error.message || "Could not refresh verification.", true);
  }
});

onAuthStateChanged(auth, async (user) => {
  currentUser = user;
  if (!user) {
    currentProfile = null;
    resetDashboard();
    return;
  }

  currentProfile = await ensureUserProfile(user);
  hideRoleNotice();

  const profileRef = doc(db, "users", user.uid);
  onSnapshot(profileRef, (snap) => {
    if (!snap.exists()) return;
    currentProfile = { id: snap.id, ...snap.data() };
    const profileComplete = currentProfile.profileComplete !== false;

    if (needsEmailVerification(user)) {
      showVerifyNotice();
    }

    if (currentProfile.status === "disabled") {
      showDisabledNotice();
      return;
    }

    const feeOk = currentProfile.feeApproved || currentProfile.freeAccess;
    const fullyApproved = currentProfile.status === "approved" && currentProfile.manualEmailVerified && feeOk;

    if (!fullyApproved) {
      if (currentProfile.status !== "approved") {
        if (!profileComplete) {
          onboardRole.value = currentProfile.roleRequested || currentProfile.role || "student";
          const isTeacher = onboardRole.value === "teacher";
          teacherExtra.classList.toggle("hidden", !isTeacher);
          teacherDegree.required = isTeacher;
          teacherClasses.required = isTeacher;
          teacherExperience.required = isTeacher;
          onboardGrade.value = currentProfile.grade || "Grade 1";
          onboardPhone.value = currentProfile.phone || "";
          onboardNotes.value = currentProfile.notes || "";
          onboardDialog.showModal();
        }
      }
      showPendingView();
      await bindPendingChat();
      return;
    }

    if (currentProfile.role === "admin") {
      showRoleNotice("You are an admin. Use the hidden admin panel to manage everything.");
    }

    if (currentProfile.role === "teacher") {
      teacherWelcome.textContent = `Welcome ${currentProfile.displayName}`;
      showDashboard("teacher");
      startTeacherRealtime(user.uid);
      return;
    }

    if (currentProfile.role === "student") {
      studentWelcome.textContent = `Welcome ${currentProfile.displayName}`;
      showDashboard("student");
      startStudentRealtime(user.uid);
      return;
    }

    showRoleNotice("Your role is not assigned yet.");
  });
});

initHiddenAdminTrigger();
startSliderRealtime();
startStatsRealtime();
startBrandingRealtime();
wirePwaInstall();

