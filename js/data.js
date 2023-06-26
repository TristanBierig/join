/**
 *  Downloads the users array from the backend
 * 
 */
async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


/**
 * This function takes the input.values of the register form, pushes them in the users array and POSTS it to the backend via setItem()
 * 
 */
async function registerUser() {
    registerBtn.disabled = true;
    users.push({
        'name': username.value,
        'email': email.value,
        'password': password.value
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
}

/**
 * Resets the form inputs once its submitted
 * 
 */
function resetForm() {
    username.value = '';
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}