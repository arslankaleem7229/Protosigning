<?php
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
    if(isset($_GET['type']) && isset($_GET['keywords']) && isset($_GET['table'])) {
        $type = $_GET['type'];
        $table = $_GET['table'];
        $keywords = $_GET['keywords'];    

        include_once("../include/connection.php");
        if($type == "ALL RECEIVER SOFTWARE") {
            $sql = $conn->query("SELECT software,title FROM $table WHERE LOWER(title) LIKE LOWER('%$keywords%') order by id desc LIMIT 20");
        } else {
            $sql = $conn->query("SELECT * FROM $table WHERE LOWER(title) LIKE LOWER('%$keywords%') order by id desc LIMIT 20");
        }
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