// API Base URL
const API_BASE = 'http://localhost:8000';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const switchButton = document.getElementById('switchMode');
const messageDiv = document.getElementById('message');

let isLoginMode = true;

// Switch between login and register forms
switchButton.addEventListener('click', () => {
    if (isLoginMode) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        switchButton.textContent = 'Switch to Login';
        isLoginMode = false;
    } else {
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        switchButton.textContent = 'Switch to Register';
        isLoginMode = true;
    }
    clearMessage();
});

// API call function
async function callAPI(endpoint, method, data = null) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : null
        });
        
        const result = await response.json();
        return { success: response.ok, data: result, status: response.status };
    } catch (error) {
        return { success: false, error: error.message, status: 0 };
    }
}

// Show message to user
function showMessage(message, type = 'info') {
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
}

// Clear message
function clearMessage() {
    messageDiv.style.display = 'none';
    messageDiv.className = 'message';
}

// Handle login form submission
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    

    /*
    Assignment:
    Implement the login functionality inside this event handler. We have to link the login form to the backend API for user authentication.

    Requirements:
    - Use the already provided `callAPI` function to send a POST request to the `/login` endpoint with the username and password.
    - Use the `showMessage` function to display feedback to the user depending on what is received from mthe backend.

    Hints:
    - `callAPI` returns an object with `success`, `data`, and `status` properties.
    - To access error details from the API response, use `result.data?.detail`.
    */
});

// Handle register form submission
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    if (!username || !email || !password) {
        showMessage('Please fill in all fields', 'error');
        return;
    }
    
    const result = await callAPI('/register', 'POST', { username, email, password });
    
    if (result.success) {
        showMessage('Registration successful! You can now login.', 'success');
        registerForm.reset();
        // Auto-switch to login form
        setTimeout(() => {
            switchButton.click();
        }, 2000);
    } else {
        showMessage(result.data?.detail || 'Registration failed', 'error');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    clearMessage();
});