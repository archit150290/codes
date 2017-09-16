<?php
$authUser = AuthComponent::user();
if(!isset ($data)) {
    $data = array();
    $data['righttabs'] = 3;
    $data['orgid'] = $organizationId;
    $headerTitle = isset($headerTitle) ? $headerTitle : "";
} else {
    $headerTitle = $data['textcenter'];
}
?>
<nav class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid header-bg">
        <div class="row headerinfo">
            <div class="title-org">
                <p><?php echo $headerTitle;?></p>
            </div>
            <div class="RightTabs">
                <span id="refresh"><a href="javascript:void(0)"><?php echo $this->Html->image('refresh.png',array('class'=>'img-responsive', 'width' => '36')); ?></a></span>
                <?php if($data['righttabs'] == 3){?>
                <span ><a href="javascript:void(0)"><?php echo $this->Html->image('reports_charts.png',array('class'=>'img-responsive', 'width' => '85', 'url' => array("controller" => "organizations", "action" => "reportsandcharts", $data["orgid"]))); ?></a></span>
                <span><a href="javascript:void(0)"><?php echo $this->Html->image('live_endros.png',array('class'=>'img-responsive', 'width' => '93', 'url' => array("controller" => "organizations", "action" => "liveendorsement", $data["orgid"]))); ?></a></span>
                <?php } ?>

            </div>

        </div>
    </div>
</nav>
<div class="container-fluid">

    <div class="row">
        <div class="col-sm-3 col-md-2 sidebar">
            <div id="wrapper">

                <ul class="sidebar-nav">
                    <li class="sidebar-brand"><?php echo $this->Html->link('Organizations',array('controller'=>'organizations','action'=>'index')); ?></li>
                    <li class="sidebar-brand"><?php echo $this->Html->link('Create New Organization',array('controller'=>'users','action'=>'createorg', 'client_id' => $authUser["id"])); ?></li>
                    <li class="sidebar-brand"><?php echo $this->Html->link('My Profile',array('controller'=>'users','action'=>'editclient',$authUser["id"])); ?></li>
                    <?php 
                    if($authUser["role"] != "1"){?>
                        <li class="sidebar-brand"><?php echo $this->Html->Link("FAQ", array('controller' => 'users', 'action' => 'usersfaq'));?></li>
                        <li class="sidebar-brand"><?php echo $this->Html->Link("Announcements", array('controller' => 'organizations', 'action' => 'announcements'));?></li>
                    <?php }?>
                </ul>
                <div class="logout" style=""> 
                    <span class="pull-left userName">
                            <?php echo ucfirst($authUser['fname']).' '.ucfirst($authUser['lname']); ?>
                        <?php if($authUser["role"] == "1"){?>
                            <div class="clearfix"></div>
                            <span class="u-email" ><?php echo $authUser['email']; ?></span>
                        <?php } ?>
                        <div class="clearfix"></div>
                            <?php echo $this->Html->link('LOGOUT',array('controller'=>'users','action'=>'logout'),array('class'=>'logoutText')); ?>
                    </span>
                    <?php if($authUser["role"] == "2"){?>
                    <span class="pull-right">
                        <?php if(!empty($authUser["image"])){
                            $filepath = WWW_ROOT. PROFILE_IMAGE_DIR . $authUser["image"];
                            if(file_exists($filepath)){
                                $user_imagenew = Router::url('/', true) . "app/webroot/" . PROFILE_IMAGE_DIR ."small/" .$authUser["image"];
                                echo $this->Html->image($user_imagenew, array('width'=>'70','height'=>'70',"class" => "img-circle"));
                            }else{
                               echo $this->Html->image("user.png", array("class" => "img-circle", 'width'=>'61','height'=>'61'));
                            }
                        }else{
                            echo $this->Html->image("user.png", array("class" => "img-circle", 'width'=>'61','height'=>'61'));
                        }?>

                    </span> 
                    <?php } ?>
                </div>

            </div>
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

