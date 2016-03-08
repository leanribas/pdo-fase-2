<?php

require_once('db\db.php');
require_once('lib\sca\Aluno.php');

if(isset($_POST['nome']) && is_numeric($_POST['nota']))
{
    $aluno = new Aluno($conexao);
    $aluno->setNome($_POST['nome'])
          ->setNota($_POST['nota']);
    
    if($aluno->inserir() !== false)
    {
        $dados = [
            "success" => true,
            "id" => $aluno->getId()
        ];
    }
    else
    {
        $dados = [
            "success" => false,
            "message" => 'Não foi possível incluir novo aluno.<br>Favor entrar em contato com o suporte.'
        ];
    }
    
    echo json_encode($dados);        
    
}
