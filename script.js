//elements
const calendarDates = document.getElementById("days");
const month = document.getElementById("month");
const year = document.getElementById("year");

const prevMonth = document.getElementById("prev-month");
const nextMonth = document.getElementById("next-month");

//current
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = capitalize(currentDate.toLocaleString('default', { month: 'long' }));
const currentMonthIndex = currentDate.getMonth()

document.getElementById('year').textContent = currentYear;
document.getElementById('month').textContent = currentMonth;

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
    calendarDates.innerHTML = '';
    let firstDay = (new Date(year, month, 1).getDay() + 6) % 7; //monday = 1st day
    let daysInMonth = new Date(year, month + 1, 0).getDate();

    //add blanks before 1st day
    for (let i = 0; i < firstDay; i++) {
        const blank = document.createElement('div');
        blank.classList.add("blank")
        calendarDates.appendChild(blank);
    }

    // Populate the days
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.classList.add('day')
        day.textContent = i;
        calendarDates.appendChild(day);
    }
}

function renderCalendar(month, year) {
    displayDays(month, year);
}

renderCalendar(currentMonthIndex, currentYear)