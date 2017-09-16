<?php
foreach($arrayendorsementdetail as $endorsementdetail) {?>
<tr>
    <?php if(!empty($endorsementdetail["userid"])){?>
    <?php //if($endorsementdetail["endorser"] == 0 && $endorsementdetail["endorsed"] == 0){?>
<!--    <td width="18%" style="text-align:left;"><?php //echo $endorsementdetail["name"];?></td>-->
                  <?php //}else{ ?>
    <td width="16%" style="text-align:left;"><?php echo $this->Html->Link($endorsementdetail["name"], array("controller" => "organizations", "action" => "listingreports", $endorsementdetail["userid"]))?></td>
                  <?php //}?>
    <td width="16%" align="center"><?php echo $endorsementdetail["endorser"];?></td>
    <td width="16%" align="center"><?php echo $endorsementdetail["endorsed"];?></td>
    <td width="16%" align="center"><?php echo $endorsementdetail["endorsed"] + $endorsementdetail["endorser"];?></td>
    <td width="20%" style="text-align:center; "><?php echo $endorsementdetail["department"];?></td>
    <td width="14%" style="text-align:center;"><?php echo $endorsementdetail["entity"];?></td>
    <?php }?>
</tr>
<?php } ?>