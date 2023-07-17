let letters = [];

/**
 * This function is the first on executed on the html document. First, all user data is loaded from the backend, html templates are implemented and the current logged in User is set from the session storage.
 * Then its checked if an endpoint within the app is accessed directly without login. If so, the user is redirected to the login page and prevented to navigate back into the app.
 * After that the profile picture is set, all contacts are getting renderd and the sidebar focus gets set.
 * 
 * @returns - Stops the further execution of the function if a bypass is recognized.
 */
async function initContacts() {
    await loadUsers();
    await includeHTML();
    setCurrentUser();
    if (checkForBypass()) {
        window.location.href = '../index.html';
        return
    }
    loadProfilePicture();
    renderContacts();
    toggleSidebarFocus();
}


/**
 * This function gets the first letter of every Name of the contactlist and filters them in a way so every letter is just saved once.
 * Then the array gets sorted in alphabetical order and gets renderd as a dividing/ sorting design
 * 
 */
function renderContacts() {
    letters = [];
    for (let i = 0; i < currentUser.contacts.length; i++) {
        const element = currentUser.contacts[i];
        let singleLetter = element.name.charAt(0);
        if (!letters.includes(singleLetter)) {
            letters.push(singleLetter);
        }
    }
    letters.sort();
    contactsList.innerHTML = '';
    for (let j = 0; j < letters.length; j++) {
        const element = letters[j];
        contactsList.innerHTML +=  `
            <div id="contact${element}" class="contact-wrapper">
                <span class="seperator-list">${element}</span>
                <div class="line-list"></div>
            </div>
      `;
    }

    for (let k = 0; k < currentUser.contacts.length; k++) {
        const element = currentUser.contacts[k];
        let firstLetter = element.name.charAt(0);
        document.getElementById('contact' + firstLetter).innerHTML += contactListItem(element, k);
    }
}


/**
 * This function takes the name of a contact and returns the first letters of the both or just the on name
 * 
 * @param {string} name - This string is the value of the given contact name where the initials should be processed
 * @returns - Returns the Initials of the given Name
 */
function getInitialsContact(name) {
    let first = name.charAt(0);
    let secondIndex = name.indexOf(' ');
    if (secondIndex != -1) {
        let second = name.charAt(secondIndex + 1);
        return first.toUpperCase() + second.toUpperCase();
    } else {
        return first.toUpperCase();
    }
}


/**
 * This function toggles the animation and visibility of the Modal to add a new contact
 * 
 */
function toggleAddContactModal() {
    addContactForm.reset();
    let parent = document.getElementById('addContactModal');
    let child = document.getElementById('addContact');

    parent.classList.toggle('modal-bg-animation');
    child.classList.toggle('modal-animation');
}


/**
 * This function toggles the animation and visibility of the Modal to edit an existing contact
 * 
 */
function toggleEditContactModal() {
    let parent = document.getElementById('editContactModal');
    let child = document.getElementById('editContact');

    parent.classList.toggle('modal-bg-animation');
    child.classList.toggle('modal-animation');
}


/**
 * This function takes the values from the add contact Form and some extra data for colors and initials in the Modal and creating a new object.
 * Then all contacts are rendered again an the new contact is highlighted, scrolled into view and a generic toast confirms the added contact.
 * 
 */
function addNewContact() {
    let name = contactName.value;
    name = capitalizeFirstLetter(name);
    currentUser.contacts.push({
        'name': name,
        'email': contactEmail.value,
        'phone': contactPhone.value,
        'initials': getInitialsContact(name),
        'color': getRandomColor()
    });
    setItem('users', JSON.stringify(users));
    addContactForm.reset();
    toggleAddContactModal();
    renderContacts();

    let newContact = document.getElementById('contact' + (currentUser.contacts.length - 1));
    showContact((currentUser.contacts.length - 1));
    if (window.innerWidth > 1100) {
        newContact.scrollIntoView({ behavior: 'smooth' }, true);
    }
    showToast();
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


/**
 * This function deletes the data of a certain contact from the current logged in user object, safes it to the backend and renders again all the contacts.
 * 
 * @param {integer} i - This should be te index of the deleting contact in the contact array within the currentUser object.
 */
async function deleteContact(i) {
    currentUser.contacts.splice(i, 1);
    await setItem('users', JSON.stringify(users));
    toggleEditContactModal();
    currentContact.innerHTML = '';
    renderContacts();
}


/**
 * This function deletes the data of a certain contact from the current logged in user object, safes it to the backend and renders again all the contacts.
 * 
 * @param {integer} i - This should be te index of the deleting contact in the contact array within the currentUser object.
 */
async function deleteContactMobile(i) {
    currentUser.contacts.splice(i, 1);
    await setItem('users', JSON.stringify(users));
    window.location.reload();
}


/**
 * This function renders the clicked contact from the contactslist into the container on the right respectively in modal on mobile layout and highlights the user in the list.
 * 
 * @param {integer} i - This should be the index of the clicked contact.
 */
function showContact(i) {
    let contact = currentUser.contacts[i];
    let focus = document.getElementById('contact' + i);
    currentContact.innerHTML = '';
    currentContact.innerHTML = currentContactHTML(contact, i);

    for (let j = 0; j < currentUser.contacts.length; j++) {
        const element = document.getElementById('contact' + j);
        element.classList.remove('contact-container-focus');
    }

    focus.classList.add('contact-container-focus');
    currentContact.classList.add('current-contact-animation');
    contactsBackImg.classList.remove('d-none');
}


/**
 * This function opens the modal to edit a given contact and sets the input values to the data from the contact to be edited.
 * 
 * @param {integer} i - This should be the index o the edited contact
 */
function editContact(i) {
    let contact = currentUser.contacts[i];
    editContactModal.innerHTML = '';
    editContactModal.innerHTML = editContactModalHTML(contact, i);

    contactNameEdit.value = contact.name;
    contactEmailEdit.value = contact.email;
    contactPhoneEdit.value = contact.phone;
    toggleEditContactModal();
}



/**
 * This function saves the data from the inputs to the given contact object and uploads new data to the backend, closing the modal and shows the current contact 
 * 
 * @param {integer} i - This should be the index of the edit contact
 */
async function saveEditContact(i) {
    let contact = currentUser.contacts[i];
    let name = contactNameEdit.value

    contact.name = contactNameEdit.value;
    contact.email = contactEmailEdit.value;
    contact.phone = contactPhoneEdit.value;
    contact.initials = getInitialsContact(name);

    await setItem('users', JSON.stringify(users));
    toggleEditContactModal();
    renderContacts();
    showContact(i);
}