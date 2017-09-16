<?php

class ApiController extends AppController {

    public $helpers = array('Html', 'Form');
    public $cachePrefix = "nature";
    public $nbUrl = "https://naturebox.com/";
    public $components = array("NatureApi","Session");

    public function beforeFilter() {
        parent::beforeFilter();
        $this->layout = 'ajax';
        $this->autoRender = false;
    }

    public function index($arg1 = '', $arg2 = '', $arg3 = '', $arg4 = '', $arg5 = '', $arg6 = '') {
        $urlParams = array() ;
        if($arg1!=""){
            $urlParams[] = $arg1;
        }
        if($arg2!=""){
            $urlParams[] = $arg2;
        }
        if($arg3!=""){
            $urlParams[] = $arg3;
        }
        if($arg4!=""){
            $urlParams[] = $arg4;
        }
        if($arg5!=""){
            $urlParams[] = $arg5;
        }
        if($arg6!=""){
            $urlParams[] = $arg6;
        }
        $q = http_build_query($this->request->query);
        if($q!=""){
            $q = "?".$q;
        }
        //echo $this->Session->read("access_token"); exit;
        $accessToken = "";
        $urlOffset = implode("/",$urlParams).$q;
        $data = $this->request->input ( 'json_decode', true) ;
        $url =$this->nbUrl.implode("/",$urlParams).$q;
        
        if($this->Session->check("access_token")){
                $accessToken = $this->Session->read("access_token");
            }
        if($this->request->is('post')){
            
            $response = json_decode($this->NatureApi->curlpost($url, json_encode($data), $accessToken, true), true);
            if(isset($response["access_token"])){
                $this->Session->write("access_token",$response["access_token"]);
            }
            $response = json_encode($response);
            
            
        }else if($this->request->is('put')){
            $response = $this->NatureApi->curlput($url, json_encode($data), $accessToken, true);
        }else{
            
            
            $response = $this->NatureApi->curlget($url, $accessToken);
        }
        
        
        
        //$response  = json_decode($response , true);
        
        $this->response->type('json');
        $this->response->body($response);
        
    }

    

//end
}
