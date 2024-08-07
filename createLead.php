<?php
include 'apiDomain.php';
header("Content-Type:application/json");


session_start();
    $response = "unset";
    $responseError = "unset";
    $http_status = "unset";

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $http_status = "DOING POST CALL";
        $curlHandle = curl_init();
        curl_setopt($curlHandle, CURLOPT_URL,"https://".$apiDomain.".".$apiUrl."./api/v2/leads/from-landing-pages/".$_GET['api_route']."/wordpress");
        curl_setopt($curlHandle, CURLOPT_POST, 1);
        curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $_SERVER['QUERY_STRING']."&secret_code=".$token);
        curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);

        $curlResponse = curl_exec($curlHandle);
        $response = json_decode($curlResponse);
        $userId = $response->user_id;
        $email = false;
        if (isset($_GET['email']) && $_GET['email']!="") {
            $email = $_GET['email'];
        }
        setSession($userId, $email);
        
        curl_close($curlHandle);
    }
    

    response($curlResponse, $userId , 200, $response);

function setSession($torf = FALSE, $email = false){
    $_SESSION[ 'current_logged_in_session_id' ] = $torf;
    $_SESSION[ 'current_logged_in_session_email' ] = $email;
}

function response($order_id, $amount, $response_code, $response_desc){
	$response['order_id'] = $order_id;
	$response['user_id'] = $amount;
	$response['response_code'] = $response_code;
	$response['data'] = $response_desc;
	
	$json_response = json_encode($response);
	echo $json_response;
}
?>