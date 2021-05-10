<?php
    if(isset($_GET['id']) && isset($_GET['download'])) {
        $id = $_GET['id'];
        $download = $_GET['download'];

        include_once("../include/connection.php");
        $sql = $conn->query("UPDATE softwares SET download = '$download' where id = $id");

        if($sql) {
            echo "SUCCESS";
        } else {
            echo "FAILED";
        }
    }
    else {
        echo "ERROR";
    }
?>