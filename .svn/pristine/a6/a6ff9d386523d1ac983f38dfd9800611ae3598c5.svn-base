<?php
$post_Name = "Trike Daily";
$post_Slug = "trikedaily";
?>
<?php get_header() ?>		
<!-- end header -->

<!-- start content -->
<div class='wrap'>
    <!-- start landing marquee -->
    <div class='landing-category landing-marquee trikedaily'>
        <header class='rubric_top'>
            <h1><span class='icon icon-dept_<?php echo $post_Slug; ?>'></span><?php echo $post_Name; ?></h1>
            <p>Daily wisdom, teachings &amp; critique</p>
        </header>
        <?php
        if(have_posts())
        {
            while (have_posts()): the_post();
                $topics = get_topics_by_post_id(get_the_ID());
                $topic_urls = $topics && isset($topics['names_with_urls']) ? implode(", ", $topics['names_with_urls']) : "";
                ?>
                <main class='landing-marquee-hero'>
                    <article class='trikedaily'>
                        <figure>
                            <a href='<?php the_permalink(); ?>'>
                                <?php echo get_image_with_srcset(array("post_id"=>get_the_ID(), "image_type"=>"thumbnail", "source_width"=>array(2000, 1000, 500), "size"=>"image-size-500", "attr_sizes"=>"(min-width: 50em) 75vw,100vw")); ?>
                            </a>
                        </figure>
                        <section class='rubric trikedaily'>
                            <h2 class='trikedaily'>
                                <?php get_trikedaily_department(get_the_ID()); ?> 
                                <span class='topic'><?php echo $topic_urls; ?></span>
                            </h2>
                            <h1><a href='<?php the_permalink(); ?>'><?php echo get_the_title(); ?></a></h1>
                            <p><?php the_excerpt(); ?></p>
                            <address><?php echo getAuthorDetail($post->ID, 1, 0); ?></address><time><?php echo get_the_date('M d, Y'); ?></time>
                        </section>
                    </article>
                </main>
                <?php
                break;
            endwhile;
        }
        ?> 

        <aside class = 'landing-marquee-articles'>
            <?php
            $loop = 1;
            if(have_posts())
            {
                while (have_posts()): the_post();
                    $topics = get_topics_by_post_id(get_the_ID());
                    $topic_urls = $topics && isset($topics['names_with_urls']) ? implode(", ", $topics['names_with_urls']) : "";
                    ?>
                    <article class = 'trikedaily'>
                        <figure>
                            <a href = '<?php the_permalink(); ?>'>
                                <?php echo get_image_with_srcset(array("post_id"=>get_the_ID(), "image_type"=>"thumbnail", "source_width"=>array(1000, 500), "size"=>"image-size-500", "attr_sizes"=>"(min-width: 50em) 33vw, 100vw")); ?>
                            </a>
                        </figure>
                        <section class='rubric trikedaily'>
                            <h2 class='trikedaily'>
                                <?php get_trikedaily_department(get_the_ID()); ?>
                                <span class = 'topic'><?php echo $topic_urls; ?></span>
                            </h2>
                        </section>
                        <section class = 'titles'>
                            <h1><a href='<?php echo get_permalink(); ?>'><?php echo get_the_title(); ?></a></h1>
                            <p><?php the_excerpt(); ?></p>
                            <address><?php echo getAuthorDetail(get_the_ID(), 1, 0); ?></address><time><?php echo get_the_date('M d, Y'); ?></time>
                        </section>
                    </article>
                    <?php
                    if($loop++ == 3)
                    {
                        break;
                    }
                endwhile;
            }
            ?>    
        </aside>
    </div>
    <!--end landing marquee -->

    <!--start landing stack -->
    <div class='landing-stack'>
        <?php
        $count = 0;
        if(have_posts())
        {
            while (have_posts()): the_post();
                $topics = get_topics_by_post_id($post->ID);
                $topic_urls = $topics && isset($topics['names_with_urls']) ? implode(", ", $topics['names_with_urls']) : "";

                if($count == "3") 
                {
                    ?>
                    <div class='CTA-module'>
                        <?php get_the_ad("trikedaily_ad1_"); ?>
                    </div>
                    <?php 
                }
                ?>
                <article class='trikedaily'>
                    <figure>
                        <a href='<?php the_permalink(); ?>'>
                            <?php echo get_image_with_srcset(array("post_id"=>get_the_ID(), "image_type"=>"thumbnail", "source_width"=>array(1000, 500), "size"=>"image-size-500", "attr_sizes"=>"(min-width: 37.5em) 25vw,100vw")); ?>
                        </a>
                    </figure>
                    <section class='rubric trikedaily'>
                        <h2 class='trikedaily'>
                            <?php get_trikedaily_department(get_the_ID()); ?>
                            <span class='topic'><?php echo $topic_urls; ?></span>
                        </h2>
                    </section>
                    <section class='titles'>
                        <h1><a href='<?php the_permalink(); ?>'><?php echo get_the_title(); ?></a></h1>
                        <p><?php the_excerpt(); ?></p>
                        <address><?php echo getAuthorDetail(get_the_ID(), 1, 0); ?></address><time><?php echo get_the_date('M d, Y'); ?></time>
                    </section>
                </article>
                <?php
                $count++;
            endwhile;
        }
        ?>
    </div>
    <div class = 'CTA-module'>
        <?php get_the_ad("trikedaily_ad2_"); ?>
    </div>
    <!--end Call to Action module -->

    <aside>
        <div class = 'aside-depts'>
            <!--start aside magazine -->
            <?php show_latest_magazine_article(); ?>
            <!--end aside magazine -->

            <!--start aside ebooks -->
            <?php show_latest_ebooks(); ?>
            <!-- end aside ebooks -->

            <!-- start aside dharma talks -->
            <?php show_latest_dharma_talks(); ?>
            <!--end aside dharma talks -->
        </div>
        <div class = 'rule'></div>
        <!--end wrap_outer -->
        <!--start footer -->
        <?php get_footer(); ?>