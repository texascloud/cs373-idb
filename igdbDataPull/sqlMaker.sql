DROP DATABASE IF EXISTS swe;
CREATE DATABASE swe;
use swe;

CREATE TABLE tblGames (game_id INT NOT NULL, 
	name VARCHAR(30) NOT NULL, image_url VARCHAR(255), 
	rating DEC(4,2), release_date DATE, PRIMARY KEY(game_id));

CREATE TABLE tblCompanies (company_id INT NOT NULL, 
	name VARCHAR(30) NOT NULL, image_url VARCHAR(255), 
	avg_rating DEC(4,2), date_founded DATE, PRIMARY KEY(company_id));

CREATE TABLE tblYears (year_id INT NOT NULL, num_games INT,
	most_popular_genre VARCHAR(40), PRIMARY KEY(year_id));

CREATE TABLE tblGenre (genre_id INT NOT NULL AUTO_INCREMENT,
	genre_name VARCHAR(30) NOT NULL, PRIMARY KEY(genre_id));

CREATE TABLE tblConsoles (console_id INT NOT NULL AUTO_INCREMENT,
	console_name VARCHAR(30) NOT NULL, PRIMARY KEY(console_id));

CREATE TABLE tblGamesToCompaniesBridge (game_id INT NOT NULL, 
	company_id INT NOT NULL, PRIMARY KEY(game_id, company_id));

CREATE TABLE tblGamesToGenresBridge (game_id INT NOT NULL,
	genre_id INT NOT NULL, PRIMARY KEY(game_id, genre_id));

CREATE TABLE tblGamesToConsolesBridge (game_id INT NOT NULL,
	console_id INT NOT NULL, PRIMARY KEY(game_id, console_id));