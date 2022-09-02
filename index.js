function roll(min, max, floatFlag) {
    let r = Math.random() * (max - min) + min;
    return floatFlag ? r : Math.floor(r);
};
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const firstDay = new Date("8/9/2022");
function getNextDay(day) {
    let nextDay = new Date(day);
    nextDay.setDate(day.getDate() + 1);
    return nextDay;
};
function generateTasks() {
    return [...Array(roll(2, 5))].map((_, i) => {
        return {
            index: i,
            name: `Task ${roll(1, 60)}`,
            complete: roll(0, 2) ? true : false
        };
    });
};
function buildWeek(day) {
    return [...Array(7)].map((_, i) => {
        const weekday = {
            index: i,
            date: day,
            tasks: generateTasks()
        };
        day = getNextDay(day);
        return weekday;
    });
};
const week = buildWeek(firstDay);
const schedule = document.getElementById("WeeklySchedule");
const scheduleHtml = week.reduce((accum, day) => {
    return accum + `<div class="day">
        <div>${weekdays[day.date.getDay()]} - ${getDayTasksComplete(day)} Complete</div>
        <div class="tasks">
            ${tasksToHtml(day.tasks)}
        </div>
    </div>`
}, "");
function tasksToHtml(tasks) {
    return tasks.reduce((accum, task) => {
        return accum + `
            <div class="circle-container ${task.complete ? "checked" : ""}">
                <div class="circle"></div>
                <label>${task.name}</label>
            </div>
        `
    }, "");
};
function getDayTasksComplete(day) {
    return day.tasks.reduce((accumulator, task) => {
        return task.complete ? accumulator + 1 : accumulator;
    }, 0);
};
function getWeekTasksComplete(week) {
    return week.reduce((accumulator, day) => {
        return accumulator +  getDayTasksComplete(day);
    }, 0);
};
schedule.innerHTML = `
    <div class="weekly-summary">
        ${getWeekTasksComplete(week)} Tasks Completed
    </div>
` + scheduleHtml
