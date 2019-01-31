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
		$faq->id = $data["id"];
		$faq->idtemplate = $data["id_template"];
		$faq->idcategorie = $data["id_categorie"];
		$faq->nom = $data["nom"];
		$faq->imagep = $data["image_p"];
		$faq->descriptionp = $data["description_p"];
		$faq->images = $data["image_s"];
		$faq->descriptions = $data["description_s"];
		$faq->isvisible = $data["isvisible"];
		$faq->place = $data["place"];
		$faq->path = $data["path"];
		
		// update the FAQ
		if($faq->updateFAQ()){
		 
			// set response code - 200 ok
			http_response_code(200);
		 
			// tell the user
			echo json_encode(array("message" => "FAQ was updated.".var_dump($data)));
		}
		 
		// if unable to update the FAQ, tell the user
		else{
		 
			// set response code - 503 service unavailable
			http_response_code(503);
		 
			// tell the user
			echo json_encode(array("message" => "Unable to update FAQ."));
		}
	}
	 
	// tell the user data is incomplete
	else{
	 
		// set response code - 400 bad request
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "Unable to update FAQ. Data is incomplete!"));
	}
}else{
	// set response code - 401 utilisateur non authentifié
	http_response_code(401);
}

?>