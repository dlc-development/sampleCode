<?php
include 'apiDomain.php';
header("Content-Type:application/json");


session_start();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $url = "https://".$apiDomain.".".$apiUrl."./api/v1/applications/".$_GET['application_id']."/offer_clicked/wordpress?".$_SERVER['QUERY_STRING']."&secret_code=".$token;
    $response = file_get_contents($url);
    $response = json_decode($response);

    response($url, $response, 400);

}
 
     else{
        response($_SERVER['REQUEST_METHOD'], "Invalid Request", 400, );
    }

   


function response($order_id, $amount, $response_code){
	$response['order_id'] = $order_id;
	$response['data'] = $amount;
	$response['response_code'] = $response_code;
	
	$json_response = json_encode($response);
	echo $json_response;
}
?>