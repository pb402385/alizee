<?php
class Produit{
 
    // database connection and table name
    private $conn;
    private $table_name = "produit";
 
    // object properties
    public $id;
	public $idtemplate;
	public $idcategorie;
    public $nom;
    public $imagep;
	public $descriptionp;
	public $images;
	public $descriptions;
    public $isvisible;
	public $place;
	public $path;
 
    // constructor with $db as database connection
    public function __construct($db){
        $this->conn = $db;
    }
	
	//Obtenir tous les Produits
	function getAllProduits(){
	 
		$query = "SELECT * FROM " . $this->table_name;
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}
	
	//Obtenir tous les Produits par categorie
	function getAllProduitsByCategorie($id){
	 
		$query = "SELECT * FROM " . $this->table_name . " WHERE idcategorie=" . $id;
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}
	
	//Obtenir tous les Produits (version allégée pour pas charger ce qui est inutile)
	function getAllProduitsSimple(){
	 
		$query = "SELECT id, idcategorie, nom, isvisible, place FROM " . $this->table_name;
		// prepare query statement
		$stmt = $this->conn->prepare($query);
		// execute query
		$stmt->execute();
	 
		return $stmt;
	}


	//Ajouter un produit
	function addProduit(){
 
		// query to insert record
		$query = "INSERT INTO
					" . $this->table_name . "
				SET
					idtemplate=:idtemplate, 
					idcategorie=:idcategorie, 
					nom=:nom,
					imagep=:imagep,
					descriptionp=:descriptionp,
					images=:images,
					descriptions=:descriptions,
					isvisible=:isvisible,
					place=:place,
					path=:path";
	 
		// prepare query
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->idtemplate=htmlspecialchars(strip_tags($this->idtemplate));
		$this->idcategorie=htmlspecialchars(strip_tags($this->idcategorie));
		$this->nom=htmlspecialchars(strip_tags($this->nom));
		$this->imagep=htmlspecialchars(strip_tags($this->imagep));
		$this->descriptionp=htmlspecialchars(strip_tags($this->descriptionp));
		$this->images=htmlspecialchars(strip_tags($this->images));
		$this->descriptions=htmlspecialchars(strip_tags($this->descriptions));
		$this->isvisible=htmlspecialchars(strip_tags($this->isvisible));
		$this->place=htmlspecialchars(strip_tags($this->place));
		$this->path=htmlspecialchars(strip_tags($this->path));
	 
		// bind values
		$stmt->bindParam(":idtemplate", $this->idtemplate);
		$stmt->bindParam(":idcategorie", $this->idcategorie);
		$stmt->bindParam(":nom", $this->nom);
		$stmt->bindParam(":imagep", $this->imagep);
		$stmt->bindParam(":descriptionp", $this->descriptionp);
		$stmt->bindParam(":images", $this->images);
		$stmt->bindParam(":descriptions", $this->descriptions);
		$stmt->bindParam(":place", $this->place);
		$stmt->bindParam(":isvisible", $this->isvisible);
		$stmt->bindParam(":path", $this->path);
	 
		// execute query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
		 
	}
	
	// MAJ d'un produit
	function updateProduit(){
	 
		// update query
		$query = "UPDATE
					" . $this->table_name . "
				SET
					idtemplate=:idtemplate, 
					idcategorie=:idcategorie, 
					nom=:nom,
					imagep=:imagep,
					descriptionp=:descriptionp,
					images=:images,
					descriptions=:descriptions,
					isvisible=:isvisible,
					place=:place,
					path=:path
				WHERE
					id = :id";
	 
		// prepare query statement
		$stmt = $this->conn->prepare($query);
	 
		// sanitize
		$this->idtemplate=htmlspecialchars(strip_tags($this->idtemplate));
		$this->idcategorie=htmlspecialchars(strip_tags($this->idcategorie));
		$this->nom=htmlspecialchars(strip_tags($this->nom));
		$this->imagep=htmlspecialchars(strip_tags($this->imagep));
		$this->descriptionp=$this->descriptionp;
		$this->images=htmlspecialchars(strip_tags($this->images));
		$this->descriptions=$this->descriptions;
		$this->isvisible=htmlspecialchars(strip_tags($this->isvisible));
		$this->place=htmlspecialchars(strip_tags($this->place));
		$this->path=htmlspecialchars(strip_tags($this->path));
		$this->id=htmlspecialchars(strip_tags($this->id));
	 
		// bind new values
		$stmt->bindParam(':id', $this->id);
		$stmt->bindParam(":idtemplate", $this->idtemplate);
		$stmt->bindParam(":idcategorie", $this->idcategorie);
		$stmt->bindParam(":nom", $this->nom);
		$stmt->bindParam(":imagep", $this->imagep);
		$stmt->bindParam(":descriptionp", $this->descriptionp);
		$stmt->bindParam(":images", $this->images);
		$stmt->bindParam(":descriptions", $this->descriptions);
		$stmt->bindParam(":place", $this->place);
		$stmt->bindParam(":isvisible", $this->isvisible);
		$stmt->bindParam(":path", $this->path);
	 
		// execute the query
		if($stmt->execute()){
			return true;
		}
	 
		return false;
	}
	
	// delete d'un produit
	function deleteProduit(){
	 
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