<?php

class Aluno implements EntityInterface
{   
    private $table='alunos';
    private $id;
    private $nome;
    private $nota;
    
    public function getTable()
    {
        return $this->table;
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
        $nome = trim($nome);
        if(empty($nome))
        {
            throw new Exception('Atributo nome não pode ser vazio.');
        } 
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
