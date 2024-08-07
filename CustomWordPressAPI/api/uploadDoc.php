<?php
include 'apiDomain.php';

session_start();
    

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $data = $_POST['body'];
        $mydoc = $_POST['mydoc'];

        $headers = array("Content-Type:multipart/form-data");
        $fields = array(
            'mydoc[category]'=>($mydoc['category']),
            'product_key'=>($_REQUEST['product_key']),
            'mydoc[name]'=>($mydoc['name']),
            'mydoc[file]'=>(new \CurlFile($_FILES['file']["tmp_name"],$_FILES['file']['type'],$_FILES['file']['name'])),
            'user_id'=>($_REQUEST['user_id']),
            'secret_code'=>("1MgQjYCMLPspDZiMKmqjfuF7ojuV7yD3Mb"),
        );

         

        $curlHandle = curl_init();
        curl_setopt($curlHandle, CURLOPT_URL,"https://".$apiDomain.".".$apiUrl."./api/v1/mydocs/wordpress?secret_code=1MgQjYCMLPspDZiMKmqjfuF7ojuV7yD3Mb");
        curl_setopt($curlHandle, CURLOPT_POST, count($fields));
        curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $headers);

        $curlResponse = curl_exec($curlHandle);
        $response = json_decode($curlResponse);
        curl_close($curlHandle);

        response($response, $curlResponse , 200,);
    }else{
        response("Invalid Request", NULL, 400);
    }
    
    

function response($order_id, $amount, $response_code,){
	$response['order_id'] = $order_id;
	$response['data'] = $amount;
	$response['response_code'] = $response_code;
	
	$json_response = json_encode($response);
	echo $json_response;
}
?>