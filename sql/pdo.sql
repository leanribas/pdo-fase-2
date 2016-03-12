create database pdo_leandro;
use pdo_leandro;
create table alunos(
  id int auto_increment primary key,
  nome varchar(255),
  nota int);
insert into alunos (nome,nota) values ('Leandro',80);
insert into alunos (nome,nota) values ('Jose',40);
insert into alunos (nome,nota) values ('Maria',80);
insert into alunos (nome,nota) values ('Leandro',60);
insert into alunos (nome,nota) values ('Humberto',50);
insert into alunos (nome,nota) values ('Fabio',30);
insert into alunos (nome,nota) values ('Josiane',80);
insert into alunos (nome,nota) values ('Carlos',30);
insert into alunos (nome,nota) values ('Leticia',90);
insert into alunos (nome,nota) values ('karla',70);
insert into alunos (nome,nota) values ('Mariana',85);
insert into alunos (nome,nota) values ('Adalberto',55);
insert into alunos (nome,nota) values ('Fernando',35);
insert into alunos (nome,nota) values ('Joaquim',68);
insert into alunos (nome,nota) values ('Virginia',99);
insert into alunos (nome,nota) values ('Joana',100);
insert into alunos (nome,nota) values ('Maristela',100);
insert into alunos (nome,nota) values ('Hermione',100);
insert into alunos (nome,nota) values ('Harry',20);
insert into alunos (nome,nota) values ('Rony',45);

create table usuarios(
  id int not null auto_increment primary key,
  nome varchar(255) not null,
  email varchar(255) not null,
  password varchar(255) not null
);
insert into usuarios (nome,email,password) values ('Admin','leanribas@gmail.com',md5('admin'));
insert into usuarios (nome,email,password) values ('Jose','jose@gmail.com',md5('jose'));