<?php
require_once('..\auth\valida.php');
require_once('..\db\db.php');
require_once('..\lib\sca\EntityInterface.php');
require_once('..\lib\sca\Usuario.php');
require_once('..\lib\sca\ServiceDb.php');

if(isset($_POST['nome']) && isset($_POST['email']) && isset($_POST['password']))
{
    $usuario = new Usuario();
    $usuario->setNome($_POST['nome'])
            ->setEmail($_POST['email'])
            ->setPassword($_POST['password']);
    $sdb = new ServiceDb($conexao,$usuario);
    if($sdb->inserir() !== false)
    {
        $dados = [
            "success" => true,
            "id" => $usuario->getId()
        ];
    }
    else
    {
        $dados = [
            "success" => false,
            "message" => 'Não foi possível incluir novo usuário.<br>Favor entrar em contato com o suporte.'
        ];
    }
    
    echo json_encode($dados);        
    
}
