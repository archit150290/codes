<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li><?= $this->Html->link(__('Login'), ['controller' => 'Users', 'action' => 'login']) ?></li>
        <li><?= $this->Html->link(__('Sign Up'), ['controller' => 'Users', 'action' => 'signup']) ?></li>
        <li><?= $this->Html->link(__('Forgot Password'), ['controller' => 'Users', 'action' => 'forgotpassword']) ?></li>
        <li><?= $this->Html->link(__('About Us'), ['controller' => 'Users', 'action' => 'forgotpassword']) ?></li>
        <li><?= $this->Html->link(__('Contact Us'), ['controller' => 'Users', 'action' => 'forgotpassword']) ?></li>
</nav>