drop database if exists sends;

create database sends;

use sends;

create table users (
    userid serial primary key,
    username varchar(100) not null,
    email varchar(100) not null,
    userpass varchar(100) not null
);

insert into users (username, email, userpass) values ('owlincode', 'keepsaunawarm@gmail.com', 'letthestarsfalldown');
insert into users (username, email, userpass) values ('blackcat', 'olutonthevine@gmail.com', 'happycoding');

create table posts (
    postid serial primary key,
    userid serial not null, 
    postcontent text not null,
    foreign key(userid) references users(userid)
    on delete restrict 
    on update cascade
);
 insert into posts (userid, postcontent) values ('1', 'Hello World!');
 insert into posts (userid, postcontent) values ('2', 'The water is nice <3');
 insert into posts (userid, postcontent) values (2, 'Explore the world with SENDS!');
 
 create table comments (
    commentid serial primary key,
    postid serial not null,
    userid serial not null,
    commentcontent text not null,
    foreign key(postid) references posts(postid)
    on delete restrict
    on update cascade,
    foreign key(userid) references users(userid)
    on delete restrict
    on update cascade
);
insert into comments (postid, userid, commentcontent) values (1, 2, 'Terve!');
insert into comments (postid, userid, commentcontent) values (1, 1, 'Hei hei!');
insert into comments (postid, userid, commentcontent) values (3, 1, 'Great!');
insert into comments (postid, userid, commentcontent) values (3, 2, 'Would you like some coffee?');