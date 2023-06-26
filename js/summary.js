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