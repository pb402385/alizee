<?php
require('../header.php');
// include database and object files
include_once '../config/database.php';
include_once './produit.php';
include_once '../ruby/ruby.php';

$database = new Database();
$db = $database->getConnection();
$ruby = new Ruby($db);

$token = $ruby->getToken();

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Methods, Access-Control-Allow-Origin, Authorization, X-Requested-With");

if($_GET["token"] === $token ){
	// initialize object
	$categorie = new Categorie($db);
	 
	// Création d'un flux
	$opts = array(
	  'http'=>array(
		'method'=>"POST"
	  )
	);
	 
	$context = stream_context_create($opts);
	 
	// get posted data
	$input = file_get_contents("php://input", false, $context); 
	$data = json_decode($input, true);

	// make sure data is not empty
	if(
		!empty($data)
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
}else{
	// set response code - 401 utilisateur non authentifié
	http_response_code(401);
}
?>