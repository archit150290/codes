<?php

App::uses('Component', 'Controller');

class AmpushApiComponent extends Component {

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
    
    
    /*
     * Do login to api
     */

    function _loginApi() {

        $loginUrl = $this->sourceDomain . $this->loginUrlOffset;
        $data = array('username' => $this->apiEmail, 'password' => $this->apiPassword);
        $response = $this->socket->post($loginUrl, $data);
        return $response;
    }

    public function callUrl($urlOffset, $queryParams = array()) {

        
        $queryString = count($queryParams)>0 ? '?' . http_build_query ($queryParams): '';
        $apiUrl = $this->sourceDomain . $urlOffset . $queryString;
        #echo '<br /><a style="color:blue;" target="_new" href="' . $apiUrl . '" >[', $apiUrl, ']</a><br /><br />';
        //echo '<b style="color:red;font-size:18pt">Service is not available, ask your Engineer: Dinesh Audichya</b>';
        //return false;
        return $this->curlget($apiUrl);
        /*
          $this->_loginApi($this->socket);
          $url = $this->sourceDomain . $urlOffset;
          $response = $this->socket->get($url, $queryString);
          $this->socket->__destruct();
          return $response;
         */
    }

    public function postUrl($urlOffset, $data) {
        echo 1;
        exit;
        if (!$this->Session->read('Ampush')) {
            $this->curlLogin();
            $tmpfname = $this->getCookiefile();
            $this->Session->write('Ampush', $tmpfname);
        }

        $apiUrl = $this->sourceDomain . $urlOffset;
        //echo '<br /><a style="color:blue;" target="_new" href="' . $apiUrl . '" >[', $apiUrl, ']</a><br /><br />';
        //echo '<b style="color:red;font-size:18pt">Service is not available, ask your Engineer: Dinesh Audichya</b>';
        //return false;
        return $this->curlpost($apiUrl, $data, true);
        /*
          $this->_loginApi($this->socket);
          $url = $this->sourceDomain . $urlOffset;
          $response = $this->socket->get($url, $queryString);
          $this->socket->__destruct();
          return $response;
         */
    }

    public function putUrl($urlOffset, $data) {

        if (!$this->Session->read('Ampush')) {
            $this->curlLogin();
            $tmpfname = $this->getCookiefile();
            $this->Session->write('Ampush', $tmpfname);
        }

        $apiUrl = $this->sourceDomain . $urlOffset;
        //echo '<br /><a style="color:blue;" target="_new" href="' . $apiUrl . '" >[', $apiUrl, ']</a><br /><br />';
        //echo '<b style="color:red;font-size:18pt">Service is not available, ask your Engineer: Dinesh Audichya</b>';
        //return false;
        return $this->curlput($apiUrl, $data, false);
        /*
          $this->_loginApi($this->socket);
          $url = $this->sourceDomain . $urlOffset;
          $response = $this->socket->get($url, $queryString);
          $this->socket->__destruct();
          return $response;
         */
    }

    function getCookiefile() {
        $cookieName = md5("5485as5d84sd5w834d5834sd3wd23d");
        //$cookieName = 'AMPUSH';
        $tmpfname = WWW_ROOT . 'wcookies/' . $cookieName . ".cc";
        if (!file_exists($tmpfname)) {
            $fh = fopen($tmpfname, "w");
            fwrite($fh, 'd');
            fclose($fh);
            chmod($tmpfname, 0777);
        }
        #echo $tmpfname;exit;
        return $tmpfname;
    }

    function curlLogin() {

        $loginUrl = $this->sourceDomain . $this->loginUrlOffset;
        $data = array('username' => $this->apiEmail, 'password' => $this->apiPassword);
        $val = $this->curlpost($loginUrl, $data, false, 'POST');
    }

    /**
     * Send post request via CURL
     * @param $apiurl STRING
     * @param $$dataapiurl ARRAY
     * 
     * @return ARRAY
     */
    function curlpost($apiurl, $data, $flagJson = false) {

        return $this->doCurlSubmit($apiurl, $data, $flagJson, 'POST');
    }

    /**
     * Send PUT request via CURL
     * @param $apiurl STRING
     * @param $$dataapiurl ARRAY
     * 
     * @return ARRAY
     */
    function curlput($apiurl, $data, $flagJson = false) {

        return $this->doCurlSubmit($apiurl, $data, $flagJson, 'PUT');
    }

    /**
     * Send post request via CURL
     * @param $apiurl STRING
     * @param $$dataapiurl ARRAY
     * 
     * @return ARRAY
     */
    function doCurlSubmit($apiurl, $data, $flagJson = false, $requestMethod = 'POST') {

        #echo $apiurl; //exit;
        $headers[] = "Accept: */*";
        $headers[] = "Connection: Keep-Alive";
        if ($requestMethod == 'PUT') {


            $headers[] = 'Content-Length: ' . strlen(http_build_query($data));
        }
        if (!$flagJson) {
            $headers[] = "Content-type: application/x-www-form-urlencoded; charset=UTF-8";
        } else {
            $header[] = "Content-type: application/json";
            //$header[] = "Content-Type:application/json";
        }

        //echo '<b style="color:red;font-size:18pt">Service is not available, ask your Engineer: Dinesh Audichya</b>';         return false;
        $cSession = curl_init();
        $tmpfname = $this->getCookiefile();
        curl_setopt($cSession, CURLOPT_COOKIEJAR, $tmpfname);
        curl_setopt($cSession, CURLOPT_COOKIEFILE, $tmpfname);

        curl_setopt($cSession, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($cSession, CURLOPT_COOKIESESSION, TRUE);
        //curl_setopt($cSession, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($cSession, CURLOPT_URL, $apiurl);
        if ($requestMethod != 'PUT') {
            curl_setopt($cSession, CURLOPT_POST, true);
        } else {
            //curl_setopt($cSession, CURLOPT_PUT, true);
            curl_setopt($cSession, CURLOPT_CUSTOMREQUEST, "PUT");

            //exit;
        }



        if (!$flagJson) {

            curl_setopt($cSession, CURLOPT_POSTFIELDS, http_build_query($data));
        } else {

            $dataJson = json_encode($data);
            $dataJson = str_replace('\\/', '/', $dataJson);
            curl_setopt($cSession, CURLOPT_POSTFIELDS, $dataJson);
        }
        //exit;
        curl_setopt($cSession, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($cSession, CURLOPT_SSL_VERIFYPEER, 0);

        ob_start();

        curl_exec($cSession);
        $result = ob_get_contents();
        ob_end_clean();
        if ($result === FALSE) {
            #echo "cURL Error: " . curl_error($cSession);             exit;
        }
        curl_close($cSession);
        #echo '<br />output: <br />';        var_dump($result); // exit;

        return $result;
    }

    function curlget($apiurl, $setCookie = false) {


        #echo "<br />",$apiurl,'<br />';
        //$action = trim($method);
        //$apiurl = $this->apiurl.$action."?apikey=".$this->apikey;


        $headers[] = "Accept: */*";
        $headers[] = "Connection: Keep-Alive";
        //$headers[] = "Content-type: application/x-www-form-urlencoded;charset=UTF-8";  

        $cSession = curl_init();
        if ($setCookie) {
            $tmpfname = $this->getCookiefile();
            curl_setopt($cSession, CURLOPT_COOKIEFILE, $tmpfname);
        }
        curl_setopt($cSession, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($cSession, CURLOPT_COOKIESESSION, TRUE);
        curl_setopt($cSession, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($cSession, CURLOPT_URL, $apiurl);
        curl_setopt($cSession, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($cSession, CURLOPT_SSL_VERIFYPEER, 0);
        //curl_setopt($cSession, CURLOPT_POST, true);
        //curl_setopt($cSession, CURLOPT_POSTFIELDS,http_build_query($data));
        $result = curl_exec($cSession);

        if ($result === FALSE) {
            //echo "cURL Error: " . curl_error($cSession);   exit;
        }

        curl_close($cSession);
        return $result;
    }


    function curlampget($apiurl) {
        $username = "otuser";
        $password = 'Ot-11Us_00SerPwd';
        #echo $apiurl; //exit;
        $headers = array();
        $headers[] = "Authorization: Basic " . base64_encode(sprintf('%s:%s', $username, $password));

        $headers[] = "Accept: */*";
        $headers[] = "Connection: Keep-Alive";

        $headers[] = "Content-type: multipart/form-data";

        //echo '<b style="color:red;font-size:18pt">Service is not available, ask your Engineer: Dinesh Audichya</b>';         return false;
        $cSession = curl_init();
        curl_setopt($cSession, CURLOPT_USERPWD, $username . ":" . $password);
        curl_setopt($cSession, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($cSession, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($cSession, CURLOPT_URL, $apiurl);

        //curl_setopt($cSession, CURLOPT_POST, true);
        //curl_setopt($cSession, CURLOPT_POSTFIELDS,http_build_query($data));
        $result = curl_exec($cSession);

        if ($result === FALSE) {
            echo "cURL Error: " . curl_error($cSession);
        }

        curl_close($cSession);
        return $result;
    }



    function multiGetRequest($data, $options = array()) {


        // array of curl handles
        $curly = array();
        // data to be returned
        $result = array();

        // multi handle
        $mh = curl_multi_init();
        $headers[] = "Accept: */*";
        $headers[] = "Connection: Keep-Alive";
        #$headers[] = "Cookie: " . $this->getToken();
        // loop through $data and create curl handles
        // then add them to the multi-handle
        foreach ($data as $id => $d) {

            $curly[$id] = curl_init();

            $url = (is_array($d) && !empty($d['url'])) ? $d['url'] : $d;

            curl_setopt($curly[$id], CURLOPT_URL, $url);
            curl_setopt($curly[$id], CURLOPT_HTTPHEADER, $headers);
            #curl_setopt($curly[$id], CURLOPT_COOKIESESSION, TRUE);
            curl_setopt($curly[$id], CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($curly[$id], CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($curly[$id], CURLOPT_SSL_VERIFYPEER, 0);
            curl_multi_add_handle($mh, $curly[$id]);
        }

        //execute the handles
        $running = null;
        do {
            curl_multi_exec($mh, $running);
        } while ($running > 0);



        // get content and remove handles
        foreach ($curly as $id => $c) {
            $result[$id] = json_decode(curl_multi_getcontent($c), true);
            curl_multi_remove_handle($mh, $c);
        }
        //pr($result);exit;
        // all done
        curl_multi_close($mh);
//        $mesg["date"] = strtotime($mesg["date"]);
//        $mesg["sellableslug"] = substr($mesg["sellableslug"],1);
        return $result;
    }

}
