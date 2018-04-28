<?php
    require("../config.php");

    $datos = isset($_GET["vota"]) ? $_GET["vota"]:$_POST["vota"];

    $dbconn = pg_connect("host=".$host." port=".$port." dbname=".$db." user=".$user." password=".$pass) or die('NO HAY CONEXION: ' . pg_last_error());

    //consulta sencilla
    $query = "INSERT INTO vota VALUES ($datos);";

    $result = pg_query($dbconn, $query) or die('ERROR AL INSERTAR DATOS: ' . pg_last_error());

    // Free resultset liberar los datos
    pg_free_result($result);

    // Closing connection cerrar la conexión
    pg_close($dbconn);

    $voto = new stdClass();
    $voto -> voto = $datos;
    $json = json_encode($voto);

    echo $datos;
