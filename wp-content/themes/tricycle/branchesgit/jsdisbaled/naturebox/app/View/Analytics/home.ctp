<?php
$headerTdCss = 'background-color:#FF9900; color:#FFF; font-family:Arial, Helvetica, sans-serif; font-size:14px; border-left:solid 1px #000; border-bottom:solid 1px #000;';
$tdCss = ' text-align:center;background-color:#FDE9D9; font-family:Helvetica, sans-serif; font-size:13px; border-left:solid 1px #000;border-bottom:solid 1px #000;';
$tdRandomCss = ' text-align:center;background-color:#FFFFFF;  font-family:Helvetica, sans-serif; font-size:13px; border-left:solid 1px #000;border-bottom:solid 1px #000;';
$tblCss = 'cellpadding="5" cellspacing="0"  width="100%" style="margin:0 auto; border-top:solid 1px #000; border-right:solid 1px #000;"';

$colspan = 4;
?>
<strong>MPA Reports</strong><br /><br />';
<table style="<?php echo $tblCss; ?>"><tr>
        <th  style="<?php echo $css; ?>;color:#000000">MPA Reports</th>';
        <th  style="<?php echo $css; ?>;color:#000000">Task Volume</th>';
        <th  style="<?php echo $css; ?>;color:#000000">Success Rate</th>';
        <th  style="<?php echo $css; ?>;color:#000000">Last Executed Time</th>';
        <th  style="<?php echo $css; ?>;color:#000000">Last Finished Time</th>';
        <th  style="<?php echo $css; ?>;color:#000000">Time Difference</th>';
        <th  style="<?php echo $css; ?>;color:#000000">Time Since Last Executed</th>';
        <th  style="<?php echo $css; ?>;color:#000000">Failed tasks</th>';


    </tr>
    <?php
    if (count($data)) {
        foreach ($data as $i => $row) {
            ?>

            <tr>

                <td style="<?php echo $tdCss; ?>">
                    MPA Reports
                </td>

                <td style="<?php echo $green_css; ?>">

                </td>

                <td style="<?php echo $green_css; ?>">

                </td>


                <td style="<?php echo $green_css; ?>">

                </td>




            </tr>
        <?php }
    } else { ?>
        <tr><td colspan="<?php echo $colspan; ?>">No data received.</td> </tr>
<?php } ?>

        </table>