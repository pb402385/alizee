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
	
	var_dump($data["image_p"]);
	
	// make sure data is not empty
	if(
		!empty($data)
	){
	 
		// set produit property values
		$produit->id = $data["id"];
		$produit->idtemplate = $data["id_template"];
		$produit->idcategorie = $data["id_categorie"];
		$produit->nom = $data["nom"];
		$produit->imagep = $data["image_p"];
		$produit->descriptionp = $data["description_p"];
		$produit->images = $data["image_s"];
		$produit->descriptions = $data["description_s"];
		$produit->isvisible = $data["isvisible"];
		$produit->place = $data["place"];
		$produit->path = $data["path"];
		
		// update the produit
		if($produit->updateProduit()){
		 
			// set response code - 200 ok
			http_response_code(200);
		 
			// tell the user
			echo json_encode(array("message" => "produit was updated.".var_dump($data)));
		}
		 
		// if unable to update the produit, tell the user
		else{
		 
			// set response code - 503 service unavailable
			http_response_code(503);
		 
			// tell the user
			echo json_encode(array("message" => "Unable to update produit."));
		}
	}
	 
	// tell the user data is incomplete
	else{
	 
		// set response code - 400 bad request
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "Unable to update produit. Data is incomplete!".$data));
	}
}else{
	// set response code - 401 utilisateur non authentifié
	http_response_code(401);
}

?>