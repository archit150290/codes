<?php
/**
 * The template for displaying pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Spicy Byte
 * 
 */
/* Template Name: Home Page */

get_header("spicybyte"); 
?>
<?php $themeDirectory = get_template_directory_uri() . "/";
$valuesSelected = json_decode(get_option('selected_sections'));

?>
<div class="agile-banner-main" id="home">
		<div class="banner-layer">
            <?php 
                if(in_array("header-main", $valuesSelected))
                    get_template_part( 'partials/header-main' ); 
            ?>
            <!--Banners at top-->
			<div class="container">
                <?php 
                if(in_array("banner-top", $valuesSelected))
                    get_template_part( 'partials/banner-top' ); ?>
			</div>
			<div class="clearfix"> </div>
		</div>
    </div>
<?php //===showing different sections in partial folder ?>
<?php 
    if(in_array("about", $valuesSelected))
        get_template_part( 'partials/about' ); 
?>
<?php 
    if(in_array("about-grid", $valuesSelected))
        get_template_part( 'partials/about-grid' );
?>
<?php 
    if(in_array("section-taste", $valuesSelected))
        get_template_part( 'partials/section-taste' ); 
?>
<?php 
    if(in_array("section-mainmenu", $valuesSelected))
        get_template_part( 'partials/section-mainmenu' ); 
?>
<?php 
    if(in_array("section-specialdish", $valuesSelected))
        get_template_part( 'partials/section-specialdish' ); 
?>



<?php 
    if(in_array("section-timings", $valuesSelected))
        get_template_part( 'partials/section-timings' ); 
?>
<?php 
    if(in_array("section-reservation", $valuesSelected))
        get_template_part( 'partials/section-reservation' ); 
?>

<?php 
    if(in_array("section-chef", $valuesSelected))
        get_template_part( 'partials/section-chef' ); 
?>
<?php 
    if(in_array("section-slid", $valuesSelected))
        get_template_part( 'partials/section-slid' ); 
?>


<?php 
    if(in_array("section-testimonials", $valuesSelected))
        get_template_part( 'partials/section-testimonials' ); 
?>
<?php 
    if(in_array("section-contact", $valuesSelected))
        get_template_part( 'partials/section-contact' ); 
?>
<?php 
    if(in_array("section-footer", $valuesSelected))
        get_template_part( 'partials/section-footer' ); 
?>
<?php 
    if(in_array("section-subscribe", $valuesSelected))
        get_template_part( 'partials/section-tasubscribeste' ); 
?>

<?php 
    if(in_array("section-footer-cpy", $valuesSelected))
        get_template_part( 'partials/section-footer-cpy' ); 
?>
<?php 
    if(in_array("section-tooltip", $valuesSelected))
        get_template_part( 'partials/section-tooltip' ); 
?>


<?php get_footer("spicybyte"); ?>
