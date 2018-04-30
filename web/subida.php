<?php
$title = $_POST["title"];
$des = $_POST["description"];


if (isset($_FILES['archivo'])) {
   $archivo = $_FILES['archivo'];
   $extension = pathinfo($archivo['name'], PATHINFO_EXTENSION);
   $time = time();
   $nombre = "{$_POST['nombre_archivo']}_$time.$extension";
   if (move_uploaded_file($archivo['tmp_name'], "upload/$nombre")) {
      echo 1;
   } else {
      echo 0;
   }
}