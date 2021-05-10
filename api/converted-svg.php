<?php
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
    include_once("../include/connection.php");
    include_once("../include/config.php");
    if($conn->connect_error) {
        die("Connection Failed". $conn->connect_error);
    }


    $t = time();
    $timestamp = $t . " - " . date("Y-m-d", $t);
    $thumbnail_temp = $_FILES['thumbnail']['tmp_name'];    
    $thumbnail = $timestamp . " - " . $_FILES['thumbnail']['name'];    
    $thumbnail = preg_replace('/[\']/i', '"', $thumbnail);

    $upload = move_uploaded_file($thumbnail_temp, "../uploads/logos/" . $thumbnail);
    echo $root . "/uploads/logos/".$thumbnail;
    
?>