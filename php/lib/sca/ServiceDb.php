<?php

class ServiceDb
{
    private $entity;
    private $db;
    private $columns = null;
    
    public function __construct(\PDO $db, EntityInterface $entity)
    {
        $this->db = $db;
        $this->entity = $entity;
    }
    
    public function listar($order = null, $limit = null)
    {
        $q = "select * from {$this->entity->getTable()}";
        if(is_string($order))
        {
            $q .= ' order by ' . $order;
        }    
        
        if(is_numeric($limit))
        {
            $q .= ' limit ' . $limit;
        }
        
        $stmt = $this->db->query($q);
        return $stmt->fetchAll();
            
    }
    
    public function inserir(){
        $sql = $this->prepareInsert();
        $stmt = $this->db->prepare($sql);
        $columns = $this->getColumns();
        foreach ($columns as $col)
        {
            $get = 'get'.ucfirst($col);
            $stmt->bindValue(':'.$col,$this->entity->$get());
        }        
        if(!$stmt->execute())
        {
            return false;
        }
        else
        {   
           $this->entity->setId($this->db->lastInsertId());
           return $this->entity->getId();
        }
    }
    
    public function alterar(){
        $sql = $this->prepareUpdate();
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id',$this->entity->getId(),\PDO::PARAM_INT);
        $columns = $this->getColumns();
        foreach ($columns as $col)
        {
            $get = 'get'.ucfirst($col);
            $stmt->bindValue(':'.$col, $this->entity->$get());
        }
        return $stmt->execute();
    }
    
    public function deletar($id)
    {
        $sql = "delete from {$this->entity->getTable()} where id= :id";
        $stmt = $this->db->prepare($sql);
        $stmt->bindValue(':id', $id);
        return $stmt->execute();
    }   
    
    public function getColumns()
    {
        if($this->columns === null)
        {
            $q = "select * from {$this->entity->getTable()}";
            $stmt = $this->db->query($q);
            $stmt->execute();
            $columns = array_keys($stmt->fetch(\PDO::FETCH_ASSOC));
            $i = array_search('id', $columns);
            if($i !== false)
            {
                unset($columns[$i]);
            }
            $this->columns = $columns;
        }
        return $this->columns;
    }
    
    public function prepareInsert()
    {
        $columns = $this->getColumns();
        $sql = "insert into {$this->entity->getTable()} ("
            . implode(',',$columns)
            . ') values ('
            . implode(',',array_map(function($v){return ':'.$v;},$columns))
            . ')';
        return $sql;        
    }
    
    public function prepareUpdate()
    {
        $columns = $this->getColumns();
        $sql = "update {$this->entity->getTable()} set "
            . implode(',',array_map(function($v){return $v.'= :'.$v;},$columns))
            . ' where id= :id';
        return $sql;   
    }
        
}
