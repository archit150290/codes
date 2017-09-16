<?php echo $first_name; ?>,
<br>
<br>
<?php switch($for) {
				case "user" :
								if(isset($type) && $type == 'first') {
												$msg =  "Congratulations! You have been nDorsed by " . $endorser_name;
												if (!empty($core_values)) {
																$msg .= " for core values: ";
																$total_core_values = count($core_values);
																$count = 1;
																foreach($core_values as $core_value) {
																				if($count == $total_core_values) {
																								$msg .= $core_value;
																				} else if($count == $total_core_values-1 ){
																								//$msg = rtrim($msg, ", ");
																								$msg .= $core_value . " and ";
																				} else {
																								$msg .= $core_value . ", ";
																				}
																				$count++;
																}
																
																
												}
												
												
												$msg .= ".  Please log on to see your nDorse application to see more details on the nDorsement.";
												
												echo $msg;
								} else {
												echo "Congratulations! " . $endorser_name ." has nDorsed you recently.  You can see more details of the nDorsement on the nDorse app.";
								}
								
								break;
				
				case "department" :
								echo $endorser_name ." has nDorsed  " . $endorsed_name . " department recently.  You can see more details of the nDorsement on the nDorse app.";
								break;
				
				case "entity" :
								echo $endorser_name ." has nDorsed  " . $endorsed_name . " department recently.  You can see more details of the nDorsement on the nDorse app.";
								break;
}?>

<br>
<br>
Please feel free to contact us at <a href="mailto:support@ndorse.net">support@ndorse.net</a> for any questions or comments.
<?php echo $this->element('email_footer'); ?>				
				