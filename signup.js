document.addEventListener("DOMContentLoaded", () => {
  const signupButton = document.getElementById("signupButton");
  const message = document.getElementById("signupMessage");

  signupButton.addEventListener("click", () => {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    message.style.display = "none";

    if (!name || !email || !password) {
      showMessage("Please fill in all fields.", "red");
      return;
    }

    if (!isValidEmail(email)) {
      showMessage("Please enter a valid email address.", "red");
      return;
    }

    if (password.length < 6) {
      showMessage("Password must be at least 6 characters.", "red");
      return;
    }

    showMessage("✅ Account Created Successfully!", "green");
  });

  function showMessage(text, color) {
    message.innerText = text;
    message.style.color = color;
    message.style.display = "block";
  }

  function isValidEmail(email) {
    const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(email);
  }
});