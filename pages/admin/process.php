<?php
    include_once("../../include/connection.php");
    if($conn->connect_error) {
        die("Connection Failed". $conn->connect_error);
    }

    $result = array('error'=> false);
    $action = '';

    if(isset($_GET['action'])) {
        $t = time();
        $timestamp = $t . " - " . date("Y-m-d", $t);

        $action = $_GET['action'];

        $title = $_POST['title'];
        $title = preg_replace('/[\']/i', '"', $title);
        $description = $_POST['description'];
        $description = preg_replace('/[\']/i', '"', $description);

        $date = date("Y-m-d", $t);

        if($_GET['action'] !== "COMMENT") {
            $type = $_POST['type'];
            $thumbnail_temp = $_FILES['thumbnail']['tmp_name'];
            
            $thumbnail = $timestamp . " - " . $_FILES['thumbnail']['name'];    
            $thumbnail = preg_replace('/[\']/i', '"', $thumbnail);
        }
    }


    if($action == "SOFTWARE") {
        
        $software_temp = $_FILES['software']['tmp_name'];
        $software = $timestamp . " - " . $_FILES['software']['name'];  
        
        $software = preg_replace('/[\']/i', '"', $software);      

        move_uploaded_file($software_temp, "../../uploads/softwares/" . $software);     
        move_uploaded_file($thumbnail_temp, "../../uploads/softwares/" . $thumbnail);   
        $sql = $conn->query(
            "INSERT INTO softwares(title, description, type, software, thumbnail, date)
            VALUES('$title', '$description', '$type', '$software', '$thumbnail', '$date')
            ");
        if($sql) {
            echo $title . "<br>";
            echo $description . "<br>";
            echo $type . "<br>";
            echo $software . "<br>";
            echo $thumbnail . "<br>";
            exit();
        }
        else {
        }        

    }
    else if($action == "POST") {
        
        $upload = move_uploaded_file($thumbnail_temp, "../../uploads/posts/" . $thumbnail);

        if($upload > 0) {
            $sql = $conn->query(
                "SELECT title from posts where LOWER(title) = LOWER('$title') LIMIT 1"
            );
            if($sql) {
                $row = $sql->fetch_assoc();
                $exits = json_encode($row);
                if($exits != "null") {
                    echo "ALREAD_CREATED";
                    exit();
                }
            }

            $sql = $conn->query(
                "INSERT INTO posts(title, description, type, thumbnail, date)
                VALUES('$title', '$description', '$type', '$thumbnail', '$date')
                ");
            if($sql) {
                echo "SUCCESS";
                exit();
            }
            else {
                echo "ERROR";
                exit();
            }        
            
        }
        else {
            echo "<br><br>";
            echo "ERROR_UPLOADING_FILE, MAKE SURE THAT THE FILE YOU UPLOAD, THEIR DO NOT CONTAIN ANY SPECIAL CHARACTERS";
            exit();
        }
        
    }
    else if($action == "COMMENT") {
        $post = $_POST['post'];
        $sql = $conn->query(
            "INSERT into comments (title, description, post, date) VALUES('$title', '$description', '$post', '$date')"
        );
        echo $title . "<br>";
        echo $description . "<br>";
        echo $post . "<br>";    

    }
?>