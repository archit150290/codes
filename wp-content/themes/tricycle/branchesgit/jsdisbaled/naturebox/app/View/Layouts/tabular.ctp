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
                <title>Nature Box<?php //echo $this->fetch('title');               ?></title>


                <?php $cssArr = array("bootstrap", "animate", "font-awesome", "material"); ?>
                <?php echo $this->Html->css($cssArr); ?>

                <!--[if lt IE 9]><link rel="stylesheet" href="css/ie.css" type="text/css" media="all" />
                <?php echo $this->Html->css("ie"); ?>
                <![endif]-->
                <!--[if lt IE 9]>
                    <script type="text/javascript" src="<?php echo $jsUrl; ?>html5shiv.js"></script>
                <![endif]-->


                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" />
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
                <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
                <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.3/angular.min.js"></script>
                <script type="text/javascript" src="<?php echo $jsUrl; ?>tabular_app.js<?php echo "?t=" . time(); ?>"></script> 
                <script> SITE_URL = '<?php echo Router::url('/', true); ?>';</script>

                </head>

                <body ng-app="naturebox_analytics">
                    <div class="container">
                        <?php echo $this->fetch('content'); ?>


                    </div>

                    <?php //echo $this->element('sql_dump'); ?>
                </body>
                </html>
