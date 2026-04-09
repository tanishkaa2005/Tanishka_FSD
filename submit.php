<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "fullstack";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get data from form
    $user = $_POST['username'];
    $pass = password_hash($_POST['password'], PASSWORD_DEFAULT); // Secure hashing
    $contact = $_POST['contact'];
    $email = $_POST['email'];
    $address = $_POST['address'];

    // SQL Query
    $sql = "INSERT INTO new (username, password, contact, email, address) 
            VALUES ('$user', '$pass', '$contact', '$email', '$address')";

    if ($conn->query($sql) === TRUE) {
        echo "<h1>Registration successful!</h1>";
        echo "<a href='index.html'>Go Back</a>";
    } else {
        echo "Error: " . $conn->error;
    }
}
$conn->close();
?>