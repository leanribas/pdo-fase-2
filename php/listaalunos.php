<?php
require_once('db\db.php');
require_once('lib\sca\Aluno.php');

$a = new Aluno($conexao);
$alunos = $a->listar('nome');

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
