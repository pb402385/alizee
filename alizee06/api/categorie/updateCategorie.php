<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/database.php';
include_once './categorie.php';
 
// instantiate database and categorie object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$categorie = new Categorie($db);
 
//TODO get data from url here
 
// get posted data
$data = json_decode('{"id":"3","nom":"Test Categorie update","place":"4","is_visible":"1","routerlink":"routerlinktest"}');

// make sure data is not empty
if(
	!empty($data->id) &&
    !empty($data->nom) &&
    !empty($data->place) &&
    !empty($data->is_visible) &&
    !empty($data->routerlink)
){
 
    // set categorie property values
	$categorie->id = $data->id;
    $categorie->nom = $data->nom;
    $categorie->place = $data->place;
    $categorie->isvisible = $data->is_visible;
	$categorie->routerlink = $data->routerlink;
	
	// update the categorie
	if($categorie->updateCategorie()){
	 
		// set response code - 200 ok
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "Categorie was updated."));
	}
	 
	// if unable to update the categorie, tell the user
	else{
	 
		// set response code - 503 service unavailable
		http_response_code(503);
	 
		// tell the user
		echo json_encode(array("message" => "Unable to update categorie."));
	}
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to update categorie. Data is incomplete."));
}
?>