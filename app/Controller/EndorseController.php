<?php

class EndorseController extends AppController {

    public $components = array('RequestHandler', "Auth", "Common", "Session", "Apicalls");

    public function beforeFilter() {

        parent::beforeFilter();
        $this->layout = "clientlayout";
        $this->Auth->deny();
        $loggedinUser = $this->Auth->user();

        if (isset($loggedinUser['org_updates']) && ($loggedinUser['org_updates']['org_status'] != 'active' || $loggedinUser['org_updates']['user_status'] != "active")) {
            $this->redirect(array('controller' => 'client', 'action' => 'inactiveOrg'));
        }
    }

    public function beforeRender() {
        $loggedinUser = $this->Auth->user();
        if ($loggedinUser['current_org']->joined == 0) {
            $currentOrg = $loggedinUser['current_org'];
            $currentOrg->joined = 1;
            $this->Session->write('Auth.User.current_org', $currentOrg);
        }
    }

    public function index() {
        $loggedinUser = $this->Auth->user();
        if ($this->Session->check('Auth.User')) {
            if (isset($loggedinUser['current_org'])) {
                $postdata = array("token" => $loggedinUser["token"], "type" => "public");
                //$jsondata = $this->Apicalls->curlpost("getEndorseList.json", $postdata);
                $jsondata = $this->Apicalls->curlpost("getLiveFeeds.json", $postdata);
//                pr($jsondata); exit;
                $jsondatadecoded = json_decode($jsondata, true);
                
                $user_id = $loggedinUser["id"];
                $user_role = $loggedinUser["role"];
                $user_do_not_remind = $loggedinUser["do_not_remind"];
                
                if ($jsondatadecoded["result"]["status"]) {
                    $endorsedatadata = $jsondatadecoded["result"]["data"];
                    $this->set('endorsedata', $endorsedatadata["endorse_data"]);
                    $this->set('endorsepage', $endorsedatadata["total_page"]);
                    $this->set('servertime', $endorsedatadata["server_time"]);
                    $this->set('logged_user_id', $user_id);
                    $this->set('user_role', $user_role);
                    $this->set('user_do_not_remind', $user_do_not_remind);
                } else {
                    $errormsg = $jsondatadecoded["result"]["msg"];
                    $this->Session->write('error', $errormsg);
                    $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
                }
            } else {

                $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
            }
        } else {
            $this->redirect(array('controller' => 'client', 'action' => 'login'));
        }

        $this->set('jsIncludes', array('endorse'));
        $this->set('addEndorse', true);
        $this->set('MenuName', 'Live Feed');
        $this->set("alertMsg", $loggedinUser['org_updates']['msg']);
    }

    public function ndorse() {
        $loggedinUser = $this->Auth->user();
        if ($this->Session->check('Auth.User')) {

            if (isset($loggedinUser['current_org'])) {
                $postdata = array("token" => $loggedinUser["token"], "type" => "endorser");
                $jsondata = $this->Apicalls->curlpost("getEndorseList.json", $postdata);
                $jsondatadecoded = json_decode($jsondata, true);
                if ($jsondatadecoded["result"]["status"]) {
                    $endorsedatadata = $jsondatadecoded["result"]["data"];
                    $this->set('endorsedata', $endorsedatadata["endorse_data"]);
                    $this->set('endorsepage', $endorsedatadata["total_page"]);
                    $this->set('servertime', $endorsedatadata["server_time"]);
                } else {
                    $errormsg = $jsondatadecoded["result"]["msg"];
                    $this->Session->write('error', $errormsg);
                    $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
                }
            } else {
                $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
            }
        } else {
            $this->redirect(array('controller' => 'client', 'action' => 'login'));
        }

        $this->set('jsIncludes', array('endorse'));
        $this->set('MenuName', 'nDorser');
        $this->set('addEndorse', true);
    }

    public function ndorsed() {
        $loggedinUser = $this->Auth->user();
        if ($this->Session->check('Auth.User')) {

            if (isset($loggedinUser['current_org'])) {
                $postdata = array("token" => $loggedinUser["token"], "type" => "endorsed");
                $jsondata = $this->Apicalls->curlpost("getEndorseList.json", $postdata);
                $jsondatadecoded = json_decode($jsondata, true);
                if ($jsondatadecoded["result"]["status"]) {
                    $endorsedatadata = $jsondatadecoded["result"]["data"];
                    $this->set('endorsedata', $endorsedatadata["endorse_data"]);
                    $this->set('endorsepage', $endorsedatadata["total_page"]);
                    $this->set('servertime', $endorsedatadata["server_time"]);
                } else {
                    $errormsg = $jsondatadecoded["result"]["msg"];
                    $this->Session->write('error', $errormsg);
                    $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
                }
            } else {
                $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
            }
        } else {
            $this->redirect(array('controller' => 'client', 'action' => 'login'));
        }

        $this->set('jsIncludes', array('endorse'));
        $this->set('addEndorse', true);
        $this->set('MenuName', 'nDorsed');
    }

    public function details($id) {

        $loggedinUser = $this->Auth->user();
        if ($this->Session->check('Auth.User')) {

            if (isset($loggedinUser['current_org'])) {
                $postdata = array("token" => $loggedinUser["token"], "e_id" => $id);
                $jsondata = $this->Apicalls->curlpost("endorsedetails.json", $postdata);
                $jsondatadecoded = json_decode($jsondata, true);

                if ($jsondatadecoded["result"]["status"]) {
                    $endorsedatadata = $jsondatadecoded["result"]["data"];

                    $user_id = $loggedinUser["id"];
                    $this->set('endorsedata', $endorsedatadata);
                    $this->set('logged_user_id', $user_id);
                    //print_r($endorsedatadata);exit;
                } else {
                    $errormsg = $jsondatadecoded["result"]["msg"];
                    $this->Session->write('error', $errormsg);
                    $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
                }
            } else {
                $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
            }
        } else {
            $this->redirect(array('controller' => 'client', 'action' => 'login'));
        }

        $this->set('jsIncludes', array('endorse_details'));
        $this->set('addEndorse', true);
        $this->set('MenuName', 'nDorsement Detail');
    }

    // endorse stats
    public function stats() {
        $loggedinUser = $this->Auth->user();
        if ($this->Session->check('Auth.User')) {

            if (isset($loggedinUser['current_org'])) {

                $postdata = array("token" => $loggedinUser["token"]);
                $jsondata = $this->Apicalls->curlpost("endorsestats.json", $postdata);
                $jsondatadecoded = json_decode($jsondata, true);

                if ($jsondatadecoded["result"]["status"]) {
                    $endorsedatadata = $jsondatadecoded["result"]["data"];
                    $this->set('statesdata', $endorsedatadata);
                    $this->set('profiledata', $loggedinUser);
                } else {
                    $errormsg = $jsondatadecoded["result"]["msg"];
                    $this->Session->write('error', $errormsg);
                    $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
                }
            } else {
                $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
            }
        } else {
            $this->redirect(array('controller' => 'client', 'action' => 'login'));
        }

        $this->set('jsIncludes', array('endorse_stats'));
        $this->set('addEndorse', true);

        $this->set('MenuName', 'nDorsements');
    }

    public function charts() {
        $loggedinUser = $this->Auth->user();
        if ($this->Session->check('Auth.User')) {

            if (isset($loggedinUser['current_org'])) {

                $postdata = array("token" => $loggedinUser["token"]);
                $jsondata = $this->Apicalls->curlpost("endorsestats.json", $postdata);
                $jsondatadecoded = json_decode($jsondata, true);

                if ($jsondatadecoded["result"]["status"]) {
                    $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1, "type" => "user");
                    $startdate = "";
                    $enddate = "";

                    if (1) {

                        $enddate = $startdate = "";
                        if (isset($this->request->data["daterange"]["startdate"]) && $this->request->data["daterange"]["startdate"] != "") {
                            $startdate = $this->request->data["daterange"]["startdate"];
                        }
                        if (isset($this->request->data["daterange"]["enddate"]) && $this->request->data["daterange"]["enddate"] != "") {
                            $enddate = $this->request->data["daterange"]["enddate"];
                        }

                        if ($startdate != "" && $enddate != "") {
                            $startdatenew = explode("-", $this->request->data["daterange"]["startdate"]);
                            $enddatenew = explode("-", $this->request->data["daterange"]["enddate"]);
                            $startdatenew = mktime(0, 0, 0, $startdatenew[0], $startdatenew[1], $startdatenew[2]);
                            $enddatenew = mktime(0, 0, 0, $enddatenew[0], $enddatenew[1], $enddatenew[2]);
                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1, "start_date" => $startdatenew, "end_date" => $enddatenew, "type" => "user");
                        } elseif ($startdate != "") {
                            $startdatenew = explode("-", $this->request->data["daterange"]["startdate"]);

                            $startdatenew = mktime(0, 0, 0, $startdatenew[0], $startdatenew[1], $startdatenew[2]);

                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1, "start_date" => $startdatenew, "type" => "user");
                        } else {
                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1, "type" => "user");
                        }
                    }
                    $org_id = $loggedinUser["current_org"]->id;
                    $alldetailsorg = $this->Common->OrgInfoClient($loggedinUser["token"], $org_id);
                    $jsondataforgraph = json_decode($this->Apicalls->curlpost("endorsementbycorevalues.json", $postdataforgraph), true);

                    $graphbycorevalues = "";
                    if ($jsondataforgraph["result"]["status"] == 1) {
                        $graphbycorevalues = $jsondataforgraph["result"]["data"];

                        $this->set('jsIncludes', array('endorse_charts'));
                        $this->set('graphbycorevalues', $graphbycorevalues);
                    } else {
                        $graphbycorevalues = "";

                        $this->set('jsIncludes', array('endorse_charts'));
                        $this->set('graphbycorevalues', $graphbycorevalues);
                    }
                    $this->set('alldetailsorg', $alldetailsorg);
                } else {
                    $errormsg = $jsondatadecoded["result"]["msg"];
                    $this->Session->write('error', $errormsg);
                    $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
                }
            } else {
                $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
            }
        } else {
            $this->redirect(array('controller' => 'client', 'action' => 'login'));
        }

        $this->set('jsIncludes', array('endorse_charts'));
        $this->set('addEndorse', true);
        $this->set('MenuName', 'nDorsement By Core Values');
    }

// nDorsement by Department
    public function departments() {
        $loggedinUser = $this->Auth->user();
        if ($this->Session->check('Auth.User')) {

            if (isset($loggedinUser['current_org'])) {

                $postdata = array("token" => $loggedinUser["token"]);
                $jsondata = $this->Apicalls->curlpost("endorsestats.json", $postdata);
                $jsondatadecoded = json_decode($jsondata, true);

                if ($jsondatadecoded["result"]["status"]) {
                    $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1);
                    $startdate = "";
                    $enddate = "";

                    if (1) {

                        $enddate = $startdate = "";
                        if (isset($this->request->data["daterange"]["startdate"]) && $this->request->data["daterange"]["startdate"] != "") {
                            $startdate = $this->request->data["daterange"]["startdate"];
                        }
                        if (isset($this->request->data["daterange"]["enddate"]) && $this->request->data["daterange"]["enddate"] != "") {
                            $enddate = $this->request->data["daterange"]["enddate"];
                        }

                        if ($startdate != "" && $enddate != "") {
                            $startdatenew = explode("-", $this->request->data["daterange"]["startdate"]);
                            $enddatenew = explode("-", $this->request->data["daterange"]["enddate"]);
                            $startdatenew = mktime(0, 0, 0, $startdatenew[0], $startdatenew[1], $startdatenew[2]);
                            $enddatenew = mktime(0, 0, 0, $enddatenew[0], $enddatenew[1], $enddatenew[2]);
                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1, "start_date" => $startdatenew, "end_date" => $enddatenew);
                        } elseif ($startdate != "") {
                            $startdatenew = explode("-", $this->request->data["daterange"]["startdate"]);

                            $startdatenew = mktime(0, 0, 0, $startdatenew[0], $startdatenew[1], $startdatenew[2]);

                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1, "start_date" => $startdatenew);
                        } else {
                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1);
                        }
                    }

                    $jsondataforgraph = json_decode($this->Apicalls->curlpost("endorsementbydept.json", $postdataforgraph), true);

                    $graphbycorevalues = "";
                    $org_id = $loggedinUser["current_org"]->id;
                    $alldetailsorg = $this->Common->OrgInfoClient($loggedinUser["token"], $org_id);
                    if ($jsondataforgraph["result"]["status"] == 1) {
                        $graphbycorevalues = $jsondataforgraph["result"]["data"];

                        $this->set('jsIncludes', array('endorse_charts'));
                        $this->set('graphbycorevalues', $graphbycorevalues);
                    } else {
                        $graphbycorevalues = "";

                        $this->set('jsIncludes', array('endorse_charts'));
                        $this->set('graphbycorevalues', $graphbycorevalues);
                    }
                    $this->set('alldetailsorg', $alldetailsorg);
                } else {
                    $errormsg = $jsondatadecoded["result"]["msg"];
                    $this->Session->write('error', $errormsg);
                    $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
                }
            } else {
                $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
            }
        } else {
            $this->redirect(array('controller' => 'client', 'action' => 'login'));
        }

        $this->set('jsIncludes', array('endorse_charts'));
        $this->set('addEndorse', true);
        $this->set('MenuName', 'nDorsement History By Department');
    }

//
// nDorsement by job title
    public function jobtitle() {
        $loggedinUser = $this->Auth->user();
        if ($this->Session->check('Auth.User')) {

            if (isset($loggedinUser['current_org'])) {

                $postdata = array("token" => $loggedinUser["token"]);
                $jsondata = $this->Apicalls->curlpost("endorsestats.json", $postdata);
                $jsondatadecoded = json_decode($jsondata, true);

                if ($jsondatadecoded["result"]["status"]) {
                    $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1);
                    $startdate = "";
                    $enddate = "";

                    if (1) {

                        $enddate = $startdate = "";
                        if (isset($this->request->data["daterange"]["startdate"]) && $this->request->data["daterange"]["startdate"] != "") {
                            $startdate = $this->request->data["daterange"]["startdate"];
                        }
                        if (isset($this->request->data["daterange"]["enddate"]) && $this->request->data["daterange"]["enddate"] != "") {
                            $enddate = $this->request->data["daterange"]["enddate"];
                        }

                        if ($startdate != "" && $enddate != "") {
                            $startdatenew = explode("-", $this->request->data["daterange"]["startdate"]);
                            $enddatenew = explode("-", $this->request->data["daterange"]["enddate"]);
                            $startdatenew = mktime(0, 0, 0, $startdatenew[0], $startdatenew[1], $startdatenew[2]);
                            $enddatenew = mktime(0, 0, 0, $enddatenew[0], $enddatenew[1], $enddatenew[2]);
                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1, "start_date" => $startdatenew, "end_date" => $enddatenew);
                        } elseif ($startdate != "") {
                            $startdatenew = explode("-", $this->request->data["daterange"]["startdate"]);

                            $startdatenew = mktime(0, 0, 0, $startdatenew[0], $startdatenew[1], $startdatenew[2]);

                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1, "start_date" => $startdatenew);
                        } else {
                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1);
                        }
                    }
                    //  print_r($postdataforgraph);exit;

                    $jsondataforgraph = json_decode($this->Apicalls->curlpost("endorsementbyjobtitles.json", $postdataforgraph), true);
                    $org_id = $loggedinUser["current_org"]->id;
                    $alldetailsorg = $this->Common->OrgInfoClient($loggedinUser["token"], $org_id);

                    $graphbycorevalues = "";
                    if ($jsondataforgraph["result"]["status"] == 1) {
                        $graphbycorevalues = $jsondataforgraph["result"]["data"];

                        $this->set('jsIncludes', array('endorse_charts'));
                        $this->set('graphbycorevalues', $graphbycorevalues);
                    } else {
                        $graphbycorevalues = "";

                        $this->set('jsIncludes', array('endorse_charts'));
                        $this->set('graphbycorevalues', $graphbycorevalues);
                    }
                    $this->set('alldetailsorg', $alldetailsorg);
                } else {
                    $errormsg = $jsondatadecoded["result"]["msg"];
                    $this->Session->write('error', $errormsg);
                    $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
                }
            } else {
                $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
            }
        } else {
            $this->redirect(array('controller' => 'client', 'action' => 'login'));
        }

        $this->set('jsIncludes', array('endorse_charts'));
        $this->set('addEndorse', true);
        $this->set('MenuName', 'nDorsement History By Job Title');
    }

//
// nDorsement by entity
    public function entity() {
        $loggedinUser = $this->Auth->user();
        if ($this->Session->check('Auth.User')) {

            if (isset($loggedinUser['current_org'])) {

                $postdata = array("token" => $loggedinUser["token"]);
                $jsondata = $this->Apicalls->curlpost("endorsestats.json", $postdata);
                $jsondatadecoded = json_decode($jsondata, true);

                if ($jsondatadecoded["result"]["status"]) {
                    $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1);
                    $startdate = "";
                    $enddate = "";

                    if (1) {

                        $enddate = $startdate = "";
                        if (isset($this->request->data["daterange"]["startdate"]) && $this->request->data["daterange"]["startdate"] != "") {
                            $startdate = $this->request->data["daterange"]["startdate"];
                        }
                        if (isset($this->request->data["daterange"]["enddate"]) && $this->request->data["daterange"]["enddate"] != "") {
                            $enddate = $this->request->data["daterange"]["enddate"];
                        }

                        if ($startdate != "" && $enddate != "") {
                            $startdatenew = explode("-", $this->request->data["daterange"]["startdate"]);
                            $enddatenew = explode("-", $this->request->data["daterange"]["enddate"]);
                            $startdatenew = mktime(0, 0, 0, $startdatenew[0], $startdatenew[1], $startdatenew[2]);
                            $enddatenew = mktime(0, 0, 0, $enddatenew[0], $enddatenew[1], $enddatenew[2]);
                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1, "start_date" => $startdatenew, "end_date" => $enddatenew);
                        } elseif ($startdate != "") {
                            $startdatenew = explode("-", $this->request->data["daterange"]["startdate"]);

                            $startdatenew = mktime(0, 0, 0, $startdatenew[0], $startdatenew[1], $startdatenew[2]);

                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1, "start_date" => $startdatenew);
                        } else {
                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1);
                        }
                    }
                    //  print_r($postdataforgraph);exit;

                    $jsondataforgraph = json_decode($this->Apicalls->curlpost("endorsementbyentity.json", $postdataforgraph), true);

                    $graphbycorevalues = "";
                    $org_id = $loggedinUser["current_org"]->id;
                    $alldetailsorg = $this->Common->OrgInfoClient($loggedinUser["token"], $org_id);
                    if ($jsondataforgraph["result"]["status"] == 1) {
                        $graphbycorevalues = $jsondataforgraph["result"]["data"];

                        $this->set('jsIncludes', array('endorse_charts'));
                        $this->set('graphbycorevalues', $graphbycorevalues);
                    } else {
                        $graphbycorevalues = "";

                        $this->set('jsIncludes', array('endorse_charts'));
                        $this->set('graphbycorevalues', $graphbycorevalues);
                    }
                    $this->set('alldetailsorg', $alldetailsorg);
                } else {
                    $errormsg = $jsondatadecoded["result"]["msg"];
                    $this->Session->write('error', $errormsg);
                    $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
                }
            } else {
                $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
            }
        } else {
            $this->redirect(array('controller' => 'client', 'action' => 'login'));
        }

        $this->set('jsIncludes', array('endorse_charts'));
        $this->set('addEndorse', true);
        $this->set('MenuName', 'nDorsement History By Sub Org');
    }

//
// nDorsement by entity
    public function day() {
        $loggedinUser = $this->Auth->user();
        if ($this->Session->check('Auth.User')) {

            if (isset($loggedinUser['current_org'])) {

                $postdata = array("token" => $loggedinUser["token"]);
                $jsondata = $this->Apicalls->curlpost("endorsestats.json", $postdata);
                $jsondatadecoded = json_decode($jsondata, true);

                if ($jsondatadecoded["result"]["status"]) {
                    $org_id = $loggedinUser["current_org"]->id;
                    $alldetailsorg = $this->Common->OrgInfoClient($loggedinUser["token"], $org_id);
                    $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1);
                    $startdate = "";
                    $enddate = "";

                    if (1) {

                        $enddate = $startdate = "";
                        if (isset($this->request->data["daterange"]["startdate"]) && $this->request->data["daterange"]["startdate"] != "") {
                            $startdate = $this->request->data["daterange"]["startdate"];
                        }
                        if (isset($this->request->data["daterange"]["enddate"]) && $this->request->data["daterange"]["enddate"] != "") {
                            $enddate = $this->request->data["daterange"]["enddate"];
                        }

                        if ($startdate != "" && $enddate != "") {
                            $startdatenew = explode("-", $this->request->data["daterange"]["startdate"]);
                            $enddatenew = explode("-", $this->request->data["daterange"]["enddate"]);
                            $startdatenew = mktime(0, 0, 0, $startdatenew[0], $startdatenew[1], $startdatenew[2]);
                            $enddatenew = mktime(0, 0, 0, $enddatenew[0], $enddatenew[1], $enddatenew[2]);
                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1, "start_date" => $startdatenew, "end_date" => $enddatenew);
                        } elseif ($startdate != "") {
                            $startdatenew = explode("-", $this->request->data["daterange"]["startdate"]);

                            $startdatenew = mktime(0, 0, 0, $startdatenew[0], $startdatenew[1], $startdatenew[2]);

                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1, "start_date" => $startdatenew);
                        } else {
                            $postdataforgraph = array("token" => $loggedinUser["token"], "web" => 1);
                        }
                    }
                    //  print_r($postdataforgraph);exit;

                    $jsondataforgraph = json_decode($this->Apicalls->curlpost("endorsementbyday.json", $postdataforgraph), true);

                    $graphbycorevalues = "";
                    if ($jsondataforgraph["result"]["status"] == 1) {
                        $graphbycorevalues = $jsondataforgraph["result"]["data"];

                        $this->set('jsIncludes', array('endorse_charts'));
                        $this->set('graphbycorevalues', $graphbycorevalues);
                        $this->set('alldetailsorg', $alldetailsorg);
                    } else {
                        $graphbycorevalues = "";

                        $this->set('jsIncludes', array('endorse_charts'));
                        $this->set('graphbycorevalues', $graphbycorevalues);
                        $this->set('alldetailsorg', $alldetailsorg);
                        $this->set('addEndorse', true);
                    }
                } else {
                    $errormsg = $jsondatadecoded["result"]["msg"];
                    $this->Session->write('error', $errormsg);
                    $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
                }
            } else {
                $this->redirect(array('controller' => 'client', 'action' => 'setOrg'));
            }
        } else {
            $this->redirect(array('controller' => 'client', 'action' => 'login'));
        }

        $this->set('jsIncludes', array('endorse_charts'));
        $this->set('addEndorse', true);
        $this->set('MenuName', 'nDorsement History By Day');
    }

//
    /* public function add() {
      //        pr($this->request->data);die;
      $this->set('MenuName', 'nDorse Now');
      $loggedinUser = $this->Auth->user();

      if ($this->Session->check('Auth.User')) {
      if (isset($loggedinUser['current_org'])) {
      if ($this->request->is('post')) {
      //                    $this->request->data['type'] = 'standard';//remove this and above 1 condition
      $this->set('jsIncludes',array('addEndorse'));

      if (!isset($this->request->data['endorsee']) && isset($this->request->data['type'])) {
      //get core values
      $postData = array("token" => $loggedinUser["token"], 'org_id' => $loggedinUser['current_org']->id);
      $response = $this->Apicalls->curlpost("getVariousOrganizationData.json", $postData);
      $response = json_decode($response);
      $response = $response->result;
      $this->set('coreValues', $response->data->core_values);
      $this->set('endorsementLimit', $response->data->endorsement_limit);

      //get emojis
      $response = $this->Apicalls->curlget("getEmojis.json", array());
      $response = json_decode($response);
      $response = $response->result;
      $this->set('emojis', $response->data);

      //emoji path
      $emojiUrl = strstr($response->data[0]->url, $response->data[0]->image, true);
      $emojiUrl = str_replace(DIRECTORY_SEPARATOR, "/", $emojiUrl);
      $this->set('emojiUrl', $emojiUrl);

      $this->set('allowAttachments', $loggedinUser['current_org']->allow_attachment);
      $this->set('allowComments', $loggedinUser['current_org']->allow_comments);

      //                pr($response->data->core_values);die;

      $this->set('type', $this->request->data['type']);
      } else {
      $postData = array("token" => $loggedinUser["token"]);
      //                        $postData['type'] = $this->request->data['type'];
      $postData['message'] = isset($this->request->data['message']) ? $this->request->data['message'] : "";
      //                        $postData['core_values'] = implode(",", $this->request->data['corevalue']);
      if(isset($this->request->data['emojis'])) {
      $postData['emojis'] = implode(",", $this->request->data['emojis']);
      }
      $endorseList = array();

      //                        foreach ($this->request->data['endorsee'] as $for => $endosedIds) {
      //                            foreach ($endosedIds as $endosedId) {
      //                                $endorseList[] = array("for" => $for, "id" => $endosedId);
      //                            }
      //                        }

      //                        $postData['endorse_list'] = json_encode($endorseList);
      //pr($postData);
      $response = $this->Apicalls->curlpost("endorse.json", $postData);
      $response = json_decode($response);
      $response = $response->result;
      if ($response->status == 1) {
      $postID = $response->data->post_id;
      echo json_encode(array('success' => true, "post_id" => $postID, "msg" => $response->msg));
      exit;
      } else {
      echo json_encode(array('success' => false, 'msg' => $response->msg));
      exit;
      }
      }
      } else {
      $this->redirect(array('controller' => 'endorse', 'action' => 'index'));
      }
      }
      }
      $this->set('addEndorse', false);
      } */

    public function add() {
//        pr($this->request->data);die;
        //$this->set('MenuName', 'nDorse Now');
        $loggedinUser = $this->Auth->user();

        if ($this->Session->check('Auth.User')) {
            if (isset($loggedinUser['current_org'])) {
                if ($this->request->is('post')) {
//                    $this->request->data['type'] = 'standard';//remove this and above 1 condition
                    $this->set('jsIncludes', array('addEndorse'));

                    if (!isset($this->request->data['endorsee']) && isset($this->request->data['type'])) {
                        //get core values
                        $postData = array("token" => $loggedinUser["token"], 'org_id' => $loggedinUser['current_org']->id);
                        $response = $this->Apicalls->curlpost("getVariousOrganizationData.json", $postData);
                        $response = json_decode($response);
                        $response = $response->result;
                        $this->set('coreValues', $response->data->core_values);
                        $this->set('endorsementLimit', $response->data->endorsement_limit);

                        //get emojis
                        $response = $this->Apicalls->curlget("getEmojis.json", array());
                        $response = json_decode($response);
                        $response = $response->result;
                        $this->set('emojis', $response->data);

                        //emoji path
                        $emojiUrl = strstr($response->data[0]->url, $response->data[0]->image, true);
                        $emojiUrl = str_replace(DIRECTORY_SEPARATOR, "/", $emojiUrl);
                        $this->set('emojiUrl', $emojiUrl);

                        $this->set('allowAttachments', $loggedinUser['current_org']->allow_attachment);
                        $this->set('allowComments', $loggedinUser['current_org']->allow_comments);

                        //                pr($response->data->core_values);die;

                        $this->set('type', $this->request->data['type']);
                    } else {
                        $postData = array("token" => $loggedinUser["token"]);
                        $postData['type'] = $this->request->data['type'];
                        $postData['message'] = isset($this->request->data['message']) ? $this->request->data['message'] : "";
                        $postData['core_values'] = implode(",", $this->request->data['corevalue']);
                        if (isset($this->request->data['emojis'])) {
                            $postData['emojis'] = implode(",", $this->request->data['emojis']);
                        }

                        $endorseList = array();

                        foreach ($this->request->data['endorsee'] as $for => $endosedIds) {
                            foreach ($endosedIds as $endosedId) {
                                $endorseList[] = array("for" => $for, "id" => $endosedId);
                            }
                        }

                        $postData['endorse_list'] = json_encode($endorseList);

                        $response = $this->Apicalls->curlpost("endorse.json", $postData);
                        //pr($response); exit;
                        $response = json_decode($response);
                        $response = $response->result;
                        if ($response->status == 1) {
                            $endorsementIds = implode(",", $response->data->endorsement_ids);
                            echo json_encode(array('success' => true, "endorsementIds" => $endorsementIds, "msg" => $response->msg));
                            exit;
                        } else {
                            echo json_encode(array('success' => false, 'msg' => $response->msg));
                            exit;
                        }
                    }
                } else {
                    $this->redirect(array('controller' => 'endorse', 'action' => 'index'));
                }
            }
        }
        $this->set('addEndorse', false);
    }

    /* public function sendAttachments() {
      //        pr($_FILES);
      //        pr($this->data);die;
      $loggedinUser = $this->Auth->user();
      $postData = $this->request->data;
      $postData['type'] = 'image';
      $postData['token'] = $loggedinUser["token"];
      $postData['attachment'] = base64_encode(file_get_contents($_FILES['file']['tmp_name']));
      //pr($postData);
      //        echo base64_encode($postData['attachment']);die;
      $response = $this->Apicalls->curlpost("saveEndorseAttachment.json", $postData);
      echo($response);die;
      $response = json_decode($response);
      $response = $response->result;

      if ($response->status == 1) {
      echo json_encode(array('success' => true));
      } else {
      echo json_encode(array('success' => false, "msg" => $response->msg));
      }

      exit;
      } */

    public function sendAttachments() {
//        pr($_FILES);
//        pr($this->data);die;
        $loggedinUser = $this->Auth->user();
        $postData = $this->request->data;
        $postData['type'] = 'image';
        $postData['token'] = $loggedinUser["token"];
        $postData['attachment'] = base64_encode(file_get_contents($_FILES['file']['tmp_name']));

//        echo base64_encode($postData['attachment']);die;
        $response = $this->Apicalls->curlpost("saveEndorseAttachment.json", $postData);
//        echo($response);die;
        $response = json_decode($response);
        $response = $response->result;

        if ($response->status == 1) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('success' => false, "msg" => $response->msg));
        }

        exit;
    }

}

?>
