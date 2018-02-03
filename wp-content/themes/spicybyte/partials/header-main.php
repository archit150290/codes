<?php 


?>
<div class="header-main">
    <div class="container">
        <nav class="navbar navbar-default">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

            </div>
            <!-- navbar-header -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li class="scroll hvr-underline-from-center">
                        <a href="index.html">Home</a>
                    </li>
                    <li>
                        <a class="scroll hvr-underline-from-center" href="#about">About</a>
                    </li>
                    <li>
                        <a class="scroll hvr-underline-from-center" href="#menu">Menu</a>
                    </li>
                    <li>
                        <a class="scroll hvr-underline-from-center" href="#team">Team</a>
                    </li>
                    <li>
                        <a class="scroll hvr-underline-from-center" href="#testimonials">Testimonials</a>
                    </li>
                    <li>
                        <a class="scroll hvr-underline-from-center" href="#contact">Contact</a>
                    </li>
                </ul>
                <ul class="list-right">
                    <li>
                        <span class="fa fa-envelope-o list-icon" aria-hidden="true"></span>
                        <a href="mailto:info@example.com"><?php echo get_option("info") ?></a>
                    </li>
                    <li>
                        <span class="fa fa-phone list-icon" aria-hidden="true"></span>
                        <p> <?php echo get_option("phone") ?> </p>
                    </li>
                </ul>
            </div>


            <div class="clearfix"> </div>
        </nav>
        <div class="clearfix"> </div>
    </div>
</div>