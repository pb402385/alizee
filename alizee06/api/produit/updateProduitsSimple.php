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
		$success = true;
		$index = "";
	 
		for($i = 0; $i < count($data); $i++){
			
			// initialize object
			$produit = new Produit($db);
				
			// set produit property values
			$produit->id = $data[$i]["id"];
			$produit->idcategorie = $data[$i]["id_categorie"];
			$produit->nom = $data[$i]["nom"];
			$produit->isvisible = $data[$i]["isvisible"];
			$produit->place = $data[$i]["place"];
			
			// update the produit
			if($produit->updateProduitsSimple()){
			 
			}
			// if unable to update the produit, tell the user
			else{
				$success = false;
				
				$index = $index.$i.", ";

			}
		}
		
		// update the produit
		if($success == true){
		 
			// set response code - 200 ok
			http_response_code(200);
		 
			// tell the user
			echo json_encode(array("message" => "produit simple was updated.".var_dump($data)));
		}
		 
		// if unable to update the produit, tell the user
		else{
		 
			// set response code - 503 service unavailable
			http_response_code(503);
		 
			// tell the user
			echo json_encode(array("message" => "Unable to update produit. where id [ ".$index." ]"));
		}
	}
	 
	// tell the user data is incomplete
	else{
	 
		// set response code - 400 bad request
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "Unable to update produit. Data is incomplete!"));
	}
}else{
	// set response code - 401 utilisateur non authentifié
	http_response_code(401);
}

?>