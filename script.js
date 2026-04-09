// script.js

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    document.querySelectorAll('.error').forEach(el => el.innerText = '');

    let isValid = true;

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();
    let contact = document.getElementById("contact").value.trim();
    let email = document.getElementById("email").value.trim();
    let address = document.getElementById("address").value.trim();

    if(username.length < 5){
        showError("usernameError", "Minimum 5 characters");
        isValid = false;
    }

    if(password.length < 8){
        showError("passwordError", "Minimum 8 characters");
        isValid = false;
    }

    if(contact.length != 10){
        showError("contactError", "Enter valid 10-digit number");
        isValid = false;
    }

    if(address === ""){
        showError("addressError", "Address required");
        isValid = false;
    }

    if(isValid){
        this.submit();
    }
});

function showError(id, message){
    document.getElementById(id).innerText = message;
}