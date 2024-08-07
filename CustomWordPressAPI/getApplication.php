<?php
include 'apiDomain.php';
header("Content-Type:application/json");


session_start();
function _isCurl(){
    return function_exists('curl_version');
}
if ($_SESSION[ 'current_logged_in_session_id' ]) {

    $response = "unset";
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $response = file_get_contents("https://".$apiDomain.".".$apiUrl."./api/v1/applications/".$_GET['app_id']."/details/wordpress?".$_SERVER['QUERY_STRING']."&secret_code=".$token);
        $response = json_decode($response);
    }
    

    response("getApplication" , 200, $response);

}else{
	response(NULL, 400, "Invalid Request");
}

function response($order_id, $response_code, $response_desc){
	$response['order_id'] = $order_id;
	$response['response_code'] = $response_code;
	$response['data'] = $response_desc;
	
	$json_response = json_encode($response);
	echo $json_response;
}
?>