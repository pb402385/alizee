<?php
class Tarifs{
 
    // database connection and table name
    private $conn;
    private $table_name = "tarifs";
 
    // object properties
    public $id;
    public $idproduit;
    public $idcategorie;
    public $prix;
 
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
					idproduit=:idproduit, 
					idcategorie=:idcategorie, 
					prix=:prix";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->idproduit=htmlspecialchars(strip_tags($this->idproduit));
		$this->idcategorie=htmlspecialchars(strip_tags($this->idcategorie));
		$this->prix=htmlspecialchars(strip_tags($this->prix));
	 
		// bind values
		$stmt->bindParam(":idproduit", $this->idproduit);
		$stmt->bindParam(":idcategorie", $this->idcategorie);
		$stmt->bindParam(":prix", $this->prix);
	 
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
					idproduit=:idproduit, 
					idcategorie=:idcategorie, 
					prix=:prix
				WHERE
					id = :id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
	 
		// sanitize
		$this->idproduit=htmlspecialchars(strip_tags($this->idproduit));
		$this->idcategorie=htmlspecialchars(strip_tags($this->idcategorie));
		$this->prix=htmlspecialchars(strip_tags($this->prix));
		$this->id=htmlspecialchars(strip_tags($this->id));
	 
		// bind values
		$stmt->bindParam(':id', $this->id);
		$stmt->bindParam(":idproduit", $this->idproduit);
		$stmt->bindParam(":idcategorie", $this->idcategorie);
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

}
?>