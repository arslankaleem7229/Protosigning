<?php
    $path = $_POST['path'];
    $id = $_POST['project_id'];
    $html_file = $_POST['html_file'];


    include_once("../include/connection.php");
    $sql = $conn->query("UPDATE projects SET html_file = '$html_file' where id = $id");
    
    $thumbnail_temp = $_FILES['file']['tmp_name'];    

    $upload = move_uploaded_file($thumbnail_temp, "../uploads/projects/" . $path);

?>