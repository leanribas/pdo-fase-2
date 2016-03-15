<?php

class Usuario implements EntityInterface
{
    private $table='usuarios';
    private $id;
    private $nome;
    private $email;
    private $password;
    
    public function getTable()
    {
        return $this->table;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNome()
    {
        return $this->nome;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setId($id)
    {
        if(!is_numeric($id))
        {
            throw new Exception('Id do usuário deve ser um número');
        }
        $this->id = $id;
        return $this;
    }

    public function setNome($nome)
    {
        $nome = trim($nome);
        if(empty($nome))
        {
            throw new Exception('Atributo nome do usuário não pode ser vazio');
        }
        $this->nome = $nome;
        return $this;
    }

    public function setEmail($email)
    {
        $email = trim($email);
        $p = "^[a-zA-Z0-9\._-]+@[a-zA-Z0-9\._-]+.([a-zA-Z]{2,4})$";        
        if(ereg($p, $email))
        {
            $this->email = $email;
            return $this;              
        }
        else
        {
            throw new Exception('e-mail do usuário não válido');
        }
            

    }

    public function setPassword($password)
    {
        $password=trim($password);
        if(strlen($password) >= 6)
        {    
          $this->password = $password;
          return $this;
        }
        else
        {
            throw new Excepton('Password do usuário deve conter no mínino 6 carecteres');
        }    
    }
    
}