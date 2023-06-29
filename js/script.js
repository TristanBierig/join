let users = [];
let currentUser;

async function init() {
  await loadUsers();
  await includeHTML();
  setCurrentUser();
  if (checkForBypass()) {
    window.location.href = '../index.html';
    return
  }
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
  if (currentUrl == '/html/sign_Up.html') {
    return false;
  }
  if (currentUrl != '/index.html' && document.referrer == "" || currentUser === undefined) {
    return true;
  }
}


/**
 * This function takes the one logged in user from the sessionstorage and updates the variable to be used in the script.
 * 
 */
function setCurrentUser() {
  let userIndex = sessionStorage.getItem('currentUser');
  currentUser = users[userIndex];
  loadProfilePicture();
}


/**
 * This function checks if the user has an uploaded img file as a profile picture and sets it as an profile picture.
 * Otherwise a default icon is generated and shown based on user initials and a random color.
 * 
 */
function loadProfilePicture() {
  let user = currentUser.image.initials;
  let picture = document.getElementById('img-profile');
  let defaultImg = document.getElementById('default-profile');

  if (currentUser.image.src == "") {
   picture.classList.add('d-none');
    defaultImg.innerHTML = `
      <span>${user}</span>
    `;
    defaultImg.style = `background-color: ${currentUser.image.color}`
  } else {
    defaultImg.classList.add('d-none');
    picture.src = currentUser.image.src;
  }
}


/**
 * This function clears the logged-in user from the session storage and redirects to the login page.
 * 
 */
function logOut() {
  window.sessionStorage.clear();
  window.location.replace('../index.html');
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

  if (idClass === 'sidebar-help') {
    return
  }
  changeSvgColor(idObject);
  document.getElementById(idClass).classList.add("sidebar-focus");
}


/**
 * This function changes the SVG-Icon of the current page sidebartab to color white
 *
 * @param {string} idObject - This is the object for the currently highlighted SVG
 */
function changeSvgColor(idObject) {
  let object = document.getElementById(idObject);
  let path = object.contentDocument.getElementsByTagName("path");
  let circle = object.contentDocument.getElementsByTagName("circle");
  if (path) {
    for (let i = 0; i < path.length; i++) {
      const element = path[i];
      element.style.fill = "#ffffff";
    }
  }
  if (circle.length !== 0) {
    for (let i = 0; i < circle.length; i++) {
      const element = circle[i];
      element.style.stroke = "#ffffff";
    }
    path[0].style.stroke = "#ffffff";
  }
}


/**
 * Toggles the Modal css class for the log out button
 *
 */
function toggleLogOutModal() {
  document.getElementById("log-out-modal-wrapper").classList.toggle("d-none");
}
