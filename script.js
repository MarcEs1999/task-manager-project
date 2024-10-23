// JavaScript to handle tab switching
function openTab(event, tabId) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    // Remove the active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Show the selected tab content
    document.getElementById(tabId).classList.add('active');
    
    // Add the active class to the clicked tab
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

// JavaScript to handle tab switching and content loading
function openTab(event, tabId) {
    // Remove the active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Add the active class to the clicked tab
    event.currentTarget.classList.add('active');

    // Show the selected tab content in the main-content section
    let contentFile = '';
    switch(tabId) {
        case 'about':
            contentFile = 'about.html';
            break;
        case 'research':
            contentFile = 'research.html';
            break;
        case 'personas':
            contentFile = 'personas.html';
            break;
        case 'scenario':
            contentFile = 'scenario.html';
            break;
        case 'storyboard':
            contentFile = 'storyboard.html';
            break;
        case 'moodboard':
            contentFile = 'moodboard.html';
            break;
        case 'flowchart':
            contentFile = 'flowchart.html';
            break;
        case 'wireframes':
            contentFile = 'wireframes.html';
            break;
        case 'gui':
            contentFile = 'gui.html';
            break;
        case 'prototype':
            contentFile = 'prototype.html';
            break;
        case 'references':
            contentFile = 'references.html';
            break;
    }

    // Load content into the main content area
    if (contentFile) {
        loadContent(contentFile);
    }
}