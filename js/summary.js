/**
 * This function loads the complete content of the summary.
 *
 */
async function initSummaryContent() {
  await init();
  greetUser();
  updateUserName();
  loadTasksForSummary();
  loadSummaryContent()
};

/**
 * This function changes the greeting depending on the time of day.
 *
 */
function greetUser() {
  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  let greetingElement = document.getElementById("greetings");

  if (currentHour < 12) {
    greetingElement.textContent = "Good morning, ";
  } else if (currentHour < 18) {
    greetingElement.textContent = "Good afternoon, ";
  } else {
    greetingElement.textContent = "Good evening, ";
  }
}

/**
 * This function selects the name of the current user. Alternatively it uses "Guest".
 *
 */
function updateUserName() {
  let userNameElement = document.getElementById('user-name');

  if (currentUser.name === 'Guest Visitor') {
    const guestVisitor = currentUser.name.split(" ");
    userNameElement.innerHTML = guestVisitor.join(" ");
  } else {
    userNameElement.innerHTML = currentUser.name;
  }
}

/**
 * This function loads the tasks from the local storage.
 *
 */
async function loadTasksForSummary() {
  tasks = JSON.parse(await getItem('tasks'));
  loadSummaryContent();
}

/**
 * This function loads the summary content and checks the available tasks.
 *
 */
function loadSummaryContent() {
  if (tasks.length > 0) {
    tasksInBoard();
    inProgressTasks();
    awaitingFeedbackTasks();
    urgentTasks();
    getDeadline();
    toDoTasks();
    doneTasks();
  }
}

/**
 * This function passes the content of the variable to the 'summary.html'.
 * 
 */
function tasksInBoard() {
  document.getElementById('in-board').innerHTML = '';
  document.getElementById('in-board').innerHTML = `
        ${tasks.length}
    `;
}

/**
 * This function passes the content of the variable to the 'summary.html'.
 * 
 */
function inProgressTasks() {
  let inProgress = tasks.filter(t => t['status'] == 'in-progress');
  document.getElementById('in-progress').innerHTML = '';
  document.getElementById('in-progress').innerHTML += `
        ${inProgress.length}
    `;
}

/**
 * This function passes the content of the variable to the 'summary.html'.
 * 
 */
function awaitingFeedbackTasks() {
  let awaitingFeedback = tasks.filter(t => t['status'] == 'awaiting-feedback');
  document.getElementById('awaiting-feedback').innerHTML = '';
  document.getElementById('awaiting-feedback').innerHTML += `
        ${awaitingFeedback.length}
    `;
}

/**
 * This function passes the content of the variable to the 'summary.html'.
 * 
 */
function urgentTasks() {
  let urgent = tasks.filter(t => t['prio'] == 'high');
  document.getElementById('urgent-tasks').innerHTML = '';
  document.getElementById('urgent-tasks').innerHTML += `
        ${urgent.length}
    `;
}

/**
 * This function passes the content of the variable to the 'summary.html'.
 * 
 */
function getDeadline() {
  document.getElementById('upcoming-deadline').innerHTML = '';
  let earliestDate = tasks[0].dueDate;

    for (let i = 1; i < tasks.length; i++) {
        if (tasks[i].dueDate < earliestDate) {
          earliestDate = tasks[i].dueDate;
        }
    }

  document.getElementById('upcoming-deadline').innerHTML += `
        ${earliestDate}
  `;
}

/**
 * This function passes the content of the variable to the 'summary.html'.
 * 
 */
function toDoTasks() {
  let toDo = tasks.filter(t => t['status'] == 'to-do');
  document.getElementById('to-do').innerHTML = '';
  document.getElementById('to-do').innerHTML += `
        ${toDo.length}
    `;
}

/**
 * This function passes the content of the variable to the 'summary.html'.
 * 
 */
function doneTasks() {
  let done = tasks.filter(t => t['status'] == 'done');
  document.getElementById('done').innerHTML = '';
  document.getElementById('done').innerHTML += `
        ${done.length}
    `;
}
