//elements
const daysDiv = document.getElementById("days");
const monthDiv = document.getElementById("month");
const yearDiv = document.getElementById("year");

const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");
let form = null;

//current
let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = capitalize(currentDate.toLocaleString('default', { month: 'long' }));
let currentMonthIndex = currentDate.getMonth()

//variables
let selectedMonth = currentMonthIndex;
let selectedYear = currentYear;
let aspectRatio = (150/176.5);

//settings
let params = new URLSearchParams(window.location.search);
const root = document.querySelector(":root");

function getBaseURL() {
    const currentHost = window.location.hostname;
    if (currentHost.includes("ozeily.github.io")) {
        return "https://ozeily.github.io/calendar-widget/widget/widget.html?";
    } else {
        return "http://127.0.0.1:3000/widget/widget.html?"
    }
}

function sendAspectRatio() {
    window.parent.postMessage({ type: 'aspectRatio', aspectRatio }, getBaseURL());
}

function applySettings(settings) {
    //apply values to CSS variables
    for (const [key, value] of Object.entries(settings)) {
        if (key.endsWith('-colour') || key === "font") {
            setVarValue(key, value)
        }
        if (key === "rounded") {
            document.querySelectorAll(".calendar-div, .current-date").forEach(elt => {
                elt?.classList.toggle("rounded", value === true) //? avoids bug if elt isn't loaded yet
            })
        } if (key === "banner") {
            const bannerDiv = document.querySelector(".banner-div");
            if (!bannerDiv) return;
            if (value === true) {

                aspectRatio = (300 / 426);
                bannerDiv.style.display = "block";

                if (settings["banner-img"]) {

                    bannerDiv.innerHTML = `<img class="banner-img" src="${settings['banner-img']}">`;
                    bannerDiv.style.backgroundColor = ""; // reset background

                } else if (settings["banner-colour"]) {

                    bannerDiv.innerHTML = "";
                    bannerDiv.style.backgroundColor = settings["banner-colour"];

                }
            } else {
                aspectRatio = (300/351);
                bannerDiv.style.display = "none";
                bannerDiv.innerHTML = "";
                bannerDiv.style.backgroundColor = "";
            }
        }
    }
    sendAspectRatio()
    
}

function getParamsObject(params) {
    const settings = {};

    params.forEach((value, key) => {
        if (key.endsWith('-colour') || key === 'font') {
            settings[key] = value;
        } else if (key === "rounded") {
            settings[key] = value === 'true' || value === 'on';
        } else if (key === "banner") {
            settings[key] = value === 'true' || value === 'on';
        } else if (key === "banner-img") {
            settings[key] = value;
        }
    })
    
    return settings
}

function applyCheckboxes() {
    let isRounded = true;
    if (form) {
        const roundedCBox = form.querySelector('[name=rounded]');
        if (roundedCBox) {
            isRounded = roundedCBox.checked;
        }
        
    }

    document.querySelectorAll(".calendar-div, .current-date").forEach(elt => {
        elt.classList.toggle("rounded", isRounded);
    });
        
}

function setVarValue(variable, value) {
    root.style.setProperty('--' + variable, value)
}

try {
    if (window.self !== window.top) { // in iframe
        form = window.parent.document.getElementById('form');
        if (!form) console.warn("form not found in parent");
    } else {
        console.warn("Not in iframe");
    }
} catch (e) {
    console.warn("Cannot access parent document:", e);
}

window.addEventListener('DOMContentLoaded', () => {

    const calendar = document.querySelector(".calendar-div")

    if (form) { //with customisation interface
        renderCalendar(currentMonthIndex, currentYear);
        window.addEventListener("message", (event) => {
        if (event.data?.type === "settings") {
            const settings = event.data.payload;
            
            applySettings(settings)
            
        }});
    } else {
        const settings = getParamsObject(params)
        applySettings(settings)
        renderCalendar(currentMonthIndex, currentYear);
        
    }
    prevMonthBtn.addEventListener("click", previousMonth)
    nextMonthBtn.addEventListener("click", nextMonth)
})

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
    blank.classList.add("blank");
    const span = document.createElement('span');
    span.textContent = prevMonthDays - blanksBefore + i;
    blank.appendChild(span);
    daysDiv.appendChild(blank);
}

// Populate the days
for (let i = 1; i <= daysInMonth; i++) {
    const day = document.createElement('div');
    day.classList.add('day');
    day.dataset.date = new Date(year, month, i).toDateString();
    const span = document.createElement('span');
    span.textContent = i;
    day.appendChild(span);

    // current-date class if today's date
    let divDay = new Date(year, month, i);
    if (
        divDay.getFullYear() === currentYear &&
        divDay.getMonth() === currentMonthIndex &&
        divDay.getDate() === currentDate.getDate()
    ) {
        day.classList.add('current-date');
    }

    daysDiv.appendChild(day);
}

//add blanks after last day
for (let i = 1; i <= blanksAfter; i++) {
    const blank = document.createElement('div');
    blank.classList.add("blank");
    const span = document.createElement('span');
    span.textContent = i;
    blank.appendChild(span);
    daysDiv.appendChild(blank);
}

}

function renderCalendar(month, year) {
    const cssVars = getComputedStyle(document.documentElement)

    displayDays(month, year);
    yearDiv.textContent = year;
    monthDiv.textContent = capitalize(new Date(year, month).toLocaleString('default', {month: 'long'}));

    //set default values
    if (form) {
        form.querySelectorAll('[name]').forEach(input => {
            const varName = '--' + input.name;
            const cssVarValue = cssVars.getPropertyValue(varName).trim();

            if (cssVarValue !== "") {
                if (input.type === 'checkbox') { 
                    input.checked = cssVarValue === 'true';
                } else {
                    input.value = cssVarValue;
                }

                
            }
        });
    }

    applyCheckboxes()
};

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


