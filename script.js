// Variables for form switching
const formTitle = document.getElementById('form-title');
const authForm = document.getElementById('auth-form');
const submitBtn = document.getElementById('submit-btn');
const switchFormText = document.getElementById('switch-form');
const errorMessage = document.getElementById('error-message');

let isLoginMode = false; // to track whether the user is on the login or register form

// Event listener for form submission
authForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (isLoginMode) {
        loginUser(username, password);
    } else {
        registerUser(username, password);
    }
});

// Switch between Login and Register
document.getElementById('switch-to-login').addEventListener('click', function () {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        formTitle.textContent = 'Login';
        submitBtn.textContent = 'Login';
        switchFormText.innerHTML = 'Don\'t have an account? <a href="#" id="switch-to-login">Register here</a>';
    } else {
        formTitle.textContent = 'Register';
        submitBtn.textContent = 'Register';
        switchFormText.innerHTML = 'Already have an account? <a href="#" id="switch-to-login">Login here</a>';
    }
});

// Register a new user
function registerUser(username, password) {
    if (localStorage.getItem(username)) {
        errorMessage.textContent = 'Username already exists.';
    } else {
        localStorage.setItem(username, password);
        errorMessage.textContent = 'Registration successful! Please login.';
        isLoginMode = true; // Switch to login mode after successful registration
        formTitle.textContent = 'Login';
        submitBtn.textContent = 'Login';
        switchFormText.innerHTML = 'Don\'t have an account? <a href="#">Register here</a>';
    }
}

// Log in a user
function loginUser(username, password) {
    const storedPassword = localStorage.getItem(username);
    if (storedPassword && storedPassword === password) {
        errorMessage.textContent = '';
        window.location.href = 'secured.html'; // Redirect to secured page
    } else {
        errorMessage.textContent = 'Invalid username or password.';
    }
}
