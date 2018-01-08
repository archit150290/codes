<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\User $user
 */
?>
<?php echo $this->element("sidemenus/sidemenu-loggedout");?>
<div class="users form large-9 medium-8 columns content">


    <div class="row">
    	<div class="col-md-12 col-md-offset-4">
    		<div class="panel panel-default">
			  	<div class="panel-heading">
			    	<h3 class="panel-title">Login</h3>
			 	</div>
			  	<div class="panel-body">
                    <?= $this->Form->create() ?>
                    <fieldset>
			    	  	<div class="form-group">
			    		    <?php echo $this->Form->control('email', ['class' => 'form-control']); ?>
			    		</div>
			    		<div class="form-group">
			    			<?php echo $this->Form->control('password', ['class' => 'form-control']); ?>
			    		</div>
			    		<!-- <div class="checkbox">
			    	    	<label>
			    	    		<input name="remember" type="checkbox" value="Remember Me"> Remember Me
			    	    	</label>
			    	    </div> -->
                        <?= $this->Form->button(__('Submit'), ["class" =>"btn btn-lg btn-success btn-block" ]) ?>
			    	</fieldset>
                    <?= $this->Form->end() ?>
                      <hr/>
                    <center><h4>OR</h4></center>
                    <input class="btn btn-lg btn-facebook btn-block" type="submit" value="Login via facebook">
			    </div>
			</div>
		</div>
	</div>

</div>

