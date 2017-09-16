<?php

class ReportsController extends AppController {

    public $components = array("Auth", "Common", "Session");
    public $uses = array("User", "UserOrganization", "Organization", "Subscription", "EndorseCoreValue");

    public function beforeFilter() {
        parent::beforeFilter();

        $loggedinUserRole = $this->Auth->user('role');

        if ($loggedinUserRole != 1) {
            $this->Auth->logout();
        }
    }

    public function index() {
        
    }

    public function users() {
        ini_set('memory_limit', '2G');
        ini_set('max_execution_time', 0);
        App::import('Vendor', 'PHPExcel', array('file' => 'PHPExcel/Classes/PHPExcel.php'));
        $this->layout = "ajax";
        $this->loadModel("Organization");
        // Create new PHPExcel object
        $objPHPExcel = new PHPExcel();
        $folderToSaveXls = WWW_ROOT . 'xlsxfolder';

        $this->UserOrganization->bindModel(array(
            'belongsTo' => array(
                'Department' => array(
                    'className' => 'Department',
                ),
                'Entity' => array(
                    'className' => 'Entity',
                ),
            )
        ));
        $userOrganizations = $this->UserOrganization->find("all", array("order" => array("UserOrganization.user_id ASC")));

        $objPHPExcel->getProperties()->setCreator("Ndorse");
        $objPHPExcel->getProperties()->setLastModifiedBy("Ndorse");
        $objPHPExcel->getProperties()->setTitle("Office 2007 XLSX Test Document");
        $objPHPExcel->getProperties()->setSubject("Office 2007 XLSX Test Document");
        $objPHPExcel->getProperties()->setDescription("Test document for Office 2007 XLSX, generated using PHPExcel classes.");
        // Add some data
        $objPHPExcel->setActiveSheetIndex(0);
        try {

            $header = array("First Name", "Last Name", "Username", "Email",
                "Organization Name", "Role", "Status", "DOB",
                "Phone No.", "Department", "Sub-Organization", "Country", "State", "City", "Street", "Zip");
            $fieldList = array(
                array("User", "fname"), array("User", "lname"), array("User", "username"), array("User", "email"),
                array("Organization", "name"), array("UserOrganization", "user_role"), array("UserOrganization", "status"), array("User", "dob"),
                array("User", "mobile"), array("Department", "name"), array("Entity", "name"), array("User", "country"), array("User", "state"), array("User", "city"),
                array("User", "street"), array("User", "zip"));

//            $fieldList = array(
//                                        array("User" => "fname"), array("User" => "lname"), array("User" => "username"), array("User" => "email"), 
//                                        array("Organization" => "name"), array("UserOrganization" => "user_role"), array("UserOrganization" => "status"), 
//                                        array("User" => "dob"), array("User" => "mobile"), array("Department" => "name"), array("Entity" => "name"), 
//                                        array("User" => "country"), array("User" => "state"), array("User" => "city"), array("User" => "street"), 
//                                        array("User" => "zip"));

            $j = 0;
            $rowCount = 3;
            foreach ($header as $resultheader) {
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex($j);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $resultheader);
                //=========
                $objPHPExcel->getActiveSheet()->getColumnDimension($columnLetter)->setAutoSize(true);
                $j++;
            }

            //===to bold the first row
            $objPHPExcel->getActiveSheet()->getStyle("A3:" . $columnLetter . "3")->getFont()->setBold(true);
            $rowCount = 5;
            $columnsum = 0;
            $j = 0;
            $statusConfig = Configure::read('statusConfig');
            $roleList = $this->Common->setSessionRoles();

            foreach ($userOrganizations as $userOrganization) {
                $columCount = 0;

                foreach ($fieldList as $field) {
                    $modalName = $field[0];
                    $fieldName = $field[1];
                    $columnLetter = PHPExcel_Cell::stringFromColumnIndex($columCount++);

                    if ($fieldName == 'user_role') {
                        if ($roleList[$userOrganization['UserOrganization']['user_role']] == 'endorser') {
                            $fieldValue = "nDorser";
                        } else {
                            $fieldValue = ucfirst($roleList[$userOrganization['UserOrganization']['user_role']]);
                        }
                    } else if ($fieldName == 'status') {
                        $fieldValue = array_search($userOrganization['UserOrganization']["status"], $statusConfig);
                    } else {
                        $fieldValue = $userOrganization[$modalName][$fieldName];
                    }

                    $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $fieldValue);
                }

                $j++;
                $rowCount++;
            }

            $objPHPExcel->getActiveSheet()->setTitle('Simple');
            //$gdImage = imagecreatefromjpeg(WWW_ROOT . ORG_IMAGE_DIR . '/28.jpeg');
            $gdImage = imagecreatefrompng(WWW_ROOT . 'img/logo-excel.png');
            // Add a drawing to the worksheetecho date('H:i:s') . " Add a drawing to the worksheet\n";
            $objDrawing = new PHPExcel_Worksheet_MemoryDrawing();
            $objDrawing->setName('Sample image');
            $objDrawing->setDescription('Sample image');
            $objDrawing->setImageResource($gdImage);
            $objDrawing->setRenderingFunction(PHPExcel_Worksheet_MemoryDrawing::RENDERING_JPEG);
            $objDrawing->setMimeType(PHPExcel_Worksheet_MemoryDrawing::MIMETYPE_DEFAULT);
            $objDrawing->setHeight(50);
            $objDrawing->setCoordinates('E1');
            $objDrawing->setWorksheet($objPHPExcel->getActiveSheet());

            //======set height of first column
            $objPHPExcel->getActiveSheet()->getRowDimension('1')->setRowHeight(50);


            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

            $filename = 'alluserlist.xlsx';
            $objWriter->save($folderToSaveXls . '/' . $filename);
            echo json_encode(array("filename" => $filename, "msg" => "success"));
            exit();

        } catch (Exception $e) {
            echo json_encode(array("filename" => $filename, "msg" => $e));
        }

        exit();
    }

    public function organizations() {
        ini_set('memory_limit', '2G');
        ini_set('max_execution_time', 0);
        App::import('Vendor', 'PHPExcel', array('file' => 'PHPExcel/Classes/PHPExcel.php'));
        $this->layout = "ajax";
        $this->loadModel("Organization");
        // Create new PHPExcel object
        $objPHPExcel = new PHPExcel();
        $folderToSaveXls = WWW_ROOT . 'xlsxfolder';

        $objPHPExcel->getProperties()->setCreator("Ndorse");
        $objPHPExcel->getProperties()->setLastModifiedBy("Ndorse");
        $objPHPExcel->getProperties()->setTitle("Office 2007 XLSX Test Document");
        $objPHPExcel->getProperties()->setSubject("Office 2007 XLSX Test Document");
        $objPHPExcel->getProperties()->setDescription("Test document for Office 2007 XLSX, generated using PHPExcel classes.");
        // Add some data
        $objPHPExcel->setActiveSheetIndex(0);
        try {
            
            $header = array("Organization Name", "Code", "Country", "State", "City", "Street", "Zip",
                 "Status", "Available Limit", "Paid Users", "Free Users", "Total Users", "Invitations Sent", "Invitations Accepted", "Core Values");
            
             $j = 0;
            $rowCount = 3;
            foreach ($header as $resultheader) {
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex($j);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $resultheader);
                //=========
                $objPHPExcel->getActiveSheet()->getColumnDimension($columnLetter)->setAutoSize(true);
                $j++;
            }
            $this->UserOrganization->unbindModel(array('belongsTo' => array('Organization')));
            $this->Organization->bindModel(array(
                'hasMany' => array(
                    'Invite' => array(
                        'className' => 'Invite',
                    ),
                    'UserOrganization' => array(
                        'className' => 'UserOrganization',
                    ),
                    'OrgCoreValues' => array(
                        'className' => 'OrgCoreValue',
                        'order' => 'created ASC'
                    )
                ),
                'hasOne' => array('Subscription' => array(
                        'className' => 'Subscription',
                    ))
            ));
            $this->Organization->recursive = 2;

            $orgdata = $this->Organization->find('all', array('order' => 'Organization.id ASC'));
            $userRole = array(2, 3);
            $rowCount = 5;

            foreach ($orgdata as $key => $orgDetails) {
                
                $orgId = $orgDetails['Organization']['id'];
                $userorg = $orgDetails["UserOrganization"];
                
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(0);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $orgDetails['Organization']['name']);
                
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(1);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $orgDetails['Organization']['secret_code']);
                
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(2);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $orgDetails['Organization']['country']);
                
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(3);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $orgDetails['Organization']['state']);
                
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(4);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $orgDetails['Organization']['city']);
                
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(5);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $orgDetails['Organization']['street']);
                
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(6);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $orgDetails['Organization']['zip']);
                
                $statusConfig = Configure::read('statusConfig');
                $statusValue = array_search($orgDetails['Organization']["status"], $statusConfig);
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(7);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $statusValue);
                
                 if($orgDetails['Subscription']['is_deleted'] == 1) {
                    $availableLimit = FREE_POOL_USER_COUNT;
                } else {
                    $availableLimit = $orgDetails['Subscription']['pool_purchased'] + FREE_POOL_USER_COUNT;
                }
                
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(8);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $availableLimit);
                
                $paidUsers = $availableLimit - FREE_POOL_USER_COUNT;
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(9);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $paidUsers);
                
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(10);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, FREE_POOL_USER_COUNT);
                
                
                $totalorgusers = $this->Common->getusersfororg($orgId, $userRole);
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(11);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $totalorgusers);
                
                $inviationStats = $this->Common->getInvitationDetails($userorg);
                
//                $totalInvitationsAccepted = $this->Common->userorgcounter($userorg);
//                $invitationAccepted = $totalInvitationsAccepted["web"] + $totalInvitationsAccepted["app"];
//                $invitationsArray = $this->Common->invitations_fetching($orgDetails);
//                
//                $invitationsPending = $invitationsArray["invitations_pending"];
//                
//                $invitationsPending["web"] = $totalInvitationsAccepted["web"] + $invitationsPending["web"];
//                $invitationsPending["app"] = $totalInvitationsAccepted["app"] + $invitationsPending["app"];
//                
                $totalInvitationsSent = $inviationStats['total_invitations']["app"] + $inviationStats['total_invitations']["web"];

                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(12);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $totalInvitationsSent);
                
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(13);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $inviationStats['invitations_accepted']);
                
                $coreValues = $this->Common->getOrgCoreValues($orgDetails['OrgCoreValues']);
                $coreValuesList = implode(", ", $coreValues);
                
                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(14);
                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $coreValuesList);
                
//                $orgId = $orgDetails["Organization"]["id"];
//                $owner_id = $orgDetails["Organization"]["admin_id"];
//                $totalorgusers = $this->Common->getusersfororg($orgId, $userRole);
//                $orgowner = $this->Common->getorgownername($owner_id);
//                $totalusers[$orgId] = $totalorgusers;
//
//                $ownersarray[$orgId][$owner_id] = $orgowner;
//                $userorg = $orgDetails["UserOrganization"];
//
//                $totalInvitationsAccepted[$orgId] = $this->Common->userorgcounter($userorg);
//                $invitation_accepted[$orgId] = $totalInvitationsAccepted[$orgId]["web"] + $totalInvitationsAccepted[$orgId]["app"];
//                $invitations_array[$orgId] = $this->Common->invitations_fetching($orgDetails);
//                $invitationsPending[$orgId] = $invitations_array[$orgId]["invitations_pending"];
//                $invitationsPending[$orgId]["web"] = $totalInvitationsAccepted[$orgId]["web"] + $invitationsPending[$orgId]["web"];
//                $invitationsPending[$orgId]["app"] = $totalInvitationsAccepted[$orgId]["app"] + $invitationsPending[$orgId]["app"];
//                
//                pr($invitationsPending);die;
//                
//                $totalinvitations[$orgId] = array("invitation_accepted" => $invitation_accepted, "invitation_pending" => $invitationsPending);
//                $pendingrequescounter[$orgId] = $this->OrgRequest->find("count", array("conditions" => array("organization_id" => $orgId, "status" => 0)));
//                $endorsementformonth[$orgId] = $this->Common->endorsementformonth($orgId);
//                
//                foreach ($orgDetails['Transactions'] as $transaction) {
//
//                    if ($transaction["status"] == "canceled") {
//                        $adminusr[] = $transaction["user_id"];
//                    }
//                    if ($transaction['bt_subscription_id'] == $orgDetails['Subscription']['bt_id']) {
//                        if ($transaction['type'] == 'upgrade') {
//                            $userPool += $transaction['user_diff'];
//                        } else if ($transaction['type'] == 'downgrade') {
//                            $userPool -= $transaction['user_diff'];
//                        }
//                    }
//                }
//
//                $orgdata[$key]['Subscription']['user_pool'] = $userPool;
//                
//                
//                
//                
//                
//                
//                
//               
//                
//                
//                
//                
//                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(0);
//                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $orgDetails['Organization']['name']);
//                
//                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(0);
//                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $orgDetails['Organization']['name']);
//                
//                $columnLetter = PHPExcel_Cell::stringFromColumnIndex(0);
//                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $orgDetails['Organization']['name']);
                
                
                
                
                
                
                $rowCount++;
            }

            
//            $fieldList = array(
//                array("User", "fname"), array("User", "lname"), array("User", "username"), array("User", "email"),
//                array("Organization", "name"), array("UserOrganization", "user_role"), array("UserOrganization", "status"), array("User", "dob"),
//                array("User", "mobile"), array("Department", "name"), array("Entity", "name"), array("User", "country"), array("User", "state"), array("User", "city"),
//                array("User", "street"), array("User", "zip"));
//
////            $fieldList = array(
////                                        array("User" => "fname"), array("User" => "lname"), array("User" => "username"), array("User" => "email"), 
////                                        array("Organization" => "name"), array("UserOrganization" => "user_role"), array("UserOrganization" => "status"), 
////                                        array("User" => "dob"), array("User" => "mobile"), array("Department" => "name"), array("Entity" => "name"), 
////                                        array("User" => "country"), array("User" => "state"), array("User" => "city"), array("User" => "street"), 
////                                        array("User" => "zip"));
//
//            $j = 0;
//            $rowCount = 3;
//            foreach ($header as $resultheader) {
//                $columnLetter = PHPExcel_Cell::stringFromColumnIndex($j);
//                $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $resultheader);
//                //=========
//                $objPHPExcel->getActiveSheet()->getColumnDimension($columnLetter)->setAutoSize(true);
//                $j++;
//            }
//
            //===to bold the first row
            $objPHPExcel->getActiveSheet()->getStyle("A3:" . $columnLetter . "3")->getFont()->setBold(true);
//            $rowCount = 5;
//            $columnsum = 0;
//            $j = 0;
//            $statusConfig = Configure::read('statusConfig');
//            $roleList = $this->Common->setSessionRoles();
//
//            foreach ($userOrganizations as $userOrganization) {
//                $columCount = 0;
//
//                foreach ($fieldList as $field) {
//                    $modalName = $field[0];
//                    $fieldName = $field[1];
//                    $columnLetter = PHPExcel_Cell::stringFromColumnIndex($columCount++);
//
//                    if ($fieldName == 'user_role') {
//                        if ($roleList[$userOrganization['UserOrganization']['user_role']] == 'endorser') {
//                            $fieldValue = "nDorser";
//                        } else {
//                            $fieldValue = ucfirst($roleList[$userOrganization['UserOrganization']['user_role']]);
//                        }
//                    } else if ($fieldName == 'status') {
//                        $fieldValue = array_search($userOrganization['UserOrganization']["status"], $statusConfig);
//                    } else {
//                        $fieldValue = $userOrganization[$modalName][$fieldName];
//                    }
//
//                    $objPHPExcel->getActiveSheet()->SetCellValue($columnLetter . $rowCount, $fieldValue);
//                }
//
//                $j++;
//                $rowCount++;
//            }

            $objPHPExcel->getActiveSheet()->setTitle('Simple');
            //$gdImage = imagecreatefromjpeg(WWW_ROOT . ORG_IMAGE_DIR . '/28.jpeg');
            $gdImage = imagecreatefrompng(WWW_ROOT . 'img/logo-excel.png');
            // Add a drawing to the worksheetecho date('H:i:s') . " Add a drawing to the worksheet\n";
            $objDrawing = new PHPExcel_Worksheet_MemoryDrawing();
            $objDrawing->setName('Sample image');
            $objDrawing->setDescription('Sample image');
            $objDrawing->setImageResource($gdImage);
            $objDrawing->setRenderingFunction(PHPExcel_Worksheet_MemoryDrawing::RENDERING_JPEG);
            $objDrawing->setMimeType(PHPExcel_Worksheet_MemoryDrawing::MIMETYPE_DEFAULT);
            $objDrawing->setHeight(50);
            $objDrawing->setCoordinates('E1');
            $objDrawing->setWorksheet($objPHPExcel->getActiveSheet());

            //======set height of first column
            $objPHPExcel->getActiveSheet()->getRowDimension('1')->setRowHeight(50);


            $objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

            $filename = 'allOrgList.xlsx';
            $objWriter->save($folderToSaveXls . '/' . $filename);
            echo json_encode(array("filename" => $filename, "msg" => "success"));
            exit();

        } catch (Exception $e) {
            echo json_encode(array("filename" => $filename, "msg" => $e));
        }

        exit();
    }

}
