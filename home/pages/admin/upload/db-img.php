<?php
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
    if(isset($_FILES['image'])) {
        include_once("../../../include/connection.php");
        include_once("../../../include/config.php");
        if($conn->connect_error) {
            die("Connection Failed". $conn->connect_error);
        }
        $t = time();
        $timestamp = $t . " - " . date("Y-m-d", $t);
        $img_temp = $_FILES['image']['tmp_name'];    
        $img = $timestamp . " - " . $_FILES['image']['name'];    
        $img = preg_replace('/[\']/i', '"', $img);

        move_uploaded_file($img_temp, "../../../uploads/url/" . $img);
        $sql = $conn->query("INSERT INTO uploads(url) VALUES('$img')");
    
        if($sql) {
            echo $root . "/uploads/url/" . $img;
            exit();
        } else {
            echo $sql;
            exit();
        }    
    }
?>
