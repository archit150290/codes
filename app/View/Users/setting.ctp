<?php
$data = array(
    "textcenter" => "Global Settings",
    "righttabs" => "1"
);
echo $this->Element('header', array('data' => $data));
?>
<!--Conatiner start here-->

<div class="settings"> <?php echo $this->Session->flash('auth'); ?>
    <p id="flashmessage"><?php echo $this->Session->Flash(); ?></p>
    <?php
    if ($formname != "") {
        echo $formname;
        //$home = $home = '<li class="active"><a data-toggle="tab" href="#home">General Settings</a></li>';
    }
    ?>
    <div class="col-md-12">
        <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#home">General Settings</a></li>
            <li><a data-toggle="tab" href="#menu1">End User License Agreement</a></li>
            <li><a data-toggle="tab" href="#menu2">Announcements</a></li>
            <li><a data-toggle="tab" href="#menu3">FAQ</a></li>
            <li><a data-toggle="tab" href="#menu4">Announcement Feature For Admins</a></li>
        </ul>
        <div class="tab-content">
            <div id="home" class="tab-pane fade in active">
                <div class="col-md-12"> <?php echo $this->Form->create("general"); ?>
                    <form class="range-controler">
                        <div class="general-settings">
                            <h5 class="notif">Maximum Limit Of One To One nDorsements For Month:</h5>
                            <?php echo $this->Form->input('value', array('class' => 'form-control', 'label' => false, 'type' => 'number', 'min' => 1, 'default' => ($allvalues["limit"]) ? $allvalues["limit"] : 1)); ?> </div>
                        <div class="form-group col-md-6" style="padding-left:0">
                            <h5 class="notif">Reminder Notifications:</h5>
                            <span class="radio">
                                <?php
                                $value = ($allvalues["notification"] != "") ? (int) $allvalues["notification"] : 1;
                                $options = array(
                                    '1' => 'On',
                                    '0' => 'Off'
                                );
                                echo $this->Form->input('notification', array('type' => 'radio',
                                    'separator' => '</div><div>',
                                    'before' => '<div class="col-md-3">',
                                    'after' => '</div>',
                                    'options' => $options,
                                    'label' => true,
                                    'legend' => false,
                                    'value' => $value
                                        )
                                );
                                ?>
                            </span> </div>
                        <div class="clearfix"></div>
                        <div class="">
                            <input type="hidden" name="formname" value="generalsettings"/>
                            <button id="submit_general_setting" class="btn btn-blue save" type="button">Save</button>
                        </div>
                    </form>
                    <?php echo $this->Form->end(); ?> </div>
            </div>
            <div id="menu1" class="tab-pane fade">
                <div class="form-group col-md-12 tnc"> <?php echo $this->Form->create("termsandconditions"); ?>
                    <h3>End User License Agreement:</h3>
                    <?php //echo $this->Form->input('tandc', array('placeholder' => 'Terms and Conditions', 'class' => 'form-control', 'label' => false,'type'=>'textarea', 'rows' => 10, "cols" => 150, 'value' => $allvalues["tandc"]));  ?>
                    <?php
                    echo $this->Tinymce->input('User.tandc', array(
                        'label' => false, 'value' => $allvalues["tandc"]
                            ), array(
                        'language' => 'en'
                            ), 'full'
                    );
                    ?>
                    <div class="clearfix"></div>
                    <br/>
                    <div class="col-md-3 checkbox">
                        <input type="checkbox" name="data[User][notify]" value="sendNotification" id="notifyTnc" class="mailingcbclass css-checkbox">
                        <label class="css-label" for="notifyTnc">
                            <span class="ellipsis iffyTip" >Send notification</span>
                        </label>
                    </div>
                    <div class="clearfix"></div>
                    <br>
                    <div>
                        <input type="hidden" name="formname" value="tandc"/>
                        <button id="tandc_submit_setting" class="btn btn-blue save" type="button">Save</button>
                    </div>
                </div>
                <?php echo $this->Form->end(); ?> </div>
            <div id="menu2" class="tab-pane fade">
                <div class="form-group col-md-12 tnc"> 
                    <!--                    <h3>Mail to Organizations Users:-</h3>-->
                    <?php
                    echo $this->Form->create("MailingOrg", array("enctype" => "multipart/form-data"));
                    //pr($orgdata);
                    $activities = array();
                    foreach ($orgdata as $dataorg) {
                        if ($dataorg["Organization"]["name"] == "") {
                            continue;
                        }
                        $activities[] = array("name" => trim($dataorg["Organization"]["name"]), "value" => $dataorg["Organization"]["id"]);
                    }

                    //=checkbox
                    ?>
                    <div class="col-md-12">
                        <div class="search-icn" style="margin-top:10px;">
                            <input type="text" name="searchannouncements" id="searchannouncements" placeholder="Search Organization..." class="form-control">
                        </div>
                        <div class="pull-left">
                            <h5 class="notif">Select organizations from the list:</h5>
                        </div>
                        <div class="pull-right select-all">
                            <?php
                            if (!empty($activities)) {
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
                            for ($i = 0; $i < count($activities); $i++) {
                                $html .= '<div searchorgannouncement = "' . $activities[$i]["name"] . '" class="col-md-3 checkbox"><input type="checkbox" name="data[User][Organizations][]" value="' . $activities[$i]["value"] . '" id="' . $activities[$i]["value"] . '" class="mailingcbclass css-checkbox"><label class="css-label" for="' . $activities[$i]["value"] . '"><span class="ellipsis iffyTip" >' . $activities[$i]["name"] . '</span></label></div>';
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
                            ), array(
                        'language' => 'en'
                            ), 'full'
                    );
                    ?>
                    <div class="clearfix"></div>
                    <?php echo $this->Form->input('attachment', array('type' => 'file', 'label' => false, 'class' => 'hidden', 'accept' => "image/*,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.pdf")); ?>
                    <br>
<!--                    <button class="btn btn-default" id="addattachemnt_announcement" type="button">Add Attachment</button>
                    <br />
                    <br />
                    <span class="fileSupported">Supported files - .ppt/.pptx/.doc/.docx/.xls/.xls/.pdf/all image files</span>
                    <br/>
                    <span class="fileSupported">Maximum file size - 10 mb</span>-->
                    <br />
                    <br />

                    <input type="hidden" name="formname" value="mailingorganizations"/>
                    <button id="mailingorg_submit_setting" class="btn btn-blue save" type="button">Send</button>


                </div>
                <?php echo $this->Form->end(); ?> </div>
            <div id="menu3" class="tab-pane fade">
                <div class="panel-group">
                    <div class="col-md-6">
                        <div class="panel panel-default qa">
                            <div class="panel-heading">Question & Answers</div>
                            <?php echo $this->Form->Create("faq", array("onsubmit" => "return false")); ?>
                            <div class="panel-body">
                                <h5>Question: </h5>
                                <?php echo $this->Form->input("Question", array("type" => "textarea", "placeholder" => "Question", "label" => false)); ?>
                                <h5>Answer: </h5>
                                <?php
                                echo $this->Tinymce->input('faq.Answer', array(
                                    'label' => false,
                                        ), array(
                                    'language' => 'en'
                                        ), 'full'
                                );
                                ?>
                                <div class="clearfix"></div>



                                <?php //echo $this->Form->input("Answer", array("type" => "textarea", "placeholder" => "Answer", "label" => false)); ?>
                                <div class="qa-btn faqsubmit"><a href="javascript:void(0)" data-formid="0" class="btn btn-blue">Submit</a></div>
                            </div>
                            <?php echo $this->Form->end(); ?> </div>
                    </div>
                    <div class="col-md-6">
                        <div class="panel panel-default">
                            <div class="panel-heading">FAQ</div>
                            <div class="panel-body"><?php echo $this->Element("faqelement"); ?> </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Announcement feature for admin -->

            <div id="menu4" class="tab-pane fade">
                <div class="form-group col-md-12 tnc">
                    <h3></h3>
                    <div class="search-icn">
                        <input type="text" name="searchannouncementsorg" id="searchannouncementsorg" placeholder="Search Organization..." class="form-control">
                    </div>
                    <?php
                    echo $this->Form->create("AnnouncementsAdmin");
//pr($orgdata);
                    $activities = array();
                    foreach ($orgdata as $dataorg) {
                        if ($dataorg["Organization"]["name"] == "") {
                            continue;
                        }
                        $activities[] = array("name" => trim($dataorg["Organization"]["name"]), "value" => $dataorg["Organization"]["id"], "announcement_status" => $dataorg["Organization"]["announcement_status"]);
                    }

//=checkbox
                    ?>
                    <div class="col-md-12">
                        <div class="pull-left">
                            <h5 class="notif">Select organizations from the list:</h5>
                        </div>
                        <div class="pull-right select-all">
                            <?php
                            if (!empty($activities)) {
                                echo "<div class='checkbox'><input class='css-checkbox' id='announcementselectall' checked type='checkbox' name='selectallannouncement'><label class='css-label pull-right' for='announcementselectall' style='color:#fff;'>Select All</label></div>";
                            }
                            ?>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="announcementstatus-cb">
                        <div class="col-md-12" style="margin-top:20px;">
                            <?php
                            $count = 1;
                            $html = "";
                            for ($i = 0; $i < count($activities); $i++) {
                                $checkingstatus = ($activities[$i]["announcement_status"] == 1) ? "checked" : "";
                                $html .= '<div searchorg = "' . $activities[$i]["name"] . '" class="col-md-3 checkbox"><input ' . $checkingstatus . ' type="checkbox" name="data[User][Organizations][]" value="' . $activities[$i]["value"] . '" id="' . $activities[$i]["value"] . '-id" class="announcementscbclass css-checkbox"><label class="css-label" for="' . $activities[$i]["value"] . '-id"><span class="ellipsis iffyTip" style="margin-top:0" >' . $activities[$i]["name"] . '</span></label></div>';
                                $count++;
                            }
                            echo $html;
                            ?>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                    <div>
                        <input type="hidden" name="formname" value="announcementsorg"/>
                        <button id="" class="btn btn-blue save" type="save">Save</button>
                    </div>
                </div>
                <?php echo $this->Form->end(); ?> </div>
            <div class="clearfix"></div>
            <!--<section>
                    <div class="row bor">
                      <div class="col-md-3"></div>
                      <div class="col-md-6"> </div>
                      <div class="col-md-3"></div>
                    </div>
                  </section> --> 
        </div>
    </div>
    <script>
        $(document).ready(function () {
            $("#reset_setting").click(function () {
                location.href = '<?php echo $prev_page; ?>';
            });
            /*var formsubmitted = window.location.hash.substr(1);
             $('.nav-tabs a[href="#' + formsubmitted + '"]').tab('show');
             $('html, body').animate({
             'scrollTop': $("p#flashmessage").position().top
             });*/

        });

        $(document).on('mouseenter', ".iffyTip", function () {
            var $this = $(this);
            if (this.offsetWidth < this.scrollWidth && !$this.attr('title')) {
                $this.tooltip({
                    title: $this.text(),
                    placement: "bottom"
                });
                $this.tooltip('show');
            }
        });
    </script> 
</div>