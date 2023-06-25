let currentlyDraggedElement;

let testTodos = [
  {
    id: 0,
    title: "putzen",
    description: "wohnung staubsaugen und wischen",
    status: "to-do",
    category: "test",
    assignedTo: ["tobi", "tristan", "julia"],
    dueDate: "",
    prio: "low",
    subTasks: ["test"],
  },
  {
    id: 1,
    title: "sport",
    description: "50km rennen",
    status: "to-do",
    assignedTo: ["tobi", "tristan", "julia"],
    category: "Design",
    dueDate: "",
    prio: "low",
    subTasks: ["test"],
  },
  {
    id: 2,
    title: "essen",
    description: "sollte man nicht vergessen",
    status: "to-do",
    assignedTo: ["tobi", "tristan", "julia"],
    category: "Training",
    dueDate: "",
    prio: "low",
    subTasks: ["test"],
  },
];

/**
 * this function renders tasks on the bord
 *
 */
function renderTodos() {
  resetDropAreas();

  for (let i = 0; i < testTodos.length; i++) {
    const todo = testTodos[i];
    const container = document.getElementById(todo.status + "-area");

    container.innerHTML += getTodoHTML(todo);
  }
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

/**
 * this function returns HTML Code for the task cards
 *
 * FUNKTION NOCH IN HTML JS AULSGERN!!!!!!!!!!!!!!!!
 *
 * @param {object} todo JSON with task Data
 * @returns HTML Code with data from the @todo object
 */
function getTodoHTML(todo) {
  return /*html*/ `
    <div class="task" draggable="true" ondragstart="startDragging(${todo.id})">
      <span class="task-category">${todo.category}</span>
      <div class="task-title-description-box">
        <b>${todo.title}</b>
        <p>${todo.description}</p>
      </div>
      <div class="subtask-box">
        <div class="progress-bar-box">
          <div class="progress-bar-bar"></div>
        </div>
        <div class="subtask-text-box">
          <span>1/2</span> 
          <span>Done</span>
        </div>
      </div>
      <div class="assign-and-prio-box">
        <div>
          <span class="assigned-to-display">SM</span>
        </div>
        <div>
          <img src="../assets/img/icons/low-prio-icon-small.svg" alt="">
        </div>        
      </div>
      </div>
    </div>
  `;
}

/* ===== DRAG FUNCTIONS =====*/

/**
 * this function sets the variable currentlyDraggedElement to the value of @id
 *
 * @param {number} id id of the dragged Element
 */
function startDragging(id) {
  currentlyDraggedElement = id;
}

/**
 * this function changes the category of the dragged task to @status
 * then removes the hover effect, resets the variable currentlyDraggedElement
 *
 * @param {string} status category of the target area
 */
function moveTo(status) {
  testTodos[currentlyDraggedElement].status = status;
  toggleDropareaHoverEffect(status + "-area", "remove");
  currentlyDraggedElement = null;
  renderTodos();
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

renderTodos();
