let categorys = [
  { name: "Design", color: "rbg(255,122,0)" },
  { name: "Sales", color: "rgb(252,113,255)" },
  { name: "Backoffice", color: "rgb(31,215,193)" },
  { name: "Media", color: "rgb(255,119,1)" },
  { name: "Marketing", color: "rgb(0,56,255)" },
];

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
    categorys.forEach((category, index) => {
      console.log(index);
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
    category: document.getElementById("selected-category").innerHTML,
    assignedTo: getAssignedPeople(),
    dueDate: document.getElementById("due-date").value,
    prio: "",
    subTasks: [],
    status: "to-do",
  };

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
