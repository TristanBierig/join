/* ===== Open Task Overlay Functions =====*/

/**
 * this function opens the overlay and fills it with content
 *
 * @param {number} id of the clicked task
 */
function openTask(id) {
  const overlay = document.getElementById("task-overlay");
  const overlayContent = document.getElementById("task-overlay-content");
  overlay.classList.remove("d-none");
  overlayContent.innerHTML = getOverlayContent(id);
  setOverlayPrioIcon(id);
  renderAssignedUsersOverviewOverlay(
    id,
    "assigned-to-box",
    getAssignedUsersHTML
  );
  renderSubtasksOverlay(id);
  boardMain.classList.add("main-fixed");
}

/**
 * this function renders the priority display in the task overview
 *
 * @param {number} id of the selectet task
 */
function setOverlayPrioIcon(id) {
  const task = tasks[findIndexOfTasks(id)];
  const container = document.getElementById("overlayPrioBox");

  if (task.prio === "high") {
    container.innerHTML = getOverviewPrioHTML("Urgent", task.prio);
  }
  if (task.prio === "medium") {
    container.innerHTML = getOverviewPrioHTML("Medium", task.prio);
  }
  if (task.prio === "low") {
    container.innerHTML = getOverviewPrioHTML("Low", task.prio);
  }

  container.querySelector("div").classList.add(task.prio);
}

/**
 * this function fills the overlay with content
 *
 * @param {number} id of the task
 * @returns HTML code from function getOverlayHTML
 */
function getOverlayContent(id) {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (id == task.id) {
      return getOverlayHTML(task);
    }
  }
}

/**
 * this function renders assigned users in the element wit @param boxID
 *
 * @param {number} id of the task
 * @param {string} boxID id of the element where assigned users shoud be rendert
 * @param {callBack} callBack function used to get different HTML codes
 */
function renderAssignedUsersOverviewOverlay(id, boxID, callBack) {
  const userBox = document.getElementById(boxID);
  const task = tasks[findIndexOfTasks(id)];

  task.assignedTo.forEach((user) => {
    const registeredUser = getUserIndex(user, id);

    if (registeredUser) {
      userBox.innerHTML += callBack(registeredUser);
    }
  });
}

/**
 * this function sets up the render function for the subtasks in the overlay
 *
 * @param {number} id of the task
 */
function renderSubtasksOverlay(id) {
  const container = document.getElementById("subtask-box-overlay");

  tasks.forEach((task) => {
    if (id == task.id) {
      const subtasks = task.subTasks;
      if (subtasks.length > 0) {
        subtaskBoxWrapper.classList.remove("d-none");
        subtasks.forEach((subtask, index) => {
          renderSubtasksInOverlay(container, subtask, id, index);
        });
      }
    }
  });
}

/**
 * this function renders subtasks in the @param container
 *
 * @param {Element} container element where to render the subtasks
 * @param {JSON} subtask subtask with name and status
 */
function renderSubtasksInOverlay(container, subtask, taskId, index) {
  if (subtask.status == "open") {
    container.innerHTML += getSubtaskHTML(
      subtask,
      "updateSubtaskInOverlay",
      index,
      taskId
    );
  } else {
    container.innerHTML += getSubtaskCheckedHTML(
      subtask,
      "updateSubtaskInOverlay",
      index,
      taskId
    );
  }
}

/**
 * this function deletes the selected task
 *
 * @param {number} taskID id of selected task
 */
async function deleteTask(taskID) {
  const index = findIndexOfTasks(taskID);
  tasks.splice(index, 1);

  await uploadTasks();
  renderTodos();
  closeOverlay("task-overlay");
}

/**
 * this function updates subtasks after they are clicked to open or closed
 *
 * @param {number} taskID id of the selected task
 * @param {number} subtaskIndex index of clicked subtask
 */
async function updateSubtaskInOverlay(subtaskIndex, taskID) {
  const checkbox = document.getElementById("overlayCheckbox" + subtaskIndex);
  const task = tasks[findIndexOfTasks(taskID)];

  if (checkbox.checked) {
    task.subTasks[subtaskIndex].status = "closed";
  } else {
    task.subTasks[subtaskIndex].status = "open";
  }

  await uploadTasks();
  renderTodos();
}

/* ===== Edit Task Overlay Functions ===== */

/**
 * this function changes the content of the overlay to an edit inputs
 *
 * @param {number} taskID id of selected task
 */
function editTask(taskID) {
  const index = findIndexOfTasks(taskID);
  const task = tasks[index];
  const container = document.getElementById("task-overlay-content");
  container.innerHTML = getEditTaskHTML(task);
  renderAssignedUsersOverviewOverlay(
    task.id,
    "edit-assigned-users-box",
    getEditUserHTML
  );
  boardMain.classList.toggle("main-fixed");
  setPrio(task.prio);
}

/**
 * this function checks if users are asigned to this task and if so cheks the input box
 *
 * @param {number} taskId of the selected task
 */
function checkAssignedUsers(taskId) {
  if (taskId) {
    const task = tasks[findIndexOfTasks(taskId)];
    const assignedTo = task.assignedTo;
    const assignedToBox = document.getElementById("assigned-to");
    const labels = assignedToBox.querySelectorAll("label");

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];

      if (
        assignedTo.indexOf(label.innerText.replace(/(\r\n|\n|\r|\s)/gm, "")) >
        -1
      ) {
        label.querySelector("input").checked = true;
      }
    }
  }
}

/**
 * this function saves the edited task
 *
 * @param {number} taskID  id of selected task
 */
async function saveEditedTask(taskID) {
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (task.id === taskID) {
      task.title = title.value;
      task.description = description.value;
      task.dueDate = document.getElementById("due-date").value;
      task.prio = selectedPrio;
      task.assignedTo = getAssignedPeople();
    }
  }

  await uploadTasks();
  renderTodos();
  closeOverlay("task-overlay");
}

/**
 * this function adds the class d-none to the element with the id from @param
 *
 * @param {string} id of the element to close
 */
function closeOverlay(id) {
  const overlay = document.getElementById(id);
  overlay.classList.add("d-none");
  boardMain.classList.remove("main-fixed");
}
