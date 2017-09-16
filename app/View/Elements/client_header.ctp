<?php
if ($this->Session->read('Auth.User.id')) {
    $loggedUserAuth = ($this->Session->read('Auth'));
    
    $loggedUserRole = ($this->Session->read('Auth.User.role'));
    $current_org = $this->Session->read('Auth.User.current_org');
    $orgUpdates = $this->Session->read('Auth.User.org_updates');

    $check_current_org = 0;
    if (!empty($current_org) && ($orgUpdates['org_status'] == 'active' && $orgUpdates['user_status'] == 'active')) {
        $check_current_org = $current_org->id;
    }

    $fname = ucfirst($this->Session->read('Auth.User.fname'));
    $lname = ucfirst($this->Session->read('Auth.User.lname'));
    $FullName = $fname . " " . $lname;
    $image = $this->Session->read('Auth.User.image');
} else {
    $orgUpdates['org_status'] = 'inactive';
    $orgUpdates['user_status'] = 'inactive';
}
$currentpage = $this->here;

$ndorse_home = "ndorse-home.png";
$ndorse_ndorse = "nDorser.png";
$ndorse_ndorsed = "nDorsed.png";
$ndorse_stats = "nDorsements.png";
//$ndorse_ndorse=
if (strstr($currentpage, "endorse")) {
    $pageval = explode("endorse", $currentpage);
//  print_r($pageval);exit;
    $paramsactionendorse = trim($this->params["action"]);
    if ($paramsactionendorse == "ndorse") {
        $ndorse_ndorse = "nDorser-act.png";
    } elseif ($paramsactionendorse == "ndorsed") {
        $ndorse_ndorsed = "nDorsed-act.png";
    } elseif ($paramsactionendorse == "stats") {
        $ndorse_stats = "nDorsements-act.png";
    } elseif ($paramsactionendorse == "index") {
        $ndorse_home = "ndorse-home-act.png";
    }
}
$paramsaction = trim($this->params["action"]);
?>
<?php if (!isset($noLeftMenu) || !$noLeftMenu) { ?>

    <div class="col-sm-3 col-md-2 client-nav sidebar ">
        <div id="wrapper" class="nano">
            <div class="content">
                <ul class="sidebar-nav">
                    <?php if ($check_current_org > 0) { ?>
                        <li class="sidebar-brand"> <?php echo $this->Html->Link("Stats and Reports", "javascript:void(0);", array('style' => "cursor: default !important; padding:0 0 10px 10px")); ?>
                            <ul class="with-arrows">
                                <?php 
                                if ($loggedUserRole == 2) { ?>
                                    <li class="sidebar-brand"> <?php echo $this->Html->Link("What's New", array("controller" => "client", "action" => "whatsnew"), ($paramsaction == "whatsnew") ? array("class" => "active-link") : ""); ?> </li>
                                <?php }
                                ?>


                                <li class="sidebar-brand"> <?php echo $this->Html->Link("Leader Board", array("controller" => "client", "action" => "leaderboard"), ($paramsaction == "leaderboard") ? array("class" => "active-link") : ""); ?> </li>
                                <li class=""> <?php echo $this->Html->Link("nDorsement History By Day", array("controller" => "endorse", "action" => "day"), ($paramsaction == "day") ? array("class" => "active-link") : ""); ?></li>
                                <li class=""> <?php echo $this->Html->Link("nDorsement History By Department", array("controller" => "endorse", "action" => "departments"), ($paramsaction == "departments") ? array("class" => "active-link") : ""); ?></li>
                                <li class=""> <?php echo $this->Html->Link("nDorsement History By Job Title", array("controller" => "endorse", "action" => "jobtitle"), ($paramsaction == "jobtitle") ? array("class" => "active-link") : ""); ?></li>
                                <li class=""> <?php echo $this->Html->Link("nDorsement History By Sub Org", array("controller" => "endorse", "action" => "entity"), ($paramsaction == "entity") ? array("class" => "active-link") : ""); ?></li>
                            </ul>
                        </li>
                    <?php } ?>
                    <li class="sidebar-brand"> <?php echo $this->Html->Link("Organizations", "javascript:void(0);", array('style' => "cursor: default !important; padding:0 0 10px 10px")); ?>
                        <ul class="with-arrows">
                            <li class=""> <?php echo $this->Html->Link("My Organizations", array("controller" => "client", "action" => "myorganizations"), ($paramsaction == "myorganizations") ? array("class" => "active-link") : ""); ?> </li>
                            <li class=""> <?php echo $this->Html->Link("Create Org", array("controller" => "client", "action" => "createorg"), ($paramsaction == "createorg") ? array("class" => "active-link") : ""); ?> </li>
                            <li class=""> <?php echo $this->Html->Link("Join An Org", array("controller" => "client", "action" => "joinanorganization"), ($paramsaction == "joinanorganization") ? array("class" => "active-link") : ""); ?></li>
                        </ul>
                    </li>
                    <li class="sidebar-brand"> <?php echo $this->Html->Link("Admin", "javascript:void(0);", array('style' => "cursor: default !important; padding:0 0 10px 10px")); ?>
                        <ul class="with-arrows">
                            <li class="disabled"> <?php echo $this->Html->Link("Manage Users", "", array("class" => "popup-for-admin")); ?> </li>
                            <li class="disabled"> <?php echo $this->Html->Link("Manage Organization", "", array("class" => "popup-for-admin")); ?> </li>
                            <li class="disabled"> <?php echo $this->Html->Link("Invite Users", "", array("class" => "popup-for-admin")); ?></li>
                        </ul>
                    </li>
                    <li class="sidebar-brand"> <?php echo $this->Html->Link("My Profile", array("controller" => "client", "action" => "profile"), ($paramsaction == "profile") ? array("class" => "active-link") : ""); ?></li>
                    <li class="sidebar-brand"> <?php echo $this->Html->Link("Feedback", "mailto:" . SUPPORTEMAIL . "?Subject=Feedback", array("target" => "_top")); ?></li>
                    <li class="sidebar-brand"> <?php echo $this->Html->Link("Recommend nDorse", "", array("class" => "recommendLnk")); ?></li>
                    <li class="sidebar-brand"> <?php echo $this->Html->Link("FAQ", array("controller" => "client", "action" => "faq"), ($paramsaction == "faq") ? array("class" => "active-link") : ""); ?></li>
                    <li class="sidebar-brand"> <?php echo $this->Html->Link("End User License Agreement", array("controller" => "client", "action" => "tnc"), ($paramsaction == "tnc") ? array("class" => "active-link") : ""); ?></li>
                    <li class="sidebar-brand"> <?php echo $this->Html->Link("Log out", array("controller" => "client", "action" => "logout")); ?></li>
                </ul>
                <?php
                //====don't delete
                /* ?>
                  <div class="logout"> <span class="userName"> <?php echo $FullName; ?>
                  <div class="clearfix"></div>
                  <?php echo $this->Html->Link("LOGOUT", array("controller" => "client", "action" => "logout"), array("class" => "logoutText")); ?> </span> <span class="">
                  <?php

                  if ($image != "") {
                  $file_headers = @get_headers($image);
                  $image = ($file_headers[0] != 'HTTP/1.1 404 Not Found') ? $image: Router::url('/', true)."img/user.png";
                  echo '<img width="61" height="61" alt="" class="img-circle" src="'.$image.'">';
                  } else {
                  echo $this->Html->image("user.png", array("class" => "img-circle", 'width' => '61', 'height' => '61'));
                  }
                  ?>
                  </span>
                  </div>
                  <?php */
                ?>
            </div>
        </div>
    </div>
<?php } ?>
<div class="">
    <nav class="navbar navbar-fixed-top">
        <div class="header-bg-nav container-fluid">
            <div class="pull-left menu">
                <div class="title-org"> <span style="margin-top:20px; font-size:16px;">
                        <?php
                        if (isset($MenuName)) {
                            echo $MenuName;
                        }
                        ?>
                    </span> </div>
            </div>
            <div class="RightTabs"> <span><a href="javascript:void(0);"><?php echo $this->Html->Image("refresh.png", array('id' => 'refresh')); ?></a></span>
                <?php //if ($addEndorse == true) {  ?>
                <span id="addNDorsePost">
                    <img src="<?php echo Router::url('/', true); ?>img/add-nDorse.png" alt=""  />
                    <div class="collapse PopDown" id="" >
                        <div class="popDownArrow text-center"><?php echo $this->Html->image('popDownArrow.png'); ?></div>
                        <div class="nD-menu-well">
                            <ul class="" style="list-style:none">
                                <li><a href="javascript:void(0);" data-toggle="modal" data-target=".endorse-now-popupmodel">nDorse Now!</a></li>
                                <li>
                                    <?php echo $this->Html->link('Post Now!', array('controller' => 'post', 'action' => 'add')); ?>
                                    <!--<a href="">Post Now!</a>-->
                                </li>
                            </ul>
                        </div>
                    </div>
                </span>
                <?php
                /* } else { ?>
                  <span><img src="<?php echo Router::url('/', true); ?>img/add-nDorse-act.png" alt="" /></span>
                  <?php
                  } */
                if ($check_current_org > 0) {
                    ?>
                    <span>
                    <!--                        <span class="count">00</span>--> 
                        <a href="<?php echo Router::url('/', true); ?>endorse/ndorse"> <img src="<?php echo Router::url('/', true); ?>img/<?php echo $ndorse_ndorse; ?>" alt=""   /> 

                        </a> </span> <span> 
                        <!--                        <span class="count">00</span>--> 
                        <a href="<?php echo Router::url('/', true); ?>endorse/stats"> <img src="<?php echo Router::url('/', true); ?>img/<?php echo $ndorse_stats; ?>" alt=""   /> </a> </span> <span> <span class="count hidden" id="ndorsedCount"></span> <a href="<?php echo Router::url('/', true); ?>endorse/ndorsed" class="endorse-ndorsed"> <img src="<?php echo Router::url('/', true); ?>img/<?php echo $ndorse_ndorsed; ?>" alt="" /> </a> </span> <span> <span class="count hidden" id="liveCount"></span> <a href="<?php echo Router::url('/', true); ?>endorse" class="endorse-home" > <img src="<?php echo Router::url('/', true); ?>img/<?php echo $ndorse_home; ?>" alt=""  /> </a> </span>
                <?php } ?>
                <?php //echo $this->Html->Image("add-nDorse.png") ;  ?>
            </div>
        </div>
    </nav>
</div>
<div class="modal fade bs-example-modal-lg nDorse-process select-type endorse-now-popupmodel" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" id="">
    <div class="modal-dialog" style="width:400px;">
        <div class="modal-content">
            <div class="modal-header"> 
              <!--        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>--> 
                <!--<h4 class="modal-title select-type" >Select Type</h4> --> 
            </div>
            <div class="modal-body">
                <?php //echo $this->Form->create('endorsementType', array('class' => 'select-type', 'url' => Router::url('/', true) . "post/add"));  ?> 
                <?php echo $this->Form->create('endorsementType', array('class' => 'select-type', 'url' => Router::url('/', true) . "endorse/add")); ?> 
                <?php if ($orgUpdates['user_status'] == 'active' && $orgUpdates['org_status'] == 'active') { ?>
                    <span class="radio">
                        <div class="input radio">
                            <input type="radio" checked="checked"  id="pn" name="data[type]" value="standard">
                            <label for="pn">Public nDorsement </label>
                            <img src="<?php echo Router::url('/', true); ?>img/public-nDorse.png"  class="pull-right" alt=""  /> <br />
                            <br />
                            <input type="radio"  id="an" name="data[type]" value="anonymous">
                            <label for="an">Anonymous nDorsement </label>
                            <img src="<?php echo Router::url('/', true); ?>img/anonymous-nDorse.png"  class="pull-right" alt=""  /> <br />
                            <br />
                            <input type="radio"  id="privet" name="data[type]" value="private">
                            <label for="privet">Private nDorsement </label>
                            <img src="<?php echo Router::url('/', true); ?>img/privet-nDorse.png"  class="pull-right" alt=""  /> </div>
                    </span> 
                <?php } else { ?>
                    <div class="not-assigned" style="color:#333;">Currently, you have not been assigned an Organization. Please create, join or switch to an Organization. Go to MENU to "Create and/or Join An Org" and then switch to an Organization to set your default Organization.</div>
                <?php } ?>
            </div>
            <div class="modal-footer" style="margin-left:18px;">
                <?php if ($orgUpdates['user_status'] == 'active' && $orgUpdates['org_status'] == 'active') { ?>
                    <button class="btn btn-default pull-left" type="submit">Proceed </button>
                <?php } ?>
                <button class="btn btn-default pull-left" type="button" class="close" data-dismiss="modal" aria-label="Close">
                    Cancel
                </button>
            </div>
            <?php echo $this->Form->end(); ?> </div>
    </div>
</div>

<div class="modal fade" id="recommendModal" role="dialog">
    <div class="modal-dialog"> 
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header bg-or">
                <button type="button" class="btn btn-default pull-right close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Recommend nDorse</h4>
            </div>
            <div class="modal-body text-center">
                <span class='st_facebook_large' displayText='Facebook'></span>
                <span class='st_twitter_large' displayText='Tweet'></span>
                <span class='st_linkedin_large' displayText='LinkedIn'></span>
                <span class='st_pinterest_large' displayText='Pinterest'></span>
                <span class='st_email_large' displayText='Email'></span>
            </div>
        </div>
    </div>
</div>