<?php 

    // ENV
    define('HTTP','http://dev.lo/startr/');
    define('PROD', false);
    
    if( strpos( $_SERVER['HTTP_ACCEPT'], 'image/webp' ) !== false || strpos( $_SERVER['HTTP_USER_AGENT'], ' Chrome/' ) !== false ) {
        define('USE_WEBP', true);
    } else {
        define('USE_WEBP', false);
    }

