<?php 
echo $this->Element("commonModal");
echo $this->Element("iframeModal");
?>

<div class="login ">
  <div class="text-center"><img src="<?php echo Router::url('/', true); ?>img/logo.png" width="125" alt="" /> </div>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h2>Log In</h2>
    </div>
    <div class="panel-body">
      <p><?php echo $this->Session->Flash(); ?></p>
      <div class="col-md-12">
        <div class="col-md-5"> <?php echo $this->Form->create('User', array('class' => 'form-signin')); ?>
          <div class="form-group"> 
            <!--            <input type="text" class="form-control" id="email" placeholder="Email" />-->
            <?php if (isset($errorMsg)) { ?>
              <label class="error"><?php echo $errorMsg; ?></label>
              <?php } ?>
            <?php echo $this->Form->input('email', array('placeholder' => "Email", 'class' => "form-control", 'label' => false)); ?> </div>
          <div class="form-group"> 
            <!--            <input type="password" class="form-control" id="email" placeholder="Password" />--> 
            <?php echo $this->Form->input('password', array('placeholder' => "Password", 'class' => "form-control", 'label' => false)); ?> </div>
          <div class="form-group">
            <button class="btn btn-lg btn-primary btn-block" type="submit">Log In</button>
          </div>
          <div class="checkbox"> <?php echo $this->Form->checkbox('rememberme', array('class' => 'css-checkbox', "hiddenField" => FALSE, 'label' => false)); ?>
            <label class="css-label" for="UserRememberme">Remember Me</label>
            <div class="pull-right text-right">
              <div class="text-right"><a href="<?php echo Router::url('/', true) . "client/forgotPassword"; ?>" module="client" id="forgotPassword">Forgot Password?</a></div>
              <div class="text-right"><a href="<?php echo Router::url('/', true) . "client/recoverUsername"; ?>" id="recoverUsername">Recover Username?</a></div>
            </div>
          </div>
          <?php echo $this->Form->end(); ?> </div>
        <div class="col-md-2 text-center"> <img src="<?php echo Router::url('/', true); ?>img/or-login.png" alt="" /> </div>
        <div class="col-md-5"><br />
          <br />
          <br />
          <div class="pull-right form-group"> <a href="<?php echo $fbLoginUrl; ?>"><img src="<?php echo Router::url('/', true); ?>img/fb.png" alt="" align="left" /></a> </div>
          <div class="pull-right form-group"> <a href="<?php echo $gplusLoginUrl; ?>"><img src="<?php echo Router::url('/', true); ?>img/g+.png" alt="" align="left" /></a> </div>
          <div class="pull-right form-group"> <a href="<?php echo $linkedinLoginUrl; ?>"><img src="<?php echo Router::url('/', true); ?>img/linkedin.png" alt="" align="left" /></a> </div> 
        </div>
      </div>
      <div class="col-md-12 text-center dont-have">
        <h4>Don't have an account yet?</h4>
        <div class="form-group"> <?php echo $this->Html->link('Sign Up', Router::url('/', true) . 'client/register', array('class' => 'btn small btn-orange')); ?>
          <div class="faq"><a class="showInIframe" id="showFaqs" href="<?php echo Router::url('/', true); ?>client/faq">FAQ</a></div>
        </div>
      </div>
    </div>
  </div>
</div>