CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE,
    user_pass VARCHAR NOT NULL
);

INSERT INTO users(email, user_pass)
VALUES('denzel@yahoo.com', 'test1234')