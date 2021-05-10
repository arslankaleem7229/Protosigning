<?php
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_HOST']}");
    if(isset($_GET['table'])) {
        include_once("../include/connection.php");
        $table = $_GET['table'];
        

        $sql = $conn->query("SELECT * from $table order by id desc LIMIT 20");

        if($sql) {
            $result = array();
            while($row = $sql->fetch_assoc()) {
                array_push($result, $row);
            }
            echo json_encode($result);
            $conn->close();        
        }
        else {
            echo $sql;
        }
    }
    else {
        echo "ERROR";
    }
?>