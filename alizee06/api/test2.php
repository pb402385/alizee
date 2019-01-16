<?php

session_name("alize");
session_start();

echo $_SESSION["etat"];

if (!isset ($_SESSION["etat"])) { 
	$_SESSION["etat"] = "user";
}

$_SESSION["etat"] = "user";

if (isset ($_SESSION["etat"])) { 
	$_SESSION["etat"] = "user";
}

echo $_SESSION["etat"];

?>