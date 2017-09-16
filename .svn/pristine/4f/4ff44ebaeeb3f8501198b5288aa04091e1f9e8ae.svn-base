<?php

/**
 * @package Marquee
 * @version 1.6
 */
/*
  Plugin Name: Marquee
  Plugin URI:
  Description: This Marquee is used to set the element with drag and drop method.
  Author:
  Version:
  Author URI:
 */

function my_menu_pages_marquee() {
    global $current_user;
    //give editor a role to access a page
    if($current_user->roles[0]=="editor"){ 
        $roles = 'editor'; 
    }else{ 
        $roles = 'manage_options';
    }
    add_menu_page('Home Page Marquee', 'Home Page Management', $roles, 'marqueepage', 'feature_marquee', 'dashicons-controls-repeat', 7);
    add_submenu_page('marqueepage', 'Feature Marquee', 'Feature Marquee', $roles, 'marqueepage', 'feature_marquee');
    add_submenu_page('marqueepage', 'Home Page Current Issues', 'Home Page Current Issue', $roles, 'homepageissues', 'Home_issues_marquee');
    add_submenu_page('edit.php?post_type=magazine', 'Manage Issues', 'Manage Issues', $roles, 'issues', 'manage_issues');
    add_submenu_page('edit.php?post_type=magazine', 'Manage Article Sequence', 'Manage Article Sequence', $roles, 'currentissues', 'current_issues_marquee');
    add_submenu_page('edit.php?post_type=filmfestival', 'Manage Film Festival', 'Manage Film Festival', 'manage_options', 'filmfestmanager', 'filmfest_manager');
}

add_action('admin_menu', 'my_menu_pages_marquee');

add_action('init', 'my_admin_scripts');

function my_admin_scripts() {
    wp_enqueue_script('jquery-ui-sortable');
}

function feature_marquee($post) {
    global $wpdb;
    //query is here to check if there is any value at the initials or not
    $results = $wpdb->get_results( 'SELECT * FROM '.$wpdb->prefix.'postmeta WHERE meta_key = "menu_order_marquee"' );
    
    if($results)
    {
        add_filter('pre_get_posts', 'change_order_marquee');

        function change_order_marquee($wp_query) {
            $wp_query->set('meta_key', 'menu_order_marquee');
            $wp_query->set('orderby', 'meta_value_num');
            $wp_query->set('order', 'ASC');
        }
    }
    
    $args = array(
        'post_type' => array('post', MAGAZINE_POST_TYPE, DHARMATALKS_POST_TYPE, FILM_CLUB_POST_TYPE, EBOOKS_POST_TYPE, FILM_FESTIVAL_POST_TYPE),
        'post_status' => 'publish',
        'meta_query' => array(
            array(
                'key' => 'home_featured',
                'value' => '1',
                'compare' => 'IN',
            ),
        ),
        'posts_per_page' => -1,
    );
    $eq_query = new WP_Query($args);
   global $post;
    ?>
    <div class="wrap">
        <h2>Welcome To Marquee</h2>
        <h3 id="order_updated">Set Home Page Marquee:- Drag and Drop to change the positions</h3>
        <table id="marquee" class="widefat">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tfoot>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                </tr>
            </tfoot>
            <tbody id="sortable_ui">
                <?php while ($eq_query->have_posts()): $eq_query->the_post();
                $post_type = get_post_type();
                $post_slug = "edit.php?post_type=".$post_type;
                    if($post_type == "post")
                    {
                        $post_type = "Trike Daily";
                        $post_slug = "edit.php?post_type=post";
                    }
                    ?>
                    <tr id="recordsArray_<?php echo $post->ID; ?>">
                        <td><a href="post.php?post=<?php echo $post->ID; ?>&action=edit"><?php the_title(); ?></a></td>
                        <td><a href="<?php echo $post_slug; ?>"><?php echo $post_type;?></a></td>
                    </tr>
                    <?php 
                endwhile;
            wp_reset_query();
            ?>  
            </tbody>
        </table>
        <script type="text/javascript">
            jQuery(document).ready(function () {
                jQuery("table#marquee tbody").sortable({update: function () {
                        var order = jQuery(this).sortable("serialize") + '&action=updateRecordsListings';
                        jQuery.post("<?php echo WP_PLUGIN_URL . '/marquee/' ?>update-sequence.php", order, function (theResponse) {
                            if (theResponse == 0 || theResponse == "Error.")
                            {
                                
                                 alert('Order can not be updated. Please try after sometimes.');
                            }
                            else
                            {
                                jQuery("#sortable_ui").html(theResponse);
                                jQuery("#order_updated").text("Updating the sort Order...");
                                setTimeout(function(){jQuery("#order_updated").text("Order Updated");},1000);
                                //setTimeout(function(){alert("Order updated successfully");},2000);
                            }
                        });
                    }
                });
            });
        </script>
    </div>
    <?php
}


function Home_issues_marquee($post) {
    global $post;
    $recentissue = get_magazine_issue_terms();
    $recentissueName = isset($recentissue[0]) ? $recentissue[0]->name : '';
    add_filter('pre_get_posts', 'change_order');
    function change_order($wp_query) {
        $wp_query->set('meta_key', 'menu_order');
        $wp_query->set('orderby', 'meta_value_num');
        $wp_query->set('order', 'ASC');
    }
    $argscissue = array(
        'post_type' => array(MAGAZINE_POST_TYPE),
        'post_status' => 'publish',
        'tax_query' => array(
            'relation' => 'AND',
            array(
                'taxonomy' => 'magazine-issue',
                'field' => 'slug',
                'terms' => array($recentissueName),
                'operator' => 'IN',
            ),
        ),
        'meta_query' => array(
            array(
                'key' => 'current_issue_meta_key',
                'value' => '1',
                'compare' => 'IN',
            ),
        ),
    );
    $eq_query = new WP_Query($argscissue);
    ?>
    <div class="wrap">
        <h2><?php echo $recentissueName;?></h2>
        <h3>Set Home Page Current Issues: Drag and drop to change the positions. </h3>
    </div>

    <table id="marquee" class="widefat">
        <thead>
            <tr>
                <th>Title</th>
            </tr>
        </thead>
        <tfoot>
            <tr>
                <th>Title</th>
            </tr>
        </tfoot>
        <tbody id="sortable_ui">
            <?php
            while ($eq_query->have_posts()): $eq_query->the_post();
                $abc = get_post_meta($post->ID, 'menu_order', true);
                ?>
                <tr id="recordsArray_<?php echo $post->ID; ?>">
                    <td><a href="post.php?post=<?php echo $post->ID; ?>&action=edit"><?php the_title(); ?></a></td>
                </tr>
                <?php
            endwhile;
            wp_reset_query();
            ?>  
        </tbody>
    </table>
    <script type="text/javascript">
        jQuery(document).ready(function () {
            jQuery("table#marquee tbody").sortable({update: function () {
                    var order = jQuery(this).sortable("serialize") + '&action=updateCurrentIssues';
                    jQuery.post("<?php echo WP_PLUGIN_URL . '/marquee/' ?>update-sequence.php", order, function (theResponse) {
                        if (theResponse == 0 || theResponse == "Error.")
                        {
                            alert('Order can not be updated. Please try after sometimes.');
                        }
                        else
                        {
                            jQuery("#sortable_ui").html(theResponse);
                            alert('Order updated successfully.');
                        }
                    });
                }
            });
        });
    </script>
    <?php
}

function current_issues_marquee()
{
    ?>
    <div class="wrap">
        <h2>Manage Sequence</h2>
            <form action="" method="post">
            <table>
            <tbody>
            <tr>
                <th scope="row"><label for="blogname">Issues</label></th>
                <td>
                    <select id="magazineissues" name="magazineissues">
                        <option selected="true" style="display: none;">Select Issue</option>
                        <?php $topicsfinal = get_magazine_issue_terms();
                        foreach($topicsfinal as $Topics)
                            {    
                            $topicsName = $Topics->name;
                            $topicsSlug = $Topics->slug;
                            $topicsTermurl = $Topics->term_url;
                            echo '<option value = "'.$topicsSlug.'">'.$topicsName.'</option>';
                            }
                        ?>
                    </select>
                </td>
                 <th scope="row"><label for="blogname">Sections</label></th>
                <td>
                    <select id="magazinedepartments" name="magazinedepartments">
                        <option selected="true" style="display: none;">Select Department</option>
                        <option value="special-sections">Special Sections</option>
                        <option value="features">Features</option>
                        <option value="departments">Departments</option>
                        <option value="columns">Columns</option>
                    </select>
                </td>
                <td>
                    <label><input id="submitOption" class="button button-primary" type="submit" name="submit" value="Search Articles"></label>
                </td>
             </tr>
            </tbody>
            </table>
            </form>
        
        
        <?php
        if(isset($_REQUEST['submit']))
        {   
            global $post;
            $magazine_issues = $_REQUEST['magazineissues'];
            $magazine_departments = $_REQUEST['magazinedepartments'];?>
                <script>
                    var Issue = '<?php echo $magazine_issues; ?>';
                    var Department = '<?php echo $magazine_departments; ?>';
                    jQuery("#magazineissues option[value="+ Issue +"]").attr("selected","selected");
                    jQuery("#magazinedepartments option[value="+ Department +"]").attr("selected","selected");
                </script>
                <?php 
            $args = array(
                'post_type' => array(MAGAZINE_POST_TYPE),
                'tax_query' => array(
                    'relation' => 'AND',
                    array(
                        'taxonomy' => MAGAZINE_POST_DEPARTMENT_TAXONOMY,
                        'field' => 'slug',
                        'terms' => array($magazine_departments),
                        'operator' => 'IN',
                    ),
                    array(
                        'taxonomy' => 'magazine-issue',
                        'field' => 'slug',
                        'terms' => $magazine_issues,
                        'operator' => 'IN',
                    ),
                ),
                'post_status' => 'publish',
                'order' => 'ASC',
                'orderby' => 'menu_order',
                'posts_per_page' => '-1'
            );
            $eq_query = new WP_Query($args);
            ?>
            <table id="marquee" class="widefat">
                <thead>
                    <tr>
                        <th>Title</th>
                        <!--<th>Menu Order</th>-->
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>Title</th>
                        <!--<th>Menu order</th>-->
                    </tr>
                </tfoot>
                <tbody id="sortable_ui">
                    <?php 
                    if($eq_query->have_posts())
                    {
                    echo '<p>Drag and Drop to change the sequence, Articles will appear in same order as they are here.</p>';
                    while($eq_query->have_posts())
                    {
                        $eq_query->the_post();?>
                        <tr id="recordsArray_<?php echo $post->ID; ?>">
                            <td><a href="post.php?post=<?php echo $post->ID; ?>&action=edit"><?php the_title(); ?></a></td>
                            <td><?php //echo $abc; ?></td>
                        </tr>

                   <?php }
                    }?>
                </tbody>    
            </table>
            <script>
            jQuery(document).ready(function(){
                    var magazineIssue = '<?php echo $magazine_issues; ?>';
                    var magazineDepartment = '<?php echo $magazine_departments; ?>';
                    jQuery('table#marquee tbody').sortable({update: function(){
                    var order = jQuery(this).sortable("serialize")+'&action=updateissues'+'&magazine-issue='+magazineIssue+'&magazine-department='+magazineDepartment;
                    jQuery.post("<?php echo WP_PLUGIN_URL . '/marquee/' ?>update-sequence.php", order, function (theResponse) {
                            if (theResponse == 0 || theResponse == "Error.")
                            {
                                alert('Order can not be updated. Please try after sometimes.');
                            }
                            else
                            {
                                jQuery("#sortable_ui").html(theResponse);
                                alert('Order updated successfully.');
                            }
                        });
               }
                }) ;
            });
            </script>
            <?php 
        }
        ?>
    </div>
    <?php 
}

/**
 * This function is used to manage the issues whether it is Published or Unpublished.
 */
function manage_issues()
{
    $args = array(
        'orderby' => 'id',
        'order' => 'DESC',
        'hide_empty' => false
    );

    $terms = get_terms(MAGAZINE_POST_ISSUE_TAXONOMY, $args);
    if ($terms) {
        foreach ($terms as $term) {
            $term->term_url = get_term_link($term, MAGAZINE_POST_ISSUE_TAXONOMY);
        }
    }
    
    if($_POST && $_POST['frm_update'] == "Update" )
    {
        $published_issues = isset($_POST['published_issues']) ? $_POST['published_issues'] : "";
        if(update_option("published_issues", $published_issues))
        {
            $message = "Data updated successfully.";
            $class = "updated";
        }
        else
        {
            $message = "Data can not be updated. Please make any change and try again.";
            $class = "error";
        }
        
        if(!$published_issues)
        {
            $published_issues = array();
        }
        
        $msg  = '<div id = "message" class = "'.$class.'" style = "background-color : rgb(255, 251, 204);">';
        $msg .= '<a style="text-decoration: none; float: right;" title="Close" href="javascript:void(0);" onclick="jQuery(\'#message\').hide();">X</a>';
        $msg .= '<p><strong>'.$message.'</strong></p>';
        $msg .= '</div>';
        echo $msg;
    }
    else
    {
        $published_issues = get_option("published_issues");
        if(!$published_issues)
        {
            $published_issues = array();
        }
    }
    ?>
    <style>
        form#manage_issues table td {
            padding: 10px 10px 10px 20px;
            border-bottom: 1px solid;
            border-left: 1px solid;
            
        }
        form#manage_issues table td:last-child {
            border-right: 1px solid;
        }
        form#manage_issues table th {
            border-bottom: 1px solid;
        }
        .spacer{
            clear: both;
            display: block;
            margin-bottom: 15px;
        }
    </style>
    <script type="text/javascript">
        jQuery(function(){
            jQuery("a.select_all").click(function() {
                jQuery("form#manage_issues input:checkbox").prop("checked", true);
            });
            
            jQuery("a.unselect_all").click(function() {
                jQuery("form#manage_issues input:checkbox").prop("checked", false);
            });
        });
    </script>
    <div class="wrap">
        <h2>Manage Issues</h2>
        <p><em>Note: Please select the issue to publish.</em></p>
        <form action="" method="post" id="manage_issues">
            <input type="submit" name="frm_update" value="Update" />
            &nbsp;&nbsp;&nbsp;
            <a href="javascript:void(0);" class="select_all">Select All</a>
            &nbsp;&nbsp;&nbsp;
            <a href="javascript:void(0);" class="unselect_all">Unselect All</a>
            <div class="spacer"></div>
            <table cellpadding="0" cellspacing="0">
                <tr>
                    <th>Seq. #</th>
                    <th>Issue Name</th>
                    <th>Issue URL</th>
                    <th>Issue Status</th>
                </tr>
            
                <?php
                if($terms)
                {
                    $loop = 1;
                    foreach($terms as $term)
                    {
                        ?>
                        <tr>
                            <td><?php echo $loop++; ?></td>
                            <td><?php echo $term->name; ?></td>
                            <td><?php echo $term->term_url; ?></td>
                            <td><input type="checkbox" value="<?php echo $term->term_id; ?>" name="published_issues[]" <?php echo in_array($term->term_id, $published_issues) ? "checked" : ""; ?> /></td>
                        </tr>
                        <?php
                    }
                }
                else
                {
                    ?>
                    <tr>
                        <td colspan="2">No issue found.</td>
                    </tr>
                    <?php
                }
                ?>
            </table>
            <div class="spacer"></div>
            <input type="submit" name="frm_update" value="Update" />
            &nbsp;&nbsp;&nbsp;
            <a href="javascript:void(0);" class="select_all">Select All</a>
            &nbsp;&nbsp;&nbsp;
            <a href="javascript:void(0);" class="unselect_all">Unselect All</a>
        </form>
    </div>
    <?php
}

/*
 * Function to update film festival year in CMS
 */
function filmfest_manager()
{
    wp_enqueue_script('jquery-ui-sortable');
    wp_enqueue_script('jquery-ui-sortable');//including for sortable functionality 
        if(isset($_REQUEST['submit_manager']))
        {   
            $regulator = isset($_REQUEST['film_regulator']) ? $_REQUEST['film_regulator'] : "0";
            update_option("film_regulator", $regulator);
            $fetch_year = array();
            if(isset($_REQUEST['filmfestmanager']))
            {$fetch_year = $_REQUEST['filmfestmanager'];}
            $result_final = json_encode($fetch_year);
            update_option("yearsfilmfestival", $result_final);
        }
    ?>     
        <script>
            jQuery(document).ready(function(){
                jQuery(document).on('click','#selectall',function(){
                    jQuery(".checker input:checkbox").prop("checked",true);
                });
                jQuery(document).on('click','#unselectall',function(){
                    jQuery(".checker input:checkbox").prop("checked",false);
                });
            });
        </script>
        
        <h2>Film Festival Manager</h2>
        <?php 
        $years_filmfestival = get_option("yearsfilmfestival",true);
        $results = json_decode($years_filmfestival);
        ?>
        <form method="post">
            <?php $film_regulator = get_option("film_regulator"); ?>
            <table style="width:40%">
                    <tr>
                        <td><label><input type="checkbox" value="1" name="film_regulator" id="film_regulator" <?php echo ($film_regulator == "1") ? "checked" : ""; ?>  /><b>Publish Film Festival</b></label></td>
                        <td><p id="selectall"><a href="javascript:void(0)">Select All</a></p></td>
                        <td><p id="unselectall"><a href="javascript:void(0)">UnSelect All</a></p></td><td><input type="submit" class="updatefilmfest button button-primary" value="Update Film Festival" name="submit_manager"/></td>
                    </tr>
            </table>
           
            <table style="width:50%" id="marquee" class="widefat">
                    <thead>
                        <tr>
                            <th>Film Festival Year</th>
                            <th>Checker</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        $current_year = date('Y');
                        for($i=$current_year;$i>=1991;$i--)
                        {
                            ?> 
                            <tr>
                                <td>
                                    Film Festival <?php echo $i;?> 
                                </td>
                                <td class="checker">
                                    <input type="checkbox" value="<?php echo $i;?>" name="filmfestmanager[]" id="filmfestmanager_<?php echo $i;?>"  <?php echo (is_array($results) && in_array($i, $results)) ? 'checked' : '';  ?>>
                                </td>
                            </tr>
                        <?php
                        }
                        ?>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Film Festival Year</th>
                            <th>Checker</th>
                        </tr>
                    </tfoot>    
            </table>
            <table style="width:25%">
                    <tr><td><p id="selectall"><a href="javascript:void(0)">Select All</a></p></td><td><p id="unselectall"><a href="javascript:void(0)">UnSelect All</a></p></td><td><input type="submit" class="updatefilmfest button button-primary" value="Update Film Festival" name="submit_manager"/></td></tr>
            </table>
        </form>
        
        
        <h2>Sort Posts for Film Festival Landing page (Drag and Drop to sort order)</h2>
        
        <style>
            #sortablefilmfest { list-style-type: none; margin: 0; padding: 0; width: 60%; }
            #sortablefilmfest li { margin: 0 3px 13px 3px; padding: 0.4em; padding-left: 1.5em; font-size: 1.4em; height: 35px;  font-size: 13px}
            #sortablefilmfest li span { position: absolute; margin-left: -1.3em; }
        </style>
        <script>
            jQuery(function() {
              jQuery( "#sortablefilmfest" ).sortable();
            });
        </script>
        
        <?php
        global $wpdb;
        
        $resultfilmfest = $wpdb->get_results( 'SELECT * FROM '.$wpdb->prefix.'postmeta WHERE meta_key = "menu_order_filmfestival"' );
        
        if($resultfilmfest){
            function change_order_filmfestival($wp_query) {
            $wp_query->set('meta_key', 'menu_order_filmfestival');
            $wp_query->set('orderby', 'meta_value_num');
            $wp_query->set('order', 'ASC');
            }
            add_filter('pre_get_posts', 'change_order_filmfestival');
        }
        //pr($resultfilmfest);
        $args = array(
            'post_type' => FILM_FESTIVAL_POST_TYPE,
            'post_status' => 'publish',
            'posts_per_page'=>-1,
        );
        $eq_query = new WP_Query($args);
        //remove_filter('pre_get_posts', 'change_order_filmfestival');
        $query =  '<ul id="sortablefilmfest">';
        while($eq_query ->have_posts()){
            $eq_query ->the_post();
            $date = get_the_date('Y');
            for($i = 0; $i < count($results); $i++){
                if($results[$i] == $date){
                    $query .='<li id="recordsArray_'. get_the_ID().'" class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span><b>'.get_the_title().'</b></li>';
                }
            }
        }
        $query .='</ul>';
        echo $query;
        ?>
        <script>
            jQuery(document).ready(function(){
                jQuery('ul#sortablefilmfest').sortable({update: function () {
                    var order = jQuery(this).sortable("serialize") + '&action=updateFilmFestival';
                    jQuery.post("<?php echo WP_PLUGIN_URL . '/marquee/' ?>update-sequence.php", order, function (theResponse) {
                        if (theResponse == 0 || theResponse == "Error.")
                            {
                                alert('Order can not be updated. Please try after sometimes.');
                            }
                            else
                            {
                                alert("Order updated successfully");
                            }
                    });
                }
                });
            });
        </script>
<?php
}
