<script>
    //events code
    var selectedCat = '';
    var itemsClickedBeforeCheckout = 0;
    $(document).ready(function () {
        $(".snack-cat").click(function () {
            owa_visitor_id = OWA.getState( 'v', 'vid' );
            var item = $(this).attr("cat-name");
            item = filterName(item);
            selectedCat = item;
            OWATracker.trackAction('category', "clicked", item, 1);

        });

        $(".snack-cat-home").click(function () {

            var item = $(this).attr("cat-name");
            item = filterName(item);
            selectedCat = item;
            var tile_pos = $(this).attr("order");
            OWATracker.trackAction('category', 'tile_position_'+item, tile_pos, 1);
        });


        $(document).on("click", ".snack-product", function (e) {

            var item = $(this).attr("product-name");
            item = filterName(item);
            OWATracker.trackAction('Product', 'clicked_category_'+selectedCat, item, 1);
            itemsClickedBeforeCheckout++;
        });





        $(document).on("click", ".nutrition", function (e) {
            itemsClickedBeforeCheckout++;
            var productName = $(this).parent().parent().attr("product-name");
            productName = filterName(productName);
            OWATracker.trackAction('product_nutrition', 'clicked_category_'+selectedCat, productName, 1);
            e.stopPropagation();
            return true;
        });

        $(document).on("click", ".more-finfo", function (e) {

            var productName = $(this).parent().parent().attr("product-name");
            productName = filterName(productName);
            OWATracker.trackAction('product_more_info', 'clicked_category_'+selectedCat, productName, 1);
            
            e.stopPropagation();
            return true;
        });


    });

    function fireRatingEvent(rating, product_name) {

        OWATracker.trackAction('product_rating', "added_to_pantry", rating, 1);
    }

    function fireSpecialAttrEvents(objProduct) {
        var binaryAttrs = {"vegan": "vegan", "non_gmo": "non_gmo", "low_carb": "low_carb", "no_sugar_added": "no_sugar_added"
            , "low_calories": "low_calories", "low_sodium": "low_salt", "low_sugars": "low_sugars", "low_fat": "low_fat"};


        for (var attr in binaryAttrs) {
            if (attr in objProduct) {
                var val = objProduct[attr];
                if (val == 1 || val == "1" || val == true || val == "true") {
                    
                    OWATracker.trackAction("product_snack_spec","added_to_pantry", binaryAttrs[attr], 1);
                }
            }
        }
    }

    function fireCheckoutEvents() {
        fireItemsClickedBeforeCheckoutEvent(itemsClickedBeforeCheckout);
    }

    function fireBoxSizeEvent(boxSize) {
        OWATracker.trackAction('Plan','box_size', boxSize, 1);
    }

    function fireDeliverFrequencyEvent( frequency) {

        OWATracker.trackAction('Plan','delivery_frequency', frequency, 1);
    }
    
    function savePlanEvent(boxSize, frequency) {

        OWATracker.trackAction('Plan','plan_selected', boxSize+'/' +frequency, 1);
    }

    function fireProductAdded(productName) {

        productName = filterName(productName);
        OWATracker.trackAction('added_to_pantry', 'clicked_category_'+selectedCat, productName, 1);

    }

    function fireProductRemoved(productName) {

        productName = filterName(productName);
        OWATracker.trackAction('removed_from_pantry', 'clicked_category_'+selectedCat, productName, 1);

    }

    function fireItemsClickedBeforeCheckoutEvent(cnt) {
        OWATracker.trackAction('Items_clicked_before_checkout', "clicks", OWA.getState( 'v', 'vid' ), cnt);
    }

    function filterName(str) {
        if( typeof(str) != 'undefined' && str != '' )
            return str.replace(/[^a-zA-Z0-9 ]/g, '');
        else
            return;
    }
</script>

