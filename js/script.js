async function init() {
  await includeHTML();
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
 * Prevents onclick functions to fire when an upper clickfunction gets triggerd
 *
 * @param {object} event
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * This function highlights the currently open page in the sidebar navigation
 *
 */
function toggleSidebarFocus() {
  const pathName = window.location.pathname;
  let id = "sidebar-" + pathName.replace("/html/", "").replace(".html", "");
  document.getElementById(id).classList.add("sidebar-focus");
}

/**
 * Toggles the Modal css class for the log out button
 *
 */
function toggleLogOutModal() {
  document.getElementById("log-out-modal-wrapper").classList.toggle("d-none");
}
