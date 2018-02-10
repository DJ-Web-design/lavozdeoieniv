<?php
	require("../config.php"); 
	

    $pedido1 = isset($_GET["user"]) ? $_GET["user"]:$_POST["user"];
    $pedido2 = isset($_GET["user"]) ? $_GET["user"]:$_POST["user"];
    $pedido3 = isset($_GET["user"]) ? $_GET["user"]:$_POST["user"];
	/*$pedido = isset($_GET["pedido"]) ? $_GET["pedido"]:$_POST["pedido"];

    $dbconn = pg_connect("host=".$host." port=".$port." dbname=".$db." user=".$user." password=".$pass) or die('NO HAY CONEXION: ' . pg_last_error());

	$mensaje = "";
	
    if (isset($pedido)) {
		$query = "SELECT * FROM vota WHERE vota LIKE '$pedido'";
    	$result = pg_query($dbconn, $query) or die('ERROR AL INSERTAR DATOS: ' . pg_last_error());

		$filas = pg_num_rows($result);

		if ($filas === 0) {
			$mensaje = "<p>No hay ningun voto para esa canción</p>";
		} else {
			echo 'Resultados para <strong>'.$pedido.'</strong>';

			$count = 1;
			while($result = pg_fetch_array($consulta)) {
				$voto = $result['vota'];
				
				//Output
				$mensaje .= '
				<p>
				<strong>Nombre:</strong> ' . $nombre . '<br>
				<strong>Apellido:</strong> ' . $apellido . '<br>
				<strong>Edad:</strong> ' . $edad . '<br>
				</p>';

				$count = $count + 1;

			};
		};

	};

	echo $mensaje;

    // Free resultset liberar los datos
    pg_free_result($result);

    // Closing connection cerrar la conexión
    pg_close($dbconn);*/


    $mensaje = new stdClass();
	$mensaje -> res1 = 10;
	$mensaje -> res2 = 5;
	$mensaje -> res3 = 24;
    $json = json_encode($mensaje);

    echo $json;