<?php

require_once('db\db.php');
require_once('lib\sca\EntityInterface.php');
require_once('lib\sca\Aluno.php');
require_once('lib\sca\ServiceDb.php');

if(isset($_POST['nome']) && is_numeric($_POST['nota']))
{
    $aluno = new Aluno();
    $aluno->setNome($_POST['nome'])
          ->setNota($_POST['nota']);
    $sdb = new ServiceDb($conexao,$aluno);
    if($sdb->inserir() !== false)
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
