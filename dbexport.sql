-- MySQL dump 10.13  Distrib 5.7.34, for Linux (x86_64)
--
-- Host: localhost    Database: website
-- ------------------------------------------------------
-- Server version	5.7.34-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(25) NOT NULL,
  `pass` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (2,'a','$2a$10$eydFRoDawH/lb/JJAZTCfO2MQeJE8aygYXK8NawEuLefdUlHvfqlq'),(3,'user1','$2a$10$pYN4AFCXMC1IW4ghaD2j5uiohhRWXpDJIteHS8SDbSH.5zHcpcMeC'),(4,'user2','$2a$10$pYN4AFCXMC1IW4ghaD2j5uiohhRWXpDJIteHS8SDbSH.5zHcpcMeC'),(5,'user3','$2a$10$pYN4AFCXMC1IW4ghaD2j5uiohhRWXpDJIteHS8SDbSH.5zHcpcMeC'),(6,'admin','$2a$10$jmafQ7agzUSQhsBQqoid2./p9OogHdZzQ.71V/qwDiCbExaRwHhA2');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `play`
--

DROP TABLE IF EXISTS `play`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `play` (
  `play_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(25) NOT NULL,
  PRIMARY KEY (`play_id`),
  KEY `user_name` (`user_name`),
  CONSTRAINT `play_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `accounts` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `play`
--

LOCK TABLES `play` WRITE;
/*!40000 ALTER TABLE `play` DISABLE KEYS */;
INSERT INTO `play` VALUES (57,'admin'),(58,'admin'),(59,'admin');
/*!40000 ALTER TABLE `play` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `play_info`
--

DROP TABLE IF EXISTS `play_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `play_info` (
  `play_id` int(11) DEFAULT NULL,
  `play_title` text NOT NULL,
  `play_text` text NOT NULL,
  `play_added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `file_name` varchar(255) NOT NULL,
  `play_time_start` date DEFAULT NULL,
  `play_time_end` date DEFAULT NULL,
  KEY `play_id` (`play_id`),
  CONSTRAINT `play_info_ibfk_1` FOREIGN KEY (`play_id`) REFERENCES `play` (`play_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `play_info`
--

LOCK TABLES `play_info` WRITE;
/*!40000 ALTER TABLE `play_info` DISABLE KEYS */;
INSERT INTO `play_info` VALUES (57,'The Hobbit','**NEW** The Hobbit play, featuring new *actors* .','2021-06-28 12:02:57','admin-1624881777710.jpeg','2021-07-07','2021-07-09'),(58,'Hamlet','Join us for one of the most iconic experiences, *Hamlet* . ','2021-06-28 12:09:31','admin-1624882170845.jpeg','2021-07-10','2021-07-14'),(59,'Romeo and Juliet','Romeo and Juliet is **NOW** available for a short period of time. Come and be amazed.','2021-06-28 12:16:34','admin-1624882594825.jpeg','2021-08-18','2021-08-30');
/*!40000 ALTER TABLE `play_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'website'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-28 14:08:08
