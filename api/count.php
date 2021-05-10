<?php
    if(isset($_GET['type']) && isset($_GET['table'])) {
        
        $type = $_GET['type'];
        $table = $_GET['table'];

        if($type == "category") {
            include_once("../include/connection.php");
            $sql = $conn->query("SELECT COUNT(type) as count, type as category from $table group by type order by COUNT(type) desc");
            $result = array();
    
            while($row = $sql->fetch_assoc()) {
                array_push($result, $row);
            }
            echo json_encode($result);
            $conn->close();
                
        }
    }
    else {
        echo "ERROR";
    }
?>