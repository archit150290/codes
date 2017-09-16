<?php
/**
 * Plugin Name: ads
 * Plugin URI: http://danielpataki.com
 * Description: 
 * Version: 1.0.0
 * Author: 
 * Author 
 * License: GPL2
 */

 class adstricycle
 {
    function __construct(){
        //echo "archit";
    }
    
    function create_menu(){
        add_menu_page('Ads tricycle', 'ads-tricycle', 'manage_options', 'adstricycle', array(&$this, 'ads_tricycles'));
    }
    
    function ads_activated(){
        /*ads activation*/
    }
    
    function ads_tricycles(){?>
        <script>
         function texteditordisplay(radiovalue){
            if (radiovalue=="editorwp") {
                  jQuery('#wpeditorads').show();
                  jQuery('#newslettersignup').css('display','none');
                  jQuery('#subcribemodule').css('display','none');
               }else if (radiovalue=="emailsignup") {
                  jQuery('#newslettersignup').css('display','');
                  jQuery('#subcribemodule').css('display','none');
                  jQuery('#wpeditorads').hide();
               }
               else if (radiovalue=="subsmodule") {
                  jQuery('#newslettersignup').css('display','none');
                  jQuery('#subcribemodule').css('display','');
                  jQuery('#wpeditorads').hide();
               }
               else{
                  jQuery('#newslettersignup').css('display','none');
                  jQuery('#subcribemodule').css('display','none');
                  jQuery('#wpeditorads').hide();
               }
         }
            
            var adsurl = '<?php echo WP_PLUGIN_URL; ?>/ads/function-ads.php';
            jQuery(document).ready(function(){
                jQuery('table.tableadtricycle').hide();    
            });
            jQuery(document).on('change','#selectpage',function(){
                var valueSelectpage = jQuery(this).val();
                if (valueSelectpage == "") {
                    jQuery('#locationnew').css('display','none');
                }else{
                    jQuery('#locationnew').css('display','');
                    jQuery('#locationnew option').hide();
                    jQuery("#pagelocation option").removeAttr('selected');
                    jQuery('#locationnew option[class='+valueSelectpage+']').show();
                    jQuery(document).on('change', '#pagelocation', function(){
                        var selectedPlacement = jQuery(this).val();
                        jQuery.ajax({
                            type : 'post',
                            url : adsurl,
                            dataType : 'json',
                            data : {
                                selectedPage: valueSelectpage,
                                selectedPlacement : selectedPlacement
                            },
                            success : function (data, textStatus, XMLHttpRequest){
                                var moduletype = data.moduletype;
                                var content = data.content;
                                console.log(data.content);
                                jQuery('table.tableadtricycle').show();
                                jQuery('#adsbutton').show();
                                var radiooption = data.radiooption;
                                jQuery('#radiooption').empty();
                                jQuery('#radiooption').html(radiooption);
                                if(moduletype!=""){
                                 jQuery('#radiooption input[value='+moduletype+']').prop('checked', true);
                                }
                                 texteditordisplay(moduletype);
                                 jQuery('#mycustomeditor').text(content);
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                       alert(errorThrown);
                            }
                        });
                    });
                  }
            });
            jQuery(document).on('change', '#radiooption input[name="homepageradio"]',function(){
               var radiovalue = jQuery(this).val();
               texteditordisplay(radiovalue);
            });
        </script>
        
        <h2>Ads Tricycle</h2>
        <?php
        if(isset($_REQUEST['saveads'])){
            $resultant = array();
            $content = "";
            $page         = $_REQUEST['selectpage'];
            $location     = $_REQUEST['pagelocation'];
            $radiooption  = $_REQUEST['homepageradio'];
            if($radiooption=="editorwp"){
               $content      = stripslashes($_REQUEST['mycustomeditor']);
            }
            $resultant = array('moduletype'=>$radiooption, 'content'=>$content);
            $option_key = $page."_".$location."_ads";
            $option_key;
            update_option($option_key, $resultant);
         }
        ?>
      <form method="post" name="adstricycle">
        <table class="form-table">
            <tbody>
                <tr>
                    <th>Select Page</th>
                    <td>
                        <select name="selectpage" id="selectpage">
                            <option value=""></option>
                            <option value="homepage">Home</option>
                            <option value="magazine">Magazine</option>
                            <option value="trikedaily">Trike Daily</option>
                        </select>
                    </td>
                </tr>
                 <tr id="locationnew" style="display: none">
                    <th>Select Placement</th>
                    <td>
                        <select name="pagelocation" id="pagelocation">
                            <option id="" value="">Select Placement</option>
                            <option class="homepage" value="topplacement">Top placement</option>
                            <option class="homepage" value="bottomplacement">Bottom Placement</option>
                            <option class="magazine" value="topplacement">Top Placement</option>
                            <option class="magazine" value="bottomplacement">Bottom Placement</option>
                            <option class="trikedaily" value="bottomplacement">Bottom Placement</option>
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>
        <table style="width:95%;" class="widefat tableadtricycle">
            <thead>
                <tr>
                    <th>Module Type</th>
                    <th>Ad Content</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td id="radiooption">
                        <input type='radio' name='homepageradio' value='editorwp'>option1<br>
                        <input type='radio' name='homepageradio' value='emailsignup'>option2<br>
                        <input type='radio' name='homepageradio' value='subsmodule'>option3<br>
                        <input type='radio' name='homepageradio' value='displaynothing'>option4
                    </td>
                    <td id="textareaoption">
                     <?php
                        $content = '';
                        $editor_id = 'mycustomeditor';
                        $settings = array( 'media_buttons' => false, 'editor_height'=>100,'tinymce' => array('width' => 400));
                     ?>
                     <label style='display: none' id='wpeditorads'><?php wp_editor( $content, $editor_id, $settings); ?></label>
                     <img id="newslettersignup" src="<?php echo WP_PLUGIN_URL; ?>/ads/images/newsletter_signup.png" style="width: 200px; display: none"> 
                     <img id="subcribemodule" src="<?php echo WP_PLUGIN_URL; ?>/ads/images/tricycl_subcribe_module.png" style="width: 200px; display:none"> 
                    
                    </td>
                </tr>
            </tbody>
            <tfoot>
                 <tr>
                    <th>Module Type</th>
                    <th>Ad Content</th>
                </tr>
            </tfoot>
            
        </table>
        <br>
        <label style="display:none" id="adsbutton"><input id='buttonads' name="saveads" type="submit" value="Save Data" class="button button-primary"></label>
      </form>
        <?php
    }
 }
   $object_tricycleads = new adstricycle();
   if($object_tricycleads){
        add_action('admin_menu', array(&$object_tricycleads, "create_menu" ));
        register_activation_hook( __FILE__, array(&$object_tricycleads, "ads_activated" ) );
   }
 
 
