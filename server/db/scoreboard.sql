CREATE DATABASE IF NOT EXISTS pacman;
USE pacman;

CREATE TABLE scoreboard (
  id int NOT NULL AUTO_INCREMENT,
  player varchar(10),
  score int,
  PRIMARY KEY (id)
);

INSERT INTO scoreboard (id, player, score) VALUES
(1, 'tiya', 12),
(2, 'mads', 13),
(3, 'jude', 14),
(4, 'vaibhoe', 15);

