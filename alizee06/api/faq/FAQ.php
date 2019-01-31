<?php
class FAQ{
 
    // database connection and table name
    private $conn;
    private $table_name = "faq";
 
    // object properties
    public $id;
    public $titre;
	public $description;
    public $isvisible;
	public $place;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	//Obtenir tous les FAQ
	function getAllFAQ(){
	 
		$query = "SELECT * FROM " . $this->table_name;
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}
	
	//Obtenir tous les Produits (version allégée pour pas charger ce qui est inutile)
	function getFAQInfoForDelete($id){
	 
		$query = "SELECT place FROM " . $this->table_name . " WHERE id=" . $id;
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}


	//Ajouter une FAQ
	function addFAQ(){
 
		// query to insert record
		$query = "INSERT INTO
					" . $this->table_name . "
				SET
					titre=:titre,
					description=:description,
					isvisible=:isvisible,
					place=:place";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->titre=htmlspecialchars(strip_tags($this->titre));
		$this->description=htmlspecialchars(strip_tags($this->description));
		$this->isvisible=htmlspecialchars(strip_tags($this->isvisible));
		$this->place=htmlspecialchars(strip_tags($this->place));
	 
		// bind values
		$stmt->bindParam(":titre", $this->titre);
		$stmt->bindParam(":description", $this->description);
		$stmt->bindParam(":place", $this->place);
		$stmt->bindParam(":isvisible", $this->isvisible);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
	
	// MAJ d'une FAQ
	function updateFAQ(){
	 
		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET
					titre=:titre,
					description=:description,
					isvisible=:isvisible,
					place=:place
				WHERE
					id = :id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->titre=htmlspecialchars(strip_tags($this->titre));
		$this->description=$this->description;
		$this->isvisible=htmlspecialchars(strip_tags($this->isvisible));
		$this->place=htmlspecialchars(strip_tags($this->place));
		$this->id=htmlspecialchars(strip_tags($this->id));
	 
		// bind new values
		$stmt->bindParam(':id', $this->id);
		$stmt->bindParam(":titre", $this->titre);
		$stmt->bindParam(":description", $this->description);
		$stmt->bindParam(":place", $this->place);
		$stmt->bindParam(":isvisible", $this->isvisible);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// MAJ d'une FAQ
	function updatePlaceFAQ($place){
	 
		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET
					place = place - 1
				WHERE
					place > :place";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->place=htmlspecialchars(strip_tags($place));
	 
		// bind new values
		$stmt->bindParam(":place", $this->place);

	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete d'une FAQ
	function deleteFAQ(){
	 
		// delete query
		$query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->id=htmlspecialchars(strip_tags($this->id));
	 
		// bind id of record to delete
		$stmt->bindParam(1, $this->id);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}

}
?>