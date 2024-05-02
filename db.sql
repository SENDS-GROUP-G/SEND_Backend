/* 
 drop database if exists sends;
 create database sends; 
 use sends;
*/
drop table if exists feedbacks;

drop table if exists replies;

drop table if exists comment_reacts;

drop table if exists post_reacts;

drop table if exists comments;

drop table if exists posts;

drop table if exists users;

drop table if exists ratings;

drop table if exists reacts;

drop table if exists avatars;

create table avatars (
    id serial primary key,
    img varchar(20) unique not null,
    link varchar(255) unique not null
);

insert into avatars (img, link) values
('i001', 'https://i.ibb.co/BfkK4vC/1af6d895312312d045c0786302d03bca-tove-jansson-moomin.jpg'),
('i002', 'https://i.ibb.co/ZHdrMFp/2863757-shikisaber4.jpg'),
('i003', 'https://i.ibb.co/fv2VdXD/channels4-profile.jpg'),
('i004', 'https://i.ibb.co/rfKBpm1/download.jpg'),
('i005', 'https://i.ibb.co/54TytpC/OIP-1.jpg'),
('i006', 'https://i.ibb.co/h2nfYCh/OIP-2.jpg'),
('i007', 'https://i.ibb.co/crYjc4Q/OIP.jpg'),
('i008', 'https://i.ibb.co/n86MTjp/R-1.jpg'),
('i009', 'https://i.ibb.co/6DzmTKC/R.jpg'),
('i010', 'https://i.ibb.co/S6J9Ydx/Screenshot-2024-05-02-024455.png');

create table users (
    user_id serial primary key,
    user_name varchar(100) unique not null,
    email varchar(100) unique not null,
    password varchar(255) not null,
    avatar int,
    constraint fk_avatar foreign key(avatar) references avatars(id)
);

INSERT INTO users (user_name, email, password, avatar)
VALUES (
    'neko',
    'neko@foo.com',
    'password123',
    (SELECT id FROM avatars ORDER BY random() LIMIT 1)
);

INSERT INTO users (user_name, email, password, avatar)
VALUES (
    'pupu',
    'pupu@foo.com',
    'password123',
    (SELECT id FROM avatars ORDER BY random() LIMIT 1)
);

INSERT INTO users (user_name, email, password, avatar)
VALUES (
    'koira',
    'koira@foo.com',
    'password123',
    (SELECT id FROM avatars ORDER BY random() LIMIT 1)
);

create table posts (
    post_id serial primary key,
    title varchar(100) not null,
    saved timestamp default current_timestamp,
    user_id int not null,
    constraint fk_user foreign key(user_id) references users(user_id),
    post_content text not null
);

insert into
    posts (user_id, title, post_content)
values
    (1, 'My first post', 'Hello World!');

insert into
    posts (user_id, title, post_content)
values
    (2, 'Test', 'The weather is nice <3');

insert into
    posts (user_id, title, post_content)
values
    (2, 'Greeting', 'Explore the world with SENDS!');

create table comments (
    comment_id serial primary key,
    comment_content text not null,
    saved timestamp default current_timestamp,
    post_id int not null,
    constraint fk_posts foreign key (post_id) references posts(post_id),
    user_id int not null,
    constraint fk_users foreign key (user_id) references users(user_id)
);

insert into
    comments (post_id, user_id, comment_content)
values
    (1, 2, 'Terve!');

insert into
    comments (post_id, user_id, comment_content)
values
    (1, 1, 'Hei hei!');

insert into
    comments (post_id, user_id, comment_content)
values
    (3, 3, 'Great!');

insert into
    comments (post_id, user_id, comment_content)
values
    (3, 2, 'Would you like some coffee?');

create table reacts (
    react_id serial primary key,
    react varchar(20) not null
);

insert into 
    reacts (react)
values
    ('Like');

create table post_reacts (
    id serial primary key,
    react_id int not null,
    constraint fk_reacts foreign key (react_id) references reacts(react_id),
    post_id int not null,
    constraint fk_posts foreign key (post_id) references posts(post_id),
    user_id int not null,
    constraint fk_users foreign key (user_id) references users(user_id),
    saved timestamp default current_timestamp
);

insert into 
    post_reacts (react_id, post_id, user_id)
values
    (1, 1, 1);
insert into 
    post_reacts (react_id, post_id, user_id)
values
    (1, 1, 2);
insert into 
    post_reacts (react_id, post_id, user_id)
values
    (1, 1, 3);

create table comment_reacts (
    id serial primary key,
    react_id int not null,
    constraint fk_reacts foreign key (react_id) references reacts(react_id),
    comment_id int not null,
    constraint fk_comments foreign key (comment_id) references comments(comment_id),
    user_id int not null,
    constraint fk_users foreign key (user_id) references users(user_id),
    saved timestamp default current_timestamp
);


create table replies (
    id serial primary key,
    reply text not null,
    saved timestamp default current_timestamp,
    comment_id int not null,
    constraint fk_comments foreign key (comment_id) references comments(comment_id),
    user_id int not null,
    constraint fk_users foreign key (user_id) references users(user_id)
);

create table ratings (
    id serial primary key,
    rate varchar(10) unique
);

insert into ratings (rate) values
('01'),
('02'),
('03'),
('04'),
('05');

create table feedbacks (
    id serial primary key,
    title varchar(100) not null,
    content text not null,
    saved timestamp default current_timestamp,
    user_id int not null,
    constraint fk_users foreign key (user_id) references users(user_id),
    rate int,
    constraint fk_ratings foreign key (rate) references ratings(id)
);

insert into
    feedbacks (rate, title, content, user_id)
values
    (5, 'Test feedback', 'This is a test', 3),
    (2, 'Test feedback', 'This could be better', 2);