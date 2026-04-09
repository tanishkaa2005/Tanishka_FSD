<?php
// update.php

$conn = new mysqli("localhost", "root", "", "fullstack");

$id = $_POST['id'];
$user = $_POST['username'];
$contact = $_POST['contact'];
$email = $_POST['email'];
$address = $_POST['address'];

$stmt = $conn->prepare("UPDATE new SET username=?, contact=?, email=?, address=? WHERE id=?");
$stmt->bind_param("ssssi", $user, $contact, $email, $address, $id);

$stmt->execute();

header("Location: view.php");
$stmt->close();
$conn->close();
?>