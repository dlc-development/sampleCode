<?php
include 'apiDomain.php';
header("Content-Type:application/json");


function isJson($string) {
    json_decode($string);
    return json_last_error() === JSON_ERROR_NONE;
 }

session_start();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $http_status = "DOING POST CALL";
        $curlHandle = curl_init();
        curl_setopt($curlHandle, CURLOPT_URL,"https://".$apiDomain.".".$apiUrl."./api/v1/users/sign_in/wordpress");
        curl_setopt($curlHandle, CURLOPT_POST, 1);
        curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $_SERVER['QUERY_STRING']."&secret_code=".$token);
        curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);

        $curlResponse = curl_exec($curlHandle);
        //$response = json_decode($curlResponse);
        $response = $curlResponse;
        if(isJson($response) == true){
            $response = json_decode($curlResponse);

            $userId = $response->id;
            $userEmail = $response->email;

            setSession($userId, $userEmail);
            response(200, true, "https://".$apiDomain.".".$apiUrl."./api/v1/users/sign_in/wordpress?".$_SERVER['QUERY_STRING']."&secret_code=".$token);
        } else {
            response(200, false, "https://".$apiDomain.".".$apiUrl."./api/v1/users/sign_in/wordpress?".$_SERVER['QUERY_STRING']."&secret_code=".$token);
        }
        

        curl_close($curlHandle);

        
    }
    else{
        response(400, "Invalid Request");
    }
    
    

    



function setSession($id, $email){
    $_SESSION[ 'current_logged_in_session_id' ] = $id;
    $_SESSION[ 'current_logged_in_session_email' ] = $email;
}

function response($response_code, $response_desc, $someStuff){
	$response['response_code'] = $response_code;
	$response['logged_in'] = $response_desc;
	$response['apiDomain'] = $someStuff;
	
	$json_response = json_encode($response);
	echo $json_response;
}
?>