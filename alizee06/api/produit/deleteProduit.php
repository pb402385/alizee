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
		$produit->id = $data["id"];
		
		$produitInfoToDelete = new Produit($db);
		$stmt = $produitInfoToDelete->getProduitsInfoForDelete($data["id"]);		
		$num = $stmt->rowCount();
		// check if more than 0 record found
		if($num>0){
		 
			// products array
			$produit_arr=array();
		 
			// retrieve our table contents
			// fetch() is faster than fetchAll()
			// http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
				// extract row
				// this will make $row['name'] to
				// just $name only
				extract($row);
		 
				$produit_item=array(	
					"id_categorie" => $idcategorie,
					"place" => $place
				);
		 
				array_push($produit_arr, $produit_item);
			}
		}
		
		// delete the produit
		if($produit->deleteProduit()){
			
			// $produit_arr[0]["id_categorie"] $produit_arr[0]["place"]
			$produit->updatePlaceProduits($produit_arr[0]["id_categorie"],$produit_arr[0]["place"]);
		 
			// set response code - 200 ok
			http_response_code(200);
		 
			// tell the user
			echo json_encode(array("message" => "produit was deleted.".var_dump($produit_arr)));
		}
		 
		// if unable to delete the produit
		else{
		 
			// set response code - 503 service unavailable
			http_response_code(503);
		 
			// tell the user
			echo json_encode(array("message" => "Unable to delete produit."));
		}
	}
	 
	// tell the user data is incomplete
	else{
	 
		// set response code - 400 bad request
		http_response_code(200);
	 
		// tell the user
		echo json_encode(array("message" => "Unable to update produit. Data is incomplete."));
	}
}else{
	// set response code - 401 utilisateur non authentifié
	http_response_code(401);
}
?>