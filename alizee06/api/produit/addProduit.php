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
include_once './produit.php';
 
// instantiate database and produit object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$produit = new Produit($db);
 
//TODO get data from url here
 
// get posted data
$data = json_decode('{"id_template":"2","id_categorie":"2","nom":"Test produit","image_p":null,"description_p":null,"image_s":null,"description_s":null,"isvisible":"1","place":"1","path":"test"}');
 
// make sure data is not empty
if(
	!empty($data->id_template) &&
	!empty($data->id_categorie) &&
    !empty($data->nom) &&
	//!empty($data->image_p) &&
	//!empty($data->description_p) &&
	//!empty($data->image_s) &&
	//!empty($data->description_s) &&
    !empty($data->isvisible) &&
    !empty($data->place) &&
    !empty($path->path)
){
 
    // set produit property values
	$produit->idtemplate = $data->id_template;
	$produit->idcategorie = $data->id_categorie;
    $produit->nom = $data->nom;
	$produit->imagep = $data->image_p;
	$produit->descriptionp = $data->description_p;
	$produit->images = $data->image_s;
	$produit->descriptions = $data->description_s;
    $produit->isvisible = $data->isvisible;
	$produit->place = $data->place;
	$produit->path = $data->path;
 
    // create the produit
    if($produit->addProduit()){
 
        // set response code - 201 created
        http_response_code(201);
 
        // tell the user
        echo json_encode(array("message" => "produit was created."));
    }
 
    // if unable to create the produit, tell the user
    else{
 
        // set response code - 503 service unavailable
        http_response_code(503);
 
        // tell the user
        echo json_encode(array("message" => "Unable to create produit."));
    }
}
 
// tell the user data is incomplete
else{
 
    // set response code - 400 bad request
    http_response_code(400);
 
    // tell the user
    echo json_encode(array("message" => "Unable to create produit. Data is incomplete."));
}
?>