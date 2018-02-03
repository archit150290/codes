<?php
/*
  Plugin Name: Select Section
  Description: Selects which section u want to display on front end
  Version: 1.0
  Author: Archit Dugar
  Text Domain: Select Section
*/
?>
<?php 
class simpleSeclection{

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
    add_action( 'wp_enqueue_scripts', 'wpdocs_theme_name_scripts' );
    add_menu_page( 'Selct Section', 'Select Sections', 'manage_options', 'select-Section', array(
        __CLASS__,
        'wpa_page_file_path'
    ), 'dashicons-admin-tools' ,'50');
  }

  /*
   * Actions perform on loading of menu pages
   */
  function wpa_page_file_path() {?>
    <div class="wrap">
        <h2>Select Section to show on fron page</h2>
        
        <?php
        if($_SERVER['REQUEST_METHOD'] == 'POST') {
            $allDataSelected = $_REQUEST["dataselected"];
            json_encode($allDataSelected);
            update_option( 'selected_sections', json_encode($allDataSelected) );
        }
        ?>
        <?php $valuesSelected = json_decode(get_option('selected_sections'));
        
        ?>
        <form method="post">
            <input class='button-primary' type='submit' name='Save' value='<?php _e('Save Options'); ?>' id='submitbutton' />
            <br>
            
            <table class="widefat">
                <thead>
                    <tr>
                        <th id="selectall">Tick</th>
                        <th>Section Name</th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                    <th>Tick</th>
                        <th>Section Name</th>
                    </tr>
                </tfoot>
                <tbody>
                <tr><td><input type="checkbox" class="dataselected" value="about" name="dataselected[]" <?php echo  (in_array("about", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>about</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="about-grid" name="dataselected[]"  <?php echo  (in_array("about-grid", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>about-grid</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="banner-top" name="dataselected[]" <?php echo  (in_array("banner-top", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>banner-top</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="header-main" name="dataselected[]"<?php echo  (in_array("header-main", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>header-main</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="section-chef" name="dataselected[]"<?php echo  (in_array("section-chef", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>section-chef</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="section-contact"   name="dataselected[]"<?php echo  (in_array("section-contact", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>section-contact</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="section-footer" name="dataselected[]" <?php echo  (in_array("section-footer", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>section-footer</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="section-footer-cpy" name="dataselected[]"   <?php echo  (in_array("section-footer-cpy", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>section-footer-cpy</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="section-mainmenu" name="dataselected[]"<?php echo  (in_array("section-mainmenu", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>section-mainmenu</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="section-reservation" name="dataselected[]"<?php echo  (in_array("section-reservation", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>section-reservation</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="section-slid" name="dataselected[]"<?php echo  (in_array("section-slid", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>section-slid</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="section-specialdish" name="dataselected[]"<?php echo  (in_array("section-specialdish", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>section-specialdish</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="section-subscribe" name="dataselected[]"<?php echo  (in_array("section-subscribe", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>section-subscribe</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="section-taste" name="dataselected[]"<?php echo  (in_array("section-taste", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>section-taste</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="section-testimonials" name="dataselected[]"<?php echo  (in_array("section-testimonials", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>section-testimonials</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="section-timings" name="dataselected[]"<?php echo  (in_array("section-timings", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>section-timings</strong></td></tr>
                <tr><td><input type="checkbox" class="dataselected" value="section-tooltip" name="dataselected[]"<?php echo  (in_array("section-tooltip", $valuesSelected)) ? 'checked' : ""; ?>></td><td><strong>section-tooltip</strong></td></tr>
                
                </tbody>
            </table>
            <br>
            <input class='button-primary' type='submit' name='Save' value='<?php _e('Save Options'); ?>' id='submitbutton' />
        </form>
    </div>
  <?php }

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
function wpa_styles() {
    echo "asd";
    wp_register_style( 'wp-analytify-style', plugins_url('css/wp-analytify-style.css', __FILE__));
    wp_enqueue_style( 'wp-analytify-style' );
}


new simpleSeclection();
?>
