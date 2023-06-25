let currentlyDraggedElement;

let testTodos = [
  {
    id: 0,
    title: "putzen",
    description: "wohnung staubsaugen und wischen",
    category: "to-do",
  },
  {
    id: 1,
    title: "sport",
    description: "50km rennen",
    category: "to-do",
  },
  {
    id: 2,
    title: "essen",
    description: "sollte man nicht vergessen",
    category: "to-do",
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
    const container = document.getElementById(todo.category + "-area");

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
    <div draggable="true" ondragstart="startDragging(${todo.id})">
      <b>${todo.title}</b>
      <p>${todo.description}</p>
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
 * this function changes the category of the dragged task to @category
 * then removes the hover effect, resets the variable currentlyDraggedElement
 *
 * @param {string} category category of the target area
 */
function moveTo(category) {
  testTodos[currentlyDraggedElement].category = category;
  toggleDropareaHoverEffect(category + "-area", "remove");
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
  console.log(ev);
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
