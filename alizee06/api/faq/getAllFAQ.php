<?php
require('../header.php');

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once './FAQ.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$faq = new FAQ($db);
 
 
// query products
$stmt = $faq->getAllFAQ();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // products array
    $faq_arr=array();
    $faq_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $faq_item=array(	
			"id" => $id,
			"titre" => $titre,
			"description" => $description,
			"isvisible" => $isvisible,
			"place" => $place
        );
 
        array_push($faq_arr["records"], $faq_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show FAQs data in json format
    echo json_encode($faq_arr);
}else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no FAQ found
    echo json_encode(
        array("message" => "No FAQ found.")
    );
}
?>