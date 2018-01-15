<?php
/**
 * @var \App\View\AppView $this
 * @var \App\Model\Entity\Article $article
 */
?>
<nav class="large-3 medium-4 columns" id="actions-sidebar">
    <ul class="side-nav">
        <li class="heading"><?= __('Actions') ?></li>
        <li><?= $this->Form->postLink(
                __('Delete'),
                ['action' => 'delete', $article->id],
                ['confirm' => __('Are you sure you want to delete # {0}?', $article->id)]
            )
        ?></li>
        <li><?= $this->Html->link(__('List Articles'), ['action' => 'index']) ?></li>
    </ul>
</nav>
<div class="articles form large-9 medium-8 columns content">
    <?= $this->Form->create($article,  ['enctype' => 'multipart/form-data']) ?>
    <fieldset>
        <legend><?= __('Edit Article') ?></legend>
        <?php
            echo $this->Form->control('title');
            echo $this->Form->control('excerpt');
            echo $this->Form->control('body');
            echo $this->Form->control('category_id');
            echo "<br>";
            
        ?>
        <?php 
        
        
        if(file_exists(WWW_ROOT."files/".$article->image)): ?>
            <div class="input">
            <label>Existing Image:</label>
            <?php 
                echo $this->Html->image("../files/".$article->image, array('width'=>200));
            ?>
            </div>
            <div class="editornotedit">
                <span class="edit"><a class="editimage">edit image</a></span>
            </div>
            
           
        <?php endif; ?>
        <div id="divhidden" style="">
            <?php echo $this->Form->control('image', ['type' => 'file',  'label' => __('Featured Image')]); ?>
        </div>
        
    </fieldset>
    <?= $this->Form->button(__('Submit')) ?>
    <?= $this->Form->end() ?>
</div>

<script>

</script>
