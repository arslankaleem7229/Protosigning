<?php
    $cursor = $_POST['cursor'];
    $id = $_POST['project_id'];


    include_once("../include/connection.php");
    $sql = $conn->query("UPDATE projects SET cursor_location = '$cursor' where id = $id");
?>