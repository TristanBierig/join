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

function renderTodos() {
  resetDropAreas();

  for (let i = 0; i < testTodos.length; i++) {
    const todo = testTodos[i];
    const container = document.getElementById(todo.category + "-area");

    container.innerHTML += getTodoHTML(todo);
  }
}

function resetDropAreas() {
  const todoArea = document.getElementById("to-do-area");
  todoArea.innerHTML = "";
  const inProgressArea = document.getElementById("in-progress-area");
  inProgressArea.innerHTML = "";
  const feedbackArea = document.getElementById("awaiting-feedback-area");
  feedbackArea.innerHTML = "";
  const doneArea = document.getElementById("done-area");
  doneArea.innerHTML = "";
}

function getTodoHTML(todo) {
  return /*html*/ `
    <div draggable="true" ondragstart="startDragging(${todo.id})">
      <b>${todo.title}</b>
      <p>${todo.description}</p>
    </div>
  `;
}

function startDragging(id) {
  currentlyDraggedElement = id;
  console.log(id);
}

function moveTo(category) {
  testTodos[currentlyDraggedElement].category = category;
  renderTodos();
}

function allowDrop(ev) {
  ev.preventDefault();
}

renderTodos();
