<?php
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
    include_once("../../../include/connection.php");
    if($conn->connect_error) {
        die("Connection Failed". $conn->connect_error);
    }
    $t = time();
    $timestamp = $t . " - " . date("Y-m-d", $t);
    $title = $_POST['title'];
    $title = preg_replace('/[\']/i', '"', $title);
    $description = $_POST['description'];
    $description = preg_replace('/[\']/i', '"', $description);
    $date = date("Y-m-d", $t);
    $type = $_POST['type'];
    
    echo "$title";
    echo "$description";
    
    $thumbnail_temp = $_FILES['thumbnail']['tmp_name'];    
    $thumbnail = $timestamp . " - " . $_FILES['thumbnail']['name'];    
    $thumbnail = preg_replace('/[\']/i', '"', $thumbnail);
    
    $software_temp = $_FILES['software']['tmp_name'];
    $software = $timestamp . " - " . $_FILES['software']['name'];      
    $software = preg_replace('/[\']/i', '"', $software); 

    move_uploaded_file($software_temp, "../../../uploads/softwares/" . $software);     
    move_uploaded_file($thumbnail_temp, "../../../uploads/softwares/" . $thumbnail);  

    $sql = $conn->query(
        "INSERT INTO softwares(title, description, type, software, thumbnail, date)
        VALUES('$title', '$description', '$type', '$software', '$thumbnail', '$date')
        ");
    if($sql) {
        echo "INSERT_SUCCESS";
        exit();
    }
    else {
        echo "ERROR ". $sql ;
        exit();
    }        
  
?>