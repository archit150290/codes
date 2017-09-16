<?php $nbUrl = "https://naturebox.com"; ?>
<!doctype html>
<html lang="en">
    <head>

        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="keywords" content="">






        <title>Get Started</title>

        <link rel="stylesheet" href="<?php echo Router::url('/', true); ?>css/bootstrap.css">
        <link rel="stylesheet" href="<?php echo Router::url('/', true); ?>css/animate.css">
        <link rel="stylesheet" href="<?php echo Router::url('/', true); ?>css/font-awesome.css">
        <link rel="stylesheet" href="<?php echo Router::url('/', true); ?>css/material.css">
        <link rel="stylesheet" href="https://naturebox.com/nm-assets/css/catalog-f775249db3.css">
        <link rel="stylesheet" href="<?php echo Router::url('/', true); ?>css/hero-banner.css">
        <link rel="stylesheet" href="<?php echo Router::url('/', true); ?>css/main.css">
        <link href="https://fonts.googleapis.com/css?family=Archivo+Narrow|Roboto:400,700|Raleway:400,500,600" rel="stylesheet" type="text/css">
        <link rel="canonical" href="http//www.naturebox.com" />
            <link rel="canonical" href="http//www.naturebox.com" />
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
        <script src="https://code.angularjs.org/1.5.3/angular-cookies.js"></script>
        <script type="text/javascript" src="<?php echo Router::url("/", true); ?>js/jquery2.1.0.js"></script> 
        <script type="text/javascript" src="<?php echo Router::url("/", true); ?>js/app.js"></script> 
        <script> SITE_URL = '<?php echo Router::url('/', true); ?>';</script>
        <script> CATEGORY_URL = '<?php echo Router::url(array("action" => "display", "controller" => "pages", 'home')); ?>';</script>
        <?php echo $this->element("tracker"); ?>
    </head>
    <body id="non-members" class="home" style="-webkit-overflow-scrolling: touch;" ng-app="naturebox">
        <div class="off-canvas-wrap" data-offcanvas>
            <div class="inner-wrap">
                <?php echo $this->element('header'); ?>

                <div id="home" class="v2">





                    <section>
                        <div class="hero_banner" style="cursor: pointer" >
                            <div class="container">
                                <div class="row">

                                    <div class="flush-left" ng-controller="pantry">
                        <!--<img src="images/offer.png" alt="">-->
                                        <div class="selectPantry">
                                            <h1>Get <span>50%</span> off today!</h1>
                                            <div class="choose_num">
                                                <label>Choose the number of snacks per box: </label>
                                                <div class="form clearfix">
                                                    <p>
                                                        <input type="radio" checked="" id="5snack" value="5" ng-model="box_size" ng-click="setBoxsize(5)" name="box_size">
                                                        <label for="5snack"><span>5</span> Snacks</label>
                                                    </p>
                                                    <p>
                                                        <input type="radio" id="10snack" value="10" ng-model="box_size" ng-click="setBoxsize(10)" name="box_size">
                                                        <label for="10snack"><span>10</span> Snacks</label>
                                                    </p>
                                                </div>

                                            </div>
                                            <div class="choose_freq clearfix">
                                                <label>Choose your delivery frequency:  </label>

                                                <div class="form">
                                                    <p>
                                                        <input type="radio" checked="" id="weekly" value="weekly" ng-model="delivery_frequency" ng-click="setDeliveryFrequency('weekly')" name="delivery_frequency">
                                                        <label for="weekly">Once A Week</label>
                                                    </p>
                                                    <p>

                                                        <input type="radio" id="biweekly" value="biweekly" ng-model="delivery_frequency" ng-click="setDeliveryFrequency('biweekly')" name="delivery_frequency">
                                                        <label for="biweekly">Every Two Weeks</label>
                                                    </p>
                                                    <p>
                                                        <input type="radio" id="monthly" value="monthly" ng-model="delivery_frequency" ng-click="setDeliveryFrequency('monthly')" name="delivery_frequency">
                                                        <label for="monthly">Once A Month</label>
                                                    </p>
                                                </div>

                                            </div>
                                        </div>
                                        <div class="discountBg">
                                            <div class="discount_price">
                                                <p><span>50%</span> off on first box, REG <span>{{reg_prices[box_size]| currency}}</span></p>
                                                <div class="shipping">
                                                    $<span>{{final_prices[box_size]}}</span>
                                                </div>
                                                
                                            </div>

                                                                                        <a href="javascript:void(0)" class="btn_orange_big btn-checkout" ng-click="save_plan(box_size, delivery_frequency, 1)" >Get Started</a>
                                        </div>

                                        <div class="shorttxt">*Prices in USD and shipping for Canadian members is $4.95 USD.</div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div id="product-promise" class="section dark-bg text-center" ng-controller="index">
                            <h2 class="header"><span>Why Naturebox?</span></h2>
                            <div class="row section">
                                <div class="icon-smart-snack columns text-center">
                                    <h3>Don't like it, don't eat it</h3>
                                    <p>We’ll replace any snack you don’t like for free in your next box.</p>
                                </div>
                                <div class="icon-on-schedule columns text-center">
                                    <h3>Snacks with benefits</h3>
                                    <p>Commitment free snacking–change, skip or cancel at any time.</p>
                                </div>
                                <div class="icon-free-ship columns text-center">
                                    <h3>Free Shipping</h3>
                                    <p>Conveniently ships to your door anywhere in the US for free.</p>
                                </div>
                            </div>
                        </div>


                        <div id="our-snacks" class="buffer-p">
                            <div class="row">
                                <div class="columns">
                                    <h2 class="header text-center"><span>Our Snacks</span></h2>
                                    <p class="center-tablet-up">Finding a range of options&mdash;from healthy to indulgent&mdash;to satisfy any craving should be easy. Our snacks fit into a balanced diet and can meet your specific needs (non-GMO, vegan) and taste preferences. <a href="<?php echo $nbUrl; ?>/foods">Learn more.</a> </p>
                                </div>
                            </div>

                            <div class="row no-list">
                                <h3 class="header text-center"><span>We guarantee</span></h3>
                                <ul class="no-padding columns large-5 large-offset-1 large-uncentered small-6 small-centered">
                                    <li>Simple ingredients</li>
                                    <li>No artificial junk <br />(colors, flavors or sweeteners)</li>
                                </ul>
                                <ul class="no-padding columns large-5 large-offset-1 large-uncentered small-6 small-centered end">
                                    <li>No high fructose corn syrup</li>
                                    <li>No MSG</li>
                                    <li>Less than 200 calories per serving</li>
                                </ul>
                            </div>

                            <div class="row text-center">
                                <button class="cta radius button section jump" data-reveal-id="choose-snacks-modal">Get started</button>
                                <a href="<?php echo $nbUrl; ?>/foods" class="disclaimer block">Learn more about our snacks</a>
                            </div>
                        </div>

                        <div id="how-it-works" class="row buffer text-center">
                            <h2 class="header"><span>How it works</span></h2>
                            <div class="icon-pick-plan columns large-4">
                                <h3>Pick your plan</h3>
                                <p>Tell us your team size to create the perfect snacking program for your office.</p>
                            </div>
                            <div class="icon-pick-snacks columns large-4">
                                <h3>Pick your snacks</h3>
                                <p>Choose from over 50 delicious snacks made from ingredients you can trust.</p>
                            </div>
                            <div class="icon-enjoy columns large-4">
                                <h3>Enjoy</h3>
                                <p>Change your membership anytime. Enjoy easy delivery and flexible options.</p>
                            </div>
                        </div>

                        <div id="for-everyone">
                            <div class="snack-image hide bleed"></div>
                            <div class="row">
                                <div class="columns">
                                    <h2 class="header text-center"><span>New snacks every month</span></h2>
                                    <p class="center-tablet-up">Who doesn’t love options? We launch 3-4 new snacks every month so there's always something new to try. Rate your snacks and we'll make personalized recommendations.</p>
                                </div>
                            </div>
                        </div>


                        <ul class="corporate-logos buffer slick row">
                            <li><a href="http://www.usatoday.com/story/money/2015/09/16/study-says-snacks-affect-happiness-at-work/72259746/" target="_blank"><span class="logo-usatoday" target="_blank"></span></a></li>
                            <li><a href="http://images.burrellesluce.com/image/4006CE/4006CE_181" target="_blank"><span class="logo-inc"></span></a></li>
                            <li><a href="http://www.shape.com/healthy-eating/cooking-ideas/15-pumpkin-spice-foods-and-drinks-you-can-feel-good-about-eating" target="_blank"><span class="logo-shape"></span></a></li>
                            <li><a href="http://kidscooking.about.com/od/after-school-snacks/ss/Healthy-Snacks-to-Stave-Off-the-Back-to-School-Munchies.htm#step13" target="_blank"><span class="logo-about"></span></a></li>
                            <li><a href="http://www.entrepreneur.com/article/250639" target="_blank"><span class="logo-entre"></span></a></li>
                            <li><a href="http://www.examiner.com/article/snack-healthier-this-fall-with-naturebox" target="_blank"><span class="logo-examiner"></span></a></li>
                            <li><a href="http://www.reviewjournal.com/sponsored-content/6-easy-tips-avoid-calorie-overload-during-the-holidays" target="_blank"><span class="logo-lvreview"></span></a></li>
                        </ul>

                        <div id="testimonials" class="row buffer">
                            <div class="slick-2">
                                <div class="columns large-4 small-12 text-center">
                                    <div class="avatar"></div>
                                    <div class="comments">"I am so impressed with your customer service! Your representatives go above and beyond and your snacks are delicious!" <div>- Robin N., Orlando, FL</div></div>
                                </div>
                                <div class="columns large-4 small-12 text-center">
                                    <div class="avatar n-1"></div>
                                    <div class="comments">"Everytime I try a new snack I'm blown away." <div>- Candice J., Columbia, SC</div></div>
                                </div>
                                <div class="columns large-4 small-12 text-center">
                                    <div class="avatar n-2"></div>
                                    <div class="comments">"My family and I are loving NatureBox. We stopped buying snacks at the store and wait for our monthly box!" <div>Pamela K., Weaverville, NC</div></div>
                                </div>
                            </div>
                        </div>



                        <div id="choose-snacks-modal" class="reveal-modal choose-snacks-modal" data-reveal aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
                            <div id="choose-plan" class="pick-plan">
                                <section class="snack-count on-modal">
                                    <div class="row">
                                        <h2 class="header"><span>Choose your plan</span></h2>
                                        <div class="button-group toggle">
                                            <label class="title text-left">How many snacks per box?</label>
                                            <p>Our snacks come in a resealable bag with 3-5 servings per bag.</p>
                                            <div class="hide-for-tablet-down">
                                                <div class="radio-box">
                                                    <input type="radio" name="employees" value="1" id="5snacks" class="choose-size" data-toggle="button" checked="checked">
                                                    <label class="radio" for="5snacks">5 snacks</label>
                                                </div>
                                                <div class="radio-box" >
                                                    <input type="radio" name="employees" value="2" id="10snacks" class="choose-size" data-toggle="button">
                                                    <label class="radio" for="10snacks">10 snacks</label>
                                                </div>
                                            </div>
                                            <div class="show-for-tablet-down">
                                                <select class="choose-size">
                                                    <option value="1">5 Snacks</option>
                                                    <option value="2">10 Snacks</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section class="frequency on-modal text text-center">
                                    <div class="row">
                                        <div class="button-group toggle section">
                                            <div class="hide-for-tablet-down">
                                                <label class="title text-left">How frequently do you want snacks?</label>
                                                <div class="radio-box">
                                                    <input type="radio" name="frequency" value="1" id="every-week" class="choose-frequency" data-toggle="button2">
                                                    <label class="radio-inline" for="every-week">Every week</label>
                                                </div>
                                                <div class="radio-box">
                                                    <input type="radio" name="frequency" value="2" id="every-two-weeks" class="choose-frequency" data-toggle="button2" checked="checked">
                                                    <label class="radio-inline" for="every-two-weeks">Every 2 weeks</label>
                                                </div>
                                                <div class="radio-box">
                                                    <input type="radio" name="frequency" value="3" id="every-month" data-toggle="button2" class="choose-frequency">
                                                    <label class="radio-inline" for="every-month">Every Month</label>
                                                </div>
                                            </div>
                                            <div class="show-for-tablet-down">
                                                <select class='choose-frequency'>
                                                    <option value="2">Every 2 weeks</option>
                                                    <option value="1">Every week</option>
                                                    <option value="3">Every month</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row pricing-box">
                                        <div class="price-box text-center">
                                            <div class="price"><span>$</span><span class="first-box-price amount">9.97</span></div>
                                            <div class="shipping">+FREE SHIPPING*</div>
                                            <div class="reg">50% off on first box, REG $<span class="reg-price amount">19.95</span></div>
                                        </div>
                                    </div>
                                    <div class="row section text-center">
                                        <button id="choose-snacks-button" class="cta radius button section go-next go-choose-snacks">Choose your snacks</button>
                                        <div class="disclaimer">*Prices in USD and shipping for Canadian members is $4.95 USD.</div>
                                    </div>
                                </section>
                            </div>
                            <a class="close-reveal-modal" aria-label="Close">&#215;</a>
                        </div>

                    </section>
                </div>

                

                <footer>
                    <ul class="nb-links">
                        <li class="tablet-hide"><a href="<?php echo $nbUrl; ?>/about-us">About Us</a></li>
                        <li><a href="//support.naturebox.com">FAQs</a></li>
                        <li class="tablet-hide"><a href="<?php echo $nbUrl; ?>/jobs">Jobs</a></li>
                        <li class="tablet-hide"><a href="<?php echo $nbUrl; ?>/press">Press</a></li>
                        <li><a href="//office.naturebox.com">Office Snacks</a></li>
                        <li><a href="http://blog.naturebox.com">Blog</a></li>
                        <li class="tablet-hide"><a href="<?php echo $nbUrl; ?>/foods">About Our Snacks</a></li>
                        <li><a href="<?php echo $nbUrl; ?>/happysnackers">Community</a></li>
                        <li><a href="<?php echo $nbUrl; ?>/privacy">Privacy</a></li>
                        <li><a href="<?php echo $nbUrl; ?>/terms">Terms</a></li>
                    </ul>
                    <div className="copyright">&copy; 2016 NatureBox. All Rights Reserved</div>
                </footer>

                <aside class="left-off-canvas-menu">
                    <div class="member member-menu">
                        <a class="login" href="<?php echo $nbUrl; ?>/mydashboard">sign in</a>
                    </div>
                    <dl class="snacks-holder">
                        <dt class="snacks">Our Snacks</dt>

                        <dd class="link"><a class="Baked Treats" href="<?php echo $nbUrl; ?>/browse/baked-treats">Baked Treats</a></dd>


                        <dd class="link"><a class="Chips, Pretzels &amp; Dips" href="<?php echo $nbUrl; ?>/browse/chips-pretzels">Chips, Pretzels &amp; Dips</a></dd>


                        <dd class="link"><a class="Dried Fruit, Chews" href="<?php echo $nbUrl; ?>/browse/dried-fruit-chews">Dried Fruit, Chews</a></dd>


                        <dd class="link"><a class="Fruit &amp; Nut Bars, Clusters" href="<?php echo $nbUrl; ?>/browse/fruit-nut-bars-clusters">Fruit &amp; Nut Bars, Clusters</a></dd>


                        <dd class="link"><a class="Good source of fiber" href="<?php echo $nbUrl; ?>/browse/good-source-of-fiber">Good source of fiber</a></dd>


                        <dd class="link"><a class="Good source of protein" href="<?php echo $nbUrl; ?>/browse/good-source-of-protein">Good source of protein</a></dd>


                        <dd class="link"><a class="Granola, Oatmeal" href="<?php echo $nbUrl; ?>/browse/granola">Granola, Oatmeal</a></dd>


                        <dd class="link"><a class="Jerky" href="<?php echo $nbUrl; ?>/browse/jerky">Jerky</a></dd>


                        <dd class="link"><a class="Less than 10g of sugar" href="<?php echo $nbUrl; ?>/browse/less-than-10g-of-sugar">Less than 10g of sugar</a></dd>


                        <dd class="link"><a class="Less than 150 calories " href="<?php echo $nbUrl; ?>/browse/less-than-150-calories">Less than 150 calories </a></dd>


                        <dd class="link"><a class="Less than 15g of carbs" href="<?php echo $nbUrl; ?>/browse/less-than-15g-of-carbs">Less than 15g of carbs</a></dd>


                        <dd class="link"><a class="Low Sodium" href="<?php echo $nbUrl; ?>/browse/low-sodium">Low Sodium</a></dd>


                        <dd class="link"><a class="No sugar added" href="<?php echo $nbUrl; ?>/browse/no-sugar-added">No sugar added</a></dd>


                        <dd class="link"><a class="Non-GMO" href="<?php echo $nbUrl; ?>/browse/non-gmo">Non-GMO</a></dd>


                        <dd class="link"><a class="Nuts, Seeds, Nut Mixes" href="<?php echo $nbUrl; ?>/browse/nuts-seeds">Nuts, Seeds, Nut Mixes</a></dd>


                        <dd class="link"><a class="Popcorn" href="<?php echo $nbUrl; ?>/browse/popcorn">Popcorn</a></dd>


                        <dd class="link"><a class="Premium Add-Ons" href="<?php echo $nbUrl; ?>/browse/add-on-snacks">Premium Add-Ons</a></dd>


                        <dd class="link"><a class="Vegan" href="<?php echo $nbUrl; ?>/browse/vegan">Vegan</a></dd>


                    </dl>

                    <dl class="learn-list">
                        <dt class="learn">learn</dt>
                        <dd class="link"><a class="storelocator" href="<?php echo $nbUrl; ?>/storelocator">Find us at Target</a></dd>
                        <dd class="link"><a class="invite" href="<?php echo $nbUrl; ?>/invite">Free Snacks</a></dd>
                        <dd class="link"><a class="foods" href="<?php echo $nbUrl; ?>/foods">About our snacks</a></dd>
                        <dd class="link"><a class="about" href="<?php echo $nbUrl; ?>/about-us">About NatureBox</a></dd>
                        <dd class="link"><a class="blog" href="http://blog.naturebox.com/">Blog</a></dd>
                        <dd class="link"><a class="jobs" href="<?php echo $nbUrl; ?>/jobs">Work @ NatureBox</a></dd>
                        <dd class="link"><a class="help" href="//support.naturebox.com/hc/en-us">Help</a></dd>
                    </dl>
                </aside>

                <a class="exit-off-canvas"></a>
            </div>
        </div> 


        <script type="text/javascript" src="https://naturebox.com/nm-assets/js/bundle-c7456e8555.min.js"></script>

        <script type="text/javascript" src="https://naturebox.com/nm-assets/js/vendor/slick.min.js"></script>
          
  

  <script type="text/javascript">
  $('.slick').slick({
      infinite: false,
      slidesToShow: 4,
      slidesToScroll: 4,
      variableWidth: true,
      centerMode: false,
      speed: 1000,
      dots: true,
      responsive: [{
        breakpoint: 500,
        settings: {
          slidesToScroll: 2,
          slidesToShow: 2,
          arrows: false
        }
      }, {
        breakpoint: 680,
        settings: {
          slidesToScroll: 3,
          slidesToShow: 3
        }
      }, {
        breakpoint: 850,
        settings: {
          slidesToScroll: 4,
          slidesToShow: 4
        }
      }, {
        breakpoint: 1000,
        settings: {
          slidesToScroll: 5,
          slidesToShow: 5
        }
      }]
  });

  $('.slick-2').slick({
      dots: true,
      slidesToScroll: 3,
      slidesToShow: 3,
      responsive: [{
        breakpoint: 600,
        settings: {
            slidesToScroll: 1,
            slidesToShow: 1,
            arrows: false
        }
      }]
  });
</script>
        <?php echo $this->element("owa_analytics_events"); ?>

  <script type="text/javascript">
    NB.addChoosePlanFunctionality();
  </script>



    </body>
</html>
