<!DOCTYPE html>
<!--[if lte IE 8]>                  <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" xml:lang="en" lang="en"> <!--<![endif]-->

    <head>

        


        <!-- Layout-simple-header -->
        <!--  Background image courtesy of Subtle Patterns (Subtle Patterns) / CC BY-SA 3.0-->
        <meta http-equiv="Content-Type" content="" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
        <meta name="keywords" content="" />
        <meta name="robots" content="" />
        <meta property="og:image" content="https://naturebox.com/skin/frontend/naturebox/default/images/logo_739x739.1464283634.jpg" />

        <link rel="icon" href="https://naturebox.com/skin/frontend/naturebox/default/favicon16.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="https://naturebox.com/skin/frontend/naturebox/default/favicon32.ico" type="image/x-icon" />
        <link href='https://fonts.googleapis.com/css?family=Archivo+Narrow|Roboto:400,700|Raleway:400,600' rel='stylesheet' type='text/css'>
        <script type="text/javascript">
            var SITE_URL = '<?php echo Router::url("/", true); ?>';
            var VISITOR_ID = '<?php echo time(); ?>';
            var API_URL = SITE_URL+'api/index';
        </script>
        <!--[if lt IE 7]>
        <script type="text/javascript">
        //<![CDATA[
            var BLANK_URL = 'https://naturebox.com/js/blank.html';
            var BLANK_IMG = 'https://naturebox.com/js/spacer.1464283633.gif';
        //]]>
        </script>
        <![endif]-->



        <link rel="stylesheet" href="https://naturebox.com/skin/frontend/naturebox/default/css/checkout.1464283908.css" /> 
        <title>Sign Up For NatureBox</title>

        <!-- TrackJs -->
    <!--    <script type="text/javascript" src="//d2zah9y47r7bi2.cloudfront.net/releases/current/tracker.js" data-token="bafcab47722841aabddefb603566a69f"></script> -->

<!--        <script type="text/javascript" src="<?php echo $jsUrl; ?>jquery2.1.0.js"></script> -->
        <script src="https://naturebox.com/skin/frontend/naturebox/default/js/vendor/custom.modernizr.1464283634.js"></script>
    </head>
    <body class=" checkout-index-index">

        <header>
            <div class="wrapper">
                <div class="inner-bar">
                    <div class="help"><span class="bold">need help?</span> 888.613.6998</div>
                </div>
                <div class="row sticky-bar">
                    <div class="inner-bar">
                        <div id="logo" class="medium-5 large-6 columns">
                            <div class="logo"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/natureboxlogo_large.1464283634.png" width="280" height="25" /></div>
                            <div class="page-title"></div>
                        </div>
                        <div class="medium-7 large-6 columns menu-bar navigation">
                            <section class="header-account"></section>
                        </div>
                    </div>
                </div><!---row-->
            </div>
        </header>

        <div id="checkout">

            <div class="header row">
                <div class="columns small-12">
                    <div class="flex-container">
                        <div class="flex-item logo">
                            <img src="https://naturebox.com/skin/frontend/naturebox/default/images/natureboxlogo_large.1464283634.png">
                        </div><!-- flex-item -->
                        <div class="flex-item secure-checkout">
                            <h1><i class="fa fa-lock"></i> secure checkout</h1>
                        </div><!-- flex-item -->
                        <div class="flex-item contact">
                            <div class="hide-for-large-up"><span class="help hide-for-large-up">Need some help?</span> Give us a call <a href="tel:1-888-613-6998">888.613.6998</a></div>
                            <div class="show-for-large-up"><span class="help">Need some help?</span> Give us a call 888.613.6998</div>
                        </div><!-- flex-item -->
                    </div><!-- flex-container -->
                </div>
            </div>
            <div class="row top message ">
                <div class="columns small-12">
                    <span class="positioner">Choose snacks for your first box in the next step, or let us surprise you with our most popular snacks.</span>
                </div>
            </div>
            <div class="main row">
                <section id="step1" class="columns large-4">

                    <div class="step">
                        <div class="eaddress">
                            <div class="title i">member</div>

                            <div class="aform">
                                <div class="row gift-only ship">
                                    <div class="columns small-6"><input type="text" name="firstname" placeholder="first name" /></div>
                                    <div class="columns small-6"><input type="text" name="lastname" placeholder="last name" /></div>
                                </div>
                                <div class="row">
                                    <div class="aemail columns">
                                        <input type="email" id="f-email" name="email" value="" placeholder="email address" />
                                    </div>
                                </div>
                                <input type="hidden" id="setpass" class="setpass" name="setpass" />
                                <div class="apass row">
                                    <div class="columns">
                                        <input type="password" id="f-pass" name="password" placeholder="create a password"  />
                                    </div>
                                    <div class="columns">
                                        <input type="password" id="f-pass2" name="password2" placeholder="verify password"  />
                                    </div>
                                </div>

                                <div class="row gift-only member bold">
                                    <div class="columns">Already a member? <a class="login">Sign in!</a></div>
                                </div><!--gift-only-->
                            </div><!--aform-->

                        </div><!--eaddress-->

                        <div class="ship">
                            <div class="title i">shipping address</div>
                            <form class="aform">
                                <div class="row">
                                    <div class="columns small-6 firstname"><input type="text" name="firstname" placeholder="first name" /></div>
                                    <div class="columns small-6 lastname"><input type="text" name="lastname" placeholder="last name" /></div>
                                </div>
                                <div class="row">
                                    <div class="columns"><input type="text" class="street" name="street1" placeholder="address line 1"   /></div>
                                </div>
                                <div class="row">
                                    <div class="columns"><input type="text" class="street" name="street2" placeholder="address line 2 (apartment#, etc. optional)" /></div>
                                </div>
                                <div class="row">
                                    <div class="columns small-5 city"><input type="text" name="city" placeholder="city" /></div>
                                    <div class="columns small-3 regions">
                                        <label class="s-arrow">
                                            <select class="region" name="region">
                                                <option value="" disabled="disabled">- -</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div class="columns small-4 zip"><input type="text" name="postcode" placeholder="zip/postal"  /></div>
                                </div>
                                <div class="row">
                                    <div class="columns small-8 phone"><input type="text" name="telephone" placeholder="phone number" pattern="\d*" /></div>
                                </div>
                                <div class="row">
                                    <div class="columns small-2 commercial-check">
                                        <div class="nb-check">
                                            <input type="checkbox" id="commercial" class="" name="is_commercial" />
                                            <label for="commercial"></label>
                                        </div>
                                    </div>
                                    <div class="columns small-10 commercial-label"><label for="commercial">this is an office address</label></div>
                                </div>
                            </form>
                        </div><!--ship-->

                        <div class="row">
                            <div class="columns small-7 small-centered"><button id="step1-button" class="button round tiny off continue">continue</button></div>
                        </div>
                    </div>
                </section>

                <section id="step2" class="columns large-4 off">

                    <div class="step payment">
                        <div class="title i">payment</div>

                        <div class="cc-form">
                            <div class="cform card">
                                <div class="line"></div>
                                <div class="info">
                                    <div class="row">
                                        <div class="columns small-8 cc_number"><input type="text" name="cc_number" placeholder="card number" pattern="\d*" /></div>
                                        <div class="columns small-4"><input type="text" name="cvv" placeholder="cvv" pattern="\d*" /></div>
                                    </div>
                                    <div class="exp">expiration date</div>
                                    <div class="row">
                                        <div class="columns small-5">
                                            <label class="s-arrow">
                                                <select name="expiration_month" >
                                                    <option value="" selected="selected" disabled="disabled">month</option>
                                                    <option value="1">01</option>
                                                    <option value="2">02</option>
                                                    <option value="3">03</option>
                                                    <option value="4">04</option>
                                                    <option value="5">05</option>
                                                    <option value="6">06</option>
                                                    <option value="7">07</option>
                                                    <option value="8">08</option>
                                                    <option value="9">09</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                </select>
                                            </label>
                                        </div>
                                        <div class="columns small-3 year">
                                            <label class="s-arrow">
                                                <select type="number" name="expiration_year" >
                                                    <option value="" selected="selected" disabled="disabled">Year</option>
                                                    <option value="2015">2015</option>
                                                    <option value="2016">2016</option>
                                                    <option value="2017">2017</option>
                                                    <option value="2018">2018</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2025">2025</option>
                                                    <option value="2026">2026</option>
                                                </select>
                                            </label>
                                        </div>
                                    </div>
                                </div><!--info-->
                            </div><!--cform-->
                            <div class="csaved card"></div>
                        </div><!--cc-->

                        <div class="bill">
                            <div class="address">
                                <div class="row checkbox-same-b">
                                    <div class="columns small-2">
                                        <div class="nb-check">
                                            <input type="checkbox" id="same-b" class="same-b" name="same-b" checked="checked" />
                                            <label for="same-b"></label>
                                        </div>
                                    </div>
                                    <div class="columns small-10 billlabel">
                                        <label for="same-b">billing address same as shipping*</label>
                                    </div>
                                </div>

                                <div class="title i gift-only">billing address</div>

                                <!-- DISABLED
                                       <div class="coupon">
                                         <div class="giftcodes"></div>
                                         <div class="row">
                                           <div class="columns small-8"><input id="coupon" type="text" placeholder="enter gift code" data-tip="gift code" /></div>
                                           <div class="columns small-4"><button class="button round tiny">apply</button></div>
                                         </div>
                                       </div>
                               
                                       <div class="gift-tip">
                                         <a class="">have a gift card code?</a>
                                         <div class="bubble">
                                           <span class="tri in"></span>
                                           <span class="tri out"></span>
                                           If your gift card covers the order total, no credit card is required. If you&#39;re starting a subscription, you may provide a credit card now to keep receiving snacks after your gift card is fully depleted.
                                         </div>
                                       </div>< !--gift-tip-- >
                                -->

                                <div class="coupon">
                                    Have a gift card? Check out our <a href="https://support.naturebox.com/hc/en-us/articles/212789787-I-received-an-e-gift-code-how-can-I-use-redeem-it-" target="_blank">FAQ page</a>.
                                </div><!-- coupon -->

                            </div>

                            <div class="row">
                                <div class="columns small-7 small-centered"><button id="step2-button" class="button round tiny off continue">continue</button></div>
                            </div>
                        </div><!--bill-->

                    </div><!--step-->
                </section>

                <section id="step3" class="columns large-4 off">
                    <div class="step">
                        <div class="title i">order summary</div>

                        <div class="plan">
                        </div><!--plan-->

                        <div class="quotes">
                            <div class="quote">
                                <div class="row">
                                    <div class="columns small-6">subtotal</div>
                                    <div class="columns small-4 amount"></div>
                                </div>
                                <div class="row">
                                    <div class="columns small-6">shipping</div>
                                    <div class="columns small-4 amount"></div>
                                </div>
                            </div><!--quote-->

                            <div class="row total bold">
                                <div class="columns small-6">total</div>
                                <div class="columns small-4 amount"></div>
                            </div>
                        </div><!--quotes-->

                        <div class="row">
                            <div id="order" class="columns small-8 small-centered"><button class="place-order button round tiny">place order</button></div>
                        </div>

                        <div class="m-sub m-term">
                            By clicking “place order” you acknowledge you have read and understand the NatureBox <a href="https://naturebox.comhttps://naturebox.com/terms" target="_blank">terms &amp; conditions</a> and authorize us to begin your NatureBox membership at &#36;<span class="price">19.95</span> <span class="shipping"></span> charged to the payment method provided each time your subscription renews, until you cancel.
                        </div><!-- .m-sub.m-term -->

                        <div class="m-alc m-term" style="display:none">By clicking "place order", you acknowledge you have read and understand the NatureBox <a href="https://naturebox.comhttps://naturebox.com/terms" target="_blank">terms &amp; conditions</a> and authorize us to charge the total above to the payment method provide.</div>
                        <div class="m-gift m-term" style="display:none">By clicking "place order", you acknowledge you have read and understand the NatureBox <a href="https://naturebox.comhttps://naturebox.com/terms" target="_blank">terms &amp; conditions</a> and authorize us to charge the total above to the payment method provide. We will email the recipient of your gift with instructions on how to claim their gift card.</div>
                    </div><!--step-->

                </section>
            </div><!--row main-->

            <div class="footer">
                <div class="top row hide-for-small-only">
                    <div class="small-4 small-offset-4 columns secure ">
                        <span class="secure"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-lock-darkgrey.1464283634.png" />This site is 256 bit encrypted and SSL secure.</span>
                    </div>
                    <div class="small-4 right columns payment-types ">
                        <!--            <div class="payment-types">-->
                        <span>accepted payment types</span>
                        <img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-bw-visa.1464283634.png" />
                        <img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-bw-mastercard.1464283634.png" />
                        <img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-bw-amex.1464283634.png" />
                        <img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-bw-discover.1464283634.png" />
                    </div>
                </div>
                <div class="top show-for-small-only">
                    <div class="row helpdesc">
                        <div class="columns small-12 small-text-center">We are here to help. Tap to call us.</div>
                    </div>
                    <div class="row phone">
                        <div class="columns small-12 small-text-center"><a href="tel:+18886136998">888.613.6998</a></div>
                    </div>
                </div>
                <div class="middle hide-for-small-only">
                    <div class="row">
                        <div class="small-4 columns">Secure Transactions</div>
                        <div class="small-4 columns">Easy Cancellation</div>
                        <div class="small-4 columns">Friendly Snack Concierges</div>
                    </div>
                    <div class="row">
                        <div class="small-4 columns light-purple">All transactions are safe and secure.</div>
                        <div class="small-4 columns light-purple">Cancel or pause online anytime.</div>
                        <div class="small-4 columns light-purple">Call us at 888.613.6998</div>
                    </div>
                </div>
                <div class="middle show-for-small-only">
                    <div class="row">
                        <div class="columns small-1 small-offset-2"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-lock-lightpurple.1464283634.png" /></div>
                        <div class="columns small-8 end ">Secure Transactions</div>
                    </div>
                    <div class="row">
                        <div class="columns small-1 small-offset-2"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-gift.1464283634.png" /></div>
                        <div class="columns small-8 end ">Easy Cancellation</div>
                    </div>
                    <div class="row">
                        <div class="columns small-1 small-offset-2"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-phone.1464283634.png" /></div>
                        <div class="columns small-8 end ">Friendly Snack Concierges</div>
                    </div>
                </div>
                <div class="bottom hide-for-small-only">
                    <div class="row">
                        <div class="small-4 columns"><img class="logo" src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/logo-160x24.1464283634.png" /></div>
                        <div class="small-4 centered columns end social">
                            <a href="https://www.facebook.com/NatureBox" target="_blank"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-fb.1464283634.png" /></a>
                            <a href="http://pinterest.com/naturebox/" target="_blank"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-pinterest.1464283634.png" /></a>
                            <a href="http://instagram.com/naturebox" target="_blank"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-instagram.1464283634.png" /></a>
                            <a href="http://twitter.com/naturebox" target="_blank"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-twitter.1464283634.png" /></a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="small-4 columns">Wholesome & nutritious snacks delivered</div>
                        <div class="small-4 centered columns">Copyright 2016 Naturebox Inc. All rights reserved.</div>
                        <div class="small-4 right columns"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-lock.1464283634.png" /><a href="https://naturebox.com/terms">Terms & conditions</a> | <a href="https://naturebox.comhttps://naturebox.com/privacy">Privacy policy</a></div>
                    </div>
                </div>
                <div class="bottom show-for-small-only">
                    <div class="row terms">
                        <div class="columns small-12 small-centered small-text-center"><a href="https://naturebox.comhttps://naturebox.com/terms" target="_blank">Terms & Conditions</a>&nbsp;|&nbsp;<a href="https://naturebox.com/privacy" target="_blank">Privacy Policy</a></div>
                    </div>
                    <div class="row lock">
                        <div class="columns small-12 small-centered small-text-center"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/64-lock-lightpurple.1464283634.png" /></div>
                    </div>
                    <div class="row logo">
                        <div class="columns small-12 small-centered small-text-center"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/foundation/checkout-clone/logo-160x24.1464283634.png" width="160"/></div>
                    </div>
                    <div class="row copyright">
                        <div class="columns small-12 small-cenetered small-text-center">Copyright 2016 NatureBox Inc. All Rights Reserved.</div>
                    </div>
                </div>
            </div>

        </div><!--#checkout-->
        <a id="friendbuy_widget"></a>

        <script type="text/javascript">
            var hostProtocol = (("https:" == document.location.protocol) ? "https" : "http");
            document.write('<scr' + 'ipt src="', hostProtocol +
                    '://5039.xg4ken.com/media/getpx.php?cid=ea7ac5c5-4ed2-4641-983c-e806678a386d', '" type="text/JavaScript"><\/scr' + 'ipt>');
        </script>
        <script id="login-template" type="text/x-handlebars-template">
            <div class="logo">
            <a class="logo" href="/"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/natureboxlogo_large.1464283634.png" width="260"/></a>
            </div>
            <div class="heading">{{ prompt }}</div>
            <form novalidate {{#action}}action={{.}}{{/action}}>
            <div class="fieldset-prompt">{{ fieldsetPrompt }}</div>
            <fieldset>
            <input type="email" id="auth-email" value="{{email}}" placeholder="email">
            <input type="password" id="auth-password", field="password" value="" placeholder="password">
            </fieldset>
            <button class="btn primary secure round small" id="auth-submit">submit</button>
            {{#errors}}
            <span class="errors">{{ errors }}</span>
            {{/errors}}
            <div><a id="auth-forgot-password" href="/forgotpassword">forgot your password?</a></div>
            </form>
            <div class="link">Not a member? <a href="/">Sign up!</a></div>
            {{#if closable }}
            <a class="close-reveal-modal">&times;</a>
            {{/if }}
        </script>
        <script id="co-regions" type="text/x-handlebars-template">
            <option value="" selected="selected" disabled="disabled">- -</option>
            <optgroup label="Canada">
            {{#each canadaRegions}}
            <option value="{{this.name}}">{{this.code}}</option>
            {{/each}}
            </optgroup>
            <optgroup label="United States">
            {{#each usRegions}}
            <option value="{{this.name}}">{{this.code}}</option>
            {{/each}}
            </optgroup>
        </script><script id="co-address" type="text/x-handlebars-template">
            <div class="shipping-address" data-firstname="{{firstname}}" data-lastname="{{lastname}}">{{firstname}} {{lastname}}</div>
            {{#each street}}
            <div class="shipping-address" data-street="{{this}}">{{this}}</div>
            {{/each}}
            <div class="shipping-address" data-city="{{city}}" data-region="{{region}}" data-postcode="{{postcode}}">{{city}}, {{region}} {{postcode}}</div>
            <div class="shipping-address" data-phone="{{telephone}}">{{telephone}}</div>
            <a class="edit" href="#">edit</a>
        </script>
        <script id="checkout-address-form" type="text/x-handlebars-template">
            <div class="aform">
            <div class="row">
            <div class="columns small-6"><input type="text" class="addr" name="firstname" placeholder="first name" value="{{firstname}}" /></div>
            <div class="columns small-6"><input type="text" class="addr" name="lastname" placeholder="last name" value="{{lastname}}" /></div>
            </div>
            <div class="row">
            <div class="columns"><input type="text" class="street addr" name="street1" placeholder="address line 1" value="{{street.[0]}}" /></div>
            </div>
            <div class="row">
            <div class="columns"><input type="text" class="street addr" name="street2" placeholder="address line 2 (apartment#, etc. optional)" value="{{street.[1]}}" /></div>
            </div>
            <div class="row">
            <div class="columns small-5 city"><input type="text" class="addr" name="city" placeholder="city" value="{{city}}" /></div>
            <div class="columns small-3 regions">
            <label class="s-arrow">
            <select class="region addr" name="region">
            <option value="" disabled="disabled">- -</option>
            </select>
            </label>
            </div>
            <div class="columns small-4 zip"><input type="text" class="addr" name="postcode" placeholder="zip/postal" value="{{postcode}}" /></div>
            </div>
            <div class="row">
            <div class="columns small-8"><input type="text" class="addr" name="telephone" placeholder="phone number" pattern="\d*" value="{{telephone}}" /></div>
            </div>
            </div><!--aform-->
        </script>
        <script id="co-creditcard" type="text/x-handlebars-template">
            <div class="line"></div>
            <div class="info">
            {{#if no_card}}
            {{#if dashboard}}
            <div class="alert">Please add a credit card</div>
            {{else}}
            <div>no credit card provided.<a class="edit" href="#">edit</a></div>
            {{/if}}
            {{else}}
            <div>**** **** **** {{last4}}</div>
            {{#if cvv}}
            <div>CVV {{cvv}}</div>
            {{else}}
            <div>CVV ***</div>
            {{/if}}
            <div class="btm">expiration date
            <div>{{expiration_month}}/{{expiration_year}}
            {{#unless dashboard}}
            <a class="edit" href="#">edit</a>
            {{/unless}}
            </div>
            </div>
            {{/if}}
            </div>
        </script>
        <script id="co-addresses" type="text/x-handlebars-template">
            <div class="addresses">
            {{#if dashboard}}
            <label>Change {{type}} address to:</label>
            {{else}}
            <label>Select a {{type}} address from your address book or enter a new address.</label>
            {{/if}}
            <label class="s-arrow">
            <select id="{{type}}-select" class="address-select" name="shipping-address-id">
            <option value="" selected="selected" disabled="disabled">select a stored address</options>
            {{#each addresses}}
            <option value="{{entity_id}}">{{firstname}} {{lastname}}, {{#each street}}{{.}}{{/each}} {{city}}, {{region}} {{postcode}}</options>
            {{/each}}
            {{#unless dashboard}}
            <option value="new-address">new address</options>
            {{/unless}}
            </select>
            </label>
            </div>
        </script>
        <script id="co-creditcards" type="text/x-handlebars-template">
            <div class="ccs">
            <label>{{#if dashboard}}Change credit card on file to:{{else}}Stored credit cards{{/if}}</label>
            <label class="s-arrow">
            <select id="cc-select" class="cc-select" name="creditcard-id">
            <option value="" selected="selected" disabled="disabled">select a payment method</option>
            {{#each cards}}
            <option value="{{vault_id}}">stored {{type}} card ending with: {{last4}}</option>
            {{/each}}
            {{#unless dashboard}}
            <option value="new-card">new card</option>
            {{/unless}}
            </select>
            </label>
            </div>
        </script>

        <script id="cancelled-sub-co-creditcards-template" type="text/x-handlebars-template">
            <div class="ccs">
            <select id="cc-select" class="cc-select dropdown-caret" name="creditcard-id">
            <option value="" selected="selected" disabled="disabled">select a payment method</option>
            {{#each creditCards}}
            <option value="{{vault_id}}">stored {{type}} card ending with: {{last4}}</option>
            {{/each}}
            <option value="new-card">new card</option>
            </select>
            </div>
        </script>
        <script id="co-email" type="text/x-handlebars-template">
            <div class="esaved">
            <div>{{customer.email}}</div>
            {{#if hasActiveSub}}
            <div class="active-sub">
            You have an existing account. Go to <a href="/mydashboard">dashboard</a>
            or
            <a href="#" class="logout-active">use a different email to sign up</a>
            for another account.
            </div>
            {{/if}}
            </div>
        </script>
        <script id="co-plan" type="text/x-handlebars-template">
            <div class="row">
            <div class="columns small-9">
            <div class="current i plan-{{id}} {{sku}}{{#if samplebox}} samplebox{{/if}}">{{name}}{{#if show_edit}}<a href="#" class="edit">edit</a>{{/if}}</div>
            </div>
            <div class="columns small-3 amount">&#36;{{price}}</div>
            </div>
        </script>
        <script id="co-quotes" type="text/x-handlebars-template">
            <div class="quote{{#if quote_updated}} quote-updated{{/if}}">
            <div class="row subtotal">
            <div class="columns small-6">subtotal</div>
            <div class="columns small-4 amount">&#36;{{subtotal}}</div>
            </div>
            {{#if store_credit.available }}
            <div class="row store-credit">
            <div class="columns small-8">store credit </div>
            <div class="columns small-4 amount">-&#36;{{store_credit.value}}</div>
            </div>
            {{/if}}
            {{#if discount.name}}
            <div class="row">
            <div class="columns small-8">{{discount.name}}<a class="remove" href="#">remove</a></div>
            <div class="columns small-4 amount">-&#36;{{discount.value}}</div>
            </div>
            {{/if}}
            {{#if giftcard.value}}
            <div class="row">
            <div class="columns small-8">{{giftcard.name}}</div>
            <div class="columns small-4 amount">-&#36;{{giftcard.value}}</div>
            </div>
            {{/if}}
            <div class="row">
            <div class="columns small-6">shipping</div>
            <div class="columns small-4 amount">${{shipping}}</div>
            </div>
            </div><!--quote-->

            <div class="row total bold">
            <div class="columns small-6">total</div>
            <div class="columns small-4 amount">&#36;{{grand_total}}</div>
            </div>
        </script>
        <script id="alc-items" type="text/x-handlebars-template">
            <div class="row alc">
            <div class="columns {{#if isSub}}small-8{{else}}small-7{{/if}}">
            <div class="">
            {{#if isSub}}
            NatureBox Subscription
            {{else}}
            NatureBox Snacks<a href="#" class="edit">edit</a>
            {{/if}}
            </div>
            </div>
            {{#unless isSub}}
            <div class="columns small-2 count">&#215;<span class="num">{{count}}</span></div>
            {{/unless}}

            <div class="columns small-3 price">&#36;<span class="num">{{price}}</span></div>
            </div>

            {{#unless isSub}}
            <span class="tri in"></span>
            <span class="tri out"></span>
            <ul class="options snacks row" style="display:none">
            {{#each snacks}}
            <li id="item-{{entity_id}}" class="columns" data-id="{{entity_id}}">
            <div class="columns small-7 name">{{name}}</div>
            <div class="columns small-3 amount">
            <span class="minus">&#8211;</span>
            <span class="qty">{{qty}}</span>
            <span class="plus">&#43;</span>
            </div>
            <div class="columns small-2 link"><a class="delete" data-id="{{entity_id}}">delete</a></div>
            </li>
            {{/each}}
            </ul>
            {{/unless}}
        </script>
        <script id="success" type="text/x-handlebars-template">
            <div class="success-page">

            <div class="row header">
            <div class="columns medium-6 medium-offset-2">
            <a href="/"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/natureboxlogo_large.1464283634.png" width="290"/></a>
            </div>
            <div class="columns medium-4 contact hide-for-small"><span class="help">NEED HELP?</span> <span class="phone">888.613.6998</span></div>
            </div>
            <div class="progress-bar">
            <div class="row show-for-medium-up">
            <div class="medium-12 large-centered columns">
            <span class="step-pos first">1</span> select a plan <span class="step-pos">2</span> checkout  <span class="active"><span class="step-pos">3</span> choose your snacks</span>
            </div>
            </div>
            <div class="row show-for-small-only">
            <div class="medium-12 small-centered columns">
            <span class="active">choose your snacks </span>
            </div>
            </div>
            </div>

            {{#if showPresetBox }}
            <div id="preset-box" class="row">
            <div class="columns medium-centered medium-10 large-8">
            <div class="preset-head">Welcome, {{firstname}}! Just one thing left...</div>
            </div>
            <div class="preset-content medium-centered columns medium-10 large-8">
            {{#if preset1}}
            <div class="preset-desc">It&#39;s time to pick snacks for your future NatureBoxes!</div>
            <a id="preset-choose" class="button round" href="/browse">Choose my snacks</a>

            <ul class="small-block-grid-3 medium-block-grid-6">
            <li><img src="//naturebox.com/resize/150/150/crop/h/media/catalog/product/f/r/fruitpeels_square.jpg" width="150" height="150" title="Double Berry Fruit Peels" /></li>
            <li><img src="//naturebox.com/resize/150/150/crop/h/media/catalog/product/p/b/pbjgranola_square.jpg" width="150" height="150" title="PB&J Granola" /></li>
            <li><img src="//naturebox.com/resize/150/150/crop/h/media/catalog/product/s/a/saltpepperpistachios_square.jpg" width="150" height="150" title="Salt & Pepper Pistachios" /></li>
            <li><img src="//naturebox.com/resize/150/150/crop/h/media/catalog/product/r/o/roastedperuviancorn_square.jpg" width="150" height="150" title="Roasted Peruvian Corn Kernels" /></li>
            <li><img src="//naturebox.com/resize/150/150/crop/h/media/catalog/product/s/r/sriracharoastedcashews_square.jpg" width="150" height="150" title="Sriracha Roasted Cashews" /></li>
            <li><img src="//naturebox.com/resize/150/150/crop/h/media/catalog/product/p/r/probioticpowermix_square.jpg" width="150" height="150" title="Probiotic Power Mix" /></li>
            </ul>

            {{else}}
            <div class="preset-desc">What kind of snacks do you want in future NatureBoxes?</div>
            {{/if}}

            {{#unless preset1}}
            <div class="row preset-categories">

            {{#if preset2}}
            <div class="columns medium-8 medium-centered"><div class="row">
            <div class="columns medium-6">
            <a class="preset-popular"><img src="//naturebox.com/resize/160/160/crop/h/media/catalog/product/b/i/bigislandpineapple_square.jpg" width="160" height="160" /></a>
            <div class="preset-name">Popular Picks</div>
            </div>
            <div class="columns medium-6">
            <a class="preset-new"><img src="//naturebox.com/resize/160/160/crop/h/media/catalog/product/c/h/chocolatebananachips_square.jpg" width="160" height="160" /></a>
            <div class="preset-name">New and Noteworthy</div>
            </div>
            </div></div>
            {{else}}
            <div class="columns medium-4">
            <a class="preset-popular"><img src="//naturebox.com/resize/160/160/crop/h/media/catalog/product/b/i/bigislandpineapple_square.jpg" width="160" height="160" /></a>
            <div class="preset-name">Popular Picks</div>
            </div>
            <div class="columns medium-4">
            <a class="preset-new"><img src="//naturebox.com/resize/160/160/crop/h/media/catalog/product/c/h/chocolatebananachips_square.jpg" width="160" height="160" /></a>
            <div class="preset-name">New and Noteworthy</div>
            </div>
            <div class="columns medium-4">
            <a class="preset-choose" href="/recommendations"><img src="//naturebox.com/resize/140/140/crop/h/media/catalog/product/s/u/surprisesnack_flower.png" width="160" height="160" /></a>
            <div class="preset-name">"Choose your own"</div>
            </div>
            {{/if}}
            </div><!--row-->
            {{/unless}}

            </div><!--preset-content-->
            </div>
            {{else}}
            <div id="header">
            <div class="row">
            <div class="thank-you columns medium-centered medium-8">
            {{#if noSub}}
            <h2>thanks for your order, {{firstname}}!</h2>
            {{else}}
            <h2>thanks for joining, {{firstname}}!</h2>
            {{/if}}
            {{#if trial}}
            <div><span class="done">Your order of the NatureBox Free Trial is complete.</span></div>
            {{else}}
            <div><span class="done">Your order is complete and we&#39;ve sent you a confirmation email.</span></div>
            {{/if}}
            </div>
            </div>

            <div class="action-zone">
            <div class="row">
            <div class="medium-8 medium-centered columns">
            {{#if trial}}
            <div class="subheader">Your NatureBox Sampler will be shipped soon!</div>
            <p class="bold">We have also sent an e-mail confirming your order.</p>
            <p>Beginning next month, you’ll automatically become a NatureBox Deluxe Box member and receive five full-sized snacks for only &#36;19.95 per month.</p>
            <p>Want to receive personalized snack recommendations?</p>
            <div class="row">
            <div class="medium-10 large-7 small-centered columns">
            <a class="button round go-to-dashboard" href="#">set your snack preferences</a>
            </div>
            </div>
            {{else}}

            {{#if noSub}}
            {{#if isFathersDayBox2015}}
            <div class="subheader">Want us to let Dad know he has a NatureBox coming?</div>
            <p class="bold">Click this button to request an automatic postcard!</p>
            <div class="row">
            <div class="medium-8 large-5 small-centered columns">
            <a class="button round" href="https://docs.google.com/forms/d/1TOaXY-1U0UT2LKAO0vFdPqIO74YwBz88ac79OmIi7rM/viewform" target="_blank">Send a postcard</a>
            </div>
            </div>
            {{else}}
            <div class="subheader">Want to get access to our full catalog of snacks?</div>
            <p class="bold">Become a NatureBox subscriber and pick your snacks each month!</p>
            <p>Our catalog of 100+ snacks has something for everyone, and we're always adding new options. As a NatureBox subscriber, you'll gain full access to our entire assortment.</p>
            <div class="row">
            <div class="medium-8 large-5 small-centered columns">
            <a class="button round" href="/browse">browse our snacks</a>
            </div>
            </div>
            {{/if}}
            {{else}}
            <div class="subheader">want a snack experience tailored to you?</div>
            <p class="bold">To start picking snacks for your first box, click the button below.</p>
            <p>We'll ask you a few questions, then generate personalized recommendations of snacks</p>
            <p>we think you'll love from our catalog of 100+ options!</p>
            <div class="row">
            <div class="medium-8 large-5 small-centered columns">
            <a class="button round go-to-dashboard" href="#">get started</a>
            </div>
            </div>
            {{/if}}

            {{/if}}
            </div>
            </div>
            </div>

            </div><!--#header-->
            {{/if}}{{!--end if showPresetBox--}}

            <div id="content">
            <div class="row">
            <div class="guarantee columns medium-5 medium-offset-2">
            {{#if trial}}
            <div class="bold">NatureBox Sampler - FAQs</div>
            {{else}}
            <div class="bold">snack-isfaction guaranteed</div>
            {{/if}}
            <ul>
            {{#if noSub}}
            <li class="sg-1">You have placed a one-time order. We will begin packing your box soon!
            </li>
            <li class="sg-2">Please allow 1-2 weeks for your box to be delivered.</li>
            <li class="sg-3"><span class="first">Questions or concerns?</span> <span>Please contact our Snack Concierge team.</span>
            </li>
            <li class="sg-4"><span class="first">Still hungry?</span> <span>Sign up for a NatureBox subscription to start receiving deliciously wholesome snacks each month!</span>
            </li>
            {{else}}

            {{#if trial}}
            <li class="sg-1">
            <span class="first">When will my Sampler arrive?</span>
            <div>Your free "Taste of Better" Sampler will arrive within 5-10 business days.</div>
            </li>
            <li class="sg-2">
            <span class="first">What will be included in my NatureBox Sampler Box?</span>
            <div>Our sampler box will include four single serve pouches and one full-sized "surprise snack" to give you a taste of the variety of foods NatureBox offers.</div>
            </li>
            <li class="sg-3">
            <span class="first">Can I customize my first Deluxe Box?</span>
            <span>Yes! 30 days after the free trial, you will automatically become a NatureBox Deluxe Box member.  NatureBox Deluxe Box members receive five full-sized snacks for only &#36;19.95 per month (shipping is free). To customize your first Deluxe Box just click "set your snack preferences" above.</span>
            </li>
            <li class="sg-4">
            <span class="first">How can I cancel my membership?</span>
            <span>While we hate to see you go, you may cancel your account through your dashboard. <a href="//support.naturebox.com/hc/en-us/articles/202908230-I-ve-got-a-Trial-box-how-do-I-cancel-" target="_blank">Click here</a> for more information.</span>
            </li>
            {{else}}                    <li class="sg-1">You will now receive your NatureBox subscription monthly, unless you purchased
            one of our themed boxes. Such boxes are one-time purchases only.
            </li>
            <li class="sg-2">Please allow 1-2 weeks for your first box to be delivered.</li>
            <li class="sg-3"><span class="first">Wish to <b>cancel</b> or <b>pause</b>?</span><span>Please cancel online from the <a href="/mydashboard#manage-account" target="_blank">Manage Account</a> tab of your Dashboard or contact our Snack Concierge team before your next billing cycle to avoid being re-billed.</span>
            </li>
            <li class="sg-4"><span class="first">Prepaid for a longer subscription?</span> <span>If you have purchased and prepaid for the 3, 6 or 12 month subscription, you will NOT be re-billed each month.</span>
            </li>

            {{/if}}                    {{/if}}
            </ul>
            </div><!--guarantee-->
            <div class="block-content top dropdown small-12 medium-4 columns">
            <div id="help-box">
            <div class="heading bold">need help?</div>
            <ul class="list">
            <li class="help">Visit our <a href="//support.naturebox.com">FAQ</a></li>
            <li class="call">1.888.613.6998</li>
            <li class="email"><a href="mailto:support@naturebox.com">support@naturebox.com</a></li>
            <li class="hours">M-F 7-5pm PST</li>
            </ul>
            </div>
            </div>
            </div><!--row-->
            </div>
            </div>

            <div id="overlay"></div>
        </script>

        <script id="success-preset-surprise" type="text/x-handlebars-template">
            <div class="columns small-centered large-8 preset-surprised">
            <div>Great! We&#39;ll send you a surprise assortment each month.</div>
            <div>To help us ensure you get snacks you&#39;ll love, we recommend completing your snack profile.</div>
            <div>Don&#39;t worry, it should only take a few minutes!</div>
            <a id="preset-profile" class="button round" href="/profile">Start my profile</a>
            </div>
        </script>
        <script id="success_pt" type="text/x-handlebars-template">
            <div class="success-page-pt">

            <article>

            <div class="success-header">
            <div class="row">
            <div class="columns small-12 logo">
            <div class="hide-for-small help">NEED HELP? 888.613.6998</div>                        
            <a href="/mydashboard"><img src="https://naturebox.com/skin/frontend/naturebox/default/images/natureboxlogo_large.1464283634.png"></a>
            </div>
            </div>
            </div>

            {{#if isPandoraoneAfid}}
            <section class="content pandoraOne">

            <div class="friendbuy-b2p-gps"></div>
            <section class="build-your-pantry">
            <div class="row title">
            <div class="columns small-12 medium-11 medium-centered large-7 large-centered">
            <h1>Your first box is on its way!</h1>
            </div>
            </div>
            <div class="row intro">
            <div class="columns small-12 medium-11 medium-centered large-7 large-centered">
            <h2>Now get some beats with your bites.</h2>
            </div>
            </div>
            <div class="row your-pantry">
            <div class="columns small-10 small-centered lessermedium-10 lessermedium-centered medium-7 medium-centered large-5 large-centered ">
            <div class="box">
            <h2>Redeem your free month of Pandora One<span class="trademark">&trade;</span>, on us!</h2>
            <button class="button round small"><a href="{{pandoraoneUrl}}" target="_blank">Start your free month now</a></button>
            </div>
            </div>
            </div>



            <div class="clearfix"></div>
            </section><!-- section.build-your-pantry -->

            <section class="personalize">
            <div class="row">
            <div class="columns small-9 small-centered medium-9 medium-centered large-6 large-uncentered browse">
            <div class="row title">
            <div class="columns small-12 small-centered">
            <h3>Stock your pantry</h3>
            </div>
            </div>
            <div class="row description">
            <div class="columns small-9 small-centered">
            <p>Build your next box by adding crave-worthy snacks to your pantry now.</p>
            </div>
            </div>
            <div class="row cta">
            <div class="columns small-9 small-centered">
            <button class="button round small"><a href="/snacks/all-snacks">Choose your snacks</a></button>
            </div>
            </div>
            </div>
            <div class="columns small-9 small-centered medium-9 medium-centered large-6 large-uncentered recommendations">
            <div class="row title">
            <div class="columns small-12 small-centered">
            <h3>Personalize your experience</h3>
            </div>
            </div>
            <div class="row description">
            <div class="columns small-12 small-centered">
            <p>To get personalized recommendations, complete your personal Profile with your flavor, ingredient, and nutrition preferences.</p>
            </div>
            </div>
            <div class="row cta">
            <div class="columns small-10 small-centered">
            <button class="button round small"><a href="/browse/recommendations">Personalize your membership</a></button>
            </div>
            </div>
            </div>
            </div>
            </section><!-- section.personalize -->

            </section><!-- content pandoraOne-->

            {{else}}

            <section class="content">

            <div class="friendbuy-b2p-gps"></div>
            <section class="build-your-pantry">
            <div class="row">
            <div class="columns small-12 medium-11 medium-centered large-7 large-centered title">
            Your first box is on its way!
            </div>
            </div>
            <div class="row">
            <div class="columns small-12 medium-11 medium-centered large-7 large-centered intro">
            Since you’re new to NatureBox, here are a few ways to get started.
            </div>
            </div>
            <div class="row">
            <div class="columns small-12 medium-9 medium-centered large-6 large-centered your-pantry">
            <div class="box">
            <h3>Stock Your Snack Pantry</h3>
            <p>Build your next box by adding crave-worthy snacks to your pantry now!</p>
            <a href="/snacks/all-snacks" class="button">Choose Snacks</a>
            </div>
            </div>
            </div>

            <div class="clearfix"></div>
            </section><!-- section.build-your-pantry -->

            <section class="personalize">
            <div class="row">
            <div class="columns small-12 medium-10 medium-centered large-8 large-centered profile">
            <h3>Personalize Your Experience</h3>
            <p>To get personalized snack recommendations, complete your personal Profile with your flavor, ingredient, and nutrition preferences.</p>
            <a href="/browse/recommendations">Get Personalized Recommendations <i class="fa fa-chevron-right"></i></a>
            </div>
            </div>
            </section><!-- section.personalize -->

            </section><!-- content -->
            {{/if}}

            <footer>
            <div class="row">
            <div class="columns small-12 logo">
            <a class="footer-logo" href="/mydashboard"><img src="/skin/frontend/naturebox/default/images/home_v2/NatureBoxLogoFinal.svg"></a>
            </div>
            </div>
            <div class="row">
            <div class="columns small-12">
            <div class="row">
            <div class="small-12 medium-12 large-8 columns footer-links">
            <ul>
            <li class="link"><a href="https://naturebox.com/about-us">about us</a></li>
            <li class="link"><a href="https://support.naturebox.com" target="_blank">FAQs</a></li>
            <li class="link"><a href="https://naturebox.com/jobs">jobs</a></li>
            <li class="link"><a href="https://naturebox.com/press">press</a></li>
            <li class="link"><a href="http://office.naturebox.com">office snacks</a></li>
            <li class="link"><a href="http://blog.naturebox.com/">blog</a></li>
            <li class="link"><a href="https://naturebox.com/foods">about our snacks</a></li>
            <li class="link"><a href="https://naturebox.com/happysnackers">community</a></li>
            <li class="link"><a href="https://naturebox.com/privacy">privacy</a></li>
            <li class="link"><a href="https://naturebox.com/terms">terms</a></li>
            </ul>
            </div>
            <div class="small-12 medium-12 large-4 columns copyright">
            &copy; {{year}} NatureBox. All Rights Reserved.
            </div>
            </div><!-- row -->
            </div><!-- columns -->
            </div><!--row-->
            </footer>

            </article><!-- article -->

            </div><!-- success-page-pt -->

            <div id="overlay"></div>
        </script>
        <script id="qasTemplate" type="text/x-handlebars-template">
            <div class="heading">verify your address</div>
            <div class="message">
            <p>{{message}}</p>
            </div>
            <div class="row">
            <div class="large-6 columns">
            {{#if is_did_you_mean}}
            <div class="bold">Is this what you meant?</div>
            <form id="qas_refine_address" novalidate>
            {{#each suggested_address}}
            <label for="address">
            {{this.street1}}<br/>
            {{this.street2}}<br/>
            {{this.city}}, {{this.state}} {{this.zipcode}}
            </label>
            <input type="hidden" name="street1" value="{{this.street1}}">
            <input type="hidden" name="street2" value="{{this.street2}}">
            <input type="hidden" name="city" value="{{this.city}}">
            <input type="hidden" name="region" value="{{this.state}}">
            <input type="hidden" name="region_id" value="{{current_region_id}}">
            <input type="hidden" name="postcode" value="{{this.zipcode}}">
            {{/each}}
            <button type="submit" class="button round">use suggested address</button>
            </form>
            {{/if}}

            {{#if is_unknown_unit_number}}
            <div class="bold">Confirm your Apartment / Suite / Unit Number:</div>
            <form id="qas_refine_address" novalidate>
            <input type="text" name="unit_number" id="qas_unit_number">
            <input type="hidden" name="street1" value="{{current_street_1}}">
            <input type="hidden" name="street2" value="{{current_street_2}}">
            <input type="hidden" name="city" value="{{current_city}}">
            <input type="hidden" name="region" value="{{current_region}}">
            <input type="hidden" name="region_id" value="{{current_region_id}}">
            <input type="hidden" name="postcode" value="{{current_postcode}}">
            <button type="submit" class="button round">verify new number</button>
            </form>
            {{/if}}

            {{#if is_unknown_street_number}}
            <div class="bold">Confirm your House / Building number:</div>
            <form id="qas_refine_address" novalidate>
            <input type="text" name="street_number" id="qas_street_number">
            <input type="hidden" name="street1" value="{{current_street_1}}">
            <input type="hidden" name="street2" value="{{current_street_2}}">
            <input type="hidden" name="city" value="{{current_city}}">
            <input type="hidden" name="region" value="{{current_region}}">
            <input type="hidden" name="region_id" value="{{current_region_id}}">
            <input type="hidden" name="postcode" value="{{current_postcode}}">
            <button type="submit" class="button round">verify new number</button>
            </form>
            {{/if}}

            {{#if is_multiple_addresses}}
            <div class="bold">Our suggested matches</div>
            {{#each suggested_addresses}}
            <form id="qas_refine_address" novalidate>
            <div>{{this.address}}</div>
            <input type="hidden" name="moniker" value="{{this.moniker}}">
            <button type="submit" class="button round">verify new number</button>
            </form>
            {{/each}}
            {{/if}}

            {{#if is_no_match}}
            <div class="bold">No Match</div>
            <p>Sorry, we couldn''t find your shipping address!</p>
            {{/if}}
            </div>
            <div class="large-6 columns">
            <div class="bold">Go with original address</div>
            {{ current_street_1 }}<br/>
            {{ current_street_2 }}<br/>
            {{ current_city }}, {{current_region}} {{ current_postcode }}
            <form id="qas_refine_address" novalidate>
            <input type="hidden" name="street1" value="{{current_street_1}}">
            <input type="hidden" name="street2" value="{{current_street_2}}">
            <input type="hidden" name="city" value="{{current_city}}">
            <input type="hidden" name="region" value="{{current_region}}">
            <input type="hidden" name="region_id" value="{{current_region_id}}">
            <input type="hidden" name="postcode" value="{{current_postcode}}">
            <input type="hidden" name="use_as_entered" value="true">
            <button type="submit" class="button round">use address as entered*</button>
            <div>*your address may be undeliverable</div>
            </form>

            <a href="#" class="edit-original">edit original address</a>
            </div>
            </div>
        </script>
        <script id="editAddressTemplate" type="text/x-handlebars-template">
            <div class="row">
            <div class="columns">
            <div class="heading">edit address</div>
            </div>
            </div>
            {{#errors}}
            <span class="error">{{ this }}</span>
            {{/errors}}
            <form id="edit-address-form" class="update-address" novalidate>
            <div class="row">
            <div class="columns medium-6">
            <input type="text" name="firstname" placeholder="firstname" value="{{firstname}}"/>
            </div>
            <div class="columns medium-6">
            <input type="text" name="lastname"  placeholder="lastname" value="{{lastname}}"/>
            </div>
            </div>
            <div class="row">
            <div class="columns">
            <input type="text" name="street_1"  placeholder="address line 1" value="{{street_1}}"/>
            </div>
            </div>
            <div class="row">
            <div class="columns">
            <input type="text" name="street_2"  placeholder="address line 2 (apartment#, etc. optional)" value="{{street_2}}"/>
            </div>
            </div>
            <div class="row">
            <div class="columns medium-6">
            <input type="text" name="city" placeholder="city" value="{{city}}" />
            </div>
            <div class="columns medium-6">
            <select name="region">
            <option value="{{region_id}}" selected="selected">{{region}}</option>
            {{#each regions}}
            <option value="{{this.region_id}}">{{this.name}}</option>
            {{/each}}
            </select>
            </div>
            </div>
            <div class="row">
            <div class="columns medium-6">
            <input type="text" name="postcode" placeholder="postcode" value="{{postcode}}" pattern="\d*" />
            </div>
            </div>
            <div class="row">
            <div class="columns large-6">
            <input type="tel" name="telephone" placeholder="phone number" value="{{telephone}}" />
            </div>
            </div>
            <div class="row">
            <div class="columns large-6">
            <button type="submit" class="button round">submit</button>
            </div>
            </div>
            </form>
            <a class="close-reveal-modal">&times;</a>
        </script>
        <script id="checkout-error-Modal" type="text/x-handlebars-template">
            <div class="row">
            <div class="small-9 large-centered small-centered columns cs-message">
            <h2 class="cs-message">Thanks for trying the Sampler!</h2>
            </div>
            <div class="small-9 large-centered small-centered error-modal-message columns">
            <p> We appreciate your enthusiasm for our snacks, but our free trial box is limited to one per customer. If you'd like to start another subscription, please click the button below and select one of our other subscription plans.</p>
            <div class="row">
            <div class="small-5 large-centered small-centered error-modal-message columns">
            <button class="to-select round" href="/">choose a new plan</button>
            </div>
            </div>
            </div>
            </div>
        </script>
        <footer>
            <ul>
                <li class="link"><a class="about" href="https://naturebox.com/about-us">about us</a></li>
                <li class="link"><a href="//blog.naturebox.com">blog</a></li>
                <li class="link"><a href="https://support.naturebox.com" target="_blank">FAQs</a></li>
                <li class="link"><a href="https://naturebox.com/join-us">jobs</a></li>
                <li class="link"><a href="https://naturebox.com/press">press</a></li>
                <li class="link"><a href="https://naturebox.com/landing/gift">gifts</a></li>
                <li class="link"><a href="https://naturebox.com/affiliates">affiliate</a></li>
                <li class="link"><a href="https://naturebox.com/privacy">privacy</a></li>
                <li class="link"><a href="https://naturebox.com/terms">terms</a></li>
            </ul>
            <div class="copy">&copy; 2016 NatureBox. All Rights Reserved.</div>
        </footer>

        <script type="text/javascript" src="<?php echo $jsUrl; ?>checkout.min.319527.js"></script>
        <script>
        $(document).foundation();
        </script>
        <!--{NBAF_1e4ca638c977891c5e1a612b3185b81f}--><!-- AFID= --><!--/{NBAF_1e4ca638c977891c5e1a612b3185b81f}--><!--{WISHLISTS_0a62920bc25654f05711578c0018ac7f}--><!--/{WISHLISTS_0a62920bc25654f05711578c0018ac7f}--><!--{NBSES_95164cc363c4ed72623f339a2933ae3a}--><script>

            function getParameterByName(name) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                        results = regex.exec(window.location.search);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            }

            var NB = NB || {};
            NB.baseMediaUrl = "https://naturebox.com/media/";
            NB.baseResizeUrl = "https://naturebox.com/resize/";
            NB.baseSkinUrl = "https://naturebox.com/skin/";
            NB.baseUrl = "https://naturebox.com/";
            NB.trackCookie = "nbxsub";
            NB.trackUrl = "https://localhost/track.gif";
            NB.visitorCookie = "nbxsub";
            NB.storeCode = "default";
            NB.friendbuyWidgetIdentifier_Overlay = "b2p-gps";
            NB.friendbuyWidgetIdentifier_Inline = "b2p-ghu";
            NB.afid = getParameterByName('afid');
            document.cookie = "afid=" + NB.afid + "; path=/";

            //experiment flag
            NB.presetBoxCookie = 'presetbox';
            NB.onboardCookie = 'nb_onboard';
        </script>
        <!--/{NBSES_95164cc363c4ed72623f339a2933ae3a}--><script>
            NB.Regions = new NB.Collection.Regions([{"region_id": 1, "country_id": "US", "code": "AL", "name": "Alabama"}, {"region_id": 2, "country_id": "US", "code": "AK", "name": "Alaska"}, {"region_id": 66, "country_id": "CA", "code": "AB", "name": "Alberta"}, {"region_id": 3, "country_id": "US", "code": "AS", "name": "American Samoa"}, {"region_id": 4, "country_id": "US", "code": "AZ", "name": "Arizona"}, {"region_id": 5, "country_id": "US", "code": "AR", "name": "Arkansas"}, {"region_id": 485, "country_id": "US", "code": "AE", "name": "Armed Forces"}, {"region_id": 7, "country_id": "US", "code": "AA", "name": "Armed Forces Americas"}, {"region_id": 8, "country_id": "CA", "code": "AE", "name": "Armed Forces Canada"}, {"region_id": 11, "country_id": "US", "code": "AP", "name": "Armed Forces Pacific"}, {"region_id": 67, "country_id": "CA", "code": "BC", "name": "British Columbia"}, {"region_id": 12, "country_id": "US", "code": "CA", "name": "California"}, {"region_id": 13, "country_id": "US", "code": "CO", "name": "Colorado"}, {"region_id": 14, "country_id": "US", "code": "CT", "name": "Connecticut"}, {"region_id": 15, "country_id": "US", "code": "DE", "name": "Delaware"}, {"region_id": 16, "country_id": "US", "code": "DC", "name": "District of Columbia"}, {"region_id": 17, "country_id": "US", "code": "FM", "name": "Federated States Of Micronesia"}, {"region_id": 18, "country_id": "US", "code": "FL", "name": "Florida"}, {"region_id": 19, "country_id": "US", "code": "GA", "name": "Georgia"}, {"region_id": 20, "country_id": "US", "code": "GU", "name": "Guam"}, {"region_id": 21, "country_id": "US", "code": "HI", "name": "Hawaii"}, {"region_id": 22, "country_id": "US", "code": "ID", "name": "Idaho"}, {"region_id": 23, "country_id": "US", "code": "IL", "name": "Illinois"}, {"region_id": 24, "country_id": "US", "code": "IN", "name": "Indiana"}, {"region_id": 25, "country_id": "US", "code": "IA", "name": "Iowa"}, {"region_id": 26, "country_id": "US", "code": "KS", "name": "Kansas"}, {"region_id": 27, "country_id": "US", "code": "KY", "name": "Kentucky"}, {"region_id": 28, "country_id": "US", "code": "LA", "name": "Louisiana"}, {"region_id": 29, "country_id": "US", "code": "ME", "name": "Maine"}, {"region_id": 68, "country_id": "CA", "code": "MB", "name": "Manitoba"}, {"region_id": 30, "country_id": "US", "code": "MH", "name": "Marshall Islands"}, {"region_id": 31, "country_id": "US", "code": "MD", "name": "Maryland"}, {"region_id": 32, "country_id": "US", "code": "MA", "name": "Massachusetts"}, {"region_id": 33, "country_id": "US", "code": "MI", "name": "Michigan"}, {"region_id": 34, "country_id": "US", "code": "MN", "name": "Minnesota"}, {"region_id": 35, "country_id": "US", "code": "MS", "name": "Mississippi"}, {"region_id": 36, "country_id": "US", "code": "MO", "name": "Missouri"}, {"region_id": 37, "country_id": "US", "code": "MT", "name": "Montana"}, {"region_id": 38, "country_id": "US", "code": "NE", "name": "Nebraska"}, {"region_id": 39, "country_id": "US", "code": "NV", "name": "Nevada"}, {"region_id": 70, "country_id": "CA", "code": "NB", "name": "New Brunswick"}, {"region_id": 40, "country_id": "US", "code": "NH", "name": "New Hampshire"}, {"region_id": 41, "country_id": "US", "code": "NJ", "name": "New Jersey"}, {"region_id": 42, "country_id": "US", "code": "NM", "name": "New Mexico"}, {"region_id": 43, "country_id": "US", "code": "NY", "name": "New York"}, {"region_id": 69, "country_id": "CA", "code": "NL", "name": "Newfoundland and Labrador"}, {"region_id": 44, "country_id": "US", "code": "NC", "name": "North Carolina"}, {"region_id": 45, "country_id": "US", "code": "ND", "name": "North Dakota"}, {"region_id": 46, "country_id": "US", "code": "MP", "name": "Northern Mariana Islands"}, {"region_id": 72, "country_id": "CA", "code": "NT", "name": "Northwest Territories"}, {"region_id": 71, "country_id": "CA", "code": "NS", "name": "Nova Scotia"}, {"region_id": 73, "country_id": "CA", "code": "NU", "name": "Nunavut"}, {"region_id": 47, "country_id": "US", "code": "OH", "name": "Ohio"}, {"region_id": 48, "country_id": "US", "code": "OK", "name": "Oklahoma"}, {"region_id": 74, "country_id": "CA", "code": "ON", "name": "Ontario"}, {"region_id": 49, "country_id": "US", "code": "OR", "name": "Oregon"}, {"region_id": 50, "country_id": "US", "code": "PW", "name": "Palau"}, {"region_id": 51, "country_id": "US", "code": "PA", "name": "Pennsylvania"}, {"region_id": 75, "country_id": "CA", "code": "PE", "name": "Prince Edward Island"}, {"region_id": 52, "country_id": "US", "code": "PR", "name": "Puerto Rico"}, {"region_id": 76, "country_id": "CA", "code": "QC", "name": "Quebec"}, {"region_id": 53, "country_id": "US", "code": "RI", "name": "Rhode Island"}, {"region_id": 77, "country_id": "CA", "code": "SK", "name": "Saskatchewan"}, {"region_id": 54, "country_id": "US", "code": "SC", "name": "South Carolina"}, {"region_id": 55, "country_id": "US", "code": "SD", "name": "South Dakota"}, {"region_id": 56, "country_id": "US", "code": "TN", "name": "Tennessee"}, {"region_id": 57, "country_id": "US", "code": "TX", "name": "Texas"}, {"region_id": 58, "country_id": "US", "code": "UT", "name": "Utah"}, {"region_id": 59, "country_id": "US", "code": "VT", "name": "Vermont"}, {"region_id": 60, "country_id": "US", "code": "VI", "name": "Virgin Islands"}, {"region_id": 61, "country_id": "US", "code": "VA", "name": "Virginia"}, {"region_id": 62, "country_id": "US", "code": "WA", "name": "Washington"}, {"region_id": 63, "country_id": "US", "code": "WV", "name": "West Virginia"}, {"region_id": 64, "country_id": "US", "code": "WI", "name": "Wisconsin"}, {"region_id": 65, "country_id": "US", "code": "WY", "name": "Wyoming"}, {"region_id": 78, "country_id": "CA", "code": "YT", "name": "Yukon Territory"}]);
            NB.Countries = new NB.Collection.Countries([{"country_id": "CA", "iso2_code": "CA", "name": "Canada", "validate": "^[a-zA-Z0-9]{3,3}[\\s\\-]?[a-zA-Z0-9]{3,3}$"}, {"country_id": "US", "iso2_code": "US", "name": "United States", "validate": "^[0-9]{5,5}(-?)(\\d{4})?$"}]);
        </script>
        <!-- google analytics -->
        

        

        <!--gtm-->
        <script>
            dataLayer = [];
        </script>
        <!-- Google Tag Manager -->
        
       <script type="text/javascript">
            var customer_id = "";
            var _frnd = {
                share_button: false, // false if you don't want that big image
                site: "site-1a96cd70-naturebox.com",
                page: 'home',
                customer: {
                    id: customer_id
                }
            };
            (function (d, l, s) {
                var a, b = d.getElementsByTagName(s)[0];
                a = d.createElement(s);
                a.type = 'text/javascript';
                a.async = true;
                a.src = l.protocol + '//djnf6e5yyirys.cloudfront.net/js/frndby.js';
                b.parentNode.insertBefore(a, b);
            })(document, location, 'script');
        </script>
        <script type='text/javascript'>
        // Copyright 2015 - ScientiaMobile, Inc., Reston, VA
        // WURFL Device Detection
        // Terms of service:
        // http://web.wurfl.io/license

            eval(function (p, a, c, k, e, d) {
                e = function (c) {
                    return c
                };
                if (!''.replace(/^/, String)) {
                    while (c--) {
                        d[c] = k[c] || c
                    }
                    k = [function (e) {
                            return d[e]
                        }];
                    e = function () {
                        return'\\w+'
                    };
                    c = 1
                }
                ;
                while (c--) {
                    if (k[c]) {
                        p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c])
                    }
                }
                return p
            }('8 7={"6":5,"4":"3 2","1":"0"};', 9, 9, 'Desktop|form_factor|Chrome|Google|complete_device_name|false|is_mobile|WURFL|var'.split('|'), 0, {}))

        </script>
        

        <div class="loading" style="display:none;"></div>
    </body>
</html>
