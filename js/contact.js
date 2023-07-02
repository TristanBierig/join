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
          <span class="seperator-list">${element}</span>
          <div class="line-list"></div>
          <div id="contact${element}" class="contact-wrapper"></div>
      `;
    }

    for (let k = 0; k < currentUser.contacts.length; k++) {
        const element = currentUser.contacts[k];
        let firstLetter = element.name.charAt(0);
        document.getElementById('contact' + firstLetter).innerHTML += /*html*/ `
            <div>
                <div>
        
                </div>
                <div>
                    <span>${element.name}</span>
                    <span>${element.email}</span>
                </div>
            </div>
        `;
    }
}


function toggleContactModal() {
    addContactModal.classList.toggle('d-none');
    addContactForm.reset();
}


function addNewContact() {
    currentUser.contacts.push({
        'name': contactName.value,
        'email': contactEmail.value,
        'phone': contactPhone.value
    });
    setItem('users', JSON.stringify(users));
    addContactForm.reset();
    toggleContactModal();
}