document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop form from submitting automatically

    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.innerText = "");

    let isValid = true;

    // 1. Username Validation
    const username = document.getElementById('username').value;
    if (username.length < 5) {
        showError('usernameError', "Username must be at least 5 characters.");
        isValid = false;
    }

    // 2. Password Validation
    const password = document.getElementById('password').value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        showError('passwordError', "Min. 8 chars, 1 uppercase, 1 number.");
        isValid = false;
    }

    // 3. Contact Number Validation
    const contact = document.getElementById('contact').value;
    const contactRegex = /^[0-9]{10}$/;
    if (!contactRegex.test(contact)) {
        showError('contactError', "Enter a valid 10-digit phone number.");
        isValid = false;
    }

    // 4. Email Validation
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('emailError', "Please enter a valid email address.");
        isValid = false;
    }

    // 5. Address Validation
    const address = document.getElementById('address').value;
    if (address.trim().length < 10) {
        showError('addressError', "Please enter a full address (min 10 chars).");
        isValid = false;
    }

    if (isValid) {
        alert("Form submitted successfully!");
        // You can now send data to a server here
    }
});

function showError(id, message) {
    document.getElementById(id).innerText = message;
}