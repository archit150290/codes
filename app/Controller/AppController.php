<?php

/**
 * Application level Controller
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
App::uses('Controller', 'Controller');

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package		app.Controller
 * @link		http://book.cakephp.org/2.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller {

    public $components = array(
        'Session', 'Cookie',
        'Auth' => array(
            'authenticate' => array(
                'Form' => array(
                    'fields' => array(
                        'username' => 'email',
                        'password' => 'password'
                    )
                )
            ),
            'authorize' => array('Controller'),
            'loginAction' => array('controller' => 'site', 'action' => 'index'),
            'loginRedirect' => array('controller' => 'site', 'action' => 'index'),
            'logoutRedirect' => array('controller' => 'site', 'action' => 'index'),
            'authError' => 'You don\'t have access here.',
        ),
        'Common', 'ViewCont', "Apicalls"
    );
    var $uses = array("User", "ApiSession", 'UserOrganization', 'DefaultOrg', "LoginStatistics", "Organization", "OrgRequests");
    public $publicAccess = array("site" => array("*"), "users" => array("login"), "client" => array("login", "register"), "ajax" => array("isLoggedIn"));
    public $clientControllers = array("client", "endorse", "cajax","post");

    public function beforeFilter() {
        parent::beforeFilter();

        $this->Auth->authenticate = array(
            'Form' => array(
                'fields' => array('username' => 'email', 'password' => 'password'),
            ),
        );

        $this->Auth->authorize = array('Controller');

        if (strstr($this->request->url, ".json")) {
            if ($this->request->is('post') && (!in_array($this->request->params['action'], array('register', 'login', 'logout', 'isValidQRCode', "sendVerification", "forgotPassword", "resetPassword", "renewSession")) )) {
                $token = isset($this->request->data['token']) ? $this->request->data['token'] : '';
                if ($token != '') {



                    if ($this->Auth->user("token") == $token) {
                        //$this->Security->validatePost = false;
                        //$this->Security->csrfCheck = false;
                        $status = $this->checkSessionStatus();

                        if ($status == "auto_logout") {

                            echo json_encode(array("result" => array("status" => false, "msg" => "You are logged out because you logged in from some other device or your session is expired. Please login again.", 'isExpired' => true)));
                            exit;
                        } else if ($status == "logout") {
                            echo json_encode(array("result" => array("status" => false, "msg" => "You are logged out because you logged in from some other device or your session is expired. Please login again.", 'isExpired' => true)));
                            exit;
                        }
                    } else {
                        $status = $this->renewToken();

                        if ($status == 'notoken') {
                            echo json_encode(array("result" => array("status" => false, "msg" => "Something went wrong on server. Please login again.", 'isExpired' => true)));
                            exit;
                        } else if ($status == "auto_logout") {

                            echo json_encode(array("result" => array("status" => false, "msg" => "You are logged out because you logged in from some other device or your session is expired. Please login again.", 'isExpired' => true)));
                            exit;
                        } else if ($status == "logout") {
                            echo json_encode(array("result" => array("status" => false, "msg" => "You are logged out because you logged in from some other device or your session is expired. Please login again.", 'isExpired' => true)));
                            exit;
                        }

                        //echo json_encode(array("result" => array("status"=>false,"msg"=>"Token expired", "request" => $this->request->data, "auth" => $this->Auth->user())));
                        //exit;
                    }
                } else {
                    echo json_encode(array("result" => array("status" => false, "msg" => "Enter valid token")));
                    exit;
                }
            }
        } else {
            $loggedinUser = $this->Auth->user();
            $portal = $this->Cookie->read("portal_cookie");
            if (!empty($portal) && $portal == 'client') {
                $this->Auth->loginAction = array('controller' => 'client', 'action' => 'login');
                $this->Auth->loginRedirect = array('controller' => 'client', 'action' => 'login');
                $this->Auth->logoutRedirect = array('controller' => 'client', 'action' => 'login');
            }

//            if ($this->Cookie->read("remember_me_endorse_cookie") &&  !$this->Session->check('Auth.User')) {
//                $remembermecookie = $this->Cookie->read("remember_me_endorse_cookie");
//                $postData = array('token' => $remembermecookie);
//
//                $response = $this->Apicalls->curlpost("renewSession.json", $postData);
//                $response = json_decode($response);
//                $response = $response->result;
//
//                if($response->status ==1) {
//                    $userData = (array) $response->data;
//                    $userData['portal'] = 'client';
//
//                    $this->Session->write('Auth.User', $userData);
//                } else {
//                    $this->Auth->logout();
////                    $this->Cookie->delete("remember_me_endorse_cookie");
////                    $this->Cookie->delete("portal_cookie");
////                    $this->redirect(array('controller' => 'client', 'action' => 'login'));
//                }
//            }

            if ($this->action == 'expire' && $portal == 'client') {
                $this->Auth->logout();
                $this->Cookie->delete("portal_cookie");
                $this->Session->setFlash(__('Your session has expired.'), 'default', array('class' => 'alert alert-warning', 'action' => 'login'));
            }

            if ($this->Auth->User("role") == 2 && $this->Auth->User("portal") == 'admin') {
                $this->request->data["token"] = $this->Auth->User("token");
                $status = $this->checkSessionStatus();
                if ($status == "auto_logout") {
                    $this->Cookie->delete("portal_cookie");
                    $this->Session->setFlash(__('You are logged out because you logged in from some other device or your session is expired. Please login again.'), 'default', array('class' => 'alert alert-warning'));
                    $this->redirect($this->Auth->logout());
                }

                //$this->layout = "admin";
            }

            if ($this->Session->check("Auth.User")) {
                $this->set('portal', $this->Auth->User("portal"));
            }

            $this->set('ViewContFunctions', new ViewContComponent(new ComponentCollection()));
            if (isset($_SERVER['HTTP_REFERER'])) {
                $this->set('referer', $_SERVER['HTTP_REFERER']);
            } else {
                $this->set('referer', false);
            }

            $this->set('addEndorse', true);
            
            $alertMsg = $this->Session->read('alertMsg');
            if(!empty($alertMsg)) {
                $this->Session->delete('alertMsg');
                 $this->set('alertMsg', $alertMsg);
            }
            
        }
    }

    public function isAuthorized($user = NULL) {
//        echo $this->action . "br";
//        pr($this->publicAccess[$this->params['controller']]);die;
        if (isset($this->publicAccess[$this->params['controller']]) && (in_array("*", $this->publicAccess[$this->params['controller']]) || in_array($this->action, $this->publicAccess[$this->params['controller']]))) {
            return true;
        }

        if (!$this->request->is('ajax')) {
            if (!empty($user) && isset($user['portal'])) {
                if ($user['portal'] == 'client' && !in_array($this->params['controller'], $this->clientControllers)) {
                    $this->Auth->unauthorizedRedirect = array('controller' => 'users', 'action' => 'login');
                    //    $this->Auth->authError="Access Denied";
                    return FALSE;
                } if ($user['portal'] == 'admin' && in_array($this->params['controller'], $this->clientControllers)) {
                    $this->Auth->unauthorizedRedirect = array('controller' => 'client', 'action' => 'login');
                    return FALSE;
                }
            }
        }

        return true;
    }

    public function renewToken() {
        $params = array();
        $conditions = array('ApiSession.token' => $this->request->data['token']);
        $params['conditions'] = $conditions;
        $params['order'] = array("ApiSession.created DESC");
        $params['fields'] = array("*");
        $params['joins'] = array(
            array(
                'table' => 'users',
                'alias' => 'User',
                'type' => 'LEFT',
                'conditions' => array(
                    'ApiSession.user_id = User.id'
                )
            )
        );
        $apiSession = $this->ApiSession->find("first", $params);

        if (!empty($apiSession)) {
            if ($apiSession['ApiSession']['status'] == 'active') {
                $apiSession['User']['token'] = $this->request->data['token'];

                if ($apiSession['User']["image"] != "") {
                    $apiSession['User']["image"] = Router::url('/', true) . "app/webroot/" . PROFILE_IMAGE_DIR . "small/" . $apiSession['User']["image"];
                }
                if (strtotime($apiSession['User']["dob"]) > 0) {
                    $apiSession['User']["dob"] = date("m/d/Y", strtotime($apiSession['User']["dob"]));
                } else {
                    $apiSession['User']["dob"] = "";
                }

                $this->Auth->login($apiSession['User']);
                
                $this->Session->write('Auth.User.token', $this->request->data['token']);

                $loggedinUserId = $this->Auth->user('id');

                $params = array();
                $params['fields'] = "*";
                $params['joins'] = array(
                    array(
                        'table' => 'user_organizations',
                        'alias' => 'UserOrganization',
                        'type' => 'LEFT',
                        'conditions' => array(
                            'UserOrganization.user_id = ' . $loggedinUserId,
                            'UserOrganization.organization_id = DefaultOrg.organization_id'
                        )
                    )
                );

                $params['conditions'] = array("DefaultOrg.user_id" => $loggedinUserId);

                $defaultOrganization = $this->DefaultOrg->find("first", $params);

                if (!empty($defaultOrganization)) {
                    $currentOrg = $defaultOrganization['Organization'];
                    $roleList = $this->Common->setSessionRoles();
                    $currentOrg['org_role'] = $roleList[$defaultOrganization['UserOrganization']['user_role']];
                    $currentOrg['joined'] = $defaultOrganization['UserOrganization']['joined'];
                    $this->Session->write('Auth.User.current_org', $currentOrg);
                }
                
                //Get pending request organizations
                $pendingRequests = $this->OrgRequests->find("all", array("conditions" => array("user_id" => $loggedinUserId, "status" => 0)));
                $pendingRequestOrgs = array();
                foreach ($pendingRequests as $pendingRequest) {
                    $pendingRequestOrgs[] = $pendingRequest['OrgRequests']['organization_id'];
                }

                $this->Session->write('Auth.User.pending_requests', $pendingRequestOrgs);
                
            }

            return $apiSession['ApiSession']['status'];
        } else {
            return 'notoken';
        }
    }

    public function checkSessionStatus() {
        $params = array();
        $conditions = array('ApiSession.token' => $this->request->data['token']);
        $params['conditions'] = $conditions;
        $params['order'] = array("created DESC");

        $apiSession = $this->ApiSession->find("first", $params);

        if (empty($apiSession)) {
            return "";
        } else {
            return $apiSession['ApiSession']['status'];
        }
    }

    public function logoutSystem($userId, $status = "logout") {

        if ($status == 'logout') {
            $this->Auth->logout();
        }

        $params = array();
        //$params['fields'] = array('*');
        //$params['order'] = array("created DESC");
        $params = array('user_id' => $userId, "status" => "active");
        $user_data = $this->ApiSession->updateAll(array("status" => "'" . $status . "'"), $params);
    }

    public function generateToken($userId) {


        if ($userId) {
            $this->logoutSystem($userId, "auto_logout");

            $token = md5(uniqid() . $userId . time());

            $apiSession = array();

            //if ($user_data) {
            //    $apiSession['id'] = $user_data['ApiSession']['id'];
            //}

            $apiSession['user_id'] = $userId;
            $apiSession['token'] = $token;

            $this->ApiSession->set(array("ApiSession" => $apiSession));
            $this->ApiSession->save();

            $this->LoginStatistics->updateAll(
                    array('LoginStatistics.live' => "0"), array('LoginStatistics.user_id' => $userId)
            );
            $loginStats = array();
            $loginStats['user_id'] = $userId;
            $loginStats['os'] = isset($this->request->data['os']) ? $this->request->data['os'] : "";
            $loginStats['os_version'] = isset($this->request->data['os_version']) ? $this->request->data['os_version'] : "";
            $loginStats['device_id'] = isset($this->request->data['device_id']) ? $this->request->data['device_id'] : "";
            $loginStats['app_version'] = isset($this->request->data['app_version']) ? $this->request->data['app_version'] : "";
            $loginStats['live'] = 1;
            
            //update records with same device
            if(!empty($loginStats['device_id'])) {
                $this->LoginStatistics->updateAll(
                        array('LoginStatistics.device_id' => "'expired_" . $loginStats['device_id'] . "'", "LoginStatistics.live" => 0 ), array('LoginStatistics.device_id' => $loginStats['device_id'])
                );
            }
                        
            $this->LoginStatistics->set($loginStats);
            $this->LoginStatistics->save();
            return $token;
        } else {
            return;
        }
    }

    public function getSecretCode($type = 'user') {
        $secretCode = "";
        while (1) {
            $secretCode = substr(md5(uniqid(mt_rand(), true)), 0, 5);
            $recordExist = array();
            switch ($type) {
                case "user" :
                    $recordExist = $this->User->findBySecretCode($secretCode);
                    break;
                case "organization" :
                    $recordExist = $this->Organization->findBySecretCode($secretCode);
                    break;
            }

            if (!empty($recordExist)) {
                continue;
            } else {
                break;
            }
        }

        return $secretCode;
    }
    
    public function getForgotSecretCode() {
        $secretCode = "";
        while (1) {
            $secretCode = substr(md5($this->request->data['email'] . time()), 0, 5);
            $recordExist = $this->PasswordCode->find("first", array("conditions" => array("code" => $secretCode, "status" => 0)));

            if (!empty($recordExist)) {
                continue;
            } else {
                break;
            }
        }

        return $secretCode;
    }

}
