let sidebarFocus;

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

function toggleSidebarFocus(i) {
  if (i !== undefined) {
    sidebarFocus = i;
    sessionStorage.setItem("sidebarFocus", i);
  }
  let focus = sessionStorage.getItem("sidebarFocus");
  document.getElementById("sidebar" + focus).classList.add("sidebar-focus");
}
