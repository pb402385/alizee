<?php
require('../header.php');

// required headers
header("Access-Control-Allow-Headers: access-control-allow-methods, access-control-allow-origin, content-type");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once './ruby.php';
 
// instantiate database and user object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$ruby = new Ruby($db);
 
 
// query users
$stmt = $ruby->getRuby();
$num = $stmt->rowCount();


// check if more than 0 record found
if($num>0){
 
    // users array
    $ruby_arr=array();
    $ruby_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $ruby_item=array(	
			"titre" => $titre,
			"valeur" => $valeur
        );
 
        array_push($ruby_arr["records"], $ruby_item);
    }
	
	$input = file_get_contents("php://input");
	$inputJSON = json_decode($input, true);
	
	$name = $inputJSON["name"];
	$mdp = $inputJSON["mdp"];
	

	if($ruby_arr["records"][0]["titre"] == $name && $ruby_arr["records"][0]["valeur"] == $mdp){
		$_SESSION["etat"] = "admin";
		$token = $ruby->generateToken(60);
		$token = $ruby->getTokenAndDelete($token);
		$arr = array('connection' => 1, 'message' => 'Connexion réussie! ', 'token' => $token);
	}else{
		$arr = array('connection' => 0, 'message' => 'Connexion impossible! ', 'name' => $name,  'mdp' => $mdp);
	}

	
    // set response code - 200 OK
    http_response_code(200);
 
    // show ruby data in json format
    echo json_encode($arr);
}else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no ruby found
    echo json_encode(
        array("message" => "No ruby found.")
    );
}

?>