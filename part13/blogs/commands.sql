CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text ,
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
);

insert into blogs (author, url, title) values ('David Harbour', 'https://www.strangeworlds.com', 'Welcome to Hawkins');
insert into blogs (author, url, title, likes) values ('Charles Jhonson', 'https://www.sanandreasworld.com', 'A tragedy in San Andreas', 10);
