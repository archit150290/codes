<?php
if($_REQUEST['action']=="loadmarqueejson")
{
    $header = array("ID"=>"s.no", "name"=>"name", "s"=>"q");
    $result = array(
                    array("ID"=>"1", "name"=>"archit", "s"=>"Dugar"),
                    array("ID"=>"2", "name"=>"n", "s"=>"s")
                  );
    $fresult = array("header"=>$header,"result"=>$result);
    echo json_encode($fresult);
}
?>