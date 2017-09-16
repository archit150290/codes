<html>
				<head>
				</head>
				<body>
								<?php echo $fname;?>,
								<br>
								A user :<?php echo $user_name;?>  has requested to join your nDorse organization :<?php echo $org_name; ?>. <br />Please login to the administrator portal on the web or on your nDorse mobile app to either approve or deny the invitation.
								<?php echo $this->element('email_footer'); ?>
								
				</body>
</html>