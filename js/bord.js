let currentlyDraggedElement;

/**
 * this function renders tasks on the bord
 *
 */
function renderTodos() {
  const url = window.location.href;
  const htmlPage = url.substring(url.lastIndexOf("/") + 1);
  if (htmlPage == "board.html") {
    resetDropAreas();
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      const container = document.getElementById(task.status + "-area");

      container.innerHTML += getTodoHTML(task);
      renderAssignedUsersOverview(task);
      renderSubtaskProgressBar(task);
    }
  }
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
  container.innerHTML = getProgressBarHTML();
}

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
  currentlyDraggedElement = id;
  console.log(id);
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
  console.log(input);

  /* TODO SUCHFUNKTION*/
}

/* ===== Overlay Functions =====*/

function openTask(id) {
  const overlay = document.getElementById("task-overlay");
  const overlayContent = document.getElementById("task-overlay-content");
  overlay.classList.remove("d-none");
  overlayContent.innerHTML = getOverlayContent(id);
  renderAssignedUsersOverviw(id);
}

function closeOverlay() {
  const overlay = document.getElementById("task-overlay");
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
          console.log(registeredUser);
          userBox.innerHTML += getAssignedUsersHTML(registeredUser);
        }
      });
    }
  }
}

function getAssignedUsersHTML(task) {
  return /*html*/ `
      <div>
        <div style="background-color: ${task.image.color};" class="assigned-to-display-maximized">${task.image.initials}</div>
        <span>${task.name}</span>
      </div>
  `;
}

/*AUSLAGERN !!!*/
function getOverlayHTML(task) {
  return /*html*/ `
    <span style="background-color: #${task.categoryColor}" class="overlay-category">${task.category}</span>
    <b class="overlay-headline">${task.title}</b>
    <p>${task.description}</p>
    <div class="overlay-due-date">
      <b>Due date:</b>
      <span>${task.dueDate}</span>
    </div>
    <div class="overlay-prio">
      <b>Priority:</b>
      <div>${task.prio}</div>
    </div>
    <b>Assigned To:</b>
    <div id="assigned-to-box"></div>
    <img onclick="closeOverlay()" class="overlay-close-button" src="../assets/img/icons/x-icon.svg" alt="X">
    <div class="overlayy-delete-edit-box">
      <div class="overlay-delete-box"><img src="../assets/img/icons/trash-bin.svg" alt=""></div>
      <div class="overlay-edit-box"><img src="../assets/img/icons/bord-overlay-edit-pencil.svg" alt=""></div>
    </div>
  `;
}
