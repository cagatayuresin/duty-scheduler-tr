// script.js

// Global variables
let people = JSON.parse(localStorage.getItem("dutyPeople") || "[]");
let assignments = JSON.parse(localStorage.getItem("dutyAssignments") || "{}");
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Color palette for people
const colors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
  "#FFEAA7", "#DDA0DD", "#98D8C8", "#F7DC6F",
  "#BB8FCE", "#85C1E9", "#F8C471", "#82E0AA",
  "#F1948A", "#85C1E9", "#D2B4DE"
];

// Turkish holidays for 2025
const holidays = {
  "2025-01-01": "Yılbaşı",
  "2025-03-30": "Ramazan Bayramı 1. Gün",
  "2025-03-31": "Ramazan Bayramı 2. Gün",
  "2025-04-01": "Ramazan Bayramı 3. Gün",
  "2025-04-23": "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı",
  "2025-05-01": "İşçi Bayramı",
  "2025-05-19": "19 Mayıs Atatürk'ü Anma Gençlik ve Spor Bayramı",
  "2025-06-06": "Kurban Bayramı 1. Gün",
  "2025-06-07": "Kurban Bayramı 2. Gün",
  "2025-06-08": "Kurban Bayramı 3. Gün",
  "2025-06-09": "Kurban Bayramı 4. Gün",
  "2025-08-30": "30 Ağustos Zafer Bayramı",
  "2025-10-29": "29 Ekim Cumhuriyet Bayramı"
};

// Initialize the application
function init() {
  renderPeople();
  renderCalendar();
}

// Handle Enter key on input
function handlePersonInput(event) {
  if (event.key === "Enter") {
    addPerson();
  }
}

// Add a new person
function addPerson() {
  const input = document.getElementById("personName");
  const name = input.value.trim();
  if (name && !people.some(p => p.name === name)) {
    const person = {
      id: Date.now(),
      name,
      color: colors[people.length % colors.length]
    };
    people.push(person);
    input.value = "";
    savePeople();
    renderPeople();
    renderCalendar();
  }
}

// Remove a person and their assignments
function removePerson(personId) {
  people = people.filter(p => p.id !== personId);
  Object.keys(assignments).forEach(date => {
    if (assignments[date] === personId) {
      delete assignments[date];
    }
  });
  savePeople();
  saveAssignments();
  renderPeople();
  renderCalendar();
}

// Render the list of people
function renderPeople() {
  const peopleList = document.getElementById("peopleList");
  peopleList.innerHTML = "";
  people.forEach(person => {
    const div = document.createElement("div");
    div.className = "person-item";
    div.style.backgroundColor = person.color;
    div.innerHTML = `
      <div class="person-name">
        <i class="material-icons">person</i> ${person.name}
      </div>
      <button class="remove-btn" onclick="removePerson(${person.id})">
        <i class="material-icons">close</i>
      </button>
    `;
    peopleList.appendChild(div);
  });
}

// Change the displayed month
function changeMonth(direction) {
  currentMonth += direction;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  } else if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
}

// Render the calendar grid
function renderCalendar() {
  const calendar = document.getElementById("calendar");
  const monthNames = [
    "Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
    "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"
  ];
  document.getElementById("currentMonth").textContent =
    `${monthNames[currentMonth]} ${currentYear}`;
  calendar.innerHTML = "";

  // Day headers
  ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"]
    .forEach(day => {
      const dh = document.createElement("div");
      dh.className = "day-header";
      dh.textContent = day;
      calendar.appendChild(dh);
    });

  // Calculate first/last days and filler cells
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const firstWeekday = (firstDay.getDay() + 6) % 7; // Monday=0
  const daysInMonth = lastDay.getDate();

  // Previous month's trailing days
  const prevMonthLast = new Date(currentYear, currentMonth, 0).getDate();
  for (let i = firstWeekday - 1; i >= 0; i--) {
    calendar.appendChild(createDayCell(
      prevMonthLast - i,
      currentMonth === 0 ? 11 : currentMonth - 1,
      currentMonth === 0 ? currentYear - 1 : currentYear,
      true
    ));
  }

  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendar.appendChild(createDayCell(d, currentMonth, currentYear, false));
  }

  // Next month's leading days
  const totalCells = firstWeekday + daysInMonth;
  const trailing = (7 * Math.ceil(totalCells / 7)) - totalCells;
  for (let d = 1; d <= trailing; d++) {
    calendar.appendChild(createDayCell(
      d,
      currentMonth === 11 ? 0 : currentMonth + 1,
      currentMonth === 11 ? currentYear + 1 : currentYear,
      true
    ));
  }
}

// Create one day cell (with drag/drop and assignment if exists)
function createDayCell(day, month, year, otherMonth) {
  const cell = document.createElement("div");
  cell.className = "day-cell";
  if (otherMonth) cell.classList.add("other-month");

  const date = new Date(year, month, day);
  const y = date.getFullYear();
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  const dateStr = `${y}-${m}-${d}`;

  // Highlight today, weekends, holidays
  if (date.toDateString() === new Date().toDateString()) {
    cell.classList.add("today");
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    cell.classList.add("weekend");
  }
  if (holidays[dateStr]) {
    cell.classList.add("holiday");
  }

  // Day number and holiday label
  cell.innerHTML = `
    <div class="day-number">${day}</div>
    ${holidays[dateStr] ? `<div class="holiday-label">${holidays[dateStr]}</div>` : ""}
  `;

  // Assigned person
  if (assignments[dateStr]) {
    const person = people.find(p => p.id === assignments[dateStr]);
    if (person) {
      const ad = document.createElement("div");
      ad.className = "assigned-person";
      ad.style.backgroundColor = person.color;
      ad.textContent = person.name;
      ad.draggable = true;
      ad.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", dateStr);
      });
      cell.appendChild(ad);
    }
  }

  // Drag & drop
  cell.addEventListener("dragover", e => {
    e.preventDefault();
    cell.classList.add("drag-over");
  });
  cell.addEventListener("dragleave", () => {
    cell.classList.remove("drag-over");
  });
  cell.addEventListener("drop", e => {
    e.preventDefault();
    cell.classList.remove("drag-over");
    const from = e.dataTransfer.getData("text/plain");
    const to = dateStr;
    if (from !== to) {
      const fromId = assignments[from];
      const toId = assignments[to];
      if (fromId) {
        if (toId) assignments[from] = toId;
        else delete assignments[from];
        assignments[to] = fromId;
        saveAssignments();
        renderCalendar();
      }
    }
  });

  return cell;
}

// Auto-assign duties evenly
function autoAssignDuties() {
  if (people.length === 0) {
    alert("Önce kişi eklemelisiniz!");
    return;
  }

  const monthStart = new Date(currentYear, currentMonth, 1);
  const monthEnd   = new Date(currentYear, currentMonth + 1, 0);
  const monthEndTime = monthEnd.getTime(); 
  // monthEndTime is constant, so ESLint no longer warns

  // Clear existing
  for (
    let d = new Date(monthStart);
    d.getTime() <= monthEndTime;
    d.setDate(d.getDate() + 1)
  ) {
    const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    delete assignments[ds];
  }

  // Collect weekends & weekdays
  const weekendDays = [];
  const weekdays    = [];
  for (
    let d = new Date(monthStart);
    d.getTime() <= monthEndTime;
    d.setDate(d.getDate() + 1)
  ) {
    const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (holidays[ds]) continue;
    if (d.getDay() === 0 || d.getDay() === 6) weekendDays.push(ds);
    else weekdays.push(ds);
  }

  // Assign fairly
  let idx = 0;
  weekendDays.forEach(date => {
    assignments[date] = people[idx % people.length].id;
    idx++;
  });
  weekdays.forEach(date => {
    assignments[date] = people[idx % people.length].id;
    idx++;
  });

  saveAssignments();
  renderCalendar();
}

// Clear all assignments for current month
function clearAllAssignments() {
  if (confirm("Tüm görev atamalarını silmek istediğinizden emin misiniz?")) {
    assignments = {};
    saveAssignments();
    renderCalendar();
  }
}

// PDF Helper: render header
function renderPDFHeader(doc, title) {
  doc.setFontSize(16);
  doc.text(title, 20, 20);
}

// PDF Helper: get weekday name in Turkish
function getWeekdayName(year, monthIndex, day) {
  return [
    "Pazar","Pazartesi","Salı","Çarşamba",
    "Perşembe","Cuma","Cumartesi"
  ][ new Date(year, monthIndex, day).getDay() ];
}

// PDF Helper: build one line of text per day
function buildDateLine(day, monthIndex, year) {
  const m = monthIndex + 1;
  const ds = `${year}-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  let text = `${day} ${getWeekdayName(year, monthIndex, day)}`;

  const pid = assignments[ds];
  if (pid) {
    const p = people.find(x => x.id === pid);
    if (p) text += ` - ${p.name}`;
  }
  if (holidays[ds]) {
    text += ` (${holidays[ds]})`;
  }
  return text;
}

// PDF Helper: render one month block, return new y-position
function renderMonth(doc, monthIndex, year, startX, startY) {
  const monthNames = [
    "Ocak","Şubat","Mart","Nisan","Mayıs","Haziran",
    "Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"
  ];

  doc.setFontSize(14);
  doc.text(`${monthNames[monthIndex]} ${year}`, startX, startY);
  let yPos = startY + 20;

  const last = new Date(year, monthIndex + 1, 0).getDate();
  for (let d = 1; d <= last; d++) {
    const line = buildDateLine(d, monthIndex, year);
    doc.setFontSize(10);
    doc.text(line, startX + 5, yPos);
    yPos += 8;
    if (yPos > 280) {
      doc.addPage();
      yPos = 20;
    }
  }

  return yPos + 10;
}

// Refactored export to PDF
function exportToPDF(type) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.setFont("helvetica");

  renderPDFHeader(doc, "Görev Atama Takvimi");

  let yPos = 40;
  const startM = currentMonth;
  const startY = currentYear;
  const count  = type === "quarter" ? 3 : 1;

  for (let i = 0; i < count; i++) {
    const month = (startM + i) % 12;
    const year  = startY + Math.floor((startM + i) / 12);
    yPos = renderMonth(doc, month, year, 20, yPos);
  }

  const filename = type === "quarter"
    ? `gorev_takvimi_3_aylik_${startY}_${startM + 1}.pdf`
    : `gorev_takvimi_${startM + 1}_${startY}.pdf`;

  doc.save(filename);
}

// Persist data to localStorage
function savePeople() {
  localStorage.setItem("dutyPeople", JSON.stringify(people));
}
function saveAssignments() {
  localStorage.setItem("dutyAssignments", JSON.stringify(assignments));
}

// Kick off the app
init();
