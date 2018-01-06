<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\User $user
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Html->link(__('Login'), ['action' => 'view']) ?></li>
    </ul>
</nav>
<div class="users form large-9 medium-8 columns content">
    <?= $this->Form->create($user) ?>
   <?php /*?> <fieldset>
        <legend><?= __('Add User') ?></legend>
        <?php
            echo $this->Form->control('email');
            echo $this->Form->control('password');
            echo $this->Form->control('phone');
        ?>
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
    <?php */?>

    <?= $this->Form->create($user) ?>
  <fieldset>
    <legend>Sign Up</legend>
    <div class="form-group">
      <?php echo $this->Form->control('email', ["name" => "email", "class" => "form-control", "id" => "exampleInputEmail1", "aria-describedby" => "emailHelp", "placeholder" => "Enter Email"]); ?>
    </div>
    <div class="form-group">      
      <?php echo $this->Form->control('Password', ["name" => "password","class" => "form-control", "id" => "exampleInputPassword1", "placeholder" => "Enter Password", "type" => "password"]); ?>
    </div>
   
    <div class="form-group">
      <?php echo $this->Form->control('Phone', ["name" => "phone", "required" => "required", "class" => "form-control", "id" => "exampleInputPhone", "aria-describedby" => "emailHelp", "placeholder" => "Enter Phone"]); ?>
    </div>
  
    <?= $this->Form->button(__('Sign Up'), ['class' => 'btn btn-primary']) ?>
    
  </fieldset>
  <?= $this->Form->end() ?>


</div>
