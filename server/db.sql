drop database if exists sends;

create database sends;

use sends;

create table users (
    userid int primary key auto_increment,
    username varchar(100) not null,
    email varchar(100) not null,
    userpass varchar(100) not null,
);

insert into users (username, email, userpass) values ('owlincode', 'keepsaunawarm@gmail.com', 'letthestarsfalldown');
insert into users (username, email, userpass) values ('blackcat', 'olutonthevine@gmail.com', 'happycoding');

create table posts (
    postid int primary key auto_increment,
    userid int not null, 
    postcontent text not null,
    foreign key(userid) references users(userid)
    on delete restrict 
    on update cascade
);
 insert into posts (userid, postcontent) values (1, 'Hello World!');
 insert into posts (userid, postcontent) values (2, 'The water is nice <3');
 insert into posts (userid, postcontent) values (2, 'Explore the world with SENDS!');
