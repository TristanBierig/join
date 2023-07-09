let users = [];
let currentUser;
let tasks = [];

async function init() {
  await loadUsers();
  await includeHTML();
  setCurrentUser();
  await loadTasks();
  checkIfBord();
  if (checkForBypass()) {
    window.location.href = "../index.html";
    return;
  }
  loadProfilePicture();
  toggleSidebarFocus();
}


async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}


/**
 * This function checks if the user accessing a page within the app is properly logged in.
 * If not the access is denied and user is send back to the Login page
 *
 * @returns {Boolean} - If true, the user tried to bypass the Loginrules and access the app directly.
 */
function checkForBypass() {
  let currentUrl = window.location.pathname;
  if (currentUrl == "/html/sign_Up.html") {
    return false;
  }
  if (
    (currentUrl != "/index.html" && document.referrer == "") ||
    currentUser === undefined
  ) {
    return true;
  }
}

/**
 * This function takes the one logged in user from the sessionstorage and updates the variable to be used in the script.
 *
 */
function setCurrentUser() {
  let userIndex = sessionStorage.getItem("currentUser");
  currentUser = users[userIndex];
}

/**
 * This function checks if the user has an uploaded img file as a profile picture and sets it as an profile picture.
 * Otherwise a default icon is generated and shown based on user initials and a random color.
 *
 */
function loadProfilePicture() {
  let user = currentUser.image.initials;
  let picture = document.getElementById("img-profile");
  let defaultImg = document.getElementById("default-profile");

  if (currentUser.image.src == "") {
    picture.classList.add("d-none");
    defaultImg.innerHTML = `
      <span>${user}</span>
    `;
    defaultImg.style = `background-color: ${currentUser.image.color}`;
  } else {
    defaultImg.classList.add("d-none");
    picture.src = currentUser.image.src;
  }
}

/**
 * This function clears the logged-in user from the session storage and redirects to the login page.
 *
 */
function logOut() {
  window.sessionStorage.clear();
  window.location.replace("../index.html");
}

/**
 * Prevents onclick functions to fire when an upper clickfunction gets triggerd
 *
 * @param {object} event
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * This function highlights the currently open page in the sidebar navigation and gets called from the sidebar.html SVG-Object onload
 *
 */
function toggleSidebarFocus() {
  const pathName = window.location.pathname;
  let idClass =
    "sidebar-" +
    pathName
      .replace("/html/", "")
      .replace(".html", "")
      .replace("/join", "")
      .replace("/Modul_10", "");
  let idObject =
    "sidebar-object-" +
    pathName
      .replace("/html/", "")
      .replace(".html", "")
      .replace("/join", "")
      .replace("/Modul_10", "");

  if (idClass === "sidebar-help") {
    return;
  }
  
  document.getElementById(idObject).src = '../assets/img/icons/' + idClass + '-focus.svg';
  document.getElementById(idClass).classList.add("sidebar-focus");
}


/**
 * Toggles the Modal css class for the log out button
 *
 */
function toggleLogOutModal() {
  document.getElementById("log-out-modal-wrapper").classList.toggle("d-none");
}

function checkIfBord() {
  const url = window.location.href;
  const htmlPage = url.substring(url.lastIndexOf("/"));

  if (htmlPage == "/board.html") {
    renderTodos();
  }
}

function showToast() {
  let modal = document.getElementById("confirmModal");
  modal.classList.add("confirm-animation");
  setTimeout(() => {
    modal.classList.remove("confirm-animation");
  }, 2000);
}

/* ===== Add Task Overlay =====*/

function openAddTaskOverlay() {
  generateOverlayBackground();
  generateOverlayContent();
}

function generateOverlayBackground() {
  if (document.getElementById("add-task-overlay-background") == undefined) {
    document.body.innerHTML += getOverlayBackgroundHTML();
  } else {
    const overlay = document.getElementById("add-task-overlay-background");
    overlay.classList.remove("d-none");
    console.log("exestiert");
  }
}

async function generateOverlayContent() {
  const container = document.getElementById("add-task-overlay-background");

  container.innerHTML = getAddTaskOverlayContentHTML();
  await includeHTML();
  document
    .getElementById("add-task-overlay-content")
    .classList.add("task-overlay-confirm-animation");
}

function animateAddTaskOverlayClosing() {
  document
    .getElementById("add-task-overlay-content")
    .classList.remove("task-overlay-confirm-animation");
  setTimeout(function () {
    closeOverlay("add-task-overlay-background");
  }, 225);
}
