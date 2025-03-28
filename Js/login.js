const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Password Visibility
var a = 0;  // Initialize a to track the password visibility state

function passWord() {
  var passwordField = document.getElementById('password');
  var eyeIcon = document.getElementById('eye-icon');
  
  if (a == 1) {
    passwordField.type = "password";  // Hide the password
    eyeIcon.classList.remove("fa-eye");  // Remove the eye-slash icon
    eyeIcon.classList.add("fa-eye-slash");  // Add the eye icon to show password
    a = 0;
  } else {
    passwordField.type = "text";  // Show the password
    eyeIcon.classList.remove("fa-eye-slash");  // Remove the eye icon
    eyeIcon.classList.add("fa-eye");  // Add the eye-slash icon to hide password
    a = 1;
  }
}

var ab = 0;  // Initialize a to track the password visibility state

function passWord2() {
  var passwordField2 = document.getElementById('password2');
  var eyeIcon = document.getElementById('eye-icon');
  
  if (ab == 1) {
    passwordField2.type = "password";  // Hide the password
    eyeIcon.classList.remove("fa-eye");  // Remove the eye-slash icon
    eyeIcon.classList.add("fa-eye-slash");  // Add the eye icon to show password
    ab = 0;
  } else {
    passwordField2.type = "text";  // Show the password
    eyeIcon.classList.remove("fa-eye-slash");  // Remove the eye icon
    eyeIcon.classList.add("fa-eye");  // Add the eye-slash icon to hide password
    ab = 1;
  }
}