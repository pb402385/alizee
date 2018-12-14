<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once './produit.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$produit = new Produit($db);
 
 
// query products
$stmt = $produit->getAllProduitsSimple();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // products array
    $produit_arr=array();
    $produit_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $produit_item=array(	
			"id" => $id,
			"id_categorie" => $idcategorie,
			"nom" => $nom,
			"isvisible" => $isvisible,
			"place" => $place
        );
 
        array_push($produit_arr["records"], $produit_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show produits data in json format
    echo json_encode($produit_arr);
}else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no produit found
    echo json_encode(
        array("message" => "No produit found.")
    );
}
?>