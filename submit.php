<?php
// submit.php

$conn = new mysqli("localhost", "root", "", "fullstack");
if ($conn->connect_error) die("Connection failed");

$user = $_POST['username'];
$pass = password_hash($_POST['password'], PASSWORD_DEFAULT);
$contact = $_POST['contact'];
$email = $_POST['email'];
$address = $_POST['address'];

$stmt = $conn->prepare("INSERT INTO new (username,password,contact,email,address) VALUES (?,?,?,?,?)");
$stmt->bind_param("sssss", $user, $pass, $contact, $email, $address);

$stmt->execute();

header("Location: view.php");
$stmt->close();
$conn->close();
?>