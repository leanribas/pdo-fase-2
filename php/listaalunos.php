<?php

try
{
    $conexao = new \PDO('mysql:host=localhost;dbname=pdo_leandro','root','root',array(\PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_OBJ));
    
    $query = 'select * from alunos order by nome';
    
    $stmt = $conexao->query($query);
    
    $resultado = $stmt->fetchAll();
    
    $dados = array();
    foreach ($resultado as $aluno)
    {
        $dados[] = [
            'id' => $aluno->id,
            'nome' => $aluno->nome,
            'nota' => $aluno->nota
        ];
    }
    
    echo json_encode($dados);
    
} catch (Exception $ex) {
    
    echo 'Não foi possível estabelecer conexão com o banco de dados';

}