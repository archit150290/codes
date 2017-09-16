<?php get_header(); ?>
<div class='wrap'>

    <div class='home-dailydharma'>
        <h2 class='button'>Daily Dharma</h2>

        <?php
        $args = array(
            'post_type' => array(DAILYDHARMA_POST_TYPE),
            'post_status' => 'publish',
            'order' => 'DESC',
            'orderby' => 'date',
            'posts_per_page' => 6,
            'paged' => (get_query_var('paged')) ? get_query_var('paged') : 1,
        );
        $eq_query = new WP_Query($args);
        while ($eq_query->have_posts()): $eq_query->the_post();
            $dailydharma_authorname = get_post_meta($post->ID, DAILYDHARMA_AUTHORS_NAME_METABOX, true);
            $dailydharma_url = get_post_meta($post->ID, DAILYDHARMA_URL_METABOX, true);
            ?>
            <div class='icon icon-quote'></div>
            <?php if (empty($dailydharma_url)) { ?>
                <a href="<?php the_permalink(); ?>">
                <?php } else {
                    ?>
                    <a href="http://<?php echo $dailydharma_url; ?>" target="_blank"> <?php } ?>
                    <div class='dailydharma-quote'><?php the_content(); ?></div></a>
                <address> 
                    
                    <?php if (empty($dailydharma_url)) { ?>
                        <a href="<?php the_permalink(); ?>">
                        <?php } else {
                            ?>
                            <a href="http://<?php echo $dailydharma_url; ?>" target="_blank"> <?php } ?>
                            &ndash; <?php if (!empty($dailydharma_authorname)) {
                    echo $dailydharma_authorname . ",";
                } ?> 
    <?php echo the_title(); ?>
                        </a>
                            
                </address>
                <div class='social-wrap'> <ul class='dailydharma-social'></ul></div>
                    <?php
                endwhile;
                wp_reset_query();
                ?>  
    </div>
<?php get_footer(); ?>
