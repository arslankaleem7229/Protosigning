<?php
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
    if(isset($_GET['keywords'])) {
        $keywords = $_GET['keywords'];    

        include_once("../include/connection.php");
        $sql = $conn->query("SELECT * FROM users WHERE LOWER(username) LIKE LOWER('%$keywords%') order by id desc LIMIT 20");
        $result = array();

        while($row = $sql->fetch_assoc()) {
            array_push($result, $row);
        }
        echo json_encode($result);
        $conn->close();
    }
    else {
        echo "ERROR";
    }
?>