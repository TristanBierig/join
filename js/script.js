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
 * This function highlights the currently open page in the sidebar navigation
 * 
 */
function toggleSidebarFocus() {
  const pathName = window.location.pathname;
  let id = 'sidebar-' + pathName.replace('/html/', '').replace('.html', '');
  document.getElementById(id).classList.add('sidebar-focus');
}
