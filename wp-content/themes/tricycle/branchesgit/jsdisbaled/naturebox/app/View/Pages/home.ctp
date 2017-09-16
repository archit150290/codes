<?php echo $this->element('leftmenu'); ?>
<?php echo $this->element('pantry'); ?>

<div id="midContent" ng-controller="index" ng-show="show_products == false">
    <div class="heading">Snack Time! What're you cravin'?</div>
    <?php //pr($catsRandomList); ?>
    <div class="product_list" >
        <?php
        $catsCount = count($catsRandomList);
        $ctr = 1;
        $rowSize = 3;
        $rowCounter = 0;
        $itemCounter = 0;
        foreach ($catsRandomList as $key => $item) {
            if ($ctr == 1 || ($ctr > 2 && $ctr % $rowSize == 1)) {
                $rowCounter++;
                $itemCounter = 0;
                ?><div class="row"> 

                <?php }
                $order = "R".$rowCounter.":C".(++$itemCounter);
                ?>
                <div class="product snack-cat snack-cat-home" order="<?php echo $order; ?>"  cat-name="<?php echo $item["name"]; ?>">
                    <a href="javascript:void(0)" ng-click="get_products('<?php echo $item["url_key"]; ?>')">
                        <img src="<?php echo $imagesUrl . $item["url_key"]; ?>.jpg" width="550" height="430" alt="" class="product_img" />
                        <div class="product-name"><div><?php echo $item["name"]; ?></div></div>
                    </a>
                </div>
                <?php if ($ctr == $catsCount) { ?>
                    <div class="product" style="display:none;">
                        <a href="javascript:void(0)"   ng-click="do_surprise('surprise')">
                            <img src="<?php echo $imagesUrl; ?>surprise.png" width="550" height="430" alt="" class="product_img" />
                             <div class="product-name"><div>Surprise Me!</div></div>
                        </a>
                    </div>
                    <div class="surpriseBox">
                    Or you can always opt in for a  <a href="javascript:void(0)"   ng-click="do_surprise('surprise')">Surprise!</a>
                    </div>
                    
                    
                <?php } ?>   
                <?php if ($ctr == $catsCount || ($ctr >= $rowSize && $ctr % $rowSize == 0)) {
                    ?></div>
                <?php
            }
            $ctr++;
        }
        ?>

    </div>


</div>


<!-- old code starts here -->
<!-- old code starts here -->
<?php echo $this->element("products"); ?>



<style>

    #sticky.stick {
        position: fixed;
        top: 0;
        z-index: 10000;

    }
</style>