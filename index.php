<?php

include_once "configure.php";
require "Database.php";
require "Register.php";



if (isset($_GET['req'])) {

    try {
        $db = new Database();
        $registration = new Register($db->connect());
    } 
    catch (Exception $error) {
        echo json_encode([$error->getMessage()]);
    
        return "error";
    }
    
    $req=$_GET['req'];
    switch ($req) {
        case 'insert':  
            $registration->name= $_GET['name'] ;
            $registration->mail = $_GET['mail'] ;
            $registration->college = $_GET['college'] ;
            $registration->dept= $_GET['dept'] ;
            $registration->question = $_GET['quest'] ;
            $registration->app = $_GET['app'] ;
            $registration->ts = $_GET['ts'] ;
            echo $registration->insertr();
            break;
        case 'display':                            
            $stmt = $registration->getRecords();
            $row_count = $stmt->rowCount();
            if ($row_count > 0) {
                $student_arr = array(
                    "records" => array()
                );
                while($row = $stmt->fetch(\PDO::FETCH_ASSOC)) {
                    $student_arr['records'][] = $row;
                }
                echo json_encode($student_arr);
            }
            break;
        case 'delete':
            $registration->id=$_GET['id'];
            $stmt = $registration->delRecords();
            break;
        case 'edit':
            $registration->id=$_GET['id'];
            $registration->name= $_GET['name'] ;
            $registration->mail = $_GET['mail'] ;
            $registration->college = $_GET['college'] ;
            $registration->dept= $_GET['dept'] ;
            $registration->question = $_GET['quest'] ;
            $registration->app = $_GET['app'] ;
            $registration->ts = $_GET['ts'] ;
            echo $registration->editRecords();
            break;
        default:
            echo json_encode(["In-valid request"]);
            break;
    }
}

?>