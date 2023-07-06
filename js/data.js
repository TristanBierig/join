/**
 *  Downloads the users array from the backend
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

function getRandomColor() {
  let keys = Object.keys(colors);
  let randomIndex = Math.floor(Math.random() * (keys.length - 1));
  return colors[keys[randomIndex]];
}

function checkIfAlreadyExists(user) {
  return user.email === email.value;
}

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
