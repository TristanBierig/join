function getTaskCategotryHTML() {
  return /*html*/ `
  <div>
    <span>Select task category</span>
    <img
      class="open-arrow"
      src="../assets/img/icons/open-select-arrow.svg"
      alt="arrow-down"
    />
  </div>   
  `;
}

function getNewCategoryHTML() {
  return /*html*/ `
    <div onclick="createNewCategory()">New category</div>
  `;
}

function getCategoryHTML(category) {
  return /*html*/ `
    <div onclick="doNotClose(event), selectCategory('${category.name}', '${category.color}')">
      <div>
        <span>${category.name}</span>
        <div class="color-picker-color" style="background-color: #${category.color}"></div>
      </div>
    </div>
  `;
}

function getCreateNewCategoryHTML() {
  return /*html*/ `
      <input
        placeholder="New category name"
        id="category-input"
        type="text"
      />
      <div class="add-category-img-box">
      <img
        onclick="clearInput('subtask-input')"
        class="subtask-img"
        src="../assets/img/icons/cancel-icon.svg"
        alt=""
      />
      <div class="seperator-small"></div>
      <img
        onclick="addNewCategory()"
        class="subtask-img"
        src="../assets/img/icons/checkmark-icon-black.svg"
        alt=""
      />
      </div>
  
  `;
}

function getColorHTML(color, index) {
  return /*html*/ `
     <div id="color${index}" onclick="selectColor('${color}', 'color${index}')" class="color-picker-color" style="background-color: #${color}"></div>
  `;
}

function getSelectedCategoryHTML(category, color) {
  return /*html*/ `
    <div>
      <div>
        <span id="selected-category">${category}</span>
        <div class="color-picker-color" style="background-color: #${color}"></div>
      </div>

      <img
                class="open-arrow"
                src="../assets/img/icons/open-select-arrow.svg"
                alt="arrow-down"
              />
    </div> 
  `;
}

function getAssignUsersHTML(user) {
  return /*html*/ `
    <label onclick="doNotClose(event)" class="">
      ${user.name}
      <input name="" type="checkbox" />
    </label>
  `;
}

function getSubtaskHTML(subtask) {
  return /*html*/ `
    <label onchange="updateSubtask()"><input  type="checkbox"> ${subtask.name}</label>
  `;
}
