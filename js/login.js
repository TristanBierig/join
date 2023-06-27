let hide = true;

function login() {
    loginBtn.disabled = true;
    let loginUser = users.findIndex(checkIfUserExists);

    if (loginUser != -1) {
        checkForPassword(loginUser);
    } else {
        console.log('Computer sagt nein!');
    }
    // resetLoginForm();
}


function checkIfUserExists(user) {
    return user.email === loginEmail.value;
}


function checkForPassword(i) {
    if (users[i].password === loginPw.value) {
        sessionStorage.setItem('currentUser', i);
        window.location = "html/summary.html";
    } else {
        console.log('Bitte überprüfen Sie ihr Passwort');
    }
}


function resetLoginForm() {
    loginEmail.value = '';
    loginPw.value = '';
    loginBtn.disabled = false;
}


function onPasswordInput() {
    let input = document.getElementById('loginPw');
    let img = document.getElementById('loginPwImg');

    if (input.value != '' && hide) {
        img.src = './assets/img/icons/login-password-hidden.svg';
        input.type = 'password';
    } else if (input.value != '' && !hide) {
        img.src = './assets/img/icons/login-password-show.svg';
        input.type = 'text';
    } else {
        img.src = './assets/img/icons/login-password.svg';
    }
}


function togglePasswordVisibility() {
    let input = document.getElementById('loginPw');
    if (input.value != '') {
        hide = !hide;
        onPasswordInput();
        input.focus();
    }
}