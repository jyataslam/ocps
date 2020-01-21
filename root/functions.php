<?php

if(!function_exists('handleCors')){
    function handleCors(){
        header("Access-Control-Allow-Origin: *");
        if ($_SERVER['REQUEST_METHOD']==='OPTIONS'){
            header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
            exit();
        }
    }
}

?>