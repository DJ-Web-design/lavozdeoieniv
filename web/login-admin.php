<?php
    require("../config-admin.php");
    header('Access-Control-Allow-Origin: https://galeria-lavozdeoieniv.firebaseapp.com');
    
    $usuario = isset($_GET["user"]) ? $_GET["user"]:$_POST["user"];
    $password = isset($_GET["pass"]) ? $_GET["pass"]:$_POST["pass"];

    $acceso = "noInput";

    if ($usuario || $password) {
        if ($usuario == $user && $password = $pass) {
        
        $acceso = "accede";

        } else {
            $acceso = "noUser";
        };
    };

    echo $acceso;