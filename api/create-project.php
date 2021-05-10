<?php
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
    include_once("../include/connection.php");
    if($conn->connect_error) {
        die("Connection Failed". $conn->connect_error);
    }
    $title = $_GET['title'];
    $type = $_GET['type'];
    $owner = $_GET['owner'];
    $collaborators = $_GET['collaborators'];

    $sql = $conn->query(
        "INSERT INTO projects(title, type, owner, collaborators)
        VALUES('$title', '$type', '$owner', '$collaborators')
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