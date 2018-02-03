<?php
 $blog_title = get_bloginfo("name"); 
 $blog_description = get_bloginfo("description"); 
 $value = get_option( 'tagline2');
 $custom_logo_id = get_theme_mod( 'custom_logo' );
$image = wp_get_attachment_image_src( $custom_logo_id , 'full' );


?>
<div class="banner-top">
    <div class="banner-info">
        <h1>
            <a href="index.html">
                
                <img src="<?php echo $image[0]; ?>" class="img-responsive" alt="" /><?php echo  $blog_title; ;?></a>
        </h1>
        <h2><?php echo $blog_description; ?></h2>

        <div class="about-p text-center">
            <span class="sub-title"></span>
            <span class="fa fa-cutlery" aria-hidden="true"></span>
            <span class="sub-title"></span>
        </div>
        <p><?php echo  $value ;?>
            <p>

    </div>
</div>