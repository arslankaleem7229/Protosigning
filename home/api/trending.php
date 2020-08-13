<?php
    include_once("../include/connection.php");
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
    $sql = $conn->query("SELECT * from posts order by id desc LIMIT 20");
    $result = array();

    while($row = $sql->fetch_assoc()) {
        array_push($result, $row);
    }
    echo json_encode($result);
    $conn->close();
                
?>