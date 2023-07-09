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
  renderAssignedUsersOverviewOverlay(
    id,
    "assigned-to-box",
    getAssignedUsersHTML
  );
  renderSubtasksOverlay(id);
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

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    if (id == task.id) {
      task.assignedTo.forEach((user) => {
        const registeredUser = getUserIndex(user);

        if (registeredUser) {
          userBox.innerHTML += callBack(registeredUser);
        }
      });
    }
  }
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
        subtasks.forEach((subtask) => {
          renderSubtasksInOverlay(container, subtask);
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
function renderSubtasksInOverlay(container, subtask) {
  if (subtask.status == "open") {
    container.innerHTML += getSubtaskHTML(subtask, "updateSubtaskInOverlay");
  } else {
    container.innerHTML += getSubtaskCheckedHTML(
      subtask,
      "updateSubtaskInOverlay"
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

/*FUNKTION NOCH SCHREIBEN*/
function updateSubtaskInOverlay() {
  console.log("asd");
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

  console.log(task); //delete
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
}
