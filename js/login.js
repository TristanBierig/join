function login() {
    loginBtn.disabled = true;
    let loginUser = users.findIndex(checkIfUserExists);

    if (loginUser != -1) {
        checkForPassword(loginUser);
    } else {
        console.log('no');
    }
    // resetLoginForm();
}


function checkIfUserExists(user) {
    return user.email === loginEmail.value;
}


function checkForPassword(i) {
    if (users[i].password === loginPw.value) {
        sessionStorage.setItem('currentUser', i);
        window.location.href = "/html/summary.html";
    } else {
        console.log('Bitte überprüfen Sie ihr Passwort');
    }
}


function resetLoginForm() {
    loginEmail.value = '';
    loginPw.value = '';
    loginBtn.disabled = false;
}