async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


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


function resetForm() {
    username.value = '';
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}