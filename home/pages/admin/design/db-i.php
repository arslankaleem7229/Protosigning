<?php
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
    include_once("../../../include/connection.php");
    if($conn->connect_error) {
        die("Connection Failed". $conn->connect_error);
    }

    $result = array('error'=> false);
    $t = time();
    $timestamp = $t . " - " . date("Y-m-d", $t);
    $title = $_POST['title'];
    $title = preg_replace('/[\']/i', '"', $title);
    $description = $_POST['description'];
    $description = preg_replace('/[\']/i', '"', $description);
    $date = date("Y-m-d", $t);
    $type = $_POST['type'];

    $thumbnail_temp = $_FILES['thumbnail']['tmp_name'];    
    $thumbnail = $timestamp . " - " . $_FILES['thumbnail']['name'];    
    $thumbnail = preg_replace('/[\']/i', '"', $thumbnail);

    $upload = move_uploaded_file($thumbnail_temp, "../../../uploads/designs/" . $thumbnail);
    $sql = $conn->query(
        "INSERT INTO designs(title, description, type, thumbnail)
        VALUES('$title', '$description', '$type', '$thumbnail')
        ");
    if($sql) {
        echo "SUCCESS";
        exit();
    }
    else {
        echo $sql;
        exit();
    }        
?>