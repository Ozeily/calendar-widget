//elements
const daysDiv = document.getElementById("days");
const monthDiv = document.getElementById("month");
const yearDiv = document.getElementById("year");

const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

//current
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = capitalize(currentDate.toLocaleString('default', { month: 'long' }));
let currentMonthIndex = currentDate.getMonth()

//variables
let selectedMonth = currentMonthIndex;
let selectedYear = currentYear;

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayWeekDays() {
    const weekDays = [];
    const WDShort = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(1970, 0, 5 + i); // Starting from Monday, Jan 5, 1970
        const name = day.toLocaleString('default', { weekday: 'long' });
        weekDays.push(name);

        let short = name.charAt(0).toUpperCase()

        const existingIndex = WDShort.indexOf(short)

        if (existingIndex > -1) {
            const existingShort = weekDays[existingIndex]
            WDShort[existingIndex] = capitalize(existingShort.slice(0,2));
            short = capitalize(short + name.charAt(1));
        }
        WDShort.push(short); 

    };
    for (let i = 0; i < 7; i++) {
        const weekDay = document.createElement('p');
        weekDay.textContent = WDShort[i];
        weekDay.classList.add('weekday')
        document.getElementById('weekdays').appendChild(weekDay)
    }
}
displayWeekDays();

function displayDays(month, year) {
    daysDiv.innerHTML = '';
    let firstDay = (new Date(year, month, 1).getDay() + 6) % 7; //monday = 1st day
    let daysInMonth = new Date(year, month + 1, 0).getDate();
    let prevMonthDays = new Date(year, month, 0).getDate(); 
    let blanksBefore = firstDay;
    let blanksAfter = 42 - daysInMonth - blanksBefore;

    //add blanks before 1st day
    for (let i = 1; i <= blanksBefore; i++) {
        const blank = document.createElement('div');
        blank.textContent = prevMonthDays - blanksBefore +i;
        blank.classList.add("blank")
        daysDiv.appendChild(blank);
    }

    // Populate the days
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        let divDay = new Date(year, month, i);

        day.textContent = i;
        day.classList.add('day')
        day.dataset.date = divDay.toDateString();
        if (
            divDay.getFullYear() === currentYear &&
            divDay.getMonth() === currentMonthIndex &&
            divDay.getDate() === currentDate.getDate()
        ) { day.classList.add('current-date') }
        daysDiv.appendChild(day);
    }

    //add blanks after last day
    for (let i = 1; i <= blanksAfter; i++) {
        const blank = document.createElement('div');
        blank.textContent = i;
        blank.classList.add("blank")
        daysDiv.appendChild(blank);
    }
}

function renderCalendar(month, year) {
    displayDays(month, year);
    yearDiv.textContent = year;
    monthDiv.textContent = capitalize(new Date(year, month).toLocaleString('default', {month: 'long'}));
}

renderCalendar(currentMonthIndex, currentYear);

//controls

function previousMonth() {
    if (selectedMonth === 0) { selectedMonth = 11; selectedYear -= 1}
    else { selectedMonth -= 1}
    renderCalendar(selectedMonth, selectedYear)
}

function nextMonth() {
    if (selectedMonth === 11) { selectedMonth = 0; selectedYear += 1}
    else { selectedMonth += 1}
    renderCalendar(selectedMonth, selectedYear)
}

prevMonthBtn.addEventListener("click", previousMonth)
nextMonthBtn.addEventListener("click", nextMonth)
