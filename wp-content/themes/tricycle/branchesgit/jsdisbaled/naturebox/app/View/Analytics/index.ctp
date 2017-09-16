<?php
$headerTdCss = 'background-color:#FF9900; color:#FFF; font-family:Arial, Helvetica, sans-serif; font-size:14px; border-left:solid 1px #000; border-bottom:solid 1px #000;';
$tdCss = ' text-align:center;background-color:#FDE9D9; font-family:Helvetica, sans-serif; font-size:13px; border-left:solid 1px #000;border-bottom:solid 1px #000;';
$tdRandomCss = ' text-align:center;background-color:#FFFFFF;  font-family:Helvetica, sans-serif; font-size:13px; border-left:solid 1px #000;border-bottom:solid 1px #000;';
$tblCss = 'cellpadding="5" cellspacing="0"  width="100%" style="margin:0 auto; border-top:solid 1px #000; border-right:solid 1px #000;"';

$colspan = isset($tables["visitor_details"]["cols"]) ? count($tables["visitor_details"]["cols"]) : 4;

?>
<h2>Analytics</h2>
<Br />
<p><strong><?php echo $tables["visitor_details"]["title"]; ?></strong></p>
<table  class="table table-hover">
    <thead>
    <tr>
        <?php
        $cols = array();
        //pr($tables); 
        if (isset($tables["visitor_details"]["cols"])) {
            $cols = $tables["visitor_details"]["cols"];
            foreach ($tables["visitor_details"]["cols"] as $i => $col) {
                $css = "";
                if($col == "session_last_req"){
                      
                        $css = "width:150px;";
                    }
                    if($col == "referer_url"){
                        $css = "min-width:150px;word-break: break-all;";
                    }
                ?>
                <th  style="<?php echo $css; ?>"><?php echo ucwords(str_replace("_", " ", $col)); ?></th>
                <?php
                }
            }
            ?>

    </tr>
    </thead>
    <tbody>
    <?php
    //tyle="<?php echo $j>1 && $j%2 ==1 ? $tdCss : $tdRandomCss;"
   
    if (isset($tables["visitor_details"]["data"]) && count($tables["visitor_details"]["data"])) {
        foreach ($tables["visitor_details"]["data"] as $i => $row) {
            
            ?>
            <tr class="<?php echo $i>0 && $i%2 ==1 ? 'even' : 'odd'; ?> ">
                <?php
                foreach ($cols as $j => $col) { 
                    $val = $row[$col];
                    $css = "";
                    if($col == "visitor_id"){
                        $val = "<a href='".Router::url(array("action"=>"visitor_actions",$val))."' target='_blank' >".$val."</a>";
                    } else{
                        if($col == "session_last_req"){
                            $val = date("Y-m-d H:i:s",$val);
                            $css = "width:150px;";
                        }
                    if($col == "referer_url"){
                        $css = "min-width:150px;word-break: break-all;";
                    }
                    }
                    ?>
                    <td style="<?php echo $css ; ?>"> <?php echo     $val; ?> </td>
                <?php } ?>

            </tr>
            <?php
        }
    } else {
        ?>
        <tr><td colspan="<?php echo $colspan; ?>">No data received.</td> </tr>
<?php } ?>
        </tbody>
</table>