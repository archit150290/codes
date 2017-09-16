<?php
/**
 * @package Daily_Dharma
 * @version 1.6
 */
/*
  Plugin Name: Daily Dharma
  Plugin URI:
  Description:To add Daily Dharma Quotes
  Author:
  Version: 1.6
  Author URI:
 */
?>
<?php
/* The function to create table named as dharmaquotes to save different fields */

function dailydharmadbtable() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'dharmaquotes';
    $charset_collate = $wpdb->get_charset_collate();
    echo $sql = "CREATE TABLE IF NOT EXISTS $table_name (
		id mediumint(9) NOT NULL AUTO_INCREMENT,
		title tinytext NOT NULL UNIQUE,
		content varchar(255) NOT NULL,
                url tinytext NOT NULL,
                time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
		author varchar(55) DEFAULT '' NOT NULL,
		
	) $charset_collate;";

    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
    dbDelta($sql);
}
register_activation_hook(__FILE__, 'dailydharmadbtable');
/* End ... table created */
?>

<?php

function my_menu_pages_dailydharma() {
    add_menu_page('Daily Dharma', 'Daily Dharma', 'manage_options', 'dailydharmaquotes', 'dailydharma', '');
}

add_action('admin_menu', 'my_menu_pages_dailydharma');

function dailydharma() {
    ?>
    <div class="wrap">
        <h2>Welcome To Daily Dharma Quotes</h2>
        <h3>Set Daily Dharma Quotes:-</h3>
        <form method="post">
            <table>
                <tr>
                    <td>Title</td>
                    <td><input type="text" name="quotestitle"></td>
                </tr>
                <tr>
                    <td>URL</td>
                    <td><input type="text" name="quotesurl"></td>
                </tr>
                <tr>
                    <td>Quotes</td>
                    <?php
                    $settings = array('media_buttons' => false, 'teeny' => true, 'editor_height' => 150, 'textarea_rows' => 20);
                    //Teeny is true as this shows the minimal editor configuration used in Press this.
                    ?>
                    <td><?php wp_editor('Enter Your Quotes here', 'quotescontent', $settings); ?></td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td><input type="submit" name="submitquotes" value="save"></td>
                </tr>

            </table>
        </form>
        <?php
        /* to insert data into the database table */
        if (isset($_REQUEST['submitquotes'])) {
            $content=$_POST['quotescontent'];
            $user=wp_get_current_user();
            $author=$user->display_name;
            global $wpdb;
            $table_name = $wpdb->prefix . 'dharmaquotes';
            $title = $_REQUEST['quotestitle'];
            $content = $content;
            $url = $_REQUEST['quotesurl'];
            $activity_date = date_i18n('Y-m-d H:i:s', false, true);
            $inserted = $wpdb->insert(
                        $table_name, array(
                        'id' => '',
                        'title' => $title,
                        'content' => $content,
                        'url' => $url,
                        'time' => $activity_date,
                        'author' => $author,
                    )
            );
            if ($inserted) {
                echo "Value Inserted with ID=".$insert_id = $wpdb->insert_id;
            } else {
                echo "Insert failed";
            }
        }
        ?>
    </div>
<?php }
?>
