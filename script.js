// Global variables
let people = JSON.parse(localStorage.getItem("dutyPeople") || "[]");
let assignments = JSON.parse(localStorage.getItem("dutyAssignments") || "{}");
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Color palette for people
const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#96CEB4",
  "#FFEAA7",
  "#DDA0DD",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E9",
  "#F8C471",
  "#82E0AA",
  "#F1948A",
  "#85C1E9",
  "#D2B4DE",
];

// Turkish holidays for 2025
const holidays = {
  "2025-01-01": "Yılbaşı",
  "2025-04-23": "23 Nisan Ulusal Egemenlik ve Çocuk Bayramı",
  "2025-05-01": "İşçi Bayramı",
  "2025-05-19": "19 Mayıs Atatürk'ü Anma Gençlik ve Spor Bayramı",
  "2025-08-30": "30 Ağustos Zafer Bayramı",
  "2025-10-29": "29 Ekim Cumhuriyet Bayramı",
  // Religious holidays (approximate dates)
  "2025-03-30": "Ramazan Bayramı 1. Gün",
  "2025-03-31": "Ramazan Bayramı 2. Gün",
  "2025-04-01": "Ramazan Bayramı 3. Gün",
  "2025-06-06": "Kurban Bayramı 1. Gün",
  "2025-06-07": "Kurban Bayramı 2. Gün",
  "2025-06-08": "Kurban Bayramı 3. Gün",
  "2025-06-09": "Kurban Bayramı 4. Gün",
};

// Initialize the application
function init() {
  renderPeople();
  renderCalendar();
}

// Handle person input
function handlePersonInput(event) {
  if (event.key === "Enter") {
    addPerson();
  }
}

// Add person
function addPerson() {
  const input = document.getElementById("personName");
  const name = input.value.trim();

  if (name && !people.some((p) => p.name === name)) {
    const person = {
      id: Date.now(),
      name: name,
      color: colors[people.length % colors.length],
    };
    people.push(person);
    input.value = "";
    savePeople();
    renderPeople();
    renderCalendar();
  }
}

// Remove person
function removePerson(personId) {
  people = people.filter((p) => p.id !== personId);
  // Remove assignments for this person
  Object.keys(assignments).forEach((date) => {
    if (assignments[date] === personId) {
      delete assignments[date];
    }
  });
  savePeople();
  saveAssignments();
  renderPeople();
  renderCalendar();
}

// Render people list
function renderPeople() {
  const peopleList = document.getElementById("peopleList");
  peopleList.innerHTML = "";

  people.forEach((person) => {
    const personDiv = document.createElement("div");
    personDiv.className = "person-item";
    personDiv.style.backgroundColor = person.color;
    personDiv.innerHTML = `
                    <div class="person-name">
                        <i class="material-icons">person</i>
                        ${person.name}
                    </div>
                    <button class="remove-btn" onclick="removePerson(${person.id})">
                        <i class="material-icons">close</i>
                    </button>
                `;
    peopleList.appendChild(personDiv);
  });
}

// Change month
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

// Render calendar
function renderCalendar() {
  const calendar = document.getElementById("calendar");
  const monthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  document.getElementById(
    "currentMonth"
  ).textContent = `${monthNames[currentMonth]} ${currentYear}`;

  calendar.innerHTML = "";

  // Day headers
  const dayHeaders = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ];
  dayHeaders.forEach((day) => {
    const dayHeader = document.createElement("div");
    dayHeader.className = "day-header";
    dayHeader.textContent = day;
    calendar.appendChild(dayHeader);
  });

  // Get first day of month and number of days
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = (firstDay.getDay() + 6) % 7; // Convert to Monday = 0
  const daysInMonth = lastDay.getDate();

  // Previous month days
  const prevMonth = new Date(currentYear, currentMonth - 1, 0);
  for (let i = firstDayWeekday - 1; i >= 0; i--) {
    const dayCell = createDayCell(
      prevMonth.getDate() - i,
      currentMonth === 0 ? 11 : currentMonth - 1,
      currentMonth === 0 ? currentYear - 1 : currentYear,
      true
    );
    calendar.appendChild(dayCell);
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = createDayCell(day, currentMonth, currentYear, false);
    calendar.appendChild(dayCell);
  }

  // Next month days
  const remainingCells = 42 - (firstDayWeekday + daysInMonth);
  for (let day = 1; day <= remainingCells; day++) {
    const dayCell = createDayCell(
      day,
      currentMonth === 11 ? 0 : currentMonth + 1,
      currentMonth === 11 ? currentYear + 1 : currentYear,
      true
    );
    calendar.appendChild(dayCell);
  }
}

// Create day cell
function createDayCell(day, month, year, otherMonth) {
  const dayCell = document.createElement("div");
  dayCell.className = "day-cell";

  if (otherMonth) {
    dayCell.classList.add("other-month");
  }

  const date = new Date(year, month, day);
  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    day
  ).padStart(2, "0")}`;

  // Check if today
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    dayCell.classList.add("today");
  }

  // Check if weekend
  if (date.getDay() === 0 || date.getDay() === 6) {
    dayCell.classList.add("weekend");
  }

  // Check if holiday
  if (holidays[dateStr]) {
    dayCell.classList.add("holiday");
  }

  dayCell.innerHTML = `
                <div class="day-number">${day}</div>
                ${
                  holidays[dateStr]
                    ? `<div class="holiday-label">${holidays[dateStr]}</div>`
                    : ""
                }
            `;

  // Add assigned person if exists
  if (assignments[dateStr]) {
    const person = people.find((p) => p.id === assignments[dateStr]);
    if (person) {
      const assignedDiv = document.createElement("div");
      assignedDiv.className = "assigned-person";
      assignedDiv.style.backgroundColor = person.color;
      assignedDiv.textContent = person.name;
      assignedDiv.draggable = true;
      assignedDiv.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", dateStr);
      });
      dayCell.appendChild(assignedDiv);
    }
  }

  // Add drag and drop functionality
  dayCell.addEventListener("dragover", (e) => {
    e.preventDefault();
    dayCell.classList.add("drag-over");
  });

  dayCell.addEventListener("dragleave", () => {
    dayCell.classList.remove("drag-over");
  });

  dayCell.addEventListener("drop", (e) => {
    e.preventDefault();
    dayCell.classList.remove("drag-over");
    const fromDate = e.dataTransfer.getData("text/plain");
    const toDate = dateStr;

    if (fromDate !== toDate) {
      // Swap assignments
      const fromPerson = assignments[fromDate];
      const toPerson = assignments[toDate];

      if (fromPerson) {
        if (toPerson) {
          assignments[fromDate] = toPerson;
        } else {
          delete assignments[fromDate];
        }
        assignments[toDate] = fromPerson;
      }

      saveAssignments();
      renderCalendar();
    }
  });

  return dayCell;
}

// Auto assign duties
function autoAssignDuties() {
  if (people.length === 0) {
    alert("Önce kişi eklemelisiniz!");
    return;
  }

  // Clear current month assignments
  const monthStart = new Date(currentYear, currentMonth, 1);
  const monthEnd = new Date(currentYear, currentMonth + 1, 0);

  for (
    let d = new Date(monthStart);
    d <= monthEnd;
    d.setDate(d.getDate() + 1)
  ) {
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
    delete assignments[dateStr];
  }

  // Count weekend days and distribute fairly
  const weekendDays = [];
  const weekdays = [];

  for (
    let d = new Date(monthStart);
    d <= monthEnd;
    d.setDate(d.getDate() + 1)
  ) {
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;

    if (!holidays[dateStr]) {
      // Skip holidays
      if (d.getDay() === 0 || d.getDay() === 6) {
        weekendDays.push(dateStr);
      } else {
        weekdays.push(dateStr);
      }
    }
  }

  // Assign weekends fairly
  let personIndex = 0;
  weekendDays.forEach((date) => {
    assignments[date] = people[personIndex % people.length].id;
    personIndex++;
  });

  // Assign weekdays
  weekdays.forEach((date) => {
    assignments[date] = people[personIndex % people.length].id;
    personIndex++;
  });

  saveAssignments();
  renderCalendar();
}

// Clear all assignments
function clearAllAssignments() {
  if (confirm("Tüm görev atamalarını silmek istediğinizden emin misiniz?")) {
    assignments = {};
    saveAssignments();
    renderCalendar();
  }
}

// Export to PDF
function exportToPDF(type) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add Turkish font support (basic)
  doc.setFont("helvetica");

  const monthNames = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  let startMonth = currentMonth;
  let startYear = currentYear;
  let monthCount = type === "quarter" ? 3 : 1;

  doc.setFontSize(16);
  doc.text("Gorev Atama Takvimi", 20, 20);

  let yPos = 40;

  for (let m = 0; m < monthCount; m++) {
    const month = (startMonth + m) % 12;
    const year = startYear + Math.floor((startMonth + m) / 12);

    doc.setFontSize(14);
    doc.text(`${monthNames[month]} ${year}`, 20, yPos);
    yPos += 20;

    // Get month data
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const date = new Date(year, month, day);
      const dayName = [
        "Pazar",
        "Pazartesi",
        "Sali",
        "Carsamba",
        "Persembe",
        "Cuma",
        "Cumartesi",
      ][date.getDay()];

      let text = `${day} ${dayName}`;

      if (assignments[dateStr]) {
        const person = people.find((p) => p.id === assignments[dateStr]);
        if (person) {
          text += ` - ${person.name}`;
        }
      }

      if (holidays[dateStr]) {
        text += ` (${holidays[dateStr]})`;
      }

      doc.setFontSize(10);
      doc.text(text, 25, yPos);
      yPos += 8;

      if (yPos > 280) {
        doc.addPage();
        yPos = 20;
      }
    }

    yPos += 10;
  }

  const filename =
    type === "quarter"
      ? `gorev_takvimi_3_aylik_${startYear}_${startMonth + 1}.pdf`
      : `gorev_takvimi_${monthNames[currentMonth]}_${currentYear}.pdf`;

  doc.save(filename);
}

// Save functions
function savePeople() {
  localStorage.setItem("dutyPeople", JSON.stringify(people));
}

function saveAssignments() {
  localStorage.setItem("dutyAssignments", JSON.stringify(assignments));
}

// Initialize app
init();
