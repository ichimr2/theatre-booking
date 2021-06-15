SET FOREIGN_KEY_CHECKS=0;

DROP DATABASE website;

CREATE DATABASE website;
USE website;

CREATE USER IF NOT EXISTS websiteuser IDENTIFIED BY 'websitepassword';
GRANT INSERT, SELECT, UPDATE, DELETE on website.* TO websiteuser;

CREATE TABLE `accounts` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user` varchar(25) NOT NULL,
  `pass` varchar(255) NOT NULL,
    UNIQUE(user)
);

CREATE TABLE `play` (
  `play_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_name` varchar(25) NOT NULL,
   FOREIGN KEY(user_name) REFERENCES accounts(user)
);

CREATE TABLE `play_info` (
  `play_id` int,
  `play_title` TEXT NOT NULL,
  `play_text` TEXT NOT NULL,
  `play_added` timestamp,
	`file_name` varchar(255) NOT NULL,
  `play_time_start` datetime,
  `play_time_end` datetime,
   FOREIGN KEY (play_id) REFERENCES play(play_id)
);

