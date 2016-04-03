DROP DATABASE IF EXISTS swe;
CREATE DATABASE swe;
use swe;

CREATE TABLE tblGames (game_id INT NOT NULL, 
	name VARCHAR(30) NOT NULL, image_url VARCHAR(255), 
	rating DEC(4,2), release_date DATE NOT NULL, PRIMARY KEY(game_id));

INSERT INTO tblGames (game_id, name, image_url, rating, release_date) VALUES
	(1, "Fallout 3", "https://res.cloudinary.com/igdb/image/upload/t_cover_big/ldhvr54mlzowqkwonznf.webp",
		87, "2008-10-28");

CREATE TABLE tblCompanies (company_id INT NOT NULL, 
	name VARCHAR(30) NOT NULL, is_publisher TINYINT,
	image_url VARCHAR(255), avg_rating DEC(4,2), 
	date_founded DATE, PRIMARY KEY(company_id));

-- we only care about the year for companies, ignore the
--  month and day
INSERT INTO tblCompanies (company_id, name, is_publisher,
	image_url, avg_rating, date_founded) VALUES
	(1, "Bethesda Softworks", 1, "https://res.cloudinary.com/igdb/image/upload/t_logo_med/dcjztyaeikmvfsx4fl0x.webp",
		79, '1986-01-01');
-- is_publisher == 0 --> they are a developer
INSERT INTO tblCompanies (company_id, name, is_publisher,
	image_url, avg_rating, date_founded) VALUES
	(2, "Bethesda Game Studios", 0, "https://res.cloudinary.com/igdb/image/upload/t_logo_med/zoq5fmhbkbvs2qkb76kj.webp",
		82, '2001-01-01');

CREATE TABLE tblYears (year_id INT NOT NULL, num_games INT,
	most_popular_genre VARCHAR(40), PRIMARY KEY(year_id));

INSERT INTO tblYears (year_id, num_games, most_popular_genre)
	VALUES (2008, 1, "Role-playing (RPG)");
INSERT INTO tblYears (year_id, num_games, most_popular_genre)
	VALUES (1986, 0, "Shooter");
INSERT INTO tblYears (year_id, num_games, most_popular_genre)
	VALUES (2001, 5, "Platformer");

CREATE TABLE tblGenre (genre_id INT NOT NULL AUTO_INCREMENT,
	genre_name VARCHAR(30) NOT NULL, PRIMARY KEY(genre_id));

INSERT INTO tblGenre VALUES (1, "Shooter");
INSERT INTO tblGenre VALUES (2, "Role-playing (RPG)");

CREATE TABLE tblConsoles (console_id INT NOT NULL AUTO_INCREMENT,
	console_name VARCHAR(30) NOT NULL, PRIMARY KEY(console_id));

INSERT INTO tblConsoles VALUES (1, "Microsoft Windows");
INSERT INTO tblConsoles VALUES (2, "Playstation 3");
INSERT INTO tblConsoles VALUES (3, "Xbox 360");

CREATE TABLE tblGamesToCompaniesBridge (game_id INT NOT NULL, 
	company_id INT NOT NULL, PRIMARY KEY(game_id, company_id));

INSERT INTO tblGamesToCompaniesBridge VALUES (1, 1);
INSERT INTO tblGamesToCompaniesBridge VALUES (1, 2);

CREATE TABLE tblGamesToGenresBridge (game_id INT NOT NULL,
	genre_id INT NOT NULL, PRIMARY KEY(game_id, genre_id));

INSERT INTO tblGamesToGenresBridge VALUES (1, 1);
INSERT INTO tblGamesToGenresBridge VALUES (1, 2);

CREATE TABLE tblGamesToConsolesBridge (game_id INT NOT NULL,
	console_id INT NOT NULL, PRIMARY KEY(game_id, console_id));

INSERT INTO tblGamesToConsolesBridge VALUES (1, 1);
INSERT INTO tblGamesToConsolesBridge VALUES (1, 2);
INSERT INTO tblGamesToConsolesBridge VALUES (1, 3);