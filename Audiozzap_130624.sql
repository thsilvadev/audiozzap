-- MariaDB dump 10.19  Distrib 10.5.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: Audiozzap
-- ------------------------------------------------------
-- Server version	10.5.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audios`
--

DROP TABLE IF EXISTS `audios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wpp_message_id` int(11) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `language` varchar(255) DEFAULT NULL,
  `created_at` text DEFAULT NULL,
  `mime_type` varchar(255) DEFAULT NULL,
  `file_size` int(11) DEFAULT NULL,
  `file_id` varchar(255) DEFAULT NULL,
  `file_unique_id` varchar(255) DEFAULT NULL,
  `user_wpp_id` int(11) DEFAULT NULL,
  `user_telegram_id` int(11) DEFAULT NULL,
  `telegram_message_id` varchar(255) DEFAULT NULL,
  `audio_data` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wpp_message_id` (`wpp_message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audios`
--

LOCK TABLES `audios` WRITE;
/*!40000 ALTER TABLE `audios` DISABLE KEYS */;
INSERT INTO `audios` VALUES (1,NULL,2,'pt-br','2024-05-30 03:09:24','audio/ogg',16128,'AwACAgEAAxkBAAMZZlgmIzNJn7e9PJyZs2E_uDfhv3MAAgMEAAKCuMFGs6xNm3arohg1BA','AgADAwQAAoK4wUY',NULL,2147483647,'25',NULL),(2,NULL,3,'pt-br','2024-05-30 03:23:53','audio/ogg',22750,'AwACAgEAAxkBAAMbZlgpiAhIO_Ka1B37CtGUv7d0zBIAAgUEAAKCuMFGRpOAxFuStgs1BA','AgADBQQAAoK4wUY',NULL,2147483647,'27',NULL),(3,NULL,8,'pt-br','2024-05-30 03:30:20','audio/ogg',53307,'AwACAgEAAxkBAAMcZlgrDLgnA8jh4NK6jaukQzEkaDIAAgYEAAKCuMFGXwQZaNxSiPk1BA','AgADBgQAAoK4wUY',NULL,2147483647,'28',NULL),(5,3,4,NULL,'2024-06-13 18:26:29',NULL,9890,NULL,NULL,2147483647,NULL,NULL,'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');
/*!40000 ALTER TABLE `audios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_likes`
--

DROP TABLE IF EXISTS `comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `comment_id` int(11) DEFAULT NULL,
  `created_at` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Comment_Likes_index_3` (`user_id`,`comment_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `comment_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comment_likes_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_likes`
--

LOCK TABLES `comment_likes` WRITE;
/*!40000 ALTER TABLE `comment_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `created_at` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Comments_index_2` (`user_id`,`post_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `followers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `follower_id` int(11) NOT NULL,
  `followed_id` int(11) NOT NULL,
  `created_at` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Followers_index_0` (`follower_id`,`followed_id`),
  KEY `followed_id` (`followed_id`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`followed_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_likes`
--

DROP TABLE IF EXISTS `post_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) DEFAULT NULL,
  `created_at` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Post_Likes_index_1` (`user_id`,`post_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `post_likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_likes`
--

LOCK TABLES `post_likes` WRITE;
/*!40000 ALTER TABLE `post_likes` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_tags`
--

DROP TABLE IF EXISTS `post_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `post_id` int(11) DEFAULT NULL,
  `tag_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `post_tags_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `post_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_tags`
--

LOCK TABLES `post_tags` WRITE;
/*!40000 ALTER TABLE `post_tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `audio_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_at` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `audio_id` (`audio_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`audio_id`) REFERENCES `audios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phone_number` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `created_at` text DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wpp_chats`
--

DROP TABLE IF EXISTS `wpp_chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wpp_chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wpp_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `wpp_chats_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wpp_chats`
--

LOCK TABLES `wpp_chats` WRITE;
/*!40000 ALTER TABLE `wpp_chats` DISABLE KEYS */;
INSERT INTO `wpp_chats` VALUES (1,2147483647,NULL,'2024-06-13 18:22:54');
/*!40000 ALTER TABLE `wpp_chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wpp_messages`
--

DROP TABLE IF EXISTS `wpp_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wpp_messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `wpp_chat_id` int(11) NOT NULL,
  `message_type` varchar(255) DEFAULT NULL,
  `created_at` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `wpp_chat_id` (`wpp_chat_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wpp_messages`
--

LOCK TABLES `wpp_messages` WRITE;
/*!40000 ALTER TABLE `wpp_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `wpp_messages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-13 18:51:13
