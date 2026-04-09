<?php
// view.php

$conn = new mysqli("localhost", "root", "", "fullstack");
$result = $conn->query("SELECT * FROM new");
?>

<!DOCTYPE html>
<html>
<head>
<title>View Users</title>
<link rel="stylesheet" href="style.css">
</head>
<body>

<div class="form-container" style="width:900px;">
<h2>Registered Users</h2>

<table>
<tr>
<th>ID</th>
<th>Username</th>
<th>Contact</th>
<th>Email</th>
<th>Address</th>
<th>Action</th>
</tr>

<?php while($row = $result->fetch_assoc()) { ?>
<tr>
<td><?php echo $row['id']; ?></td>
<td><?php echo $row['username']; ?></td>
<td><?php echo $row['contact']; ?></td>
<td><?php echo $row['email']; ?></td>
<td><?php echo $row['address']; ?></td>
<td>
<a href="edit.php?id=<?php echo $row['id']; ?>">Edit</a> |
<a href="delete.php?id=<?php echo $row['id']; ?>">Delete</a>
</td>
</tr>
<?php } ?>

</table>
</div>

</body>
</html>