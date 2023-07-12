/**
 *  Downloads the users array from the backend.
 *
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

async function loadTasks() {
  try {
    tasks = JSON.parse(await getItem("tasks"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * This function takes the input.values of the register form, generates values for other trivial data, pushes them in the users array and POSTS it to the backend via setItem()
 *
 */
async function registerUser() {
  registerBtn.disabled = true;
  let registerCheck = users.findIndex(checkIfAlreadyExists);
  if (registerCheck === -1) {
    setNewUser();
    await setItem("users", JSON.stringify(users));
    resetForm();
    window.location.href =
      "index.html?msg=Registrierung erfolgreich abgeschlossen. Du kannst dich jetzt mit deinen Anmeldedaten einloggen!";
  } else {
    errorTagEmail.classList.remove('d-none');
  }
  registerBtn.disabled = false;
}


/**
 * This function pushes the new user dataobject into the users Array.
 * 
 */
function setNewUser() {
  users.push({
    name: username.value.trim(),
    email: email.value.trim(),
    password: loginPw.value,
    contacts: [],
    image: {
      initials: getInitials(),
      color: getRandomColor(),
      src: "",
    },
  });
}


/**
 * This function gets the first letter of both names of a user und safes the uppercase Initials in the user object. If user just entered one name, also just one letter is saved.
 * 
 * @returns - Returns the Initials back to the user object to be saved.
 */
function getInitials() {
  let name = username.value.trim();
  let first = name.charAt(0);
  let secondIndex = name.indexOf(" ");
  if (secondIndex != -1) {
    let second = name.charAt(secondIndex + 1);
    return first.toUpperCase() + second.toUpperCase();
  } else {
    return first.toUpperCase();
  }
}


/**
 * This function picks a random color from a pre defined color object and uses it as an background color for the user icon.
 * 
 * @returns - Returns the hex color code from the colors object.
 */
function getRandomColor() {
  let keys = Object.keys(colors);
  let randomIndex = Math.floor(Math.random() * (keys.length - 1));
  return colors[keys[randomIndex]];
}


/**
 * This function checks if a user is already registered by comparing the given email with the user array.
 * 
 * @param {object} user - The object of a single User. 
 * @returns - Returns the email of an user only if the given email matches an email from an already existing user.
 */
function checkIfAlreadyExists(user) {
  return user.email === email.value;
}


/**
 * This function is similar to the `checkIfAlreadyExists`, but it checks for an existing user in the login form and not at the registration.
 * 
 * @param {object} user - This is the object of a given user.
 * @returns - Returns the email of an user only if the given email matches an email from an already existing user.
 */
function checkIfUserExists(user) {
  return user.email === loginEmail.value;
}

/**
 * Resets the form inputs once its submitted
 *
 */
function resetForm() {
  username.value = "";
  email.value = "";
  loginPw.value = "";
  registerBtn.disabled = false;
}

const colors = {
  blue: "#008ddc",
  orange: "#ff7827",
  purple: "#a900f8",
  darkpurple: "#502787",
  pink: "#ff63fa",
  green: "#00d345",
  red: "#bb051d",
  yellow: "#ffc938",
};
