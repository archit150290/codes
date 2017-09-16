<?php

$data = array(
        "textcenter" => "Announcements",
        "righttabs" => "1"
    );
    echo $this->Element('headerorg', array('data' => $data));
?>
<div class="settings"> <?php echo $this->Session->flash('auth'); ?>
    <p><?php echo $this->Session->Flash(); ?></p>
    <div class="col-md-12">
        <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#announcements">Announcements</a></li>
        </ul>
        <div class="tab-content">
            <div id="announcements" class="tab-pane fade in active">
                <?php 
                if(!empty($userorgdata)){
                    echo $this->Form->create("MailingOrg", array("enctype" => "multipart/form-data"));
                        //pr($orgdata);
                        $activities = array();
                        foreach($userorgdata as $dataorg){
                            if($dataorg["Organization"]["name"] == ""){
                                continue;
                            }
                            $activities[] = array("name" => trim($dataorg["Organization"]["name"]), "value" => $dataorg["Organization"]["id"]);
                        }
                ?>
                <div class="form-group col-md-12 tnc">
                    <div class="col-md-12">
                        <div class="pull-left">
                            <h5 class="notif">Select Organization from the List:</h5>
                        </div>
                        <div class="pull-right select-all">
                            <?php if(!empty($activities)){
                                        echo "<div class='checkbox'><input class='css-checkbox' id='mailingselectall' type='checkbox' name='selectallmailingorg' id='selectallmailingorg'><label class='css-label pull-right' for='mailingselectall' style='color:#fff;'>Select All</label></div>";
                                    }
                            ?>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="mail-to-org-checkbox">
                        <div class="col-md-12" style="margin-top:20px;">
                            <?php 
                                 $count = 1;
                                $html = "";
                                for($i = 0; $i < count($activities); $i++){
                                    $html .=  '<div class="col-md-3 checkbox"><input type="checkbox" name="data[User][Organizations][]" value="'.$activities[$i]["value"].'" id="'.$activities[$i]["value"].'" class="mailingcbclass css-checkbox"><label class="css-label" for="'.$activities[$i]["value"].'"><span class="ellipsis iffyTip" >'.$activities[$i]["name"].'</span></label></div>';
                                    $count++;
                                }
                                echo $html;
                            ?>

                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div class="clearfix"></div>
                    <h5 class="notif">Message:</h5>
                    <?php 
                        echo $this->Tinymce->input('User.mailingbox', array(
                            'label' => false,
                            ),array(
                                    'language'=>'en'
                            ),
                            'full'
                        );
                    ?>
                    <div class="clearfix"></div>
                    <br>
                    <div>
                        <?php echo $this->Form->input('attachment',array('type' => 'file','label'=>false, 'class' => 'hidden', 'accept'=>"image/*,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.pdf"));?>
                        <button class="btn btn-default" id="addattachemnt_announcement" type="button">Add Attachment</button>
                        <br />
                        <br />
                        <span class="fileSupported">Supported files - .ppt/.pptx/.doc/.docx/.xls/.xls/.pdf/all image files</span>
                        <br/>
                        <span class="fileSupported">Maximum file size - 10 mb</span>
                        <br><br>
                        <input type="hidden" name="formname" value="mailingorganizationsorgadmin"/>
                        <button id="mailingorgadmin_submit_setting" class="btn btn-blue save" type="button">Send</button>
                    </div>
                </div>
                <?php echo $this->Form->end(); 
                }else{?>
                <h3 class="nDorse-support text-center">You are not authorized to access this feature. Please contact 
                    <a href="mailto:support@ndorse.net" target="_top">nDorse support.</a>
                </h3>
                <?php }
                ?>

            </div>
            <div class="clearfix"></div>
        </div>
    </div>