let users = [];
let currentUser;
let tasks = [];
let selectedTaskStatus;

async function init() {
  await loadUsers();
  await includeHTML();
  setCurrentUser();
  await loadTasks();
  if (checkIfBoard()) {
    renderTodos();
  }
  if (checkForBypass()) {
    window.location.href = "../index.html";
    return;
  }
  loadProfilePicture();
  toggleSidebarFocus();
}

/**
 * This function loads the html templates from a seperate directory.
 *
 */
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

  document.getElementById(idObject).src =
    "../assets/img/icons/" + idClass + "-focus.svg";
  document.getElementById(idClass).classList.add("sidebar-focus");
}

/**
 * Toggles the Modal css class for the log out button
 *
 */
function toggleLogOutModal() {
  document.getElementById("log-out-modal-wrapper").classList.toggle("d-none");
}

/**
 * this function checks if the current page is board.html
 *
 */
function checkIfBoard() {
  const url = window.location.href;
  const htmlPage = url.substring(url.lastIndexOf("/"));

  if (htmlPage == "/board.html") {
    return true;
  } else {
    return false;
  }
}

/**
 * this function shows the confirm modal
 *
 */
function showToast() {
  let modal = document.getElementById("confirmModal");
  modal.classList.add("confirm-animation");
  setTimeout(() => {
    modal.classList.remove("confirm-animation");
  }, 2000);
}

/* ===== Add Task Overlay =====*/

/**
 * this function opens the add task modal
 *
 * @param {string} status status of the clicked add task button
 */
function openAddTaskOverlay(status) {
  generateOverlayBackground();
  generateOverlayContent();
  boardMain.classList.add("main-fixed");
  if (status) {
    selectedTaskStatus = status;
  }
}

/**
 * This function switches the buttons in the header, when the mobile layout gets triggered
 *
 */
function toggleMobileTaskBtn() {
  if (window.innerWidth < 850) {
    mobileTaskBtn.classList.toggle("d-none");
    headerFrame.classList.toggle("button-box");
  }
}

/**
 * this functiion creates the overlay background if its already exists show it
 *
 */
function generateOverlayBackground() {
  if (document.getElementById("add-task-overlay-background") == undefined) {
    document.body.innerHTML += getOverlayBackgroundHTML();
  } else {
    const overlay = document.getElementById("add-task-overlay-background");
    overlay.classList.remove("d-none");
  }
}

/**
 * opens the ovelay content with the include HTML function
 *
 */
async function generateOverlayContent() {
  const container = document.getElementById("add-task-overlay-background");

  container.innerHTML = getAddTaskOverlayContentHTML();
  await includeHTML();
  loadProfilePicture();
  toggleSidebarFocus();
  toggleMobileTaskBtn();
  document
    .getElementById("add-task-overlay-content")
    .classList.add("task-overlay-confirm-animation");
}

/**
 * this function closes the overlay with an animation
 *
 */
function animateAddTaskOverlayClosing() {
  document
    .getElementById("add-task-overlay-content")
    .classList.remove("task-overlay-confirm-animation");
  boardMain.classList.remove("main-fixed");
  setTimeout(function () {
    closeOverlay("add-task-overlay-background");
    toggleMobileTaskBtn();
  }, 225);
}

/**
 * this function resets the create category field and color picker
 *
 */
function clearCategoryValue() {
  const colorPickerBox = document.getElementById("color-picker-box");
  const colorBoxes = colorPickerBox.querySelectorAll("div");
  colorBoxes.forEach((colorBox) => {
    colorBox.classList.remove("active-color");
  });

  let input = document.getElementById("category-input");
  input.value = "";
}

/**
 * this function renders asigned users when userlabel is clicked in edit overlay
 *
 */
function updateAssignedUsersDisplay() {
  if (checkIfEditTask()) {
    const container = document.getElementById("edit-assigned-users-box");
    container.innerHTML = "";
    const labels = document
      .getElementById("assigned-to")
      .querySelectorAll("label");

    for (let i = 0; i < labels.length; i++) {
      const label = labels[i];
      const user = getUserIndex(
        label.innerText.replace(/(\r\n|\n|\r|\s)/gm, "")
      );
      if (user && label.control.checked) {
        container.innerHTML += getEditUserHTML(user);
      }
    }
  }
}

/**
 * this function checks if the edit overlay is open
 *
 * @returns true or false
 */
function checkIfEditTask() {
  if (checkIfBoard() && document.getElementById("edit-assigned-users-box")) {
    return true;
  } else {
    return false;
  }
}
