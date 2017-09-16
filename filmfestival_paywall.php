<?php
/*
 * Module is implemented to check 
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * Tick all film festival for paywall
 */
include_once 'wp-config.php';
/*
$videos_dharmatalks = json_decode(get_post_meta('31459', "videos_dharmatalks", true),true);
pr($videos_dharmatalks['slugs']);
$videos_dharmatalks['slugs'][0] = "abc";
$videos_dharmatalks['slugs'][1] = "defc";
$videos_dharmatalks['slugs'][2] = "ghi";
$videos_dharmatalks['slugs'][3] = "jkl";
pr($videos_dharmatalks);
update_post_meta('31459', "videos_dharmatalks", json_encode($videos_dharmatalks));
 
 */
?>

<label>Enter the post id:-</label><input id="postId" type="text" name="postId" > 
<input type="button" value="Submit" onclick="getSlugs()" > 
<script>
function getSlugs(){
    var postId = document.getElementById('postId').value;
    
}
</script>
<?php 
/*
$args = array(
    'post_type' => FILM_FESTIVAL_POST_TYPE,
    'post_status' => array('publish'),
    'posts_per_page'=>-1,
);
$eq_query = new WP_Query($args);
/*while($eq_query->have_posts()){
    $eq_query->the_post();
    update_post_meta(get_the_ID(), "behind_the_paywall", "1");
}


while($eq_query->have_posts()){
    $eq_query->the_post();
    update_post_meta(get_the_ID(), "menu_order_filmfestival", "");
}

//echo "All Film Festival Posts are now ticked for behind the paywall......Done";
echo "All Film Festival Posts are now registered for sorting......Done";
*/