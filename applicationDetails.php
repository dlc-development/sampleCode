<?php
include 'apiDomain.php';
header("Content-Type:application/json");

session_start();

if (isset($_GET['id']) && $_GET['id']!="") {
    
    $response = "unset";
    
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $response = file_get_contents("https://".$apiDomain.".".$apiUrl."./api/v1/applications/".$_GET['id']."/details/wordpress?".$_SERVER['QUERY_STRING']."&secret_code=".$token);
        //$response = json_decode($response);
    }

    response(200, $response);

}else{
	response(400, "Invalid Request");
}

function response($response_code, $response_desc){

	$response['response_code'] = $response_code;
	$response['data'] = $response_desc;
	
	$json_response = json_encode($response);
	echo $json_response;
}
?>