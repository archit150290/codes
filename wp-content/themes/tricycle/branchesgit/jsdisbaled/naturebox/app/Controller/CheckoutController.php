<?php

/**
 * Static content controller.
 *
 * This file will render views from views/pages/
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
App::uses('AppController', 'Controller');

/**
 * Static content controller
 *
 * Override this controller by placing a copy in controllers directory of an application
 *
 * @package       app.Controller
 * @link http://book.cakephp.org/2.0/en/controllers/pages-controller.html
 */
class CheckoutController extends AppController {

    /**
     * This controller does not use a model
     *
     * @var array
     */
    public $uses = array();
    private $siteId = '513cb76b8662344716527f2cd6583625';
    private $apiKey = 'e173b2c33074765e7ea5942eda16e67a';
    private $anaDomain = 'http://54.210.61.191/analytics/';

    public function beforeFilter() {
        parent::beforeFilter();
        $this->layout = "checkout";
        $this->AmpushApi->sourceDomain = $this->anaDomain;
        if ($_SERVER["HTTP_HOST"] == "localhost") {
            $this->AmpushApi->sourceDomain = "http://localhost/analytics/owa/";
        }
        if($this->Session->check("access_token")){
            $this->Session->write("access_token", false);
            $this->Session->delete("access_token");
        }
        
        
    }

    /**
     * Displays a view
     *
     * @return void
     * @throws NotFoundException When the view file could not be found
     * 	or MissingViewException in debug mode.
     */
    function index() {
        
    }

    function visitor_actions($visitor_id = '') {
        //http://54.210.61.191/analytics/api.php?owa_apiKey=d768fd7a6087bcd64148c65368f9f6e0&owa_do=getLatestVisits&owa_metrics=pageViews&owa_startDate=20160517&owa_endDate=20160520&owa_limit=10&owa_siteId=78d470d7f2c03bcadd950f474d7c0245&owa_format=json
        //http://54.210.61.191/analytics/api.php?owa_apiKey=d768fd7a6087bcd64148c65368f9f6e0&owa_do=getLatestActions
        //&owa_startDate=0160517&owa_endDate=20160520&owa_siteId=78d470d7f2c03bcadd950f474d7c0245&
        //owa_format=json&visitorID=1463723087881191824';

        $response = $this->getCategoryTable($visitor_id);
        $response["product"] = $this->_getProductTable($visitor_id);
        $response["rating"] = $this->_getRatingTable($visitor_id);
        $response["snack_spec"] = $this->_getSnackSpecTable($visitor_id);
        $response["plan"] = $this->_getPlanTable($visitor_id);

        #pr($response);         exit;


        

        //pr($tablesData);
        $this->set("tables", $response);
    }

    function getCategoryTable($visitorId = '') {
        $response = $this->_getTrackingData($visitorId, 'category');
        $data = array("category" => array(), "tile_position" => array());
        if (isset($response["resultsRows"])) {
            //category and tileposition data
            foreach ($response["resultsRows"] as $i => $item) {
                //$catName = str_replace("clicked_category_", "", $item["action_name"]);
                if ($item["action_name"] == 'clicked') {
                    $catName = $item["action_label"];
                    $item = null;
                    if (!isset($data[$catName])) {
                        $data["category"]["rows"][$catName] = array("clicks" => 1, "added_to_pantry" => 0, "checkouts" => 0);
                    } else {
                        $data["category"]["rows"][$catName]["clicks"] +=1;
                    }
                } else {
                    $catName = str_replace("tile_position_", "", $item["action_name"]);
                    if (!isset($data[$catName][$item["action_label"]])) {
                        $data["tile_position"]["rows"][$catName][$item["action_label"]] = 1;
                    } else {
                        $data["tile_position"]["rows"][$catName][$item["action_label"]] +=1;
                    }
                    $data["tile_position"]["cols"][$item["action_label"]] = $item["action_label"];
                }
                $response["resultsRows"][$i] = null;
            }
        }
        //pr($data); 
        $response = $this->_getTrackingData($visitorId, 'added_to_pantry');
        //pr($response);
        if (isset($response["resultsRows"])) {
            foreach ($response["resultsRows"] as $i => $item) {
                $catName = str_replace("clicked_category_", "", $item["action_name"]);
                $item = null;
                if (isset($data["category"]["rows"][$catName])) {
                    $data["category"]["rows"][$catName]["added_to_pantry"] += 1;
                }
                $response["resultsRows"][$i] = null;
            }
        }
        //pr($data); exit;
        return $data;
    }

    function _getRatingTable($visitorId = '') {

        $data = array();
        $eventKey = 'product_rating';
        $response = $this->_getTrackingData($visitorId, $eventKey);

        if (isset($response["resultsRows"])) {
            //category and tileposition data
            foreach ($response["resultsRows"] as $i => $item) {
                $rating = $item["action_label"];
                if (!isset($data["rows"][$rating])) {
                    $data["rows"][$rating]["value"] = 1;
                    $data["rows"][$rating]["rating"] = $rating;
                } else {
                    $data["rows"][$rating]["value"] += 1;
                    $data["rows"][$rating]["rating"] = $rating;
                }

                $response["resultsRows"][$i] = null;
            }
        }
        ksort($data["rows"]);
        //pr($data); exit;
        return $data;
    }

    function _getSnackSpecTable($visitorId = '') {

        $data = array();
        $eventKey = 'product_snack_spec';
        $response = $this->_getTrackingData($visitorId, $eventKey);


        if (isset($response["resultsRows"])) {
            //category and tileposition data
            foreach ($response["resultsRows"] as $i => $item) {
                $rating = $item["action_label"];
                if (!isset($data["rows"][$rating])) {
                    $data["rows"][$rating]["value"] = 1;
                    $data["rows"][$rating]["spec"] = $rating;
                } else {
                    $data["rows"][$rating]["value"] += 1;
                    $data["rows"][$rating]["spec"] = $rating;
                }

                $response["resultsRows"][$i] = null;
            }
        }
        ksort($data["rows"]);
        #pr($data); exit;
        return $data;
    }

    function _getPlanTable($visitorId = '') {

        $data = array("rows" => array(), "common" => array("box_size" => "", "delivery_frequency" => ""));
        $eventKey = 'plan';
        $response = $this->_getTrackingData($visitorId, $eventKey, "plan_selected");

        $mapping = json_decode('{"weekly": "Once A Week", "biweekly": "Every Two Weeks", "monthly": "Once A Month"}', true);
        $commonPlan = array();
        if (isset($response["resultsRows"])) {
            //category and tileposition data
            foreach ($response["resultsRows"] as $i => $item) {
                $rating = $item["action_label"];
                $ratingItems = explode("/", $rating);
                $snacks = $ratingItems[0] . " Snacks ";
                $snacks .= $mapping[$ratingItems[1]];

                if (!isset($data["rows"][$snacks])) {
                    $data["rows"][$snacks]["value"] = 1;
                    $data["rows"][$snacks]["plan"] = $snacks;
                } else {
                    $data["rows"][$snacks]["value"] += 1;
                    $data["rows"][$snacks]["plan"] = $snacks;
                }

                $commonPlan[$snacks] = $data["rows"][$snacks]["value"];
                if (!isset($data["common"]["delivery_frequency"][$ratingItems[1]])) {

                    $data["common"]["delivery_frequency"][$ratingItems[1]] = 1;
                } else {

                    $data["common"]["delivery_frequency"][$ratingItems[1]] += 1;
                }

                if (!isset($data["common"]["box_size"][$ratingItems[0]])) {


                    $data["common"]["box_size"][$ratingItems[0]] = 1;
                } else {


                    $data["common"]["box_size"][$ratingItems[0]] += 1;
                }

                $response["resultsRows"][$i] = null;
            }
        }
        ksort($data["rows"]);
        $data["common"]["box_size"] = array_flip($data["common"]["box_size"]);
        $data["common"]["delivery_frequency"] = array_flip($data["common"]["delivery_frequency"]);
        krsort($data["common"]["delivery_frequency"]);
        krsort($data["common"]["box_size"]);
        if (is_array($data["common"]["delivery_frequency"])) {
            $data["common"]["delivery_frequency"] = array_shift($data["common"]["delivery_frequency"]);
            $fre = $data["common"]["delivery_frequency"];
            $data["common"]["delivery_frequency"] = $mapping[$fre];
        }
        if (is_array($data["common"]["box_size"])) {
            $data["common"]["box_size"] = array_shift($data["common"]["box_size"]);
        }

        if (count($commonPlan)) {
            $commonPlan = array_flip($commonPlan);
            krsort($commonPlan);

            $commonPlan = array_shift($commonPlan);
        }


        $data["common"]["plan"] = $commonPlan;
        //pr($data);        exit;
        return $data;
    }

    function _getProductTable($visitorId = '') {
        $keys = array("added_to_pantry");
        $data = array();
        foreach ($keys as $n => $eventKey) {
            $response = $this->_getTrackingData($visitorId, $eventKey);


            if (isset($response["resultsRows"])) {
                //category and tileposition data
                foreach ($response["resultsRows"] as $i => $item) {
                    $catName = str_replace("clicked_category_", "", $item["action_name"]);
                    if (!isset($data[$catName]["products"]["row"][$item["action_label"]])) {
                        $data[$catName]["products"]["row"][$item["action_label"]]["product_more_info"] = 0;
                        $data[$catName]["products"]["row"][$item["action_label"]]["product_nutrition"] = 0;
                        $data[$catName]["products"]["row"][$item["action_label"]]["added_to_pantry"] = 1;
                        $data[$catName]["products"]["row"][$item["action_label"]]["removed_from_pantry"] = 0;
                        
                        
                    } else {
                        $data[$catName]["products"]["row"][$item["action_label"]]["added_to_pantry"] +=1;
                    }

                    $data[$catName]["total_clicks"]["product_nutrition"] = 0;
                    $data[$catName]["total_clicks"]["product_more_info"] = 0;
                    if (!isset($data[$catName]["total_clicks"]["added_to_pantry"])) {
                        $data[$catName]["total_clicks"]["added_to_pantry"] = 1;
                    } else {
                        $data[$catName]["total_clicks"]["added_to_pantry"] += 1;
                    }
                    $data[$catName]["total_clicks"]["removed_from_pantry"] = 0;

                    $response["resultsRows"][$i] = null;
                }
            }
        }

        //$response = $this->_getTrackingData($visitorId, "removed_from_pantry");
        $eventItems = array("product_more_info", "product_nutrition", "removed_from_pantry");
        
        $eventItemsTmpSrc = array("product_more_info", "product_nutrition", "added_to_pantry", "removed_from_pantry");
        foreach ($eventItems as $j => $eventKey) {
            $response = $this->_getTrackingData($visitorId, $eventKey);
            $eventItemsTmp = $eventItemsTmpSrc;
            if (isset($response["resultsRows"])) {
                //category and tileposition data
                foreach ($response["resultsRows"] as $i => $item) {
                    $catName = str_replace("clicked_category_", "", $item["action_name"]);
                    if (!isset($data[$catName]["products"]["row"][$item["action_label"]][$eventKey])) {

                        $data[$catName]["products"]["row"][$item["action_label"]][$eventKey] = 1;
                    } else {
                        $data[$catName]["products"]["row"][$item["action_label"]][$eventKey] +=1;
                    }
                    if (!isset($data[$catName]["total_clicks"][$eventKey])) {
                        $data[$catName]["total_clicks"][$eventKey] = 1;
                    } else {
                        $data[$catName]["total_clicks"][$eventKey] += 1;
                    }
                    unset($eventItemsTmp[$eventKey]);
                    foreach ($eventItemsTmp as $x => $eventKeyTmp) {
                        if (!isset($data[$catName]["total_clicks"][$eventKeyTmp])) {
                            $data[$catName]["total_clicks"][$eventKeyTmp] = 0;
                            $data[$catName]["products"]["row"][$item["action_label"]][$eventKeyTmp] = 0;
                        }
                    }

                    $response["resultsRows"][$i] = null;
                }
            } else {
                
            }
        }



        //pr($data);        exit;
        return $data;
    }

    function _getTrackingData($visitor_id = '', $actionGroup = '', $actionName = '', $actionLabel = '') {
        $query = array();
        if ($visitor_id > 0)
            $query["visitorID"] = $visitor_id;

        $query["owa_apiKey"] = $this->apiKey;
        $query["owa_siteId"] = $this->siteId;
        $query["owa_do"] = 'getLatestActions';
        //$query["owa_metrics"] = 'pageViews';
        $query["owa_startDate"] = "20160523";
        $query["owa_endDate"] = date("Ymd", strtotime("+1 days"));
        //$query["owa_limit"] = '10';
        $query["owa_format"] = 'json';

        if ($actionGroup != '')
            $query["action_group"] = $actionGroup;

        if ($actionName != '')
            $query["action_name"] = $actionName;

        if ($actionLabel != '')
            $query["action_label"] = $actionLabel;


        $urlOffset = "api.php";

        return json_decode($this->AmpushApi->callUrl($urlOffset, $query), true);
    }

}
