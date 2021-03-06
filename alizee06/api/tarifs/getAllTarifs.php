<?php
require('../header.php');

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once './tarifs.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$tarifs = new Tarifs($db);
 
 
// query products
$stmt = $tarifs->getAllTarifs();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // products array
    $tarif_arr=array();
    $tarif_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $tarif_item=array(
            "id" => $id,
            "description" => $description,
            "prix" => $prix,
            "promotion" => $promotion,
			"periode" => $periode,
			"place" => $place
        );
 
        array_push($tarif_arr["records"], $tarif_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show tarifs data in json format
    echo json_encode($tarif_arr);
}else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no tarif found
    echo json_encode(
        array("message" => "No tarif found.")
    );
}
?>