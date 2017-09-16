<?php
$loggedinUser = AuthComponent::user();

foreach($org_user_data as $data) {
    $post_id[] = $data['UserOrganization']['id'];
?>
<tr id="row_<?php echo $data['UserOrganization']['id'];?>">
    <td>
        <?php
            $user_image = $data['User']['image'];
            if($user_image==""){
                echo $this->Html->image('user.png',array('class'=>"img-circle", 'width'=>'61','height'=>'61')); 
            }else{
                if(file_exists(WWW_ROOT. PROFILE_IMAGE_DIR  .$user_image)){
                    $user_imagenew = Router::url('/', true) . "app/webroot/" . PROFILE_IMAGE_DIR  .$user_image;
                    echo $this->Html->image($user_imagenew,array('width'=>'61','height'=>'61','id'=>'org_image','class'=>"img-circle"));
                }else {
                    echo $this->Html->image('user.png',array('class'=>'img-circle', 'width'=>'61','height'=>'61')); 
                }
            }
        ?>
    </td>
    <td>
        <h6 style="color:#ffffff; font-size:18px; margin:2px; color:#337ab7">
            <?php
                $name = ucfirst($data['User']['fname']).' '.ucfirst($data['User']['lname']);
                echo '<div style="cursor:pointer" class="usersprofile" data-userorgid="'.$data['UserOrganization']['id'].'">'.$name.'</div>';
            ?>
        </h6>
        <p style="color:#c2c1c1; font-size:14px;"><?php echo $data['User']['email'];?><br>
            Last updated on: <?php 
            //echo $this->App->dateConvertDisplay($data['User']['updated']);
            echo $this->Time->Format($data['User']['updated'], DATEFORMAT);
            //echo $data['User']['updated']; ?><br>
            Created on: <?php echo $this->Time->Format($data['User']['created'], DATEFORMAT); ?>
        </p>
    </td>
    <td class="text-active"><?php echo ($data['UserOrganization']['status'] == 1) ? "Active" : (($data['UserOrganization']['status'] == 0) ? "Inactive": "Evaluation Mode"); ?>
    <td id="roleendorser_<?php echo $data['UserOrganization']['user_id'];?>"><?php echo ($data['UserOrganization']['user_role'] == 3) ? ENDORSER: DESIGNATEDADMIN; ?></td>
    <td>
        <?php
        // echo $orgstatus."---".$admin_id."---".$orguser_id;
        if($orgstatus == 1  && $orguser_id !=$data['User']['id'] ){ ?>
        <div class="ThreeDotsImg pull-right"><a href="javascript:void(0);" rel="<?php echo $data['User']['id']; ?>_one" class="dots"><?php echo $this->Html->image('3dots.png',array('class'=>"img-responsive")); ?></a>
            <div class="arrow_box <?php echo $data['User']['id']; ?>_one">
                <div class="pull-right popupArrow" style=" margin-top:-25px;"><?php echo $this->Html->image('popupArrow.png',array('class'=>"img-responsive")); ?></div>
                <ul>
                        <?php  $changedrole = ($data['UserOrganization']['user_role'] == 3) ? "2": "3"; ?>
                    <li id="changestatus_<?php echo $data["UserOrganization"]["id"];?>">
                            <?php if( $data['UserOrganization']['status'] == 3){?>
                        <a href="javascript:void(0)" onclick="changestatususers(<?php echo $data["UserOrganization"]["id"];?>, 'active')">Remove Evaluation Mode</a>
                            <?php }elseif($data['UserOrganization']['status'] == 1){?>
                        <!--<a onclick="showinactivepopup(<?php //echo $data['UserOrganization']['id'];?>)" href="javascript:void(0)">Inactive</a>-->
                        <a onclick="changestatususers(<?php echo $data['UserOrganization']['id'];?>, 'partially active')" href="javascript:void(0)">Evaluation Mode</a>
                            <?php }?>
                    </li>
                    <?php if(in_array($data['UserOrganization']['status'],array(1,3))){?>
                    <li id="funcchangerole_<?php echo $data['UserOrganization']['user_id'];?>"><a onclick="changeendorserrole(<?php echo $data['UserOrganization']['user_id'];?>, <?php echo $data['UserOrganization']['organization_id'];?>, <?php echo $changedrole;?>)" href="javascript:void(0)" ><?php echo ($data['UserOrganization']['user_role'] == 3) ? Configure::read("Give_Admin_Control"): Configure::read("Revoke_Admin_Control");?></a></li>
                    <?php } ?>
                    <li><a onclick="showdeletepopup(<?php echo $data['UserOrganization']['id']; ?>)" href="javascript:void(0)">Delete</a></li>
                            <?php if(isset($data["UserOrganization"]) && $data["UserOrganization"]["joined"] == 0 && $data["UserOrganization"]['status'] == 1){ ?>
                    <li><a onclick="reinviteweb(<?php echo $data['User']['id']; ?>, '<?php echo $data['User']['email']; ?>', '<?php echo $data['User']['fname']; ?>', <?php echo $orgdata['Organization']['id'];?>, '<?php echo $orgdata['Organization']['name'];?>', '<?php echo $org_image = $orgdata['Organization']['secret_code'];?>')" href="javascript:void(0)">Reinvite</a></li>
                            <?php }?>
                    <li><a onclick="resetpassworduser(<?php echo $data['User']['id']; ?>, '<?php echo $data['User']['fname']; ?>', '<?php echo $data['User']['email']; ?>')" href="javascript:void(0)">Reset Password</a></li>
                    <?php if($loggedinUser["role"] == 1) {?>
                    <li><a href="javascript:void(0)" class="inviteOtherOrg" rel="<?php echo $data['User']['id']; ?>">Invite to join other organization</a></li>
                    <?php } ?>
                </ul>
            </div>
        </div>
        <?php }?>

    </td>
</tr>
    <?php } ?>
