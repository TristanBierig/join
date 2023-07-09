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

function createNewCategory() {
  const categoryBox = document.getElementById("category");
  categoryBox.removeAttribute("onclick");
  categoryBox.style = "padding: 0;";

  categoryBox.innerHTML = getCreateNewCategoryHTML();
  getColorPicker();
}

function getColorPicker() {
  const colorBox = document.getElementById("color-picker-box");
  colorBox.classList.remove("d-none");
  colorBox.innerHTML = "";

  categoryColors.forEach((color, index) => {
    colorBox.innerHTML += getColorHTML(color, index);
  });
}

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

function selectCategory(category, color) {
  const categoryBox = document.getElementById("category");

  categoryBox.innerHTML = getSelectedCategoryHTML(category, color);
}

function toggleUserPicker() {
  const userBox = document.getElementById("assigned-to");

  if (userBox.childElementCount >= 2) {
    hideusers(userBox);
  } else {
    users.forEach((user) => {
      userBox.innerHTML += getAssignUsersHTML(user);
    });
  }
}

function hideusers(userBox) {
  let allLabels = userBox.querySelectorAll("label");

  allLabels.forEach((label) => {
    label.classList.toggle("d-none");
  });
}

function setMinDate() {
  const today = new Date().toISOString().split("T")[0];
  document.getElementsByName("due-date")[0].setAttribute("min", today);
}

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

function setPrioImage(clickedPrio, prio) {
  const image = clickedPrio.querySelector("img");
  image.src = "../assets/img/icons/" + prio + "-prio-white-icon-small.svg";
}

function resetPrioImages(prioDivs) {
  prioDivs.forEach((div) => {
    const image = div.querySelector("img");
    image.src =
      "../assets/img/icons/" + div.id.split("-")[0] + "-prio-icon-small.svg";
  });
}

function clearInput(id) {
  let inputField = document.getElementById(id);
  inputField.value = "";
}

function addSubtask() {
  const subtask = {
    name: document.getElementById("subtask-input").value,
    status: "open",
  };
  currentSubtasks.push(subtask);
  renderSubtasks();
}

function renderSubtasks() {
  const container = document.getElementById("subtask-box");
  clearInput("subtask-input");
  container.innerHTML = "";

  currentSubtasks.forEach((subtask, index) => {
    container.innerHTML += getSubtaskHTML(subtask, "updateSubtask", "", index);
  });
}

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

function getCategory() {
  const selectCategory = document.getElementById("selected-category");

  if (!selectCategory) {
    return "notSelected";
  } else {
    return selectCategory.innerHTML;
  }
}

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

async function addTask() {
  if (formIsValide()) {
    document.getElementById("submit-button").disabled = true;
    getTaskData();
    await uploadTasks();
    addTaskConfirmModal.classList.add("confirm-animation");
    setTimeout(() => {
      window.location.replace("board.html");
    }, 1000);
  } else {
    alert("alle felder ausfüllen");
  }
}

function formIsValide() {
  const category = document.getElementById("selected-category");
  const prio = selectedPrio;

  if (category && prio) {
    return true;
  } else {
    return false;
  }
}

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
    status: "to-do",
  };
  tasks.push(task);
  currentSubtasks = [];
}

async function uploadTasks() {
  await setItem("tasks", JSON.stringify(tasks));
}
