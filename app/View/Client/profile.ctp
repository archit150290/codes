
<div class="col-md-12" style="margin-bottom:20px;">
    <div class="col-md-2 text-center">
        <?php
        $nodresegivenvalue = $statesdata["giving"];
        $ndorsereceivedvalue = $statesdata["getting"] * 10;
        $tolalvalue = ($nodresegivenvalue + $ndorsereceivedvalue) % 100;
        $badgecount = floor(($nodresegivenvalue + $ndorsereceivedvalue) / 100);

        if ($profiledata["image"] == "") {
            echo $this->Html->image('p_pic.png', array('width' => '115', 'height' => '115', 'id' => 'client_image', 'class' => 'img-circle'));
        } else {
            $user_image = explode("/", $profiledata["image"]);

            if (file_exists(WWW_ROOT . PROFILE_IMAGE_DIR . $user_image[count($user_image) - 1])) {
                $client_image = $user_image[count($user_image) - 1];
                $user_image = Router::url('/', true) . PROFILE_IMAGE_DIR . $client_image;
            } else {
                $user_image = 'p_pic.png';
            }

            echo $this->Html->image($user_image, array(
                'bigimg' => $user_image, 'index' => 0,
                'width' => '115', 'height' => '115', 'id' => 'client_image', 'class' => 'img-circle attached-item1'));
        }
        ?>
        <!--<img src="<?php echo $imageval; ?>" bigimg ="<?php echo $bigimg; ?>"  index="<?php echo $index; ?>" type="image" width="100" class="attached-item  detail_img_<?php echo $index; ?>"  alt=""/>-->
    </div>
    <div class="col-md-3">
        <h2 class="u-name"><?php echo ucfirst(trim($profiledata["fname"] . " " . $profiledata["lname"])); ?>
            <?php if ($logindata["id"] == $profiledata["id"]) { ?>
                <a href="<?php echo Router::url('/', true); ?>client/editprofile"><img src="<?php echo Router::url('/', true); ?>img/edit.png" alt=""  /></a>
            <?php } ?>
        </h2>
        <?php //if(isset($profiledata["current_org"]->job_title) && $profiledata["current_org"]->job_title!=""){  ?>

<!-- <h3 class="u-profile">(<?php echo $profiledata["current_org"]->job_title; ?>)</h3>-->
        <?php //}   ?>
    </div>
    <div class="clearfix"></div>
</div>
<div class="col-md-12 profile">
    <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#personal-data" aria-expanded="false">Personal</a></li>
        <li class=""><a data-toggle="tab" href="#nDorsements-data" aria-expanded="false">nDorsements</a></li>
    </ul>
    <div class="tab-content">
        <div id="personal-data" class="tab-pane active in fade">
            <div class="col-md-12">
                <div class="user-profile ">
                    <div class="col-md-12">
                        <?php if ($successmsg != "") { ?>
                            <div id="flashmessage" class="msg text-center col-md-12" style="margin:10px 0"><?php echo $successmsg; ?></div>
                        <?php } ?>
                    </div>
                    <div class="user-profile">
                        <table class="table table-hover table-striped">
                            <tbody>
                                <tr>
                                    <td>Name : </td>
                                    <td ><?php echo ucfirst(trim($profiledata["fname"] . " " . $profiledata["lname"])); ?></td>
                                </tr>
                                <?php if (isset($profiledata["dob"]) && $profiledata["dob"] != "") { ?>
                                    <tr>
                                        <td>D. O.B :</td>
                                        <td ><?php echo $profiledata["dob"]; ?></td>
                                    </tr>
                                <?php }
                                ?>
                                <?php if (isset($profiledata["hobbies"]) && $profiledata["hobbies"] != "") { ?>
                                    <tr>
                                        <td>Hobbies :</td>
                                        <td ><?php echo str_replace(",", " , ", $profiledata["hobbies"]); ?></td>
                                    </tr>
                                <?php }
                                ?>
                                <?php if (isset($profiledata["skills"]) && $profiledata["skills"] != "") { ?>
                                    <tr>
                                        <td>Skills :</td>
                                        <td ><?php echo str_replace(",", " , ", $profiledata["skills"]); ?></td>
                                    </tr>
                                <?php }
                                ?>
                                <?php if ($profiledata["street"] != "" || $profiledata["city"] != "" || $profiledata["country"] != "" || $profiledata["zip"] != "") { ?>
                                    <tr>
                                        <td>Address :</td>
                                        <td ><?php
                                $address = "";
                                if ($profiledata["street"] != "") {
                                    $address .= $profiledata["street"];
                                }

                                if ($profiledata["city"] != "") {
                                    if ($address != "") {
                                        $address .=" , ";
                                    }
                                    $address .= $profiledata["city"];
                                }
                                if ($profiledata["country"] != "") {
                                    if ($address != "") {
                                        $address .=" , ";
                                    }
                                    $address .= $profiledata["country"];
                                }

                                if ($profiledata["state"] != "") {
                                    if ($address != "") {
                                        $address .=" , ";
                                    }
                                    $address .= $profiledata["state"];
                                }
                                if ($profiledata["zip"] != "") {
                                    if ($address != "") {
                                        $address .=" , ";
                                    }
                                    $address .= $profiledata["zip"];
                                }
                                echo $address;
                                    ?></td>
                                    </tr>
                                <?php }
                                ?>
                                <?php if (isset($profiledata["mobile"]) && $profiledata["mobile"] != "") { ?>
                                    <tr>
                                        <td>Phone :</td>
                                        <td ><?php echo $profiledata["mobile"]; ?></td>
                                    </tr>
                                <?php }
                                ?>
                            </tbody>
                        </table>
                        <?php if ($logindata["id"] == $profiledata["id"]) { ?>
                            <a href="<?php echo Router::url('/', true); ?>client/resetpassword" class="btn btn-orange">Change Password</a>
                        <?php } ?>
                    </div>
                </div>
            </div>
        </div>
        <div id="nDorsements-data" class="tab-pane fade">
            <div class="col-md-12">
                <div class="nDorsement-profile">
                    <div class="my-badges">
                        <div class="col-md-3">
                            <h2>My Badges:</h2>
                        </div>
                        <?php
                        //pr($badgesData);
                        if (!empty($badgesData)) {
                            ?>
                            <div class="col-md-9" id="endorse-badges">
                                <?php
                                $inc = 1;

                                foreach ($badgesData as $badgesval) {
                                    switch ($badgesval["trophy_id"]) {
                                        case 1:
                                            $tooltipText = 'nDorse Badge: For being a valued team member';
                                            break;
                                        case 2:
                                            $tooltipText = 'nDorse Badge: Top nDorser of the Month Badge';
                                            break;
                                        case 3:
                                            $tooltipText = 'nDorse Badge: Top nDorsed of the Month Badge';
                                            break;
                                        default:
                                            $tooltipText = 'Default Badges';
                                            break;
                                    }
                                    ?>
                                    <div class="badge-count text-center">
                                        <!--<a href="javascript:void(0);">-->
                                        <img  alt="" id="client_image" data-placement="top" data-toggle="popover" data-trigger="hover" data-content="<?php echo $tooltipText; ?>" src="<?php echo $badgesval["image"]; ?>" width="60" >
                                        <!--</a>-->
                                        <br />
                                        <?php
                                        //echo $badgesval["count"];
                                        if ($inc == 1) {
                                            echo $badgecount;
                                        } else {
                                            echo $badgesval["count"];
                                        }
                                        ?> </div>
                                        <?php
                                    $inc++;
                                }
                                ?>
                                <!--                            <div class="badge-count text-center"> 
                                                                <a href="javascript:void(0);" data-placement="top"  data-toggle="popover" data-trigger="focus" data-content="nDorse Badge: For being a valued team member and a positive influence at work!" >
                                                                    <img alt="" id="client_image" src="<?php echo Router::url('/', true) . "uploads/trophies/medal-green.png"; ?>" width="60">
                                                                </a>
                                                                <br>
                                                                1 
                                                            </div>
                                                            <div class="badge-count text-center">
                                                                <a href="javascript:void(0);" data-placement="top" data-toggle="popover" data-trigger="focus" data-content="nDorse Badge: Top nDorser of the Month Badge" >
                                                                    <img alt="" id="client_image" src="<?php echo Router::url('/', true) . "uploads/trophies/medal-orange.png"; ?>" width="60">
                                                                </a>
                                                                <br>
                                                                1 
                                                            </div>
                                                            <div class="badge-count text-center">
                                                                <a href="javascript:void(0);" data-placement="top" data-toggle="popover" data-trigger="focus" data-content="nDorse Badge: Top nDorsed of the Month Badge" >
                                                                    <img alt="" id="client_image" src="<?php echo Router::url('/', true) . "uploads/trophies/medal-yellow.png"; ?>" width="60">
                                                                </a>
                                                                <br>
                                                                0 
                                                            </div>-->
                            </div>
                        <?php } ?>
                    </div>
                    <div class="clearfix"></div>
                </div>

                <div class="core-values-div">
                    <?php
                    if (!empty($coreValuesData)) {
                        ?>
                        <table class="table table-hover table-core-value">
                            <tbody>
                                <tr>
                                    <th colspan="2"><strong>Core Values Collected: </strong></th>
                                </tr>
                                <?php foreach ($coreValuesData as $coreval) { ?>
                                    <tr>
                                        <td><?php echo $coreval["name"]; ?></td>
                                        <td class="text-right"><?php echo $coreval["value"]; ?> </td>
                                    </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    <?php } ?>
                </div>



            </div>
        </div>
        <div class="clearfix"></div>
    </div>
</div>
<script>
    $(document).ready(function () {
        $('[data-toggle="popover"]').popover();
        $('.attached-item1').on('click', function () {
            var src = $(this).attr('bigimg');
            var img = '<img src="' + src + '" class="img-responsive no-hand"/>';
            var html = '';
            html += img;
            $('#myPhotoModal').modal();
            $('#myPhotoModal').on('shown.bs.modal', function () {
                $('#myPhotoModal .modal-body').html(html);
                //new code
                //$('a.controls').trigger('click');
            })
            $('#myPhotoModal').on('hidden.bs.modal', function () {
                $('#myPhotoModal .modal-body').html('');

            });
        });
    });

</script>
<div class="modal fade" id="myPhotoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header" style="padding-bottom: 0px;">
                <button data-dismiss="modal" class="btn btn-default pull-right close" type="button">×</button>
                <!--                <h3 style="margin-bottom: -20px;">Gallery</h3>-->
            </div>
            <div class="modal-body">                
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div>