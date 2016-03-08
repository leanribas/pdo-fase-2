<?php

require_once('db\db.php');
require_once('lib\sca\Aluno.php');

if(is_numeric($_POST['id']))
{
    $aluno = new Aluno($conexao);
    
    if($aluno->deletar($_POST['id']))
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

