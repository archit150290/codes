<?php

    echo $this->Html->script("highcharts");
    echo $this->Html->script("modules/exporting");
    echo $this->Html->script("modules/no-data-to-display");
    $data = array(
        "textcenter" => "Organization Info",
        "righttabs" => "3",
        "orgid" => $organization_id
    );
    $headerpage = ($authUser["role"]==1) ? 'header' : 'headerorg';
    if($authUser["role"]== 2){
            $data['auth_users'] = $authUser;
    }
    echo $this->Element($headerpage, array('data' => $data));
    $orgdetails = array(
        "id"        => $organization_id,
        "image"     => $companydetail["image"],
        "name"      => $companydetail["name"],
        "sname"     => $companydetail["shortname"],
        "street"    => $companydetail["street"],
        "city"      => $companydetail["city"],
        "state"     => $companydetail["state"],
        "zip"       => $companydetail["zip"],
        "country"   => $companydetail["country"],
    );  
    $orgname = $companydetail['name'];
    $orgid = $organization_id;
    ?>

<div class="row row-padding"> <?php echo $this->Element("orgdetails", array('orgdetails' => $orgdetails, 'page' => 'other'));?>
    <input type="hidden" value="<?php echo $organization_id ;?>" id="randcorgid">
    <div class="col-md-7"> <?php echo $this->Html->link("All nDorsements", array('controller'=>'organizations','action'=>'allendorsements',$orgid), array('class' => 'btn btn-success')); ?>
        <div class="row date-range" style="margin-top:85px;">
            <div class="col-md-3" >
                <h4 class="date-range">Select Date Range</h4>
            </div>
      <?php echo $this->Form->Create("daterangerandc");?>
            <div class="col-md-3">
                <div class="form-group">
                    <input id="startdaterandc" readonly="readonly" name="startdaterandc" type='text'value="<?php echo $this->Time->Format($datesarray["startdate"], DATEFORMAT)?>" class="form-control datepickerrandc" placeholder="Start Date"/>
                </div>
            </div>
            <div class="col-md-3">
                <div class="form-group">
                    <input id="enddaterandc" readonly="readonly" name="enddaterandc" type='text' value="<?php echo $this->Time->Format($datesarray["enddate"], DATEFORMAT)?>" class="form-control datepickerrandc" placeholder="End Date"/>
                </div>
            </div>
            <div class="col-md-3">
                <button type="submit" class="btn btn-xs btn-info datesubmitter">Apply</button>
                <button id="resetdates" title="Click to Reset Date"  class="btn btn-info btn-xs resetendorsementsfilters" type="button">Reset Date</button>
        <?php echo $this->Form->End();?> </div>
        </div>
    </div>
</div>
<div style="display:none"><img name="img_val" id="img_val"  ></div>
<section>
    <div class="row">
        <div class="col-md-6 charts-height"> 

            <!-- /.container-fluid --> 
            <?php echo $this->Element("leaderboarddata");?> 
        </div>
        <div class="col-md-6 charts-height">
            <div class="row">
                <div class="" style="position:absolute; right:60px; z-index:10;">
                    <div class="btn-controll">
              <?php
                echo $this->Html->image('fullview.png',array('class'=>"img-responsive full-view", "onclick" => "reportsandchartszoom(".$organization_id.", 'history_by_day')"));
            ?>
                    </div>
                </div>
            </div>
            <div data-example-id="striped-table" class="row bs-example chart-container">
                <div class="table-responsive" >
            <?php 
                $series="";
                if(!empty($endorsementbyday)){
                    $seriesdata ="";
                    foreach($endorsementbyday as $lval){
                       if( $seriesdata==""){
                        $seriesdata="{
                  name: '".$this->Time->Format($lval[0]["cdate"], DATEFORMAT)."',
                 y: ".$lval[0]["cnt"]."}";
                       }else{
                        $seriesdata.=",{
                   name: '".$this->Time->Format($lval[0]["cdate"], DATEFORMAT)."',
                 y: ".$lval[0]["cnt"]."}";
                       }
                    }

//                echo $seriesdata;exit;
                  $series="  {
                    name: 'Date',
                    colorByPoint: false,
                    data: [".$seriesdata."]}";
                      //echo $seriesdata;
                }
                echo $this->Element("endorsementbyday_web", array("data" => $series));
            ?>
                </div>
            </div>
        </div>
    </div>
</section>
<section>
    <div class="row">
        <div class="col-md-6 charts-height">
            <div class="row">
                <div class="" style="position:absolute; right:60px; z-index:10">
            <?php
                echo $this->Html->image('fullview.png',array('class'=>"img-responsive full-view", "onclick" => "reportsandchartszoom(".$organization_id.", 'history_by_department')"));
            ?>
                </div>
            </div>
            <div data-example-id="striped-table" class="row bs-example">
          <?php
            echo $this->Element("endorsementhistorybydept_web");
        ?>
            </div>
        </div>
        <div class="col-md-6 charts-height">
            <div class="row">
                <div class="" style="position:absolute; right:60px; z-index:10">
            <?php
            echo $this->Html->image('fullview.png',array('class'=>"img-responsive full-view", "onclick" => "reportsandchartszoom(".$organization_id.", 'by_department')"));
        ?>
                </div>
            </div>
            <div data-example-id="striped-table" class="row bs-example">
                <div class="table-responsive">
            <?php
                        $series="";
                        /*$departmentids = $allvaluesfordeptandentity["department"];
                        
                        if(!empty($resultantendorsementbyDept)){
                            $seriesdata ="";
                            foreach($resultantendorsementbyDept as $key => $val){
                                if( $seriesdata==""){
                                $seriesdata="{
                                name: '".$departmentids[$key]."',
                                y: ".$val."}";
                                }else{
                                $seriesdata.=",{
                                name: '".$departmentids[$key]."',
                                y: ".$val."}";
                                }
                            }
                            $series="  {
                            name: 'organization',
                            colorByPoint: true,
                            data: [".$seriesdata."]}";
                        }*/
//                        pr($leaderboard);die;
                        if(!empty($leaderboard)){
                            $seriesdata ="";
                            foreach($leaderboard as $lval){
                                if( $seriesdata==""){
                                $seriesdata="{
                                id: '" . $lval["OrgDepartments"]["department_id"] . "',
                                name: '".addslashes($lval["OrgDepartments"]["department"])."',
                                y: ".$lval[0]["cnt"]."}";
                                }else{
                                $seriesdata.=",{
                                id: '" . $lval["OrgDepartments"]["department_id"] . "',
                                name: '".addslashes($lval["OrgDepartments"]["department"])."',
                                y: ".$lval[0]["cnt"]."}";
                                }
                            }
                            $series="  {
                            name: 'organization',
                            colorByPoint: true,
                            data: [".$seriesdata."],
                            point:{
                              events:{
                                  click: function (event) {
                                      window.location.href = siteurl + 'organizations/deptHistory/' + this.id;
                                  }
                              }
                          }     
                            }";
                        }
                        
                        echo $this->Element("endorsementbydept_web", array("data" => $series));
            ?>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- job title charts-->
<section>
    <div class="row">
        <div class="col-md-6 charts-height">
            <div class="row">
                <div class="" style="position:absolute; right:60px; z-index:10">
            <?php
            echo $this->Html->image('fullview.png',array('class'=>"img-responsive full-view", "onclick" => "reportsandchartszoom(".$organization_id.", 'by_jobtitle')"));
        ?>
                </div>
            </div>
            <div data-example-id="striped-table" class="row bs-example">
                <div class="table-responsive">
            <?php
                $seriesjbtitle = "";
                $htmljbtitledata = "";
                if(!empty($detailedjobtitlechart)){
                    
                    foreach($detailedjobtitlechart["data"] as $name => $yaxis){
                        if(isset($detailedjobtitlechart["jobtitles"][$name])){
                            $htmljbtitledata .= "{
                                id:'".$name."',
                                name:'".$detailedjobtitlechart["jobtitles"][$name]."',
                                y:".$yaxis.",
                            },";
                        }
                    }
                }
                $seriesjbtitle="  {
                    name: 'jbendorsement',
                    colorByPoint: true,
                    data: [".$htmljbtitledata."],
                     point:{
                          events:{
                              click: function (event) {
                                  window.location.href = siteurl + 'organizations/titleHistory/' + this.id;
                              }
                          }
                      }
                }";
                
                
                    $dataarray = array("data" => $seriesjbtitle, "chartfor" => "jobtitle", "zoomchart" => "no");
                    echo $this->Element("endorsementspiecharts_web", array("dataarray" => $dataarray));
                ?>
                </div>
            </div>
        </div>
        <div class="col-md-6 charts-height">
            <div class="row">
                <div class="" style="position:absolute; right:60px; z-index:10">
            <?php
                        echo $this->Html->image('fullview.png',array('class'=>"img-responsive full-view", "onclick" => "reportsandchartszoom(".$organization_id.", 'by_suborganization')"));
                    ?>
                </div>
            </div>
            <div data-example-id="striped-table" class="row bs-example">
                <div class="table-responsive">
            <?php
                $seriesentity = "";
                $htmlentity = "";
                if(!empty($detailedentitychart)){
//                    pr($detailedentitychart);die;
                    $htmlentitydata = "";
                    foreach($detailedentitychart["data"] as $name => $yaxis){
                         
                            //======as in if elelment is deleted so we need to check
                            if(isset($detailedentitychart["entites"][$name])){
                                $htmlentity .= "{
                                    id:'".$name."',
                                    name:'".$detailedentitychart["entites"][$name]."',
                                    y:".$yaxis.",
                                },";
                            }
                            
                    }
                }
                $seriesentity="  {
                    name: 'jbendorsement',
                    colorByPoint: true,
                    data: [".$htmlentity."],
                    point:{
                          events:{
                              click: function (event) {
                                  window.location.href = siteurl + 'organizations/subOrgHistory/' + this.id;
                              }
                          }
                      }
                }";
                
                
                    $dataarray = array("data" => $seriesentity, "chartfor" => "entity", "zoomchart" => "no");
                    echo $this->Element("endorsementspiecharts_web", array("dataarray" => $dataarray));
                ?>
                </div>
            </div>
        </div>
    </div>
</section>

<!--end of job title chart--> 

<!-- Enitites Chart--> 

<!-- -end of entites chart-->

<div class="modal fade" id="myModal2_commonrandc" role="dialog">
    <div class="modal-dialog"> 
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="btn btn-default pull-right close" data-dismiss="modal">&times;</button>
            </div>
            <div class="modal-body" style="text-align: center">
                <h4 class="modal-title"></h4>
                <div id="bodytext"></div>
            </div>
        </div>
    </div>
</div>
