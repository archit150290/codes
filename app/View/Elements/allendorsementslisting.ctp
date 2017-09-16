<?php

if(empty($allvaluesendorsement)){?>
<tr id="nodata"><td colspan="5">No Data Available</td></tr>
<?php }else{
    $counter = 1;
    foreach($allvaluesendorsement as $endorsementid => $endorservalues){ ?>
<?php if(isset($filtered)){?>
<tr username = '<?php echo $endorservalues["endorsername"]." ".$endorservalues["endorsedname"];?>'>
<?php }else{?>
    <tr username = '<?php echo $endorservalues["endorsername"]." ".$endorservalues["endorsedname"];?>'>
<?php }?>
    <td>
        <?php echo $this->Html->Link($endorservalues["endorsername"], array("controller" => "organizations", "action" => "listingreports", $endorservalues["endorserid"]));?>
        <?php //echo $endorservalues["endorsername"];?>
    </td>
    <td>
        <?php
        if($endorservalues["endorsedid"] != ""){
            echo $this->Html->Link($endorservalues["endorsedname"], array("controller" => "organizations", "action" => "listingreports", $endorservalues["endorsedid"]));
        }else{
            echo $endorservalues["endorsedname"];
        }
            
        ?>
    </td>
    <td><div class="endor-date"><?php echo $this->Time->Format($endorservalues["date"], DATEFORMAT);?></div></td>
    <td style="text-align:center"><?php echo $endorservalues["totalpoints"];?></td>
        <?php
            foreach($orgcorevaluesandcode as $key =>$corevaluesall){
                if(in_array($key, $endorservalues["corevaluesid"])){
                    echo '<td style="text-align:center">'.$this->Html->Image("checked.png", array("alt" => "Checked")).'</td>';
                }else{
                    echo '<td style="text-align:center"></td>';
                }
            }
        ?>
    <td title="<?php if($endorservalues["endorsement_message"]!=""){echo "click to see";}?>" class="comment" style="" valign="middle"><div class="comment-div"> <?php echo $endorservalues["endorsement_message"];?></div></td>
    <?php if($showAttachments == true) {?>
    <td title="" class="attachment" style="" valign="middle"><?php if($endorservalues["imagecount"]>0){echo "<span class='attachedimage' data-eid=".$endorsementid." type='image'>".$this->Html->Image("attach-black.png")."</span>";}?></td>
    <td title="" class="emojis" style="" valign="middle"><?php if($endorservalues["emojiscount"]>0){echo "<span class='attachedimage' data-eid=".$endorsementid." type='emojis'>". $this->Html->Image("attach-black.png")."</span>";}?></td>
    <?php } ?>
</tr>
<?php $counter++; } 
} ?>