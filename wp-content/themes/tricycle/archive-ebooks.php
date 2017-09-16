<?php get_header(); ?>
<!-- start content -->
<div class='wrap'>
    <!-- start magazine rubric -->
    <div class='rubric_top'>
        <h1><span class='icon icon-dept_ebooks'></span>E-books</h1>
        <p>Tricycle wisdom in e-book format</p>
    </div>
    <!-- end magazine rubric -->

    <!-- start archive_ebooks grid -->
    <div class='archive_ebooks'>
        <div class='rule'></div>
        <main id="moredata">
            <?php
            $publishPosts = $wp_the_query->found_posts;
            while (have_posts()) : the_post();
                $postId[] = get_the_ID();
                $topics = get_topics_by_post_id(get_the_ID());
                $topic_urls = $topics && isset($topics['names_with_urls']) ? implode(", ", $topics['names_with_urls']) : "";
                ?>
                <div class='archive-item'>
                    <figure class='archive-cover_ebooks'>
                        <a href='<?php the_permalink(); ?>'>
                            <?php echo get_image_with_srcset(array("post_id"=>get_the_ID(), "image_type"=>"thumbnail", "source_width"=>array(800, 400), "size"=>"image-size-400", "attr_sizes"=>"(min-width: 60em) 33vw,(min-width: 37.5em) 50vw,75vw")); ?>
                            <?php //echo srcset_post_thumbnail(get_the_ID(), 'image-size-400', '', '(min-width: 60em) 33vw,(min-width: 37.5em) 50vw,75vw'); ?>	
                        </a>
                    </figure>

                    <header class='archive-titles'>
                        <h2 class='topic ebooks'><?php echo $topic_urls; ?></span></h2>
                        <h1><a href='<?php the_permalink(); ?>'><?php the_title(); ?></a></h1>
                    </header>
                </div>
                <?php
            endwhile;
            ?>
        </main>
        <div style="clear:both"></div>
        <?php if ($publishPosts > 12) { ?>
        <div class="loader-more">
            <div id="loadingimage" style="position:relative"></div>
            <div class='more ebooks'>
                <input type="hidden" name="postId" id="postId" value="<?php echo json_encode($postId); ?>" />
                <input type="hidden" name="posttype" id="posttype" value="<?php echo EBOOKS_POST_TYPE; ?>" />
                <input type="hidden" name="searchyear" id="searchyear" value="<?php echo ""; ?>" />
                <a href='javascript:void(0)' id="archiveloadmore" onclick="loadmorearchive()">Load More</a>
            </div>
        </div>
        <?php } ?>
    </div>
    <!-- end archive_magazine grid -->

    <!-- start Call to Action module -->
    <div class='CTA-module'>
       <?php get_the_ad("ebooks_ad1_"); ?>
    </div>
    <!-- end Call to Action module -->

    <aside>
        <div class='aside-depts'>
            <!-- start aside Film Club -->
            <?php show_latest_filmclub(); ?>
            <!-- end aside Film Club -->

            <!-- start aside dharma talks -->
            <?php show_latest_dharma_talks(); ?>
            <!-- end aside dharma talks -->

            <!-- start aside magazine -->
            <?php show_latest_magazine_article(); ?>
            <!-- end aside magazine -->
        </div>
        <div class='rule'></div>
        <?php get_footer(); ?>                