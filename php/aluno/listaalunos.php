<?php
require_once('..\auth\valida.php');
require_once('..\db\db.php');
require_once('..\lib\sca\EntityInterface.php');
require_once('..\lib\sca\Aluno.php');
require_once('..\lib\sca\ServiceDb.php');

$a = new Aluno();
$sdb = new ServiceDb($conexao, $a);
$alunos = $sdb->listar('nome');

$dados = array();
foreach ($alunos as $aluno)
{
    $dados[] = [
        'id' => $aluno->id,
        'nome' => $aluno->nome,
        'nota' => $aluno->nota
    ];
}

echo json_encode($dados);
