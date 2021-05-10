<?php
    include_once("../include/config.php");
    include_once("../include/connection.php");
    $id = $_GET['id'];
    $sql = $conn->query("SELECT * from projects where id = $id limit 1");
    $result = array();
    if($sql) {
        while($row = $sql->fetch_assoc()) {
            array_push($result, $row);
        }
        echo json_encode($result[0]);
        $conn->close();        
    } else {
        echo $sql;
    }
?>