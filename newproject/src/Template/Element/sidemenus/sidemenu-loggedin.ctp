<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li role="separator" class="divider"></li>
        <li class="heading"><?php echo $viewName; ?></li>
        <li><?= $this->Html->link(__('New '.$viewName), ['controller' => 'Users', 'action' => 'signup']) ?></li>
        <li role="separator" class="divider"></li>
        <li class="heading">My Account</li>
        <li><?= $this->Html->link(__('Change Password'), ['controller' => 'Users', 'action' => 'changepassword']) ?></li>
        
        <li role="separator" class="divider"></li>
        <li class="heading">Others</li>
        
        <li><?= $this->Html->link(__('About Us'), ['controller' => 'Users', 'action' => 'forgotpassword']) ?></li>
        <li><?= $this->Html->link(__('Contact Us'), ['controller' => 'Users', 'action' => 'forgotpassword']) ?></li>

        <li role="separator" class="divider"></li>
        <li class="heading">Admin</li>
        <li><?= $this->Html->link(__('List Users'), ['controller' => 'Users', 'action' => 'index']) ?></li>
</nav>