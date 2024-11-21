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
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById('main-content').innerHTML = xhr.responseText;
        } else if (xhr.readyState === 4) {
            document.getElementById('main-content').innerHTML = '<p>Error loading content. Please try again later.</p>';
        }
    };
    xhr.send();
}

// Load the initial content on page load
window.onload = function () {
    loadContent('about.html'); // Load the default 'about.html' when the page first loads
    initializeCalendar();
    loadTasks();
};

// Add Task Functionality
function addTask() {
    const taskName = document.getElementById('task-name').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;
    const taskDesc = document.getElementById('task-desc').value;

    if (taskName && taskPriority && taskDate && taskTime && taskDesc) {
        const taskList = document.getElementById('task-items');
        const taskId = `task-${Date.now()}`; // Unique task ID

        // Create a new task element
        const newTask = document.createElement('div');
        newTask.classList.add('task-item');
        newTask.id = taskId;
        newTask.innerHTML = `
            <div class="task-info">
                <strong>${taskName}</strong><br>
                <span>${taskDesc}</span><br>
                <span><strong>Due:</strong> ${new Date(taskDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${taskTime}</span>
            </div>
            <button class="delete-task" onclick="deleteTask('${taskId}')">Delete</button>
        `;

        taskList.appendChild(newTask);
        saveTask(taskId, taskName, taskPriority, taskDate, taskTime, taskDesc);
        showTaskListScreen();
    }
}

// Save Task to localStorage
function saveTask(taskId, taskName, taskPriority, taskDate, taskTime, taskDesc) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ taskId, taskName, taskPriority, taskDate, taskTime, taskDesc });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load Tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-items');

    tasks.forEach(task => {
        const newTask = document.createElement('div');
        newTask.classList.add('task-item');
        newTask.id = task.taskId;
        newTask.innerHTML = `
            <div class="task-info">
                <strong>${task.taskName}</strong><br>
                <span>${task.taskDesc}</span><br>
                <span><strong>Due:</strong> ${new Date(task.taskDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at ${task.taskTime}</span>
            </div>
            <button class="delete-task" onclick="deleteTask('${task.taskId}')">Delete</button>
        `;
        taskList.appendChild(newTask);
    });
}

// Delete Task
function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.taskId !== taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.getElementById(taskId).remove();
}

// Calendar Initialization
function initializeCalendar() {
    if (typeof flatpickr !== "undefined") {
        const calendarEl = document.getElementById('calendar');
        if (calendarEl) {
            flatpickr(calendarEl, {
                inline: true,
                onChange: function (selectedDates) {
                    console.log('Selected date:', selectedDates);
                }
            });
        }
    } else {
        console.error("flatpickr is not defined. Make sure you have included the flatpickr library.");
    }
}
