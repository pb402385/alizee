<?php
require('../header.php');
// include database and object files
include_once '../config/database.php';
include_once './FAQ.php';
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
	$faq = new FAQ($db);
	 
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
	 
		// set FAQ property values
		$faq->titre = $data["titre"];
		$faq->description = $data["titre"];
		$faq->isvisible = $data["isvisible"];
		$faq->place = $data["place"];
	 
		// create the FAQ
		if($faq->addFAQ()){
	 
			// set response code - 201 created
			http_response_code(201);
	 
			// tell the user
			echo json_encode(array("message" => "FAQ was created."));
		}
	 
		// if unable to create the FAQ, tell the user
		else{
	 
			// set response code - 503 service unavailable
			http_response_code(503);
	 
			// tell the user
			echo json_encode(array("message" => "Unable to create FAQ."));
		}
	}
	 
	// tell the user data is incomplete
	else{
	 
		// set response code - 400 bad request
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "Unable to create FAQ. Data is incomplete."));
	}
}else{
	// set response code - 401 utilisateur non authentifié
	http_response_code(401);
}
?>