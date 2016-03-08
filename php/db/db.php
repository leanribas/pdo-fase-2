<?php

try
{
    $conexao = new \PDO('mysql:host=localhost;dbname=pdo_leandro', 'root', 'root', array(\PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_OBJ));
}
catch (Exception $e)
{
    die('Não foi possível conectar ao banco de dados. Erro: ' . $e->getMessage());
}
