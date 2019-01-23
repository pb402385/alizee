<?php
require('../header.php');
// include database and object files
include_once '../config/database.php';
include_once './categorie.php';
include_once '../ruby/ruby.php';

$database = new Database();
$db = $database->getConnection();
$ruby = new Ruby($db);

$token = $ruby->getToken();

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
			$categorie = new Categorie($db);

			// set categorie property values
			$categorie->id = $data[$i]["id"];
			$categorie->nom = $data[$i]["nom"];
			$categorie->place = $data[$i]["place"];
			$categorie->isvisible = $data[$i]["is_visible"];
			$categorie->routerlink = $data[$i]["routerlink"];
			
			// update the categorie
			if($categorie->updateCategorie()){
			 
			}
			// if unable to update the categorie, tell the user
			else{
				$success = false;
				
				$index = $index.$i.", ";

			}
		}
		
		if($success == true){
			// set response code - 200 ok
			http_response_code(200);
			 
			// tell the user
			echo json_encode(array("message" => "Categories were updated."));
		}else{
			// set response code - 503 service unavailable
			http_response_code(503);
			 
			// tell the user
			echo json_encode(array("message" => "Unable to update categories. where id [ ".$index." ]"));
		}
	}
	 
	// tell the user data is incomplete
	else{
	 
		// set response code - 400 bad request
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "Unable to update categorie. Data is incomplete."));
	}
}else{
	// set response code - 401 utilisateur non authentifié
	http_response_code(401);
}
?>