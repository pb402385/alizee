<?php
require('../header.php');

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
 
// include database and object files
include_once '../config/database.php';
include_once './tarifs.php';
 
// instantiate database and tarif object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$tarif = new Tarifs($db);
 
//TODO get data from url here
 
// get posted data
$data = json_decode('{"id":"12"}');

// make sure data is not empty
if(
	!empty($data->id)
){
 
    // set tarif property values
	$tarif->id = $data->id;
	
	// delete the tarif
	if($tarif->deleteTarif()){
	 
		// set response code - 200 ok
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "tarif was deleted."));
	}
	 
	// if unable to delete the tarif
	else{
	 
		// set response code - 503 service unavailable
		http_response_code(503);
	 
		// tell the user
		echo json_encode(array("message" => "Unable to delete tarif."));
	}
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update tarif. Data is incomplete."));
}
?>