<?php
/**
 * The template for displaying pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other "pages" on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */
get_header();
?>

<!-- start content -->
<div class='wrap_outer_base'>

    <!-- start static page rubric -->
    <header class='rubric_top'>
        <h1><?php the_title(); ?></h1>
    </header>
    <!-- end static page rubric -->

    <!-- start white article frame -->
    <main class='wrap_base'>
        <!-- start article -->
        <article class='article_base'>
            <!-- start article body -->
            <main class='article-main_base'>
                <?php get_tool_tip_sharethis(get_the_title(), get_the_permalink(), get_the_ID()); ?>
                <section class='article-body'>
                    <?php
                    while (have_posts()) : the_post();
                    // Include the page content template.
                        get_template_part('content', 'page');
                        the_content();
                    // End the loop.
                    endwhile;
                    ?>
                </section>
            </main>
            <!-- end article body -->
            <!-- start article sidebar -->
            <aside>
                <script type='text/javascript'>
                    googletag.cmd.push(function() {
                        googletag.defineSlot('/52618277/trike_base_sidebar_300x250', [300, 250], 'div-gpt-ad-1455075672582-2').addService(googletag.pubads());
                            googletag.pubads().addEventListener('slotRenderEnded', function(event) {
                                if (event.slot.getSlotElementId() == "div-gpt-ad-1455075672582-2") {
                                        //to check desktop ad 
                                        if((event.isEmpty)==true){
                                        //means there is an ad
                                            jQuery('.ad_square').remove();
                                        }
                                    }
                            });
                        googletag.pubads().enableSingleRequest();
                        googletag.pubads().collapseEmptyDivs();
                        googletag.enableServices();
                    });
                </script>
                <div class='ad_square'>
                    <div id='div-gpt-ad-1455075672582-2' style='height:250px; width:300px;'>
                        <script type='text/javascript'>
                            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1455075672582-2'); });
                        </script>
                    </div>
                </div>
                <?php
                $myrows = getMostPopular("");
                if (!empty($myrows)) {
                    ?>
                    <div class='popular-posts'>
                        <header>
                            <h1>Most Popular</h1>
                        </header>
                        <main>
                            <ol>
                                <?php
                                $countviews = 0;
                                foreach ($myrows as $mostpopular) {
                                    if ($countviews == 5) {
                                        break;
                                    }
                                    //pr($mostpopular);
                                    $postID = $mostpopular->post_id;
                                    $counter = $mostpopular->counter;
                                    $post_type = get_post_type($postID);
                                    $title = get_the_title($postID);
                                    $permalink = get_permalink($postID);
                                    $countviews++;
                                    ?>
                                    <li><h1><a href=<?php echo $permalink; ?>><?php echo $title; ?></a></h1></li>
                                    <?php } ?>
                            </ol>
                        </main>
                    </div>

                <?php } ?>
            </aside>
            <!-- end article sidebar -->
        </article>
    </main>
    <aside>
        <!-- start Call to Action module -->
        <div class='CTA-module'>
            <?php get_the_ad("pages_") ?>
        </div>
        <div class='aside-depts'>
            <!-- start aside dharma talks -->
            <?php show_latest_dharma_talks(); ?>
            <!-- end aside dharma talks -->

            <!-- start aside Film Club -->
            <?php show_latest_filmclub(); ?>
            <!-- end aside Film Club -->

            <!-- start aside ebooks -->
            <?php show_latest_ebooks(); ?>
            <!-- end aside ebooks -->
        </div>
        <div class='rule'></div>
    <?php get_footer(); ?>