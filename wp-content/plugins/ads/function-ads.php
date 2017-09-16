<?php
include_once '../../../wp-config.php';
$moduletype = "";
$content = "";
$page = $_POST['selectedPage'];
$placement = $_POST['selectedPlacement'];
$ads_present = get_option($page."_".$placement."_ads");
if($ads_present){
     $moduletype = $ads_present['moduletype'];
     $content = $ads_present['content'];
};
$radioboxeshomepage = " <input type='radio' name='homepageradio' value='editorwp'>option1<br>
                        <input type='radio' name='homepageradio' value='emailsignup'>option2<br>
                        <input type='radio' name='homepageradio' value='subsmodule'>option3<br>
                        <input type='radio' name='homepageradio' value='displaynothing'>option4";
                
$radioboxesmagazine = " <input type='radio' name='homepageradio' value='editorwp'>option1<br>
                        <input type='radio' name='homepageradio' value='emailsignup'>option2<br>
                        <input type='radio' name='homepageradio' value='displaynothing'>option4";
            
if($page == "homepage"){
    $radiooption = $radioboxeshomepage;
}else if($page == "magazine"){
    $radiooption = $radioboxesmagazine;  
}
else if($page == "trikedaily"){
    $radiooption = $radioboxeshomepage;
}
$resultf = array('radiooption'=>$radiooption, 'moduletype'=>$moduletype, 'content'=>$content);
echo $result = json_encode($resultf);

?>