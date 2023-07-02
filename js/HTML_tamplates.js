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
    <div class="input">
      <input
        placeholder="new Category"
        id="subtask-input"
        type="text"
      />
      <div>
      <img
        onclick="clearInput('subtask-input')"
        class="subtask-img"
        src="../assets/img/icons/cancel-icon.svg"
        alt=""
      />
      <div class="seperator"></div>
      <img
        onclick="addNewCategory()"
        class="subtask-img"
        src="../assets/img/icons/checkmark-icon-black.svg"
        alt=""
      />
      </div>
    </div>
    <div id="color-picker-box"></div>
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
      <span id="selected-category">${category}</span>
      <div class="color-picker-color" style="background-color: #${color}"></div>
    
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
    <div>${subtask.name}</div>
  `;
}
