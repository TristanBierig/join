let users = [];

async function init() {
  loadUsers();
  await includeHTML();
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
