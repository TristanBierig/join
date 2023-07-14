let currentlyDraggedElement;

/* ===== General Board Functions ===== */

/**
 * this function searches tasks based on input value
 */
function searchTask() {
  const input = document.getElementById("search-task-input").value;
  let foundTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (
      task.title.toLowerCase().includes(input.toLowerCase()) ||
      task.description.toLowerCase().includes(input.toLowerCase())
    ) {
      foundTasks.push(task);
    }
  }

  renderTodos(foundTasks);
}

/**
 * this function finds the Id of the task in the tasks array and returns its index
 *
 * @param {number} id id of the task
 * @returns index of task
 */
function findIndexOfTasks(id) {
  const index = tasks.findIndex((task) => {
    return task.id === id;
  });
  return index;
}

/**
 *
 * @param {*} user
 * @returns
 */
function getUserIndex(user) {
  return users.find((registeredUser) => {
    return registeredUser.name.replace(/(\r\n|\n|\r|\s)/gm, "") === user;
  });
}

/* ===== Board Render Functions ===== */

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

/**
 * this function renders tasks on the board
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
        renderTasks(task, i);
      }
    } else {
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        renderTasks(task, i);
      }
    }
    hideStatusArrows(searchedTasks);
  }
}

/**
 * this function is a helper funtion to @renderTodos and renders one task
 *
 * @param {JSON} task data of the task
 */
function renderTasks(task, index) {
  const container = document.getElementById(task.status + "-area");

  container.innerHTML += getTodoHTML(task, index);
  renderAssignedUsersOverview(task);
  renderSubtaskProgressBar(task);
}

/**
 * this function is a helper funtion to @renderTasks and renders assigned users in the task card
 *
 * @param {JSON} task data of the task
 */
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
      container.innerHTML += getTaskAssignedUsersHTML(registeredUser);
    }
  }
}

/**
 * this function is a helper funtion to @renderTasks and renders the subtask progress bar in the task card
 *
 * @param {JSON} task data of the task
 */
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

/**
 * this function is a helper function for @renderSubtaskProgressBar and checks if subtask is closed or not
 *
 * @param {Array} subtasks all subtasks of the task
 * @returns array with copleted subtasks
 */
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

/**
 * this fuction is a helper function for @renderSubtaskProgressBar and calculates a percentage of two parameters
 *
 * @param {Array} subtasks all subtasks of the task
 * @param {Array} completedSubtasks completed subtask
 * @returns a number that ist the percentage of the copleted subtasks in relation to all subtasks
 */
function getSubtaskPercent(subtasks, completedSubtasks) {
  if (subtasks) {
    const totalSubtasks = subtasks.length;
    const subtaskPercent = (completedSubtasks / totalSubtasks) * 100;

    return subtaskPercent;
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

/* ===== Mobile Status change Functions ===== */

/**
 * This function changes the status of a specific task by clicking an a button in the mobile view
 *
 * @param {number} taskId id of the task
 * @param {string} status status of the task
 * @param {string} doWhat information if the task should be moved to the next or previous status
 */
async function changeStatusMobile(taskId, status, doWhat) {
  const availibleStatus = ["to-do", "in-progress", "awaiting-feedback", "done"];
  const task = tasks[findIndexOfTasks(taskId)];
  const currentStatusIndex = availibleStatus.indexOf(status);

  if (doWhat === "previous") {
    task.status = availibleStatus[currentStatusIndex - 1];
  }
  if (doWhat === "next") {
    task.status = availibleStatus[currentStatusIndex + 1];
  }

  await uploadTasks();
  renderTodos();
}

/**
 * this function hides the arrows without function in the mobile view
 *
 * @param {array} searchedTasks array with the searched taks
 */
function hideStatusArrows(searchedTasks) {
  let array;
  if (searchedTasks) {
    array = searchedTasks;
  } else {
    array = tasks;
  }
  for (let i = 0; i < array.length; i++) {
    const task = tasks[i];
    const mobileBox = document.getElementById("mobileBox" + i);

    if (task.status === "to-do") {
      mobileBox.querySelectorAll("img")[0].classList.add("d-none");
    }
    if (task.status === "done") {
      mobileBox.querySelectorAll("img")[1].classList.add("d-none");
    }
  }
}
