<?php
/**
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.View.Layouts
 * @since         CakePHP(tm) v 0.10.0.1076
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
$cakeDescription = __d('cake_dev', 'CakePHP: the rapid development php framework');
$cakeVersion = __d('cake_dev', 'CakePHP %s', Configure::version());
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"  lang="en">
    <head>
        
        <?php echo $this->Html->charset(); ?>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
            <title>
Get Started
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
                <title>Nature Box<?php //echo $this->fetch('title');          ?></title>


                <?php $cssArr = array("bootstrap", "animate", "font-awesome", "material", "main", "jquery.mCustomScrollbar"); ?>
                <?php echo $this->Html->css($cssArr); ?>

                <!--[if lt IE 9]><link rel="stylesheet" href="css/ie.css" type="text/css" media="all" />
                <?php echo $this->Html->css("ie"); ?>
                <![endif]-->
                <!--[if lt IE 9]>
                    <script type="text/javascript" src="<?php echo $jsUrl; ?>html5shiv.js"></script>
                <![endif]-->
                <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
<!--                <script src="http://code.angularjs.org/1.0.0rc10/angular-cookies-1.0.0rc10.js"></script>-->
                <script src="https://code.angularjs.org/1.5.3/angular-cookies.js"></script>
                <?php
                echo $this->Html->meta('icon');



                echo $this->fetch('meta');
                echo $this->fetch('css');
                echo $this->fetch('script');
                ?>
<!--                <script type="text/javascript" src="<?php echo $jsUrl; ?>analytics.js"></script> -->
                <script type="text/javascript" src="<?php echo $jsUrl; ?>jquery2.1.0.js"></script> 
                    <script type="text/javascript" src="<?php echo $jsUrl; ?>bootstrap.js"></script> 
                    <script type="text/javascript" src="<?php echo $jsUrl; ?>bootstrapValidator.js"></script>
                    <script type="text/javascript" src="<?php echo $jsUrl; ?>smoothscroll.js"></script> 
                    <script type="text/javascript" src="<?php echo $jsUrl; ?>jquery.smooth-scroll.js"></script> 
                    <!-- custom scrollbar plugin -->
                    <script type='text/javascript' src='<?php echo $jsUrl; ?>jquery.knob.min.js'></script>
                    <script type='text/javascript' src='<?php echo $jsUrl; ?>jquery.mCustomScrollbar.js'></script>
                    <script type='text/javascript' src='<?php echo $jsUrl; ?>ng-infinite-scroll.min.js'></script>
                    
                    <script type="text/javascript" src="<?php echo $jsUrl; ?>main.js"></script> 
                    <script type="text/javascript" src="<?php echo $jsUrl; ?>app.js<?php echo "?t=" . time(); ?>"></script> 
                <script> SITE_URL = '<?php echo Router::url('/', true); ?>';</script>
                <script> CATEGORY_URL = '<?php echo Router::url(array("action" => "display", "controller" => "pages", 'home')); ?>';</script>
                <?php echo $this->element("tracker"); ?>
                </head>

                <body ng-app="naturebox"  data-spy="scroll" data-target="#myScrollspy">
                    <?php echo $this->element('header'); ?>
                    <?php echo $this->fetch('content'); ?>


                    <!--All JavaScript Here-->
                    
                    <!--[if lte IE 9]>
                    <script type="text/javascript" src="<?php echo $jsUrl; ?>respond.min.js"></script>
                    <![endif]-->
                    <script>
                    $(document).ready(function () {
                        $('[data-toggle="popover"]').popover();
                        $('.nutrit_Animation').click(function () {
                            $(this).addClass('active');
                        });

                        $(".boxes.bake11").click(function () {
                            $('div.baked').fadeIn(100);
                            $("#grid, #grid2, #grid3, #grid4, #grid5, #grid6, #grid7").masonry('reload');
                            //set the starting bigestHeight variable  
                            var biggestHeight = 0;
                            //check each of them  
                            $('.autoheight').each(function () {
                                //if the height of the current element is  
                                //bigger then the current biggestHeight value  
                                if ($(this).height() > biggestHeight) {
                                    //update the biggestHeight with the  
                                    //height of the current elements  
                                    biggestHeight = $(this).height();
                                }
                            });
                            //when checking for biggestHeight is done set that  
                            //height to all the elements  
                            $('.autoheight').height(biggestHeight);

                        });


                        $(".boxes.chiks11").click(function () {
                            $('div.chipspopup').fadeIn(100);
                            $("#grid, #grid2, #grid3, #grid4, #grid5, #grid6, #grid7").masonry('reload');
                            //set the starting bigestHeight variable  
                            var biggestHeight = 0;
                            //check each of them  
                            $('.autoheight').each(function () {
                                //if the height of the current element is  
                                //bigger then the current biggestHeight value  
                                if ($(this).height() > biggestHeight) {
                                    //update the biggestHeight with the  
                                    //height of the current elements  
                                    biggestHeight = $(this).height();
                                }
                            });
                            //when checking for biggestHeight is done set that  
                            //height to all the elements  
                            $('.autoheight').height(biggestHeight);

                        });


                        $(".popup .overlay").click(function () {
                            $('div.popup').fadeOut(100);
                            $("#grid, #grid2, #grid3, #grid4, #grid5, #grid6, #grid7").masonry('reload');
                        });

                    });
                    </script>
                    <?php echo $this->element("owa_analytics_events"); ?>

                    <?php echo $this->element('sql_dump'); ?>
                </body>
                </html>
