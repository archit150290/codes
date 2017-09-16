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
$cakeVersion = __d('cake_dev', 'CakePHP %s', Configure::version())
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <?php echo $this->Html->charset(); ?>
        <title>
            <?php //echo $cakeDescription  ?>
            <?php echo $this->fetch('title'); ?>
        </title>
			<?php if(isset($description) && $description!="") {?>
		<meta name="description" content="<?php echo $description; ?>" />
		<?php } ?>
        <script type='text/javascript'>
            var userprofile = '<?php echo Router::url('/', true); ?>setImage';
            var orguploadimage = '<?php echo Router::url('/', true); ?>setOrgImage';
            var siteurl = '<?php echo Router::url('/', true); ?>';
            var imgurl = '<?php echo Router::url('/', true); ?>app/webroot/<?php echo PROFILE_IMAGE_DIR; ?>/';
            var orgimgurl = '<?php echo Router::url('/', true); ?>app/webroot/<?php echo ORG_IMAGE_DIR; ?>/';
            var Give_Admin_Control = '<?php echo Configure::read("Give_Admin_Control"); ?>';
            var Revoke_Admin_Control = '<?php echo Configure::read("Revoke_Admin_Control"); ?>';
            var referer = '<?php echo $referer; ?>';
            var endorser = '<?php echo ENDORSER;?>';
            var freeUserPool = <?php echo FREE_POOL_USER_COUNT; ?>;
            var annual_price_per_user = <?php echo Configure::read("subscription.annual_price_per_user"); ?>;
        </script>
        <?php
        echo $this->Html->css("bootstrap.min");

        echo $this->Html->css("signin");
        echo $this->Html->css("style");
        echo $this->Html->css("jquery-ui");
        echo $this->Html->css("simple-sidebar");
        echo $this->fetch('meta');
        echo $this->fetch('css');
        echo $this->fetch('script');
        echo $this->Html->script('jquery.min');
        echo $this->Html->script('jquery.form');
        echo $this->Html->script('jquery.validate');
        echo $this->Html->script('custom');
        echo $this->Html->script('common');
        echo $this->Html->script('jquery-ui');
        echo $this->Html->script('bootstrap');
        echo $this->Html->script('bootbox.min');
        echo $this->Html->script('ndorse');
        echo $this->Html->script('jquery.tablesorter');
        if (isset($jsIncludes)) {
            foreach ($jsIncludes as $jsincluded) {
                echo $this->Html->script($jsincluded);
            }
        }
        ?>

    </head>
    <body>
        <input type="hidden" id="refreshed" value="no">
<?php echo $this->fetch('content'); ?>
    </div>
</div>
</div>
<?php //echo $this->element('sql_dump');  ?>
</body>
</html>