<?php
$statusConfig = array('inactive' => 0, 'active' => 1, 'deleted' => 2, "eval" => 3,'invite_inactive' => 4);
Configure::write('statusConfig', $statusConfig);
//$StatusConfig     = array(0 => 'Inactive',1 => 'Active' , 2 => 'Deleted' );
//Configure::write('StatusConfig', $StatusConfig);
$email_type_subject_Config = array('invite' => 'Invite to join nDorse Organization');
Configure::write('email_template_subject',$email_type_subject_Config);
Configure::write('pageLimit', 20);
Configure::write("Give_Admin_Control", "Give Admin Control");
Configure::write("Revoke_Admin_Control", "Revoke Admin Control");
$role_array = array("1" => "Super Admin", "2" => "Admin", "3" => "Endorser", "4" => "Designated Admin");
Configure::write("Users_Role", $role_array);
$emojis_array = array();
$emojis_url = Router::url('/', true) . EMOJIS_IMAGE_DIR;
//$emojis_array[] = array("image"=>"awesome.gif","url"=>$emojis_url."awesome.gif");
//$emojis_array[] = array("image"=>"goodjob.gif","url"=>$emojis_url."goodjob.gif");
//$emojis_array[] = array("image"=>"superjob.gif","url"=>$emojis_url."superjob.gif");
//$emojis_array[] = array("image"=>"goodjob_3.gif","url"=>$emojis_url."goodjob_3.gif");
//$emojis_array[] = array("image"=>"hardworking_1.gif","url"=>$emojis_url."hardworking_1.gif");
//$emojis_array[] = array("image"=>"hardworking_2.gif","url"=>$emojis_url."hardworking_2.gif");
//$emojis_array[] = array("image"=>"led_team_1.gif","url"=>$emojis_url."led_team_1.gif");
//$emojis_array[] = array("image"=>"led_team_2.gif","url"=>$emojis_url."led_team_2.gif");
//$emojis_array[] = array("image"=>"teamwork_1.gif","url"=>$emojis_url."teamwork_1.gif");
//$emojis_array[] = array("image"=>"teamwork_2.gif","url"=>$emojis_url."teamwork_2.gif");
//$emojis_array[] = array("image"=>"teamwork_3.gif","url"=>$emojis_url."teamwork_3.gif");
//$emojis_array[] = array("image"=>"teamwork_4.gif","url"=>$emojis_url."teamwork_4.gif");
Configure::write("Emojis", $emojis_array);


//Subscription related configuration
Configure::write("subscription", array(
                                                            "annual_price_per_user" => "10.80",
                                                            "monthly_price_per_user" => "1"
                                            ));

Configure::write('Braintree', array(
        'env' => 'sandbox',
        'merchantId' => '6sbrnc5n3tr4g2rj',
        'publicKey' => 'r4wt437mg22y8kqh',
        'privateKey' => 'e1d50976c608064bc58ba84679ad5a17',
        'max_users' => 90

    ));

Configure::write( 'API_ACCESS_KEY_GOOGLE', 'AIzaSyAc4oDRLajTxs0k6lINr4XjIsTlsHfh6gQ' );
//Configure::write( 'API_ACCESS_KEY_GOOGLE', 'AIzaSyAz7yTuFOJIkl8E8k60hHzZxsVRt7ex_uc' );
//Configure::write( 'API_ACCESS_KEY_GOOGLE', 'AIzaSyBv-zDEFqKQOA-gn218a8X0B-aznWCb_EI' );

$fbConfig = array(
    "appId" => "1723622537883254",
    "secret" => "ce6cf0d300e02c6693fa6a358399609f"
    );

Configure::write('fbConfig', $fbConfig);

$fbPermissions = array('email', ); 
Configure::write('fbPermissions', $fbPermissions);

$linkedinPermissions = array('r_basicprofile', 'r_emailaddress'); 
Configure::write('linkedinPermissions', $linkedinPermissions);

$linkedinConfig = array(
    "api_key" => "78161l8s11vc5y",
    "api_secret" => "0sml5FhbK5oabZij",
);

Configure::write('linkedinConfig', $linkedinConfig);

//=================google login constant
$setscopes = array('https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/plus.me');
Configure::write('googleScopeArray', $setscopes);
$setvariable = array(
        "clientid" => "527612708125-2k1bb4pfe302670nomrda9kjmtoa74iv.apps.googleusercontent.com",
        "clientsecret" => "65fl2qI9zK4xMiWS2vCDyyZr",
);
Configure::write('googleSecretvariable', $setvariable);

?>