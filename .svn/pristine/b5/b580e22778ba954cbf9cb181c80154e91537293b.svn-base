<?php

class PostController extends AppController {

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

    public function add() {
        $this->set('MenuName', 'nDorse Now');
        $loggedinUser = $this->Auth->user();

        if ($this->Session->check('Auth.User')) {

            if (isset($loggedinUser['current_org'])) {
                $response = $this->Apicalls->curlget("getEmojis.json", array());
                $response = json_decode($response);
                $response = $response->result;
                $this->set('emojis', $response->data);
                $this->set('jsIncludes', array('addPost'));
                //emoji path
                $emojiUrl = strstr($response->data[0]->url, $response->data[0]->image, true);
                $emojiUrl = str_replace(DIRECTORY_SEPARATOR, "/", $emojiUrl);
                $this->set('emojiUrl', $emojiUrl);
                ?>

                <?php

                if ($this->request->is('post')) {
//                    $this->request->data['type'] = 'standard';//remove this and above 1 condition


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
                        $postData['title'] = isset($this->request->data['title']) ? $this->request->data['title'] : "";
//                        $postData['core_values'] = implode(",", $this->request->data['corevalue']);
                        if (isset($this->request->data['emojis'])) {
                            $postData['emojis'] = implode(",", $this->request->data['emojis']);
                        }
                        $endorseList = array();

//                        foreach ($this->request->data['endorsee'] as $for => $endosedIds) {
//                            foreach ($endosedIds as $endosedId) {
//                                $endorseList[] = array("for" => $for, "id" => $endosedId);
//                            }
//                        }
//                        $postData['endorse_list'] = json_encode($endorseList);

                        $response = $this->Apicalls->curlpost("wallpost.json", $postData);
                        //pr($response); exit;
                        $response = json_decode($response);
                        $response = $response->result;
                        if ($response->status == 1) {
                            $postID = $response->data->post_id;
                            //$postID = implode(",", $postID);
                            echo json_encode(array('success' => true, "post_id" => $postID, "msg" => $response->msg));
                            exit;
                        } else {
                            echo json_encode(array('success' => false, 'msg' => $response->msg));
                            exit;
                        }
                    }
                }
            }
        }
        $this->set('addPost', false);
    }

    public function addcomment() {
//        $this->autoRender = false;
//        $this->layout = false;
        $loggedinUser = $this->Auth->user();
        if ($this->Session->check('Auth.User')) {
            if (isset($loggedinUser['current_org'])) {
                if ($this->request->is('post')) {

//                    $this->request->data['type'] = 'standard';//remove this and above 1 condition
                    $this->set('jsIncludes', array('addPostComment'));

                    if (!empty($this->request->data)) {
                        $postData = array("token" => $loggedinUser["token"]);
//                        $postData['type'] = $this->request->data['type'];
                        $postData['comment'] = isset($this->request->data['message']) ? $this->request->data['message'] : "";
                        $postData['post_id'] = $this->request->data['post_id'];
                        //$postData['post_id'] = '43';
                        //pr($postData);
                        $response = $this->Apicalls->curlpost("postComment.json", $postData);
                        $response = json_decode($response, true);

                        $response = $response['result'];

                        $userName = $loggedinUser['fname'] . ' ' . $loggedinUser['lname'];
                        $userImage = $loggedinUser['image'];

                        if ($response['status'] == 1) {
                            $postCommentData = $response['data'];
                            $postCommentData['PostComment']['username'] = $userName;
                            $postCommentData['PostComment']['user_image'] = $userImage;
                            $this->set('postCommentData', $postCommentData);

                            //$postID = implode(",", $postID);
//                            echo json_encode(array('success' => true, "post_id" => $postID, "msg" => $response->msg));
//                            exit;
                        } else {
//                            echo json_encode(array('success' => false, 'msg' => $response->msg));
//                            exit;
                        }
                    }
                }
            }
        }
    }

    public function sendAttachments() {
//        pr($_FILES);
//        pr($this->data);die;
        $loggedinUser = $this->Auth->user();
        $postData = $this->request->data;
        $postData['type'] = 'image';
        $postData['token'] = $loggedinUser["token"];
        $postData['attachment'] = base64_encode(file_get_contents($_FILES['file']['tmp_name']));
        //pr($postData);
//        echo base64_encode($postData['attachment']);die;
        $response = $this->Apicalls->curlpost("saveWallpostAttachment.json", $postData);
        echo($response);
        die;
        $response = json_decode($response);
        $response = $response->result;

        if ($response->status == 1) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('success' => false, "msg" => $response->msg));
        }

        exit;
    }

    public function sendAttachedFiles() {
//        pr($_FILES);
//        pr($this->data);die;
        $loggedinUser = $this->Auth->user();
        $postData = $this->request->data;
        $postData['type'] = 'files';
        $postData['token'] = $loggedinUser["token"];
        $originFileName = $_FILES['file']['name'];
        $fileName = $this->request->data['post_id'];
        $fileName = $fileName . "_" . time() . "." . $this->request->data['file_extension'];
        $pathToUpload = WWW_ROOT . POST_FILE_DIR . $fileName;

        if (!move_uploaded_file($_FILES['file']['tmp_name'], $pathToUpload)) {
            pr($_FILES['file']);
            $errors['moveUploaded'] = "move_uploaded_file() failed.";
            echo "move_uploaded_file() failed.";
            throw new Exception('Could not upload file');
            exit;
        }
        chmod($pathToUpload, 0777);
        $postData['fileName'] = $fileName;
        $postData['originFileName'] = $originFileName;
        //pr($postData);
//        echo base64_encode($postData['attachment']);die;
        $response = $this->Apicalls->curlpost("saveWallpostAttachmentFiles.json", $postData);
        echo($response);
        die;
        $response = json_decode($response);
        $response = $response->result;

        if ($response->status == 1) {
            echo json_encode(array('success' => true));
        } else {
            echo json_encode(array('success' => false, "msg" => $response->msg));
        }

        exit;
    }

    public function index() {

        $loggedinUser = $this->Auth->user();
        if ($this->Session->check('Auth.User')) {
            if (isset($loggedinUser['current_org'])) {
                $postdata = array("token" => $loggedinUser["token"], "type" => "public");
                $jsondata = $this->Apicalls->curlpost("getWallPostList.json", $postdata);
                //pr($jsondata); exit;
                $jsondatadecoded = json_decode($jsondata, true);

                if ($jsondatadecoded["result"]["status"]) {
                    $endorsedatadata = $jsondatadecoded["result"]["data"];

                    $this->set('postdata', $endorsedatadata["post_data"]);
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

        $this->set('jsIncludes', array('wallpost'));
        //$this->set('addEndorse', true);
        $this->set('MenuName', 'Live Feed');
    }

    public function details($id) {
        $loggedinUser = $this->Auth->user();

        if ($this->Session->check('Auth.User')) {
            if (isset($loggedinUser['current_org'])) {
                $postdata = array("token" => $loggedinUser["token"], "post_id" => $id);
                //$this->set('jsIncludes', array('addPostComment'));

                $jsondata = $this->Apicalls->curlpost("wallPostdetails.json", $postdata);
                $jsonCommentdata = $this->Apicalls->curlpost("getWallPostCommentLists.json", $postdata);
//                pr($jsondata);
//                exit;
                $jsondatadecoded = json_decode($jsondata, true);
                $jsonCommentdatadecoded = json_decode($jsonCommentdata, true);

                if ($jsondatadecoded["result"]["status"]) {
                    $postresultdata = $jsondatadecoded["result"]["data"];


                    $this->set('postdata', $postresultdata);
                    $this->set('postCommentData', $jsonCommentdatadecoded);
                    $this->set('loggeduserimage', $loggedinUser['image']);
                    $this->set('logged_user_id', $loggedinUser['id']);
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
        $this->set('MenuName', 'nDorsement Detail');
        $this->set('jsIncludes', array('endorse_details', 'addPostComment'));
    }

    public function loadmorecomments() {
//        $this->autoRender = false;
//        $this->layout = false;
        $loggedinUser = $this->Auth->user();
        if ($this->Session->check('Auth.User')) {
            if (isset($loggedinUser['current_org'])) {
                if ($this->request->is('post')) {

                    if (!empty($this->request->data)) {
                        $postData = array("token" => $loggedinUser["token"]);
                        $postData['post_id'] = $this->request->data['post_id'];
                        $postData['page'] = $this->request->data['page_no'];

                        $response = $this->Apicalls->curlpost("getWallPostCommentLists.json", $postData);
                        $response = json_decode($response, true);

                        $response = $response['result'];

                        $userName = $loggedinUser['fname'] . ' ' . $loggedinUser['lname'];
                        $userImage = $loggedinUser['image'];

                        if ($response['status'] == 1) {
                            $postCommentData = $response['data'];
                            $postCommentData['PostComment']['username'] = $userName;
                            $postCommentData['PostComment']['user_image'] = $userImage;
                            $this->set('postCommentData', $postCommentData);

                            //$postID = implode(",", $postID);
//                            echo json_encode(array('success' => true, "post_id" => $postID, "msg" => $response->msg));
//                            exit;
                        } else {
//                            echo json_encode(array('success' => false, 'msg' => $response->msg));
//                            exit;
                        }
                    }
                }
            }
        }
    }

    /** Added By Babulal Prasad to download attached files ** */
    public function download() {
        $filename = $this->request->params['pass'][3];
        $orgfilename = $this->request->params['pass'][4];
//        pr($this->request->params); exit;
        $this->response->file(
                'webroot/uploads/post/files/' . $filename, array(
            'download' => true,
            'name' => $orgfilename
                )
        );
        return $this->response;
    }

}
?>
