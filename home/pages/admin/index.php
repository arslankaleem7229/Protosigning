<?php
$cookie_name = "dishsatinfo";
$cookie_value = "1234567890";

if(isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    if($username == "dishsatinfo" && $password == "pakistan1234") {
        include_once("../../include/config.php");
        setcookie($cookie_name, $cookie_value, time() + (86400 * 30 * 30), "/"); // 86400 = 1 day      
        header("Location: " . $root . "/pages/admin/index.php");  
    }
}
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <title>Admin Panel</title>
</head>
<body>
    <?php 
        if(isset($_COOKIE[$cookie_name])) {
    ?>
    <div class="container p-5">
        <h2 class="w-100 text-center">WELCOME TO YOUR ADMIN PANEL</h2>
        
        <br><br>
        <div class="w-100">
            <h3 class="mb-4">Upload A Photo</h3>
            <a href="./upload/img.php" class="btn btn-primary pl-4 pr-4 mr-2">Upload A Photo And Get a URL</a>
        </div>
        <br>
        <hr>
        <br>
        <div class="w-100">
            <h3 class="mb-4">Software</h3>
            <a href="./software/i.php" class="btn btn-primary pl-4 pr-4 mr-2"><b>Add</b> A new Software</a>
            <a href="javascript:void(0)" class="btn btn-danger pl-4 pr-4 mr-2"><b>Update</b> an Existing software</a>
            <a href="javascript:void(0)" class="btn btn-danger pl-4 pr-4 mr-2"><b>Remove</b> an outdate software</a>
        </div>
        <br>
        <hr>
        <br>

        <div class="w-100">
            <h3 class="mb-4">Post</h3>
            <a href="./post/i.php" class="btn btn-primary pl-4 pr-4 mr-2"><b>Create</b> a new Post</a>
            <a href="javascript:void(0)" class="btn btn-danger pl-4 pr-4 mr-2"><b>Update</b> an Exisitng Post</a>
            <a href="javascript:void(0)" class="btn btn-danger pl-4 pr-4 mr-2"><b>Remove</b> an outdate Post</a>
        </div>
        <br>
        <hr>
        <br>
        <div class="w-100">
            <h3 class="mb-4">Comment</h3>
            <a href="./comment/i.php" class="btn btn-primary pl-4 pr-4 mr-2"><b>Add A comment</b> to an already created post</a>
            <a href="javascript:void(0)" class="btn btn-danger pl-4 pr-4 mr-2"><b>Remove a comment</b> from a post</a>
        </div>
        <br>
        <hr>
        <br>

        <div class="w-100">
            <h3 class="mb-4">SEO</h3>
            <a href="./seo/home.php" class="btn btn-primary pl-4 pr-4 mr-2">Update Meta Tags</a>
        </div>
        <br>
        <hr>
        <br>
    </div>
    <?php
        }
    ?>
    <?php if(!isset($_COOKIE[$cookie_name])) {?>

    <div class="border mb-5" id="admin-software">
    <h2 class="text-center bd-bottom p-4 w-100">Login To Get Access to admin panel.</h2>
    <form class='w-50 m-auto' method='POST' action="./index.php">
        <div class="w-100 m-auto">

        <div class="form-group mb-4">
            <label for="username">UserName:</label>
            <input type="text" name="username" class="form-control" id="username" placeholder="Enter username">
        </div>
        <div class="form-group mb-4">
            <label for="password">Password:</label>
            <input type="text" name="password" class="form-control" id="password" placeholder="Password">
        </div>

        <button type="submit" class="btn btn-primary" >Login</button>
        </div>
    </form>
    <br><br><br>
    </div>

    <?php }?>
</body>

</html>