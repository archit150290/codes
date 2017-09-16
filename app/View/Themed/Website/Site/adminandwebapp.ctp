<?php ?>

<div class="container">
  <div class="download-ndorse">
    <div class="pull-left"><?php echo $this->Html->Image("/images/logo.png", array("width" => "100", "alt" => ""));?></div>
    <div class="pull-left">
      <h2> Admin Portal and Web App Link </h2>
    </div>
  </div>
  <div class="clearfix"></div>
  <br />
  <br />
  <br />
  <div class="our-clients">
    <div class="col-md-6">
      <div class="col-md-10"><?php echo $this->Html->link("Web App Link", array("controller" => "client", "action" => "login"), array('target'=>'_blank','escape'=>false, 'class' => 'btn btn-orange btn-block' )) ;?></div>
    </div>
    <div class="col-md-6">
      <div class="col-md-10"><?php echo $this->Html->link("Admin Portal", array("controller" => "users", "action" => "login"), array('target'=>'_blank','escape'=>false, 'class' => 'btn btn-orange btn-block'));?></div>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</div>
<?php echo $this->Element("footersite");?>