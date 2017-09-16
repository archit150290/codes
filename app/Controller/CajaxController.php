<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class CajaxController extends AppController {

    public $helpers = array('Html', 'Form');
    public $components = array("Common", 'Session', "Apicalls");

    public function beforeFilter() {
        parent::beforeFilter();
        $this->Auth->allow('sendTnC', 'StaticFormContactus');
    }

    function joinanorganization() {
        $this->loadModel("UserOrganization");
        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();
        $secretcode = $this->request->data["secretcode"];
        try {
            $postData = array("token" => $loggeduser["token"], "org_code" => $secretcode);
            $response = $this->Apicalls->curlpost("joinOrganization.json", $postData);
            $newdata = json_decode($response, true);
            $usertype = "existinguser";
            if ($newdata["result"]["status"] == true) {
                if (!isset($loggeduser["current_org"])) {
                    $usertype = "signupuser";
                    $currentOrg = (object) $newdata["result"]["data"]["Organization"];
                    $this->Session->write('Auth.User.current_org', $currentOrg);

                    $orgUpdates = array();
                    if ($newdata["result"]['data']['Organization']['status']) {
                        $orgUpdates['org_status'] = 'active';
                    } else {
                        $orgUpdates['org_status'] = 'inactive';
                    }

                    if ($newdata["result"]['isDefault'] && $newdata["result"]['isActive']) {
                        $orgUpdates['user_status'] = 'active';
                    } else {
                        $orgUpdates['user_status'] = 'inactive';
                    }

                    $this->Session->write('Auth.User.org_updates', $orgUpdates);

                    //$loggeduser["current_org"] = $newdata["result"]["data"]["Organization"];
                }
            }
            $result = array("response" => $response, "usertype" => $usertype);
            echo json_encode($result);
        } catch (Exception $e) {
            echo json_encode(array("data" => "", "msg" => $e));
        }
    }

    public function joinanorganizationforsignup() {
        $this->layout = "ajax";
        $this->autoRender = false;
        $loggedinUser = $this->Auth->User();
        $org_id = $this->request->data["org_id"];
        //=====api for myrole in organization
        $postdata = array("token" => $loggedinUser["token"], "org_id" => $org_id);
        $jsondata = $this->Apicalls->curlpost("getOrgoption.json", $postdata);
        $jsondatadecoded = json_decode($jsondata, true);

        $optionsselected = array("department_id" => 0, "entity_id" => 0, "job_title_id" => 0);
        $departments = array();
        $entities = array();
        $jobtitles = array();
        if ($jsondatadecoded["result"]["status"] == 1) {
            $resultant = $jsondatadecoded["result"]["data"];
            if (!empty($resultant["departments"])) {
                $departmentarray = $resultant["departments"];
                $departments = $this->Common->seettingkeyvalue($departmentarray);
            }
            if (!empty($resultant["entity"])) {
                $entityarray = $resultant["entity"];
                $entities = $this->Common->seettingkeyvalue($entityarray);
            }
            if (!empty($resultant["job_titles"])) {
                $job_titlesarray = $resultant["job_titles"];
                $jobtitles = $this->Common->seettingkeyvalue($job_titlesarray);
            }
            $optionsselected["department_id"] = $resultant["option_selected"]["department_id"];
            $optionsselected["entity_id"] = $resultant["option_selected"]["entity_id"];
            $optionsselected["job_title_id"] = $resultant["option_selected"]["job_title_id"];
        }
        $allexistinvalues = array("departments" => $departments, "entities" => $entities, "jobtitles" => $jobtitles);
        echo json_encode($allexistinvalues);
        //====end 
    }

    public function sendTnC() {
        $registeredEmail = $this->Session->read('register');
        if (!empty($registeredEmail)) {
            $postData = array("email" => $registeredEmail);
            echo $response = $this->Apicalls->curlget("sendtermconditions.json", $postData);
        } else {
            echo json_encode(array("result" => array("status" => false, "msg" => "Session expired. Please try again.")));
        }
        exit;
    }

    function likeendorse() {

        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();

        $endorseid = $this->request->data["endorseid"];
        $like = $this->request->data["like"];
        try {
            $postData = array("token" => $loggeduser["token"], "like" => $like, "e_id" => $endorseid);
            echo $response = $this->Apicalls->curlpost("endorselike.json", $postData);
        } catch (Exception $e) {
            echo json_encode(array("data" => "", "msg" => $e));
        }
    }

    function likepost() {

        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();

        $postid = $this->request->data["postid"];
        $like = $this->request->data["like"];
        try {
            $postData = array("token" => $loggeduser["token"], "like" => $like, "p_id" => $postid);
            echo $response = $this->Apicalls->curlpost("postlike.json", $postData);
        } catch (Exception $e) {
            echo json_encode(array("data" => "", "msg" => $e));
        }
    }

    function setDoNotRemind() {
        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();
        $status = 1;
        if (isset($this->request->data["status"])) {
            $status = $this->request->data["status"];
        }
        try {
            $postData = array("token" => $loggeduser["token"], "status" => $status,);
            echo $response = $this->Apicalls->curlpost("setDoNotRemindMe.json", $postData);
            $this->Session->write('Auth.User.do_not_remind', 1);
        } catch (Exception $e) {
            echo json_encode(array("data" => "", "msg" => $e));
        }
    }

    function deletepost() {

        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();
        $postid = $this->request->data["postid"];
        try {
            $postData = array("token" => $loggeduser["token"], "p_id" => $postid);
            echo $response = $this->Apicalls->curlpost("postdelete.json", $postData);
        } catch (Exception $e) {
            echo json_encode(array("data" => "", "msg" => $e));
        }
    }

    // endorse statesearch
    function getstatesearch() {

        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();
        $postData = array("token" => $loggeduser["token"]);

        if (isset($this->request->data["start_date"]) && trim($this->request->data["start_date"]) != "") {
            // echo $this->request->data["start_date"];
            $startdate = explode("-", $this->request->data["start_date"]);
            $startdate = mktime(0, 0, 0, $startdate[0], $startdate[1], $startdate[2]);
            $postData["start_date"] = $startdate;
        }
        if (isset($this->request->data["end_date"]) && trim($this->request->data["end_date"]) != "") {
            // echo $this->request->data["end_date"];
            $enddate = explode("-", $this->request->data["end_date"]);
            $enddate = mktime(0, 0, 0, $enddate[0], $enddate[1], $enddate[2]);
            $postData["end_date"] = $enddate;
        }

        // print_r($postData);


        try {

            $jsondata = $this->Apicalls->curlpost("endorsestats.json", $postData);


            $jsondatadecoded = json_decode($jsondata, true);
            if ($jsondatadecoded["result"]["status"]) {
                $endorsedatadata = $jsondatadecoded["result"]["data"];


                $this->set('statesdata', $endorsedatadata);




                echo $htmlstring = $this->render('/Elements/endorsestats');
            } else {
                echo "";
            }

            exit;
        } catch (Exception $e) {
            echo json_encode(array("data" => "", "msg" => $e));
        }
    }

    // end
    // get chart core value search
    function getchartsearch() {

        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();
        $postData = array("token" => $loggeduser["token"], "web" => 1);


        if (isset($this->request->data["start_date"]) && trim($this->request->data["start_date"]) != "") {
            // echo $this->request->data["start_date"];
            $startdate = explode("-", $this->request->data["start_date"]);
            $startdate = mktime(0, 0, 0, $startdate[0], $startdate[1], $startdate[2]);
            $postData["start_date"] = $startdate;
        }
        if (isset($this->request->data["end_date"]) && trim($this->request->data["end_date"]) != "") {
            // echo $this->request->data["end_date"];
            $enddate = explode("-", $this->request->data["end_date"]);
            $enddate = mktime(0, 0, 0, $enddate[0], $enddate[1], $enddate[2]);
            $postData["end_date"] = $enddate;
        }

        // print_r($postData);


        try {

            $jsondata = $this->Apicalls->curlpost("endorsementbycorevalues.json", $postData);


            $jsondatadecoded = json_decode($jsondata, true);

            if ($jsondatadecoded["result"]["status"]) {
                $endorsedatadata = $jsondatadecoded["result"]["data"];

                $this->set('graphbycorevalues', $endorsedatadata);


                $this->set('chartdata', $endorsedatadata);
                echo $htmlstring = $this->render('/Elements/endorsecharts');
            } else {
                echo "";
            }

            exit;
        } catch (Exception $e) {
            echo json_encode(array("data" => "", "msg" => $e));
        }
    }

    // end

    function getendorse() {

        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();

        $page = $this->request->data["page"];
        $type = $this->request->data["type"];
        try {
            $postData = array("token" => $loggeduser["token"], "type" => $type, "page" => $page);
            $jsondata = $this->Apicalls->curlpost("getEndorseList.json", $postData);
            $jsondatadecoded = json_decode($jsondata, true);
            if ($jsondatadecoded["result"]["status"]) {
                $endorsedatadata = $jsondatadecoded["result"]["data"];
                $this->set('endorsedata', $endorsedatadata["endorse_data"]);
                $this->set('total_page', $endorsedatadata["total_page"]);

                echo $htmlstring = $this->render('/Elements/endorsedata');
            } else {
                echo "";
            }

            exit;
        } catch (Exception $e) {
            echo json_encode(array("data" => "", "msg" => $e));
        }
    }

    function getendorsespecifice() {

        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();

        $e_id = $this->request->data["endorser_id"];
        $type = $this->request->data["endorser_type"];
        $pagetype = $this->request->data["type"];
        $page = $this->request->data["page"];

        try {

            $postData = array("token" => $loggeduser["token"], "endorse_type" => $type, "endorse_id" => $e_id, "type" => $pagetype, "page" => $page);
            // print_r($postData);

            $jsondata = $this->Apicalls->curlpost("getEndorseList.json", $postData);

            $jsondatadecoded = json_decode($jsondata, true);
            if ($jsondatadecoded["result"]["status"]) {
                $endorsedatadata = $jsondatadecoded["result"]["data"];

                $this->set('total_page', $endorsedatadata["total_page"]);
                $this->set('endorsedata', $endorsedatadata["endorse_data"]);


                echo $htmlstring = $this->render('/Elements/endorsedata');
            } else {
                echo "";
            }

            exit;
        } catch (Exception $e) {
            echo json_encode(array("data" => "", "msg" => $e));
        }
    }

    function getendorsedatesearch() {

        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $loggedinUser = $this->Auth->User();

        $postData = array("token" => $loggeduser["token"]);
        if (isset($this->request->data["endorser_id"]) && $this->request->data["endorser_id"] > 0) {
            $e_id = $this->request->data["endorser_id"];
            $postData["endorse_id"] = $e_id;
        }
        if (isset($this->request->data["endorser_type"])) {
            $postData["endorse_type"] = $this->request->data["endorser_type"];
        }
        if (isset($this->request->data["type"])) {
            $postData["type"] = $this->request->data["type"];
        }
        if (isset($this->request->data["page"])) {
            $postData["page"] = $this->request->data["page"];
        }
        if (isset($this->request->data["start_date"]) && trim($this->request->data["start_date"]) != "") {
            // echo $this->request->data["start_date"];
            $startdate = explode("-", $this->request->data["start_date"]);
            $startdate = mktime(0, 0, 0, $startdate[0], $startdate[1], $startdate[2]);
            $postData["start_date"] = $startdate;
        }
        if (isset($this->request->data["end_date"]) && trim($this->request->data["end_date"]) != "") {
            // echo $this->request->data["end_date"];
            $enddate = explode("-", $this->request->data["end_date"]);
            $enddate = mktime(0, 0, 0, $enddate[0], $enddate[1], $enddate[2]);
            $postData["end_date"] = $enddate;
        }
        //pr($postData);
        try {
            //$jsondata = $this->Apicalls->curlpost("getEndorseList.json", $postData);

            if (isset($postData["endorse_type"]) && $postData["endorse_type"] == 'post_title') {
                $postData['feed_id'] = $postData["endorse_id"];
                $postData['feed_type'] = 'post';
            } else {
                
            }
            //pr($postData); exit;

            $jsondata = $this->Apicalls->curlpost("getLiveFeeds.json", $postData);
            //pr($jsondata); //exit;
            $jsondatadecoded = json_decode($jsondata, true);
            if ($jsondatadecoded["result"]["status"]) {
                $endorsedatadata = $jsondatadecoded["result"]["data"];
                //pr($endorsedatadata);
                $user_id = $loggedinUser["id"];
                $user_role = $loggedinUser["role"];
                $user_do_not_remind = $loggedinUser["do_not_remind"];

                $this->set('logged_user_id', $user_id);
                $this->set('user_role', $user_role);
                $this->set('user_do_not_remind', $user_do_not_remind);

                $this->set('total_page', $endorsedatadata["total_page"]);
                $this->set('endorsedata', $endorsedatadata["endorse_data"]);
                $this->set('servertime', $endorsedatadata["server_time"]);
                echo $htmlstring = $this->render('/Elements/endorsedata');
            } else {
                echo "";
            }

            exit;
        } catch (Exception $e) {
            echo json_encode(array("data" => "", "msg" => $e));
        }
    }

    function endorsesearch() {

        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();

        $keyword = $this->request->data["keyword"];
        $search_self = false;
        if (isset($this->request->data["search_self"])) {
            $search_self = $this->request->data["search_self"];
        }

        try {
            $postData = array("token" => $loggeduser["token"], "search_self" => $search_self, "keyword" => $keyword);
            $jsondataresult = $this->Apicalls->curlpost("searchInOrganization.json", $postData);
            //pr($jsondataresult); exit;
            $jsondatadecoded = json_decode($jsondataresult, true);
            //print_r($jsondatadecoded);
            if ($jsondatadecoded["result"]["status"]) {
                //$endorsedatadata = $jsondatadecoded["result"]["data"];
                //$this->set('endorsedata', $endorsedatadata["endorse_data"]);
                //
                echo $jsondataresult;
                //echo $htmlstring = $this->render('/Elements/endorsedata');
            } else {
                echo "";
            }

            exit;
        } catch (Exception $e) {
            echo json_encode(array("data" => "", "msg" => $e));
        }
    }

    function endorsereply() {

        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();

        $e_id = $this->request->data["eid"];
        $reply = $this->request->data["reply"];


        try {
            $postData = array("token" => $loggeduser["token"], "e_id" => $e_id, "reply" => $reply);
            $jsondataresult = $this->Apicalls->curlpost("endorsereply.json", $postData);
            $jsondatadecoded = json_decode($jsondataresult, true);
            //print_r($jsondatadecoded);
            if ($jsondatadecoded["result"]["status"]) {
                //$endorsedatadata = $jsondatadecoded["result"]["data"];
                //$this->set('endorsedata', $endorsedatadata["endorse_data"]);
                echo $jsondataresult;

                //echo $htmlstring = $this->render('/Elements/endorsedata');
            } else {
                echo $jsondataresult;
            }

            exit;
        } catch (Exception $e) {
            echo json_encode(array("data" => "", "msg" => $e));
        }
    }

    function moreorganizationsJoinorg() {
        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();
        $pageval = $this->request->data["pageval"];
        $type = $this->request->data["type"];
        $postdata = array("token" => $loggeduser["token"], "type" => $type, "limit" => 15, "page" => $pageval + 1);
        $jsondata = $this->Apicalls->curlpost("getAllOrganization.json", $postdata);
        $jsondatadecoded = json_decode($jsondata, true);
        //$totalpages = $jsondatadecoded["result"]["data"]["total_page"];
        //$orgdata = isset($jsondatadecoded["result"]["data"]) ? $jsondatadecoded["result"]["data"] : $jsondatadecoded["result"]["msg"];
        if (isset($jsondatadecoded["result"]["data"])) {
            $orgdata = $jsondatadecoded["result"]["data"];
        } else {
            $this->Session->setFlash(__($jsondatadecoded["result"]["msg"]), 'default', array('class' => 'alert alert-warning'));
            $this->redirect($this->Auth->logout());
        }
        if (isset($loggeduser["current_org"]) && !empty($loggeduser["current_org"])) {
            $defaultorg = $loggeduser["current_org"]->id;
        }
        $this->set(compact("orgdata", "type", "defaultorg"));
        $htmlstring = $this->render('/Elements/corganizationslisting');
    }

    function joinrequestorg() {
        $this->layout = "ajax";
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();
        $orgid = $this->request->data["orgid"];
        $postdata = array("token" => $loggeduser["token"], "org_id" => $orgid);
        echo $jsondata = $this->Apicalls->curlpost("JoinReqOrg.json", $postdata);
    }

    function searchorg() {
        try {
            $this->layout = 'ajax';
            $this->autoRender = false;
            $loggeduser = $this->Auth->User();
            $searchvalue = $this->request->data["searchvalue"];
            $postdata = array("token" => $loggeduser["token"], "keyword" => $searchvalue);
            echo $jsondata = $this->Apicalls->curlpost("getOrgSearch.json", $postdata);
            exit;
        } catch (Exception $e) {
            
        }
    }

    public function searchInOrg() {
//        pr($this->request->data);die;
        $this->layout = "ajax";
        $loggedinUser = $this->Auth->User();
        $this->set("endorsementLimit", $this->request->data['limit']);

        $postData = array();
        $postData['token'] = $loggedinUser['token'];
        $postData['keyword'] = $this->request->data['keyword'];
        $postData['searchSelf'] = false;
        $response = $this->Apicalls->curlpost("searchInOrganization.json", $postData);
        $response = json_decode($response);
        $response = $response->result;
//        pr($response);die;
        $this->set("searchResult", $response->data);
        if (isset($this->request->data['endorseSelected'])) {
            $this->set('endorseSelected', $this->request->data['endorseSelected']);
        }
    }

    function livesearcheddata() {
        try {
            $this->layout = 'ajax';
            $this->autoRender = false;
            $loggeduser = $this->Auth->User();
            $orgid = $this->request->data["orgid"];
            $type = $this->request->data["type"];
            $postdata = array("token" => $loggeduser["token"], "org_id" => $orgid, "type" => "public");
            $jsondata = $this->Apicalls->curlpost("getAllOrganization.json", $postdata);
            $jsondecodeddata = json_decode($jsondata, true);
            if (isset($jsondecodeddata["result"]["data"])) {
                $orgdata = $jsondecodeddata["result"]["data"];
            } else {
                $this->Session->setFlash(__($jsondecodeddata["result"]["msg"]), 'default', array('class' => 'alert alert-warning'));
                $this->redirect($this->Auth->logout());
            }
            //=======0th element as it will be a single organization
            $this->set(compact("orgdata", "type"));
            echo $htmlstring = $this->render('/Elements/corganizationslisting');
            exit;
        } catch (Exception $e) {
            
        }
    }

    function showallorg() {
        try {
            $this->layout = 'ajax';
            $this->autoRender = false;
            $loggeduser = $this->Auth->User();
            $type = $this->request->data["type"];
            $postdata = array("token" => $loggeduser["token"], "type" => "public", "limit" => 15);
            $jsondata = $this->Apicalls->curlpost("getAllOrganization.json", $postdata);
            $jsondecodeddata = json_decode($jsondata, true);
            if (isset($jsondecodeddata["result"]["data"])) {
                $orgdata = $jsondecodeddata["result"]["data"];
            } else {
                $this->Session->setFlash(__($jsondecodeddata["result"]["msg"]), 'default', array('class' => 'alert alert-warning'));
                $this->redirect($this->Auth->logout());
            }
            //=======0th element as it will be a single organization
            $this->set(compact("orgdata", "type"));
            echo $htmlstring = $this->render('/Elements/corganizationslisting');
            exit;
        } catch (Exception $e) {
            
        }
    }

    function switchorg() {
        try {
            $this->layout = 'ajax';
            $this->autoRender = false;
            $loggeduser = $this->Auth->User();
            $orgid = $this->request->data["orgid"];
            $postdata = array("token" => $loggeduser["token"], "org_id" => $orgid);
            echo $jsondata = $this->Apicalls->curlpost("switchGroup.json", $postdata);
            $jsondecodeddata = json_decode($jsondata, true);
            if ($jsondecodeddata["result"]["status"] == true) {
                $currentOrg = (object) $jsondecodeddata["result"]["data"]["Organization"];
                $this->Session->write('Auth.User.current_org', $currentOrg);
            }
            exit;
        } catch (Exception $e) {
            
        }
    }

    function changerolesfororg() {
        try {
            $this->layout = 'ajax';
            $this->autoRender = false;
            $loggeduser = $this->Auth->User();
            $orgid = $this->request->data["orgid"];
            $roles = json_decode($this->request->data["jsonencodedroles"]);
            $postdata = array(
                "token" => $loggeduser["token"],
                "org_id" => $orgid,
                "department_id" => $roles->department_id,
                "entity_id" => $roles->entity_id,
                "job_title_id" => $roles->job_title_id,
            );
            echo $jsondata = $this->Apicalls->curlpost("saveOrgoption.json", $postdata);
            exit;
        } catch (Exception $e) {
            
        }
    }

    public function timelyUpdate() {
        $loggedinUser = $this->Auth->user();
        $portal = $this->Cookie->read("portal_cookie");
        if (!$this->Session->check('Auth.User') || $portal != 'client') {
            echo json_encode(array("status" => false, "portal" => $portal));
            exit;
        }

        $showMsg = false;

        if (isset($loggedinUser['current_org'])) {
            $postdata['token'] = $loggedinUser['token'];
            $apiResponse = $this->Apicalls->curlpost("getTimelyUpdates.json", $postdata);
            $response = json_decode($apiResponse);
            $response->noData = false;

            if (!empty($response) && isset($response->result)) {
                $response = $response->result;


                if ($response->status && !empty($response->data)) {
                    $currentOrgStatus = $loggedinUser['org_updates']['org_status'];
                    $currentUserStatus = $loggedinUser['org_updates']['user_status'];

                    if (($currentOrgStatus != $response->data->org_updates->org_status) || ($currentUserStatus != $response->data->org_updates->user_status)) {
                        $orgUpdates = array();
                        $orgUpdates['org_status'] = $response->data->org_updates->org_status;
                        $orgUpdates['user_status'] = $response->data->org_updates->user_status;
                        $this->Session->write('Auth.User.org_updates', $orgUpdates);
                        $showMsg = true;
                    }

                    if ($response->data->org_updates->user_role_changed == true) {
                        $showMsg = true;
                        $response->data->org_updates->msg = "Your role is updated by admin. Now you are an " . $response->data->org_updates->user_role . ".";
                    }
                } else {
                    $response->noData = true;
                }
            } else {
                echo $apiResponse;
                die;
            }
        } else {
            $response = new stdClass();
            $response->status = true;
            $response->noData = true;
        }

        $response->show_msg = $showMsg;
//        $response->user = $loggedinUser;
        $response->portal = $portal;

        echo json_encode($response);
        exit;
    }

    function getdataleaderboard() {
        $this->layout = 'ajax';
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();
        $type = $this->request->data["type"];
        $startdate = "";
        $enddate = "";
        if (isset($this->request->data["startdate"]) && isset($this->request->data["enddate"])) {
            $startdate = explode("-", $this->request->data["startdate"]);
            $startdate = mktime(0, 0, 0, $startdate[0], $startdate[1], $startdate[2]);
            if ($this->request->data["enddate"] != "") {
                $enddate = explode("-", $this->request->data["enddate"]);
                $enddate = mktime(0, 0, 0, $enddate[0], $enddate[1], $enddate[2]);
            }
        }

        $postdata = array("token" => $loggeduser["token"], "type" => $type, "start_date" => $startdate, "end_date" => $enddate);
        $jsondatafororginfo = json_decode($this->Apicalls->curlpost("leaderboard.json", $postdata), true);
        $alldata = array();
        if ($jsondatafororginfo["result"]["status"] == 1) {
            $resultant = $jsondatafororginfo["result"];
            $alldata = $resultant["data"];
        }
        $leaderboardtype = "nDorser";
        if ($type == "endorsed") {
            $leaderboardtype = "nDorsed";
        }
        $this->set(compact("alldata", "leaderboardtype"));
        $htmlstring = $this->render('/Elements/leaderboarddataclient');
    }

    function getwhatsnewdata() {
        $this->layout = 'ajax';
        $this->autoRender = false;
        $loggeduser = $this->Auth->User();
        $month = $this->request->data["month"];
        $year = $this->request->data["year"];
        $postdata = array("token" => $loggeduser["token"], "month" => $month, "year" => $year);
        $jsondata = json_decode($this->Apicalls->curlpost("topendorse.json", $postdata), true);
        $alldata = array();
        if ($jsondata["result"]["status"]) {
            $alldata = $jsondata["result"]["data"];
        }
        $this->set(compact("alldata"));
        $htmlstring = $this->render('/Elements/whatsnewdata');
    }

    function StaticFormContactus() {
        $this->layout = 'ajax';
        $this->autoRender = false;
        //$loggeduser = $this->Auth->User();
        $name = $this->request->data["name"];
        $email = $this->request->data["email"];
        $subject = $this->request->data["subject"];
        $message = $this->request->data["message"];
        $json = '{"ticket": {"requester": {"name": "' . $name . '", "email": "' . $email . '"}, "subject": "' . $subject . '", "comment": { "body": "' . $message . '" }}}';
        $data = $this->Apicalls->curlWrap("/tickets.json", $json, "POST");
        if (isset($data->ticket)) {
            echo "Success";
        }
        exit;
    }

    public function acceptTnC() {
        $loggedinUser = $this->Auth->user();
        $postData = array("token" => $loggedinUser['token']);
        $response = $this->Apicalls->curlpost("acceptTnC.json", $postData);
        $response = json_decode($response);
        $response = $response->result;

        if ($response->status) {
            $this->Session->write('Auth.User.terms_accept', 1);
        }
        echo json_encode(array("success" => $response->status, "msg" => $response->msg));
        exit;
    }

    public function acceptRequestUpdate() {
        $loggedinUser = $this->Auth->user();
        $postdata['token'] = $loggedinUser['token'];
        $response = $this->Apicalls->curlpost("getAcceptedRequests.json", $postdata);
        $response = json_decode($response);

        if ($response->result->status) {
            if ($response->result->type == 'request') {
                $response->result->showMsg = true;
            } else {
                if (!isset($loggedinUser['current_org']) || empty($loggedinUser['current_org'])) {
                    $response->result->showMsg = true;
                } else {
                    $response->result->showMsg = false;
                }
            }
        } else {
            $response->result->showMsg = false;
        }

        if (!isset($loggedinUser['current_org']) || empty($loggedinUser['current_org'])) {
            $currentOrg = $response->result->data;
            if (!empty($currentOrg)) {
                $this->Session->write('Auth.User.current_org', $currentOrg);
                $this->Session->write('Auth.User.org_updates', (array) $response->result->org_updates);
            }
        }
        echo json_encode($response);
        exit();
//        $response = json_decode($response);
//        $response = $response->result;
    }

}
