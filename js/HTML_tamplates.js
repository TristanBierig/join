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

function getAssignUsersCheckedHTML(user) {
  return /*html*/ `
    <label onclick="doNotClose(event)" class="">
      ${user.name}
      <input checked name="" type="checkbox" />
    </label>
  `;
}

function getSubtaskHTML(subtask, functionName, taskID, index) {
  return /*html*/ `
    <label onchange="${functionName}(${taskID}, ${index})"><input id="overlayCheckbox${index}" type="checkbox"> ${subtask.name}</label>
  `;
}

function getSubtaskCheckedHTML(subtask, functionName, taskID, index) {
  return /*html*/ `
    <label onchange="${functionName}(${taskID}, ${index})"><input id="overlayCheckbox${index}" checked  type="checkbox"> ${subtask.name}</label>
  `;
}

function currentContactHTML(contact, i) {
  return `
  <div>
        <div class="img-wrapper" style="background-color: ${contact.color}">
            ${contact.initials} 
        </div>
    <div>
      <h3>${contact.name}</h3>
      <span  onclick="openAddTaskOverlay()">
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
    <span onclick="editContact(${i})">
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

  <div class="mobile-addons">
        <div class="mobile-contact-btn-container">
          <button onclick="deleteContactMobile(${i})" class="button-secondary-with-icon">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_68380_3548" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="32"
                height="32">
                <rect width="32" height="32" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_68380_3548)">
                <path
                  d="M9.33203 28C8.5987 28 7.97092 27.7389 7.4487 27.2167C6.92648 26.6944 6.66536 26.0667 6.66536 25.3333V8H5.33203V5.33333H11.9987V4H19.9987V5.33333H26.6654V8H25.332V25.3333C25.332 26.0667 25.0709 26.6944 24.5487 27.2167C24.0265 27.7389 23.3987 28 22.6654 28H9.33203ZM22.6654 8H9.33203V25.3333H22.6654V8ZM11.9987 22.6667H14.6654V10.6667H11.9987V22.6667ZM17.332 22.6667H19.9987V10.6667H17.332V22.6667Z"
                  fill="#2A3647" />
              </g>
            </svg>
          </button>

          <button onclick="editContact(${i})" class="button-with-icon">
            <svg width="21" height="30" viewBox="0 0 21 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.87121 22.0156L7.69054 24.9405L20.3337 4.10842C20.6203 3.63628 20.4698 3.02125 19.9977 2.73471L16.8881 0.847482C16.4159 0.56094 15.8009 0.711391 15.5144 1.18353L2.87121 22.0156Z"
                fill="white" />
              <path d="M2.28614 22.9794L7.10547 25.9043L2.37685 28.1892L2.28614 22.9794Z" fill="white" />
            </svg>
          </button>
        </div>
      </div>
  `;
}

function editContactModalHTML(contact, i) {
  return `
  <div onclick="doNotClose(event)" id="editContact" class="modal-inner-container">
  <div class="left-frame-add">
    <img src="../assets/img/logos/logo_Light.png" alt="Join logo">
    <div class="contact-info">
      <h1>Edit contact</h1>
      <h2></h2>
    </div>
  </div>

  <div class="right-frame-add">
    <img onclick="toggleEditContactModal()" class="cancel-btn" src="../assets/img/icons/cancel-icon.svg" alt="">

    <div class="img-wrapper" style="background-color: ${contact.color}">
      ${contact.initials} 
    </div>

    <form class="user-form" id="editContactForm" onreset="deleteContact(${i})" onsubmit="saveEditContact(${i}); return false;">
      <div class="input-wrapper">
        <input id="contactNameEdit" required type="text" placeholder="Name">
        <img src="../assets/img/icons/user-icon.svg" alt="">
      </div>
      <div class="input-wrapper">
        <input id="contactEmailEdit" required type="email" placeholder="Email">
        <img src="../assets/img/icons/login-email.svg" alt="">
      </div>
      <div class="input-wrapper">
        <input id="contactPhoneEdit" required type="tel" placeholder="Phone">
        <img src="../assets/img/icons/telephone.svg" alt="">
      </div>

      <div class="button-wrapper">
        <button type="reset" class="button-secondary-with-icon">
          Delete
          <img src="../assets/img/icons/cancel-icon.svg" alt="">
        </button>
        <button class="button-with-icon">
          Save
          <img src="../assets/img/icons/checkmark-icon.svg" alt="">
        </button>
      </div>
    </form>
  </div>
</div>
`;
}

function contactListItem(element, k) {
  return `
    
  <div class="contact-container" id="contact${k}" onclick="showContact(${k})">
  <div class="contact-avatar" style="background-color: ${element.color}">
      <span>${element.initials}</span>
  </div>
  <div class="contactlist-data">
      <span class="contact-name">${element.name}</span>
      <span class="contact-email">${element.email}</span>
  </div>
</div>
  `;
}

function getTodoHTML(todo) {
  return /*html*/ `
    <div onclick="openTask(${todo.id})" class="task" draggable="true" ondragstart="startDragging(${todo.id})">
      <span style="background-color: #${todo.categoryColor}" class="task-category">${todo.category}</span>
      <div class="task-title-description-box">
        <b>${todo.title}</b>
        <p>${todo.description}</p>
      </div>
      <div id="subtask-box${todo.id}" class="subtask-box">
      </div>
      <div class="assign-and-prio-box">
        <div class="assigned-to-overview-box" id="overview-assigned-to-box${todo.id}"></div>
        <div class="task-prio-box">
          <img src="../assets/img/icons/low-prio-icon-small.svg" alt="">
        </div>        
      </div>
      </div>
    </div>
  `;
}

function getTaskAssignedUsersHTML(user) {
  return /*html*/ `
     <span style="background-color: ${user.image.color}" class="assigned-to-display">${user.image.initials}</span>
  `;
}

function getProgressBarHTML(subtasks, subtaskPercent, completedSubtasks) {
  return /*html*/ `
    <div class="progress-bar-box">
    <div style="width: ${subtaskPercent}%;" class="progress-bar-bar"></div>
    </div>
    <div class="subtask-text-box">
    <span>${completedSubtasks}/${subtasks.length}</span> 
    <span>Done</span>
    </div>
  `;
}

function getAssignedUsersHTML(task) {
  return /*html*/ `
      <div>
        <div style="background-color: ${task.image.color};" class="assigned-to-display-maximized">${task.image.initials}</div>
        <span>${task.name}</span>
      </div>
  `;
}

function getEditUserHTML(task) {
  return /*html*/ `
    <div style="background-color: ${task.image.color};" class="assigned-to-display-maximized">${task.image.initials}</div>
`;
}

function getOverlayHTML(task) {
  return /*html*/ `
    <span style="background-color: #${task.categoryColor}" class="overlay-category">${task.category}</span>
    <b class="overlay-headline">${task.title}</b>
    <p>${task.description}</p>
    <div class="overlay-due-date">
      <b>Due date:</b>
      <span>${task.dueDate}</span>
    </div>
    <div class="overlay-prio">
      <b>Priority:</b>
      <div>${task.prio}</div>
    </div>
    <b>Assigned To:</b>
    <div id="assigned-to-box"></div>
    <div id="subtaskBoxWrapper" class="add-task-overlay-input-box d-none">
      <b>Subtasks</b>
      <div id="subtask-box-overlay"></div>
    </div>
    <img onclick="closeOverlay('task-overlay')" class="overlay-close-button" src="../assets/img/icons/x-icon.svg" alt="X">
    <div class="overlayy-delete-edit-box">
      <div onclick="deleteTask(${task.id})" class="overlay-delete-box"><img src="../assets/img/icons/trash-bin.svg" alt=""></div>
      <div onclick="editTask(${task.id})" class="overlay-edit-box"><img src="../assets/img/icons/bord-overlay-edit-pencil.svg" alt=""></div>
    </div>
  `;
}

function getOverlayBackgroundHTML() {
  return /*html*/ `
    <div onclick="animateAddTaskOverlayClosing()" id="add-task-overlay-background">TEST</div>
  `;
}

function getAddTaskOverlayContentHTML() {
  return /*html*/ `
    <div class="add-task-overlay-content" id="add-task-overlay-content" onclick="doNotClose(event)" w3-include-html="../assets/templates/task_Form_Overlay.html"></div>
  `;
}

function getEditTaskHTML(task) {
  return /*html*/ `
    <form onsubmit="saveEditedTask(${task.id}); return false" class="add-task-form edit-form">
    <div class="add-task-overlay-input-box">
      <label for="title">Title</label>
      <input
        placeholder="Enter a title"
        name="title"
        required
        id="title"
        type="text"
        value="${task.title}"
      />
    </div>
    <div class="add-task-overlay-input-box">
      <label for="description">Description</label>
      <textarea
        placeholder="Enter a Description"
        id="description"
        cols="30"
        rows="10"
      >${task.description}</textarea>
    </div>
    <div class="add-task-overlay-input-box">
      <label for="due-date">Due date</label>
      <input
        required
        onclick="setMinDate()"
        type="date"
        name="due-date"
        id="due-date"
        value="${task.dueDate}"
      />
    </div>
    <div class="add-task-overlay-input-box">
      <span>Prio</span>
      <div id="prio-box">
        <div id="high-prio-box" onclick="setPrio('high')">
          <span>Urgent</span>
          <img
            src="..//assets/img/icons/high-prio-icon-small.svg"
            alt="high-prio"
          />
        </div>
        <div id="medium-prio-box" onclick="setPrio('medium')">
          <span>Medium</span>
          <img
            src="..//assets/img/icons/medium-prio-icon-small.svg"
            alt="medium-prio"
          />
        </div>
        <div id="low-prio-box" onclick="setPrio('low')">
          <span>Low</span>
          <img
            src="..//assets/img/icons/low-prio-icon-small.svg"
            alt="low-prio"
          />
        </div>
      </div>
    </div>
    <div class="add-task-overlay-input-box">
      <span class="label">Assigned to</span>
      <div onclick="toggleUserPicker()" id="assigned-to">
        <div>
          <span>Select contacts to assign</span>
          <img
            class="open-arrow"
            src="../assets/img/icons/open-select-arrow.svg"
            alt="arrow-down"
          />
        </div>
      </div>
    </div>
    <div id="edit-assigned-users-box"></div>
    <button class="button-with-icon edit-submit-button">
      <span>Ok</span>
      <img  src="../assets/img/icons/checkmark-icon.svg" alt="">
    </button>
    <img onclick="closeOverlay('task-overlay')" class="overlay-close-button" src="../assets/img/icons/cancel-icon.svg" alt="">
  </form>
  `;
}
