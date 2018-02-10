<?php
    require("../config-admin.php");

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