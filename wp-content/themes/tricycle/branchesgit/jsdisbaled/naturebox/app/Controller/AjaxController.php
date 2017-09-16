<?php

class AjaxController extends AppController {

    public $helpers = array('Html', 'Form');
    public $cachePrefix = "nature";

    public function beforeFilter() {
        parent::beforeFilter();
    }

    public function products($categoryId = '') {
        $categoryId = trim($categoryId);
        $catMappingList = $this->doFetchCatgories();
        
        $this->autoRender = false;
        $queryParams = array();
        $categoryId = isset($catMappingList["map_list"][$categoryId]) ? $catMappingList["map_list"][$categoryId] : $categoryId;
        
        $response = $this->AmpushApi->callUrl("products/category/" . $categoryId, $queryParams);
        //$response = array_values($response);
        $response  = json_decode($response , true);
        
        $this->response->type('json');
        $this->response->body(json_encode(array_values($response)));
    }

    public function product($entity_id = '') {
        $entity_id = trim($entity_id);
        
        $this->autoRender = false;
        $queryParams = array();        
        
        $response = $this->AmpushApi->callUrl("products/" . $entity_id, $queryParams);
        
        //$response = array_values($response);
        //$response  = json_decode($response , true);
        
        $this->response->type('json');
        $this->response->body($response);
    }
    

//end
}
