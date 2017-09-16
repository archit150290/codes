<div class="banner">
    <div class="container">
        <div class="col-md-5"> 
            <span>
                <?php echo $this->Html->Image("/images/logo.png", array("width" => "138"));?>
            </span>
            <h2 class="">WELCOME TO <br />
                THE REVOLUTION.</h2>
            <h4>nDorse is a mobile and web based application that allows real time positive reinforcement and feedback by saying something nice to your colleagues and friends.</h4>
            <span>
                <?php echo $this->Html->link($this->Html->Image("/images/get-app.png" , array("alt" => "")), array("controller" => "site", "action" => "contact"), array("escape" => false));?>
                
            </span> 
        </div>
        
        <div class="col-md-7"> <span><?php echo $this->Html->Image("/images/mob-hand.png" , array("alt" => "")); ?></span>
            <div class="adm-rep-btn"></div>
        </div>
    </div>
    <div class="clearfix"></div>
</div>
<div class="container">
    <section class="real-time">
        <div class="text-center">
            <div class="col-md-4 "> <?php echo $this->Html->Image("/images/bage.png" , array("alt" => "")); ?>
                <h3>THE ONLY APP YOU'LL EVER NEED TO KEEP YOUR WORK FORCE MOTIVATED</h3>
                <p class="text-left">Getting a pat on your back or knowing you made a small difference in someone's day - a positive reinforcement that what your doing matters goes a long way in keeping us motivated. <br />
                    <br />
                    nDorse allows good deeds and "star" people to be recognized. The reward is in the recognition! </p>
<!--                <div class="home-contact">
                    <div class="pull-left"><?php //echo $this->Html->Image("/images/phone.png", array("alt" => "", "align" => "left")); ?></div>
                    <div class="pull-right text-left">
                        <h5><strong>Contact</strong></h5>
                        <p class="text-left">NDORSE LLC<br />
                            Email:  <a href="mailto:support@ndorse.net?Subject=" target="_top" >support@ndorse.net</a>
                            </p>
                    </div>
                    <div class="clearfix"></div>
                </div>-->
            </div>
            <div class="col-md-4 "> <?php echo $this->Html->Image("/images/edit.png" , array("alt" => "")); ?>
                <h3>WHAT SETS US APART....</h3>
                <p class="text-left"><strong>REAL TIME</strong>, immediate and mobile based ability to endorse and acknowledge friends and colleagues.<br />
                    <br />
                    At work, nDorse allows acknowledgement in a sophisticated, efficient fashion of good deeds, skills or institutional core values visible to your friends, colleagues, and to institutional administration. </p>
                <div>
                    <iframe width="320" height="200" src="https://www.youtube.com/embed/UmAXQPVgkic" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
            <div class="col-md-4 "> <?php echo $this->Html->Image("/images/work-force.png" , array("alt" => "")); ?>
                <h3>nDorse FOR THE WORK FORCE!</h3>
                <p class="text-left">Institutions and companies employ positive reinforcement strategies to help employees understand their company goals and mission and to keep the work force motivated. <br />
                    <br />
                    Most leadership consider this an investment in their well-being of the institution and its employees.<br />
                    <br />
                    nDorse incorporates institutional objectives and provides a real time web based tool for positive reinforcement. <br />
                    <br />
                    Data analysis allows generation of several reports to help identify STAR employees and departments! </p>
            </div>
        </div>
        <div class="clearfix"></div>
        <div>&nbsp;</div>
    </section>


</div>
<section class="follow-us">
    <div class="container">
        <div class="col-md-12 text-center"> 
            <?php echo $this->Html->Image("/images/follow-us.png", array("alt" => "")); ?>
            <div class="social"><a href="https://www.facebook.com/nDorsellc/" target="blank"><?php echo $this->Html->Image("/images/fb.png" , array("alt" => "")); ?></a>
                <a href="https://twitter.com/ndorsellc"  data-show-count="false" target="blank"><?php echo $this->Html->Image("/images/twitter.png" , array("alt" => "")); ?></a><script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

            </div>
        </div>
    </div>
</section>
<?php echo $this->Element("footersite");?>
