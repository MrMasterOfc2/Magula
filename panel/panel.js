const STORAGE_KEY = "galewela-admin-content";
const BOOKINGS_KEY = "galewela-bookings";
const PIN_KEY = "galewela-admin-pin";
const THEME_KEY = "galewela-theme";
const DEFAULT_PIN = "1234";

const loginPanel = document.querySelector("#login-panel");
const dashboard = document.querySelector("#dashboard");
const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");
const logoutBtn = document.querySelector("#logout-btn");
const blogForm = document.querySelector("#blog-form");
const postList = document.querySelector("#post-list");
const detailsForm = document.querySelector("#details-form");
const pageDetailForm = document.querySelector("#page-detail-form");
const pageDetailList = document.querySelector("#page-detail-list");
const pinForm = document.querySelector("#pin-form");
const exportBtn = document.querySelector("#export-btn");
const exportBox = document.querySelector("#export-box");
const importFile = document.querySelector("#import-file");
const resetBtn = document.querySelector("#reset-btn");
const eventForm = document.querySelector("#event-form");
const eventListAdmin = document.querySelector("#event-list-admin");
const galleryForm = document.querySelector("#gallery-form");
const galleryListAdmin = document.querySelector("#gallery-list-admin");
const themeToggle = document.querySelector("#theme-toggle");
const bookingsListAdmin = document.querySelector("#bookings-list-admin");
const adminChatList = document.querySelector("#admin-chat-list");
const adminChatStatus = document.querySelector("#chat-admin-status");

const defaultContent = {
  profiles: {
    president: { image: "", name: "Hon. Chairman, Galewela Pradeshiya Sabha", message: "" },
    secretary: { image: "", name: "Secretary, Galewela Pradeshiya Sabha", message: "" }
  },
  officers: {
    infoGiving: { image: "", name: "Kumari Aberathna", designation: "Secretary - Galewela PS", phone: "066-2289219", email: "galewelapradeshiyasabha@yahoo.com" },
    infoOfficer: { image: "", name: "R.M.K.G. Radanika Kumari", designation: "Chief Management Service Officer", phone: "066-2289275", email: "galewelapradeshiyasabha@yahoo.com" }
  },
  responsibilities: {
    institute: [
      { id: "1", task: "සේවක අධීක්ෂණය, රාජකාරී පැවරීම්, මාර්ගස්ථ මුදල් රක්ෂණය", subjectNo: "01/01", officer: "ආර්.එම්.කේ.ජී. රදනිකා කුමාරි මිය" },
      { id: "2", task: "වාහන විෂය රාජකාරී, සභාව සතු දේපළ ගාස්තු මත ලබාදීම", subjectNo: "01/02", officer: "ජී.ජී.පී.එස් බංඩාර මයා" }
    ],
    accounts: [
      { id: "1", task: "අභ්‍යන්තර විගණනය, විගණන කළමනාකරණ කමිටුව, හිඟ ආදායම් කමිටුව", subjectNo: "02/01", officer: "ඒ.ඒ.සී. ඩයස් මිය" },
      { id: "2", task: "විගණන විමසුම් සඳහා පිළිතුරු සැපයීම, කාර්යාල පරීක්ෂණය", subjectNo: "02/01", officer: "පද්මිණී හේන්දා විතාරණ මිය" }
    ],
    development: [
      { id: "1", task: "සභාව සතු ඉඩම් පවරා ගැනීම සම්බන්ධ රාජකාරී", subjectNo: "03/01", officer: "ඒ.එම්.එන්.පී. අධිකාරී මිය" },
      { id: "2", task: "ඵලදායිතා වැඩසටහන, කාර්යසාධන වැඩසටහන", subjectNo: "03/02", officer: "පී.එම්.ජී.ටී. කුමාරි මිය" }
    ],
    physical: [
      { id: "1", task: "තාක්ෂණ නිලධාරී තනතුරට අදාළ සියළු රාජකාරී", subjectNo: "04/01", officer: "පී.ජී.ඒ. නෙත්තිකුමාර මයා" },
      { id: "2", task: "ගොඩනැගිළි සැලසුම් අනුමත කිරීම, ඉඩම් අනුබෙදුම් අනුමත කිරීම", subjectNo: "04/03", officer: "කේ.ජී.එන්.එස්. වැලිවිට මිය" }
    ],
    revenue: [
      { id: "1", task: "වරිපනම් බදු, අක්කර බදු, විනෝද බදු", subjectNo: "05/01", officer: "එච්.එම්.ආර්.එස්. නවරත්න මිය" },
      { id: "2", task: "මස් කඩ කුළී, කඩ කුළී, සතිපොළ ගාස්තු", subjectNo: "05/02", officer: "ඩබ්.ඒ.පී. වීරසිංහ මයා" }
    ]
  },
  details: {
    phone: "+94 66 228 1000",
    email: "info@galewela.ps.gov.lk",
    address: "Galewela, Matale District, Central Province, Sri Lanka.",
    welcome: "",
    officeHours: "Monday - Friday: 8.30am - 4.15pm",
    lunchBreak: "Lunch Break: 12.30pm - 1.30pm",
    emergencyPhone: "+94 66 228 1000",
    howToReach: "Galewela town center, near the main bus stand.",
    serviceNote: ""
  },
  pageDetails: [],
  posts: [],
  events: [],
  gallery: []
};

// ==================== WHATSAPP MESSAGE FUNCTION (Shortened ID) ====================
function sendWhatsAppApproval(booking) {
    const bookingDate = new Date(booking.startDate).toLocaleDateString('en-GB');
    // Display only first 8 characters of booking ID for better readability
    const shortId = booking.id ? booking.id.substring(0, 8) : 'N/A';
    const message = `✅ *ගලේවෙල ප්‍රාදේශීය සභාව - වෙන්කිරීම අනුමත කිරීම*

*වෙන්කිරීමේ අංකය:* ${shortId}
*නම:* ${booking.name}
*පහසුකම:* ${booking.facility}
*දිනය:* ${bookingDate}
*අරමුණ:* ${booking.purpose}
*තත්වය:* ✅ අනුමත කර ඇත

කරුණාකර අදාළ ගාස්තු ගෙවීම සඳහා කාර්යාලය අමතන්න.
ස්තුතියි! - ගලේවෙල ප්‍රාදේශීය සභාව`;
    
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = booking.phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

// ==================== BOOKING FUNCTIONS ====================
function getBookings() {
  return Array.isArray(bookingState) ? bookingState : [];
}

async function saveBookings(bookings) {
  bookingState = Array.isArray(bookings) ? bookings : [];
  renderBookings();
  renderAdminBookingCalendar();
  const dbRealtime = await getRealtimeDb();
  if (dbRealtime) {
    await dbRealtime.ref("galewela-bookings").set(bookingsArrayToMap(bookingState));
    return;
  }
  const firestore = getDb();
  if (!firestore) throw new Error("Firebase is not configured.");
  await firestore.collection("galewela-bookings").doc("all").set({
    bookings: bookingState,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  }, { merge: true });
}

function renderBookings() {
  if (!bookingsListAdmin) return;
  const bookings = getBookings().filter((booking) => booking && booking.id && booking.name && booking.startDate);
  const pendingCount = bookings.filter(b => b.status === "pending").length;
  const approvedCount = bookings.filter(b => b.status === "approved").length;
  
  const pendingSpan = document.querySelector("#pending-count");
  const approvedSpan = document.querySelector("#approved-count");
  const bookingCountSpan = document.querySelector("#booking-count");
  
  if (pendingSpan) pendingSpan.textContent = `Pending: ${pendingCount}`;
  if (approvedSpan) approvedSpan.textContent = `Approved: ${approvedCount}`;
  if (bookingCountSpan) bookingCountSpan.textContent = bookings.length;
  
  if (bookings.length === 0) {
    bookingsListAdmin.innerHTML = '<p class="muted">No booking requests yet.</p>';
    return;
  }
  
  // Sort bookings by date (newest first ideally, or by status? Let's sort by creation date descending)
  bookings.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  
  bookingsListAdmin.innerHTML = "";
  bookings.forEach((booking) => {
    const item = document.createElement("article");
    item.className = `booking-item ${booking.status}`;
    item.dataset.id = booking.id;
    const statusClass = booking.status === "pending" ? "status-pending" : "status-approved";
    const statusText = booking.status === "pending" ? "Pending" : "Approved";
    const startDate = new Date(booking.startDate).toLocaleDateString();
    
    item.innerHTML = `
      <div style="min-width: 60px;">
        <div class="booking-facility-badge">${escapeHtml(booking.facility)}</div>
      </div>
      <div style="flex: 1;">
        <strong>${escapeHtml(booking.name)}</strong>
        <div class="booking-dates">Date: ${startDate}</div>
        <div style="font-size: 0.85rem; margin-top: 5px;"><strong>Purpose:</strong> ${escapeHtml(booking.purpose)}</div>
        <div style="font-size: 0.8rem; color: var(--muted);"><strong>NIC:</strong> ${escapeHtml(booking.nic)} | <strong>Phone:</strong> ${escapeHtml(booking.phone)}</div>
        ${booking.details ? `<div style="font-size: 0.8rem; margin-top: 4px;">📝 ${escapeHtml(booking.details)}</div>` : ""}
      </div>
      <div>
        <span class="booking-status ${statusClass}">${statusText}</span>
      </div>
      <div class="booking-actions">
        ${booking.status === "pending" ? `<button class="approve-btn" data-id="${booking.id}" style="background: var(--green);">Approve & Send WhatsApp</button>` : ""}
        <button class="ghost delete-booking-btn" data-id="${booking.id}" style="background: rgba(255,0,0,0.1);">Delete</button>
      </div>
    `;
    item.querySelector(".approve-btn")?.addEventListener("click", () => approveBooking(booking.id));
    item.querySelector(".delete-booking-btn")?.addEventListener("click", () => deleteBooking(booking.id));
    bookingsListAdmin.appendChild(item);
  });
}

async function approveBooking(id) {
  const bookings = getBookings();
  const index = bookings.findIndex(b => b.id === id);
  if (index !== -1) {
    bookings[index].status = "approved";
    bookings[index].approvedAt = new Date().toISOString();
    try {
      await saveBookings(bookings);
      sendWhatsAppApproval(bookings[index]);
      renderStats(getContent());
    } catch (error) {
      console.error(error);
      alert("Booking approval was not saved to Firebase. Please check Firebase connection/rules.");
    }
  }
}

async function deleteBooking(id) {
  if (!confirm("Delete this booking request?")) return;
  const bookings = getBookings();
  const filtered = bookings.filter(b => b.id !== id);
  try {
    await saveBookings(filtered);
    renderStats(getContent());
  } catch (error) {
    console.error(error);
    alert("Booking delete was not saved to Firebase. Please check Firebase connection/rules.");
  }
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>]/g, function(m) {
    if (m === "&") return "&amp;";
    if (m === "<") return "&lt;";
    if (m === ">") return "&gt;";
    return m;
  });
}

function formatChatDate(value) {
  if (!value) return "";
  const date = value.toDate ? value.toDate() : new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

function toChatTime(value) {
  if (!value) return 0;
  if (typeof value === "number") return value;
  if (value.toDate) return value.toDate().getTime();
  return Date.parse(value) || 0;
}

function getChatMessageTime(message) {
  return Number(message.createdAtMs) || toChatTime(message.sentAt) || toChatTime(message.createdAtIso) || toChatTime(message.createdAt);
}

function sortChatMessages(messages) {
  return [...messages].sort((a, b) => getChatMessageTime(b) - getChatMessageTime(a));
}

function getLocalChatMessages() {
  return [];
}

function mergeChatMessages(primary = [], secondary = []) {
  const map = new Map();
  [...secondary, ...primary].forEach((message) => {
    const id = message.id || `${message.name || "guest"}-${message.createdAtMs || message.sentAt || message.createdAtIso || message.text}`;
    map.set(id, { ...message, id });
  });
  return sortChatMessages([...map.values()]);
}

// ==================== ADMIN CALENDAR ====================
let adminCurrentDate = new Date();

function renderAdminBookingCalendar() {
    const container = document.getElementById("admin-calendar-grid");
    const monthYearSpan = document.getElementById("admin-cal-month-year");
    if (!container) return;
    const year = adminCurrentDate.getFullYear();
    const month = adminCurrentDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startWeekday = firstDayOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthYearSpan.textContent = `${monthNames[month]} ${year}`;
    container.innerHTML = "";
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    weekdays.forEach(day => {
        const header = document.createElement("div");
        header.textContent = day;
        header.style.fontWeight = "bold";
        header.style.fontSize = "0.8rem";
        header.style.textAlign = "center";
        container.appendChild(header);
    });
    for (let i = 0; i < startWeekday; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "admin-calendar-day empty";
        container.appendChild(emptyCell);
    }
    const bookings = getBookings();
    const approvedBookings = bookings.filter(b => b.status === "approved");
    function isDateBooked(date, booking) {
        const bookingDate = new Date(booking.startDate);
        const checkDate = new Date(date);
        checkDate.setHours(0, 0, 0, 0);
        bookingDate.setHours(0, 0, 0, 0);
        return checkDate.getTime() === bookingDate.getTime();
    }
    for (let d = 1; d <= daysInMonth; d++) {
        const date = new Date(year, month, d);
        const cell = document.createElement("div");
        cell.className = "admin-calendar-day";
        let matchedBooking = null;
        for (let booking of approvedBookings) {
            if (isDateBooked(date, booking)) {
                matchedBooking = booking;
                break;
            }
        }
        if (matchedBooking) cell.classList.add("has-booking");
        cell.innerHTML = `<div class="admin-calendar-date">${d}</div>`;
        if (matchedBooking) {
            const badgeDiv = document.createElement("div");
            badgeDiv.style.marginTop = "4px";
            const span = document.createElement("span");
            span.className = "admin-booking-badge";
            span.textContent = `${matchedBooking.facility.substring(0, 15)}`;
            span.title = `${matchedBooking.name} - ${matchedBooking.purpose}`;
            badgeDiv.appendChild(span);
            cell.appendChild(badgeDiv);
        }
        container.appendChild(cell);
    }
}

document.addEventListener("click", (e) => {
    if (e.target.id === "admin-cal-prev") { adminCurrentDate.setMonth(adminCurrentDate.getMonth() - 1); renderAdminBookingCalendar(); }
    if (e.target.id === "admin-cal-next") { adminCurrentDate.setMonth(adminCurrentDate.getMonth() + 1); renderAdminBookingCalendar(); }
});

// ==================== RESPONSIBILITIES FUNCTIONS ====================
let currentDept = "institute";

function getResponsibilities() {
  const content = getContent();
  return content.responsibilities || defaultContent.responsibilities;
}

function saveResponsibilities(responsibilities) {
  const content = getContent();
  content.responsibilities = responsibilities;
  saveContent(content);
  renderResponsibilitiesTable();
}

function renderResponsibilitiesTable() {
  const container = document.getElementById("responsibilities-container");
  if (!container) return;
  const responsibilities = getResponsibilities();
  const deptData = responsibilities[currentDept] || [];
  
  if (deptData.length === 0) {
    container.innerHTML = '<p class="muted">No responsibilities added yet. Use the form above to add.</p>';
    return;
  }
  
  let html = `<table class="resp-table">
    <thead>
      <tr><th>#</th><th>ඉටුකළ යුතු කාර්යය</th><th>විෂය අංකය</th><th>කාර්යය ඉටුකරන නිලධාරියාගේ නම</th><th>Actions</th></tr>
    </thead>
    <tbody>`;
  
  deptData.forEach((item, index) => {
    html += `<tr data-id="${item.id}">
      <td>${index + 1}</td>
      <td><strong>${escapeHtml(item.task)}</strong></td>
      <td>${escapeHtml(item.subjectNo)}</td>
      <td>${escapeHtml(item.officer)}</td>
      <td class="resp-actions">
        <button class="edit-resp-btn" data-id="${item.id}" style="background: #d49a25;">Edit</button>
        <button class="delete-resp-btn" data-id="${item.id}" style="background: #e65b66;">Delete</button>
       </td>
     </tr>`;
  });
  html += `</tbody>
  </table>`;
  container.innerHTML = html;
  
  document.querySelectorAll('.edit-resp-btn').forEach(btn => {
    btn.addEventListener('click', () => editResponsibility(btn.dataset.id));
  });
  document.querySelectorAll('.delete-resp-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteResponsibility(btn.dataset.id));
  });
}

function addResponsibility(task, subjectNo, officer) {
  if (!task || !subjectNo || !officer) {
    alert("Please fill all fields");
    return false;
  }
  const responsibilities = getResponsibilities();
  if (!responsibilities[currentDept]) responsibilities[currentDept] = [];
  const newId = Date.now().toString();
  responsibilities[currentDept].push({
    id: newId,
    task: task.trim(),
    subjectNo: subjectNo.trim(),
    officer: officer.trim()
  });
  saveResponsibilities(responsibilities);
  return true;
}

function editResponsibility(id) {
  const responsibilities = getResponsibilities();
  const deptData = responsibilities[currentDept] || [];
  const item = deptData.find(i => i.id === id);
  if (!item) return;
  
  const newTask = prompt("Edit Task:", item.task);
  if (newTask === null) return;
  const newSubjectNo = prompt("Edit Subject Number:", item.subjectNo);
  if (newSubjectNo === null) return;
  const newOfficer = prompt("Edit Officer Name:", item.officer);
  if (newOfficer === null) return;
  
  item.task = newTask.trim();
  item.subjectNo = newSubjectNo.trim();
  item.officer = newOfficer.trim();
  saveResponsibilities(responsibilities);
}

function deleteResponsibility(id) {
  if (!confirm("Are you sure you want to delete this responsibility?")) return;
  const responsibilities = getResponsibilities();
  if (responsibilities[currentDept]) {
    responsibilities[currentDept] = responsibilities[currentDept].filter(i => i.id !== id);
    saveResponsibilities(responsibilities);
  }
}

function setupResponsibilitiesListeners() {
  const deptSelect = document.getElementById("resp-dept-select");
  if (deptSelect) {
    deptSelect.addEventListener("change", (e) => {
      currentDept = e.target.value;
      renderResponsibilitiesTable();
    });
  }
  const addBtn = document.getElementById("add-resp-btn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const task = document.getElementById("new-task").value;
      const subjectNo = document.getElementById("new-subject-no").value;
      const officer = document.getElementById("new-officer").value;
      if (addResponsibility(task, subjectNo, officer)) {
        document.getElementById("new-task").value = "";
        document.getElementById("new-subject-no").value = "";
        document.getElementById("new-officer").value = "";
      }
    });
  }
}

// ==================== STORAGE & API ====================
let db = null;
let realtimeDb = null;
let firebaseDatabaseReadyPromise = null;
let firebaseReady = false;
let adminChatUnsubscribe = null;
let adminChatMessages = [];
let contentState = null;
let bookingState = [];

function hasFirebaseConfig(config) {
  return Boolean(config && config.apiKey && config.projectId && config.appId);
}

function getDb() {
  if (db) return db;
  const config = window.GALEWELA_FIREBASE_CONFIG;
  if (!hasFirebaseConfig(config) || !window.firebase || !window.firebase.initializeApp) return null;
  try {
    if (!firebase.apps.length) firebase.initializeApp(config);
    db = firebase.firestore();
    firebaseReady = true;
    return db;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function loadFirebaseDatabaseSdk() {
  if (window.firebase && window.firebase.database) return Promise.resolve();
  if (firebaseDatabaseReadyPromise) return firebaseDatabaseReadyPromise;
  firebaseDatabaseReadyPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-firebase-database="true"]');
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.gstatic.com/firebasejs/10.12.5/firebase-database-compat.js";
    script.dataset.firebaseDatabase = "true";
    script.onload = resolve;
    script.onerror = () => reject(new Error("Firebase Realtime Database SDK not loaded."));
    document.head.append(script);
  });
  return firebaseDatabaseReadyPromise;
}

async function getRealtimeDb() {
  if (realtimeDb) return realtimeDb;
  const config = window.GALEWELA_FIREBASE_CONFIG;
  if (!hasFirebaseConfig(config) || !config.databaseURL || !window.firebase || !window.firebase.initializeApp) return null;
  try {
    if (!firebase.apps.length) firebase.initializeApp(config);
    await loadFirebaseDatabaseSdk();
    realtimeDb = firebase.database();
    firebaseReady = true;
    return realtimeDb;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function objectToArray(value) {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];
  return Object.entries(value)
    .filter(([, item]) => item && typeof item === "object")
    .map(([id, item]) => ({ id, ...item }));
}

function bookingsArrayToMap(bookings) {
  return bookings.reduce((map, booking) => {
    const id = booking.id || (window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()));
    map[id] = { ...booking, id };
    return map;
  }, {});
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function getPin() {
  return localStorage.getItem(PIN_KEY) || DEFAULT_PIN;
}

function getContent() {
  const stored = contentState || {};
  return {
    ...defaultContent,
    ...stored,
    details: { ...defaultContent.details, ...(stored.details || {}) },
    pageDetails: Array.isArray(stored.pageDetails) ? stored.pageDetails : []
  };
}

function saveContent(content) {
  contentState = { ...defaultContent, ...content };
  render();
  saveContentToFirebase(contentState).catch((error) => {
    console.error(error);
    alert("Details were not saved to Firebase. Please check Firebase connection/rules.");
  });
}

async function saveContentToFirebase(content) {
  const dbRealtime = await getRealtimeDb();
  if (dbRealtime) {
    await dbRealtime.ref("galewela-site/content").set({
      ...content,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    });
    return;
  }
  const firestore = getDb();
  if (!firestore) throw new Error("Firebase is not configured.");
  await firestore.collection("galewela-site").doc("content").set({
    ...content,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
  if (themeToggle) themeToggle.innerHTML = theme === "dark" ? '<span>Light Mode</span>' : '<span>Dark Mode</span>';
}

function fileToDataUrl(file) {
  return new Promise((resolve) => {
    if (!file) { resolve(""); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxWidth = 1100;
        const scale = Math.min(1, maxWidth / image.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.82));
      };
      image.onerror = () => resolve(reader.result);
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function normalizeImageUrl(value) {
  const url = String(value || "").trim();
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? url : "";
  } catch {
    return "";
  }
}

function isRemoteImage(value) {
  return /^https?:\/\//i.test(String(value || ""));
}

async function getFormImage(form, currentImage = "") {
  const urlImage = normalizeImageUrl(form.elements.imageUrl?.value);
  if (urlImage) return urlImage;
  const file = form.querySelector('input[type="file"]')?.files[0];
  const uploadedImage = await fileToDataUrl(file);
  return uploadedImage || currentImage || "";
}

function setAuth(isLoggedIn) {
  if (loginPanel) loginPanel.classList.toggle("is-hidden", isLoggedIn);
  if (dashboard) dashboard.classList.toggle("is-hidden", !isLoggedIn);
  if (isLoggedIn) {
    sessionStorage.setItem(PIN_KEY, getPin());
    render();
    bootAdminChat();
  } else if (adminChatUnsubscribe) {
    sessionStorage.removeItem(PIN_KEY);
    adminChatUnsubscribe();
    adminChatUnsubscribe = null;
  }
}

// ==================== RENDER FUNCTIONS ====================
function renderEvents(content) {
  if (!eventListAdmin) return;
  eventListAdmin.innerHTML = "";
  if (!content.events || !content.events.length) {
    eventListAdmin.innerHTML = '<p class="muted">No calendar events added yet.</p>';
    return;
  }
  content.events.forEach((event) => {
    const item = document.createElement("article");
    item.className = "post-item";
    item.innerHTML = `
      <div class="icon-box">EV</div>
      <div><strong></strong><p class="muted"></p></div>
      <div class="item-actions">
        <button class="ghost edit-btn" type="button"><i data-lucide="pencil"></i><span>Edit</span></button>
        <button class="danger delete-btn" type="button"><i data-lucide="trash-2"></i><span>Delete</span></button>
      </div>
    `;
    item.querySelector("strong").textContent = event.title;
    item.querySelector("p").textContent = `${event.date} | ${event.time || "Public programme"}`;
    item.querySelector(".edit-btn").addEventListener("click", () => {
      if (eventForm) {
        eventForm.elements.title.value = event.title;
        eventForm.elements.date.value = event.date;
        eventForm.elements.time.value = event.time || "";
      }
      const next = getContent();
      next.events = next.events.filter((entry) => entry.id !== event.id);
      saveContent(next);
      if (eventForm) eventForm.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    item.querySelector(".delete-btn").addEventListener("click", () => {
      const next = getContent();
      next.events = next.events.filter((entry) => entry.id !== event.id);
      saveContent(next);
    });
    eventListAdmin.append(item);
  });
}

function renderGallery(content) {
  if (!galleryListAdmin) return;
  galleryListAdmin.innerHTML = "";
  if (!content.gallery || !content.gallery.length) {
    galleryListAdmin.innerHTML = '<p class="muted">No gallery images added yet.</p>';
    return;
  }
  content.gallery.forEach((image) => {
    const item = document.createElement("article");
    item.className = "post-item";
    item.innerHTML = `
      <img alt="" />
      <div><strong></strong><p class="muted"></p></div>
      <div class="item-actions">
        <button class="ghost edit-btn" type="button"><i data-lucide="pencil"></i><span>Edit</span></button>
        <button class="danger delete-btn" type="button"><i data-lucide="trash-2"></i><span>Delete</span></button>
      </div>
    `;
    item.querySelector("img").src = image.src;
    item.querySelector("strong").textContent = image.title;
    item.querySelector("p").textContent = image.caption || "Gallery image";
    item.querySelector(".edit-btn").addEventListener("click", () => {
      if (galleryForm) {
        galleryForm.elements.title.value = image.title;
        galleryForm.elements.caption.value = image.caption || "";
        if (galleryForm.elements.imageUrl) galleryForm.elements.imageUrl.value = isRemoteImage(image.src) ? image.src : "";
      }
      const next = getContent();
      next.gallery = next.gallery.filter((entry) => entry.id !== image.id);
      saveContent(next);
      if (galleryForm) galleryForm.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    item.querySelector(".delete-btn").addEventListener("click", () => {
      const next = getContent();
      next.gallery = next.gallery.filter((entry) => entry.id !== image.id);
      saveContent(next);
    });
    galleryListAdmin.append(item);
  });
}

function renderProfiles(content) {
  ["president", "secretary"].forEach((key) => {
    const form = document.querySelector(`.profile-form[data-profile="${key}"]`);
    const preview = document.querySelector(`#${key}-preview`);
    if (form && preview) {
      const profile = content.profiles && content.profiles[key] ? content.profiles[key] : {};
      if (form.elements.name) form.elements.name.value = profile.name || "";
      if (form.elements.message) form.elements.message.value = profile.message || "";
      if (form.elements.imageUrl) form.elements.imageUrl.value = isRemoteImage(profile.image) ? profile.image : "";
      preview.src = profile.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=900&q=85";
    }
  });
  const officers = content.officers || defaultContent.officers;
  const givingForm = document.querySelector(`.profile-form[data-officer="info-giving"]`);
  if (givingForm) {
    const preview = document.querySelector("#info-giving-preview");
    if (givingForm.elements.name) givingForm.elements.name.value = officers.infoGiving?.name || "";
    if (givingForm.elements.designation) givingForm.elements.designation.value = officers.infoGiving?.designation || "";
    if (givingForm.elements.phone) givingForm.elements.phone.value = officers.infoGiving?.phone || "";
    if (givingForm.elements.email) givingForm.elements.email.value = officers.infoGiving?.email || "";
    if (givingForm.elements.imageUrl) givingForm.elements.imageUrl.value = isRemoteImage(officers.infoGiving?.image) ? officers.infoGiving.image : "";
    if (preview) preview.src = officers.infoGiving?.image || "https://via.placeholder.com/120";
  }
  const officerForm = document.querySelector(`.profile-form[data-officer="info-officer"]`);
  if (officerForm) {
    const preview = document.querySelector("#info-officer-preview");
    if (officerForm.elements.name) officerForm.elements.name.value = officers.infoOfficer?.name || "";
    if (officerForm.elements.designation) officerForm.elements.designation.value = officers.infoOfficer?.designation || "";
    if (officerForm.elements.phone) officerForm.elements.phone.value = officers.infoOfficer?.phone || "";
    if (officerForm.elements.email) officerForm.elements.email.value = officers.infoOfficer?.email || "";
    if (officerForm.elements.imageUrl) officerForm.elements.imageUrl.value = isRemoteImage(officers.infoOfficer?.image) ? officers.infoOfficer.image : "";
    if (preview) preview.src = officers.infoOfficer?.image || "https://via.placeholder.com/120";
  }
}

function renderPosts(content) {
  if (!postList) return;
  postList.innerHTML = "";
  if (!content.posts.length) {
    postList.innerHTML = "<p class=\"muted\">No admin blog posts yet.</p>";
    return;
  }
  content.posts.forEach((post) => {
    const item = document.createElement("article");
    item.className = "post-item";
    item.innerHTML = `
      <img alt="" />
      <div><strong></strong><p class="muted"></p></div>
      <div class="item-actions">
        <button class="ghost edit-btn" type="button"><i data-lucide="pencil"></i><span>Edit</span></button>
        <button class="danger delete-btn" type="button"><i data-lucide="trash-2"></i><span>Delete</span></button>
      </div>
    `;
    item.querySelector("img").src = post.image || "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=900&q=80";
    item.querySelector("strong").textContent = post.title;
    item.querySelector("p").textContent = `${post.category} | ${post.date}`;
    item.querySelector(".edit-btn").addEventListener("click", () => {
      if (blogForm) {
        blogForm.elements.title.value = post.title;
        blogForm.elements.category.value = post.category;
        blogForm.elements.date.value = post.date;
        blogForm.elements.excerpt.value = post.excerpt || "";
        if (blogForm.elements.imageUrl) blogForm.elements.imageUrl.value = isRemoteImage(post.image) ? post.image : "";
      }
      const next = getContent();
      next.posts = next.posts.filter((entry) => entry.id !== post.id);
      saveContent(next);
      if (blogForm) blogForm.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    item.querySelector(".delete-btn").addEventListener("click", () => {
      const next = getContent();
      next.posts = next.posts.filter((entry) => entry.id !== post.id);
      saveContent(next);
    });
    postList.append(item);
  });
}

function renderDetails(content) {
  if (!detailsForm) return;
  const details = { ...defaultContent.details, ...(content.details || {}) };
  if (detailsForm.elements.phone) detailsForm.elements.phone.value = details.phone || "";
  if (detailsForm.elements.email) detailsForm.elements.email.value = details.email || "";
  if (detailsForm.elements.address) detailsForm.elements.address.value = details.address || "";
  if (detailsForm.elements.welcome) detailsForm.elements.welcome.value = details.welcome || "";
  if (detailsForm.elements.officeHours) detailsForm.elements.officeHours.value = details.officeHours || "";
  if (detailsForm.elements.lunchBreak) detailsForm.elements.lunchBreak.value = details.lunchBreak || "";
  if (detailsForm.elements.emergencyPhone) detailsForm.elements.emergencyPhone.value = details.emergencyPhone || "";
  if (detailsForm.elements.howToReach) detailsForm.elements.howToReach.value = details.howToReach || "";
  if (detailsForm.elements.serviceNote) detailsForm.elements.serviceNote.value = details.serviceNote || "";
  renderPageDetails(content);
}

function renderPageDetails(content) {
  if (!pageDetailList) return;
  const items = Array.isArray(content.pageDetails) ? content.pageDetails : [];
  pageDetailList.innerHTML = "";
  if (!items.length) {
    pageDetailList.innerHTML = '<p class="muted">No page-specific details added yet.</p>';
    return;
  }

  items.forEach((detail) => {
    const item = document.createElement("article");
    item.className = "page-detail-item";
    item.innerHTML = `
      <div>
        <strong>${escapeHtml(detail.title || "Untitled detail")}</strong>
        <small>${escapeHtml(detail.page || "")}</small>
        <p>${escapeHtml(detail.text || "")}</p>
      </div>
      <button class="danger" type="button">Delete</button>
    `;
    item.querySelector("button").addEventListener("click", () => {
      const next = getContent();
      next.pageDetails = (next.pageDetails || []).filter((entry) => entry.id !== detail.id);
      saveContent(next);
    });
    pageDetailList.append(item);
  });
}

function renderStats(content) {
  const postCountSpan = document.querySelector("#post-count");
  const profileCountSpan = document.querySelector("#profile-count");
  const detailCountSpan = document.querySelector("#detail-count");
  const eventCountSpan = document.querySelector("#event-count");
  const galleryCountSpan = document.querySelector("#gallery-count");
  
  if (postCountSpan) postCountSpan.textContent = content.posts.length;
  let profileCount = (content.profiles.president.image ? 1 : 0) + (content.profiles.secretary.image ? 1 : 0);
  profileCount += (content.officers?.infoGiving?.image ? 1 : 0) + (content.officers?.infoOfficer?.image ? 1 : 0);
  if (profileCountSpan) profileCountSpan.textContent = profileCount;
  const pageDetailCount = Array.isArray(content.pageDetails) ? content.pageDetails.length : 0;
  if (detailCountSpan) detailCountSpan.textContent = Object.values(content.details || {}).filter(Boolean).length + pageDetailCount;
  if (eventCountSpan) eventCountSpan.textContent = content.events ? content.events.length : 0;
  if (galleryCountSpan) galleryCountSpan.textContent = content.gallery ? content.gallery.length : 0;
  
  const bookings = getBookings();
  const bookingCountSpan = document.querySelector("#booking-count");
  if (bookingCountSpan) bookingCountSpan.textContent = bookings.length;
  const pendingSpan = document.querySelector("#pending-count");
  const approvedSpan = document.querySelector("#approved-count");
  if (pendingSpan) pendingSpan.textContent = `Pending: ${bookings.filter(b => b.status === "pending").length}`;
  if (approvedSpan) approvedSpan.textContent = `Approved: ${bookings.filter(b => b.status === "approved").length}`;
}

function renderAdminChatMessages(messages = adminChatMessages) {
  if (!adminChatList) return;
  adminChatList.innerHTML = "";

  if (!messages.length) {
    adminChatList.innerHTML = '<p class="muted">No chat messages yet.</p>';
    return;
  }

  sortChatMessages(messages).forEach((message) => {
    const item = document.createElement("article");
    item.className = "admin-chat-item";
    item.dataset.id = message.id;
    const replies = Array.isArray(message.replies) ? message.replies : [];
    const sourceLabel = message.source === "contact-form" ? "Contact form" : "Chat box";

    item.innerHTML = `
      <div class="admin-chat-head">
        <div>
          <strong>${escapeHtml(message.name || "Guest")}</strong>
          ${message.email ? `<div class="admin-chat-email">${escapeHtml(message.email)}</div>` : ""}
          <div class="admin-chat-time">${formatChatDate(message.createdAtMs || message.sentAt || message.createdAtIso || message.createdAt)}</div>
        </div>
        <div class="admin-chat-badges">
          <span class="booking-facility-badge">${escapeHtml(sourceLabel)}</span>
          <span class="booking-facility-badge">${replies.length ? `${replies.length} admin repl${replies.length === 1 ? "y" : "ies"}` : "No reply yet"}</span>
        </div>
      </div>
      <p class="admin-chat-text">${escapeHtml(message.text || "")}</p>
      <div class="admin-replies"></div>
      <form class="admin-reply-form">
        <textarea name="reply" rows="2" maxlength="500" placeholder="Type admin reply" required></textarea>
        <button type="submit">Reply as Admin</button>
      </form>
    `;

    const repliesContainer = item.querySelector(".admin-replies");
    replies.forEach((reply) => {
      const replyItem = document.createElement("article");
      replyItem.className = "admin-reply";
      replyItem.innerHTML = `
        <strong>${escapeHtml(reply.author || "Admin Reply")}</strong>
        <p>${escapeHtml(reply.text || "")}</p>
        <div class="admin-reply-time">${formatChatDate(reply.sentAt || reply.createdAt)}</div>
      `;
      repliesContainer.appendChild(replyItem);
    });

    item.querySelector(".admin-reply-form")?.addEventListener("submit", (event) => {
      event.preventDefault();
      const textarea = event.currentTarget.elements.reply;
      const text = textarea.value.trim();
      if (!text) return;
      saveAdminChatReply(message.id, text, textarea);
    });

    adminChatList.appendChild(item);
  });
}

async function bootAdminChat() {
  if (!adminChatList || adminChatUnsubscribe) return;
  const dbRealtime = await getRealtimeDb();
  if (dbRealtime) {
    const ref = dbRealtime.ref("galewela-public-chat");
    const handler = (snapshot) => {
      adminChatMessages = sortChatMessages(objectToArray(snapshot.val()));
      renderAdminChatMessages(adminChatMessages);
      if (adminChatStatus) adminChatStatus.textContent = `Connected to Firebase (${adminChatMessages.length} messages)`;
    };
    if (adminChatStatus) adminChatStatus.textContent = "Connected to Firebase";
    ref.on("value", handler, (error) => {
      console.error(error);
      if (adminChatStatus) adminChatStatus.textContent = "Firebase chat unavailable";
      renderAdminChatMessages(adminChatMessages);
    });
    adminChatUnsubscribe = () => ref.off("value", handler);
    return;
  }
  const firestore = getDb();
  if (!firestore) {
    if (adminChatStatus) adminChatStatus.textContent = "Firebase unavailable";
    adminChatMessages = [];
    renderAdminChatMessages(adminChatMessages);
    return;
  }

  if (adminChatStatus) adminChatStatus.textContent = "Connected to Firebase";
  adminChatMessages = getLocalChatMessages();
  renderAdminChatMessages(adminChatMessages);
  adminChatUnsubscribe = firestore.collection("galewela-public-chat")
    .onSnapshot((snapshot) => {
      const firebaseMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      adminChatMessages = mergeChatMessages(firebaseMessages, getLocalChatMessages());
      renderAdminChatMessages(adminChatMessages);
      if (adminChatStatus) adminChatStatus.textContent = `Connected to Firebase (${adminChatMessages.length} messages)`;
    }, (error) => {
      console.error(error);
      if (adminChatStatus) adminChatStatus.textContent = `Firebase chat unavailable: ${error.code || "permission/query error"}`;
      renderAdminChatMessages(adminChatMessages);
    });
}

async function saveAdminChatReply(messageId, text, textarea) {
  if (!messageId) {
    alert("Firebase unavailable. Reply not saved.");
    return;
  }

  const reply = {
    author: "Admin Reply",
    text: text.slice(0, 500),
    sentAt: new Date().toISOString(),
    createdAtMs: Date.now()
  };

  textarea.disabled = true;
  try {
    const dbRealtime = await getRealtimeDb();
    if (dbRealtime) {
      const ref = dbRealtime.ref(`galewela-public-chat/${messageId}`);
      const snapshot = await ref.once("value");
      const message = snapshot.val() || {};
      const currentReplies = Array.isArray(message.replies) ? message.replies : [];
      await ref.update({
        replies: [...currentReplies, reply],
        repliedAt: reply.sentAt,
        updatedAt: firebase.database.ServerValue.TIMESTAMP
      });
      textarea.value = "";
      return;
    }
    const firestore = getDb();
    if (!firestore) throw new Error("Firebase is not configured.");
    const ref = firestore.collection("galewela-public-chat").doc(messageId);
    const snapshot = await ref.get();
    const currentReplies = snapshot.exists && Array.isArray(snapshot.data().replies) ? snapshot.data().replies : [];
    await ref.set({
      replies: [...currentReplies, reply],
      repliedAt: reply.sentAt,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
    textarea.value = "";
  } catch (error) {
    console.error(error);
    alert("Reply not saved. Please try again.");
  } finally {
    textarea.disabled = false;
    textarea.focus();
  }
}

async function getChatMessagesForBackup() {
  try {
    const dbRealtime = await getRealtimeDb();
    if (dbRealtime) {
      const snapshot = await dbRealtime.ref("galewela-public-chat").once("value");
      return sortChatMessages(objectToArray(snapshot.val()));
    }
    const firestore = getDb();
    if (!firestore) throw new Error("Firebase is not configured.");
    const snapshot = await firestore.collection("galewela-public-chat").limit(200).get();
    return sortChatMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function exportFullBackup() {
  const backup = {
    version: 1,
    exportedAt: new Date().toISOString(),
    content: getContent(),
    bookings: getBookings(),
    chat: await getChatMessagesForBackup()
  };
  if (exportBox) exportBox.value = JSON.stringify(backup, null, 2);
  if (exportBox) exportBox.select();
}

async function importFullBackup(file) {
  if (!file) return;
  const text = await file.text();
  const backup = JSON.parse(text);
  if (!backup.content && !backup.bookings && !backup.chat) {
    alert("Invalid backup file.");
    return;
  }
  if (backup.content) contentState = { ...defaultContent, ...backup.content };
  if (backup.bookings) bookingState = Array.isArray(backup.bookings) ? backup.bookings : objectToArray(backup.bookings);
  const firestore = getDb();
  const dbRealtime = await getRealtimeDb();
  if (dbRealtime) {
    if (backup.content) await dbRealtime.ref("galewela-site/content").set({
      ...contentState,
      updatedAt: firebase.database.ServerValue.TIMESTAMP
    });
    if (backup.bookings) await dbRealtime.ref("galewela-bookings").set(bookingsArrayToMap(bookingState));
    if (backup.chat) await dbRealtime.ref("galewela-public-chat").set(bookingsArrayToMap(backup.chat.slice(-200)));
  }
  if (firestore) {
    if (backup.content) await firestore.collection("galewela-site").doc("content").set({ ...defaultContent, ...backup.content });
    if (backup.bookings) await firestore.collection("galewela-bookings").doc("all").set({
      bookings: backup.bookings,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).catch(console.error);
    if (backup.chat) {
      const batch = firestore.batch();
      backup.chat.slice(-200).forEach((message) => {
        const ref = firestore.collection("galewela-public-chat").doc(message.id || String(Date.now() + Math.random()));
        batch.set(ref, {
          name: message.name || "Guest",
          text: message.text || "",
          role: message.role || "public",
          sentAt: message.sentAt || message.createdAt || new Date().toISOString(),
          source: message.source || "website-chat",
          createdAtMs: Number(message.createdAtMs) || Date.now(),
          createdAtIso: message.createdAtIso || message.sentAt || new Date().toISOString(),
          replies: Array.isArray(message.replies) ? message.replies : [],
          createdAt: message.createdAt || firebase.firestore.FieldValue.serverTimestamp()
        });
      });
      await batch.commit();
    }
  }
  render();
  alert("Backup imported successfully.");
}

function render() {
  const content = getContent();
  renderProfiles(content);
  renderPosts(content);
  renderEvents(content);
  renderGallery(content);
  renderDetails(content);
  renderStats(content);
  renderBookings();
  renderAdminBookingCalendar();
  renderResponsibilitiesTable();
  refreshIcons();
}

// ==================== EVENT LISTENERS ====================
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const pinInput = loginForm.elements["admin-pin"];
    if (pinInput && pinInput.value === getPin()) {
      sessionStorage.setItem(PIN_KEY, pinInput.value);
      setAuth(true);
      loginForm.reset();
      if (loginMessage) loginMessage.textContent = "";
    } else {
      if (loginMessage) loginMessage.textContent = "Wrong PIN. Default PIN is 1234 if you have not changed it.";
    }
  });
}

if (logoutBtn) logoutBtn.addEventListener("click", () => setAuth(false));

document.querySelectorAll(".profile-form[data-profile]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const key = form.dataset.profile;
    const content = getContent();
    const image = await getFormImage(form, content.profiles[key] ? content.profiles[key].image : "");
    content.profiles[key] = {
      image,
      name: form.elements.name.value.trim(),
      message: form.elements.message.value.trim()
    };
    saveContent(content);
    form.querySelector('input[type="file"]').value = "";
  });
});

document.querySelectorAll(".profile-form[data-officer]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const key = form.dataset.officer === "info-giving" ? "infoGiving" : "infoOfficer";
    const content = getContent();
    if (!content.officers) content.officers = defaultContent.officers;
    const image = await getFormImage(form, content.officers[key] ? content.officers[key].image : "");
    content.officers[key] = {
      image,
      name: form.elements.name.value.trim(),
      designation: form.elements.designation.value.trim(),
      phone: form.elements.phone.value.trim(),
      email: form.elements.email.value.trim()
    };
    saveContent(content);
    form.querySelector('input[type="file"]').value = "";
  });
});

if (blogForm) {
  blogForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(blogForm);
    const image = normalizeImageUrl(formData.get("imageUrl")) || await fileToDataUrl(formData.get("image"));
    const content = getContent();
    content.posts.unshift({
      id: window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: formData.get("title").trim(),
      category: formData.get("category"),
      date: formData.get("date"),
      excerpt: formData.get("excerpt").trim(),
      image
    });
    saveContent(content);
    blogForm.reset();
  });
}

if (detailsForm) {
  detailsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const content = getContent();
    content.details = {
      phone: detailsForm.elements.phone.value.trim(),
      email: detailsForm.elements.email.value.trim(),
      address: detailsForm.elements.address.value.trim(),
      welcome: detailsForm.elements.welcome.value.trim(),
      officeHours: detailsForm.elements.officeHours.value.trim(),
      lunchBreak: detailsForm.elements.lunchBreak.value.trim(),
      emergencyPhone: detailsForm.elements.emergencyPhone.value.trim(),
      howToReach: detailsForm.elements.howToReach.value.trim(),
      serviceNote: detailsForm.elements.serviceNote.value.trim()
    };
    saveContent(content);
  });
}

if (pageDetailForm) {
  pageDetailForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(pageDetailForm);
    const content = getContent();
    content.pageDetails = Array.isArray(content.pageDetails) ? content.pageDetails : [];
    content.pageDetails.unshift({
      id: window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      page: formData.get("page"),
      title: formData.get("title").trim(),
      text: formData.get("text").trim(),
      linkLabel: formData.get("linkLabel").trim(),
      linkUrl: formData.get("linkUrl").trim(),
      createdAt: new Date().toISOString()
    });
    saveContent(content);
    pageDetailForm.reset();
  });
}

if (eventForm) {
  eventForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(eventForm);
    const content = getContent();
    if (!content.events) content.events = [];
    content.events.unshift({
      id: window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: formData.get("title").trim(),
      date: formData.get("date"),
      time: formData.get("time").trim()
    });
    saveContent(content);
    eventForm.reset();
  });
}

if (galleryForm) {
  galleryForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(galleryForm);
    const src = normalizeImageUrl(formData.get("imageUrl")) || await fileToDataUrl(formData.get("image"));
    if (!src) {
      alert("Please add an image URL or upload an image.");
      return;
    }
    const content = getContent();
    if (!content.gallery) content.gallery = [];
    content.gallery.unshift({
      id: window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: formData.get("title").trim(),
      caption: formData.get("caption").trim(),
      src
    });
    saveContent(content);
    galleryForm.reset();
  });
}

if (pinForm) {
  pinForm.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.setItem(PIN_KEY, pinForm.elements.pin.value);
    sessionStorage.setItem(PIN_KEY, pinForm.elements.pin.value);
    pinForm.reset();
    alert("Admin PIN changed for this browser.");
  });
}

if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    exportFullBackup().catch((error) => {
      console.error(error);
      alert("Backup export failed. Check the Firebase connection.");
    });
  });
}

if (importFile) {
  importFile.addEventListener("change", () => {
    importFullBackup(importFile.files[0]).catch((error) => {
      console.error(error);
      alert("Backup import failed. Check the JSON file.");
    }).finally(() => {
      if (importFile) importFile.value = "";
    });
  });
}

if (resetBtn) {
  resetBtn.addEventListener("click", () => {
    if (!confirm("Reset all admin content?")) return;
    contentState = { ...defaultContent };
    bookingState = [];
    saveContentToFirebase(defaultContent).catch(console.error);
    saveBookings([]).catch(console.error);
    render();
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
  });
}

applyTheme(localStorage.getItem(THEME_KEY) || "light");
setAuth(sessionStorage.getItem(PIN_KEY) === getPin());
setupResponsibilitiesListeners();

window.addEventListener("storage", (event) => {
  if (event.key === THEME_KEY) applyTheme(localStorage.getItem(THEME_KEY) || "light");
});

async function bootFirebaseSync() {
  const dbRealtime = await getRealtimeDb();
  if (dbRealtime) {
    dbRealtime.ref("galewela-site/content").on("value", (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        dbRealtime.ref("galewela-site/content").set({
          ...defaultContent,
          updatedAt: firebase.database.ServerValue.TIMESTAMP
        }).catch(console.error);
        return;
      }
      delete data.updatedAt;
      contentState = {
        ...defaultContent,
        ...data,
        details: { ...defaultContent.details, ...(data.details || {}) },
        pageDetails: Array.isArray(data.pageDetails) ? data.pageDetails : []
      };
      render();
    }, console.error);

    dbRealtime.ref("galewela-bookings").on("value", (snapshot) => {
      bookingState = objectToArray(snapshot.val()).sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
      renderBookings();
      renderAdminBookingCalendar();
      renderStats(getContent());
    }, console.error);
    return;
  }

  const firestore = getDb();
  if (!firestore) return;
  firestore.collection("galewela-site").doc("content").onSnapshot((doc) => {
    if (!doc.exists) {
      firestore.collection("galewela-site").doc("content").set(getContent()).catch(console.error);
      return;
    }
    const data = doc.data();
    delete data.updatedAt;
    contentState = {
      ...defaultContent,
      ...data,
      details: { ...defaultContent.details, ...(data.details || {}) },
      pageDetails: Array.isArray(data.pageDetails) ? data.pageDetails : []
    };
    render();
  }, console.error);
  firestore.collection("galewela-bookings").doc("all").onSnapshot((doc) => {
    if (doc.exists && doc.data().bookings) {
      bookingState = doc.data().bookings;
      renderBookings();
      renderAdminBookingCalendar();
      renderStats(getContent());
    }
  }, console.error);
}

bootFirebaseSync();
refreshIcons();
