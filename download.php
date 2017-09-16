<?php
include_once('wp-config.php');
if(isset($_COOKIE['Cambey_Login']))
{
    $file = urldecode($_REQUEST["file"]);
    $upload_dir = wp_upload_dir();
    $uploadDirectory = $upload_dir['basedir']."/";
    $file = $uploadDirectory.base64_decode($file); 
    if (file_exists($file)) {

        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header("Content-Type: application/force-download");
        header('Content-Disposition: attachment; filename=' . urlencode(basename($file)));
        // header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: ' . filesize($file));
        ob_clean();
        flush();
        readfile($file);
        exit;
    }
}else{
    header('Location:'.home_url());
}
?>