<?php
require_once('..\auth\valida.php');
require_once('..\db\db.php');
require_once('..\lib\sca\EntityInterface.php');
require_once('..\lib\sca\Aluno.php');
require_once('..\lib\sca\ServiceDb.php');

if(is_numeric($_POST['id']))
{
    $aluno = new Aluno($conexao);
    $sdb = new ServiceDb($conexao, $aluno);
    
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

