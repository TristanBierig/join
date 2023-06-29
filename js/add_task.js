let categorys = [
  { name: "Design", color: "rbg(255,122,0)" },
  { name: "Sales", color: "rgb(252,113,255)" },
  { name: "Backoffice", color: "rgb(31,215,193)" },
  { name: "Media", color: "rgb(255,119,1)" },
  { name: "Marketing", color: "rgb(0,56,255)" },
];
let selectedPrio;
let subTasksTest = [];

function toggleCategoryPicker() {
  const categoryBox = document.getElementById("category");

  if (categoryBox.childElementCount >= 2) {
    categoryBox.innerHTML = /*html*/ `
         <div>
              <span>Select task category</span>
              <img
                class="open-arrow"
                src="../assets/img/icons/open-select-arrow.svg"
                alt="arrow-down"
              />
            </div>
    `;
  } else {
    categoryBox.innerHTML = /*html*/ `
       <div>
              <span>Select task category</span>
              <img
                class="open-arrow"
                src="../assets/img/icons/open-select-arrow.svg"
                alt="arrow-down"
              />
            </div>
    `;
    categoryBox.innerHTML += /*html*/ `
      <div onclick="createNewCategory()">New category</div>
    `;
    categorys.forEach((category) => {
      categoryBox.innerHTML += /*html*/ `
        <div onclick="doNotClose(event), selectCategory('${category.name}')">
          <div>
            <span>${category.name}</span>
            <div></div>
          </div>
        </div>
      `;
    });
  }
}

function createNewCategory() {
  const categoryBox = document.getElementById("category");
  categoryBox.removeAttribute("onclick");

  categoryBox.innerHTML = /*html*/ `
          <div>
            <input
              placeholder="new Category"
              id="subtask-input"
              type="text"
            />
            <img
              onclick="clearInput('subtask-input')"
              class="subtask-img"
              src="../assets/img/icons/cancel-icon.svg"
              alt=""
            />
            <div class="seperator"></div>
            <img
              onclick="addNewCategory()"
              class="subtask-img"
              src="../assets/img/icons/checkmark-icon-black.svg"
              alt=""
            />
          </div>
          <div>color1 color2 ....</div>
  `;
}

function addNewCategory() {}

function selectCategory(category) {
  const categoryBox = document.getElementById("category");

  categoryBox.innerHTML = /*html*/ `
    <div>
      <span id="selected-category">${category}</span>
      <div></div>
      <img
                class="open-arrow"
                src="../assets/img/icons/open-select-arrow.svg"
                alt="arrow-down"
              />
    </div>
        
  `;
}

function toggleUserPicker() {
  const userBox = document.getElementById("assigned-to");

  if (userBox.childElementCount >= 2) {
    hideusers(userBox);
  } else {
    users.forEach((user, index) => {
      userBox.innerHTML += /*html*/ `
        <label onclick="doNotClose(event)" class="">
          ${user.name}
          <input name="" type="checkbox" />
        </label>
      `;
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

function addTask() {
  const task = {
    id: 0,
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    category: getCategory(),
    assignedTo: getAssignedPeople(),
    dueDate: document.getElementById("due-date").value,
    prio: selectedPrio,
    subTasks: subTasksTest,
    status: "to-do",
  };
  subTasksTest = [];
  console.log(task);
}

function getAssignedPeople() {
  const userBox = document.getElementById("assigned-to");
  const labels = userBox.querySelectorAll("label");
  let assignedTo = [];

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];

    if (label.querySelector("input").checked) {
      assignedTo.push(label.innerText);
    }
  }

  return assignedTo;
}

function setPrio(prio) {
  const highPrioBox = document.getElementById("high-prio-box");
  const mediumPrioBox = document.getElementById("medium-prio-box");
  const lowPrioBox = document.getElementById("low-prio-box");
  selectedPrio = prio;

  if (prio == "high") {
    highPrioBox.classList.add("active", "high");
    mediumPrioBox.classList.remove("active", "medium");
    lowPrioBox.classList.remove("active", "low");
  }
  if (prio == "medium") {
    highPrioBox.classList.remove("active", "high");
    mediumPrioBox.classList.add("active", "medium");
    lowPrioBox.classList.remove("active", "low");
  }
  if (prio == "low") {
    highPrioBox.classList.remove("active", "high");
    mediumPrioBox.classList.remove("active", "medium");
    lowPrioBox.classList.add("active", "low");
  }
}

function clearInput(id) {
  let inputField = document.getElementById(id);
  inputField.value = "";
}

function addSubtask() {
  const subtask = document.getElementById("subtask-input").value;
  subTasksTest.push(subtask);
  renderSubtasks();
}

function renderSubtasks() {
  const container = document.getElementById("subtask-box");
  clearInput("subtask-input");
  container.innerHTML = "";

  subTasksTest.forEach((subtask) => {
    container.innerHTML += /*html*/ `
      <div>${subtask}</div>
    `;
  });
}

function getCategory() {
  const selectCategory = document.getElementById("selected-category");

  if (!selectCategory) {
    return "notSelected";
  } else {
    return selectCategory.innerHTML;
  }
}
