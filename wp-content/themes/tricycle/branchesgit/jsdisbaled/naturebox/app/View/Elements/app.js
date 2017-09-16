'use strict';
var owa_visitor_id = 0;
$(document).load(function (){
    setTimeout(function (){
//        owa_visitor_id = OWA.getState( 'v', 'vid' );
//        alert(owa_visitor_id);
    },150);
    
});
var app = angular.module('naturebox', []);
var natureboxUrl = "https://naturebox.com";
app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }]);

//app.controller('index', ['$scope', '$http', function($scope,$http) {
app.controller('index', ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
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
        $rootScope.box_size = 10;
        $rootScope.delivery_frequency = "biweekly";
        
        
        
        $rootScope.get_suprise_url = function () {
            var url = natureboxUrl + '/checkout?sku=';
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

            if ($rootScope.cart_items_count < $rootScope.box_size) {
                $rootScope.show_plan = 1;
                $rootScope.cart.push(objProduct.entity_id);
                $rootScope.cart_items_count = $rootScope.cart.length;
                $rootScope.cart_unique_items[objProduct.entity_id] = objProduct;
                fireProductAdded(objProduct.name);
                var rating = 0;
                if (objProduct.average_rating.stars != "") {
                    rating = objProduct.average_rating.stars;
                }
                if (rating < 0.1) {
                    rating = 0;
                }
                
                if (rating > 0) {
                    fireRatingEvent(rating, filterName(objProduct.name));
                }

                fireSpecialAttrEvents(objProduct);
                //$rootScope.show_plan = 0;
            }
            console.log($rootScope.cart_items_count + "--" + $rootScope.box_size);

            console.log($rootScope.cart_unique_items);
            console.log("cart_items_count: " + $rootScope.cart_items_count);
        };
        $rootScope.remove_item = function (index, entity_id) {
            if (index > -1) {
                $rootScope.cart.splice(index, 1);
            }
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

            if (duplicates == 0) {
                delete $rootScope.cart_unique_items[entity_id];
            }
            $rootScope.cart_items_count = $rootScope.cart.length;

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

            
            $http.get(api_call, {cache: true,
                params: {category_id: category_id},
            }).success(function (data) {
                $scope.loaded = 1;
                

                if (typeof (data) != 'undefined') {
                    $rootScope.products = $rootScope.splitIntoRows(data, 3);
                    $rootScope.show_products = true;
                    $rootScope.productsCount = Object.keys(data).length;
                    $rootScope.productsRows = $rootScope.productsCount % 3 > 0 ? ($rootScope.productsCount / 3 + 1) : $rootScope.productsCount / 3;



                }
            });

        };
    }]);

//app.controller('index', ['$scope', '$http', function($scope,$http) {

app.controller('productsgrid', ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {
        $scope.loaded = 0;
        $rootScope.show_products = false;
        //$scope.products = productService.getProducts();

    }]);
app.controller('leftmenu', ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {

        //$scope.products = productService.getProducts();

    }]);
app.controller('pantry', ['$scope', '$http', '$filter', '$rootScope', function ($scope, $http, $filter, $rootScope) {


        $scope.do_checkout = function () {
            if ($rootScope.cart_items_count >= $rootScope.box_size) {
                fireCheckoutEvents();
                var url_offset = $rootScope.get_suprise_url();
                var products_url_offset = "&product_ids=" + $rootScope.cart.join();
                url_offset = url_offset + products_url_offset;
                
                window.location = url_offset;
            }
        };

        $scope.setBoxsize = function (val) {
            fireBoxSizeEvent(val + " snacks");
        };

        $scope.setDeliveryFrequency = function (val) {
            //$rootScope.delivery_frequency = val;
            fireDeliverFrequencyEvent($rootScope.frequencies[val]);
        };
        $rootScope.show_plan = 1;
        $scope.save_plan = function (boxSize, deliverFrequency) {
            console.log(boxSize + " = " + deliverFrequency);
            $rootScope.show_plan = 0;
            $rootScope.box_size = boxSize;
            $rootScope.delivery_frequency = deliverFrequency;
            savePlanEvent(boxSize, deliverFrequency);
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

});