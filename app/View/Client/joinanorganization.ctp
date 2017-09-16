
<div class="row join-org " >
  <div class="text-center div-center">
<!--    <div id="flashmessage" class="alert"></div>-->
<!--    <p id="flashmessage"><?php // echo $this->Session->Flash(); ?></p>-->
    <?php echo $this->Form->Create("Organization", array("onsubmit" => "return false"));?>
        <h3>Please enter the unique code in the box below to join an organization.</h3>
        <div class="form-group"> <?php echo $this->Form->input("secretcode", array("class" => "form-control", "placeholder" => "Organization Code", "label" => false)); ?> 
          <!--                <input type="text" class="form-control text-center" id="email" name="data['organization']" placeholder="Enter code you recieved" />--> 
        </div>
        <div class="form-group">
            <button class="btn btn-block btn-orange" id="joinorganization" type="submit">Submit </button>
        </div>
    <?php echo $this->Form->end();?> </div>
    <div class="col-md-12 text-center"> <img src="<?php echo  Router::url('/', true); ?>img/or-join.png" class="img-responsive" alt="" /> </div>
    <div class="text-center div-center" style="position:relative" >
        <h2>Search Organizations</h2>
        <form class="form-inline">
            <div class="form-group">
                <input type="text" class="form-control"  placeholder="Enter name of organization" id="searchorganization"  style="width:400px;">
            </div>
            <button disabled="disabled" type="button" id="clearsearcheddata" class="btn btn-orange">X</button>
            <div id="livesearch"></div>
        </form>
        <!--    <h2 class="recommend">Recommended Organizations</h2>-->
    </div>
    <!--<button class="btn btn-block btn-orange" id="sendmultiplerequest" type="submit">Send Multiple Request </button> -->

    <div class="send-multi hidden"><button data-toggle="tooltip" data-original-title="Submit Here" class="btn btn-primary" id="sendmultiplerequest" type="submit"><b>Send Request</b>
            &nbsp;<span class="badge counterorg"></span>
        </button></div>


</div>
<?php //pr($orgdata["organization"]);?>
<div id ="orglisting">
  <?php 
        if(isset($orgdata["organization"])){
            echo $this->Element("corganizationslisting");
        }else{
            echo "<div class = 'nodataavailable'>$orgdata</div>";
        }?>
</div>
<input type="hidden" name="pagename" id="pagename" value="joinorg">
<div style="text-align: center" class="col-md-offset-2"> <?php echo $this->Html->Image("ajax-loader.gif", array("class" => "hiddenloader hidden")); ?> </div>
<!--Join Org -->
</div>


<div class="modal fade" id="myModalroleinorg" tabindex="-1" role="dialog" 
     aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content"> 
            <!-- Modal Header -->

            <div class="modal-header">
                <button data-dismiss="modal" class="btn btn-default pull-right close" type="button">×</button>
                <h3>My Role in This Org</h3>
            </div>
            <!-- Modal Body -->
            <div class="modal-body">
                <form id="formusers" role="form">
                    <div class="col-md-12">
                        <div class="form-group">
                            <span>Sub Organization : </span>
                            <div class="select-style">
                                <div class="select-style">
                                    <div class="input select">
                                        <select id="entity_id" class="form-control" name="data[entity_id]">
                                            <option selected="selected" value="0">Select Sub Organization</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <span>Department : </span>
                            <div class="select-style">
                                <div class="input select">
                                    <select id="department_id" class="form-control" name="data[department_id]">
                                        <option selected="selected" value="0">Select Department</option>
                                    </select>
                                </div> 
                            </div>
                        </div>
                        <div class="form-group">
                            <span>Job Title : </span>
                            <div class="select-style">
                                <select id="job_title_id" class="form-control" name="data[job_title_id]">
                                    <option selected="selected" value="0">Select Job Title</option>
                                </select>
                            </div>
                        </div>

                </form>
            </div>
            <div class="clearfix"></div>
            <!-- Modal Footer -->
            <div class="modal-footer">
                <button type="button" id="saveroleinorg" data-orgid="" class="btn btn-orange-small pull-left"> Submit</button>
                <button type="button" id="skiproleinorg" class="btn btn-orange-small pull-left" data-dismiss="modal"> Skip </button>
            </div>
        </div>
    </div>
</div>
</div>
