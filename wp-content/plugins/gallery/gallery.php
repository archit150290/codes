<?php
/*
  Plugin Name: Gallery
  Description: Select Gallery
  Version: 1.0
  Author: Archit Dugar
  Text Domain: Gallery
*/
?>
<?php 
class GallerySimple{

// Constructor
  function __construct() {
      add_action( 'admin_menu', array( $this, 'wpa_add_menu' ));
      register_activation_hook( __FILE__, array( $this, 'wpa_install' ) );
      register_deactivation_hook( __FILE__, array( $this, 'wpa_uninstall' ) );
  }


  /*
    * Actions perform at loading of admin menu
    */
  function wpa_add_menu() {
    add_menu_page( 'Gallery', 'Gallery Sections', 'manage_options', 'gallery-Section', array(
        __CLASS__,
        'wpa_page_file_path'
    ), 'dashicons-admin-page' ,'51');
  }


  /**
 * Load scripts and style sheet for settings page
 */


  /*
   * Actions perform on loading of menu pages
   */
  function wpa_page_file_path() {?>
    <style>
        .ui-state-default, .ui-widget-content .ui-state-default, .ui-widget-header .ui-state-default{
            width : 25%;
            text-align : center;
        }
    </style>
    <script>
    $ = jQuery.noConflict();
    $(document).ready(function(){
        var custom_uploader;
        $(document).on('click', '#upload_image_button', function(e) {
            e.preventDefault();
 
            //If the uploader object has already been created, reopen the dialog
            if (custom_uploader) {
                custom_uploader.open();
                return;
            }
            custom_uploader = wp.media.frames.file_frame = wp.media({
                title: 'Choose Image',
                button: {
                    text: 'Choose Image'
                },
                multiple: true
            });

                //When a file is selected, grab the URL and set it as the text field's value
            var counter = 0;
            custom_uploader.on('select', function() {
                attachment = custom_uploader.state().get('selection').toJSON();
                console.log(attachment.length)

                for(var i =0; i < attachment.length; i++){
                    var htmlElement = '<li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span><img style="width:40%" src="'+attachment[i].url+'"><input type="text" name="imagesSelection[]" value="'+attachment[i].url+'"></li>'
                    console.log(attachment[i].url)
                    $("#sortable").append(htmlElement);
                }
            });
    
            //Open the uploader dialog
            custom_uploader.open();

        });

        $( "#sortable" ).sortable({
            stop: function(event, ui) {
               /*  $("#sortable li").each(function(i, el){
                    $(el).find(".position").val($(el).index())
                }); */
            }
        });
        $( "#sortable" ).disableSelection();
    })
    
    
    </script>
    <?php 
    echo  '<div class="wrap"><h2>Select Images</h2><div class="upload"><div><button type="submit" id="upload_image_button" class="upload_image_button button">Upload</button></div></div></div>';
    echo '<form method="post">';
    echo '<ul id="sortable"></ul>';
    echo '<input name="save" type="submit" class="button button-primary button-large" id="publish" value="Update">';
    echo '</form>';

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        $allDataSelected = $_REQUEST["imagesSelection"];
        $allDataSelected = json_encode($allDataSelected);
        update_options("galleryImages", $allDataSelected);
    }
  }

  /*
   * Actions perform on activation of plugin
   */
  function wpa_install() {

  }

 
  /*
   * Actions perform on de-activation of plugin
   */
  function wpa_uninstall() {

  }

}


new GallerySimple();
?>
