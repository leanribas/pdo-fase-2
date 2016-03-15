<?php
$continue = true;
if(isset($_COOKIE) && isset($_COOKIE['appCookie']))
{
    $dados = json_decode($_COOKIE['appCookie']);
    
    if(!isset($dados->access_token) || $dados->access_token != '9c5742da1edc3531da2009fb35bb843c49e2e680')
    {
      $continue=false;
    }
    
}else
{
  $continue = false;
}

if($continue==false)
{
    header('HTTP/1.1 401 Unauthorized');
    exit;
}