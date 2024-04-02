drop database if exists sends;

create database sends;

use sends;

create table users (
    user_id int primary key auto_increment,
    user_name varchar(100) not null,
    email varchar(100) not null,
    password varchar(100) not null,
);

insert into users (user_name, email, password) values ('owlincode', 'keepsaunawarm@gmail.com', 'letthestarsfalldown');
insert into users (user_name, email, password) values ('blackcat', 'olutonthevine@gmail.com', 'happycoding');

create table posts (
    post_id int primary key auto_increment,
    user_id int not null, 
    post_content text not null,
    foreign key(user_id) references users(user_id)
    on update cascade
);
 insert into posts (user_id, post_content) values (1, 'Hello World!');
 insert into posts (user_id, post_content) values (2, 'The water is nice <3');
 insert into posts (user_id, post_content) values (2, 'Explore the world with SENDS!');

create table comments (
    comment_id int primary key auto_increment,
    post_id int not null,
    user_id int not null,
    comment_content text not null,
    foreign key(post_id) references posts(post_id)
    on update cascade,
    foreign key(user_id) references users(user_id)
    on update cascade
);
insert into comments (post_id, user_id, comment_content) values (1, 2, 'Terve!');
insert into comments (post_id, user_id, comment_content) values (1, 1, 'Hei hei!');
insert into comments (post_id, user_id, comment_content) values (3, 1, 'Great!');
insert into comments (post_id, user_id, comment_content) values (3, 2, 'Would you like some coffee?');
