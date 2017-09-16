<?php echo $this->Html->script("highcharts");
    echo $this->Html->script("modules/exporting");
    echo $this->Html->script("modules/no-data-to-display");
	?>
<div class="nDorsement-profile">
   <section style="padding:10px;">
    <div class="col-md-12 bottom-bor" >


          <h3><?php echo $alldetailsorg["org_name"];?></h3>
          <h4><?php echo $alldetailsorg["org_sname"];?></h4>
          <h4><?php echo implode(", ", $alldetailsorg["streetcity"]);?></h4>
          <h4><?php echo implode(", ", $alldetailsorg["statecountry"]);?></h4>
          <h4><?php echo $alldetailsorg["zip"];?></h4>

    </div>
    <div class="clearfix"></div>
  </section>
	  <section style="padding:10px;">
      <div class="col-md-12 time-range">
        <div class="pull-left">
          <h3>Select Date Range</h3>
        </div>
        <div class="pull-right">
          <button class="btn btn-default" id="showdataall">SHOW ALL</button>
        </div>
      </div>
      <div class="clearfix"></div>
	  <?php echo $this->Form->Create("daterange",array("method"=>"post","id"=>"chartseachform"));?>
      <div class="select-date col-md-12">
        <div class="col-md-3 form-group">
          <label> From</label>

			 <?php echo $this->Form->input('startdate', array('placeholder' => 'Start Date', 'type'=>'text','id' => 'datepicker_start', 'class' => 'form-control date', 'label' => false)); ?>
        </div>
        <div class="col-md-3 form-group">
          <label> To</label>
          <?php echo $this->Form->input('enddate', array('placeholder' => 'End Date', 'type'=>'text','id' => 'datepicker_end', 'class' => 'form-control date', 'label' => false)); ?>
        </div>
        <div class="col-md-6 ">
          <button type="button" class="btn btn-default" id="chartsearch">SEARCH</button>
		  
         
        </div>
      </div>
	  <?php echo $this->Form->End();?>
      <div class="clearfix"></div>
    </section>
    <section id="endorse-stats">
      
       <?php
			if($graphbycorevalues!=""){?>
			<div class="panel panel-default">
				<?php
            
               $seriesentity="  {
                    name: 'cvchart',
                    colorByPoint: true,
                    data: [".$graphbycorevalues."]}";
                $dataarray = array("chartfor" => "corevalueschart", "zoomchart" => "no", "data" => $seriesentity);
                echo $this->Element("endorsementspiecharts_web", array("dataarray" => $dataarray));
            
             ?>
			</div>
				<?php
			}else{
				 echo "<div class='nodataavailable'>No Data Available</div>"; 
			}
            ?>
        </div>
    </section>
  </div>
</div>
