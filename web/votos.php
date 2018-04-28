<?php
	require("../config.php"); 
	

    $pedido1 = isset($_GET["voto1"]) ? $_GET["voto1"]:$_POST["voto1"];
    $pedido2 = isset($_GET["voto2"]) ? $_GET["voto2"]:$_POST["voto2"];
	$pedido3 = isset($_GET["voto3"]) ? $_GET["voto3"]:$_POST["voto3"];

	$dbconn = pg_connect("host=".$host." port=".$port." dbname=".$db." user=".$user." password=".$pass) 
		or die('NO HAY CONEXION: ' . pg_last_error());


		$query = "SELECT * FROM vota WHERE vota LIKE '$pedido1'";
		$result = pg_query($dbconn, $query) or die('ERROR AL PEDIR DATOS: ' . pg_last_error());
		echo $result;
		//$voto1 = pg_num_row($result);
	
    /*if (isset($pedido1) && isset($pedido2) && isset($pedido3)) {

		$query = "SELECT * FROM vota WHERE vota LIKE '$pedido1'";
    	$result = pg_query($dbconn, $query) or die('ERROR AL PEDIR DATOS: ' . pg_last_error());
		$voto1 = pg_num_row($result);

		$query = "SELECT * FROM vota WHERE vota LIKE '$pedido2'";
    	$result = pg_query($dbconn, $query) or die('ERROR AL PEDIR DATOS: ' . pg_last_error());
		$voto2 = pg_num_row($result);

		$query = "SELECT * FROM vota WHERE vota LIKE '$pedido3'";
    	$result = pg_query($dbconn, $query) or die('ERROR AL PEDIR DATOS: ' . pg_last_error());
		$voto3 = pg_num_row($result);

	};
    // Free resultset liberar los datos
    pg_free_result($result);

    // Closing connection cerrar la conexión
    pg_close($dbconn);


    $mensaje = new stdClass();
	$mensaje -> res1 = $voto1;
	$mensaje -> res2 = $voto2;
	$mensaje -> res3 = $voto3;
    $json = json_encode($mensaje);

    echo $json;*/