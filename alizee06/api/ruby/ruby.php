<?php
class Ruby{
 
    // database connection and table name
    private $conn;
    private $table_name = "ruby";
	private $table_token = "token";
 
    // object properties
    public $titre;
	public $valeur;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	//Obtenir tous les Produits
	function getRuby(){
	 
		$query = "SELECT * FROM " . $this->table_name;
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}
	
	
	function generateToken($length){
		if(!isset($length) || intval($length) <= 8 ){
		  $length = 32;
		}
		if (function_exists('random_bytes')) {
			return bin2hex(random_bytes($length));
		}
		if (function_exists('mcrypt_create_iv')) {
			return bin2hex(mcrypt_create_iv($length, MCRYPT_DEV_URANDOM));
		}
		if (function_exists('openssl_random_pseudo_bytes')) {
			return bin2hex(openssl_random_pseudo_bytes($length));
		}
	}
	
	
	function getToken(){
		
		$valid = "";
		$valeur = "";
		
		$query = "SELECT * FROM " . $this->table_token;
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		// execute query
		$stmt->execute();
	 
		$num = $stmt->rowCount();
		
		if($num>0){
		 
			// users array
			$token_arr=array();
			$token_arr["records"]=array();
		 
			// retrieve our table contents
			// fetch() is faster than fetchAll()
			// http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
				// extract row
				// this will make $row['name'] to
				// just $name only
				extract($row);
		 
				$token_item=array(	
					"valeur" => $valeur,
					"valid" => $valid
				);

				//Si valid on le retourne
				if($this->isValid($token_item["valid"])) return $token_item["valeur"];

			}
		}else{
			//On ne fait rien return null
		}
	}
	
	
	function getTokenDate(){
		
		$valid = "";
		$valeur = "";
		
		$query = "SELECT * FROM " . $this->table_token;
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		// execute query
		$stmt->execute();
	 
		$num = $stmt->rowCount();
		
		if($num>0){
		 
			// users array
			$token_arr=array();
			$token_arr["records"]=array();
		 
			// retrieve our table contents
			// fetch() is faster than fetchAll()
			// http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
				// extract row
				// this will make $row['name'] to
				// just $name only
				extract($row);
		 
				$token_item=array(	
					"valeur" => $valeur,
					"valid" => $valid
				);

				//Si valid on le retourne
				if($this->isValid($token_item["valid"])) return $token_item["valid"];

			}
		}else{
			//On ne fait rien return null
		}
	}
	
	
	
	function getTokenAndDelete($token){
		
		$valid = "";
		$valeur = "";
		
		$query = "SELECT * FROM " . $this->table_token;
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		// execute query
		$stmt->execute();
	 
		$num = $stmt->rowCount();
		
		if($num>0){
		 
			// users array
			$token_arr=array();
			$token_arr["records"]=array();
		 
			// retrieve our table contents
			// fetch() is faster than fetchAll()
			// http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
				// extract row
				// this will make $row['name'] to
				// just $name only
				extract($row);
		 
				$token_item=array(	
					"valeur" => $valeur,
					"valid" => $valid
				);

				//Si valid on le retourne
				if($this->isValid($token_item["valid"])) return $token_item["valeur"];
				
				//Si invalide on le supprime
				if($this->isValid($token_item["valid"]) == false) $this->removeToken($token_item["valeur"]);

			}
			//Si tous invalides on genere un token valide
			$this->setToken($token);
			return $token;
		}else{
			//On genere un token valide
			$this->setToken($token);
			return $token;
		}
	}
	
	
	function setToken($token){
		// query to insert record
		$query = "INSERT INTO
					" . "token" . "
				SET
					valeur=:token";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$token=htmlspecialchars(strip_tags($token));
	 
		// bind values
		$stmt->bindParam(":token", $token);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	function isValid($date){
		//fonction de validitié 
		//timestamp + 30 min = valide
		//sinon invalide
		
		$time = strtotime($date);

		$curtime = time();

		if(($curtime-$time) <= 1800) {     //1800 seconds (=30minutes)
		  return true;
		}
		
		return false;
		
	}
	
	function removeToken($token){
		// delete query
		$query = "DELETE FROM " . "token" . " WHERE valeur = ?";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$valeur=htmlspecialchars(strip_tags($token));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $valeur);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}

}
?>