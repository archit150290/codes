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
    
    public $components = array('Session', "Email", "Cookie", "AmpushApi");
    public $cachePrefix = "nature";
    public function beforeFilter() {
        parent::beforeFilter();
        $jsUrl = Router::url('/', true) . "js/";
        $imagesUrl = Router::url('/', true) . "images/";
        $siteUrl = Router::url('/', true);
        $natureboxUrl = "https://naturebox.com";
        $productImageUrl = $natureboxUrl."/media/catalog/product/";
        $this->set("siteUrl",$siteUrl);
        $this->set("natureboxUrl",$natureboxUrl);
        $this->set("jsUrl",$jsUrl);
        $this->set("imagesUrl",$imagesUrl);
        $this->set("productImageUrl",$productImageUrl);
    }
    
    public function doFetchCatgories($refresh = false) {

         $plKey = "cats";
        $catData = Cache::read($plKey, $this->cachePrefix);
        
        if (!$catData || $refresh) {
            $catData = array();
            $response = $this->AmpushApi->callUrl("categories/", array());
            $response = json_decode($response, true);
            $customCatIds = $this->customCatIds();
            //pr($response); exit;
            
            if (count($response)) {
                foreach ($response as $i => $cat) {
                    if (isset($cat["url_key"]) && $cat["url_key"] != null && $cat["url_key"] != "" && in_array($cat["entity_id"], $customCatIds)) {
                        $catData["map_list"][$cat["url_key"]] = $cat["entity_id"];
                        unset($cat["image"]);
                        unset($cat["prod_ids"]);
                        unset($cat["nested_categories"]);
                        unset($cat["algorithm"]);
                        unset($cat["position"]);
                        unset($cat["parent_id"]);
                        $catData["data_by_key"][$cat["url_key"]] = $cat;
                        $catData["data_by_id"][$cat["entity_id"]] = $cat;
                    }
                }
            }
            
            Cache::write($plKey, $catData, $this->cachePrefix);
        }
        $catDatax = Cache::read($plKey, $this->cachePrefix);
        #pr($catDatax); exit;
        return $catData;
    }
    
     public function customCatIds($flagIDs = true) {
        $cats = array(73 => array("entity_id" => 73,
                "name" => "Baked Treats"),
            64 => array("entity_id" => 64,
                "name" => "Chips, Pretzels & Dips"),
            61 => array("entity_id" => 61,
                "name" => "Dried Fruit, Fruit Chews"),
            62 => array("entity_id" => 62,
                "name" => "Fruit & Nut Bars, Clusters"),
            10 => array("entity_id" => 10,
                "name" => "Granola, Oatmeal"),
            97 => array("entity_id" => 97,
                "name" => "Jerky Add-Ons"),
            63 => array("entity_id" => 63,
                "name" => "Nuts, Seeds, Nut Mixes"),
            48 => array("entity_id" => 48,
                "name" => "Popcorn")
        );
        return $flagIDs == true ? array_keys($cats) : $cats;
    }

}
