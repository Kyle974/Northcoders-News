DROP DATABASE IF EXISTS northcoders_news;
CREATE DATABASE northcoders_news;

-- CREATE TABLE topics (
-- slug VARCHAR PRIMARY KEY NOT NULL,
-- topic_description VARCHAR
-- );

-- CREATE TABLE users (
-- username VARCHAR PRIMARY KEY NOT NULL,
-- avatar_url VARCHAR,
-- name_of_user VARCHAR NOT NULL
-- );

-- CREATE TABLE articles (
-- article_id SERIAL PRIMARY KEY,
-- title VARCHAR,
-- body VARCHAR,
-- votes INT DEFAULT 0,      -- defaults to 0
-- topic VARCHAR REFERENCES topics(slug),
-- author VARCHAR REFERENCES users(username),
-- created_at TIMESTAMP
-- );

-- CREATE TABLE comments (
-- comment_id SERIAL PRIMARY KEY,
-- author VARCHAR REFERENCES users(username),
-- article_id INT REFERENCES articles(article_id),
-- votes INT DEFAULT 0, -- defaults to 0
-- created_at TIMESTAMP,
-- body VARCHAR
-- );

DROP DATABASE IF EXISTS northcoders_news_test;
CREATE DATABASE northcoders_news_test;
