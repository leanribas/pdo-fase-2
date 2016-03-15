<?php
require_once('..\auth\valida.php');
require_once('..\db\db.php');
require_once('..\lib\sca\EntityInterface.php');
require_once('..\lib\sca\Aluno.php');
require_once('..\lib\sca\ServiceDb.php');

if(is_numeric($_POST['id']) && isset($_POST['nome']) && is_numeric($_POST['nota']))
{
    $aluno = new Aluno();
    $aluno->setId($_POST['id'])
          ->setNome($_POST['nome'])
          ->setNota($_POST['nota']);
    $sdb = new ServiceDb($conexao, $aluno);
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
