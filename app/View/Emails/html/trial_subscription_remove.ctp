<html>
    <head>
    </head>
    <body>
<?php echo Ucfirst($fname);?>,
<br/><br/>
This is to notify you that the nDorse Trial Subscription for your organization <?php echo $org_name;?> has expired.
Purchase a subscription or contact NDORSE LLC at <a href="mailto:support@ndorse.net">support@ndorse.net</a> to activate your subscription. 
<?php echo $this->element('email_footer'); ?>
    </body>
</html>		
				