<?php
$authUser = AuthComponent::user();
?>
<nav class="navbar navbar-inverse navbar-fixed-top">
<div class="container-fluid header-bg">
  <div class="row headerinfo">
  
    <div class="title-org">
        <p><?php echo $data['textcenter'];?></p>
    </div>
    <div class="RightTabs">
        <span id="refresh"><a href="javascript:void(0)"><?php echo $this->Html->image('refresh.png',array('class'=>'img-responsive', 'width' => '36'));  ?></a></span>
        <?php if($data['righttabs'] == 3){?>
        <span ><a href="javascript:void(0)"><?php echo $this->Html->image('reports_charts.png',array('class'=>'img-responsive', 'width' => '84', 'url' => array("controller" => "organizations", "action" => "reportsandcharts", $data["orgid"]))); ?></a></span>
        <span><a href="javascript:void(0)"><?php echo $this->Html->image('live_endros.png',array('class'=>'img-responsive', 'width' => '93',  'url' => array("controller" => "organizations", "action" => "liveendorsement", $data["orgid"]))); ?></a></span>
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
                    <li class="sidebar-brand">
                            <?php echo $this->Html->link('Organizations',array('controller'=>'organizations','action'=>'index')); ?>   
                    </li>
<!--                    <li class="sidebar-brand">-->
                            <?php //echo $this->Html->link('Organization Owners',array('controller'=>'users','action'=>'index')); ?>      
<!--                    </li>-->
                    <li class="sidebar-brand">
                            <?php echo $this->Html->link('Set Up New Organization',array('controller'=>'users','action'=>'createorg')); ?>   
                    </li>
                    <?php if($authUser["role"] == "1"){
                        echo '<li class="sidebar-brand">'.$this->Html->link("Global Settings", array("controller" => "users",  "action" => "setting")).'</li>';
                        echo '<li class="sidebar-brand">'.$this->Html->link("Add Super Admin", array("controller" => "users",  "action" => "addSuperAdmin")).'</li>';
                        echo '<li class="sidebar-brand">'.$this->Html->link("Reset Password", array("controller" => "users",  "action" => "resetpassword")).'</li>';
                        echo '<li class="sidebar-brand">'.$this->Html->link("Stats", array("controller" => "stats",  "action" => "index")).'</li>';
                        echo '<li class="sidebar-brand">'.$this->Html->link("Reports", array("controller" => "reports",  "action" => "index")).'</li>';
                    }
                    ?>
                    <?php if($authUser["role"] == "2"){?>
                        <li class="sidebar-brand"><?php echo $this->Html->Link("FAQS", array('controller' => 'users', 'action' => 'usersfaq'));?></li>
                    <?php }?>
                </ul>
                <div class="logout"> 
                    <span class="userName">
                        <?php echo $authUser['fname'].' '.$authUser['lname']; ?>
                        <?php if($authUser["role"] == "1"){?>
                            <div class="clearfix"></div>
                            <span class="u-email" ><?php echo $authUser['email']; ?></span>
                        <?php } ?>
                        <div class="clearfix"></div>
                            <?php echo $this->Html->link('LOGOUT',array('controller'=>'users','action'=>'logout'),array('class'=>'logoutText')); ?>
                    </span>
                    <?php if($authUser["role"] == "2"){?>
                    <span class="">
                        <?php echo $this->Html->Image("user.png", array("alt"=>"user","class" => "img-circle", 'width' => '61', 'height' => '61'));?>
                    </span>
                    <?php } ?>
                </div>
            
        </div>
    </div>
    <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
    
    