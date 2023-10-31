create database ToDoDB;

use ToDoDB;

create table ToDos (id int AUTO_INCREMENT, task varchar(125) not null, date date,priority varchar(20) not null, status varchar(10) not null, primary key(id));