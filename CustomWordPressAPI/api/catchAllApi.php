<?php
include 'apiDomain.php';
header("Content-Type:application/json");


session_start();
function _isCurl(){
    return function_exists('curl_version');
}
if (isset($_GET['order_id']) && $_GET['order_id']!="") {


    $response = "unset";
    $responseError = "unset";
    $http_status = "unset";
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $response = file_get_contents("https://".$apiDomain.".".$apiUrl.".".$_GET['order_id']."/wordpress?".$_SERVER['QUERY_STRING']."&secret_code=".$token);
        $response = json_decode($response);
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $http_status = "DOING POST CALL";
        $curlHandle = curl_init();
        curl_setopt($curlHandle, CURLOPT_URL,"https://".$apiDomain.".".$apiUrl.".".$_GET['order_id']."/wordpress");
        curl_setopt($curlHandle, CURLOPT_POST, 1);
        curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $_SERVER['QUERY_STRING']."&secret_code=".$token);
        curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);

        $curlResponse = curl_exec($curlHandle);
        $response = json_decode($curlResponse);
        curl_close($curlHandle);
    }
    
    

    response("https://".$apiDomain.".".$apiUrl.".".$_GET['order_id']."/wordpress?".$_SERVER['QUERY_STRING']."&secret_code=".$token, $responseError , 200, $response);

}else{
	response(NULL, NULL, 400, "Invalid Request");
}

function setSession($torf = TRUE){
    $_SESSION[ 'current_logged_in_session_id' ] = $torf;
}

function response($order_id, $amount, $response_code, $response_desc){
	$response['order_id'] = $order_id;
	$response['apiuser'] = $amount;
	$response['response_code'] = $response_code;
	$response['data'] = $response_desc;
	
	$json_response = json_encode($response);
	echo $json_response;
}
?>