<?php
// edit.php

$conn = new mysqli("localhost", "root", "", "fullstack");

$id = $_GET['id'];
$result = $conn->query("SELECT * FROM new WHERE id=$id");
$row = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head>
<title>Edit User</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<div class="form-container">
<h2>Edit User</h2>

<form action="update.php" method="POST">
<input type="hidden" name="id" value="<?php echo $row['id']; ?>">

<div class="input-group">
<label>Username</label>
<input type="text" name="username" value="<?php echo $row['username']; ?>">
</div>

<div class="input-group">
<label>Contact</label>
<input type="text" name="contact" value="<?php echo $row['contact']; ?>">
</div>

<div class="input-group">
<label>Email</label>
<input type="email" name="email" value="<?php echo $row['email']; ?>">
</div>

<div class="input-group">
<label>Address</label>
<textarea name="address"><?php echo $row['address']; ?></textarea>
</div>

<button type="submit">Update</button>
</form>
</div>

</body>
</html>