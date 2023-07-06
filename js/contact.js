let letters = [];


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
}


/**
 * This function gets the first letter of every Name of the contactlist and filters them in a way so every letter is just saved once.
 * Then the array gets sorted in alphabetical order and gets renderd
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
        contactsList.innerHTML += /*html*/ `
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


function toggleAddContactModal() {
    addContactForm.reset();
    let parent = document.getElementById('addContactModal');
    let child = document.getElementById('addContact');

    parent.classList.toggle('modal-bg-animation');
    child.classList.toggle('modal-animation');
}


function toggleEditContactModal() {
    let parent = document.getElementById('editContactModal');
    let child = document.getElementById('editContact');

    parent.classList.toggle('modal-bg-animation');
    child.classList.toggle('modal-animation');
}


function resetAddContactForm() {
    addContactForm.reset();
}


function addNewContact() {
    let name = contactName.value;
    currentUser.contacts.push({
        'name': name,
        'email': contactEmail.value,
        'phone': contactPhone.value,
        'initials': getInitialsContact(name),
        'color': getRandomColor()
    });
    setItem('users', JSON.stringify(users));
    resetAddContactForm()
    toggleAddContactModal();
    renderContacts();

    let newContact = document.getElementById('contact' + (currentUser.contacts.length - 1));
    showContact((currentUser.contacts.length - 1));
    newContact.scrollIntoView({ behavior: 'smooth' }, true);
    showToast();
}


function deleteContact(i) {
    currentUser.contacts.splice(i, 1);
    setItem('users', JSON.stringify(users));
    toggleEditContactModal();
    currentContact.innerHTML = '';
    renderContacts();
}


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
}


function editContact(i) {
    let contact = currentUser.contacts[i];
    editContactModal.innerHTML = '';
    editContactModal.innerHTML = editContactModalHTML(contact, i);

    contactNameEdit.value = contact.name;
    contactEmailEdit.value = contact.email;
    contactPhoneEdit.value = contact.phone;
    toggleEditContactModal();
}


function saveEditContact(i) {
    let contact = currentUser.contacts[i];
    let name = contactNameEdit.value

    contact.name = contactNameEdit.value;
    contact.email = contactEmailEdit.value;
    contact.phone = contactPhoneEdit.value;
    contact.initials = getInitialsContact(name);

    setItem('users', JSON.stringify(users));
    toggleEditContactModal();
    showContact(i);
}