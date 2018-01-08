<?php
if (!isset($params['escape']) || $params['escape'] !== false) {
    $message = h($message);
}
?>

<div class="alert alert-warning alert-dismissible text-center" role="alert">
  <?= $message ?>
</div>