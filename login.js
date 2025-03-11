 // Simulated valid username and password for demonstration
const validUsername = "user123";
const validPassword = "password123";

// Function to validate the login form
function validateLoginForm(event) {
  // Prevent the form from submitting automatically
  event.preventDefault();

  // Get the username and password from the form
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Get error message and success message elements
  const errorMessage = document.getElementById("errorMessage");
  const successMessage = document.getElementById("successMessage");

  // Reset messages
  errorMessage.style.display = "none";
  successMessage.style.display = "none";

  // Validate username and password
  if (username === "" || password === "") {
    errorMessage.textContent = "Please fill in both username and password.";
    errorMessage.style.display = "block";
    return false;
  }

  // Check for correct username and password
  if (username === validUsername && password === validPassword) {
    successMessage.textContent = "Login successful! Redirecting...";
    successMessage.style.display = "block";
    
    // Redirect to the homepage (or dashboard, etc.)
    setTimeout(function() {
      window.location.href = "home.html"; // Replace with your desired page
    }, 1500); // Redirect after 1.5 seconds

  } else {
    errorMessage.textContent = "Incorrect username or password.";
    errorMessage.style.display = "block";
    return false;
  }
}
