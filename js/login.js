let hide = true;

async function initLogin() {
    sessionStorage.clear();
    await loadUsers();
    registerSuccess();
    checkForLogout();
    animateLogo();
}


/**
 * This function checks if the typed in email address is already registered as an user checks the password before logging in the user.
 * 
 */
function login() {
    loginBtn.disabled = true;
    let loginUser = users.findIndex(checkIfUserExists);

    if (loginUser != -1) {
        checkForPassword(loginUser);
    } else {
        console.log('Computer sagt nein!');
    }
    resetLoginForm();
}


/**
 * This function logs you in as the Guest Account to browse through the app without previous registration.
 * 
 */
function guestLogin() {
    sessionStorage.setItem('currentUser', 0);
    window.location = "html/summary.html";
}


/**
 * This Function checks if the current User logged out properly via the logout button or 
 * not. If so, prevents from navigating back into the app via the backwards arrow from the browser.
 * 
 */
function checkForLogout() {
    let logout = sessionStorage.getItem('currentUser');
    if (logout === null) {
        window.history.forward();
    }
}


/**
 * This function checks if the typed in email address is already registered and returns the index of the user within the users Array. 
 * 
 * @param {object} user - This object defines a single user JSON in the users Array.
 * @returns - Returns the object on which the stated test succeeded.
 */
function checkIfUserExists(user) {
    return user.email === loginEmail.value;
}



/**
 * This function compares the typed in password with the saved password from the user and either denies or grants access to the App afterwards.
 * 
 * @param {integer} i - This is the index of the user within the users Array.
 */
function checkForPassword(i) {
    if (users[i].password === loginPw.value) {
        sessionStorage.setItem('currentUser', i);
        window.location = "html/summary.html";
    } else {
        console.log('Bitte überprüfen Sie ihr Passwort');
    }
}


/**
 * This function sets all the values from the LoginForm back and enables the login btn for the next Login action.
 * 
 */
function resetLoginForm() {
    loginEmail.value = '';
    loginPw.value = '';
    loginBtn.disabled = false;
}


/**
 * This function fires when the value of the password Input field is being changed and sets the proper Icon accordingly.
 * 
 */
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


/**
 * This function changes the visibility of the typed in password.
 * 
 */
function togglePasswordVisibility() {
    let input = document.getElementById('loginPw');
    if (input.value != '') {
        hide = !hide;
        onPasswordInput();
        input.focus();
    }
}


/**
 * This function notices if the user is redirected from an succesful register process and displays a info message.
 * 
 */
function registerSuccess() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    let url = window.location.href;
    if (msg && url.includes("index.html")) {
        registerSuccessBox.innerHTML = msg;
        registerSuccessBox.classList.toggle('animate-register');
    }
}


function resetPassword() {
    let email = users.find(checkIfUserExists)
    if (email) {
        document.getElementById('resetForm').submit();
    } else {
        console.log('Diese Email Adresse existiert nicht');
    }
}



async function getResetUser() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    let i = users.findIndex(e => e.email === msg);

    if (i && newPw.value === confirmPw.value) {
        users[i].password = newPw.value;
        await setItem('users', JSON.stringify(users));
    } else {

    }
}


/**
 * This function animates the logo in the beginning of the login screen.
 * First Timeout adds the classes needed for the animation to run.
 * Second Timeout sets the background to a negative z-index to not interfer with the layout.
 * 
 */
function animateLogo() {
        setTimeout(() => {
            openImgContainer.classList.add('logo-animation-bg');
            openImg.classList.add('logo-animation');
        }, 425);

        setTimeout(() => {
            openImgContainer.classList.add('negative-z')
        }, 850);   
}