'use strict';
var app = angular.module('naturebox', ['ngCookies']);
var natureboxUrl = "https://naturebox.com";
app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }]);

//app.controller('index', ['$scope', '$http', function($scope,$http) {
//app.controller('index', ['$scope', '$http', '$filter', '$rootScope', '$window', '$location', function ($scope, $http, $filter, $rootScope, $window, $location) {
app.controller('index', ['$scope', '$http', '$filter', '$rootScope', '$window', '$location', '$cookies', function ($scope, $http, $filter, $rootScope, $window, $location, $cookies) {

//app.controller('index', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

        $scope.loaded = 0;
        $rootScope.frequencies = {"weekly": "Once A Week", "biweekly": "Every Two Weeks", "monthly": "Once A Month"};

        $rootScope.reg_prices = {"5": "19.95", "10": "32.95"};
        $rootScope.final_prices = {"5": "9.97", "10": "16.47"};
        $rootScope.products = [];
        $rootScope.selectedCatKey = "";
        $rootScope.cart_items_count = 0;
        $rootScope.cart = [];
        $rootScope.cart_unique_items = {};
        console.log("cookies");
        console.log($cookies.get('box_size'));
        console.log("cookies delivery_frequency");
        console.log($cookies.get('delivery_frequency'));
        $rootScope.box_size = typeof $cookies.get('box_size') == 'undefined' ? 5 : $cookies.get('box_size');
        $rootScope.delivery_frequency = typeof $cookies.get('delivery_frequency') == 'undefined' ? "biweekly" : $cookies.get('delivery_frequency');
        
//        $rootScope.box_size = 5;
//        $rootScope.delivery_frequency = "biweekly" ;
        $rootScope.lastScrollTop = 0;
        $rootScope.direction = "";
        $rootScope.productDetails = '';
        $('.knob').val($rootScope.cart_items_count).trigger('change');

        $rootScope.get_suprise_url = function () {
            var url = SITE_URL + 'checkout?sku=';
            var offset = '';


            if ($rootScope.box_size == 5) {
                if ($rootScope.delivery_frequency == "monthly") {
                    offset = "savvy_snacker_50";
                } else if ($rootScope.delivery_frequency == "biweekly") {
                    offset = "savvy_snacker_biweekly_50";
                } else if ($rootScope.delivery_frequency == "weekly") {
                    offset = "savvy_snacker_weekly_50";
                }
            } else if ($rootScope.box_size == 10) {

                if ($rootScope.delivery_frequency == "monthly") {
                    offset = "10-item-k";
                } else if ($rootScope.delivery_frequency == "biweekly") {
                    offset = "10-item-k-biweekly";
                } else if ($rootScope.delivery_frequency == "weekly") {
                    offset = "10-item-k-weekly";
                }
            }

            return (url + offset);
        };

        $rootScope.add_to_pantry = function (objProduct) {
            $('.knob').trigger('configure', {
                    "max": $rootScope.box_size,
            });
            if ($rootScope.cart_items_count < $rootScope.box_size) {
                $rootScope.show_plan = 0;
                $rootScope.cart.push(objProduct.entity_id);
                //check for count
                var count = $scope.getDupCounter(objProduct);

                $rootScope.cart_items_count = $rootScope.cart.length;
                $('.knob').val($rootScope.cart_items_count).trigger('change');
                $rootScope.cart_unique_items[objProduct.entity_id] = objProduct;

                // if(count == 1)
                //    $('#before_added_'+objProduct.entity_id).hide();

                //$('#after_added_'+objProduct.entity_id).show();
                $('#after_added_count_' + objProduct.entity_id).val(count);

                fireProductAdded(objProduct.name);
                var rating = 0;
                if (objProduct.average_rating.stars != "") {
                    rating = objProduct.average_rating.stars;
                }
                if (rating < 0.1) {
                    rating = 0;
                }
                console.log("rating: " + rating);
                console.log("name: " + filterName(objProduct.name));
                if (rating > 0) {
                    fireRatingEvent(rating, filterName(objProduct.name));
                }

                fireSpecialAttrEvents(objProduct);
            }
            console.log($rootScope.cart_items_count + "--" + $rootScope.box_size);

            console.log($rootScope.cart_unique_items);
            console.log("cart_items_count: " + $rootScope.cart_items_count);
        };

        $rootScope.getDupCounter = function (objProduct) {
            var count = 0;
            for (var x in $rootScope.cart) {
                console.log(objProduct.entity_id);
                if ($rootScope.cart[x] == objProduct.entity_id) {
                    count++;
                }
            }
            return count;
        };

        $rootScope.remove_item = function (index, entity_id) {
            if (index > -1) {
                $rootScope.cart.splice(index, 1);
            }
            if (index == 'xxx')
                $rootScope.cart.splice($rootScope.cart.indexOf(entity_id), 1);

            //check for duplicate
            var duplicates = 0;
            for (var x in $rootScope.cart) {
                if ($rootScope.cart[x] == entity_id) {
                    duplicates++;
                    break;
                }
            }

            //fire analytics event
            fireProductRemoved($rootScope.cart_unique_items[entity_id]["name"]);
            var objProduct = $rootScope.cart_unique_items[entity_id];

            if (duplicates == 0) {
                delete $rootScope.cart_unique_items[entity_id];
                //$('#after_added_'+entity_id).hide();
                //  $('#before_added_'+entity_id).show();
            } else {
                //check for count
                var count = $scope.getDupCounter(objProduct);
            }

            $('#after_added_count_' + entity_id).val(count);

            $rootScope.cart_items_count = $rootScope.cart.length;

            $('.knob').val($rootScope.cart.length).trigger('change');

            console.log($rootScope.cart_items_count + "--" + $rootScope.box_size);
            console.log("cart_items_count: " + $rootScope.cart_items_count);
        };
        $scope.do_surprise = function (category_id) {

            window.location = $rootScope.get_suprise_url();
        };



        $rootScope.range = function (min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step)
                input.push(i);
            return input;
        };

        $rootScope.splitIntoRows = function (arr, len) {


            var chunks = [],
                    i = 0,
                    n = arr.length;

            while (i < n) {
                chunks.push(arr.slice(i, i += len));
            }

            console.log(chunks);
            return chunks;
        };

        $rootScope.get_products = function (category_id) {
            $(".left_submenu").removeClass("hide");
            $rootScope.selectedCatId = category_id;
            $scope.loaded = 0;
            $rootScope.productsCount = 0;
            $rootScope.productsRows = 1;
            var data = '';
            var api_call = SITE_URL + "ajax/products/" + category_id;

            console.log(api_call);
            $http.get(api_call, {cache: true,
                params: {category_id: category_id},
            }).success(function (data) {
                $scope.loaded = 1;
                console.log(data);

                if (typeof (data) != 'undefined') {
                    //$location.path("/products/").replace();
                    $rootScope.products = $rootScope.splitIntoRows(data, 3);
                    $rootScope.show_products = true;
                    $rootScope.productsCount = Object.keys(data).length;
                    $rootScope.productsRows = $rootScope.productsCount % 3 > 0 ? ($rootScope.productsCount / 3 + 1) : $rootScope.productsCount / 3;

                    //$('.after_added').hide();
                    //  $('.before_added').show();

                }
            });

        };

        $rootScope.get_product = function (entity_id, type) {

            var count = 0;
            count = $rootScope.getDupCounter({entity_id:entity_id});
            if( count > 0 ){
                return;
            }
            var data = '';
            var api_call = SITE_URL + "ajax/product/" + entity_id;
            $rootScope.productDetails = '';

            //console.log(api_call);
            $http.get(api_call, {cache: true,
                params: {entity_id: entity_id},
            }).success(function (data) {
                $scope.loaded = 1;
                console.log(data);

                if (typeof (data) != 'undefined') {
                    //$location.path("/products/").replace();
                    $rootScope.productDetails = data;

                    if (type == 'more-info')
                        $('#more-info').modal();
                    else
                        $('#nutrition_popup').modal();
                }
            });

        };
    }]);

//app.controller('index', ['$scope', '$http', function($scope,$http) {

app.controller('productsgrid', ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
        $scope.loaded = 0;
        $rootScope.show_products = false;
        //$scope.products = productService.getProducts();
        $scope.handleScrollToTop = function () {
            console.log("TOP!");
        };

        $scope.handleScrollToBottom = function () {
            console.log("BOTTOM!");
        };

    }]);
app.controller('leftmenu', ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

        //$scope.products = productService.getProducts();

    }]);
//app.controller('pantry', ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
app.controller('pantry', ['$scope', '$http', '$filter', '$rootScope', '$cookies', function ($scope, $http, $filter, $rootScope, $cookies) {



        $scope.do_checkout = function () {
            if ($rootScope.cart_items_count >= $rootScope.box_size) {
                /*for(var x in $rootScope.cart){
                 var entityId = $rootScope.cart[x];
                 if(entityId in $rootScope.cart_unique_items){
                 var item = $rootScope.cart_unique_items[entityId];
                 fireCheckoutEvents(item["average_rating"]["stars"], item["name"]);
                 }
                 }*/
                fireCheckoutEvents();

                var url_offset = $rootScope.get_suprise_url();
                var products_url_offset = "&product_ids=" + $rootScope.cart.join();
                url_offset = url_offset + products_url_offset;
                //console.log("goto:"+url_offset);
                window.location = url_offset;
            }
        };

        /*  $scope.setBoxsize = function (val) {
         $rootScope.box_size = val;
         fireBoxSizeEvent(val + " snacks", $rootScope.frequencies[$rootScope.delivery_frequency]);
         
         };
         
         $scope.setDeliveryFrequency = function (val) {
         $rootScope.delivery_frequency = val;
         fireDeliverFrequencyEvent($rootScope.box_size + " snacks", $rootScope.frequencies[$rootScope.delivery_frequency]);
         };*/

        $scope.setBoxsize = function (val) {
            $('.knob').trigger('configure', {
                "max": val,
            });
            fireBoxSizeEvent(val + " snacks");
        };

        $scope.setDeliveryFrequency = function (val) {
            fireDeliverFrequencyEvent($rootScope.frequencies[val]);
        };

        $rootScope.show_plan = 1;
        $scope.save_plan = function (boxSize, deliverFrequency, redirectFlag) {
            console.log(boxSize + " = " + deliverFrequency);
            $rootScope.show_plan = 0;
            $rootScope.box_size = boxSize;
            $rootScope.delivery_frequency = deliverFrequency;
            savePlanEvent(boxSize, deliverFrequency);
            $cookies.put('box_size', $rootScope.box_size,{"path":"/"});
            $cookies.put('delivery_frequency', $rootScope.delivery_frequency,{"path":"/"});
             console.log($cookies.get('box_size'));
            if (redirectFlag == 1) {
                window.location = CATEGORY_URL;
            }
            
        };

        $rootScope.display_plan_box = function () {
            $rootScope.show_plan = 1;
        };

    }]);


//validation

app.directive('nksOnlyNumber', function () {
    return {
        restrict: 'EA',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                var spiltArray = String(newValue).split("");
                if (attrs.allowNegative == "false") {
                    if (spiltArray[0] == '-') {
                        newValue = newValue.replace("-", "");
                        ngModel.$setViewValue(newValue);
                        ngModel.$render();
                    }
                }
                if (attrs.allowDecimal == "false") {
                    newValue = parseInt(newValue);
                    ngModel.$setViewValue(newValue);
                    ngModel.$render();
                }
                if (attrs.allowDecimal != "false") {
                    if (attrs.decimalUpto) {
                        var n = String(newValue).split(".");
                        if (n[1]) {
                            var n2 = n[1].slice(0, attrs.decimalUpto);
                            newValue = [n[0], n2].join(".");
                            ngModel.$setViewValue(newValue);
                            ngModel.$render();
                        }
                    }
                }
                if (spiltArray.length === 0)
                    return;
                if (spiltArray.length === 1 && (spiltArray[0] == '-' || spiltArray[0] === '.'))
                    return;
                if (spiltArray.length === 2 && newValue === '-.')
                    return;
                /*Check it is number or not.*/
                if (isNaN(newValue)) {
                    ngModel.$setViewValue(oldValue || '');
                    ngModel.$render();
                }
            });
        }
    };
});

app.directive('execOnScrollToTop', function () {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var fn = scope.$eval(attrs.execOnScrollToTop);

            element.on('scroll', function (e) {

                if (!e.target.scrollTop) {
                    console.log("scrolled to top...");
                    scope.$apply(fn);
                }

            });
        }

    };

});



app.directive('execOnScrollToBottom', function () {
    return {
        restrict: 'A',
        link: function ($rootScope, element, attrs) {
            console.log(attrs.execOnScrollToBottom)
            console.log($rootScope.$eval(attrs.execOnScrollToBottom));
            var fn = $rootScope.$eval(attrs.execOnScrollToBottom),
                    clientHeight = element[0].clientHeight;
            console.log(clientHeight)
            element.on('scroll', function (e) {
                var el = e.target;
                console.log(clientHeight)
                console.log(el.scrollHeight - el.scrollTop)
                if ((el.scrollHeight - el.scrollTop) === clientHeight) { // fully scrolled
                    console.log("scrolled to bottom...");
                    $rootScope.$apply(fn);
                }
            });
        }

    };

});

function sticky_relocate() {
    var window_top = $(window).scrollTop();
    var div_top = $('#sticky-anchor').offset().top;
    if (window_top > div_top) {
        $('#sticky').addClass('stick');
    } else {
        $('#sticky').removeClass('stick');
    }
}

$(function () {
    $(window).scroll(function () {
        if ($("#main-content .heading").first().css("display") == "block") {
            sticky_relocate();
        }
    });
    $(document).on("click", ".more-finfo", function (e) {
        e.stopPropagation();
        return false;
    });
    $(document).on("click", ".nutrition", function (e) {
        e.stopPropagation();
        return false;
    });
    $(document).on("click", ".icon_cnt", function (e) {
        e.stopPropagation();
        return false;
    });
    $(document).on("click", ".product-topdesc", function (e) {
        var entityId = $(this).attr("entity-id");
        //angular.element($('.productsgrid')).rootScope().get_product(entityId,'more-info');    
        var microappscope = angular.element($(".prod-section")).scope();
        microappscope.get_product(entityId, 'more-info');
        return false;
    });
    

});