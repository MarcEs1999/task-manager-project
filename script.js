// JavaScript to handle tab switching
function openTab(event, tabId) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Function to load external HTML content for each tab
function loadContent(contentFile) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', contentFile, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('main-content').innerHTML = xhr.responseText;
        }
    };
    xhr.send();
}

// Login Functionality
function showMainScreen() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === "testUser" && password === "1234") {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('task-list-screen').classList.add('active');
    } else {
        alert("Incorrect Username or Password. Please try again.");
    }
}

// Navigation Functions
function showAddTaskScreen() {
    document.getElementById('task-list-screen').classList.remove('active');
    document.getElementById('add-task-screen').classList.add('active');
}

function showTaskListScreen() {
    document.getElementById('add-task-screen').classList.remove('active');
    document.getElementById('calendar-screen').classList.remove('active');
    document.getElementById('task-list-screen').classList.add('active');
}

function showCalendarScreen() {
    document.getElementById('task-list-screen').classList.remove('active');
    document.getElementById('calendar-screen').classList.add('active');
}

// Add Task Functionality
function addTask() {
    const taskName = document.getElementById('task-name').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;
    const taskDesc = document.getElementById('task-desc').value;

    if (taskName && taskPriority && taskDate && taskTime && taskDesc) {
        const taskList = document.getElementById('task-items');
        const newTask = document.createElement('li');
        newTask.textContent = `${taskName} (Priority: ${taskPriority}) - Due: ${taskDate} at ${taskTime}`;
        taskList.appendChild(newTask);
        showTaskListScreen();
    }
}

// Calendar Initialization
function initializeCalendar() {
    const calendarEl = document.getElementById('calendar');
    if (calendarEl) {
        flatpickr(calendarEl, {
            inline: true,
            onChange: function(selectedDates) {
                console.log('Selected date:', selectedDates);
            }
        });
    }
}

// Initialize Calendar after page load
window.onload = function() {
    initializeCalendar();
};