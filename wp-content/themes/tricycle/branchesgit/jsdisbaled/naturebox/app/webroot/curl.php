<?php
set_time_limit(0);
ini_set('display_errors', 1);

$apiurl = 'http://54.210.61.191/analytics/api.php?owa_apiKey=d768fd7a6087bcd64148c65368f9f6e0&owa_do=getLatestActions&owa_startDate=0160517&owa_endDate=20160520&owa_siteId=78d470d7f2c03bcadd950f474d7c0245&owa_format=json&visitorID=1463723087881191824';
$res = json_decode(curlget($apiurl),true);
$actGroup = array();
foreach ($res['resultsRows'] as $key => $data) {
        $actGroup[$data['action_group']][] =  $data;
}
pr(array_keys($actGroup));
pr($actGroup);

function curlget($apiurl){


        //echo $apiurl = 'http://localhost/workmob/api/'.$action.'?'.http_build_query($data);
        
        
        $headers[] = "Accept: */*";  
        $headers[] = "Connection: Keep-Alive";  
        //$headers[] = "Content-type: application/x-www-form-urlencoded;charset=UTF-8";  
        
        $cSession = curl_init(); 
        curl_setopt($cSession, CURLOPT_HTTPHEADER,  $headers);
        curl_setopt($cSession, CURLOPT_COOKIESESSION, TRUE);
        curl_setopt($cSession, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($cSession, CURLOPT_URL,$apiurl);
        //curl_setopt($cSession, CURLOPT_POST, true);
        //curl_setopt($cSession, CURLOPT_POSTFIELDS,http_build_query($data));
        $result = curl_exec($cSession);
        curl_close($cSession);
        return $result;      
    }
function pr( $str ){
    echo "<pre>";
    print_r($str);
    echo "</pre>";
}