/**
 * This function changes the greeting depending on the time of day.
 *
 */
function greet() {
  let currentTime = new Date();
  let currentHour = currentTime.getHours();
  let greetingElement = document.getElementById("greetings");

  if (currentHour < 12) {
    greetingElement.textContent = "Good morning, ";
  } else if (currentHour < 18) {
    greetingElement.textContent = "Good afternoon, ";
  } else {
    greetingElement.textContent = "Good evening, ";
  }
}
greet();

/**
 * This function selects the name of the current user. Alternatively it uses "Guest".
 *
 */
function updateUserName() {
  let userName = document.getElementById("user-name");
  let currentUser = setCurrentUser();

  if (currentUser) {
    userName.textContent = currentUser;
  } else {
    userName.textContent = "Guest";
  }
}
updateUserName();