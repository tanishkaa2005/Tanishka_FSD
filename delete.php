<?php
// delete.php

$conn = new mysqli("localhost", "root", "", "fullstack");

$id = $_GET['id'];

$stmt = $conn->prepare("DELETE FROM new WHERE id=?");
$stmt->bind_param("i", $id);

$stmt->execute();

header("Location: view.php");
$stmt->close();
$conn->close();
?>