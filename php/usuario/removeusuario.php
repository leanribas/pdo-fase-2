<?php
require_once('..\auth\valida.php');
require_once('..\db\db.php');
require_once('..\lib\sca\EntityInterface.php');
require_once('..\lib\sca\Usuario.php');
require_once('..\lib\sca\ServiceDb.php');

if(is_numeric($_POST['id']))
{
    $usuario = new Usuario();
    $sdb = new ServiceDb($conexao, $usuario);
    
    if($sdb->deletar($_POST['id']))
    {
        $dados = [
            "success" => true
        ];
    }
    else
    {
        $dados = [
            "success" => false,
            "message" => 'Não foi possível remover o registro.'
        ];
    }
    
    echo json_encode($dados);
}

