<?php
require_once('..\db\db.php');
require_once('..\lib\sca\EntityInterface.php');
require_once('..\lib\sca\ServiceDb.php');
require_once('..\lib\sca\Usuario.php');
$dados = [
    "success" => false,
    "message" => 'E-mail/senha informados não encontrado.'
];

if(isset($_POST['username']) && isset($_POST['password']))
{
   $u = new Usuario();
   $sdb = new ServiceDb($conexao, $u);
   $resultado = $sdb->find(['email'=>$_POST['username']]);  
   if(count($resultado) > 0)
   {
       if(md5($_POST['password']) === $resultado[0]->password)
       {
           $dados = [               
               "success" => true,
               "access_token"=> "9c5742da1edc3531da2009fb35bb843c49e2e680",
               "expires_in"=> 3600,
               "token_type"=> "Bearer",
               "scope"=> null,
               "refresh_token"=> "1a8ceb5b59dac24f532b852e544ec3b834cea53c",
               "user_name"=> $resultado[0]->nome
           ];
       }
   }    
       
}    

echo json_encode($dados);
