<?php

require_once('db\db.php');
require_once('lib\sca\Aluno.php');

if(is_numeric($_POST['id']) && isset($_POST['nome']) && is_numeric($_POST['nota']))
{
    $aluno = new Aluno($conexao);
    $aluno->setId($_POST['id'])
          ->setNome($_POST['nome'])
          ->setNota($_POST['nota']);
    
    if($aluno->alterar())
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
