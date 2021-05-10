<?php
    if(isset($_GET['username']) && isset($_GET['password'])) {
        include_once("../include/connection.php");
        
        $username = $_GET['username'];
        $password = $_GET['password'];

        $sql = $conn->query("SELECT * FROM users where LOWER(username) = LOWER('$username') LIMIT 1");
        if($sql) {
            $row = $sql->fetch_assoc();
            $exits = json_encode($row);
            if($exits != "null") {
                echo -1;
                exit();
            }
        }
        $sql = $conn->query(
            "INSERT INTO users(username, password)
            VALUES('$username', '$password')
            ");
        if($sql) {
            echo 0;
            exit();
        }
        else {
            echo 1;
            exit();
        }        
    }
    else {
        echo 1;
    }
?>