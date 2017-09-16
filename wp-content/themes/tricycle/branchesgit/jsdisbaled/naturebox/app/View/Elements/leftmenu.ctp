
<div class="left_submenu hide" ng-controller="leftmenu" ng-show="show_products == true" >
    <ul>
        <?php foreach ($catsRandomList as $key => $item) { ?>
        <li  ng-class="{active:selectedCatId == '<?php echo $item["url_key"]; ?>'}"><a class="snack-cat" href="javascript:void(0);" cat-name="<?php echo $item["name"]; ?>"  ng-click="get_products('<?php echo $item["url_key"]; ?>')"><?php echo $item["name"]; ?></a></li>
        <?php } ?>
        
    </ul>
</div>