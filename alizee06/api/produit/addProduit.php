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
	$produit = new Produit($db);
	 
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
	 
		// set produit property values
		$produit->idtemplate =  $data["id_template"];
		$produit->idcategorie = $data["id_categorie"];
		$produit->nom = $data["nom"];
		$produit->imagep = null;
		$produit->descriptionp = null;
		$produit->images = null;
		$produit->descriptions = null;
		$produit->isvisible = $data["isvisible"];
		$produit->place = $data["place"];
		$produit->path = null;
	 
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
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "Unable to create produit. Data is incomplete."));
	}
}else{
	// set response code - 401 utilisateur non authentifié
	http_response_code(401);
}
?>