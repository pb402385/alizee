<?php
require('../header.php');
// include database and object files
include_once '../config/database.php';
include_once './tarifs.php';
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
	
	if ($_SERVER['REQUEST_METHOD'] === 'OPTION') {
     // The request is using the OPTION method
	 
	 // set response code - 200 ok
	 http_response_code(200);
	}
	 
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
			$tarif = new Tarifs($db);

			// set tarif property values
			$tarif->id = $data[$i]["id"];
			$tarif->description = $data[$i]["description"];
			$tarif->place = $data[$i]["place"];
			$tarif->promotion = $data[$i]["promotion"];
			$tarif->prix = $data[$i]["prix"];
			$tarif->periode = $data[$i]["periode"];
			
			// update the tarif
			if($tarif->updateTarif()){
			 
			}
			// if unable to update the tarif, tell the user
			else{
				$success = false;
				
				$index = $index.$i.", ";

			}
		}
		
		if($success == true){
			// set response code - 200 ok
			http_response_code(200);
			 
			// tell the user
			echo json_encode(array("message" => "tarif were updated."));
		}else{
			// set response code - 503 service unavailable
			http_response_code(503);
			 
			// tell the user
			echo json_encode(array("message" => "Unable to update tarifs. where id [ ".$index." ]"));
		}
	}
	 
	// tell the user data is incomplete
	else{
	 
		// set response code - 400 bad request
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "Unable to update tarif. Data is incomplete."));
	}
}else{
	// set response code - 401 utilisateur non authentifié
	http_response_code(401);
}
?>