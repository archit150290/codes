<?php

namespace App\Controller;

use App\Controller\AppController;
use Cake\Event\Event;
use Cake\Routing\Router;
use Cake\Network\Exception\NotFoundException;
#use Cake\Mailer\Email;
use Cake\Core\Configure;
#use Cake\Validation\Validator;
use Cake\ORM\TableRegistry;
use Cake\Auth\DefaultPasswordHasher;

class UsersController extends AppController {

    public $components = array('Image', 'Common', 'Email', 'Analytics', 'Login','Aws','Config');
    var $can_edit_user;

    /**
     * Initialization hook method.
     *
     * Use this method to add common initialization code like loading components.
     *
     */
    public function initialize() {
        parent::initialize();
        //$this->loadComponent('Captcha');
        $this->loadComponent('Captcha', ['field' => 'securitycode']);
    }

    /**
     * This function is called after the controller’s initialize() method and before every action in the controller.
     * @param Event $event
     */
    public function beforeFilter(Event $event) {
        parent::beforeFilter($event);

        $this->Auth->allow(['login', 'logout', 'forgotPassword', 'resetPassword', 'design', 'removeImage', 'captcha', 'checkSessionActivity']); //echo $this->current_requested_action;die;
        switch ($this->current_requested_action) {
            case 'index':
                $this->title = 'CMS User - Dashboard';
                break;
            case 'login':
                $this->title = 'CMS User - Login';
                break;
            case 'changepassword':
                $this->title = 'CMS User - Change Password';
                break;
            case 'forgotpassword':
                $this->title = 'CMS User - Forgot Password';
                break;
            case 'resetpassword':
                $this->title = 'CMS User - Reset Password';
                break;
            case 'directory':
                $this->title = 'CMS User - List';
                break;
            case 'add':
                $this->title = 'CMS User - Add';
                break;
            case 'edit':
                $this->title = 'CMS User - Edit';
                break;
            case 'myprofile':
                $this->title = 'CMS User - My Profile';
                break;
            default:
                $this->title = $this->title;
        }
        $this->set('title', $this->title);

        $can_edit_user_flag = array_search("edit-user", $this->logged_in_user_capabilities);
        if ($can_edit_user_flag !== false) {
            $this->can_edit_user = 1;
        } else {
            $this->can_edit_user = 0;
        }
    }

    public function index() {
        $FolderPath = Configure::read('Analytics');
        $sessionValue = $this->request->session()->read('Auth.User');
        $defChannel = $sessionValue["default_channel"];
        //$defChannel = 4;
        $my_channels = $this->User->getMyChannels();
        //pr($my_channels);exit();
        //$my_channels = array(2 => "Patrika", 5 => "Catch English");
        $channelDetails = array("defaultChannel" => $defChannel, "otherChannel" => $my_channels);
        $this->set(compact('FolderPath', 'TopStory', 'sessionValue', 'channelDetails'));

    }

    public function dashboarddetail() {
        
    }

    /**
     * This function is used for user login.
     */
    public function login() {

        if ($this->Auth->user()) {
            return $this->redirect($this->Auth->redirectUrl());
        }

        if ($this->Cookie->check("autoLogin")) {
            $cookie_read = $this->Cookie->read("autoLogin");
            $user = $this->Users->newEntity(['remember_me' => 'Y']);

            $this->set("auto_login_details", ['username' => $cookie_read['remember_username'], 'password' => $cookie_read['remember_password']]);
        } else {
            $user = $this->Users->newEntity();
        }

        if ($this->request->is('post')) {
            //Captcha Code Starts here
            $username = trim($this->request->data['username']);
            $password = trim($this->request->data['password']);
            if (!$username) {
                $user->errors(['username' => ['_empty' => "Username is required."]]);
            }
            
            if (!$password) {
                $user->errors(['password' => ['_empty' => "Password is required."]]);
            }
            
            $captchadata = $this->request->data['securitycode'];
            if (!$captchadata) {
                $user->errors(['securitycode' => ['_empty' => "Captcha code is required."]]);
            }
            
            $accept_terms_and_conditions = isset($this->request->data['terms_and_cond']) ? $this->request->data['terms_and_cond'] : "";
            if($accept_terms_and_conditions != "Y") {
                $user->errors(['terms_and_cond' => ['_empty' => "Please accept terms and conditions."]]);
            }

            if (isset($this->request->data['securitycode']) && !empty($this->request->data['securitycode']) && $accept_terms_and_conditions == "Y" && $username && $password) {
                $this->Users->setCaptcha('securitycode', $this->Captcha->getCode('securitycode')); //captcha

                $user = $this->Users->patchEntity($user, $this->request->data, ['validate' => 'login']);
                if (!$user->errors()) {
                    $user = $this->Auth->identify();
                    
                    if ($user) {
                        if ($user['can_login'] == "Yes") {
                            if ($user['status'] == "Active") {
                                $user_token = $user["access_token"];
                                //CALL LOGIN COMPONENT FUNCTION
                                $request = $this->Login->updateLoginSession($user['id'],$user_token);
                                
                                if ($request == '1' || $request == '3' || $request == '4') {
                                    //if profile image is not set then default image will be shown from img folder.
                                    if (!$user['photo']) {
                                        $user['photo'] = "img/default_user_image.png";
                                    } else {
                                        //A slash is required if we need to show the photo not from img folder.
                                        if (substr($user['photo'], -1) != "/") {
                                            $user['photo'] = "upload" . $user['photo'];
                                        }
                                    }

                                    $user_data = $this->Users->find()
                                            ->select(["Users.id", "Users.username", "Users.first_name", "Users.last_name", "Users.first_name_lng", "Users.last_name_lng",
                                                "Users.slug", "Users.photo", "Users.biography", "Users.twitter", "Users.facebook", "Users.googleplus", "Users.linkedin", 
                                                "Users.mobile_number", "Users.address", "Users.preferred_language", "Users.default_location", "Users.default_channel",
                                                "Users.reporting_to", "Users.employee_id", "Users.is_author", "Users.user_type_id", "Users.is_senior_management_personnel",
                                                "Users.can_login", "Users.status", "Users.access_token"])
                                            ->contain([
                                                "UserRoles.Roles"=>["fields"=>["id", "capabilities", "publishing_channel_id", "publishing_locations", "social_media_publishing_pages", 
                                                    "home_priority_page","has_category_priority_page_access", "has_sub_category_priority_page_access", "has_location_priority_page_access", 
                                                    "has_photo_listing_priority_page_access", "has_video_listing_priority_page_access", "has_story_detail_priority_page_access", "has_trending_priority_page_access", 
                                                    "category_priority_pages", "sub_categories_priority_pages", "location_priority_pages", "priority_access"]],  
                                                "UserCategories.Categories"=>["fields"=>["id", "name", "slug", "parent", "status"]],
                                                "UserLocations.Locations"=>["fields"=>["id", "name", "slug", "parent", "status"]],
                                                "UserChannels.Channels"=>["fields"=>["id", "name", "slug", "parent", "status"]],
                                                "UserLanguages.Languages"=>["fields"=>["id", "name", "slug", "status"]],
                                                "UserZones.Zones"=>["fields"=>["id", "name", "name_lng", "status"]], 
                                                "UserDistrictHeadquarters.DistrictHeadquarters"=>["fields"=>["id", "name", "name_lng", "status"]], 
                                                "UserEditions.Editions"=>["fields"=>["id", "name", "name_lng", "status"]], 
                                                //"UserPublishingLocations.Locations"=>["fields"=>["id", "name", "slug", "parent", "status"]], 
                                                "UserSocialMediaPages"=>["fields"=>["id", "user_id", "cat_loc_id", "type", "social_media_type"]], 
                                                "UserPrioritySections"=>["fields"=>["user_id", "priority"]]])
                                            ->where(["Users.id" => $user['id']])
                                            ->first();
                                    
                                    $user_roles_data = $user_data->user_roles;
                                    $user_categories_data = $user_data->user_categories;
                                    $user_locations_data = $user_data->user_locations;
                                    $user_channels_data = $user_data->user_channels;
                                    $user_languages_data = $user_data->user_languages;
                                    $user_district_headquarters_data = $user_data->user_district_headquarters;
                                    $user_editions_data = $user_data->user_editions;
                                    $user_zones_data = $user_data->user_zones;

                                    //pr($user_roles_data);
                                    $user['role_capabilities'] = [];
                                    $user['all_capabilities'] = [];
                                    $user['role_publishing_locations'] = [];
                                    $user['all_role_publishing_locations'] = [];
                                    $user['all_role_social_media_publishing_pages'] = [];
                                    //$user['all_role_priority_access'] = [];
                                    if ($user_roles_data) {
                                        foreach ($user_roles_data as $user_role_data) {
                                            $capabilityArr = json_decode($user_role_data->role->capabilities);
                                            $user['role_capabilities'][$user_role_data->role->id] = $capabilityArr;
                                            $user['role_publishing_locations']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $this->Role->getRolePublishingLocations($user_role_data->role);
                                            $user['role_social_media_publishing_pages']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $this->Role->getRoleSocialMediaPublishingPages($user_role_data->role);
                                            $user['role_home_priority_page']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $user_role_data->role->home_priority_page;
                                            
                                            $user['role_has_category_priority_page_access']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $user_role_data->role->has_category_priority_page_access;
                                            $user['role_has_sub_category_priority_page_access']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $user_role_data->role->has_sub_category_priority_page_access;
                                            $user['role_has_location_priority_page_access']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $user_role_data->role->has_location_priority_page_access;
                                            $user['role_has_photo_listing_priority_page_access']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $user_role_data->role->has_photo_listing_priority_page_access;
                                            $user['role_has_video_listing_priority_page_access']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $user_role_data->role->has_video_listing_priority_page_access;
                                            $user['role_has_story_detail_priority_page_access']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $user_role_data->role->has_story_detail_priority_page_access;
                                            $user['role_has_trending_priority_page_access']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $user_role_data->role->has_trending_priority_page_access;
                                            
                                            $user['role_category_priority_pages']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $this->Role->getRoleCategoryPriorityPages($user_role_data->role);
                                            $user['role_sub_category_priority_pages']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $this->Role->getRoleSubCategoryPriorityPages($user_role_data->role);
                                            $user['role_location_priority_pages']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $this->Role->getRoleLocationPriorityPages($user_role_data->role);
                                            $user['role_priority_access']['channel_'.$user_role_data->role->publishing_channel_id][$user_role_data->role->id] = $this->Role->getRolePriorityAccess($user_role_data->role);
                                        }

                                        if ($user['role_capabilities']) {
                                            $all_caps = [];
                                            foreach ($user['role_capabilities'] as $role_capability) {
                                                $all_caps = array_merge($all_caps, $role_capability);
                                            }

                                            $user['all_capabilities'] = array_unique($all_caps);
                                            unset($user['role_capabilities']);
                                        }
                                        
                                        
                                        if ($user['role_publishing_locations']) {
                                            $all_publishing_locations = [];
                                            foreach ($user['role_publishing_locations'] as $key => $role_publishing_locations) {
                                                foreach($role_publishing_locations as $role_publishing_location)
                                                {
                                                    if($role_publishing_location)
                                                    {
                                                        $all_publishing_locations = array_merge($all_publishing_locations, $role_publishing_location);
                                                    }
                                                }
                                                $user['all_role_publishing_locations'][$key] = array_unique($all_publishing_locations);
                                            }
                                            unset($user['role_publishing_locations']);
                                        }
                                        
                                        if ($user['role_social_media_publishing_pages']) {
                                            $facebook_categories = [];
                                            $facebook_locations = [];
                                            $twitter_categories = [];
                                            $twitter_locations = [];
                                            foreach ($user['role_social_media_publishing_pages'] as $key => $publishing_pages) {
                                                foreach($publishing_pages as $publishing_page)
                                                {
                                                    if($publishing_page)
                                                    {
                                                        $facebook_categories = array_merge($facebook_categories, $publishing_page['facebook']['category']);
                                                        $facebook_locations = array_merge($facebook_locations, $publishing_page['facebook']['location']);
                                                        $twitter_categories = array_merge($twitter_categories, $publishing_page['twitter']['category']);
                                                        $twitter_locations = array_merge($twitter_locations, $publishing_page['twitter']['location']);
                                                    }
                                                }
                                                $user['all_role_social_media_publishing_pages'][$key]['facebook']['category'] = array_unique($facebook_categories);
                                                $user['all_role_social_media_publishing_pages'][$key]['facebook']['location'] = array_unique($facebook_locations);
                                                $user['all_role_social_media_publishing_pages'][$key]['twitter']['category'] = array_unique($twitter_categories);
                                                $user['all_role_social_media_publishing_pages'][$key]['twitter']['location'] = array_unique($twitter_locations);
                                            }
                                            unset($user['role_social_media_publishing_pages']);
                                        }
                                        
                                        if ($user['role_home_priority_page']) {
                                            $home_priority_page = "No";
                                            foreach ($user['role_home_priority_page'] as $key => $role_home_priority_pages) {
                                                foreach($role_home_priority_pages as $role_home_priority_page)
                                                {
                                                    if($role_home_priority_page == "Yes")
                                                    {
                                                        $home_priority_page = "Yes";
                                                    }
                                                }
                                                $user['all_role_home_priority_page'][$key] = $home_priority_page;
                                            }
                                            unset($user['role_home_priority_page']);
                                        }
                                        
                                        if ($user['role_has_category_priority_page_access']) {
                                            $category_priority_page = "No";
                                            foreach ($user['role_has_category_priority_page_access'] as $key => $role_has_category_priority_pages) {
                                                foreach($role_has_category_priority_pages as $role_has_category_priority_page)
                                                {
                                                    if($role_has_category_priority_page == "Yes")
                                                    {
                                                        $category_priority_page = "Yes";
                                                    }
                                                }
                                                $user['all_role_has_category_priority_page_access'][$key] = $category_priority_page;
                                            }
                                            unset($user['role_has_category_priority_page_access']);
                                        }
                                        
                                        if ($user['role_has_sub_category_priority_page_access']) {
                                            $sub_category_priority_page = "No";
                                            foreach ($user['role_has_sub_category_priority_page_access'] as $key => $role_has_sub_category_priority_pages) {
                                                foreach($role_has_sub_category_priority_pages as $role_has_sub_category_priority_page)
                                                {
                                                    if($role_has_sub_category_priority_page == "Yes")
                                                    {
                                                        $sub_category_priority_page = "Yes";
                                                    }
                                                }
                                                $user['all_role_has_sub_category_priority_page_access'][$key] = $sub_category_priority_page;
                                            }
                                            unset($user['role_has_sub_category_priority_page_access']);
                                        }
                                        
                                        if ($user['role_has_location_priority_page_access']) {
                                            $location_priority_page = "No";
                                            foreach ($user['role_has_location_priority_page_access'] as $key => $role_has_location_priority_pages) {
                                                foreach($role_has_location_priority_pages as $role_has_location_priority_page)
                                                {
                                                    if($role_has_location_priority_page == "Yes")
                                                    {
                                                        $location_priority_page = "Yes";
                                                    }
                                                }
                                                $user['all_role_has_location_priority_page_access'][$key] = $location_priority_page;
                                            }
                                            unset($user['role_has_location_priority_page_access']);
                                        }
                                        
                                        if ($user['role_has_photo_listing_priority_page_access']) {
                                            $photo_priority_page = "No";
                                            foreach ($user['role_has_photo_listing_priority_page_access'] as $key => $role_has_photo_listing_priority_pages) {
                                                foreach($role_has_photo_listing_priority_pages as $role_has_photo_listing_priority_page)
                                                {
                                                    if($role_has_photo_listing_priority_page == "Yes")
                                                    {
                                                        $photo_priority_page = "Yes";
                                                    }
                                                }
                                                $user['all_role_has_photo_listing_priority_page_access'][$key] = $photo_priority_page;
                                            }
                                            unset($user['role_has_photo_listing_priority_page_access']);
                                        }
                                        
                                        if ($user['role_has_video_listing_priority_page_access']) {
                                            $video_priority_page = "No";
                                            foreach ($user['role_has_video_listing_priority_page_access'] as $key => $role_has_video_listing_priority_pages) {
                                                foreach($role_has_video_listing_priority_pages as $role_has_video_listing_priority_page)
                                                {
                                                    if($role_has_video_listing_priority_page == "Yes")
                                                    {
                                                        $video_priority_page = "Yes";
                                                    }
                                                }
                                                $user['all_role_has_video_listing_priority_page_access'][$key] = $video_priority_page;
                                            }
                                            unset($user['role_has_video_listing_priority_page_access']);
                                        }
                                        
                                        if ($user['role_has_story_detail_priority_page_access']) {
                                            $story_detail_priority_page = "No";
                                            foreach ($user['role_has_story_detail_priority_page_access'] as $key => $role_has_story_detail_priority_pages) {
                                                foreach($role_has_story_detail_priority_pages as $role_has_story_detail_priority_page)
                                                {
                                                    if($role_has_story_detail_priority_page == "Yes")
                                                    {
                                                        $story_detail_priority_page = "Yes";
                                                    }
                                                }
                                                $user['all_role_has_story_detail_priority_page_access'][$key] = $story_detail_priority_page;
                                            }
                                            unset($user['role_has_story_detail_priority_page_access']);
                                        }
                                        
                                        if ($user['role_has_trending_priority_page_access']) {
                                            $trending_priority_page = "No";
                                            foreach ($user['role_has_trending_priority_page_access'] as $key => $role_has_trending_priority_pages) {
                                                foreach($role_has_trending_priority_pages as $role_has_trending_priority_page)
                                                {
                                                    if($role_has_trending_priority_page == "Yes")
                                                    {
                                                        $trending_priority_page = "Yes";
                                                    }
                                                }
                                                $user['all_role_has_trending_priority_page_access'][$key] = $trending_priority_page;
                                            }
                                            unset($user['role_has_trending_priority_page_access']);
                                        }
                                        
                                        if ($user['role_category_priority_pages']) {
                                            $all_role_category_priority_pages = [];
                                            foreach ($user['role_category_priority_pages'] as $key => $role_category_priority_pages) {
                                                foreach($role_category_priority_pages as $role_category_priority_page)
                                                {
                                                    if($role_category_priority_page)
                                                    {
                                                        $all_role_category_priority_pages = array_merge($all_role_category_priority_pages, $role_category_priority_page);
                                                    }
                                                }
                                                $user['all_role_category_priority_pages'][$key] = array_unique($all_role_category_priority_pages);
                                            }
                                            unset($user['role_category_priority_pages']);
                                        }
                                        
                                        if ($user['role_sub_category_priority_pages']) {
                                            $all_role_sub_category_priority_pages = [];
                                            foreach ($user['role_sub_category_priority_pages'] as $key => $role_sub_category_priority_pages) {
                                                foreach($role_sub_category_priority_pages as $role_sub_category_priority_page)
                                                {
                                                    if($role_sub_category_priority_page)
                                                    {
                                                        $all_role_sub_category_priority_pages = array_merge($all_role_sub_category_priority_pages, $role_sub_category_priority_page);
                                                    }
                                                }
                                                $user['all_role_sub_category_priority_pages'][$key] = array_unique($all_role_sub_category_priority_pages);
                                            }
                                            unset($user['role_sub_category_priority_pages']);
                                        }
                                        
                                        if ($user['role_location_priority_pages']) {
                                            $all_role_location_priority_pages = [];
                                            foreach ($user['role_location_priority_pages'] as $key => $role_location_priority_pages) {
                                                foreach($role_location_priority_pages as $role_location_priority_page)
                                                {
                                                    if($role_location_priority_page)
                                                    {
                                                        $all_role_location_priority_pages = array_merge($all_role_location_priority_pages, $role_location_priority_page);
                                                    }
                                                }
                                                $user['all_role_location_priority_pages'][$key] = array_unique($all_role_location_priority_pages);
                                            }
                                            unset($user['role_location_priority_pages']);
                                        }
                                        
                                        if ($user['role_priority_access']) {
                                            $all_role_priority_access = [];
                                            foreach ($user['role_priority_access'] as $key => $role_priority_accesses) {
                                                foreach($role_priority_accesses as $role_priority_access)
                                                {
                                                    if($role_priority_access)
                                                    {
                                                        $all_role_priority_access = array_merge($all_role_priority_access, $role_priority_access);
                                                    }
                                                }
                                                $user['all_priority_access'][$key] = array_unique($all_role_priority_access);
                                            }
                                            unset($user['role_priority_access']);
                                        }
                                    }
                                    
                                    $user["categories"] = [];
                                    $user["submission_categories"] = [];
                                    $user["moderation_categories"] = [];
                                    if ($user_categories_data) {
                                        foreach ($user_categories_data as $user_category_data) {
                                            if (isset($user_category_data->category->id)) {
                                                if($user_category_data->category_type == "Submission")
                                                {
                                                    $user["submission_categories"][] = ["id" => $user_category_data->category->id, "name" => $user_category_data->category->name, "slug" => $user_category_data->category->slug, "parent" => $user_category_data->category->parent, "status" => $user_category_data->category->status];
                                                } 
                                                else if($user_category_data->category_type == "Moderation")
                                                {
                                                    $user["moderation_categories"][] = ["id" => $user_category_data->category->id, "name" => $user_category_data->category->name, "slug" => $user_category_data->category->slug, "parent" => $user_category_data->category->parent, "status" => $user_category_data->category->status];
                                                } 
                                                else if($user_category_data->category_type == "Publishing")
                                                {
                                                    $user["categories"][] = ["id" => $user_category_data->category->id, "name" => $user_category_data->category->name, "slug" => $user_category_data->category->slug, "parent" => $user_category_data->category->parent, "status" => $user_category_data->category->status];
                                                }
                                            }
                                        }
                                    }

                                    $user["locations"] = [];
                                    if ($user_locations_data) {
                                        foreach ($user_locations_data as $user_location_data) {
                                            $user["locations"][] = ["id" => $user_location_data->location->id, "name" => $user_location_data->location->name, "slug" => $user_location_data->location->slug, "parent" => $user_location_data->location->parent, "status" => $user_location_data->location->status];
                                        }
                                    }

                                    $user["channels"] = [];
                                    if ($user_channels_data) {
                                        foreach ($user_channels_data as $user_channel_data) {
                                            if ($user_channel_data->status == 'Active' && $user_channel_data->channel->status == 'Active' && $user_channel_data->channel->parent != 0)
                                                $user["channels"][] = ["id" => $user_channel_data->channel->id, "name" => $user_channel_data->channel->name, "slug" => $user_channel_data->channel->slug, "parent" => $user_channel_data->channel->parent, "status" => $user_channel_data->channel->status];
                                        }
                                    }

                                    $user["languages"] = [];
                                    if ($user_languages_data) {
                                        foreach ($user_languages_data as $user_language_data) {
                                            $user["languages"][] = ["id" => $user_language_data->language->id, "name" => $user_language_data->language->name, "slug" => $user_language_data->language->slug, "status" => $user_language_data->language->status];
                                        }
                                    }

                                    $user["district_headquarters"] = [];
                                    if ($user_district_headquarters_data) {
                                        foreach ($user_district_headquarters_data as $user_headquarter_data) {
                                            $user["district_headquarters"][] = ["id" => $user_headquarter_data->district_headquarter->id, "name" => $user_headquarter_data->district_headquarter->name, "name_lng" => $user_headquarter_data->district_headquarter->name_lng, "status" => $user_headquarter_data->district_headquarter->status];
                                        }
                                    }
                                    $user["user_editions"] = [];
                                    if ($user_editions_data) {
                                        foreach ($user_editions_data as $user_edition_data) {
                                            $user["user_editions"][] = ["id" => $user_edition_data->edition->id, "name" => $user_edition_data->edition->name, "name_lng" => $user_edition_data->edition->name_lng, "status" => $user_edition_data->edition->status];
                                        }
                                    }
                                    $user["user_zones"] = [];
                                    if ($user_zones_data) {
                                        foreach ($user_zones_data as $user_zone_data) {
                                            $user["user_zones"][] = ["id" => $user_zone_data->zone->id, "name" => $user_zone_data->zone->name, "name_lng" => $user_zone_data->zone->name_lng, "status" => $user_zone_data->zone->status];
                                        }
                                    }
                                    //pr($user);die;
                                    $this->Auth->setUser($user);
                                    $remember_me = isset($this->request->data['remember_me']) ? $this->request->data['remember_me'] : "";
                                    $cookie = array();
                                    if ($remember_me == "Y") {
                                        $cookie['remember_username'] = $this->request->data['username'];
                                        $cookie['remember_password'] = $this->request->data['password'];

                                        $this->Cookie->write("autoLogin", $cookie);
                                    } else {
                                        $this->Cookie->delete("autoLogin");
                                    }
                                    return $this->redirect($this->Auth->redirectUrl());
                                } else {
                                    //exit;
                                    $this->Flash->error('User already login on other device.');
                                    $this->redirect($this->Auth->logout());
                                }
                            } else {
                                $this->Flash->error('Your account is not active.');
                                $this->redirect($this->Auth->logout());
                            }
                        } else {
                            $this->Flash->error('You are not allowed to login.');
                            $this->redirect($this->Auth->logout());
                        }
                    } else {
                        $this->Flash->error('Invalid Username or Password entered, please try again.');
                    }
                } else {
                    //$this->Flash->error('Please fill CAPTCHA details.');
                    //$user->username = $this->request->data['username'];
                }
            } else {
                $errors = $user->errors();
                $errorhtml = $this->Common->getErrorHtml($errors);
                $this->Flash->error(__($errorhtml));
            }
        }

        $this->set('user', $user);
        $this->set('login_page', 'login');
    }

    /**
     * This function is used to logout the logged in user.
     */
    public function logout() {
        $this->loadModel('LoginSessions');
        $query = $this->LoginSessions->query();
        $out_time = date('Y-m-d H:i:s');
        $os = PHP_OS;
        $ip_address = $_SERVER['REMOTE_ADDR'];
        $query->update()->set(['status' => "Logout", 'out_time' => $out_time, 'os' => $os, 'ip_address' => $ip_address])->where(['user_id' => $this->Auth->User("id")])->execute();
        $this->Cookie->delete('autoLogin');
        return $this->redirect($this->Auth->logout());
    }

    /**
     * This function is used to show the list of users.
     * @param type $user_id
     * @param type $status
     */
    public function directory($user_id = null, $status = null) {
        $this->loadModel('Roles');

        $user_id = $this->request->session()->read('Auth.User.id');
        $my_channels = $this->User->getMyChannels();

        if ($my_channels) {
            $my_channel_ids = array_keys($my_channels);

            $role_options = $this->Roles->find('all')->where(['status !=' => 'Trash']);
            $all_roles = [];
            if ($role_options) {
                foreach ($role_options as $role_option) {
                    $all_roles[$role_option->id] = $role_option->name;
                }
            }

            $search_role = "";
            $search_channel = "";
            $filter_condition = [];

            if ($this->request->is('get') && $this->request->query) {
                if (isset($this->request->query['search']) && $this->request->query['search'] != "") {
                    $search_string = trim($this->request->query['search']);
                    array_push($filter_condition, [
                        'OR' => [
                            'Users.username LIKE' => "%" . $search_string . "%",
                            'Users.first_name LIKE' => "%" . $search_string . "%",
                            'Users.last_name LIKE' => "%" . $search_string . "%",
                        ]
                    ]);
                }

                if (isset($this->request->query['role']) && $this->request->query['role'] != "") {
                    $search_role = trim($this->request->query['role']);
                }

                if (isset($this->request->query['channel']) && $this->request->query['channel'] != "") {
                    $search_channel = trim($this->request->query['channel']);
                    if (!in_array($search_channel, $my_channel_ids)) {
                        $search_channel = "";
                    }
                }

                $status_type = ['All', 'Active', 'Inactive', 'Trash'];
                if (isset($this->request->query['status']) && $this->request->query['status'] != "") {
                    $search_status = trim($this->request->query['status']);
                    array_push($filter_condition, ["Users.status" => $search_status]);
                }
            }

            $user_condition = [];
            // array_push($user_condition, ['Users.status !=' => 'Trash']);

            $record_cnt = $this->Users->find('all', [
                        'fields' => [
                            'status' => 'Users.status',
                            'count_no' => 'COUNT(Users.id)'
                        ],
                        'group' => ['Users.status'],
                    ])
                    ->leftJoinWith('UserChannels', function ($q) use ($my_channel_ids) {
                        return $q->where(['UserChannels.channel_id IN' => $my_channel_ids]);
                    });

            $count_by_status = [];
            if ($record_cnt) {
                $count_by_status['All'] = 0;
                $count_by_status['Active'] = 0;
                $count_by_status['Inactive'] = 0;
                $count_by_status['Trash'] = 0;
                foreach ($record_cnt as $cnt) {
                    if ($cnt->status == "Active") {
                        $count_by_status['Active'] = $cnt->count_no;
                    } else if ($cnt->status == "Inactive") {
                        $count_by_status['Inactive'] = $cnt->count_no;
                    } else if ($cnt->status == "Trash") {
                        $count_by_status['Trash'] = $cnt->count_no;
                    }
                    $count_by_status['All'] = $count_by_status['All'] + $cnt->count_no;
                }
            }

            //If search by channel - Commented temporarily
            if ($search_channel) {
                $my_channel_ids = [];
                $my_channel_ids[] = $search_channel;
            }

            if ($search_role) {
                if($search_channel) {
                    $users = $this->Users->find()
                        ->contain(['UserRoles', 'UserRoles.Roles', 'UserChannels.Channels'])
                        ->where(array_merge($user_condition, $filter_condition))
                        ->distinct(['Users.id'])
                        ->innerJoinWith('UserChannels', function ($q) use ($my_channel_ids) {
                            return $q->where(['UserChannels.channel_id IN' => $my_channel_ids]);
                        })
                        ->innerJoinWith('UserRoles', function ($q) use ($search_role) {
                            return $q->where(['UserRoles.role_id' => $search_role]);
                        });
                } else {
                    $users = $this->Users->find()
                        ->contain(['UserRoles', 'UserRoles.Roles', 'UserChannels.Channels'])
                        ->where(array_merge($user_condition, $filter_condition))
                        ->distinct(['Users.id'])
                        ->leftJoinWith('UserChannels', function ($q) use ($my_channel_ids) {
                            return $q->where(['UserChannels.channel_id IN' => $my_channel_ids]);
                        })
                        ->innerJoinWith('UserRoles', function ($q) use ($search_role) {
                            return $q->where(['UserRoles.role_id' => $search_role]);
                        });
                }
            } else {
                if($search_channel) {
                    $users = $this->Users->find()
                        ->contain(['UserRoles', 'UserRoles.Roles', 'UserChannels.Channels'])
                        ->where(array_merge($user_condition, $filter_condition))
                        ->distinct(['Users.id'])
                        ->innerJoinWith('UserChannels', function ($q) use ($my_channel_ids) {
                            return $q->where(['UserChannels.channel_id IN' => $my_channel_ids]);
                        });
                } else {
                    $users = $this->Users->find()
                        ->contain(['UserRoles', 'UserRoles.Roles', 'UserChannels.Channels'])
                        ->where(array_merge($user_condition, $filter_condition))
                        ->distinct(['Users.id'])
                        ->leftJoinWith('UserChannels', function ($q) use ($my_channel_ids) {
                            return $q->where(['UserChannels.channel_id IN' => $my_channel_ids]);
                            //return $q->where(['OR' => ['UserChannels.channel_id IN' => $my_channel_ids, 'UserChannels.channel_id' => ""]]);
                        });
                }
            }

            $users = $this->paginate($users);
            $item_count = $users->count();

            $siteurl = Router::url("/", true);
            $this->set(compact('all_roles', 'users', 'count_by_status', 'item_count', 'siteurl', 'my_channels'));
        } else {
            $this->Flash->error(__("None of the channel is assigned to you."));
        }
    }

    /**
     * This function is used to create a new user.
     */
    public function add() {
        $this->loadModel('UserCategories');
        $this->loadModel('UserChannels');
        $this->loadModel('UserLocations');
        $this->loadModel('UserRoles');
        $this->loadModel('Roles');
        $this->loadModel('Languages');
        $this->loadModel('UserZones');
        $this->loadModel('UserEditions');
        $this->loadModel('UserDistrictHeadquarters');

        $my_channels = $this->User->getMyChannels();
        $my_channel_ids = array_keys($my_channels);

        $user = $this->Users->newEntity();
        $error_flag = 0;
        if ($this->request->is('post')) {
            //pr($this->request->data['default_channel']); exit;
            //Image code starts here
            if (isset($this->request->data['photo']['tmp_name']) && $this->request->data['photo']['tmp_name'] != "") {
                $fileName = $this->request->data['photo']['name'];
                $uploadPath = 'upload/profile/';

                $currentYearFolder = date("Y");
                if (!file_exists(WWW_ROOT . "upload/profile/" . $currentYearFolder)) {
                    mkdir(WWW_ROOT . "upload/profile/" . $currentYearFolder);
                    chmod(WWW_ROOT . "upload/profile/" . $currentYearFolder, 0777);
                }
                $profilePath = $uploadPath . $currentYearFolder . "/";

                $file_ext = pathinfo($fileName, PATHINFO_EXTENSION);
                $arr_ext = array('jpg', 'jpeg', 'gif', 'png');

                $uploadFileNEW = basename($fileName, $file_ext);
                $uploadFileNEW = preg_replace('/[^A-Za-z0-9\-]/', '', $uploadFileNEW);
                $imageName = $uploadFileNEW . "_" . time() . '.' . $file_ext;
                $uploadFile = $profilePath . $uploadFileNEW . "_" . time() . '.' . $file_ext;

                if (in_array($file_ext, $arr_ext)) {

                    if (move_uploaded_file($this->request->data['photo']['tmp_name'], $uploadFile)) {
                        $this->request->data['photo'] = "/profile/" . $currentYearFolder . "/" . $imageName;

                        copy($uploadFile, $profilePath . $imageName);

                        $this->Image->resize($profilePath . $imageName, 280, 280, false);

                        //Added By Babulal Prasad to save to S3Bucket 
                        //Added for image upload func.
                        //foreach ($this->request->data['default_channel'] as $channel_id) {
                        $userChannelId = $this->request->data['default_channel'];
                            if ($this->Aws->setS3Bucket($userChannelId, $this->Config->getVal('aws-bucket', $userChannelId))) {
                                $resultAWS = $this->Aws->uploadToBucket("upload/profile/" . $currentYearFolder . "/" . $imageName, WWW_ROOT . "upload/profile/" . $currentYearFolder . "/" . $imageName);
                            }    
                        //}
                        
                        if (file_exists($uploadFile)) {
                            @unlink(WWW_ROOT . $profilePath . $user->photo);
                        }
                    } else {
                        $this->Flash->error(__('Unable to upload file, please try again.'));
                    }
                } else {
                    unset($this->request->data['photo']);
                }
            } else {
                //unset($this->request->data['photo']);
                $this->request->data['photo'] = $this->request->data['photo_path'];
                
            }
            //end

            //Apply trim on all the requested data.
            $this->request->data = array_map(function ($post_data) {return is_string($post_data) ? trim($post_data) : $post_data;}, $this->request->data);
            
            $this->request->data['created_by'] = $this->request->session()->read('Auth.User.id');
            $this->request->data['modified_by'] = $this->request->data['created_by'];

            //User can login - Start
            $this->request->data['can_login'] = isset($this->request->data['can_login']) && $this->request->data['can_login'] ? $this->request->data['can_login'] : "No";
            //User can login - End
            //User is author - Start
            $this->request->data['is_author'] = isset($this->request->data['is_author']) && $this->request->data['is_author'] ? $this->request->data['is_author'] : "No";
            //User is author - End
            //User is senior management personnel - Start
            $this->request->data['is_senior_management_personnel'] = isset($this->request->data['is_senior_management_personnel']) && $this->request->data['is_senior_management_personnel'] ? $this->request->data['is_senior_management_personnel'] : "No";
            //User is senior management personnel - Start

            $roles = isset($this->request->data['roles']) ? $this->request->data['roles'] : "";
            $role_array = [];
            if ($roles) {
                foreach ($roles as $role) {
                    array_push($role_array, ["role_id" => $role]);
                }
            }
            $this->request->data['user_roles'] = $role_array;

            //$this->request->data['status_log'] = json_encode([["user_id" => $this->Auth->User("id"), "status" => "Active", "datetime" => date("Y-m-d H:i:s")]]);

            //Publishing category
            $categories = isset($this->request->data['category']) ? $this->request->data['category'] : "";
            $category_array = [];
            if ($categories) {
                foreach ($categories as $category) {
                    array_push($category_array, ["category_id" => $category, "category_type"=>"Publishing"]);
                }
            }
            
            //Submission category
            $submission_categories = isset($this->request->data['submission_categories']) && $this->request->data['submission_categories'] ? $this->request->data['submission_categories'] : [];
            if ($submission_categories) {
                foreach ($submission_categories as $category) {
                    array_push($category_array, ["category_id" => $category, "category_type"=>"Submission"]);
                }
            }
            
            //Moderation category
            $moderation_categories = isset($this->request->data['moderation_categories']) && $this->request->data['moderation_categories'] ? $this->request->data['moderation_categories'] : [];
            if ($moderation_categories) {
                foreach ($moderation_categories as $category) {
                    array_push($category_array, ["category_id" => $category, "category_type"=>"Moderation"]);
                }
            }
            $this->request->data['user_categories'] = $category_array;

            //Locations - Start
            $location_array = [];
            $locations = isset($this->request->data['other_locations']) && $this->request->data['other_locations'] ? $this->request->data['other_locations'] : [];

            if (isset($this->request->data['default_location']) && $this->request->data['default_location']) {
                $locations[] = $this->request->data['default_location'];
            }
            $locations = array_unique($locations);

            if ($locations) {
                foreach ($locations as $location) {
                    if ($location == $this->request->data['default_location']) {
                        array_push($location_array, ["location_id" => $location, "is_default" => "Yes"]);
                    } else {
                        array_push($location_array, ["location_id" => $location]);
                    }
                }
            }
            $this->request->data['user_locations'] = $location_array;
            //Locations - End
            //District Headquarters - Start
            $district_headquarter_array = [];
            $district_headquarters = isset($this->request->data['district_headquarters']) && $this->request->data['district_headquarters'] ? $this->request->data['district_headquarters'] : [];
            if ($district_headquarters) {
                foreach ($district_headquarters as $district_headquarter_id) {
                    array_push($district_headquarter_array, ["district_headquarter_id" => $district_headquarter_id]);
                }
            }
            $this->request->data['user_district_headquarters'] = $district_headquarter_array;
            //District Headquarters - End
            //Editions - Start
            $edition_array = [];
            $editions = isset($this->request->data['editions']) && $this->request->data['editions'] ? $this->request->data['editions'] : [];

            if ($editions) {
                foreach ($editions as $edition_id) {
                    array_push($edition_array, ["edition_id" => $edition_id]);
                }
            }
            $this->request->data['user_editions'] = $edition_array;
            //Editions - End
            //Channels - Start
            $channel_array = [];
            $channels = isset($this->request->data['channels']) && $this->request->data['channels'] ? $this->request->data['channels'] : [];
            if (isset($this->request->data['default_channel']) && $this->request->data['default_channel']) {
                $channels[] = $this->request->data['default_channel'];
            }
            $channels = array_unique($channels);

            if ($channels) {
                foreach ($channels as $channel) {
                    if ($channel == $this->request->data['default_channel']) {
                        array_push($channel_array, ["channel_id" => $channel, "is_default" => "Yes"]);
                    } else {
                        array_push($channel_array, ["channel_id" => $channel]);
                    }
                }
            }
            $this->request->data['user_channels'] = $channel_array;
            //Channels - End
            
            //Zones - Start
            $zone_array = [];
            $zones = isset($this->request->data['zones']) && $this->request->data['zones'] ? $this->request->data['zones'] : [];
            if ($zones) {
                foreach ($zones as $zone) {
                    array_push($zone_array, ["zone_id" => $zone]);
                }
            }
            $this->request->data['user_zones'] = $zone_array;
            //Zones - End
            
            //Language - Start
            $language_array = [];
            $languages = isset($this->request->data['languages']) && $this->request->data['languages'] ? $this->request->data['languages'] : [];
            if ($languages) {
                foreach ($languages as $language) {
                    array_push($language_array, ["language_id" => $language]);
                }
            }
            $this->request->data['user_languages'] = $language_array;
            //Language - End

            $this->request->data['password'] = $passwordrandom = $this->Common->randompasswordgenerator(8);

            $user_entity = $this->Users->patchEntity($user, $this->request->data, [
                'associated' => ['UserRoles', 'UserCategories', 'UserLocations', 'UserChannels', 'UserLanguages', 'UserZones', 'UserDistrictHeadquarters', 'UserEditions']
            ]);

            if(isset($this->request->data['is_submitter']) && $this->request->data['is_submitter'] == "Yes") {
                if(!(isset($this->request->data['submission_categories']) && $this->request->data['submission_categories'])) {
                    $user_entity->errors(['user_submission_categories' => ['_empty' => "Submission category is required."]]);
                }
            }
            
            if(isset($this->request->data['is_moderator']) && $this->request->data['is_moderator'] == "Yes") {
                if(!(isset($this->request->data['moderation_categories']) && $this->request->data['moderation_categories'])) {
                    $user_entity->errors(['user_moderation_categories' => ['_empty' => "Moderation category is required."]]);
                }
            }
            
            if(isset($this->request->data['is_publisher']) && $this->request->data['is_publisher'] == "Yes") {
                if(!(isset($this->request->data['category']) && $this->request->data['category'])) {
                    $user_entity->errors(['user_categories' => ['_empty' => "Publishing category is required."]]);
                }
            }

            if ($error_flag != 1) {
                if ($this->Users->save($user_entity)) {
                    $id = $user_entity->id;
                    $this->Revision->saveUserRevision($id, $this->request->data);
                    $this->Redis->saveAuthorData($id); //This will save the author data on Redis server.
                    $userslug = $this->getUserSlug($user_entity->first_name, $user_entity->last_name, $id);
                    $this->Users->updateAll(
                            ['slug' => $userslug], // fields
                            ['id' => $id]);

                    //new code
                    $username = $user_entity->username;
                    $em = $this->Common->encode_data($username);
                    $passcode = $this->Common->encode_data(time());
                    $url = Router::url(['controller' => 'Users', 'action' => 'resetPassword', urlencode($em), urlencode($passcode)], true);
                    //ends here

                    $emailtemplate = $this->Common->getEmailTemplate(1);

                    $subject = $emailtemplate->subject;
                    $body = $emailtemplate->content;
                    $message = str_replace("{username}", $user_entity->username, $body);
                    $message = str_replace("{password}", $passwordrandom, $message);

                    //new code
                    $urlhtml = '<a href="' . $url . '">' . $url . '</a>';
                    $message = str_replace("{url}", $urlhtml, $message);
                    //ends here

                    $user_id = $this->request->session()->read('Auth.User.id');
                    $email_args = ['to' => [$user_entity->username], 'subject' => $subject, 'message' => $message];
                    $email_flag = $this->Email->sendMail($email_args);
                    $emailstatusarg = ["Controller" => "users", "Action" => "add", "created_by" => $user_id, "send_to" => $user_entity["username"], "message" => $message, "template_id" => 1];
                    if ($email_flag === true) {
                        $emailstatusarg["status"] = "Sent";
                        $this->Flash->success(__('Record has been saved successfully.'));
                    } else {
                        $emailstatusarg["status"] = "Fail";
                    }

                    $this->Email->savemailstatus($emailstatusarg);
                    if ($this->can_edit_user) {
                        return $this->redirect(['action' => 'edit', $this->PseudoCrypt->encrypt($user_entity->id)]);
                    } else {
                        return $this->redirect(['action' => 'directory']);
                    }
                } else {
                    $errors = $user_entity->errors();
                    $errorhtml = '<div><strong>Please fill all the below required fields.</strong></div>' . $this->Common->getErrorHtml($errors);
                    $this->Flash->error(__($errorhtml));
                }
            }
            $category_options = $this->Common->getChannelWiseCategoryDropDown($channels, $categories);
            $location_options = $this->Common->getLocationDropdown($locations);

            if($user_id == 1) { //Skip for super admin
                $channel_options = $this->Common->getChannelDropdown($channels, 0, "channels", true, "channels[]", "ddl-channel-multiple");
                $default_channel_options = $this->Common->getChannelDropdown([$this->request->data['default_channel']], 0, '', false, 'default_channel', "ddl-channel-default");
            } else {
                $channel_options = $this->Common->getChannelDropdown($channels, 0, "channels", true, "channels[]", "ddl-channel-multiple", $my_channel_ids);
                $default_channel_options = $this->Common->getChannelDropdown([$this->request->data['default_channel']], 0, '', false, 'default_channel', "ddl-channel-default", $my_channel_ids);
            }
            $default_location = $this->Common->getLocationDropdownSingleSelect($this->request->data['default_location']);
            $submission_categories = $this->Common->getMultiSelectCategoryDropDown("submission_categories[]", isset($this->request->data['submission_categories']) ? $this->request->data['submission_categories'] : 0);
            $moderation_categories = $this->Common->getMultiSelectCategoryDropDown("moderation_categories[]", isset($this->request->data['moderation_categories']) ? $this->request->data['moderation_categories'] : 0);
        } else {
            $location_options = $this->Common->getLocationDropdown();
            $default_location = $this->Common->getLocationDropdownSingleSelect();
            
            if($user_id == 1) { //Skip for super admin
                $channel_options = $this->Common->getChannelDropdown([], 0, "channels", true, "channels[]", "ddl-channel-multiple");
                $default_channel_options = $this->Common->getChannelDropdown([], 0, '', false, 'default_channel', "ddl-channel-default");
            } else {
                $channel_options = $this->Common->getChannelDropdown([], 0, "channels", true, "channels[]", "ddl-channel-multiple", $my_channel_ids);
                $default_channel_options = $this->Common->getChannelDropdown([], 0, '', false, 'default_channel', "ddl-channel-default", $my_channel_ids);
            }
            $category_options = $this->Common->getChannelWiseCategoryDropDown();
            $submission_categories = $this->Common->getMultiSelectCategoryDropDown("submission_categories[]");
            $moderation_categories = $this->Common->getMultiSelectCategoryDropDown("moderation_categories[]");
        }

        $userlist = $this->Common->getUserNames();

        $this->set('location_options', $location_options);
        $this->set('default_location', $default_location);
        $this->set('channel_options', $channel_options);
        $this->set('default_channel_options', $default_channel_options);
        $this->set('category_options', $category_options);

        $this->set('user', $user);
        $this->set('userlist', $userlist);

        $role_options = $this->Roles->find('all')->where(['status !=' => 'Trash', 'id !=' => 1])->order(['name' => 'ASC']);

        $all_roles = [];
        if ($role_options) {
            foreach ($role_options as $role_option) {
                $all_roles[$role_option->id] = $role_option->name;
            }
        }
        $this->set("all_roles", $all_roles);

        $language_options = $this->Languages->find('all')->where(['status !=' => 'Trash']);
        $all_languages = [];
        if ($language_options) {
            foreach ($language_options as $language_option) {
                $all_languages[$language_option->id] = $language_option->name;
            }
        }
        $this->set("all_languages", $all_languages);
        $siteurl = Router::url("/", true);
        $this->set('siteurl', $siteurl);

        //Locations
        $hyperlocals = $this->Location->getAreaList(null, 'list');
        $this->set("hyperlocals", $hyperlocals);

        //Zones
        $zonelist = $this->Location->getZoneList(null, 'list');
        $this->set('zonelist', $zonelist);

        //Editions
        $editions = $this->Location->getEditionList(null, 'list');
        $this->set("editions", $editions);

        //District Headquarters
        $district_headquarters = $this->Location->getDistrictHeadquarterList(null, 'list');
        $this->set("district_headquarters", $district_headquarters);

        //User Types
        $this->loadModel("UserTypes");
        $user_types = $this->UserTypes->find("list")->where(['status' => 'Active']);
        $this->set("user_types", $user_types);
        
        $this->set(compact("submission_categories", "moderation_categories"));
    }

    /**
     * This function is used to edit an user.
     * @param integer $user_id
     */
    public function edit($user_id = null) {
        $this->loadModel("Roles");
        $this->loadModel("Languages");
        $user_id = $this->PseudoCrypt->decrypt($user_id);
        $userChannels = TableRegistry::get('UserChannels');

        $my_channels = $this->User->getMyChannels();
        $my_channel_ids = array_keys($my_channels);
        //pr($my_channel_ids); exit;
        $userNew = $user = $this->Users->findById($user_id)->contain(['UserRoles', 'UserCategories', 'UserZones', 'UserLocations', 'UserEditions', 
            'UserDistrictHeadquarters', 'UserPublishingLocations', 'UserSocialMediaPages', 'UserPrioritySections',
                    'UserChannels' => function ($q) {
                        return $q->where(['UserChannels.status' => "Active"]);
                    }, 'UserLanguages'])->first();
                    
        if (empty($user)) {
            $this->Flash->error(__('User not found'));
            $this->redirect(["action" => "directory"]);
        }
        if ($this->request->is(['post', 'put'])) {
            //pr($this->request->data); exit;
            $photoErrorMsg = '';
            $photoError = false;
            $uemail = $user->username;
            $this->request->data['username'] = $uemail;
            // For Upload User Profile picture
            
            if (isset($this->request->data['photo']['tmp_name']) && $this->request->data['photo']['tmp_name'] != "") {
                $fileName = $this->request->data['photo']['name'];
                $resizeConfig = array('width' => 279, 'height' => 279);
                $uploadPath = 'upload/profile/';

                $currentYearFolder = date("Y");
                if (!file_exists(WWW_ROOT . "upload/profile/" . $currentYearFolder)) {
                    mkdir(WWW_ROOT . "upload/profile/" . $currentYearFolder);
                    chmod(WWW_ROOT . "upload/profile/" . $currentYearFolder, 0777);
                }
                $profilePath = $uploadPath . $currentYearFolder . "/";

                $file_ext = pathinfo($fileName, PATHINFO_EXTENSION);
                $arr_ext = array('jpg', 'jpeg', 'gif', 'png', 'PNG', 'JPG', 'JPEG', 'GIF');

                $uploadFileNEW = basename($fileName, $file_ext);
                $uploadFileNEW = preg_replace('/[^A-Za-z0-9\-]/', '', $uploadFileNEW);
                $imageName = $uploadFileNEW . "_" . time() . '.' . $file_ext;
                $uploadFile = $profilePath . $uploadFileNEW . "_" . time() . '.' . $file_ext;
                if (in_array($file_ext, $arr_ext)) {
                    if (move_uploaded_file($this->request->data['photo']['tmp_name'], $uploadFile)) {
                        $this->request->data['photo'] = "/profile/" . $currentYearFolder . "/" . $imageName;

                        copy($uploadFile, $profilePath . $imageName);
                        //Added By Babulal Prasad to save to S3Bucket 
                        //Added for image upload func.
                        foreach ($this->request->data['default_channel'] as $channel_id) {
                            if ($this->Aws->setS3Bucket($channel_id, $this->Config->getVal('aws-bucket', $channel_id))) {
                            $resultAWS = $this->Aws->uploadToBucket("upload/profile/" . $currentYearFolder . "/" . $imageName, WWW_ROOT . "upload/profile/" . $currentYearFolder . "/" . $imageName);
                            }    
                        }
                        //ends here
                        
                        $this->Image->resize($profilePath . $imageName, 280, 280, false);

                        if (file_exists($uploadFile)) {
                            @unlink(WWW_ROOT . $profilePath . $user->photo);
                        }
                    } else {
                        $this->Flash->error(__('Unable to upload file, please try again.'));
                    }
                } else {
                    unset($this->request->data['photo']);
                    $photoError = true;
                    $photoErrorMsg = 'Invalid image. Please try again.';
                }
            } else {
                //unset($this->request->data['photo']);
                $this->request->data['photo'] = $this->request->data['photo_path'];
            }

            $existingUserRoles = $this->getUserRoles($user);
            $existingUserChannels = $this->getUserOtherPublishingChannels($user);
            $existingUserLocations = $this->getUserLocations($user);
            $existingUserLanguages = $this->getUserLanguages($user);
            $existingUserDistrictHeadquarters = $this->getUserDistrictHeadquarters($user);
            $existingUserEditions = $this->getUserEditions($user);
            $existingUserZones = $this->getUserZones($user);
            $existingUserCategories = $this->getUserCategories($user);
            $existingUserSubmissionCategories = $this->getUserSubmissionCategories($user);
            $existingUserModerationCategories = $this->getUserModerationCategories($user);

            $this->request->data['id'] = $user_id;
            /*$this->request->data['employee_id'] = trim($this->request->data['employee_id']);
            $this->request->data['mobile_number'] = trim($this->request->data['mobile_number']);
            $this->request->data['twitter'] = trim($this->request->data['twitter']);
            $this->request->data['facebook'] = trim($this->request->data['facebook']);
            $this->request->data['googleplus'] = trim($this->request->data['googleplus']);
            $this->request->data['linkedin'] = trim($this->request->data['linkedin']);
            $this->request->data['address'] = trim($this->request->data['address']);
            $this->request->data['biography'] = trim($this->request->data['biography']);
            $this->request->data['first_name'] = trim($this->request->data['first_name']);
            $this->request->data['last_name'] = trim($this->request->data['last_name']);
            $this->request->data['first_name_lng'] = trim($this->request->data['first_name_lng']);
            $this->request->data['last_name_lng'] = trim($this->request->data['last_name_lng']);*/
            //Apply trim on all the requested data.
            $this->request->data = array_map(function ($post_data) {return is_string($post_data) ? trim($post_data) : $post_data;}, $this->request->data);
            $this->request->data['modified_by'] = $this->request->session()->read('Auth.User.id');

            //User can login - Start
            $this->request->data['can_login'] = isset($this->request->data['can_login']) && $this->request->data['can_login'] ? $this->request->data['can_login'] : "No";
            //User can login - End
            //User is author - Start
            $this->request->data['is_author'] = isset($this->request->data['is_author']) && $this->request->data['is_author'] ? $this->request->data['is_author'] : "No";
            //User is author - End
            //User is senior management personnel - Start
            $this->request->data['is_senior_management_personnel'] = isset($this->request->data['is_senior_management_personnel']) && $this->request->data['is_senior_management_personnel'] ? $this->request->data['is_senior_management_personnel'] : "No";
            //User is senior management personnel - Start
            //User is submitter - Start
            $this->request->data['is_submitter'] = isset($this->request->data['is_submitter']) && $this->request->data['is_submitter'] ? $this->request->data['is_submitter'] : "No";
            //User is submitter- Start
            //User is moderator - Start
            $this->request->data['is_moderator'] = isset($this->request->data['is_moderator']) && $this->request->data['is_moderator'] ? $this->request->data['is_moderator'] : "No";
            //User is moderator - Start
            //User is publisher - Start
            $this->request->data['is_publisher'] = isset($this->request->data['is_publisher']) && $this->request->data['is_publisher'] ? $this->request->data['is_publisher'] : "No";
            //User is publisher - Start
            //User role setup - Start
            $roles = isset($this->request->data['roles']) && $this->request->data['roles'] ? $this->request->data['roles'] : [];
            $role_array = [];
            $revision_roles = [];
            if ($roles) {
                foreach ($roles as $role) {
                    $existing_role_id = array_search($role, $existingUserRoles);
                    if ($existing_role_id !== false) {
                        unset($existingUserRoles[$existing_role_id]);
                    } else {
                        array_push($role_array, ["user_id" => $user_id, "role_id" => $role]);
                    }
                }
                array_push($revision_roles, ["user_id" => $user_id, "role_id" => $role]);
            }
            $this->request->data['user_roles'] = $role_array;
            //User role setup - End
            
            //User category setup - Start
            //Publishing category
            $categories = isset($this->request->data['category']) && $this->request->data['category'] ? $this->request->data['category'] : [];
            $revision_categories = [];
            $category_array = [];
            if ($categories) {
                foreach ($categories as $category) {
                    $existing_category_id = array_search($category, $existingUserCategories);
                    if ($existing_category_id !== false) {
                        unset($existingUserCategories[$existing_category_id]);
                    } else {
                        array_push($category_array, ["user_id" => $user_id, "category_id" => $category, "category_type"=>"Publishing"]);
                    }
                    array_push($revision_categories, ["user_id" => $user_id, "category_id" => $category, "category_type"=>"Publishing"]);
                }
            }
            
            //Submission category
            $submission_categories = isset($this->request->data['submission_categories']) && $this->request->data['submission_categories'] ? $this->request->data['submission_categories'] : [];
            if ($submission_categories) {
                foreach ($submission_categories as $category) {
                    $existing_category_id = array_search($category, $existingUserSubmissionCategories);
                    if ($existing_category_id !== false) {
                        unset($existingUserSubmissionCategories[$existing_category_id]);
                    } else {
                        array_push($category_array, ["user_id" => $user_id, "category_id" => $category, "category_type"=>"Submission"]);
                    }
                    array_push($revision_categories, ["user_id" => $user_id, "category_id" => $category, "category_type"=>"Submission"]);
                }
            }
            
            //Moderation category
            $moderation_categories = isset($this->request->data['moderation_categories']) && $this->request->data['moderation_categories'] ? $this->request->data['moderation_categories'] : [];
            if ($moderation_categories) {
                foreach ($moderation_categories as $category) {
                    $existing_category_id = array_search($category, $existingUserModerationCategories);
                    if ($existing_category_id !== false) {
                        unset($existingUserModerationCategories[$existing_category_id]);
                    } else {
                        array_push($category_array, ["user_id" => $user_id, "category_id" => $category, "category_type"=>"Moderation"]);
                    }
                    array_push($revision_categories, ["user_id" => $user_id, "category_id" => $category, "category_type"=>"Moderation"]);
                }
            }            
            $this->request->data['user_categories'] = $category_array;
            //User category setup - End

            //User Location setup starts here
            $locations = isset($this->request->data['other_locations']) && $this->request->data['other_locations'] ? $this->request->data['other_locations'] : [];
            if (isset($this->request->data['default_location']) && $this->request->data['default_location']) {
                $locations[] = $this->request->data['default_location'];
            }
            $locations = array_unique($locations);

            $location_array = [];
            $revision_locations = [];
            if ($locations) {
                foreach ($locations as $location) {
                    $existing_location_id = array_search($location, $existingUserLocations);
                    if ($existing_location_id !== false) {
                        unset($existingUserLocations[$existing_location_id]);
                    } else {
                        if ($location == $this->request->data['default_location']) {
                            array_push($location_array, ["user_id" => $user_id, "location_id" => $location, "is_default" => "Yes"]);
                        } else {
                            array_push($location_array, ["user_id" => $user_id, "location_id" => $location, "is_default" => "No"]);
                        }
                    }

                    if ($location == $this->request->data['default_location']) {
                        array_push($revision_locations, ["user_id" => $user_id, "location_id" => $location, "is_default" => "Yes"]);
                    } else {
                        array_push($revision_locations, ["user_id" => $user_id, "location_id" => $location, "is_default" => "No"]);
                    }
                }
            }
            $this->request->data['user_locations'] = $location_array;
            //User Location setup ends here

            $default_channel = [];
            $channels = [];
            $channel_array = [];

            $other_channels = $channels = isset($this->request->data['channels']) && $this->request->data['channels'] ? $this->request->data['channels'] : [];

            if (isset($this->request->data['default_channel']) && $this->request->data['default_channel']) {
                $channels[] = $this->request->data['default_channel'];
            }
            $channels = array_unique($channels);

            $revision_channels = [];
            if ($channels) {
                foreach ($channels as $channel) {
                    $existing_channel_id = array_search($channel, $existingUserChannels);
                    if ($existing_channel_id !== false) {
                        unset($existingUserChannels[$existing_channel_id]);
                    } else {
                        if ($channel == $this->request->data['default_channel']) {
                            array_push($channel_array, ["user_id" => $user_id, "channel_id" => $channel, "is_default" => "Yes"]);
                        } else {
                            array_push($channel_array, ["user_id" => $user_id, "channel_id" => $channel, "is_default" => "No"]);
                        }
                    }

                    if ($channel == $this->request->data['default_channel']) {
                        array_push($revision_channels, ["user_id" => $user_id, "channel_id" => $channel, "is_default" => "Yes"]);
                    } else {
                        array_push($revision_channels, ["user_id" => $user_id, "channel_id" => $channel, "is_default" => "No"]);
                    }
                }
            }
            $this->request->data['user_channels'] = $channel_array;

            $languages = isset($this->request->data['languages']) && $this->request->data['languages'] ? $this->request->data['languages'] : [];
            $language_array = [];
            $revision_languages = [];
            if ($languages) {
                foreach ($languages as $language) {
                    $existing_language_id = array_search($language, $existingUserLanguages);
                    if ($existing_language_id !== false) {
                        unset($existingUserLanguages[$existing_language_id]);
                    } else {
                        array_push($language_array, ["user_id" => $user_id, "language_id" => $language]);
                    }
                    array_push($revision_languages, ["user_id" => $user_id, "language_id" => $language]);
                }
            }
            $this->request->data['user_languages'] = $language_array;

            //District Headquarter setup - Start
            $district_headquarters = isset($this->request->data['district_headquarters']) && $this->request->data['district_headquarters'] ? $this->request->data['district_headquarters'] : [];
            $district_headquarters_array = [];
            $revision_district_headquarters = [];
            if ($district_headquarters) {
                foreach ($district_headquarters as $district_headquarter) {
                    $existing_district_headquarter_id = array_search($district_headquarter, $existingUserDistrictHeadquarters);
                    if ($existing_district_headquarter_id !== false) {
                        unset($existingUserDistrictHeadquarters[$existing_district_headquarter_id]);
                    } else {
                        array_push($district_headquarters_array, ["user_id" => $user_id, "district_headquarter_id" => $district_headquarter]);
                    }
                    array_push($revision_district_headquarters, ["user_id" => $user_id, "district_headquarter_id" => $district_headquarter]);
                }
            }
            $this->request->data['user_district_headquarters'] = $district_headquarters_array;
            //District Headquarter setup - End
            //Editions setup - Start
            $editions = isset($this->request->data['editions']) && $this->request->data['editions'] ? $this->request->data['editions'] : [];
            $editions_array = [];
            $revision_editions = [];
            if ($editions) {
                foreach ($editions as $edition) {
                    $existing_edition_id = array_search($edition, $existingUserEditions);
                    if ($existing_edition_id !== false) {
                        unset($existingUserEditions[$existing_edition_id]);
                    } else {
                        array_push($editions_array, ["user_id" => $user_id, "edition_id" => $edition]);
                    }
                    array_push($revision_editions, ["user_id" => $user_id, "edition_id" => $edition]);
                }
            }
            $this->request->data['user_editions'] = $editions_array;
            //Editions setup - End
            //User zone setup - Start
            $zones = isset($this->request->data['zones']) && $this->request->data['zones'] ? $this->request->data['zones'] : [];
            $zone_array = [];
            $revision_zones = [];
            if ($zones) {
                foreach ($zones as $zone) {
                    $existing_zone_id = array_search($zone, $existingUserZones);
                    if ($existing_zone_id !== false) {
                        unset($existingUserZones[$existing_zone_id]);
                    } else {
                        array_push($zone_array, ["user_id" => $user_id, "zone_id" => $zone]);
                    }
                    array_push($revision_zones, ["user_id" => $user_id, "zone_id" => $zone]);
                }
            }
            $this->request->data['user_zones'] = $zone_array;
            //User zone setup - End

            $user = $this->Users->newEntity();
            $requestData = $this->request->data;
            unset($requestData["user_channels"]);

            $user_entity = $this->Users->patchEntity($user, $requestData, [
                'associated' => ['UserRoles', 'UserCategories', 'UserLocations', 'UserChannels', 'UserLanguages', 'UserZones', 
                    'UserDistrictHeadquarters', 'UserEditions']
            ]);

            if ($photoError) {
                $user_entity->errors(['photo' => ['_empty' => $photoErrorMsg]]);
            }
            
            if(isset($this->request->data['is_submitter']) && $this->request->data['is_submitter'] == "Yes") {
                if(!(isset($this->request->data['submission_categories']) && $this->request->data['submission_categories'])) {
                    $user_entity->errors(['user_submission_categories' => ['_empty' => "Submission category is required."]]);
                }
            }
            
            if(isset($this->request->data['is_moderator']) && $this->request->data['is_moderator'] == "Yes") {
                if(!(isset($this->request->data['moderation_categories']) && $this->request->data['moderation_categories'])) {
                    $user_entity->errors(['user_moderation_categories' => ['_empty' => "Moderation category is required."]]);
                }
            }
            
            if(isset($this->request->data['is_publisher']) && $this->request->data['is_publisher'] == "Yes") {
                if(!(isset($this->request->data['category']) && $this->request->data['category'])) {
                    $user_entity->errors(['user_categories' => ['_empty' => "Publishing category is required."]]);
                }
            }
            
            //start
            if (!isset($this->request->data['photo'])) {
                if (isset($this->request->data['photo_check']) && $this->request->data['photo_check'] != 'yes') {
                    @unlink(WWW_ROOT . $profilePath . $user->photo);
                    $user_entity['photo'] = "";
                }
            }
            //end
            
            if ($this->Users->save($user_entity)) {
                $this->addModifiedUserFlag($user_id);
                //For revision purpose only - Start
                $user_data = $this->request->data;
                $user_data['user_categories'] = $revision_categories;
                $user_data['user_channels'] = $revision_channels;
                $user_data['user_district_headquarters'] = $revision_district_headquarters;
                $user_data['user_editions'] = $revision_editions;
                $user_data['user_languages'] = $revision_languages;
                $user_data['user_locations'] = $revision_locations;
                $user_data['user_zones'] = $revision_zones;
                $user_data['user_roles'] = $revision_roles;

                $this->Revision->saveUserRevision($user_id, $user_data, $uemail);
                //For revision purpose only - End
                //Update default channel
                if (!$channel_array) {
                    $this->loadModel("UserChannels");
                    $query = $this->UserChannels->query();
                    $query->update()
                            ->set(['is_default' => "No"])
                            ->where(['user_id' => $user_id])
                            ->execute();
                    $query->update()
                            ->set(['is_default' => "Yes"])
                            ->where(['user_id' => $user_id, "channel_id" => $this->request->data['default_channel']])
                            ->execute();
                }

                //Update default location
                if (!$location_array) {
                    $this->loadModel("UserLocations");
                    $query = $this->UserLocations->query();
                    $query->update()
                            ->set(['is_default' => "No"])
                            ->where(['user_id' => $user_id])
                            ->execute();
                    $query->update()
                            ->set(['is_default' => "Yes"])
                            ->where(['user_id' => $user_id, "location_id" => $this->request->data['default_location']])
                            ->execute();
                }

                if ($existingUserRoles) {
                    $this->loadModel("UserRoles");
                    $this->UserRoles->deleteAll([
                        'user_id' => $user_id,
                        'role_id IN' => $existingUserRoles
                    ]);
                }

                if ($existingUserCategories) {
                    $this->loadModel("UserCategories");
                    $this->UserCategories->deleteAll([
                        'user_id' => $user_id,
                        'category_id IN' => $existingUserCategories,
                        'category_type'=>"Publishing"
                    ]);
                }
                
                if ($existingUserSubmissionCategories) {
                    $this->loadModel("UserCategories");
                    $this->UserCategories->deleteAll([
                        'user_id' => $user_id,
                        'category_id IN' => $existingUserSubmissionCategories,
                        'category_type'=>"Submission"
                    ]);
                }
                
                if ($existingUserModerationCategories) {
                    $this->loadModel("UserCategories");
                    $this->UserCategories->deleteAll([
                        'user_id' => $user_id,
                        'category_id IN' => $existingUserModerationCategories,
                        'category_type'=>"Moderation"
                    ]);
                }

                if ($existingUserLocations) {
                    $this->loadModel("UserLocations");
                    $this->UserLocations->deleteAll([
                        'user_id' => $user_id,
                        'location_id IN' => $existingUserLocations
                    ]);
                }

                if ($existingUserChannels) {
                    $this->loadModel("UserChannels");
                    foreach ($existingUserChannels as $key => $ch_id) {
                        $sql = "SELECT count(distinct(story_authors.story_id)) FROM story_authors "
                                . "JOIN story_channels ON story_authors.story_id = story_channels.story_id "
                                . "WHERE story_authors.author_id = " . $user_id . " AND story_channels.channel_id = " . $ch_id;
                        $sql_result = $this->Location->db_conn->execute($sql);
                        $sql_result = $sql_result->fetchAll('assoc');
                        if ($sql_result) {
                            $this->Location->db_conn->execute("UPDATE user_channels SET status = 'Inactive', is_default = 'No' WHERE user_id = " . $user_id . " AND channel_id=" . $ch_id);
                            unset($existingUserChannels[$key]);
                        }
                    }

                    if ($existingUserChannels) {
                        $this->UserChannels->deleteAll([
                            'user_id' => $user_id,
                            'channel_id IN' => $existingUserChannels
                        ]);
                    }
                }

                if ($existingUserLanguages) {
                    $this->loadModel("UserLanguages");
                    $this->UserLanguages->deleteAll([
                        'user_id' => $user_id,
                        'language_id IN' => $existingUserLanguages
                    ]);
                }

                if ($existingUserDistrictHeadquarters) {
                    $this->loadModel("UserDistrictHeadquarters");
                    $this->UserDistrictHeadquarters->deleteAll([
                        'user_id' => $user_id,
                        'district_headquarter_id IN' => $existingUserDistrictHeadquarters
                    ]);
                }

                if ($existingUserEditions) {
                    $this->loadModel("UserEditions");
                    $this->UserEditions->deleteAll([
                        'user_id' => $user_id,
                        'edition_id IN' => $existingUserEditions
                    ]);
                }

                if ($existingUserZones) {
                    $this->loadModel("UserZones");
                    $this->UserZones->deleteAll([
                        'user_id' => $user_id,
                        'zone_id IN' => $existingUserZones
                    ]);
                }

                if ($channels) {
                    $this->setUserChannels($user_id, $channels, "Active");
                }
                $this->Redis->saveAuthorData($user_id);

                //Newly added for image
                $user = $this->Users->findById($user_id)->contain(['UserRoles', 'UserCategories', 'UserLocations', 'UserChannels', 'UserLanguages'])->first();
                //ends here
                // user modified mail
                $adminuser = $this->Common->getUserByRole(1);

                // send mail for registration
                $emailtemplate = $this->Common->getEmailTemplate(8);
                $uname = $this->request->session()->read('Auth.User.username');
                $subject = $emailtemplate->subject;
                $body = $emailtemplate->content;
                $message = str_replace("{username}", trim($user_entity->first_name . " " . $user_entity->last_name) . "(" . $uemail . ")", $body);
                $message = str_replace("{useradmin}", $this->request->session()->read('Auth.User.username'), $message);

                $user_id = $this->request->session()->read('Auth.User.id');
                $email_args = ['to' => $adminuser, 'subject' => $subject, 'message' => $message];
                $email_flag = $this->Email->sendMail($email_args);
                $emailstatusarg = ["Controller" => "role", "Action" => "add", "created_by" => $user_id, "send_to" => json_encode($adminuser), "message" => $message, "template_id" => 6];
                if ($email_flag === true) {
                    $emailstatusarg["status"] = "Sent";
                } else {
                    $emailstatusarg["status"] = "Fail";
                }

                $this->Email->savemailstatus($emailstatusarg);
                $this->Flash->success(__('Record has been saved successfully.'));
            } else {
                $errors = $user_entity->errors();
                $errorhtml = '<div>Record can not be saved. Please try again.</div>' . $this->Common->getErrorHtml($errors);
                $this->Flash->error(__($errorhtml));
            }

            $user_roles = $roles;
            $user_languages = $languages;
            $category_options = $this->Common->getChannelWiseCategoryDropDown($channels, $categories, $user_id);

            //newly added
            if($user_id == 1) { //Skip for super admin
                $channel_options = $this->Common->getChannelDropdown($other_channels, $user_id, "channels", true, "channels[]", "ddl-channel-multiple");
                $default_channel_options = $this->Common->getChannelDropdown([$this->request->data['default_channel']], 0, '', false, 'default_channel', "ddl-channel-default");
            } else {
                $channel_options = $this->Common->getChannelDropdown($other_channels, $user_id, "channels", true, "channels[]", "ddl-channel-multiple", $my_channel_ids);
                $default_channel_options = $this->Common->getChannelDropdown([$this->request->data['default_channel']], 0, '', false, 'default_channel', "ddl-channel-default", $my_channel_ids);
            }
            
            //ends here
            $user_zones = $zones;
            
            $submission_categories = $this->Common->getMultiSelectCategoryDropDown("submission_categories[]", isset($this->request->data['submission_categories']) ? $this->request->data['submission_categories'] : "");
            $moderation_categories = $this->Common->getMultiSelectCategoryDropDown("moderation_categories[]", isset($this->request->data['moderation_categories']) ? $this->request->data['moderation_categories'] : "");
        } else {
            $user_roles = $this->getUserRoles($user);

            $user_categories = $this->getUserCategories($user);
            $user_submission_categories = $this->getUserSubmissionCategories($user);
            $user_moderation_categories = $this->getUserModerationCategories($user);

            $user_locations = $this->getUserLocations($user);

            $user_zones = $this->getUserZones($user);

            $user_editions = $this->getUserEditions($user);

            $user_district_headquarters = $this->getUserDistrictHeadquarters($user);

            $user_default_channel = $this->getUserDefaultPublishingChannel($user);

            $user_other_channels = $this->getUserOtherPublishingChannels($user);

            $user_languages = $this->getUserLanguages($user);

            $array_channels = array_merge($user_default_channel, $user_other_channels);

            $category_options = $this->Common->getChannelWiseCategoryDropDown($array_channels, $user_categories, $user_id);

            //newly added
            if($user_id == 1) { //Skip for super admin
                $channel_options = $this->Common->getChannelDropdown($user_other_channels, $user_id, "channels", true, "channels[]", "ddl-channel-multiple");
                $default_channel_options = $this->Common->getChannelDropdown([$user->default_channel], 0, '', false, 'default_channel', "ddl-channel-default");
            } else {
                $channel_options = $this->Common->getChannelDropdown($user_other_channels, $user_id, "channels", true, "channels[]", "ddl-channel-multiple", $my_channel_ids);
                $default_channel_options = $this->Common->getChannelDropdown([$user->default_channel], 0, '', false, 'default_channel', "ddl-channel-default", $my_channel_ids);
            }
            //ends here
            
            $user->roles = $user_roles;
            $user->other_locations = $user_locations;
            $user->district_headquarters = $user_district_headquarters;
            $user->editions = $user_editions;
            $user->zones = $user_zones;
            
            $submission_categories = $this->Common->getMultiSelectCategoryDropDown("submission_categories[]", $user_submission_categories);
            $moderation_categories = $this->Common->getMultiSelectCategoryDropDown("moderation_categories[]", $user_moderation_categories);
        }

        $role_options = $this->Roles->find('all')->where(['status !=' => 'Trash'])->order(['name' => 'ASC']);
        $all_roles = [];
        if ($role_options) {
            foreach ($role_options as $role_option) {
                $all_roles[$role_option->id] = $role_option->name;
            }
        }

        $langauges_options = $this->Languages->find('all')->where(['status !=' => 'Trash']);
        $all_languages = [];
        if ($langauges_options) {
            foreach ($langauges_options as $langauge_options) {
                $all_languages[$langauge_options->id] = $langauge_options->name;
            }
        }
        $userlist = $this->Common->getUserNames();
        
        $siteurl = Router::url("/", true);
        $this->set("all_roles", $all_roles);
        $this->set("all_languages", $all_languages);
        $this->set('user', $user);
        $this->set('userNew', $userNew);
        $this->set('category_options', $category_options);
        $this->set('channel_options', $channel_options);
        $this->set("user_languages", $user_languages);
        $this->set("siteurl", $siteurl);
        $this->set("userlist", $userlist);
        $this->set('default_channel_options', $default_channel_options);

        //Locations
        $hyperlocals = $this->Location->getAreaList(null, 'list');
        $this->set("hyperlocals", $hyperlocals);

        //Zones
        $zonelist = $this->Location->getZoneList(null, 'list');
        $this->set('zonelist', $zonelist);

        //Editions
        $editions = $this->Location->getEditionList(null, 'list');
        $this->set("editions", $editions);

        //District Headquarters
        $district_headquarters = $this->Location->getDistrictHeadquarterList(null, 'list');
        $this->set("district_headquarters", $district_headquarters);

        //User Types
        $this->loadModel("UserTypes");
        $user_types = $this->UserTypes->find("list")->where(['status' => 'Active']);
        $this->set("user_types", $user_types);

        /*
          //Author Types
          $this->loadModel("AuthorTypes");
          $author_types = $this->AuthorTypes->find("list")->where(['status' => 'Active']);
          $this->set("author_types", $author_types);

          //Contributor Types
          $this->loadModel("ContributorTypes");
          $contributor_types = $this->ContributorTypes->find("list")->where(['status' => 'Active']);
          $this->set("contributor_types", $contributor_types);
         */

        $this->set(compact("submission_categories", "moderation_categories"));
    }

    /**
     * This function is used to delete an user.
     * @param type $user_id
     */
    public function delete($user_id = null) {
        $user_id = $this->PseudoCrypt->decrypt($user_id);
        $user = $this->Users->get($user_id);
        if ($this->request->is(['post', 'put'])) {
            $this->request->data["status"] = "Trash";
            $this->Users->patchEntity($user, $this->request->data);
            if ($this->Users->save($user)) {
                $this->Redis->removeAuthorData($user_id);
                $this->Flash->success(__('Record has been deleted successfully.'));
                return $this->redirect(['action' => 'directory']);
            }
            $this->Flash->error(__('Record can not be deleted. Please try again.'));
        }
        $this->set('user', $user);
    }

    /**
     * This function is used to get the list of roles.
     * @param type $selectid
     * @param type $editid
     */
    public function getRoleDropdown($selectid = array(), $editid = 0) {
        $rolesArr = array();
        $options = array();
        $this->loadModel('Roles');
        $options = $this->Roles->find('all')->where(['status !=' => 'Trash']);
        foreach ($options as $opt) {
            $rolesArr[$opt->id] = array('id' => $opt->id, 'name' => $opt->name, 'parent_id' => $opt->parent);
        }

        $drophtml = "<select name='roles[]' class='multirole' multiple='multiple'>" . $this->Common->getDropdwonWithCheckbox($rolesArr, 0, 0, -1, $selectid, $editid) . "</select>";
        return $drophtml;
    }

    /**
     * This function is used for forgot password. An email will be send for reset password.
     */
    function forgotPassword() {
        $user = $this->Users->newEntity();
        if ($this->request->is(['post', 'put'])) {
            $username = $this->request->data['username'];
            $user = $this->Users->findByUsername($username)->first();

            if (empty($user)) {
                $this->Flash->error('User not registered.');
            } else {
                if ($user->status == "Active") {
                    $em = $this->Common->encode_data($username);
                    $passcode = $this->Common->encode_data(time());
                    $this->loadModel("UserForgotPassword");

                    //If any other link is found active, then deactivate those links.
                    $existing_forgot_password_data = $this->UserForgotPassword->find()->where(['status' => 'Active'])->first();
                    if ($existing_forgot_password_data) {
                        $existing_forgot_password_data_entity = $this->UserForgotPassword->newEntity();
                        $existing_forgot_password_data_entity->id = $existing_forgot_password_data->id;
                        $existing_forgot_password_data_entity->status = "Inactive";
                        $this->UserForgotPassword->save($existing_forgot_password_data_entity);
                    }

                    $forgot_password = $this->UserForgotPassword->newEntity();
                    $forgot_password->username = $username;
                    $forgot_password->passcode = $passcode;
                    $forgot_password->status = "Active";
                    //$forgot_password->created_date = strtotime("now");
                    //$forgot_password->expiry_date = strtotime("+30 minutes");
                    //$forgot_password->modified_date = strtotime("now");

                    if ($this->UserForgotPassword->save($forgot_password)) {
                        $id = $forgot_password->id;
                        $url = Router::url(['controller' => 'Users', 'action' => 'resetPassword', urlencode($em), urlencode($passcode)], true);
                        // echo $url;
                        $emailtemplate = $this->Common->getEmailTemplate(2);

                        $subject = $emailtemplate->subject;
                        $body = $emailtemplate->content;
                        $urlhtml = '<a href="' . $url . '">' . $url . '</a>';
                        $message = str_replace("{url}", $urlhtml, $body);

                        //echo $message;exit;
                        // $user_entity->username ="msharma@arcgate.com";

                        $email_args = ['to' => [$username], 'subject' => $subject, 'message' => $message];
                        // $email_args = [ 'to'=>[ 'msharma@arcgate.com'], 'cc'=>['msharma@arcgate.com'], 'bcc'=>['sshukla.arcgate@gmail.com'], 'subject'=>'Subject of the Mail', 'message'=>'Message of the Mail'];
                        $email_flag = $this->Email->sendMail($email_args);
                        $emailstatusarg = ["Controller" => "users", "Action" => "Forgot Password", "send_to" => $username, "message" => $message, "template_id" => 2];
                        if ($email_flag === true) {
                            $emailstatusarg["status"] = "Sent";
                        } else {
                            $emailstatusarg["status"] = "Fail";
                        }

                        $this->Email->savemailstatus($emailstatusarg);

                        $this->Flash->default('An email has been sent on your email address. Please follow the link to reset the password.');
                    } else {
                        $this->Flash->error('There is an error. Please try again.');
                    }
                } else {
                    $this->Flash->error('Your account is not active.');
                }
            }
        } else {
            $this->Flash->default('Please enter your username/email address. You will receive a link to create a new password via email.');
        }
        $this->set('user', $user);
        $this->set('forgot_password_page', 'forgot_password');
    }

    /**
     * This function is used to reset the password.
     * @param string $username
     * @param string $passcode
     */
    function resetPassword($username = null, $passcode = null) {
        if ($username && $passcode) {
            $em = $this->Common->decode_data($username);
            $user = $this->Users->newEntity(['username' => $em], ['validate' => 'resetPassword']);
            $this->loadModel("UserForgotPassword");

            $reset_data = $this->UserForgotPassword->find()->where(['username' => urldecode($em), 'status' => 'Active'])->first();
            if ($reset_data) {
                if ($this->request->is(['post', 'put'])) {
                    $user = $this->Users->findByUsername($this->request->data['username'])->first();
                    if (empty($user)) {
                        $this->Flash->error('User not registered.');
                    } else {
                        if ($user->status == "Active") {
                            $this->request->data['id'] = $user->id;
                            $user = $this->Users->patchEntity($user, $this->request->data, ['validate' => 'resetPassword']);
                            if (!$user->errors()) {
                                if ($this->Users->save($user)) {
                                    $url = Router::url(['controller' => 'Users', 'action' => 'login'], true);
                                    $this->Flash->success('Your new password has been generated successfully. Please login.');

                                    //Update the status of the forgot password link to "Done".
                                    $existing_forgot_password_data_entity = $this->UserForgotPassword->newEntity();
                                    $existing_forgot_password_data_entity->id = $reset_data->id;
                                    $existing_forgot_password_data_entity->status = "Done";
                                    $this->UserForgotPassword->save($existing_forgot_password_data_entity);

                                    $this->redirect(["action" => 'login']);
                                }
                            }
                        } else {
                            $this->Flash->error('Your account is not active.');
                        }
                    }
                }
            } else {
                $this->Flash->error('Invalid reset password link.');
            }
        } else {
            $user = $this->Users->newEntity();
            $this->Flash->error('Invalid reset password link.');
        }
        $this->set('user', $user);
        $this->set('reset_password_page', 'reset_password');
    }

    function myProfile() {
        $this->loadModel('Languages');
        $this->loadModel('Channels');
        $this->loadModel('Locations');
        $sessionValue = $this->request->session()->read('Auth.User');
        //pr($sessionValue['channels']); exit;
        $id = $sessionValue['id'];
        $user = $this->Users->findById($id)->contain(['UserRoles', 'UserRoles.Roles', 'UserCategories'])->first();
        $uploadData = '';

        //Added for image upload functionality 
        $userDefChannelIds = [];
        foreach ($sessionValue['channels'] as $channel_ids) {
            $userDefChannelIds[] = $channel_ids['id'];
        }

        $user_def_channel = $this->Channels->find()
                ->select(['id', 'name'])
                ->where(['id' => $user->default_channel]);

        $userDefChannelName = '';
        foreach ($user_def_channel as $channel_name) {
            $userDefChannelName = $channel_name->name;
        }

        $user_def_location = $this->Locations->find()
                ->select(['id', 'name'])
                ->where(['id' => $user->default_location]);

        $userDefLocationName = '';
        foreach ($user_def_location as $location_name) {
            $userDefLocationName = $location_name->name;
        }

        $userRoles = [];
        foreach ($user->user_roles as $user_role) {
            $userRoles[] = $user_role->role->name;
        }
        /*
        //Author Types
        $this->loadModel("AuthorTypes");
        $author_types = $this->AuthorTypes->find()
                ->select(['id', 'name'])
                ->where(['id' => $user->author_type]);

        $authorType = '';
        foreach ($author_types as $author_name) {
            $authorType = $author_name->name;
        }

        $this->set("authorType", $authorType);

        //Contributor Types
        $this->loadModel("ContributorTypes");
        $contributor_types = $this->ContributorTypes->find()
                ->select(['id', 'name'])
                ->where(['id' => $user->contributor_type]);

        $contributorType = '';
        foreach ($contributor_types as $contributor_name) {
            $contributorType = $contributor_name->name;
        }
        */
        //User Types
        $this->loadModel("UserTypes");
        $user_types = $this->UserTypes->find("list")->where(['status' => 'Active']);
        $this->set("user_types", $user_types);

        $rolesArr = $userRoles;

        if (empty($user)) {
            throw new NotFoundException(__('User not found'));
        }

        if ($this->request->is(['post', 'put'])) {
            // For Upload User Profile picture
            $fileName = $this->request->data['photo']['name'];
            $resizeConfig = array('width' => 279, 'height' => 279);
            $uploadPath = 'upload/profile/';
            $currentYearFolder = date("Y");

            if (!file_exists(WWW_ROOT . "upload/profile/" . $currentYearFolder)) {
                mkdir(WWW_ROOT . "upload/profile/" . $currentYearFolder);
                chmod(WWW_ROOT . "upload/profile/" . $currentYearFolder, 0777);
            }

            $profilePath = $uploadPath . $currentYearFolder . "/";

            $file_ext = pathinfo($fileName, PATHINFO_EXTENSION);
            $arr_ext = array('jpg', 'JPG', 'JPEG', 'jpeg', 'GIF', 'PNG', 'gif', 'png');

            $uploadFileNEW = basename($fileName, $file_ext);
            $uploadFileNEW = preg_replace('/[^A-Za-z0-9\-]/', '', $uploadFileNEW);
            $imageName = $uploadFileNEW . "_" . time() . '.' . $file_ext;
            $uploadFile = $profilePath . $uploadFileNEW . "_" . time() . '.' . $file_ext;

            $uploadFileUrl = '';

            if (in_array($file_ext, $arr_ext)) {

                if (move_uploaded_file($this->request->data['photo']['tmp_name'], $uploadFile)) {
                    $this->request->data['photo'] = $imageName;
                    chmod(WWW_ROOT . "upload/profile/" . $currentYearFolder . "/" . $imageName, 0777);
                    copy($uploadFile, $profilePath . $imageName);

                    $this->Image->resize($profilePath . $imageName, 280, 280, false);
                    //Added By Babulal Prasad to save to S3Bucket 
                    $uploadFileUrl = "upload/profile/" . $currentYearFolder . "/" . $imageName;
                    
                    //Added for image upload func.
                    foreach ($userDefChannelIds as $channel_id) {
                        if ($this->Aws->setS3Bucket($channel_id, $this->Config->getVal('aws-bucket', $channel_id))) {
                        $resultAWS = $this->Aws->uploadToBucket($uploadFileUrl, WWW_ROOT . "upload/profile/" . $currentYearFolder . "/" . $imageName);
                        }    
                    }
                    
                    $uploadFileUrl = "upload/profile/" . $currentYearFolder . "/" . $imageName;

                    if (file_exists($uploadFile)) {
                        @unlink(WWW_ROOT . $profilePath . $user->photo);
                    }
                } else {
                    $this->Flash->error(__('Unable to upload file, please try again.'));
                }
            } else {
                unset($this->request->data['photo']);
            }

            unset($this->request->data['user_roles']);

            $this->request->data['status_log'] = json_encode([["user_id" => $this->Auth->User("id"), "status" => "Active", "datetime" => date("Y-m-d H:i:s")]]);

            $user = $this->Users->patchEntity($user, $this->request->data, ['validate' => 'ProfilePhoto']);

            if (!isset($this->request->data['photo'])) {
                if (isset($this->request->data['photo_check']) && $this->request->data['photo_check'] != 'yes') {
                    @unlink(WWW_ROOT . $uploadPath . $user->photo);
                    $user['photo'] = "";
                }
            } else {
                $user['photo'] = "/profile/" . $currentYearFolder . "/" . $user['photo'];
            }

            unset($this->request->data['employee_id']);
            unset($this->request->data['reporting_name']);
            unset($this->request->data['category_name']);
            unset($this->request->data['location_name']);
            unset($this->request->data['channel_name']);
            unset($this->request->data['language_name']);

            $firstName = isset($this->request->data['first_name']) ? $this->request->data['first_name'] : '';
            if ($firstName == '') {
                $user->errors(['first_name' => ['_empty' => "First name is required"]]);
            }

            $firstNameOtherLang = isset($this->request->data['first_name_lng']) ? $this->request->data['first_name_lng'] : '';
            if ($firstNameOtherLang == '') {
                $user->errors(['first_name_lng' => ['_empty' => "First name in other language is required"]]);
            }

            if ($this->Users->save($user)) {
                $session = $this->request->session();
                $session->write('Auth.User.first_name', $this->request->data['first_name']);
                $session->write('Auth.User.last_name', $this->request->data['last_name']);
                if (isset($this->request->data['photo']) && $this->request->data['photo'] != '') {
                    $session->write('Auth.User.photo', "upload" . $this->request->data['photo']);
                }
                if (isset($uploadFileUrl) && $uploadFileUrl != '') {
                    $session->write('Auth.User.photo', $uploadFileUrl);
                }
                //$session->write('Auth.User.preferred_language', $this->request->data['preferred_language']);

                $this->Redis->saveAuthorData($id);
                $this->Flash->success(__('User has been updated.'));
            } else {
                $errors = $user->errors();
                $errorhtml = '<div>Record can not be saved. Please try again.</div>' . $this->Common->getErrorHtml($errors);
                $this->Flash->error(__($errorhtml));
            }
        }
        $reporting_user_id = array($user->reporting_to);
        $userlist = $this->Common->getUserNames();
        $reportingUsers = $this->Common->getUserData($reporting_user_id);
        $userlangauge = $this->Common->getUserLanguage();
        //pr($sessionValue); exit;
        
        $user_sub_cat_names = $sessionValue['submission_categories'];
        foreach ($user_sub_cat_names as $sub_cat_names) {
            $sub_category_options[] = $sub_cat_names['name'];
        }        

        $user_mod_cat_names = $sessionValue['moderation_categories'];
        foreach ($user_mod_cat_names as $mod_cat_names) {
            $mod_category_options[] = $mod_cat_names['name'];
        }

        $user_pub_cat_names = $sessionValue['categories'];
        foreach ($user_pub_cat_names as $pub_cat_names) {
            $pub_category_options[] = $pub_cat_names['name'];
        }

        $user_location_names = $sessionValue['locations'];
        foreach ($user_location_names as $loc_names) {
            $location_options[] = $loc_names['name'];
        }

        $user_channel_names = $sessionValue['channels'];
        foreach ($user_channel_names as $ch_names) {
            $channel_options[] = $ch_names['name'];
        }

        $user_language_names = $sessionValue['languages'];
        foreach ($user_language_names as $lang_names) {
            $language_options[] = $lang_names['name'];
        }

        $user_district_hq_names = $sessionValue['district_headquarters'];
        foreach ($user_district_hq_names as $district_hq_names) {
            $hq_options[] = $district_hq_names['name'];
        }
        $user_edition_names = $sessionValue['user_editions'];
        foreach ($user_edition_names as $edition_names) {
            $edition_options[] = $edition_names['name'];
        }
        $user_zone_names = $sessionValue['user_zones'];
        foreach ($user_zone_names as $zone_names) {
            $zone_options[] = $zone_names['name'];
        }

        $langauges_options = $this->Languages->find('all')->where(['status !=' => 'Trash']);
        $all_languages = [];
        if ($langauges_options) {
            foreach ($langauges_options as $langauge_options) {
                $all_languages[$langauge_options->id] = $langauge_options->name;
            }
        }

        $siteurl = Router::url("/", true);
        $this->set('userlangauge', $userlangauge);
        $this->set('rolesArr', $rolesArr);
        $this->set('user', $user);
        $this->set('siteurl', $siteurl);
        $this->set('userlist', $userlist);
        $this->set('reportingUsers', $reportingUsers);
        $this->set(compact('sub_category_options','mod_category_options','pub_category_options','location_options', 'channel_options', 'language_options', 'all_languages', 'hq_options', 'edition_options', 'zone_options', 'userDefChannelName', 'userDefLocationName'));
    }

    /**
     * This function is used to change password.
     */
    // public function changePassword()
    // {
    //     $sessionValue = $this->request->session()->read('Auth.User');
    //     $id = $sessionValue['id'];
    //     $user = $this->Users->findById($id)->first();
    //     if (empty($user))
    //     {
    //         throw new NotFoundException(__('User not found'));
    //     }
    //     if ($this->request->is(['post', 'put'])) 
    //     {
    //         $this->Users->patchEntity($user, $this->request->data, ['validate' => 'changepassword']);
    //         if ($this->Users->save($user)) 
    //         {
    //             $this->addModifiedUserFlag($id);                
    //             $this->Flash->success(__('Password has been changed successfully.'));
    //             return $this->redirect(['action' => 'directory']);
    //         }
    //         $this->Flash->error(__('Unable to change password.'));
    //     }
    //     unset($user['password']);
    //     $this->set('user', $user);
    // }

    public function changePassword() {
        $sessionValue = $this->request->session()->read('Auth.User');
        $id = $sessionValue['id'];
        $user = $this->Users->findById($id)->first();
        $old_password = $user->password;

        if (empty($user)) {
            $this->Flash->error(__('User not found'));
            return $this->redirect(['action' => 'directory']);
        }

        if ($this->request->is(['post', 'put'])) {
            $this->request->data["password"] = trim($this->request->data["password"]);
            $this->request->data["confirm_password"] = trim($this->request->data["confirm_password"]);
            $chk_duplicate_password = new DefaultPasswordHasher();
            $chk_duplicate_password->hash($this->request->data["password"]);

            if ($chk_duplicate_password->check($this->request->data["password"], $old_password)) {
                $this->Flash->error(__('New Password should not be same as old password'));
            } else {
                $this->Users->patchEntity($user, $this->request->data, ['validate' => 'changepassword']);
                if ($this->Users->save($user)) {
                    $this->addModifiedUserFlag($id);
                    $this->Flash->success(__('Password has been changed successfully.'));
                    return $this->redirect(['action' => 'change-password']);
                } else {
                    $errors = $user->errors();
                    $errorhtml = '<div>Password can not be changed. Please try again.</div>' . $this->Common->getErrorHtml($errors);
                    $this->Flash->error(__($errorhtml));
                }
            }
        }

        unset($user->password);
        $this->set('user', $user);
    }

    public function design() {
        $this->set('new_container', 'new_container');
    }

    public function removeImage($id = null) {
        $this->loadModel('Users');
        $user = $this->Users->findById($id)->first();
        $uploadPath = 'upload';

        $currentYearFolder = date("Y");

        $thumbPath = $uploadPath . 'thumb/';
        $mediumPath = $uploadPath . 'medium/';
        $profilePath = $uploadPath;

        if (file_exists(WWW_ROOT . "upload" . $user->photo)) {
            @unlink(WWW_ROOT . $uploadPath . $user->photo);
            @unlink(WWW_ROOT . $mediumPath . $user->photo);
            @unlink(WWW_ROOT . $thumbPath . $user->photo);
            @unlink(WWW_ROOT . $profilePath . $user->photo);
        }

        $this->Users->updateAll(
                ['photo' => ""], ['id' => $id]);
        return $this->redirect(['action' => 'my-profile', $id]);
    }

    function captcha() {
        $this->autoRender = false;
        $this->viewBuilder()->layout('ajax');
        $this->Captcha->create();
    }

    public function checkSessionActivity() {
        if ($this->Auth->user()) {
            echo json_encode(['status' => true]);
        } else {
            echo json_encode(['status' => false]);
        }
        exit;
    }

    private function getUserSlug($firstName, $lastName, $userId) {
        $slug = '';
        $firstName = isset($firstName) ? trim($firstName) : "";
        $lastName = isset($lastName) ? trim($lastName) : "";
        $fullName = $firstName != '' || $lastName != '' ? trim(str_replace("  ", " ", $firstName . " " . $lastName)) : "";
        $slug = str_replace(" ", "-", strtolower($fullName) . "-" . $userId);
        return strtolower($slug);
    }

    public function setUserChannels($userId, $channels, $status = "Active") {
        $userChannels = TableRegistry::get('UserChannels');
        $channels = array_flip($channels);
        if ($userId) {
            $where = ["user_id" => $userId];
            $where["channel_id IN"] = array_keys($channels);

            $existingRecords = $userChannels->find()->where($where)->all();
            if (isset($existingRecords) && $existingRecords->count()) {

                foreach ($existingRecords as $i => $item) {

                    $item = $userChannels->patchEntity($item, ["status" => $status]);
                    unset($channels[$item->channel_id]);

                    if ($userChannels->save($item)) {
                        
                    }
                }
            }
            if (count($channels)) {
                foreach ($channels as $channelId => $tmpChannelId) {
                    $item = $userChannels->newEntity();
                    $item->user_id = $userId;
                    $item->channel_id = $channelId;
                    $item->status = $status;
                    if ($userChannels->save($item)) {
                        
                    }
                    //var_dump($userChannels->save($item));
                }
            }
            return true;
        } else {
            return false;
        }
    }

    private function getUserLocationsToSave($userId = null, $locations = [], $defaultLocationId = null) {
        if ($userId && $locations) {
            $unique_locations = array_unique($locations);
            $location_array = [];
            foreach ($unique_locations as $location_id) {
                if ($location_id == $defaultLocationId) {
                    array_push($location_array, ["location_id" => $location_id]);
                } else {
                    array_push($location_array, ["location_id" => $location_id]);
                }
            }
            return $location_array;
        } else {
            return false;
        }
    }

    private function setUserZones($userId) {
        
    }

    private function getUserDistrictHeadquarters($user_data) {
        $array_district_headquarters = [];
        if (isset($user_data->user_district_headquarters) && $user_data->user_district_headquarters) {
            foreach ($user_data->user_district_headquarters as $usr_district_headquarter) {
                array_push($array_district_headquarters, $usr_district_headquarter->district_headquarter_id);
            }
        }
        return $array_district_headquarters;
    }

    private function getUserEditions($user_data) {
        $array_editions = [];
        if (isset($user_data->user_editions) && $user_data->user_editions) {
            foreach ($user_data->user_editions as $usr_edition) {
                array_push($array_editions, $usr_edition->edition_id);
            }
        }
        return $array_editions;
    }

    private function getUserZones($user_data) {
        $array_zones = [];
        if (isset($user_data->user_zones) && $user_data->user_zones) {
            foreach ($user_data->user_zones as $usr_zone) {
                array_push($array_zones, $usr_zone->zone_id);
            }
        }
        return $array_zones;
    }

    private function getUserCategories($user_data) {
        $array_categories = [];
        if (isset($user_data->user_categories) && $user_data->user_categories) {
            foreach ($user_data->user_categories as $usr_category) {
                if($usr_category->category_type == "Publishing")
                {
                    array_push($array_categories, $usr_category->category_id);
                }
            }
        }
        return $array_categories;
    }
    
    private function getUserSubmissionCategories($user_data) {
        $array_categories = [];
        if (isset($user_data->user_categories) && $user_data->user_categories) {
            foreach ($user_data->user_categories as $usr_category) {
                if($usr_category->category_type == "Submission")
                {
                    array_push($array_categories, $usr_category->category_id);
                }
            }
        }
        return $array_categories;
    }
    
    private function getUserModerationCategories($user_data) {
        $array_categories = [];
        if (isset($user_data->user_categories) && $user_data->user_categories) {
            foreach ($user_data->user_categories as $usr_category) {
                if($usr_category->category_type == "Moderation")
                {
                    array_push($array_categories, $usr_category->category_id);
                }
            }
        }
        return $array_categories;
    }

    private function getUserRoles($user_data) {
        $array_roles = [];
        if (isset($user_data->user_roles) && $user_data->user_roles) {
            foreach ($user_data->user_roles as $user_role) {
                $array_roles[$user_role->id] = $user_role->role_id;
            }
        }
        return $array_roles;
    }

    private function getUserLocations($user_data) {
        $array_locations = [];
        if (isset($user_data->user_locations) && $user_data->user_locations) {
            foreach ($user_data->user_locations as $usr_location) {
                array_push($array_locations, $usr_location->location_id);
            }
        }
        return $array_locations;
    }

    private function getUserDefaultPublishingChannel($user_data) {
        $default_channel = [];
        if (isset($user_data->user_channels) && $user_data->user_channels) {
            foreach ($user_data->user_channels as $usr_channel) {
                if ($usr_channel->is_default == "Yes") {
                    $default_channel[] = $usr_channel->channel_id;
                }
            }
        }
        return $default_channel;
    }

    private function getUserOtherPublishingChannels($user_data) {
        $array_other_channels = [];
        if (isset($user_data->user_channels) && $user_data->user_channels) {
            foreach ($user_data->user_channels as $usr_channel) {
                if ($usr_channel->is_default == "No") {
                    array_push($array_other_channels, $usr_channel->channel_id);
                }
            }
        }
        return $array_other_channels;
    }

    private function getUserLanguages($user_data) {
        $array_user_languages = [];
        if (isset($user_data->user_languages) && $user_data->user_languages) {
            foreach ($user_data->user_languages as $user_language) {
                $array_user_languages[$user_language->id] = $user_language->language_id;
            }
        }
        return $array_user_languages;
    }

    private function getUserPublishingLocations($user_data) {
        $array_user_publishing_locations = [];
        if (isset($user_data->user_publishing_locations) && $user_data->user_publishing_locations) {
            foreach ($user_data->user_publishing_locations as $user_publishing_location) {
                $array_user_publishing_locations[] = $user_publishing_location->location_id;
            }
        }
        return $array_user_publishing_locations;
    }
}