<?php
require_once('..\auth\valida.php');
require_once('..\db\db.php');
require_once('..\lib\sca\EntityInterface.php');
require_once('..\lib\sca\Usuario.php');
require_once('..\lib\sca\ServiceDb.php');

if(is_numeric($_POST['id']) && isset($_POST['nome']) && isset($_POST['email']) && isset($_POST['password']))
{
    $usuario = new Usuario();
    $usuario->setId($_POST['id'])
          ->setNome($_POST['nome'])
          ->setEmail($_POST['email'])
          ->setPassword($_POST['password']);
    $sdb = new ServiceDb($conexao, $usuario);
    if($sdb->alterar())
    {
        $dados = [
            "success" => true
        ];
    }
    else        
    {
        $dados = [
            "success" => false,
            "message" => 'Não foi possível alterar os dados.'
        ];
    }
    
    echo json_encode($dados);
}
