<?php
require_once('..\auth\valida.php');
require_once('..\db\db.php');
require_once('..\lib\sca\EntityInterface.php');
require_once('..\lib\sca\ServiceDb.php');
require_once('..\lib\sca\Usuario.php');


$usuario = new Usuario();
$sdb = new ServiceDb($conexao,$usuario);
$usuarios = $sdb->listar('nome');
$dados = array();
foreach ($usuarios as $u)
{
    $dados[]= [
        'id' => $u->id,
        'nome' => $u->nome,
        'email' => $u->email
    ];    
}

echo json_encode($dados);

