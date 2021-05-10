<html lang="en">
<head>
    <title>Contact Us - Dish Satellite Information</title>
    <meta charset="UTF-8">
    <meta data-hid="description" name="description" content="Dish Satellite Information">    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link data-n-head="ssr" rel="icon" type="image/x-icon" href="../images/favicon.PNG">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css" rel="stylesheet" />
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />
    <link href="../css/bootstrap.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
    <?php include_once('../components/header.php');  ?>
    <div class="container mt-5">
        <h2>Contact Us</h2>
        <br>
        <form class="was-validated">
        <div class="form-group">
            <label for="uname">Name</label>
            <input type="text" class="form-control" id="uname" placeholder="Your name i.e. John Doe" name="uname" required>
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Please fill out this field.</div>
        </div>
        <div class="form-group">
            <label for="pwd">Email Address:</label>
            <input type="email" class="form-control" id="pwd" placeholder="Email Address i.e. johndoe@gmail.com" name="pswd" required>
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Please fill out this field.</div>
        </div>
        <div class="form-group">
            <label for="pwd">Email Address:</label>
            <textarea class="form-control" rows="10" required></textarea>
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Please fill out this field.</div>
        </div>
        <div class="w-100 text-right">
            <button type="button" class="btn btn-primary pl-4 pr-4 box-shadow">Submit</button>
        </div>
        </form>    
    </div>
    
    <?php include_once('../components/footer.php');  ?>
</body>
</html>