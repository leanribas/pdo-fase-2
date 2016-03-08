<?php

class Aluno
{
    private $db;
    private $id;
    private $nome;
    private $nota;
    
    public function __construct(\PDO $db)
    {
        $this->db = $db;
    }
    
    public function listar($order = null)
    {
        $q = 'select * from alunos';
        if(is_string($order))
        {
            $q .= ' order by ' . $order;
        }    
        
        $stmt = $this->db->query($q);
        return $stmt->fetchAll();
            
    }
    
    public function listarMaioresNotas($qtdRegistros)
    {
        $q = 'select * from alunos order by nota desc limit ' . $qtdRegistros;        
        $stmt = $this->db->query($q);
        return $stmt->fetchAll();
    }
    
    public function inserir(){
        $sql = 'insert into alunos (nome,nota) values (:nome,:nota)';
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':nome',$this->getNome(),\PDO::PARAM_STR);
        $stmt->bindValue(':nota',$this->getNota(),\PDO::PARAM_INT);
        if(!$stmt->execute())
        {
            return false;
        }
        else
        {   
           $this->setId($this->db->lastInsertId());
           return $this->getId();
        }
    }
    
    public function alterar(){
        $sql = 'update alunos set nome= :nome, nota= :nota where id= :id';
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id',$this->getId(),\PDO::PARAM_INT);
        $stmt->bindValue(':nome',$this->getNome(),\PDO::PARAM_STR);
        $stmt->bindValue(':nota',$this->getNota(),\PDO::PARAM_INT);
        return $stmt->execute();
    }
    
    public function deletar($id)
    {
        $sql = 'delete from alunos where id= :id';
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id);
        return $stmt->execute();
    }
    
    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
        return $this;
    }

        
    public function getNome()
    {
        return $this->nome;
    }

    public function getNota()
    {
        return $this->nota;
    }

    public function setNome($nome)
    {
        $this->nome = $nome;
        return $this;
    }

    public function setNota($nota)
    {
        if($nota >=0 && $nota <= 100)
        {
          $this->nota = $nota;            
        }    
        else
        {
            throw new Exception('Nota do Aluno pode ser entre 0 e 100');
        }
        
        return $this;
    }


    
    
}
