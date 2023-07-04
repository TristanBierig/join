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


function renderContacts() {
    for (let i = 0; i < currentUser.contacts.length; i++) {
        const element = currentUser.contacts[i];
        let singleLetter = element.name.charAt(0);
        if (!letters.includes(singleLetter)) {
            letters.push(singleLetter);
        }
    }

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
        document.getElementById('contact' + firstLetter).innerHTML += /*html*/ `
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


function toggleContactModal() {
    addContactModal.classList.toggle('d-none');
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
    addContactForm.reset();
    toggleContactModal();
    renderContacts();
}


function showContact(i) {
    let contact = currentUser.contacts[i];
    let focus = document.getElementById('contact' + i);
    currentContact.innerHTML = '';
    currentContact.innerHTML = currentContactHTML(contact);

    for (let j = 0; j < currentUser.contacts.length; j++) {
        const element = document.getElementById('contact' + j);
        element.classList.remove('contact-container-focus');
    }
    focus.classList.add('contact-container-focus');
}