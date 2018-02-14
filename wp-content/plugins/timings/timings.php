<?php
/*
  Plugin Name: Timings
  Description: Select Gallery
  Version: 1.0
  Author: Archit Dugar
  Text Domain: Gallery
*/
?>
<?php 
class Timings{

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
    add_menu_page( 'timings', 'Timings', 'manage_options', 'timing-Section', array(
        __CLASS__,
        'wpa_page_timing'
    ), 'dashicons-admin-page' ,'52');
  }


  /**
 * Load scripts and style sheet for settings page
 */


  /*
   * Actions perform on loading of menu pages
   */
  function wpa_page_timing() {?>
    <style>
       
    </style>
    <script>
    $ = jQuery.noConflict();
    $(document).ready(function(){
       
    })
    
    
    </script>
    <?php 
    $getImages = get_option("galleryImages");
    
    
    echo  '<div class="wrap"><h2>Timings</h2></div>';
    echo '<form method="post">';
    echo '<button id="create-user">Add new timing</button>';
    echo '</form>';

    if($_SERVER['REQUEST_METHOD'] == 'POST') {
        
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


new Timings();
?>
