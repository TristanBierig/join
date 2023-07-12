let categorys = [
  { name: "Design", color: "FF7A00;" },
  { name: "Sales", color: "FC71FF" },
  { name: "Backoffice", color: "1FD7C1" },
  { name: "Media", color: "FFC701" },
  { name: "Marketing", color: "0038FF" },
];

let categoryColors = ["8AA4FF", "F00", "2AD300", "FF8A00", "E200BE", "0038FF"];

let selectedPrio;
let selectedColor;
let currentSubtasks = [];

/**
 * this function renders categorys inside the category container
 *
 */
function toggleCategoryPicker() {
  const categoryBox = document.getElementById("category");

  if (categoryBox.childElementCount >= 2) {
    categoryBox.innerHTML = getTaskCategotryHTML();
  } else {
    categoryBox.innerHTML = getTaskCategotryHTML();
    categoryBox.innerHTML += getNewCategoryHTML();

    categorys.forEach((category) => {
      categoryBox.innerHTML += getCategoryHTML(category);
    });
  }
}

/**
 * this function renders the Input field in the category container
 *
 */
function createNewCategory() {
  const categoryBox = document.getElementById("category");
  categoryBox.removeAttribute("onclick");
  categoryBox.style = "padding: 0;";

  categoryBox.innerHTML = getCreateNewCategoryHTML();
  getColorPicker();
}

/**
 *
 * this function displays the color picker and renders all colors inside it
 */
function getColorPicker() {
  const colorBox = document.getElementById("color-picker-box");
  colorBox.classList.remove("d-none");
  colorBox.innerHTML = "";

  categoryColors.forEach((color, index) => {
    colorBox.innerHTML += getColorHTML(color, index);
  });
}

/**
 *
 * this function this function takes the input and color and creates a new category
 */
function addNewCategory() {
  const categoryBox = document.getElementById("category");
  const colorBox = document.getElementById("color-picker-box");

  if (selectedColor) {
    const newCategory = {
      name: document.getElementById("category-input").value,
      color: selectedColor,
    };
    categorys.push(newCategory);
    categoryBox.innerHTML = getTaskCategotryHTML();
    categoryBox.style = "";
    setTimeout(() => {
      categoryBox.setAttribute("onclick", "toggleCategoryPicker()");
    }, 1);
    colorBox.classList.add("d-none");
  }
}

/**
 * this function removes the active color class from all colors and assignes it to the clicked color
 *
 * @param {string} color name of the selected color
 * @param {string} id of the selected color
 */
function selectColor(color, id) {
  const colrPickerBox = document.getElementById("color-picker-box");
  const colorBoxes = colrPickerBox.querySelectorAll("div");
  selectedColor = color;

  colorBoxes.forEach((colorBox) => {
    colorBox.classList.remove("active-color");
  });

  const selectedColorBox = document.getElementById(id);
  selectedColorBox.classList.add("active-color");
}

/**
 * this function renders the selected category and color inside the category container
 *
 * @param {string} category name of the selected category
 * @param {string} color name of the selected color
 */
function selectCategory(category, color) {
  const categoryBox = document.getElementById("category");

  categoryBox.innerHTML = getSelectedCategoryHTML(category, color);
}

/**
 * this function renders all registerd users inside the assign user container
 *
 */
function toggleUserPicker(taskId) {
  const userBox = document.getElementById("assigned-to");

  if (userBox.childElementCount >= 2) {
    hideusers(userBox);
  } else {
    users.forEach((user) => {
      userBox.innerHTML += getAssignUsersHTML(user);
    });
    if (checkIfBord()) {
      checkAssignedUsers(taskId);
    }
  }
}

/**
 * this function hides the @userBox
 *
 * @param {Element} userBox container for the users to be selected from
 */
function hideusers(userBox) {
  let allLabels = userBox.querySelectorAll("label");

  allLabels.forEach((label) => {
    label.classList.toggle("d-none");
  });
}

/**
 * this function makes it not posible to pick a date in the past
 *
 */
function setMinDate() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementsByName("due-date")[0].setAttribute("min", today);
}

/**
 * this function checks whitch user is selected in the container "assigned-to" and returns an array with all users
 *
 * @returns to whitch users a task is assigned
 */
function getAssignedPeople() {
  const userBox = document.getElementById("assigned-to");
  const labels = userBox.querySelectorAll("label");
  let assignedTo = [];

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];

    if (label.querySelector("input").checked) {
      assignedTo.push(label.innerText.replace(/(\r\n|\n|\r|\s)/gm, ""));
    }
  }

  return assignedTo;
}

/**
 * this function sets the priority to whatever priority is selected also sets an activ class on the selected container
 *
 * @param {string} prio priority of the selected box
 */
function setPrio(prio) {
  const prioBox = document.getElementById("prio-box");
  const prioDivs = prioBox.querySelectorAll("div");
  selectedPrio = prio;

  resetPrioImages(prioDivs);
  prioDivs.forEach((div) => {
    div.classList.remove("active", "high", "medium", "low");
  });

  const clickedPrio = document.getElementById(prio + "-prio-box");
  clickedPrio.classList.add(prio);
  setPrioImage(clickedPrio, prio);
}

/**
 * this function replaces the img of the selected priority element wit another image
 *
 * @param {Element} clickedPrio clicked priority container
 * @param {string} prio priority of the clicked task
 */
function setPrioImage(clickedPrio, prio) {
  const image = clickedPrio.querySelector("img");
  image.src = "../assets/img/icons/" + prio + "-prio-white-icon-small.svg";
}

/**
 * this functions sets all priority imagas back to the default image
 *
 * @param {NodeList} prioDivs nodelist with all priority containers
 */
function resetPrioImages(prioDivs) {
  prioDivs.forEach((div) => {
    const image = div.querySelector("img");
    image.src =
      "../assets/img/icons/" + div.id.split("-")[0] + "-prio-icon-small.svg";
  });
}

/**
 * this function clears the value of input the element with @id
 *
 * @param {id} id of the input element to clear
 */
function clearInput(id) {
  let inputField = document.getElementById(id);
  inputField.value = "";
}

/**
 * this function gets the value of an input creates an JSON and pushes this JSON in an array
 *
 */
function addSubtask() {
  const subtask = {
    name: document.getElementById("subtask-input").value,
    status: "open",
  };
  currentSubtasks.push(subtask);
  renderSubtasks();
}

/**
 * this function renders created subtasks in the subtask container
 *
 */
function renderSubtasks() {
  const container = document.getElementById("subtask-box");
  clearInput("subtask-input");
  container.innerHTML = "";

  currentSubtasks.forEach((subtask, index) => {
    container.innerHTML += getSubtaskHTML(subtask, "updateSubtask", index, "");
  });
}

/**
 * this function updates the subtasks to status open or closed based of if the checkbox is checked or not
 *
 */
function updateSubtask() {
  const subtaskBox = document.getElementById("subtask-box");
  const subtasks = subtaskBox.querySelectorAll("label");
  let updatedSubtasks = [];

  subtasks.forEach((subtask) => {
    if (subtask.querySelector("input").checked) {
      const updatedSubtask = { name: subtask.textContent, status: "closed" };
      updatedSubtasks.push(updatedSubtask);
    } else {
      const updatedSubtask = { name: subtask.textContent, status: "open" };
      updatedSubtasks.push(updatedSubtask);
    }
  });
  currentSubtasks = updatedSubtasks;
}

/**
 * checks if a category is selected and returns the category or "notSelected"
 *
 * @returns the selected category
 */
function getCategory() {
  const selectCategory = document.getElementById("selected-category");

  if (!selectCategory) {
    return "notSelected";
  } else {
    return selectCategory.innerHTML;
  }
}

/**
 * this function returns the color code of the selected category color
 *
 * @returns category color
 */
function getCategoryColor() {
  const selectCategory = document.getElementById("selected-category");
  let color;

  if (selectCategory) {
    const selectCategoryContent = selectCategory.innerHTML;
    categorys.forEach((category) => {
      if (category.name == selectCategoryContent) {
        color = category.color;
        return;
      }
    });
  }
  return color;
}

function getStatus() {
  if (selectedTaskStatus) {
    return selectedTaskStatus;
  } else {
    return "to-do";
  }
}

/**
 * this finction initiates the form submit if the form is valid else its displays error messages
 *
 */
async function addTask() {
  if (formIsValide()) {
    document.getElementById("submit-button").disabled = true;
    getTaskData();
    await uploadTasks();
    addTaskConfirmModal.classList.add("confirm-animation");
    setTimeout(() => {
      window.location.replace("board.html");
    }, 1000);
  }
}

/**
 * this function checks if necessary inputs are existent if so the return is true else its false
 *
 * @returns true or false
 */
function formIsValide() {
  const category = document.getElementById("selected-category");
  const prio = selectedPrio;
  const assign = document.getElementById("assigned-to").children;

  if (allInputsAreValid(category, prio, assign)) {
    return true;
  } else {
    return false;
  }
}

function allInputsAreValid(category, prio, assign) {
  if (!category) {
    errorTagCategory.classList.remove("d-none");
    return false;
  } else {
    errorTagCategory.classList.add("d-none");
  }

  if (!prio) {
    errorTagPrio.classList.remove("d-none");
    return false;
  } else {
    errorTagPrio.classList.add("d-none");
  }

  if (!validateAssignment(assign)) {
    return false;
  }
  return true;
}

function validateAssignment(assign) {
  if (assign.length < 2) {
    errorTagAssign.classList.remove("d-none");
    return false;
  } else if (!checkForAssignment(assign)) {
    errorTagAssign.classList.remove("d-none");
    return false;
  } else {
    return true;
  }
}

function checkForAssignment(assign) {
  for (let i = 0; i < assign.length; i++) {
    if (assign[2].form[i].checked) {
      return true;
    }
  }
}

/**
 * this function geathers all task data in a JSON and pushes the JSON in the tasks array
 *
 */
async function getTaskData() {
  const task = {
    id: new Date().valueOf(),
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    category: getCategory(),
    categoryColor: getCategoryColor(),
    assignedTo: getAssignedPeople(),
    dueDate: document.getElementById("due-date").value,
    prio: selectedPrio,
    subTasks: currentSubtasks,
    status: getStatus(),
  };
  tasks.push(task);
  currentSubtasks = [];
}

/**
 * this function upload the tasks array to the backend server
 *
 */
async function uploadTasks() {
  await setItem("tasks", JSON.stringify(tasks));
}

function resetAddTaskForm() {
  const categoryBox = document.getElementById("category-box");
  const assignedToBox = document.getElementById("add-task-assigned-to-box");
  const prioBox = document.getElementById("prio-box-wrapper");
  const subtasksBox = document.getElementById("subtask-box-wrapper");
  const subtaskBox = document.getElementById("subtask-box");

  categoryBox.innerHTML = getCategoryBoxHTML();
  assignedToBox.innerHTML = getAssignedToBoxHTML();
  prioBox.innerHTML = getprioBoxHTML();
  subtasksBox.innerHTML = getsubtasksBoxHTML();

  subtaskBox.innerHTML = "";
  currentSubtasks = [];
  selectedPrio = "";
}
