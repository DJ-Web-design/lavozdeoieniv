<?php

$title = $_POST["title"];
$description = $_POST["description"];
$videoUpload = $_FILES["video"];

// AIzaSyBGr8lrwH_XuNPdzMl-UpDlYjrr2TkizJQ


// Llame a set_include_path () según sea necesario para apuntar a su biblioteca de cliente.
require_once 'Google/Client.php';
require_once 'Google/Service/YouTube.php';
session_start();

/*
 * Puede adquirir una identificación de cliente OAuth 2.0 y un secreto de cliente de la
 * Google Developers Console <https://console.developers.google.com/>
 * Para obtener más información sobre el uso de OAuth 2.0 para acceder a las API de Google, consulte:
 * <https://developers.google.com/youtube/v3/guides/authentication>
 * Asegúrese de haber habilitado la API de datos de YouTube para su proyecto.
 */
$OAUTH2_CLIENT_ID = '758038360539-qp6c8l2ou9vh0gsmtv3um0b2g0qfd74s.apps.googleusercontent.com';
$OAUTH2_CLIENT_SECRET = 'r_kCoOpwNR3kwNAkBFrONda8';

$client = new Google_Client();
$client->setClientId($OAUTH2_CLIENT_ID);
$client->setClientSecret($OAUTH2_CLIENT_SECRET);
$client->setScopes('https://www.googleapis.com/auth/youtube');
$redirect = filter_var('http://' . $_SERVER['HTTP_HOST'] . $_SERVER['PHP_SELF'],
    FILTER_SANITIZE_URL);
$client->setRedirectUri($redirect);

// Defina un objeto que se usará para hacer todas las solicitudes de la API.
$youtube = new Google_Service_YouTube($client);

if (isset($_GET['code'])) {
  if (strval($_SESSION['state']) !== strval($_GET['state'])) {
    die('The session state did not match.');
  }

  $client->authenticate($_GET['code']);
  $_SESSION['token'] = $client->getAccessToken();
  header('Location: ' . $redirect);
}

if (isset($_SESSION['token'])) {
  $client->setAccessToken($_SESSION['token']);
}

// Verifique para asegurarse de que el token de acceso se haya adquirido correctamente.
if ($client->getAccessToken()) {
  try{
    // SUSTITUYE este valor con la ruta al archivo que estás cargando.
    $videoPath = $videoUpload;

    // Crear un fragmento con título, descripción, etiquetas e ID de categoría
    // Crea un recurso de recurso y establece sus metadatos de fragmento y escribe.
    // Este ejemplo establece el título del video, la descripción, las etiquetas de palabras clave y
    // categoría de video
    $snippet = new Google_Service_YouTube_VideoSnippet();
    $snippet->setTitle($title);
    $snippet->setDescription($description);
    $snippet->setTags(array("Prueba 1", "Prueba 2"));

    // Numero de categoría de video. Ver
    // https://developers.google.com/youtube/v3/docs/videoCategories/list 
    $snippet->setCategoryId("22");

    // Establece el estado del video en "público". Los estados válidos son "públicos",
    // "privado" y "no listado".
    $status = new Google_Service_YouTube_VideoStatus();
    $status->privacyStatus = "private";

    // Asocia los fragmentos y los objetos de estado con un nuevo recurso de video.
    $video = new Google_Service_YouTube_Video();
    $video->setSnippet($snippet);
    $video->setStatus($status);

    // Especifique el tamaño de cada fragmento de datos, en bytes. Establezca un valor más alto para
    // conexión confiable ya que pocos fragmentos conducen a cargas más rápidas. Establecer un menor
    // valor para una mejor recuperación en conexiones menos confiables.
    $chunkSizeBytes = 1 * 1024 * 1024;

    // El establecimiento del indicador diferir en verdadero le dice al cliente que devuelva una solicitud que se puede llamar
    // con -> ejecutar (); en lugar de hacer la llamada API de inmediato.
    $client->setDefer(true);

    // Create a request for the API's videos.insert method to create and upload the video.
    $insertRequest = $youtube->videos->insert("status,snippet", $video);

    // Create a MediaFileUpload object for resumable uploads.
    $media = new Google_Http_MediaFileUpload(
        $client,
        $insertRequest,
        'video/*',
        null,
        true,
        $chunkSizeBytes
    );
    $media->setFileSize(filesize($videoPath));


    // Read the media file and upload it chunk by chunk.
    $status = false;
    $handle = fopen($videoPath, "rb");
    while (!$status && !feof($handle)) {
      $chunk = fread($handle, $chunkSizeBytes);
      $status = $media->nextChunk($chunk);
    }

    fclose($handle);

    // If you want to make other calls after the file upload, set setDefer back to false
    $client->setDefer(false);

    $respuesta = new stdClass();
    $respuesta->acceso = "sucess";
    $respuesta->videoTitle = $status['snippet']['title'];
    $respuesta->videoID = $status['id'];

  } catch (Google_Service_Exception $e) {
    $respuesta = new stdClass();
    $respuesta->acceso = "serverError";
    $respuesta->errorMsj = "<p>A service error occurred: <code>".$respuesta->errorCode."</code></p>";
    $respuesta->errorCode = htmlspecialchars($e->getMessage());
  } catch (Google_Exception $e) {
    $respuesta = new stdClass();
    $respuesta->acceso = "clientError";
    $respuesta->errorCode = htmlspecialchars($e->getMessage());
    $respuesta->errorMsj = "<p>A Client error occurred: <code>".$respuesta->errorCode."</code></p>";
  }

  $_SESSION['token'] = $client->getAccessToken();

} else {
  // If the user hasn't authorized the app, initiate the OAuth flow
  $state = mt_rand();
  $client->setState($state);
  $_SESSION['state'] = $state;

  $authUrl = $client->createAuthUrl();
  $respuesta = new stdClass();
  $respuesta->acceso = "noAuthorize";
  $respuesta->authURL = $authUrl;

}
$json = json_encode($respuesta);

echo $json;