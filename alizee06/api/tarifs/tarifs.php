<?php
class Tarifs{
 
    // database connection and table name
    private $conn;
    private $table_name = "tarifs";
 
    // object properties
    public $id;
    public $description;
    public $promotion;
    public $prix;
	public $periode;
	public $place;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	//Obtenir toutes les tarifs
	function getAllTarifs(){
	 
		$query = "SELECT * FROM " . $this->table_name;
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}
	
	//Ajouter un tarif
	function addTarif(){
 
		// query to insert record
		$query = "INSERT INTO
					" . $this->table_name . "
				SET
					promotion=:promotion, 
					description=:description, 
					periode=:periode, 
					place=:place, 
					prix=:prix";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->promotion=htmlspecialchars(strip_tags($this->promotion));
		$this->description=htmlspecialchars(strip_tags($this->description));
		$this->periode=htmlspecialchars(strip_tags($this->periode));
		$this->prix=htmlspecialchars(strip_tags($this->prix));
		$this->place=htmlspecialchars(strip_tags($this->place));
	 
		// bind values
		$stmt->bindParam(":promotion", $this->promotion);
		$stmt->bindParam(":description", $this->description);
		$stmt->bindParam(":periode", $this->periode);
		$stmt->bindParam(":prix", $this->prix);
		$stmt->bindParam(":place", $this->place);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
	
	// MAJ d'un tarif
	function updateTarif(){
	 
		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET
					promotion=:promotion, 
					description=:description, 
					periode=:periode, 
					place=:place, 
					prix=:prix
				WHERE
					id = :id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
	 
		// sanitize
		$this->promotion=htmlspecialchars(strip_tags($this->promotion));
		$this->description=htmlspecialchars(strip_tags($this->description));
		$this->periode=htmlspecialchars(strip_tags($this->periode));
		$this->prix=htmlspecialchars(strip_tags($this->prix));
		$this->place=htmlspecialchars(strip_tags($this->place));
		$this->id=htmlspecialchars(strip_tags($this->id));
	 
		// bind values
		$stmt->bindParam(':id', $this->id);
		$stmt->bindParam(":promotion", $this->promotion);
		$stmt->bindParam(":description", $this->description);
		$stmt->bindParam(":periode", $this->periode);
		$stmt->bindParam(":place", $this->place);
		$stmt->bindParam(":prix", $this->prix);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete d'un tarif
	function deleteTarif(){
	 
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
	
	
	// MAJ d'un categorie place
	function updatePlaceTarif($place){
	 
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
	
	
	//Obtenir tous les Produits (version allégée pour pas charger ce qui est inutile)
	function getTarifInfoForDelete($id){
	 
		$query = "SELECT place FROM " . $this->table_name . " WHERE id=" . $id;
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}

}
?>