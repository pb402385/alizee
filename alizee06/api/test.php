<?php

try
{
	// Sous WAMP (Windows)
	$bdd = new PDO('mysql:host=localhost;dbname=alizee;charset=utf8', 'root', '');
}
catch (Exception $e)
{
		echo $e->getMessage();
        die('Erreur : ' . $e->getMessage());
}

$reponse = $bdd->query('SELECT * FROM `categorie`');

$reponse->execute();
$donnees = $reponse->fetchAll();

echo json_encode($donnees);
?>