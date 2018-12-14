<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// include database and object files
include_once '../config/database.php';
include_once './categorie.php';
 
// instantiate database and product object
$database = new Database();
$db = $database->getConnection();
 
// initialize object
$categorie = new Categorie($db);
 
 
// query products
$stmt = $categorie->getAllCategories();
$num = $stmt->rowCount();
 
// check if more than 0 record found
if($num>0){
 
    // products array
    $categorie_arr=array();
    $categorie_arr["records"]=array();
 
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
 
        $categorie_item=array(
            "id" => $id,
            "nom" => html_entity_decode($nom),
            "place" => $place,
            "is_visible" => $isvisible,
			"routerlink" => $routerlink
        );
 
        array_push($categorie_arr["records"], $categorie_item);
    }
 
    // set response code - 200 OK
    http_response_code(200);
 
    // show categories data in json format
    echo json_encode($categorie_arr);
}else{
 
    // set response code - 404 Not found
    http_response_code(404);
 
    // tell the user no categorie found
    echo json_encode(
        array("message" => "No categorie found.")
    );
}
?>