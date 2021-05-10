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
    $images = $_POST['images'];
    $description = preg_replace('/[\']/i', '"', $description);
    $date = date("Y-m-d", $t);
    
    $post = $_POST['post'];
    $sql = $conn->query(
        "INSERT into comments (title, description, images, post, date) VALUES('$title', '$description', '$images', '$post', '$date')"
    );
    if($sql) {
        $sql = $conn->query(
            "UPDATE posts SET datetime=now(), comment='$description' where LOWER(title) = LOWER('$post') LIMIT 1"
        );
        if($sql) {
            echo "SUCCESS";
            exit();
        }
        else {
            echo $sql;
            exit();
        }
    } else {
        echo "FAILED";
        exit();
    }
?>