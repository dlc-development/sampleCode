<?php
include 'apiDomain.php';
header("Content-Type:application/json");

session_start();

$logged_in = false;
$email = null;
$id = null;
if($_SESSION[ 'current_logged_in_session_id' ]){
    $logged_in = true;
    $email = $_SESSION[ 'current_logged_in_session_email' ];
    $id = $_SESSION[ 'current_logged_in_session_id' ];
}

response($logged_in, $email, $id, $apiDomain);

function response($logged_in, $email, $id, $apiDomain){
	$response['logged_in'] = $logged_in;
	$response['email'] = $email;
	$response['id'] = $id;
	$response['apiDomain'] = $apiDomain;
	$json_response = json_encode($response);
	echo $json_response;
}


?>