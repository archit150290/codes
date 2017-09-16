<?php
//print_r($endorsedata);
$endorser_image = $endorsed_image = Router::url('/', true) . "img/user.png";
if ($endorsedata["endorsement_for"] == "department") {
    $endorsed_image = Router::url('/', true) . "img/department.png";
} elseif ($endorsedata["endorsement_for"] == "entity") {
    $endorsed_image = Router::url('/', true) . "img/sub-org.png";
}

if (isset($endorsedata["endorse_image"])) {
    $user_image = explode("/", $endorsedata["endorse_image"]);
    if (file_exists(WWW_ROOT . PROFILE_IMAGE_DIR . $user_image[count($user_image) - 1])) {
        $endorser_image = Router::url('/', true) . PROFILE_IMAGE_DIR . "small/" . $user_image[count($user_image) - 1];
    }
}

if (isset($endorsedata["endorsed_image"])) {
    $user_image = explode("/", $endorsedata["endorsed_image"]);
    if (file_exists(WWW_ROOT . PROFILE_IMAGE_DIR . $user_image[count($user_image) - 1])) {

        $endorsed_image = Router::url('/', true) . PROFILE_IMAGE_DIR . "small/" . $user_image[count($user_image) - 1];
    }
}
$createddate = date("m/d/Y", strtotime($endorsedata["created"]));
$ndorser_anonymous = "user";
$endorser_name = $endorsedata["endorser_name"];
$ndorser_anonymous = "user";
if ($endorsedata["type"] == "anonymous") {
    $endorser_name = "****";
    $endorser_image = Router::url('/', true) . "img/user.png";
    $ndorser_anonymous = "anonymous";
}
?>

<div class="nDorse-Details">
    <section>
        <div class="">
            <div class="grey-bg">
                <div class="col-md-4 col-sm-12">
                    <div class="text-left">

                        <img src="<?php echo $endorsed_image; ?>" user_id="<?php echo $endorsedata["endorsed_id"]; ?>"  
                             endorse_type="anonymous<?php //echo $endorsedata["endorsement_for"];      ?>" 
                             data-user-id="<?php echo $endorsedata["endorsed_id"]; ?>" data-logged-id="<?php echo $logged_user_id; ?>"
                             width="100" class="img-circle ndorse_click hand show-user-profile"  alt=""/>

                        <span class="rohan-space"><?php echo ucfirst($endorsedata["endorsed_name"]); ?></span>
                        <p class="ndorser-detail">nDorsed</p>
                    </div>
                </div>
                <div class="col-md-4 col-sm-4">
                    <div class="date-detail"><?php //echo $createddate;      ?>

                        <?php
                        //=========calculating time difference from present time.
                        //$createddate = new DateTime(date("m/d/Y h:i:s",$endorse["created"]));
                        //echo date("Y-m-d H:i:s",$endorse["created"]);
//					$createddate = new DateTime(date("Y-m-d H:i:s",strtotime($endorsedata["created"])));
//					
//                    $now = new DateTime();
//                    $timediff = (array)$now->diff($createddate, true);
//                    $arraytimediff = array("y" => "year", "m" => "month", "d" => "days", "h" => "hr", "i" => "minute", "s" => "second", ); 
//                    foreach($timediff as $key => $difference){
//                        if($difference!=0){
//                            $diffkey = $arraytimediff[$key];
//                            if($key == "h" || $key == "i" || $key == "s"){
//                                $plural = ($difference <=1)?"":"s";
//                                echo $difference." ".$diffkey.$plural." ago";
//                            }else{
//                               echo $createddate = date("m/d/Y",strtotime($endorsedata["created"]));
//                            }
//                            break;
//                        }
//                    }
                        echo $createddate = date("m/d/Y", strtotime($endorsedata["created"]));
                        ?>
                    </div>
                </div>
                <div class="col-md-4 col-sm-4">
                    <div class="text-right">
                        <span class="rohan-space"><?php echo ucfirst($endorser_name); ?></span> 
                        <img src="<?php echo $endorser_image; ?>" 
                             data-user-id="<?php echo $endorsedata["endorser_id"]; ?>" data-logged-id="<?php echo $logged_user_id; ?>"
                             user_id="<?php echo $endorsedata["endorser_id"]; ?>" endorse_type="anonymous<?php //echo $ndorser_anonymous;?>"  
                             width="100" class="img-circle ndorse_click hand show-user-profile" alt=""/>
                        <p class="ndorsed-detail">nDorser</p>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
    </section>
    <section>
        <?php $endorsecorevalues = $this->App->commoncorevaluesarrangement($endorsedata["core_values"]);
        ?>
        <div class="">
            <h3>Core Values Shown :</h3>
            <div class="core-values-shown1">
                <table class="table table-hover table-core-value-shown">
                    <?php foreach ($endorsecorevalues as $val) { ?>
                        <tr>
                            <td><span style="color:<?php echo $val["color_code"]; ?>;"><?php echo $val["name"]; ?></span></td>
                        </tr>
                    <?php } ?>
                </table>
            </div>
        </div>
    </section>
    <?php if (trim($endorsedata["message"]) != "" && $ndorser_anonymous != "anonymous") { ?>
        <section>
            <div class="nDorse-Details-msg">
                <h3>Message :</h3>
                <div class="mesg">
                    <p><?php echo $endorsedata["message"]; ?></p>
                </div>
            </div>
        </section>
    <?php } ?>
    <section>
        <div class="">
            <?php if (!empty($endorsedata["attatched_image"]) && $ndorser_anonymous != "anonymous") {
                ?>
                <div class="col-md-12" style="padding-left:0"> <span class="">
                        <h3 class="attach-img"> &nbsp;Attached Images</h3>
                    </span>
                    <div id="imagePanel" class="panel panel-default" style="padding:10px; max-height:275px; overflow:auto;">
                        <?php
                        $index = 1;
                        foreach ($endorsedata["attatched_image"] as $imageval) {
                            $bigimg = str_replace("/small", "", $imageval);
                            ?>

                            <div class="col-md-2 js_thumbDiv">
                                <div class="onefive"><img src="<?php echo $imageval; ?>" bigimg ="<?php echo $bigimg; ?>"  index="<?php echo $index; ?>" type="image" width="100" class="attached-item attached-item1 detail_img_<?php echo $index; ?>"  alt=""/> </div>
                            </div>
                            <?php
                            $index++;
                        }
                        ?>
                        <div class="clearfix"></div>
                    </div>
                </div>
            <?php } ?>
            <?php if (!empty($endorsedata["emojis_image"]) && $ndorser_anonymous != "anonymous") { ?>
                <div class="col-md-12" style="padding-left:0"> <span class="">
                        <h3 class="attach-img"> &nbsp;Attached Stickers</h3>
                    </span>
                    <div class="panel panel-default" style="padding:10px; max-height:275px; overflow:auto;">
                        <?php
                        $index = 1;
                        foreach ($endorsedata["emojis_image"] as $imageval) {
                            ?>
                            <div class="col-md-2 js_thumbDiv" >
                                <div class="onefive"> <img src="<?php echo $imageval; ?>" bigimg ="<?php echo $imageval; ?>" index="<?php echo $index; ?>" type="emojis" width="100" class="attached-item attached-emojis detail_emojis_<?php echo $index; ?>" alt=""/> </div>
                            </div>
                            <?php
                            $index++;
                        }
                        ?>
                        <div class="clearfix"></div>
                    </div>
                </div>
            <?php } ?>

        </div>
        <div class="clearfix"></div>
    </section>

    <?php if (isset($endorsedata["endorse_reply_count"]) && $endorsedata["endorse_reply_count"] > 0) { ?>
        <section>
            <div class="nDorse-Details-msg">
                <h3>Reply</h3>
                <div class="mesg">
                    <?php if ($endorsedata["reply"] != "") { ?>
                        <p class="endorsed-reply"><strong><?php echo $endorsedata["endorsed_name"]; ?></strong> replied - <?php echo $endorsedata["reply"]; ?> </p>
                    <?php } ?>
                    <?php if ($endorsedata["reply_counter"] != "") { ?>
                        <p class="endorser-reply"><strong class="text-link"><?php echo $endorsedata["endorser_name"]; ?></strong> replied - <?php echo $endorsedata["reply_counter"]; ?> </p>
                    <?php } ?>
                </div>
            </div>
        </section>
    <?php } ?>


    <?php if ($endorsedata["is_reply"] == 1) { ?>
        <div class="col-md-12">
            <div class="form-group"> <a href="javascript:void(0);" class="btn btn-orange-small" data-toggle="modal" data-target="#myModalreply">Reply</a> </div>
        </div>
    <?php } ?>
</div>
<div class="modal fade" id="myModalreply" tabindex="-1" role="dialog" 
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content"> 
            <!-- Modal Header -->

            <div class="modal-header">
                <button data-dismiss="modal" class="btn btn-default pull-right close" type="button">×</button>
                <h3>Enter the text for reply</h3>
            </div>
            <!-- Modal Body -->
            <div class="modal-body">

                <div class="form-group">
                    <?php //echo $this->Form->input('reply', array('placeholder' => 'Enter Your text Here...','class' => 'my-pro-textarea', 'label' => false,'type'=>'textarea'));  ?> 
                    <textarea id="reply" placeholder="Enter the text for reply"> </textarea>
                    <div id="replyerr" class="error" style="display:none;"></div>
                </div>

                <div class="clearfix"></div>
                <!-- Modal Footer -->

            </div>
            <div class="modal-footer">
                <button type="button" id="savereply" data-eid="<?php echo $endorsedata["id"]; ?>" class="btn btn-orange-small pull-left"> Submit </button>
            </div>
        </div>
    </div>
</div>
<div class="modal fade" id="myPhotoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button data-dismiss="modal" class="btn btn-default pull-right close" type="button">×</button>
                <h3 style="margin-bottom: -20px;">Gallery</h3>
            </div>
            <div class="modal-body">                
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>
