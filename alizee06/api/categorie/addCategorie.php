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
include_once './categorie.php';
 
// instantiate database and categorie object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$categorie = new Categorie($db);
 
//TODO get data from url here
 
// get posted data
$data = json_decode('{"nom":"Test Categorie","place":"4","is_visible":"1","routerlink":"routerlinktest"}');
 
// make sure data is not empty
if(
    !empty($data->nom) &&
    !empty($data->place) &&
    !empty($data->is_visible) &&
    !empty($data->routerlink)
){
 
    // set categorie property values
    $categorie->nom = $data->nom;
    $categorie->place = $data->place;
    $categorie->isvisible = $data->is_visible;
	$categorie->routerlink = $data->routerlink;
 
    // create the categorie
    if($categorie->addCategorie()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "categorie was created."));
    }
 
    // if unable to create the categorie, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create categorie."));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create categorie. Data is incomplete."));
}
?>