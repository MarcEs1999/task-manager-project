window.onload = function () {
    initializeCalendar();
    loadTasks(); // Load tasks from localStorage when the page loads
    console.log("Login successful");
}

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

// Show Main Screen Functionality (for login)
function showMainScreen() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.trim() === "admin" && password === "1234") {
        document.getElementById('login-screen').classList.remove('active');
        document.getElementById('task-list-screen').classList.add('active');
    } else {
        alert("Incorrect Username or Password. Please try again.");
    }
}

// Show Add Task Screen
function showAddTaskScreen() {
    document.getElementById('task-list-screen').classList.remove('active');
    document.getElementById('add-task-screen').classList.add('active');
}

// Show Task List Screen
function showTaskListScreen() {
    document.getElementById('add-task-screen').classList.remove('active');
    document.getElementById('task-list-screen').classList.add('active');
}

// Add Task Functionality
function addTask() {
    const taskName = document.getElementById('task-name').value;
    const taskPriority = document.getElementById('task-priority').value;
    const taskDate = document.getElementById('task-date').value;
    const taskTime = document.getElementById('task-time').value;
    const taskDesc = document.getElementById('task-desc').value;

    if (taskName && taskPriority && taskDate && taskTime && taskDesc) {
        const taskId = Date.now(); // Generate a unique ID based on current time
        const taskList = document.getElementById('task-items');

        const newTask = document.createElement('li');
        newTask.className = 'task-item'; // Add class for styling
        newTask.id = `task-${taskId}`; // Assign unique ID to the element

        // Create a container for the task details
        const taskDetails = `
            <div class="task-header">
                <strong>${taskName}</strong>
                <span class="task-date">${new Date(taskDate).toDateString()} ${taskTime}</span>
            </div>
            <div class="task-priority">
                Priority: ${taskPriority}
            </div>
            <div class="task-desc">
                ${taskDesc}
            </div>
            <button onclick="deleteTask(${taskId})">Delete</button>
        `;
        newTask.innerHTML = taskDetails;

        taskList.appendChild(newTask);
        saveTasks(); // Save to localStorage to persist data
        showTaskListScreen(); // Go back to the task list screen after adding
    }
}

// Save all tasks to localStorage
function saveTasks() {
    let tasks = [];
    const taskItems = document.querySelectorAll('#task-items .task-item');
    taskItems.forEach(item => {
        const taskId = item.id.replace('task-', ''); // Remove the prefix 'task-'
        const taskName = item.querySelector('strong').innerText;
        const taskPriority = item.querySelector('.task-priority').innerText.replace('Priority: ', '');
        const taskDate = item.querySelector('.task-date').innerText;
        const taskDesc = item.querySelector('.task-desc').innerText;

        tasks.push({ taskId, taskName, taskPriority, taskDate, taskDesc });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-items');
    if (taskList) {
        taskList.innerHTML = ''; // Clear the existing tasks
        tasks.forEach(task => {
            const newTask = document.createElement('li');
            newTask.className = 'task-item';
            newTask.id = `task-${task.taskId}`;
            newTask.innerHTML = `
                <div class="task-header">
                    <strong>${task.taskName}</strong>
                    <span class="task-date">${task.taskDate}</span>
                </div>
                <div class="task-priority">
                    Priority: ${task.taskPriority}
                </div>
                <div class="task-desc">
                    ${task.taskDesc}
                </div>
                <button onclick="deleteTask(${task.taskId})">Delete</button>
            `;
            taskList.appendChild(newTask);
        });
    } else {
        console.error("Task list element not found.");
    }
}

// Delete Task
function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.taskId != taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    const taskElement = document.getElementById(`task-${taskId}`);
    if (taskElement) {
        taskElement.remove();
    }
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
