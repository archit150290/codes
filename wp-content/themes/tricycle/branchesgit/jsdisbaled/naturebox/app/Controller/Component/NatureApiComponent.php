<?php

App::uses('Component', 'Controller');

class NatureApiComponent extends Component {

    public $components = array('Session');
    public $socket = false;
    #public $sourceDomain = 'https://sb2-qa1.ampush1.com/';
    public $sourceDomain = 'https://naturebox.com/nb_api/rest/';
    public $loginUrlOffset = 'account/login/';
    //api credentials
    public $apiEmail = '';
    public $apiPassword = '';
    public $allManagerList = false;
    public $masterToken = '';

    function __construct(ComponentCollection $collection, $settings = array()) {
        parent::__construct($collection, $settings);
        
        App::uses('HttpSocket', 'Network/Http'); // Cake 2.x
        
    }
    
    
function curlput($apiurl,$data, $authCode = '', $flagJson = false){

        //$data['apikey'] = "api2014arcgate";
        //$data['token'] = "ec7c31a4e6f16aad53369a623039264b";        
        //echo "<hr />PUT ";         echo $apiurl = $method;                  echo "<br /> ";
        //$apiurl = 'http://192.168.3.136/mobapi/api/'.$action;
        //$this->log($apiurl, 'debug');
        $headers[] = "Accept: */*";  
        $headers[] = "Connection: Keep-Alive";
        if($flagJson){
        $headers[] = "Content-Type: application/json; charset=UTF-8"; 
        }else{
            $headers[] = "Content-Type: text/html"; 
            	
        }
        if($authCode!='')
        $headers[] = "Authorization: Bearer $authCode";  
      //  $headers[] = "Accept-Encoding: gzip, deflate"; 
        
        
        $cSession = curl_init(); 
        $tmpfname = dirname(__FILE__).'/cookie.txt';
        curl_setopt($cSession, CURLOPT_COOKIEJAR, $tmpfname);
        curl_setopt($cSession, CURLOPT_COOKIEFILE, $tmpfname);
        curl_setopt($cSession, CURLOPT_HTTPHEADER,  $headers);
        curl_setopt($cSession, CURLOPT_COOKIESESSION, TRUE);
        curl_setopt($cSession, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($cSession, CURLOPT_URL,$apiurl);
        //curl_setopt($cSession, CURLOPT_POST, true);
        curl_setopt($cSession, CURLOPT_CUSTOMREQUEST, "PUT");

        curl_setopt($cSession, CURLOPT_POSTFIELDS,$data);
        
        
        $result = curl_exec($cSession);
        curl_close($cSession);
        return $result;

      
    }


function curlpost($apiurl,$data, $authCode = '', $flagJson = false){

        //$data['apikey'] = "api2014arcgate";
        //$data['token'] = "ec7c31a4e6f16aad53369a623039264b";        
        //echo "<hr />POST ";        echo $apiurl = $method;                 echo "<br /> ";
        //$apiurl = 'http://192.168.3.136/mobapi/api/'.$action;
        //$this->log($apiurl, 'debug');
        $headers[] = "Accept: */*";  
        $headers[] = "Connection: Keep-Alive";
        if($flagJson){
        $headers[] = "Content-Type: application/json; charset=UTF-8"; 
        }else{
            $headers[] = "Content-Type: text/html"; 
            	
        }
        if($authCode!=''){
        $headers[] = "Authorization: Bearer $authCode";  
        }
      //  $headers[] = "Accept-Encoding: gzip, deflate"; 
        //pr($data) ;        print_r($headers);
        
        $cSession = curl_init(); 
        $tmpfname = dirname(__FILE__).'/cookie.txt';
        curl_setopt($cSession, CURLOPT_COOKIEJAR, $tmpfname);
        curl_setopt($cSession, CURLOPT_COOKIEFILE, $tmpfname);
        curl_setopt($cSession, CURLOPT_HTTPHEADER,  $headers);
        curl_setopt($cSession, CURLOPT_COOKIESESSION, TRUE);
        curl_setopt($cSession, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($cSession, CURLOPT_URL,$apiurl);
        curl_setopt($cSession, CURLOPT_POST, true);
        curl_setopt($cSession, CURLOPT_POSTFIELDS,$data);
        
        
        $result = curl_exec($cSession);
        curl_close($cSession);
        return $result;

      
    }
    
function curlget($apiurl,$authCode = ''){
    
//        $data['apikey'] = "api2014arcgate";
//        $data['token'] = "ec7c31a4e6f16aad53369a623039264b";
        $apiurl = trim($apiurl);
       // echo "<hr />GET <br />",$apiurl;
        //$apiurl = $action.''.http_build_query($data);
        
        
        $headers[] = "Accept: */*";  
        $headers[] = "Connection: Keep-Alive";  
        $headers[] = "Content-type: application/json; charset=UTF-8"; 
        //$headers[] = "Accept-Encoding: gzip, deflat";  
        $headers[] = "Accept-Language: en-US,en;q=0.5";  
        $headers[] = "X-Requested-With: XMLHttpRequest";  
        $headers[] = "Host: naturebox.com";  
        
        //$headers[] = "Content-type: application/x-www-form-urlencoded;charset=UTF-8";  
        if($authCode!=''){
            //echo $authCode;
        $headers[] = "Authorization: Bearer $authCode";  
        }
        
        $headers[] = "User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:31.0) Gecko/20100101 Firefox/31.0";  
        $headers[] = "Referer: https://naturebox.com/checkout?sku=savvy_snacker_biweekly_50&product_ids=229,229,229,229,437";  
        
        //pr($headers);
        $cSession = curl_init(); 
        $tmpfname = dirname(__FILE__).'/cookie.txt';
        curl_setopt($cSession, CURLOPT_COOKIEFILE, $tmpfname);
        curl_setopt($cSession, CURLOPT_HTTPHEADER,  $headers);
        curl_setopt($cSession, CURLOPT_COOKIESESSION, TRUE);
        curl_setopt($cSession, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($cSession, CURLOPT_URL,$apiurl);
        //curl_setopt($cSession, CURLOPT_POST, true);
        //curl_setopt($cSession, CURLOPT_POSTFIELDS,http_build_query($data));
        $result = curl_exec($cSession);
        curl_close($cSession);
//        echo "<br />";
//        echo "<br />";
        //echo $result;         exit;
        return $result;      
    }

}
