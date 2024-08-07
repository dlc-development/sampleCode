<?php
header("Content-Type:application/json");

session_start();

$logged_in = false;
$email = null;
if($_SESSION[ 'current_logged_in_session_id' ]){
    $_SESSION[ 'current_logged_in_session_id' ] = false;
}

response($logged_in);

function response($logged_in){
	$response['logged_in'] = $logged_in;
	
	$json_response = json_encode($response);
	echo $json_response;
}
?>