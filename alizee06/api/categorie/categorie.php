<?php
class Categorie{
 
    // database connection and table name
    private $conn;
    private $table_name = "categorie";
 
    // object properties
    public $id;
    public $nom;
    public $place;
    public $isvisible;
	public $routerlink;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	//Obtenir toutes les catégories
	function getAllCategories(){
	 
		$query = "SELECT * FROM " . $this->table_name;
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}
	
	//Ajouter une catégorie
	function addCategorie(){
 
		// query to insert record
		$query = "INSERT INTO
					" . $this->table_name . "
				SET
					nom=:nom, 
					place=:place, 
					isvisible=:isvisible,
					routerlink=:routerlink";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->nom=htmlspecialchars(strip_tags($this->nom));
		$this->place=htmlspecialchars(strip_tags($this->place));
		$this->isvisible=htmlspecialchars(strip_tags($this->isvisible));
		$this->routerlink=htmlspecialchars(strip_tags($this->routerlink));
	 
		// bind values
		$stmt->bindParam(":nom", $this->nom);
		$stmt->bindParam(":place", $this->place);
		$stmt->bindParam(":isvisible", $this->isvisible);
		$stmt->bindParam(":routerlink", $this->routerlink);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
	
	// MAJ d'une categorie
	function updateCategorie(){
	 
		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET
					nom=:nom, 
					place=:place, 
					isvisible=:isvisible,
					routerlink=:routerlink
				WHERE
					id = :id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->nom=htmlspecialchars(strip_tags($this->nom));
		$this->place=htmlspecialchars(strip_tags($this->place));
		$this->isvisible=htmlspecialchars(strip_tags($this->isvisible));
		$this->id=htmlspecialchars(strip_tags($this->id));
		$this->routerlink=htmlspecialchars(strip_tags($this->routerlink));
	 
		// bind new values
		$stmt->bindParam(':id', $this->id);
		$stmt->bindParam(":nom", $this->nom);
		$stmt->bindParam(":place", $this->place);
		$stmt->bindParam(":isvisible", $this->isvisible);
		$stmt->bindParam(":routerlink", $this->routerlink);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete d'une categorie
	function deleteCategorie(){
	 
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