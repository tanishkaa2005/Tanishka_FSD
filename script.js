document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    document.querySelectorAll('.error').forEach(el => el.innerText = "");

    let isValid = true;

    // ... (Keep your existing validation logic for username, password, etc.) ...

    if (isValid) {
        // This line sends the data to submit.php
        this.submit(); 
    }
});

function showError(id, message) {
    document.getElementById(id).innerText = message;
}