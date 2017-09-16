<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    
    include "wp-config.php";
    wp_enqueue_script('jquery');
    $post_id = 30962;
    echo $directors = get_post_meta($post_id,"director_name_metabox",1);
    $name = $directors;
    ?>
    <input type="text" id="username" value="<?php echo $directors;?>" >
    <script type="text/javascript">
            alert("ad");
        jQuery(document).ready(function(){
            var username = jQuery("#username").val();
            alert(username);
        });
            //jQuery('#user_login').val(username);
        
    </script>


