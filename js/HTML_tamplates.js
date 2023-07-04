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
    <div>${subtask.name}</div>
  `;
}


function currentContactHTML(contact) {
  return `
  <div>
        <div class="img-wrapper" style="background-color: ${contact.color}">
            ${contact.initials} 
        </div>
    <div>
      <h3>${contact.name}</h3>
      <span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Capa 1">
            <g id="Group 11">
              <path id="Vector 13" d="M9 1.5V16.5" stroke="#2A3647" stroke-width="2" stroke-linecap="round" />
              <path id="Vector 14" d="M16.5 9.1416L1.5 9.1416" stroke="#2A3647" stroke-width="2"
                stroke-linecap="round" />
            </g>
          </g>
        </svg>
        Add Task
      </span>
    </div>
  </div>
  <div>
    <span>Contact Information</span>
    <span>
      <svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.87121 22.0156L7.69054 24.9405L20.3337 4.10842C20.6203 3.63628 20.4698 3.02125 19.9977 2.73471L16.8881 0.847482C16.4159 0.56094 15.8009 0.711391 15.5144 1.18353L2.87121 22.0156Z"
          fill="#2A3647" />
        <path d="M2.28614 22.9794L7.10547 25.9043L2.37685 28.1892L2.28614 22.9794Z" fill="#2A3647" />
      </svg>
      Edit Contact
    </span>
  </div>
  <div>
    <div class="bold">Email</div>
    <a href="mailto:${contact.email}">${contact.email}</a>
  </div>
  <div>
    <div class="bold">Phone</div>
    <a href="tel:${contact.phone}">${contact.phone}</a>
  </div>

  `;
}
