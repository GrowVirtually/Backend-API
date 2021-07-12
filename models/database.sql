CREAT DATABASE grovi;

\c grovi

CREATE TYPE gender AS ENUM ('male', 'female', 'none');
CREATE TYPE role AS ENUM ('admin', 'user');

CREATE TABLE systemUser (
	userID serial PRIMARY KEY,
	fName VARCHAR ( 50 ),
	lName VARCHAR ( 50 ),
	tel VARCHAR ( 15 ),
	dob DATE NOT NULL,
	nic VARCHAR ( 15 ),
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	gender VARCHAR (8) NOT NULL DEFAULT 'none',
	imgLink VARCHAR (255) DEFAULT '',
	role VARCHAR (8) NOT NULL DEFAULT 'user',
	password VARCHAR ( 255 ) NOT NULL
);

INSERT INTO systemUser(fName, lName, tel, dob, nic, email, gender, role, password) VALUES ('Kamel', 'Perera', '0734572289', CURRENT_DATE, '983458297v', 'abc@grovi.com', 'male', 'user', 'user123');

INSERT INTO systemUser(fName, lName, tel, dob, nic, email, gender, role, password) VALUES ('Anil', 'Perera', '0754572289', CURRENT_DATE, '983258297v', 'ab3c@grovi.com', 'male', 'user', 'user123');