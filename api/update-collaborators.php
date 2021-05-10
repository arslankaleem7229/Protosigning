<?php
    if(isset($_POST['collaborators'])) {
        $collaborators = $_POST['collaborators'];
        $id = $_POST['id'];

        include_once("../include/connection.php");
        $sql = $conn->query("UPDATE projects SET collaborators = '$collaborators' where id = '$id'");

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