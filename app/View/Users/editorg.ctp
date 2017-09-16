<?php
echo $this->Html->script("bootstrap-colorpicker.min.js");
echo $this->Html->script("bootstrap-colorpicker-plus.js");
echo $this->Html->css("bootstrap-colorpicker.min.css");
echo $this->Html->css("bootstrap-colorpicker-plus.css");
$resultantdepartment = '';
if (!empty($errormsg)) {
    $resultantdepartment["department"] = array("value" => array(), "hiddenid" => array(), "activestatus" => array(), "savestatus" => array());
    $resultantdepartment["jobtitle"] = array("value" => array(), "hiddenid" => array(), "activestatus" => array(), "savestatus" => array());
    $resultantdepartment["entity"] = array("value" => array(), "hiddenid" => array(), "activestatus" => array(), "savestatus" => array());
    $resultantdepartment["corevalues"] = array("value" => array(), "hiddenid" => array(), "colorcode" => array(), "activestatus" => array(), "savestatus" => array());
    $array = array("department", "jobtitle", "entity");
    foreach ($array as $orgmenus) {
        $valuearray = array();
        $activestatusarray = array();
        $savestatusarray = array();
        $hiddenidarray = array();
        $org = $orgmenus . 'active';
        if (($org != "")) {
            if (!empty($this->request->data['Org'][$orgmenus . 'active'])) {
                $counterdepartments = count($this->request->data['Org'][$orgmenus . 'active']);
                for ($i = 0; $i < $counterdepartments; $i++) {
                    $change = ($orgmenus == "department") ? "departments" : "jobtitles";
                    if ($orgmenus == "entity") {
                        $value = $this->request->data['Org']["entitytextbox"][$i];
                    } else {
                        $value = $this->request->data['Org'][$change][$i];
                    }
                    $hiddenid = isset($this->request->data['Org'][$orgmenus . 'hiddenid'][$i]) ? $this->request->data['Org'][$orgmenus . 'hiddenid'][$i] : "";
                    $activestatus = $this->request->data['Org'][$orgmenus . 'active'][$i];
                    $savestatus = $this->request->data['Org'][$orgmenus . 'save'][$i];
                    if ($value == "other") {
                        $value = $this->request->data['Org'][$orgmenus . '_other_department'][$i];
                    }
                    array_push($valuearray, $value);
                    array_push($hiddenidarray, $hiddenid);
                    array_push($activestatusarray, $activestatus);
                    array_push($savestatusarray, $savestatus);
                }
                $resultantdepartment[$orgmenus]["value"] = $valuearray;
                $resultantdepartment[$orgmenus]["hiddenid"] = $hiddenidarray;
                $resultantdepartment[$orgmenus]["activestatus"] = $activestatusarray;
                $resultantdepartment[$orgmenus]["savestatus"] = $savestatusarray;
            }
        }
    }
    //=====================for corevalues
    $countercorevalues = count($this->request->data['Org']['cvactive']);
    $valuearray = array();
    $activestatusarray = array();
    $savestatusarray = array();
    $savecolorcodearray = array();
    $hiddenidarray = array();
    for ($i = 0; $i < $countercorevalues; $i++) {
        $value = $this->request->data['Org']["corevalues"][$i];
        $activestatus = $this->request->data['Org']['cvactive'][$i];
        $savestatus = $this->request->data['Org']['save'][$i];
        $hiddenid = isset($this->request->data['Org']['hiddenid'][$i]) ? $this->request->data['Org']['hiddenid'][$i] : "";
        if ($value == "other") {
            $value = $this->request->data['Org']['other_department'][$i];
        }
        $colorcodes = $this->request->data['Org']['cp'][$i];
        array_push($valuearray, $value);
        array_push($activestatusarray, $activestatus);
        array_push($savestatusarray, $savestatus);
        array_push($savecolorcodearray, $colorcodes);
        array_push($hiddenidarray, $hiddenid);
    }
    $resultantdepartment["corevalues"]["value"] = $valuearray;
    $resultantdepartment["corevalues"]["activestatus"] = $activestatusarray;
    $resultantdepartment["corevalues"]["savestatus"] = $savestatusarray;
    $resultantdepartment["corevalues"]["colorcode"] = $savecolorcodearray;
    $resultantdepartment["corevalues"]["hiddenid"] = $hiddenidarray;
    //pr($resultantdepartment);
}
?>
<?php ?>
<script>
    //===============variable to be used in editing
    var js_arraycv = <?php echo json_encode($corevalues); ?>;
    var js_arraydept = <?php echo json_encode($departments); ?>;
    var js_arrayjt = <?php echo json_encode($jobtitles); ?>;

    $(document).ready(function () {
        var corevalues = '<?php echo json_encode($corevalues); ?>';
        $('#addcorevalues').bind("click", function () {
            if ($('#corevaluetable').is(":visible")) {
                var cvalues = JSON.parse(corevalues);
                //var rowlength = $("#addcoretable tr").length;
                var rowlength = parseInt($("#addcoretable tr:last").attr("id").split("_")[1]) + 1;
                $('<tr id="addcorerow_' + rowlength + '">').appendTo("#addcoretable");
                $('<td><div class="checkbox"><input id="cvid_' + rowlength + '" type="checkbox" class="OrgCvactivestatus css-checkbox" value="active" checked="checked" name="data[Org][cvactivestatus][]"><label for="cvid_' + rowlength + '" class="css-label"></label></div><input type="hidden" id="cvactive" name="data[Org][cvactive][]" value="active"><input id="saveunsave" type="hidden" value="unsave" name="data[Org][save][]"></td>').appendTo("#addcorerow_" + rowlength);
                $('<td id="corevaluesdropdown"><div class="input select"><div class = "select-style"><select id="OrgCorevalues" class="form-control" name="data[Org][corevalues][]"><option value="">Select Core Value</option></select></div></div><div style="display:none" id="othercv"><div class="input text"><input type="text" id="OrgOtherDepartment" class="form-control" name="data[Org][other_department][]"></div></div></td>').appendTo("#addcorerow_" + rowlength);
                $('<td><input type="hidden" name="data[Org][cp][]" value="#FFFFFF"><input style="color:#FFFFFF; background-color:#001e52" type="text" value="Hello" readonly="readonly" id="colorpick" class="color-picker-binded"></td>').appendTo("#addcorerow_" + rowlength);
                $('<td id="savecv"><?php echo $this->Html->image("EditRow.png", array("id" => "editcorevalues")); ?> <?php echo $this->Html->image("SaveRow.png", array("class" => "savecorevalues")); ?></td>').appendTo("#addcorerow_" + rowlength);
                $('<td id="deletecv"><img alt="" id="deletecorevalues" src="' + siteurl + 'img/DeleteRow.png"></td>').appendTo("#addcorerow_" + rowlength);
                $('</tr>').appendTo("#addcorerow_" + rowlength);
                for (tmpvalues in cvalues) {
                    $('<option value="' + cvalues[tmpvalues] + '">' + cvalues[tmpvalues] + '</option>').appendTo("#addcorerow_" + rowlength + " #OrgCorevalues");
                }
                var demo1 = $('#addcorerow_' + rowlength + ' #colorpick');
                demo1.colorpickerplus();
                demo1.on('changeColor', function (e, color) {
                    if (color == null)
                        $(this).val('transparent').css('background-color', '#FFFFFF');//tranparent
                    else
                        $(this).val("Hello").css('color', color);
                    $($(this).parent().find("input[type ='hidden']")[0]).val(color);
                    $(this).css('background-color', "#001e52");
                    //$(this).val(color).css('background-color', color);
                });
            }
            $("#corevaluetable").show();
        });

        //department
        $(document).on('click', '#adddepartment', function () {

            //var rowlength = $("#adddepartmentable tr:visible").length;
            if (typeof ($("#adddepartmenttable tr:last").attr("id")) == "undefined") {
                $("#adddepartmentdiv").show();
                var rowlength = 1;
            } else {
                var rowlength = parseInt($("#adddepartmenttable tr:last").attr("id").split("_")[1]) + 1;
            }
            console.log(rowlength);
            //if (rowlength <= 0 || $('#adddepartmentdiv').is(":visible")) {
            var departmentvalues = '<?php echo json_encode($departments); ?>';
            var dvalues = JSON.parse(departmentvalues);
            //var rowlength = $("#adddepartmenttable tr").length;
            $('<tr id="adddepartment_' + rowlength + '">').appendTo("#adddepartmenttable");
            $('<td><div class="checkbox"><input type="checkbox" id="departmentid_' + rowlength + '" class="departmentcheckbox css-checkbox" checked="" name="departmentcheckbox"><label for="departmentid_' + rowlength + '" class="css-label"></label></div><input type="hidden" value="active" name="data[Org][departmentactive][]" class="departmentactive"><input type="hidden" value="unsave" name="data[Org][departmentsave][]" class="departmentsaveunsave"></td>').appendTo("#adddepartment_" + rowlength);
            $('<td class="departmentselectrow"><div class = "select-style"><select name="data[Org][departments][]" class="departmentvalues form-control valid"><option value="">Select Department</option></select></div><input type="hidden" name="data[Org][department_other_department][]" class="form-control other_department"></td>').appendTo("#adddepartment_" + rowlength);
            $('<td><?php echo $this->Html->image("EditRow.png", array("class" => "editdepartment")); ?> / <?php echo $this->Html->image("SaveRow.png", array("class" => "savedepartment")); ?></td>').appendTo("#adddepartment_" + rowlength);
            $('<td><?php echo $this->Html->image("DeleteRow.png", array("class" => "deletedepartment")); ?></td>').appendTo("#adddepartment_" + rowlength);
            $('</tr>').appendTo("#adddepartment_" + rowlength);
            for (tmpvalues in dvalues) {
                $('<option value="' + dvalues[tmpvalues] + '">' + dvalues[tmpvalues] + '</option>').appendTo("#adddepartment_" + rowlength + " .departmentvalues");
            }
//            }
//            $("#adddepartmentdiv").show();
        });

        //Job title
        $(document).on('click', '#addjobtitle', function () {
            //var rowlength = $("#addjobtitletable tr:visible").length;
            if (typeof ($("#addjobtitletable tr:last").attr("id")) == "undefined") {
                $("#addjobtitlediv").show();
                var rowlength = 1;
            } else {
                var rowlength = parseInt($("#addjobtitletable tr:last").attr("id").split("_")[1]) + 1;
            }

            //if (rowlength <= 0 || $('#addjobtitlediv').is(":visible")) {
            var jobtitlevalues = '<?php echo json_encode($jobtitles); ?>';
            var jvalues = JSON.parse(jobtitlevalues);
            var rowlength = $("#addjobtitletable tr").length;
            $('<tr id="addjobtitle_' + rowlength + '">').appendTo("#addjobtitletable");
            $('<td><div class="checkbox"><input type="checkbox" id="jbactive_' + rowlength + '" class="jobtitlecheckbox css-checkbox" checked="" name="jobtitlecheckbox"><label class="css-label" for="jbactive_' + rowlength + '"></label></div><input type="hidden" value="active" name="data[Org][jobtitleactive][]" class="jobtitleactive"><input type="hidden" value="unsave" name="data[Org][jobtitlesave][]" class="jobtitlesaveunsave"></td>').appendTo("#addjobtitle_" + rowlength);
            $('<td class="jobtitleselectrow"><div class = "select-style"><select name="data[Org][jobtitles][]" class="jobtitlevalues form-control valid"><option value="">Select Job Title</option></select></div><input type="hidden" name="data[Org][jobtitle_other_department][]" class="form-control other_department"></td>').appendTo("#addjobtitle_" + rowlength);
            $('<td><?php echo $this->Html->image("EditRow.png", array("class" => "editjobtitle")); ?> / <?php echo $this->Html->image("SaveRow.png", array("class" => "savejobtitle")); ?></td>').appendTo("#addjobtitle_" + rowlength);
            $('<td><?php echo $this->Html->image("DeleteRow.png", array("class" => "deletejobtitle")); ?></td>').appendTo("#addjobtitle_" + rowlength);
            $('</tr>').appendTo("#addjobtitle_" + rowlength);
            for (tmpvalues in jvalues) {
                $('<option value="' + jvalues[tmpvalues] + '">' + jvalues[tmpvalues] + '</option>').appendTo("#addjobtitle_" + rowlength + " .jobtitlevalues");
            }
//            }
//            $("#addjobtitlediv").show();
        });

        //adding new entity dynamically
        $(document).on('click', '#addentity', function () {
            //var rowlength = $("#addentitytable tr:visible").length;
            if (typeof ($("#addentitytable tr:last").attr("id")) == "undefined") {
                $("#addentitydiv").show();
                var rowlength = 1;
            } else {
                var rowlength = parseInt($("#addentitytable tr:last").attr("id").split("_")[1]) + 1;
            }

            //if (rowlength <= 0 || $('#addentitydiv').is(":visible")) {
            var rowlength = $("#addentitytable tr").length;
            $('<tr id="addentity_' + rowlength + '">').appendTo('#addentitytable');
            $('<td><div class="checkbox"><input type="checkbox" id="entityid' + rowlength + '" class="entitycheckbox css-checkbox" checked="" name="entirycheckbox"><label class="css-label" for="entityid' + rowlength + '"></label></div><input type="hidden" class="entityactive" name="data[Org][entityactive][]" value="active"><input type="hidden" class="entitysaveunsave" name="data[Org][entitysave][]" value="unsave"></td>').appendTo('#addentity_' + rowlength + '');
            $('<td class="entityvaluestextbox"><input placeholder = "Add Sub Organization" type="textbox" name="data[Org][entitytextbox][]" class="entitytextbox"></td>').appendTo('#addentity_' + rowlength + '');
            $('<td><?php echo $this->Html->image("EditRow.png", array("class" => "editentity")); ?> / <?php echo $this->Html->image("SaveRow.png", array("class" => "saveentity")); ?></td>').appendTo('#addentity_' + rowlength + '');
            $('<td><?php echo $this->Html->image("DeleteRow.png", array("class" => "deleteentity")); ?></td>').appendTo('#addentity_' + rowlength + '');
            $('</tr>').appendTo('#addentity_' + rowlength + '');
//            }
//            $("#addentitydiv").show();
        });
    });
</script>
<?php echo $this->Html->script('customeditorg'); ?>
<?php
$data = array(
    "textcenter" => "Edit Organization",
    "righttabs" => "1"
);
$headerpage = ($authUser["role"] == 1) ? 'header' : 'headerorg';
if ($authUser["role"] == 2) {
    $data['auth_users'] = $authUser;
}
echo $this->Element($headerpage, array('data' => $data));
?>

<section> <?php echo $this->Form->create('Orgphoto', array('url' => array('controller' => 'users', 'action' => 'setorgimage'))); ?>
    <input type="hidden" name="orgid"  value="<?php echo $org_id; ?>" />
    <div class="row createEditOrg">
        <div class="col-lg-12 ">
            <?php
            if ($org_image == "") {
                echo $this->Html->image('comp_pic.png', array('width' => '214', 'id' => 'org_image'));
            } else {
                $org_imagenew = Router::url('/', true) . "app/webroot/" . ORG_IMAGE_DIR . $this->request->data['Org']['image'];
                echo $this->Html->image($org_imagenew, array('width' => '175', 'id' => 'org_image'));
            }
            ?>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button"  id="org_upload_photo" class="btn btn-blue">Upload Picture</button>
            &nbsp;&nbsp;
            <button type="button" id="org_remove_photo" class="btn btn-blue">Remove Picture</button>
        </div>
    </div>
    <?php
    echo $this->Form->input('Userphoto', array(
        'type' => 'file',
        'id' => 'photo',
        'label' => false,
        'class' => 'btn_uplaod_file hidden'
    ));
    echo $this->Form->end();
    ?>
</section>

<!--Used to display validation errors-->
<?php if ($errormsg != '') { ?>
    <div class="error-createclient"><?php echo $errormsg; ?></div>
<?php } ?>
<!--ends here--> 
<?php echo $this->Form->create('Org'); ?> <?php echo $this->Form->input('image', array('class' => 'form-control', 'label' => false, 'type' => 'hidden', 'id' => 'org_image_name', 'value' => $org_image)); ?>
<section>
    <div class="row">
        <section>
            <div class="row">
                <div class="col-md-6">
                    <div class="col-md-3">
                        <div class="labelCus">ID</div>
                    </div>
                    <div class="col-md-9">
                        <input type="text" id="inputEmail" value="<?php echo $org_id; ?>" class="form-control" readonly="readonly" >
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="col-md-3">
                        <div class="labelCus">Short Name</div>
                    </div>
                    <div class="col-md-9"> <?php echo $this->Form->input('short_name', array('placeholder' => 'Short Name', 'class' => 'form-control', 'label' => false)); ?> </div>
                </div>
            </div>
        </section>
        <section>
            <div class="row">
                <div class="col-md-6"> 
                    <!--<div class="col-md-1"></div> -->
                    <div class="col-md-3">
                        <div class="labelCus require">Name</div>
                    </div>
                    <div class="col-md-9"> <?php echo $this->Form->input('name', array('placeholder' => 'Name', 'class' => 'form-control', 'label' => false)); ?> </div>
                </div>
                <div class="col-md-6"> 
                    <!--<div class="col-md-1"></div> -->
                    <div class="col-md-3">
                        <div class="labelCus">Industry</div>
                    </div>
                    <div class="col-md-9">
                        <div class="select-style"> <?php echo $this->Form->input('industry', array('empty' => 'select industry', 'label' => false, 'options' => $industry, 'selected' => $industry_value, 'class' => 'form-control')); ?> </div>
                    </div>
                </div>
        </section>
        <section>
            <div class="row">
                <div class="col-md-6">
                    <div class="col-md-3">
                        <div class="labelCus" >Active</div>
                    </div>
                    <div class="col-md-9"> <span class="radio">
                            <?php
                            $options = array(
                                '1' => 'Yes',
                                '0' => 'No'
                            );
                            echo $this->Form->input('status', array('type' => 'radio',
                                'separator' => '</div><div>',
                                'before' => '<div class="col-md-3">',
                                'after' => '</div>',
                                'options' => $options,
                                'label' => true,
                                'legend' => false,
                                'value' => $this->request->data['Org']['status']
                                    )
                            );
                            ?>
                        </span> </div>
                </div>
                <div class="col-md-6">
                    <div class="col-md-3">
                        <div class="labelCus" >Allow Attachments</div>
                    </div>
                    <div class="col-md-9"> <span class="radio">
                            <?php
                            $options = array(
                                '1' => 'Yes',
                                '0' => 'No'
                            );
                            echo $this->Form->input('allow_attachment', array('type' => 'radio',
                                'separator' => '</div><div>',
                                'before' => '<div class="col-md-3">',
                                'after' => '</div>',
                                'options' => $options,
                                'label' => true,
                                'legend' => false,
                                'value' => $this->request->data['Org']['allow_attachment']
                                    )
                            );
                            ?>
                        </span> </div>
                </div>
                
            </div>
        </section>
        <section>
            <div class="row">
                <div class="col-md-6"> 
                    <!--<div class="col-md-1"></div> -->
                    <div class="col-md-3">
                        <div class="labelCus">Allow Comments</div>
                    </div>
                    <div class="col-md-9"> 
                        <span class="radio">
                            <?php
                            $options = array(
                                '1' => 'Yes',
                                '0' => 'No'
                            );
                            echo $this->Form->input('allow_comments', array('type' => 'radio',
                                'separator' => '</div><div>',
                                'before' => '<div class="col-md-3">',
                                'after' => '</div>',
                                'options' => $options,
                                'label' => true,
                                'legend' => false,
                                'value' => $this->request->data['Org']['allow_comments'],
                                'class' => 'allowIt',
                                )
                            );
                            ?>
                        </span> 
                    </div>
                </div>
                <div class="col-md-6  commentcompulsory"> 
                    <!--<div class="col-md-1"></div> -->
                    <div class="col-md-3">
                        <div class="labelCus" >Comment Optional</div>
                    </div>
                    <div class="col-md-9"> 
                        <span class="radio">
                            <?php
                            $options = array(
                                '1' => 'Yes',
                                '0' => 'No'
                            );
                            echo $this->Form->input('optional_comments', array('type' => 'radio',
                                'separator' => '</div><div>',
                                'before' => '<div class="col-md-3">',
                                'after' => '</div>',
                                'options' => $options,
                                'label' => true,
                                'legend' => false,
                                'value' => $this->request->data['Org']['optional_comments']
                                    )
                            );
                            ?>
                        </span> 
                    </div>
                </div>
            </div>
        </section>
        <section>
            <div class="row">
                <div class="col-md-6">
                    <div class="col-md-3">
                        <div class="labelCus">Country</div>
                    </div>
                    <div class="col-md-9 ">
                        <div class="select-style"> <?php echo $this->Form->input('country', array('empty' => 'Select Country', 'selected' => $country_id, 'class' => 'form-control country', 'label' => false, 'options' => $listCountries, 'data-url' => Router::url(array('controller' => 'ajax', 'action' => 'states')))); ?> </div>
                    </div>
                </div>
                <div class="col-md-6"> 
                    <!--<div class="col-md-1"></div> -->
                    <div class="col-md-3">
                        <div class="labelCus">State</div>
                    </div>
                    <div class="col-md-9">
                        <div>
                            <?php
                            $stylestatelist = "style=display:block;";
                            $stylestatetextlist = "style=display:none;";
                            if (empty($listState)) {
                                $stylestatelist = "style=display:none;";
                                $stylestatetextlist = "style=display:block;";
                            }
                            ?>
                            <div class="select-style" id="selectstate" <?php echo $stylestatelist; ?> > <?php echo $this->Form->input('state', array('empty' => 'Select State', 'default' => $this->request->data['Org']['state'], 'label' => false, 'options' => $listState, 'class' => 'form-control states')); ?> </div>
                            <div id="selectstatetext" <?php echo $stylestatetextlist; ?> >
                                <?php echo $this->Form->input('state_name', array('type' => 'text', 'class' => 'textbox', 'id' => 'state_name', 'label' => false)); ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!--ends here-->
        <section>
            <div class="row">
                <div class="col-md-6">
                    <div class="col-md-3">
                        <div class="labelCus">City</div>
                    </div>
                    <div class="col-md-9"> <?php echo $this->Form->input('city', array('placeholder' => 'City', 'class' => 'form-control', 'label' => false, 'type' => 'text')); ?> </div>
                </div>
                <div class="col-md-6"> 
                    <!--<div class="col-md-1"></div> -->
                    <div class="col-md-3">
                        <div class="labelCus">Street</div>
                    </div>
                    <div class="col-md-9"> <?php echo $this->Form->input('street', array('placeholder' => 'Street', 'class' => 'form-control', 'label' => false, 'type' => 'text')); ?> </div>
                </div>
            </div>
        </section>
        <section>
            <div class="row">
                <div class="col-md-6">
                    <div class="col-md-3">
                        <div class="labelCus">Zip code</div>
                    </div>
                    <div class="col-md-9"> <?php echo $this->Form->input('zip', array('placeholder' => 'Zip', 'class' => 'form-control txt-decimal', 'label' => false, 'type' => 'text')); ?> </div>
                </div>
            </div>
        </section>
        <!--ends here-->
        <section>
            <div class="row">
                <div class="col-md-6">
                    <div class="col-md-3">
                        <div class="labelCus">About</div>
                    </div>
                    <div class="col-md-9"> <?php echo $this->Form->input('about', array('placeholder' => 'About', 'class' => 'form-control', 'label' => false, 'type' => 'textarea')); ?> </div>
                </div>
            </div>
        </section>
    </div>
</section>
<section class="AddCoreValue">
    <div class="row AddCoreValue">
        <div class="col-md-12">
            <div class="pull-left">
                <h4 class="require">ENTER CORE VALUES / SET GOALS</h4>
            </div>
            <div class="pull-right"><span>Add a New Core Value</span> <a href="javascript:void(0);"><?php echo $this->Html->image('addCoreValue.png', array('id' => 'addcorevalues')); ?></a></div>
        </div>
    </div>
    <?php
    $counter_core_values = (isset($existing_corevalues)) ? count($existing_corevalues) : "";
    $display = "display:none";
    if ($counter_core_values) {
        $display = "display:block";
    }
    ?>
    <div class="row CreateEditOrg" id="corevaluetable" style="<?php echo $display; ?>" >
        <table id="addcoretable" class="table table-hover" >
            <tr>
                <th width="15%">Active</th>
                <th width="30%">Core value</th>
                <th width="15%">Color Code</th>
                <th width="20%">Edit / Save</th>
                <th width="20%">Delete</th>
            </tr>
            <?php
            if (!empty($resultantdepartment["corevalues"])) {
                for ($i = 0; $i < count($resultantdepartment["corevalues"]["value"]); $i++) {
                    $dept = $this->request->data['Org']['corevalues'];
                    ?>
                    <tr id="addcorerow_<?php echo $i + 1; ?>">
                        <td width="15%"><?php //echo $this->Form->checkbox('cvactivestatus', array('hiddenField' => false, ($existing_corevalues[$i]['org_core_values']['status']) ? "checked" : "" , "name"=> "data[Org][cvactivestatus][]"));    ?>
                            <div class="checkbox">
                                <input type="checkbox" id="cvid_<?php echo $i + 1; ?>" class="OrgCvactivestatus css-checkbox" value="1" checked="checked" name="data[Org][cvactivestatus][]">
                                <label for="cvid_<?php echo $i + 1; ?>" class="css-label"></label>
                            </div>
                            <?php
                            if (!empty($resultantdepartment["corevalues"]["hiddenid"][$i])) {
                                echo '<input type="hidden" value="' . $resultantdepartment["corevalues"]["hiddenid"][$i] . '" name="data[Org][hiddenid][]" class="departmetdbid">';
                            }
                            ?>
                            <input type="hidden" id="cvactive" name="data[Org][cvactive][]" value="<?php echo $resultantdepartment["corevalues"]["activestatus"][$i]; ?>">
                            <input type="hidden" id="saveunsave" class="cvsaveunsave" name="data[Org][save][]" value="<?php echo $resultantdepartment["corevalues"]["savestatus"][$i]; ?>">
                        </td>
                        <td width="30%" id="corevaluesdropdown"><?php $style = ($resultantdepartment["corevalues"]["savestatus"][$i] == "save") ? "none" : "block"; ?>
                            <div class = "select-style">
                                <select class="form-control" id="OrgCorevalues" name="data[Org][corevalues][]" id="" style="display: <?php echo $style; ?>">
                                    <option value="">Select Corevalues</option>
                                    <?php
                                    foreach ($corevalues as $corevalue) {
                                        $selected = ($corevalue == $dept[$i]) ? "selected=selected" : "";
                                        echo '<option value="' . $corevalue . '" ' . $selected . '>' . $corevalue . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                            <input id="OrgOtherDepartment" type="hidden" name="data[Org][other_department][]" value="<?php echo $resultantdepartment["corevalues"]["value"][$i]; ?>" class="form-control other_department">
                            <?php
                            if ($resultantdepartment["corevalues"]["savestatus"][$i] == "save") {
                                echo "<p id = 'corevalue'>" . $resultantdepartment["corevalues"]["value"][$i] . "</p>";
                            }
                            ?>
                        </td>
                        <td width="15%"><?php
                            $colorvalue = $resultantdepartment["corevalues"]["colorcode"][$i];
                            ?>
                            <input type="hidden" name="data[Org][cp][]" value="<?php echo $colorvalue; ?>"><input type="text" style="color: <?php echo $colorvalue; ?>; background-color: #001e52"  value="Hello" id="colorpick"/>
                        </td>
                        <td width="20%" id="savecv"><?php echo $this->Html->image('EditRow.png', array('id' => 'editcorevalues')); ?> / <?php echo $this->Html->image('SaveRow.png', array('class' => 'savecorevalues')); ?></td>
                        <td width="20%" id="deletecv"><?php echo $this->Html->image('DeleteRow.png', array('id' => 'deletecorevalues')); ?></td>
                    </tr>
                    <?php
                }
            } else {
                ?>
                <?php if (isset($existing_corevalues)) { ?>
                    <?php
                    for ($i = 0; $i < $counter_core_values; $i++) {
                        $others_department = "";
                        ?>
                        <tr id="addcorerow_<?php echo $i + 1; ?>">
                            <td width="15%"><?php
                                //echo $this->Form->checkbox('cvactivestatus', array('hiddenField' => false, ($existing_corevalues[$i]['org_core_values']['status']) ? "checked" : "" , "name"=> "data[Org][cvactivestatus][]")); 
                                $checked = $existing_corevalues[$i]['org_core_values']['status'] ? "checked" : "";
                                ?>
                                <div class="checkbox">
                                    <input type="checkbox" id="cvid_<?php echo $i + 1; ?>" class="OrgCvactivestatus css-checkbox" value="1" <?php echo $checked; ?> name="data[Org][cvactivestatus][]">
                                    <label for="cvid_<?php echo $i + 1; ?>" class="css-label"></label>
                                </div>
                                <input type="hidden" id="cvactive" name="data[Org][cvactive][]" value="<?php echo ($existing_corevalues[$i]['org_core_values']['status']) ? 'active' : 'inactive'; ?>">
                                <input type="hidden" id="saveunsave" name="data[Org][save][]" value="save">
                                <input type="hidden" id="hiddenid" name="data[Org][hiddenid][]" value="<?php echo $existing_corevalues[$i]['org_core_values']['id']; ?>">
                            </td>
                            <?php
                            if (!in_array($existing_corevalues[$i]['org_core_values']['name'], $corevalues)) {
                                $others_department = $existing_corevalues[$i]['org_core_values']['name'];
                            }
                            ?>
                            <td width="30%" id="corevaluesdropdown"><div class = "select-style"> <?php echo $this->Form->input('corevalues', array('empty' => 'Select Core Value', 'label' => false, 'options' => $corevalues, 'selected' => $existing_corevalues[$i]['org_core_values']['name'], 'class' => 'form-control', 'style' => 'display:none', 'name' => 'data[Org][corevalues][]')); ?> </div>
                                <div id="othercv" style="display:none"><?php echo $this->Form->input('other_department', array('class' => 'form-control', 'id' => 'OrgOtherDepartment', 'label' => false, 'name' => 'data[Org][other_department][]', 'value' => $others_department)); ?></div>
                                <p id='corevalue'><?php echo $existing_corevalues[$i]['org_core_values']['name']; ?></p>
                            </td>
                            <td width="15%"><input type="hidden" name="data[Org][cp][]" value="<?php echo $existing_corevalues[$i]['org_core_values']['color_code']; ?>">
                                <input style="background-color: #001e52 ;color: <?php echo $existing_corevalues[$i]['org_core_values']['color_code']; ?>" id="colorpick" readonly="readonly" type="text" value="Hello"/>
                            </td>
                            <td width="20%" id="savecv"><?php echo $this->Html->image('EditRow.png', array('id' => 'editcorevalues')); ?> <?php echo $this->Html->image('SaveRow.png', array('class' => 'savecorevalues')); ?></td>
                            <td width="20%" id="deletecv"><?php echo $this->Html->image('DeleteRow.png', array('id' => 'deletecorevalues')); ?></td>
                        </tr>
                        <?php
                    }
                }
            }
            ?>
        </table>
    </div>
</section>

<!-- Edit Entity-->
<section class="AddCoreValue">
    <div class="row AddCoreValue">
        <div class="col-md-12">
            <div class="pull-left">
                <h4>ENTER SUB ORGANIZATION</h4>
            </div>
            <div class="pull-right"><span>Add a New Sub Organization</span> <a href="javascript:void(0);"><?php echo $this->Html->image('addCoreValue.png', array('id' => 'addentity')); ?></a></div>
        </div>
    </div>
    <?php
    $counter_entities = (isset($existing_entities)) ? count($existing_entities) : "";
    $display = "display:none";
    if ($counter_entities || !empty($errormsg)) {
        $display = "display:block";
        if (!empty($errormsg)) {
            if (empty($resultantdepartment["entity"]["value"])) {
                $display = "display:none";
            }
        }
    }
    ?>
    <div class="row CreateEditOrg" id="addentitydiv" style="<?php echo $display; ?>">
        <table class="table table-hover" id="addentitytable">
            <tr>
                <th width="15%">Active</th>
                <th width="45%">Sub Organization</th>
                <th width="20%">Edit / Save</th>
                <th width="20%">Delete</th>
            </tr>
            <?php
            if (!empty($resultantdepartment["entity"])) {
                for ($i = 0; $i < count($resultantdepartment["entity"]["value"]); $i++) {
                    ?>
                    <tr id="addentity_<?php echo $i + 1; ?>">
                        <td width="15%"><input type="checkbox" name="entirycheckbox" checked class="entitycheckbox" />
                            <input type="hidden" class="entityactive" name="data[Org][entityactive][]" value="<?php echo $resultantdepartment["entity"]["activestatus"][$i]; ?>">
                            <input type="hidden" class="entitysaveunsave" name="data[Org][entitysave][]" value="<?php echo $resultantdepartment["entity"]["savestatus"][$i]; ?>">
                        </td>
                        <?php $style = ($resultantdepartment["entity"]["savestatus"][$i] == "save") ? "none" : "block"; ?>
                        <td width="45%" class="entityvaluestextbox"><input placeholder="Add Sub Organization" value="<?php echo $resultantdepartment["entity"]["value"][$i]; ?>" class="entitytextbox" type="textbox" name="data[Org][entitytextbox][]" class="entitytextbox" style="display:<?php echo $style; ?>" />
                            <?php
                            if ($resultantdepartment["entity"]["savestatus"][$i] == "save") {
                                echo "<p class = 'corevalue'>" . $resultantdepartment["entity"]["value"][$i] . "</p>";
                            }
                            ?></td>
                        <td width="20%"><?php echo $this->Html->image("EditRow.png", array("class" => "editentity")); ?> / <?php echo $this->Html->image("SaveRow.png", array("class" => "saveentity")); ?></td>
                        <td width="20%"><?php echo $this->Html->image("DeleteRow.png", array("class" => "deleteentity")); ?></td>
                    </tr>
                    <?php
                }
            } else {
                $i = 1;
                if (isset($existing_entities)) {
                    foreach ($existing_entities as $id => $value) {
                        $others_department = "";
                        ?>
                        <tr id="addentity_<?php echo $i; ?>">
                            <td width="15%"><div class="checkbox">
                                    <input type="checkbox" id="entityid_<?php echo $i; ?>" name="entitycheckbox" <?php echo ($existing_entitiesstatus[$id]) ? "checked" : " "; ?> class="entitycheckbox css-checkbox" />
                                    <label for="entityid_<?php echo $i; ?>" class="css-label"></label>
                                </div>
                                <input type="hidden" class="entityid" name="data[Org][entityhiddenid][]" value="<?php echo $id; ?>">
                                <input type="hidden" class="entityactive" name="data[Org][entityactive][]" value="<?php echo ($existing_entitiesstatus[$id]) ? 'active' : 'inactive'; ?>">
                                <input type="hidden" class="entitysaveunsave" name="data[Org][entitysave][]" value="save">
                            </td>
                            <td width="45%" class="entityvaluestextbox"><p class = corevalue><?php echo $value; ?></p>
                                <input class="entitytextbox" type="hidden" value="<?php echo $value; ?>" name="data[Org][entitytextbox][]" class="entitytextbox" />
                            </td>
                            <td width="20%"><?php echo $this->Html->image("EditRow.png", array("class" => "editentity")); ?> / <?php echo $this->Html->image("SaveRow.png", array("class" => "saveentity")); ?></td>
                            <td width="20%"><?php echo $this->Html->image("DeleteRow.png", array("class" => "deleteentity")); ?></td>
                        </tr>
                        <?php
                        $i++;
                    }
                }
            }
            ?>
        </table>
    </div>
</section>
<!--departments-->
<section class="AddCoreValue">
    <div class="row AddCoreValue">
        <div class="col-md-12">
            <div class="pull-left">
                <h4>ENTER DEPARTMENTS</h4>
            </div>
            <div class="pull-right"><span>Add a New Department</span> <a href="javascript:void(0);"><?php echo $this->Html->image('addCoreValue.png', array('id' => 'adddepartment')); ?></a></div>
        </div>
    </div>
    <?php
    $counter_departments = (isset($existing_departments)) ? count($existing_departments) : "";
    $display = "display:none";
    $counter_departments;
    if ($counter_departments || !empty($errormsg)) {
        $display = "display:block";
        if (!empty($errormsg)) {
            if (empty($resultantdepartment["department"]["value"])) {
                $display = "display:none";
            }
        }
    }
    ?>
    <div class="row CreateEditOrg" id="adddepartmentdiv" style="<?php echo $display; ?>">
        <table class="table table-hover" id="adddepartmenttable">
            <tr>
                <th width="15%">Active</th>
                <th width="45%">Department Name</th>
                <th width="20%">Edit / Save</th>
                <th width="20%">Delete</th>
            </tr>
            <?php
            if (!empty($resultantdepartment["department"])) {
                for ($i = 0; $i < count($resultantdepartment["department"]["value"]); $i++) {
                    $dept = $this->request->data['Org']['departments'];
                    ?>
                    <tr id="adddepartment_<?php echo $i + 1; ?>">
                        <td width="15%"><div class="checkbox">
                                <input type="checkbox" id="departmentid_<?php echo $i + 1; ?>" name="departmentcheckbox" checked class="entitycheckbox css-checkbox" />
                                <label for="departmentid_<?php echo $i + 1; ?>" class="css-label"></label>
                            </div>
                            <?php
                            if (!empty($resultantdepartment["department"]["hiddenid"][$i])) {
                                echo '<input type="hidden" value="' . $resultantdepartment["department"]["hiddenid"][$i] . '" name="data[Org][departmenthiddenid][]" class="departmentdbid">';
                            }
                            ?>
                            <input type="hidden" class="departmentactive" name="data[Org][departmentactive][]" value="<?php echo $resultantdepartment["department"]["activestatus"][$i]; ?>">
                            <input type="hidden" class="departmentsaveunsave" name="data[Org][departmentsave][]" value="<?php echo $resultantdepartment["department"]["savestatus"][$i]; ?>">
                        </td>
                        <td width="45%" class="departmentselectrow">
                            <div class = "select-style">
                                <?php $style = ($resultantdepartment["department"]["savestatus"][$i] == "save") ? "none" : "block"; ?>
                                <select class="departmentvalues form-control" name="data[Org][departments][]" id="" style="display: <?php echo $style; ?>">
                                    <option value="">Select Department</option>
                                    <?php
                                    foreach ($departments as $department) {
                                        $selected = ($department == $dept[$i]) ? "selected=selected" : "";
                                        echo '<option value="' . $department . '" ' . $selected . '>' . $department . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                            <input type="hidden" name="data[Org][department_other_department][]" value="<?php echo $resultantdepartment["department"]["value"][$i]; ?>" class="form-control other_department">
                            <?php
                            if ($resultantdepartment["department"]["savestatus"][$i] == "save") {
                                echo "<p class = 'departmentv'>" . $resultantdepartment["department"]["value"][$i] . "</p>";
                            }
                            ?>
                        </td>
                        <td width="20%"><?php echo $this->Html->image("EditRow.png", array("class" => "editdepartment")); ?> / <?php echo $this->Html->image("SaveRow.png", array("class" => "savedepartment")); ?></td>
                        <td width="20%"><?php echo $this->Html->image("DeleteRow.png", array("class" => "deletedepartment")); ?></td>
                    </tr>
                <?php }
                ?>
                <?php
            } else {
                $i = 1;
                if (isset($existing_departments)) {
                    foreach ($existing_departments as $id => $value) {
                        $others_department = "";
                        ?>
                        <tr id="adddepartment_<?php echo $i ?>">
                            <td width="15%"><div class="checkbox">
                                    <input type="checkbox" id="departmentid_<?php echo $i; ?>" name="departmentcheckbox" <?php echo ($existing_departmentsstatus[$id]) ? "checked" : ""; ?> class="departmentcheckbox css-checkbox" />
                                    <label for="departmentid_<?php echo $i; ?>" class="css-label"></label>
                                </div>
                                <input type="hidden" class="departmentdbid" name="data[Org][departmenthiddenid][]" value="<?php echo $id; ?>">
                                <input type="hidden" class="departmentactive" name="data[Org][departmentactive][]" value="<?php echo ($existing_departmentsstatus[$id]) ? "active" : "inactive"; ?>">
                                <input type="hidden" class="departmentsaveunsave" name="data[Org][departmentsave][]" value="save"></td>
                            <td width="45%" class="departmentselectrow"><p class='departmentv'><?php echo $value; ?></p>
                                <div class = "select-style">
                                    <select class="departmentvalues form-control" name="data[Org][departments][]" id="" style="display: none">
                                        <option value="<?php echo $value; ?>"><?php echo $value; ?></option>
                                        <?php
                                        foreach ($departments as $department) {
                                            echo '<option value="' . $department . '">' . $department . '</option>';
                                        }
                                        ?>
                                    </select>
                                </div>
                                <?php
                                if (!in_array($value, $departments)) {
                                    $others_department = $value;
                                }
                                ?>
                                <input type="hidden" name="data[Org][department_other_department][]" class="form-control other_department" value="<?php echo $others_department; ?>"></td>
                            <td width="20%"><?php echo $this->Html->image("EditRow.png", array("class" => "editdepartment")); ?> / <?php echo $this->Html->image("SaveRow.png", array("class" => "savedepartment")); ?></td>
                            <td width="20%"><?php echo $this->Html->image("DeleteRow.png", array("class" => "deletedepartment")); ?></td>
                        </tr>
                        <?php
                        $i++;
                    }
                }
            }
            ?>
        </table>
    </div>
</section>
<!--Job Title-->
<section class="AddCoreValue">
    <div class="row AddCoreValue">
        <div class="col-md-12">
            <div class="pull-left">
                <h4>ENTER JOB TITLES</h4>
            </div>
            <div class="pull-right"><span>Add a New Job Title</span> <a href="javascript:void(0);"><?php echo $this->Html->image('addCoreValue.png', array('id' => 'addjobtitle')); ?></a></div>
        </div>
    </div>
    <?php
    $counter_jobtitles = (isset($existing_jobtitles)) ? count($existing_jobtitles) : "";
    $display = "display:none";
    if ($counter_jobtitles || !empty($errormsg)) {
        $display = "display:block";
        if (!empty($errormsg)) {
            if (empty($resultantdepartment["jobtitle"]["value"])) {
                $display = "display:none";
            }
        }
    }
    ?>
    <div class="row CreateEditOrg" id="addjobtitlediv" style="<?php echo $display; ?>">
        <table class="table table-hover" id="addjobtitletable">
            <tr>
                <th width="15%">Active</th>
                <th width="45%">Job Title</th>
                <th width="20%">Edit / Save</th>
                <th width="20%">Delete</th>
            </tr>
            <?php
            if (!empty($resultantdepartment["jobtitle"])) {
                for ($i = 0; $i < count($resultantdepartment["jobtitle"]["value"]); $i++) {
                    $dept = $this->request->data['Org']['jobtitles'];
                    ?>
                    <tr id="addjobtitle_<?php echo $i + 1; ?>">
                        <td width="15%"><div class="checkbox">
                                <input type="checkbox" id="jbactive_<?php echo $i + 1; ?>" name="jobtitlecheckbox" class="jobtitlecheckbox css-checkbox" />
                                <label for="jbactive_<?php echo $i + 1; ?>" class="css-label"></label>
                            </div>
                            <input type="checkbox" name="jobtitlecheckbox" checked class="jobtitlecheckbox" />
                            <?php
                            if (!empty($resultantdepartment["jobtitle"]["hiddenid"][$i])) {
                                echo '<input type="hidden" value="' . $resultantdepartment["jobtitle"]["hiddenid"][$i] . '" name="data[Org][jobtitlehiddenid][]" class="jobtitledbid">';
                            }
                            ?>
                            <input type="hidden" class="jobtitleactive" name="data[Org][jobtitleactive][]" value="<?php echo $resultantdepartment["jobtitle"]["activestatus"][$i]; ?>">
                            <input type="hidden" class="jobtitlesaveunsave" name="data[Org][jobtitlesave][]" value="<?php echo $resultantdepartment["jobtitle"]["savestatus"][$i]; ?>">
                        </td>
                        <td width="45%" class="jobtitleselectrow"><?php $style = ($resultantdepartment["jobtitle"]["savestatus"][$i] == "save") ? "none" : "block"; ?>
                            <div class = "select-style">
                                <select class="jobtitlevalues form-control" name="data[Org][jobtitles][]" id="" style="display: <?php echo $style; ?>">
                                    <option value="">Select Job Title</option>
                                    <?php
                                    foreach ($jobtitles as $jobtitle) {
                                        $selected = ($jobtitle == $dept[$i]) ? "selected=selected" : "";
                                        echo '<option value="' . $jobtitle . '" ' . $selected . '>' . $jobtitle . '</option>';
                                    }
                                    ?>
                                </select>
                            </div>
                            <input type="hidden" name="data[Org][jobtitle_other_department][]" value="<?php echo $resultantdepartment["jobtitle"]["value"][$i]; ?>" class="form-control other_jobtitle">
                            <?php
                            if ($resultantdepartment["jobtitle"]["savestatus"][$i] == "save") {
                                echo "<p class = 'jobtitlev'>" . $resultantdepartment["jobtitle"]["value"][$i] . "</p>";
                            }
                            ?>
                        </td>
                        <td width="20%"><?php echo $this->Html->image("EditRow.png", array("class" => "editjobtitle")); ?> / <?php echo $this->Html->image("SaveRow.png", array("class" => "savejobtitle")); ?></td>
                        <td width="20%"><?php echo $this->Html->image("DeleteRow.png", array("class" => "deletejobtitle")); ?></td>
                    </tr>
                    <?php
                }
            } else {
                $i = 1;
                if (isset($existing_jobtitles)) {
                    foreach ($existing_jobtitles as $id => $value) {
                        $others_department = "";
                        ?>
                        <tr id="addjobtitle_<?php echo $i ?>">
                            <td width="15%"><div class="checkbox">
                                    <input type="checkbox" id="jbactive_<?php echo $i; ?>" name="jobtitlecheckbox" <?php echo ($existing_jobtitlesstatus[$id]) ? "checked" : ""; ?> class="jobtitlecheckbox css-checkbox" />
                                    <label for="jbactive_<?php echo $i; ?>" class="css-label"></label>
                                </div>
                                <input type="hidden" class="jobtitlebid" name="data[Org][jobtitlehiddenid][]" value="<?php echo $id; ?>">
                                <input type="hidden" class="jobtitleactive" name="data[Org][jobtitleactive][]" value="<?php echo ($existing_jobtitlesstatus[$id]) ? 'active' : 'inactive'; ?>">
                                <input type="hidden" class="jobtitlesaveunsave" name="data[Org][jobtitlesave][]" value="save"></td>
                            <td width="45%" class="jobtitleselectrow"><p class='jobtitlev'><?php echo $value; ?></p>
                                <div class = "select-style">
                                    <select class="jobtitlevalues form-control" name="data[Org][jobtitles][]" id="" style="display: none">
                                        <option value="<?php echo $value; ?>"><?php echo $value; ?></option>
                                        <?php
                                        foreach ($jobtitles as $jobtitle) {
                                            echo '<option value="' . $jobtitle . '">' . $jobtitle . '</option>';
                                        }
                                        ?>
                                    </select>
                                </div>
                                <?php
                                if (!in_array($value, $jobtitles)) {
                                    $others_department = $value;
                                }
                                ?>
                                <input type="hidden" name="data[Org][jobtitle_other_department][]" class="form-control other_department" value="<?php echo $others_department; ?>"></td>
                            <td width="20%"><?php echo $this->Html->image("EditRow.png", array("class" => "editjobtitle")); ?> / <?php echo $this->Html->image("SaveRow.png", array("class" => "savejobtitle")); ?></td>
                            <td width="20%"><?php echo $this->Html->image("DeleteRow.png", array("class" => "deletejobtitle")); ?></td>
                        </tr>
                        <?php
                        $i++;
                    }
                }
            }
            ?>
        </table>
    </div>
</section>
<section class="container-fluid footer-bg">
    <div class="container">
        <div class="row">
            <div class="pull-right">
                <button type="button" class="btn btn-default" id="orgformcancel">Cancel</button>
                <button type="button" class="btn btn-default" id="editorgformsubmit">Save</button>
            </div>
        </div>
    </div>
</section>
<?php echo $this->Form->end(); ?> 
<script>
    $(document).ready(function(){
        var allow_comment = '<?php echo $this->request->data['Org']['allow_comments'];?>';
        console.log(allow_comment);
        if (allow_comment == 1) {
            $('.commentcompulsory').show();
        } else {
            $('.commentcompulsory').hide();
        }
    });
    
    
     $('.allowIt').on('click', function () {
         
        if ($('input[class=allowIt]:checked').val() == 1) {
            $('.commentcompulsory').fadeIn('medium');
        } else {
            $('.commentcompulsory').fadeOut('medium');
        }
    });
    
    
    //=============to implement colorpicker for the very first time
    var rowlength = $("#addcoretable tr").length;
    for (var i = 1; i < rowlength; i++) {
        var demo1 = $('#addcorerow_' + i + ' #colorpick');
        demo1.colorpickerplus();
        demo1.on('changeColor', function (e, color) {
            if (color == null)
                $(this).val('transparent').css('background-color', '#FFFFFF');//tranparent
            else
                $(this).val("Hello").css('color', color);
            $($(this).parent().find("input[type ='hidden']")[0]).val(color);
            $(this).css('background-color', "#001e52");
        });
    }

</script>