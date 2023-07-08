let currentlyDraggedElement;

/**
 * this function renders tasks on the bord
 *
 */
function renderTodos(searchedTasks) {
  const url = window.location.href;
  const htmlPage = url.substring(url.lastIndexOf("/") + 1);
  if (htmlPage == "board.html") {
    resetDropAreas();

    if (searchedTasks) {
      for (let i = 0; i < searchedTasks.length; i++) {
        const task = searchedTasks[i];
        renderTasks(task);
      }
    } else {
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        renderTasks(task);
      }
    }
  }
}

function renderTasks(task) {
  const container = document.getElementById(task.status + "-area");

  container.innerHTML += getTodoHTML(task);
  renderAssignedUsersOverview(task);
  renderSubtaskProgressBar(task);
}

function renderAssignedUsersOverview(task) {
  const container = document.getElementById(
    "overview-assigned-to-box" + task.id
  );
  container.innerHTML = "";

  for (let i = 0; i < task.assignedTo.length; i++) {
    const user = task.assignedTo[i];
    const registeredUser = users.find((registeredUser) => {
      return registeredUser.name.replace(/(\r\n|\n|\r|\s)/gm, "") === user;
    });

    if (registeredUser) {
      console.log(registeredUser);
      container.innerHTML += getTaskAssignedUsersHTML(registeredUser);
    }
  }
}

function renderSubtaskProgressBar(task) {
  const container = document.getElementById("subtask-box" + task.id);
  const subtasks = task.subTasks;
  const completedSubtasks = getCompletedSubtasks(subtasks);
  const subtaskPercent = getSubtaskPercent(subtasks, completedSubtasks);

  if (subtasks.length > 0) {
    container.innerHTML = getProgressBarHTML(
      subtasks,
      subtaskPercent,
      completedSubtasks
    );
  } else {
    container.classList.add("d-none");
  }
}

function getSubtaskPercent(subtasks, completedSubtasks) {
  if (subtasks) {
    const totalSubtasks = subtasks.length;
    const subtaskPercent = (completedSubtasks / totalSubtasks) * 100;

    return subtaskPercent;
  }
}

function getCompletedSubtasks(subtasks) {
  if (subtasks) {
    let completedSubtasks = 0;

    subtasks.forEach((subtasks) => {
      if (subtasks.status === "closed") {
        completedSubtasks++;
      }
    });

    return completedSubtasks;
  }
}

function openAddTaskOverlay() {
  generateOverlayBackground();
  generateOverlayContent();
}

function generateOverlayBackground() {
  if (document.getElementById("add-task-overlay-background") == undefined) {
    document.body.innerHTML += getOverlayBackgroundHTML();
  } else {
    const overlay = document.getElementById("add-task-overlay-background");
    overlay.classList.remove("d-none");
    console.log("exestiert");
  }
}

async function generateOverlayContent() {
  const container = document.getElementById("add-task-overlay-background");

  container.innerHTML = `<div class="add-task-overlay-content" id="add-task-overlay-content" onclick="doNotClose(event)" w3-include-html="../assets/templates/task_Form_Overlay.html"></div>`;
  await includeHTML();
  document
    .getElementById("add-task-overlay-content")
    .classList.add("task-overlay-confirm-animation");
}

function animateAddTaskOverlayClosing() {
  document
    .getElementById("add-task-overlay-content")
    .classList.remove("task-overlay-confirm-animation");
  setTimeout(function () {
    closeOverlay("add-task-overlay-background");
  }, 225);
}

async function deleteTask(taskID) {
  const index = tasks.findIndex((task) => {
    return task.id === taskID;
  });
  console.log(index);
  tasks.splice(index, 1);

  await uploadTasks();
  renderTodos();
  closeOverlay("task-overlay");
}

function editTask(taskID) {}

/**
 * this function resets the inner HTML of all drop areas
 *
 */
function resetDropAreas() {
  const areas = [
    "to-do-area",
    "in-progress-area",
    "awaiting-feedback-area",
    "done-area",
  ];

  for (let i = 0; i < areas.length; i++) {
    const areaId = areas[i];

    const area = document.getElementById(areaId);
    area.innerHTML = "";
  }
}

/* ===== DRAG FUNCTIONS =====*/

/**
 * this function sets the variable currentlyDraggedElement to the value of @id
 *
 * @param {number} id id of the dragged Element
 */
function startDragging(id) {
  currentlyDraggedElement = tasks.findIndex((task) => {
    return id === task.id;
  });
  console.log(currentlyDraggedElement); //delete
}

/**
 * this function changes the category of the dragged task to @status
 * then removes the hover effect, resets the variable currentlyDraggedElement
 *
 * @param {string} status category of the target area
 */
async function moveTo(status) {
  tasks[currentlyDraggedElement].status = status;
  toggleDropareaHoverEffect(status + "-area", "remove");
  currentlyDraggedElement = null;
  renderTodos();
  await uploadTasks();
}

/**
 * this function allows to drop element and toogles hover effect
 *
 * @param {Event} ev drag event
 * @param {string} id id of the target area
 */
function allowDrop(ev, id) {
  ev.preventDefault();
  toggleDropareaHoverEffect(id, "add");
}

/**
 * this function adds or removes hover effect on drag areas
 *
 * @param {string} id id of the target area
 * @param {string} action add or remove
 */
function toggleDropareaHoverEffect(id, action) {
  const dragArea = document.getElementById(id);
  if (action == "remove") {
    dragArea.classList.remove("dragarea-hover");
  }
  if (action == "add") {
    dragArea.classList.add("dragarea-hover");
  }
}

function searchTask() {
  const input = document.getElementById("search-task-input").value;
  let foundTasks = [];
  console.log(input);

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (task.title.toLowerCase().includes(input.toLowerCase())) {
      foundTasks.push(task);
    }
  }
  renderTodos(foundTasks);
}

/* ===== Overlay Functions =====*/

function openTask(id) {
  const overlay = document.getElementById("task-overlay");
  const overlayContent = document.getElementById("task-overlay-content");
  overlay.classList.remove("d-none");
  overlayContent.innerHTML = getOverlayContent(id);
  renderAssignedUsersOverviw(id);
}

function closeOverlay(id) {
  const overlay = document.getElementById(id);
  overlay.classList.add("d-none");
}

function getOverlayContent(id) {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (id == task.id) {
      return getOverlayHTML(task);
    }
  }
}

function renderAssignedUsersOverviw(id) {
  const userBox = document.getElementById("assigned-to-box");

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (id == task.id) {
      task.assignedTo.forEach((user) => {
        const registeredUser = users.find((registeredUser) => {
          return registeredUser.name.replace(/(\r\n|\n|\r|\s)/gm, "") === user;
        });

        if (registeredUser) {
          userBox.innerHTML += getAssignedUsersHTML(registeredUser);
        }
      });
    }
  }
}
