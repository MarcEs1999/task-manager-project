// JavaScript to handle tab switching and load content
function openTab(event, tabId) {
    loadContent(`${tabId}.html`); // Load the HTML content of the selected tab
    
    // Update active classes for the tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    event.currentTarget.classList.add('active');
}

// Function to load external HTML content for each tab
function loadContent(contentFile) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', contentFile, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('main-content').innerHTML = xhr.responseText;
        } else if (xhr.readyState === 4) {
            document.getElementById('main-content').innerHTML = '<p>Error loading content. Please try again later.</p>';
        }
    };
    xhr.send();
}

// Load the initial content on page load
window.onload = function() {
    loadContent('about.html'); // Load the default 'about.html' when the page first loads
};

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

        newTask.classList.add('task-item'); // Add a class for styling
        newTask.innerHTML = `
            <span>${taskName} (Priority: ${taskPriority}) - Due: ${taskDate} at ${taskTime}</span>
            <button class="delete-task-btn" onclick="deleteTask(this)">Delete</button>
        `;

        taskList.appendChild(newTask);
        saveTasksToLocalStorage();
        showTaskListScreen();
    }
}

function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();
    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const tasks = Array.from(document.querySelectorAll('#task-items .task-item')).map(item => item.querySelector('span').textContent);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-items');
    taskList.innerHTML = '';

    tasks.forEach(taskText => {
        const newTask = document.createElement('li');
        newTask.classList.add('task-item');
        newTask.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-task-btn" onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(newTask);
    });
}

window.onload = function() {
    loadTasksFromLocalStorage();
    initializeCalendar();
};


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
