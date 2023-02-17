-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: hishop
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BATCH_JOB_EXECUTION`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION` (
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `VERSION` bigint DEFAULT NULL,
  `JOB_INSTANCE_ID` bigint NOT NULL,
  `CREATE_TIME` datetime(6) NOT NULL,
  `START_TIME` datetime(6) DEFAULT NULL,
  `END_TIME` datetime(6) DEFAULT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `EXIT_CODE` varchar(2500) DEFAULT NULL,
  `EXIT_MESSAGE` varchar(2500) DEFAULT NULL,
  `LAST_UPDATED` datetime(6) DEFAULT NULL,
  `JOB_CONFIGURATION_LOCATION` varchar(2500) DEFAULT NULL,
  PRIMARY KEY (`JOB_EXECUTION_ID`),
  KEY `JOB_INST_EXEC_FK` (`JOB_INSTANCE_ID`),
  CONSTRAINT `JOB_INST_EXEC_FK` FOREIGN KEY (`JOB_INSTANCE_ID`) REFERENCES `BATCH_JOB_INSTANCE` (`JOB_INSTANCE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION`
--

LOCK TABLES `BATCH_JOB_EXECUTION` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION` VALUES (1,2,1,'2023-02-13 12:10:59.976000','2023-02-13 12:11:00.080000','2023-02-13 12:11:00.252000','COMPLETED','COMPLETED','','2023-02-13 12:11:00.253000',NULL),(2,2,1,'2023-02-13 14:06:23.599000','2023-02-13 14:06:23.685000','2023-02-13 14:06:23.720000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-13 14:06:23.723000',NULL),(3,2,1,'2023-02-13 15:27:18.171000','2023-02-13 15:27:18.231000','2023-02-13 15:27:18.256000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-13 15:27:18.257000',NULL),(4,2,1,'2023-02-14 14:37:37.607000','2023-02-14 14:37:37.698000','2023-02-14 14:37:37.743000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-14 14:37:37.750000',NULL),(5,2,1,'2023-02-14 17:30:17.753000','2023-02-14 17:30:17.838000','2023-02-14 17:30:17.871000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-14 17:30:17.872000',NULL),(6,2,1,'2023-02-15 10:11:23.929000','2023-02-15 10:11:24.025000','2023-02-15 10:11:24.052000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-15 10:11:24.053000',NULL),(7,2,1,'2023-02-15 11:36:42.334000','2023-02-15 11:36:42.434000','2023-02-15 11:36:42.477000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-15 11:36:42.478000',NULL),(8,2,1,'2023-02-15 11:45:35.594000','2023-02-15 11:45:35.656000','2023-02-15 11:45:35.683000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-15 11:45:35.684000',NULL),(9,2,1,'2023-02-15 11:48:31.417000','2023-02-15 11:48:31.478000','2023-02-15 11:48:31.507000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-15 11:48:31.508000',NULL),(10,2,1,'2023-02-15 14:26:42.355000','2023-02-15 14:26:42.419000','2023-02-15 14:26:42.448000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-15 14:26:42.448000',NULL),(11,2,1,'2023-02-15 14:38:28.055000','2023-02-15 14:38:28.109000','2023-02-15 14:38:28.132000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-15 14:38:28.133000',NULL),(12,2,1,'2023-02-15 15:20:27.985000','2023-02-15 15:20:28.043000','2023-02-15 15:20:28.068000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-15 15:20:28.069000',NULL),(13,2,1,'2023-02-15 16:52:11.485000','2023-02-15 16:52:11.549000','2023-02-15 16:52:11.572000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-15 16:52:11.572000',NULL),(14,2,1,'2023-02-16 09:21:53.670000','2023-02-16 09:21:53.729000','2023-02-16 09:21:53.758000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-16 09:21:53.759000',NULL),(15,2,1,'2023-02-16 09:22:28.016000','2023-02-16 09:22:28.075000','2023-02-16 09:22:28.098000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-16 09:22:28.098000',NULL),(16,2,1,'2023-02-16 11:16:59.211000','2023-02-16 11:16:59.303000','2023-02-16 11:16:59.328000','COMPLETED','NOOP','All steps already completed or no steps configured for this job.','2023-02-16 11:16:59.329000',NULL);
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_EXECUTION_CONTEXT`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION_CONTEXT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION_CONTEXT` (
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `SHORT_CONTEXT` varchar(2500) NOT NULL,
  `SERIALIZED_CONTEXT` text,
  PRIMARY KEY (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_CTX_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `BATCH_JOB_EXECUTION` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION_CONTEXT`
--

LOCK TABLES `BATCH_JOB_EXECUTION_CONTEXT` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_CONTEXT` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION_CONTEXT` VALUES (1,'{\"@class\":\"java.util.HashMap\"}',NULL),(2,'{\"@class\":\"java.util.HashMap\"}',NULL),(3,'{\"@class\":\"java.util.HashMap\"}',NULL),(4,'{\"@class\":\"java.util.HashMap\"}',NULL),(5,'{\"@class\":\"java.util.HashMap\"}',NULL),(6,'{\"@class\":\"java.util.HashMap\"}',NULL),(7,'{\"@class\":\"java.util.HashMap\"}',NULL),(8,'{\"@class\":\"java.util.HashMap\"}',NULL),(9,'{\"@class\":\"java.util.HashMap\"}',NULL),(10,'{\"@class\":\"java.util.HashMap\"}',NULL),(11,'{\"@class\":\"java.util.HashMap\"}',NULL),(12,'{\"@class\":\"java.util.HashMap\"}',NULL),(13,'{\"@class\":\"java.util.HashMap\"}',NULL),(14,'{\"@class\":\"java.util.HashMap\"}',NULL),(15,'{\"@class\":\"java.util.HashMap\"}',NULL),(16,'{\"@class\":\"java.util.HashMap\"}',NULL);
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_CONTEXT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_EXECUTION_PARAMS`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION_PARAMS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION_PARAMS` (
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `TYPE_CD` varchar(6) NOT NULL,
  `KEY_NAME` varchar(100) NOT NULL,
  `STRING_VAL` varchar(250) DEFAULT NULL,
  `DATE_VAL` datetime(6) DEFAULT NULL,
  `LONG_VAL` bigint DEFAULT NULL,
  `DOUBLE_VAL` double DEFAULT NULL,
  `IDENTIFYING` char(1) NOT NULL,
  KEY `JOB_EXEC_PARAMS_FK` (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_PARAMS_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `BATCH_JOB_EXECUTION` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION_PARAMS`
--

LOCK TABLES `BATCH_JOB_EXECUTION_PARAMS` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_PARAMS` DISABLE KEYS */;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_PARAMS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_EXECUTION_SEQ`
--

DROP TABLE IF EXISTS `BATCH_JOB_EXECUTION_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_EXECUTION_SEQ` (
  `ID` bigint NOT NULL,
  `UNIQUE_KEY` char(1) NOT NULL,
  UNIQUE KEY `UNIQUE_KEY_UN` (`UNIQUE_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_EXECUTION_SEQ`
--

LOCK TABLES `BATCH_JOB_EXECUTION_SEQ` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_SEQ` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_EXECUTION_SEQ` VALUES (16,'0');
/*!40000 ALTER TABLE `BATCH_JOB_EXECUTION_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_INSTANCE`
--

DROP TABLE IF EXISTS `BATCH_JOB_INSTANCE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_INSTANCE` (
  `JOB_INSTANCE_ID` bigint NOT NULL,
  `VERSION` bigint DEFAULT NULL,
  `JOB_NAME` varchar(100) NOT NULL,
  `JOB_KEY` varchar(32) NOT NULL,
  PRIMARY KEY (`JOB_INSTANCE_ID`),
  UNIQUE KEY `JOB_INST_UN` (`JOB_NAME`,`JOB_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_INSTANCE`
--

LOCK TABLES `BATCH_JOB_INSTANCE` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_INSTANCE` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_INSTANCE` VALUES (1,0,'simpleJob','d41d8cd98f00b204e9800998ecf8427e');
/*!40000 ALTER TABLE `BATCH_JOB_INSTANCE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_JOB_SEQ`
--

DROP TABLE IF EXISTS `BATCH_JOB_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_JOB_SEQ` (
  `ID` bigint NOT NULL,
  `UNIQUE_KEY` char(1) NOT NULL,
  UNIQUE KEY `UNIQUE_KEY_UN` (`UNIQUE_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_JOB_SEQ`
--

LOCK TABLES `BATCH_JOB_SEQ` WRITE;
/*!40000 ALTER TABLE `BATCH_JOB_SEQ` DISABLE KEYS */;
INSERT INTO `BATCH_JOB_SEQ` VALUES (1,'0');
/*!40000 ALTER TABLE `BATCH_JOB_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_STEP_EXECUTION`
--

DROP TABLE IF EXISTS `BATCH_STEP_EXECUTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_STEP_EXECUTION` (
  `STEP_EXECUTION_ID` bigint NOT NULL,
  `VERSION` bigint NOT NULL,
  `STEP_NAME` varchar(100) NOT NULL,
  `JOB_EXECUTION_ID` bigint NOT NULL,
  `START_TIME` datetime(6) NOT NULL,
  `END_TIME` datetime(6) DEFAULT NULL,
  `STATUS` varchar(10) DEFAULT NULL,
  `COMMIT_COUNT` bigint DEFAULT NULL,
  `READ_COUNT` bigint DEFAULT NULL,
  `FILTER_COUNT` bigint DEFAULT NULL,
  `WRITE_COUNT` bigint DEFAULT NULL,
  `READ_SKIP_COUNT` bigint DEFAULT NULL,
  `WRITE_SKIP_COUNT` bigint DEFAULT NULL,
  `PROCESS_SKIP_COUNT` bigint DEFAULT NULL,
  `ROLLBACK_COUNT` bigint DEFAULT NULL,
  `EXIT_CODE` varchar(2500) DEFAULT NULL,
  `EXIT_MESSAGE` varchar(2500) DEFAULT NULL,
  `LAST_UPDATED` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`STEP_EXECUTION_ID`),
  KEY `JOB_EXEC_STEP_FK` (`JOB_EXECUTION_ID`),
  CONSTRAINT `JOB_EXEC_STEP_FK` FOREIGN KEY (`JOB_EXECUTION_ID`) REFERENCES `BATCH_JOB_EXECUTION` (`JOB_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_STEP_EXECUTION`
--

LOCK TABLES `BATCH_STEP_EXECUTION` WRITE;
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION` DISABLE KEYS */;
INSERT INTO `BATCH_STEP_EXECUTION` VALUES (1,3,'simpleStep1',1,'2023-02-13 12:11:00.141000','2023-02-13 12:11:00.230000','COMPLETED',1,0,0,0,0,0,0,0,'COMPLETED','','2023-02-13 12:11:00.232000');
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_STEP_EXECUTION_CONTEXT`
--

DROP TABLE IF EXISTS `BATCH_STEP_EXECUTION_CONTEXT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_STEP_EXECUTION_CONTEXT` (
  `STEP_EXECUTION_ID` bigint NOT NULL,
  `SHORT_CONTEXT` varchar(2500) NOT NULL,
  `SERIALIZED_CONTEXT` text,
  PRIMARY KEY (`STEP_EXECUTION_ID`),
  CONSTRAINT `STEP_EXEC_CTX_FK` FOREIGN KEY (`STEP_EXECUTION_ID`) REFERENCES `BATCH_STEP_EXECUTION` (`STEP_EXECUTION_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_STEP_EXECUTION_CONTEXT`
--

LOCK TABLES `BATCH_STEP_EXECUTION_CONTEXT` WRITE;
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_CONTEXT` DISABLE KEYS */;
INSERT INTO `BATCH_STEP_EXECUTION_CONTEXT` VALUES (1,'{\"@class\":\"java.util.HashMap\",\"batch.taskletType\":\"e101.hishop.job.SimpleJobConfiguration$$Lambda$1235/0x0000000800a76840\",\"batch.stepType\":\"org.springframework.batch.core.step.tasklet.TaskletStep\"}',NULL);
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_CONTEXT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BATCH_STEP_EXECUTION_SEQ`
--

DROP TABLE IF EXISTS `BATCH_STEP_EXECUTION_SEQ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BATCH_STEP_EXECUTION_SEQ` (
  `ID` bigint NOT NULL,
  `UNIQUE_KEY` char(1) NOT NULL,
  UNIQUE KEY `UNIQUE_KEY_UN` (`UNIQUE_KEY`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BATCH_STEP_EXECUTION_SEQ`
--

LOCK TABLES `BATCH_STEP_EXECUTION_SEQ` WRITE;
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_SEQ` DISABLE KEYS */;
INSERT INTO `BATCH_STEP_EXECUTION_SEQ` VALUES (1,'0');
/*!40000 ALTER TABLE `BATCH_STEP_EXECUTION_SEQ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branch_id` bigint NOT NULL,
  `branch_name` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
INSERT INTO `branch` VALUES (1,'부산점','부산광역시 강서구 송정동 녹산산업중로 333'),(2,'대전점','대전광역시 유성구 동서대로 98-39'),(3,'광주점','광주광역시 광산구 하남산단 6번로 107'),(4,'서울점','서울시 강남구 테헤란로 212'),(5,'구미점','경북 구미시 3공단 3로 302');
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `card_id` bigint NOT NULL,
  `card_no` varchar(255) DEFAULT NULL,
  `cvc` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `valid_date` varchar(255) DEFAULT NULL,
  `card_category_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`card_id`),
  KEY `FKh7lkw1nyi3xbqguspg6yoh6id` (`card_category_id`),
  KEY `FKq5apcc4ddrab8t48q2uqvyquq` (`user_id`),
  CONSTRAINT `FKh7lkw1nyi3xbqguspg6yoh6id` FOREIGN KEY (`card_category_id`) REFERENCES `card_category` (`card_category_id`),
  CONSTRAINT `FKq5apcc4ddrab8t48q2uqvyquq` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (1,'2414-2058-0119-5050','386','삼성','0626',5,1),(2,'7993-3749-5873-8410','824','IBK','0523',3,2),(3,'1410-5818-0763-3662','668','하나','0923',1,3),(4,'2380-0702-0966-3210','888','IBK','1223',3,4),(5,'3451-7682-8994-2445','288','신한','0624',4,5),(6,'8311-0706-0363-8130','566','하나','0227',1,6),(7,'6375-6299-7221-4559','999','하나','0425',1,1),(8,'9479-8835-3790-0938','839','IBK','1024',3,2),(9,'6329-5325-2458-9881','828','IBK','0423',3,3),(10,'7626-3635-6589-7910','668','신한','1025',4,4),(11,'9798-4286-3561-7156','686','현대','0523',2,5),(12,'0590-1059-7256-2884','584','신한','0126',4,6),(13,'4888-8459-4757-8930','027','현대','1024',2,1),(14,'1049-4671-5900-6130','422','신한','0424',4,2),(15,'4958-1336-4345-5160','216','하나','0127',1,3),(16,'9836-7366-6056-8950','728','IBK','0227',3,4),(17,'1499-9931-7870-9470','182','신한','0826',4,5),(18,'4813-2905-2332-3360','385','IBK','0827',3,6),(19,'2701-5701-2193-3820','276','삼성','0123',5,1),(20,'8725-0840-8661-1470','537','신한','0324',4,2),(21,'0038-5156-4762-6122','525','IBK','0227',3,3),(22,'1511-1972-7195-9630','776','하나','0223',1,4),(23,'3316-5493-1350-0083','984','IBK','0625',3,5),(24,'1003-0564-2355-5720','508','현대','0725',2,6),(25,'5331-8589-2153-5228','247','신한','0427',4,1),(26,'8474-4412-4485-6597','158','삼성','0425',5,2),(27,'2790-4451-8004-4990','427','IBK','1225',3,3),(28,'5514-5198-6017-8236','276','신한','0427',4,4),(29,'5735-9327-9791-2370','495','삼성','0923',5,5),(30,'4123-3813-0426-9930','185','삼성','1127',5,6);
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `card_category`
--

DROP TABLE IF EXISTS `card_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card_category` (
  `card_category_id` bigint NOT NULL,
  `classification` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `payment_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`card_category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card_category`
--

LOCK TABLES `card_category` WRITE;
/*!40000 ALTER TABLE `card_category` DISABLE KEYS */;
INSERT INTO `card_category` VALUES (1,'카드','hana.jpg','하나'),(2,'카드','hyundae.jpg','현대'),(3,'카드','ibk..jpg','IBK'),(4,'카드','sinhan.jpg','신한'),(5,'카드','samsung.jpg','삼성'),(6,'카드','uri.jpg','우리'),(7,'카드','bc.jpg','BC'),(8,'카드','kb.jpg','KB'),(9,'카드','city.jpg','시티'),(10,'카드','kbank.jpg','K-Bank'),(11,'카드','toss.jpg','토스'),(12,'카드','nh.jpg','NH농협'),(13,'카드','kiup.jpg','기업'),(14,'카드','lotte.jpg','롯데'),(15,'카드','soohyup.jpg','수협');
/*!40000 ALTER TABLE `card_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_branch`
--

DROP TABLE IF EXISTS `entity_branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entity_branch` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_branch`
--

LOCK TABLES `entity_branch` WRITE;
/*!40000 ALTER TABLE `entity_branch` DISABLE KEYS */;
INSERT INTO `entity_branch` VALUES ('branch',5);
/*!40000 ALTER TABLE `entity_branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_card`
--

DROP TABLE IF EXISTS `entity_card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entity_card` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_card`
--

LOCK TABLES `entity_card` WRITE;
/*!40000 ALTER TABLE `entity_card` DISABLE KEYS */;
INSERT INTO `entity_card` VALUES ('card',30);
/*!40000 ALTER TABLE `entity_card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_card_category`
--

DROP TABLE IF EXISTS `entity_card_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entity_card_category` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_card_category`
--

LOCK TABLES `entity_card_category` WRITE;
/*!40000 ALTER TABLE `entity_card_category` DISABLE KEYS */;
INSERT INTO `entity_card_category` VALUES ('card_category',15);
/*!40000 ALTER TABLE `entity_card_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_kiosk`
--

DROP TABLE IF EXISTS `entity_kiosk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entity_kiosk` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_kiosk`
--

LOCK TABLES `entity_kiosk` WRITE;
/*!40000 ALTER TABLE `entity_kiosk` DISABLE KEYS */;
INSERT INTO `entity_kiosk` VALUES ('kiosk',6);
/*!40000 ALTER TABLE `entity_kiosk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_manufacturer`
--

DROP TABLE IF EXISTS `entity_manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entity_manufacturer` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_manufacturer`
--

LOCK TABLES `entity_manufacturer` WRITE;
/*!40000 ALTER TABLE `entity_manufacturer` DISABLE KEYS */;
INSERT INTO `entity_manufacturer` VALUES ('manufacturer',10);
/*!40000 ALTER TABLE `entity_manufacturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_pay`
--

DROP TABLE IF EXISTS `entity_pay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entity_pay` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_pay`
--

LOCK TABLES `entity_pay` WRITE;
/*!40000 ALTER TABLE `entity_pay` DISABLE KEYS */;
INSERT INTO `entity_pay` VALUES ('pay',9);
/*!40000 ALTER TABLE `entity_pay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_pay_detail`
--

DROP TABLE IF EXISTS `entity_pay_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entity_pay_detail` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_pay_detail`
--

LOCK TABLES `entity_pay_detail` WRITE;
/*!40000 ALTER TABLE `entity_pay_detail` DISABLE KEYS */;
INSERT INTO `entity_pay_detail` VALUES ('pay_detail',15);
/*!40000 ALTER TABLE `entity_pay_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_point`
--

DROP TABLE IF EXISTS `entity_point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entity_point` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_point`
--

LOCK TABLES `entity_point` WRITE;
/*!40000 ALTER TABLE `entity_point` DISABLE KEYS */;
INSERT INTO `entity_point` VALUES ('point',9);
/*!40000 ALTER TABLE `entity_point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_product`
--

DROP TABLE IF EXISTS `entity_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entity_product` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_product`
--

LOCK TABLES `entity_product` WRITE;
/*!40000 ALTER TABLE `entity_product` DISABLE KEYS */;
INSERT INTO `entity_product` VALUES ('product',8);
/*!40000 ALTER TABLE `entity_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_product_category`
--

DROP TABLE IF EXISTS `entity_product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entity_product_category` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_product_category`
--

LOCK TABLES `entity_product_category` WRITE;
/*!40000 ALTER TABLE `entity_product_category` DISABLE KEYS */;
INSERT INTO `entity_product_category` VALUES ('product_category',10);
/*!40000 ALTER TABLE `entity_product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_staff`
--

DROP TABLE IF EXISTS `entity_staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entity_staff` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_staff`
--

LOCK TABLES `entity_staff` WRITE;
/*!40000 ALTER TABLE `entity_staff` DISABLE KEYS */;
INSERT INTO `entity_staff` VALUES ('staff',3);
/*!40000 ALTER TABLE `entity_staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entity_users`
--

DROP TABLE IF EXISTS `entity_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entity_users` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entity_users`
--

LOCK TABLES `entity_users` WRITE;
/*!40000 ALTER TABLE `entity_users` DISABLE KEYS */;
INSERT INTO `entity_users` VALUES ('users',6);
/*!40000 ALTER TABLE `entity_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (25);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kiosk`
--

DROP TABLE IF EXISTS `kiosk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `kiosk` (
  `kiosk_id` bigint NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `branch_id` bigint DEFAULT NULL,
  PRIMARY KEY (`kiosk_id`),
  KEY `FKd0t46bjbteie4b1vwc7g5cl1i` (`branch_id`),
  CONSTRAINT `FKd0t46bjbteie4b1vwc7g5cl1i` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kiosk`
--

LOCK TABLES `kiosk` WRITE;
/*!40000 ALTER TABLE `kiosk` DISABLE KEYS */;
INSERT INTO `kiosk` VALUES (1,'http://i8e101.p.ssafy.io:7777',1),(2,'http://i8e101.p.ssafy.io:7788',1),(3,'http://i8e101.p.ssafy.io:9911',1),(4,'http://i7e101.p.ssafy.io:7777',2),(5,'http://i7e101.p.ssafy.io:7887',2),(6,'http://i7e101.p.ssafy.io:9977',2);
/*!40000 ALTER TABLE `kiosk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturer`
--

DROP TABLE IF EXISTS `manufacturer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturer` (
  `manu_id` bigint NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`manu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturer`
--

LOCK TABLES `manufacturer` WRITE;
/*!40000 ALTER TABLE `manufacturer` DISABLE KEYS */;
INSERT INTO `manufacturer` VALUES (1,'부산광역시 강서구 송정동 녹산산업중로 333','롯데','031-561-7640'),(2,'대전광역시 유성구 동서대로 98-39','농심','031-882-5875'),(3,'광주광역시 광산구 하남산단 6번로 107','해태','031-265-3827'),(4,'서울시 강남구 테헤란로 212','삼성','031-932-8020'),(5,'경북 구미시 3공단 3로 302','오뚜기','031-791-1320'),(6,'부산광역시 강서구 송정동 녹산산업중로 333','제일제당','031-749-6870'),(7,'대전광역시 유성구 동서대로 98-39','청정원','031-108-1104'),(8,'광주광역시 광산구 하남산단 6번로 107','남양','031-245-7143'),(9,'서울시 강남구 테헤란로 212','매일','031-908-0388'),(10,'경북 구미시 3공단 3로 302','팔도','031-847-4699');
/*!40000 ALTER TABLE `manufacturer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay`
--

DROP TABLE IF EXISTS `pay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pay` (
  `pay_id` bigint NOT NULL,
  `buy_date` datetime(6) NOT NULL,
  `buy_total` bigint NOT NULL,
  `pay_img` varchar(255) DEFAULT NULL,
  `pay_name` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`pay_id`),
  KEY `FKa57mufyq98vsxxmv0hok89uio` (`user_id`),
  CONSTRAINT `FKa57mufyq98vsxxmv0hok89uio` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay`
--

LOCK TABLES `pay` WRITE;
/*!40000 ALTER TABLE `pay` DISABLE KEYS */;
INSERT INTO `pay` VALUES (1,'2022-12-12 21:12:00.000000',49800,'img.jpg','삼성',1),(2,'2022-12-16 00:13:22.000000',39900,'img.jpg','하나',1),(3,'2023-01-13 05:23:12.000000',4500,'img.jpg','삼성',1),(4,'2022-12-12 21:12:00.000000',159800,'img.jpg','현대',3),(5,'2022-12-16 00:13:22.000000',2000,'img.jpg','신한',3),(6,'2023-01-13 05:23:12.000000',79600,'img.jpg','삼성',3),(7,'2022-12-12 21:12:00.000000',10000,'img.jpg','현대',5),(8,'2022-12-16 00:13:22.000000',130000,'img.jpg','하나',5),(9,'2023-01-13 05:23:12.000000',50000,'img.jpg','IBK',5);
/*!40000 ALTER TABLE `pay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_detail`
--

DROP TABLE IF EXISTS `pay_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pay_detail` (
  `pay_detail_id` bigint NOT NULL,
  `count` bigint DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `product_name` varchar(255) DEFAULT NULL,
  `branch_id` bigint DEFAULT NULL,
  `pay_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`pay_detail_id`),
  KEY `FKkqd6sss6k9mab9hpwy9oa6hnc` (`branch_id`),
  KEY `FKei0buvlbrayp2tld6m3cus567` (`pay_id`),
  KEY `FKjoc51i83yquoun89eqb1rdxqt` (`product_id`),
  CONSTRAINT `FKei0buvlbrayp2tld6m3cus567` FOREIGN KEY (`pay_id`) REFERENCES `pay` (`pay_id`),
  CONSTRAINT `FKjoc51i83yquoun89eqb1rdxqt` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `FKkqd6sss6k9mab9hpwy9oa6hnc` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_detail`
--

LOCK TABLES `pay_detail` WRITE;
/*!40000 ALTER TABLE `pay_detail` DISABLE KEYS */;
INSERT INTO `pay_detail` VALUES (1,1,49800,'바퀴벌레 포커',1,1,1),(2,2,9000,'담배',1,2,5),(3,1,19900,'텀블러',1,2,6),(4,1,8500,'살균티슈',1,2,2),(5,1,1500,'음료수',1,2,4),(6,1,4500,'담배',1,3,5),(7,1,130000,'마우스',1,4,3),(8,2,29800,'바퀴벌레 포커',1,4,1),(9,1,2000,'보드마카',1,5,7),(10,4,79600,'텀블러',1,6,6),(11,1,1500,'음료수',1,7,4),(12,1,8500,'살균티슈',1,7,2),(13,1,130000,'마우스',1,8,3),(14,1,1500,'음료수',1,9,4),(15,1,-500,'음료수 할인쿠폰',1,9,8);
/*!40000 ALTER TABLE `pay_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `point`
--

DROP TABLE IF EXISTS `point`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `point` (
  `point_id` bigint NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `point` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`point_id`),
  KEY `FK5x0rfwo6q3kubvion9ecld8ya` (`user_id`),
  CONSTRAINT `FK5x0rfwo6q3kubvion9ecld8ya` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `point`
--

LOCK TABLES `point` WRITE;
/*!40000 ALTER TABLE `point` DISABLE KEYS */;
INSERT INTO `point` VALUES (1,'적립','구매 적립','2024-01-02 08:59:00.000000',4000,1),(2,'소비','사용',NULL,-2000,1),(3,'적립','이벤트 적립','2024-01-02 08:59:00.000000',500,1),(4,'적립','구매 적립','2024-01-02 08:59:00.000000',4000,3),(5,'소비','사용',NULL,-2000,3),(6,'적립','이벤트 적립','2024-01-02 08:59:00.000000',500,3),(7,'적립','구매 적립','2024-01-02 08:59:00.000000',4000,5),(8,'소비','사용',NULL,-2000,5),(9,'적립','이벤트 적립','2024-01-02 08:59:00.000000',500,5);
/*!40000 ALTER TABLE `point` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `product_id` bigint NOT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_adult` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` bigint DEFAULT NULL,
  `rfid` varchar(255) DEFAULT NULL,
  `manu_id` bigint DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FKdpiexraebj8k3b5sl8w601104` (`manu_id`),
  KEY `FK5cypb0k23bovo3rn1a5jqs6j4` (`category_id`),
  CONSTRAINT `FK5cypb0k23bovo3rn1a5jqs6j4` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`category_id`),
  CONSTRAINT `FKdpiexraebj8k3b5sl8w601104` FOREIGN KEY (`manu_id`) REFERENCES `manufacturer` (`manu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'','poker.jpg',_binary '\0','바퀴벌레 포커',14900,'BB4247AC500104E0',NULL,3),(2,'','tisue.jpg',_binary '\0','살균티슈',8500,'',NULL,9),(3,'','mouse.jpg',_binary '\0','단단한 파이썬',130000,'FE9146AC500104E0',4,2),(4,'','drink.jpg',_binary '\0','Crystal Light',1500,'FC4947AC500104E0',1,4),(5,'','dambae.jpg',_binary '','담배',4500,'',NULL,5),(6,'','tumbler.jpg',_binary '\0','텀블러',19900,'',4,10),(7,'','board.jpg',_binary '\0','보드마카',2000,'',3,8),(8,'','drink.jpg',_binary '\0','할인쿠폰',-500,'',NULL,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `category_id` bigint NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,'과일'),(2,'도서'),(3,'게임'),(4,'음료'),(5,'제한물품'),(6,'간식'),(7,'건강식품'),(8,'문구'),(9,'위생용품'),(10,'주방용품');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_report`
--

DROP TABLE IF EXISTS `sale_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_report` (
  `sale_report_id` bigint NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `kiosk` bigint DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `sales` bigint DEFAULT NULL,
  PRIMARY KEY (`sale_report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_report`
--

LOCK TABLES `sale_report` WRITE;
/*!40000 ALTER TABLE `sale_report` DISABLE KEYS */;
INSERT INTO `sale_report` VALUES (1,'도서','2023-02-08',1,'부산',3599210),(2,'게임','2023-02-08',1,'부산',8684884),(3,'음료','2023-02-08',1,'부산',2179907),(4,'제한물품','2023-02-08',1,'부산',473797),(5,'문구','2023-02-08',1,'부산',7410376),(6,'위생용품','2023-02-08',1,'부산',3285200),(7,'주방용품','2023-02-08',1,'부산',3575063),(8,'도서','2023-02-08',1,'서울',3678128),(9,'게임','2023-02-08',1,'서울',8629084),(10,'음료','2023-02-08',1,'서울',2186602),(11,'제한물품','2023-02-08',1,'서울',560826),(12,'문구','2023-02-08',1,'서울',7478436),(13,'위생용품','2023-02-08',1,'서울',3192766),(14,'주방용품','2023-02-08',1,'서울',3581205),(15,'도서','2023-02-08',2,'부산',3599155),(16,'게임','2023-02-08',2,'부산',8529638),(17,'음료','2023-02-08',2,'부산',2125993),(18,'제한물품','2023-02-08',2,'부산',516383),(19,'문구','2023-02-08',2,'부산',7401870),(20,'위생용품','2023-02-08',2,'부산',3252425),(21,'주방용품','2023-02-08',2,'부산',3588627),(22,'도서','2023-02-08',2,'서울',3509603),(23,'게임','2023-02-08',2,'서울',8595932),(24,'음료','2023-02-08',2,'서울',2138538),(25,'제한물품','2023-02-08',2,'서울',553865),(26,'문구','2023-02-08',2,'서울',7379583),(27,'위생용품','2023-02-08',2,'서울',3186309),(28,'주방용품','2023-02-08',2,'서울',3652914),(29,'도서','2023-02-08',3,'부산',3497610),(30,'게임','2023-02-08',3,'부산',8613993),(31,'음료','2023-02-08',3,'부산',2097457),(32,'제한물품','2023-02-08',3,'부산',537006),(33,'문구','2023-02-08',3,'부산',7308450),(34,'위생용품','2023-02-08',3,'부산',3225828),(35,'주방용품','2023-02-08',4,'부산',3586648),(36,'도서','2023-02-08',4,'서울',3575016),(37,'게임','2023-02-08',4,'서울',8594780),(38,'음료','2023-02-08',4,'서울',2050276),(39,'제한물품','2023-02-08',4,'서울',625966),(40,'문구','2023-02-08',4,'서울',7407859),(41,'위생용품','2023-02-08',4,'서울',3265907),(42,'주방용품','2023-02-08',4,'서울',3617439),(43,'도서','2023-02-09',1,'부산',3581530),(44,'게임','2023-02-09',1,'부산',8527439),(45,'음료','2023-02-09',1,'부산',2129152),(46,'제한물품','2023-02-09',1,'부산',586816),(47,'문구','2023-02-09',1,'부산',7457206),(48,'위생용품','2023-02-09',1,'부산',3182024),(49,'주방용품','2023-02-09',1,'부산',3572525),(50,'도서','2023-02-09',1,'서울',3583811),(51,'게임','2023-02-09',1,'서울',8609277),(52,'음료','2023-02-09',1,'서울',2062754),(53,'제한물품','2023-02-09',1,'서울',686541),(54,'문구','2023-02-09',1,'서울',7386374),(55,'위생용품','2023-02-09',1,'서울',3182695),(56,'주방용품','2023-02-09',1,'서울',3486862),(57,'도서','2023-02-09',2,'부산',3628032),(58,'게임','2023-02-09',2,'부산',8617705),(59,'음료','2023-02-09',2,'부산',1993873),(60,'제한물품','2023-02-09',2,'부산',744066),(61,'문구','2023-02-09',2,'부산',7372115),(62,'위생용품','2023-02-09',2,'부산',3125138),(63,'주방용품','2023-02-09',2,'부산',3497980),(64,'도서','2023-02-09',2,'서울',3601047),(65,'게임','2023-02-09',2,'서울',8695020),(66,'음료','2023-02-09',2,'서울',1924299),(67,'제한물품','2023-02-09',2,'서울',657016),(68,'문구','2023-02-09',2,'서울',7466138),(69,'위생용품','2023-02-09',2,'서울',3088320),(70,'주방용품','2023-02-09',2,'서울',3478115),(71,'도서','2023-02-09',3,'부산',3648666),(72,'게임','2023-02-09',3,'부산',8772031),(73,'음료','2023-02-09',3,'부산',1923930),(74,'제한물품','2023-02-09',3,'부산',690796),(75,'문구','2023-02-09',3,'부산',7556061),(76,'위생용품','2023-02-09',3,'부산',3105188),(77,'주방용품','2023-02-09',4,'부산',3427181),(78,'도서','2023-02-09',4,'서울',3747268),(79,'게임','2023-02-09',4,'서울',8853319),(80,'음료','2023-02-09',4,'서울',1898278),(81,'제한물품','2023-02-09',4,'서울',638918),(82,'문구','2023-02-09',4,'서울',7577470),(83,'위생용품','2023-02-09',4,'서울',3152997),(84,'주방용품','2023-02-09',4,'서울',3403409),(85,'도서','2023-02-10',1,'부산',3737564),(86,'게임','2023-02-10',1,'부산',8785995),(87,'음료','2023-02-10',1,'부산',1842294),(88,'제한물품','2023-02-10',1,'부산',589168),(89,'문구','2023-02-10',1,'부산',7657570),(90,'위생용품','2023-02-10',1,'부산',3182548),(91,'주방용품','2023-02-10',1,'부산',3486981),(92,'도서','2023-02-10',1,'서울',3651938),(93,'게임','2023-02-10',1,'서울',8845508),(94,'음료','2023-02-10',1,'서울',1787434),(95,'제한물품','2023-02-10',1,'서울',565637),(96,'문구','2023-02-10',1,'서울',7586955),(97,'위생용품','2023-02-10',1,'서울',3277381),(98,'주방용품','2023-02-10',1,'서울',3583918),(99,'도서','2023-02-10',2,'부산',3564343),(100,'게임','2023-02-10',2,'부산',8766953),(101,'음료','2023-02-10',2,'부산',1866638),(102,'제한물품','2023-02-10',2,'부산',574357),(103,'문구','2023-02-10',2,'부산',7494509),(104,'위생용품','2023-02-10',2,'부산',3337812),(105,'주방용품','2023-02-10',2,'부산',3622241),(106,'도서','2023-02-10',2,'서울',3610182),(107,'게임','2023-02-10',2,'서울',8772295),(108,'음료','2023-02-10',2,'서울',1803104),(109,'제한물품','2023-02-10',2,'서울',596420),(110,'문구','2023-02-10',2,'서울',7593085),(111,'위생용품','2023-02-10',2,'서울',3372871),(112,'주방용품','2023-02-10',2,'서울',3553020),(113,'도서','2023-02-10',3,'부산',3644438),(114,'게임','2023-02-10',3,'부산',8676962),(115,'음료','2023-02-10',3,'부산',1832614),(116,'제한물품','2023-02-10',3,'부산',627409),(117,'문구','2023-02-10',3,'부산',7635010),(118,'위생용품','2023-02-10',3,'부산',3283585),(119,'주방용품','2023-02-10',4,'부산',3505062),(120,'도서','2023-02-10',4,'서울',3723027),(121,'게임','2023-02-10',4,'서울',8707008),(122,'음료','2023-02-10',4,'서울',1893191),(123,'제한물품','2023-02-10',4,'서울',650415),(124,'문구','2023-02-10',4,'서울',7654721),(125,'위생용품','2023-02-10',4,'서울',3322704),(126,'주방용품','2023-02-10',4,'서울',3596669),(127,'도서','2023-02-11',1,'부산',3695166),(128,'게임','2023-02-11',1,'부산',8665780),(129,'음료','2023-02-11',1,'부산',1815310),(130,'제한물품','2023-02-11',1,'부산',617885),(131,'문구','2023-02-11',1,'부산',7696627),(132,'위생용품','2023-02-11',1,'부산',3229697),(133,'주방용품','2023-02-11',1,'부산',3508209),(134,'도서','2023-02-11',1,'서울',3713620),(135,'게임','2023-02-11',1,'서울',8696364),(136,'음료','2023-02-11',1,'서울',1738475),(137,'제한물품','2023-02-11',1,'서울',535344),(138,'문구','2023-02-11',1,'서울',7628089),(139,'위생용품','2023-02-11',1,'서울',3137609),(140,'주방용품','2023-02-11',1,'서울',3530945),(141,'도서','2023-02-11',2,'부산',3736945),(142,'게임','2023-02-11',2,'부산',8739792),(143,'음료','2023-02-11',2,'부산',1651688),(144,'제한물품','2023-02-11',2,'부산',506844),(145,'문구','2023-02-11',2,'부산',7550258),(146,'위생용품','2023-02-11',2,'부산',3106650),(147,'주방용품','2023-02-11',2,'부산',3542977),(148,'도서','2023-02-11',2,'서울',3672205),(149,'게임','2023-02-11',2,'서울',8829815),(150,'음료','2023-02-11',2,'서울',1659383),(151,'제한물품','2023-02-11',2,'서울',477446),(152,'문구','2023-02-11',2,'서울',7508999),(153,'위생용품','2023-02-11',2,'서울',3122289),(154,'주방용품','2023-02-11',2,'서울',3454823),(155,'도서','2023-02-11',3,'부산',3772153),(156,'게임','2023-02-11',3,'부산',8889245),(157,'음료','2023-02-11',3,'부산',1734824),(158,'제한물품','2023-02-11',3,'부산',382621),(159,'문구','2023-02-11',3,'부산',7471812),(160,'위생용품','2023-02-11',3,'부산',3205891),(161,'주방용품','2023-02-11',4,'부산',3520141),(162,'도서','2023-02-11',4,'서울',3715723),(163,'게임','2023-02-11',4,'서울',8913564),(164,'음료','2023-02-11',4,'서울',1685720),(165,'제한물품','2023-02-11',4,'서울',401396),(166,'문구','2023-02-11',4,'서울',7423672),(167,'위생용품','2023-02-11',4,'서울',3169237),(168,'주방용품','2023-02-11',4,'서울',3567574),(169,'도서','2023-02-12',1,'부산',3717391),(170,'게임','2023-02-12',1,'부산',8887698),(171,'음료','2023-02-12',1,'부산',1748957),(172,'제한물품','2023-02-12',1,'부산',355857),(173,'문구','2023-02-12',1,'부산',7439066),(174,'위생용품','2023-02-12',1,'부산',3121975),(175,'주방용품','2023-02-12',1,'부산',3609690),(176,'도서','2023-02-12',1,'서울',3735918),(177,'게임','2023-02-12',1,'서울',8807868),(178,'음료','2023-02-12',1,'서울',1830009),(179,'제한물품','2023-02-12',1,'서울',324127),(180,'문구','2023-02-12',1,'서울',7479377),(181,'위생용품','2023-02-12',1,'서울',3143164),(182,'주방용품','2023-02-12',1,'서울',3654910),(183,'도서','2023-02-12',2,'부산',3650169),(184,'게임','2023-02-12',2,'부산',8826958),(185,'음료','2023-02-12',2,'부산',1809083),(186,'제한물품','2023-02-12',2,'부산',257124),(187,'문구','2023-02-12',2,'부산',7522335),(188,'위생용품','2023-02-12',2,'부산',3223216),(189,'주방용품','2023-02-12',2,'부산',3650138),(190,'도서','2023-02-12',2,'서울',3599103),(191,'게임','2023-02-12',2,'서울',8811183),(192,'음료','2023-02-12',2,'서울',1775676),(193,'제한물품','2023-02-12',2,'서울',176851),(194,'문구','2023-02-12',2,'서울',7575158),(195,'위생용품','2023-02-12',2,'서울',3293224),(196,'주방용품','2023-02-12',2,'서울',3648873),(197,'도서','2023-02-12',3,'부산',3632435),(198,'게임','2023-02-12',3,'부산',8796541),(199,'음료','2023-02-12',3,'부산',1711984),(200,'제한물품','2023-02-12',3,'부산',184335),(201,'문구','2023-02-12',3,'부산',7575759),(202,'위생용품','2023-02-12',3,'부산',3330281),(203,'주방용품','2023-02-12',4,'부산',3617453),(204,'도서','2023-02-12',4,'서울',3560015),(205,'게임','2023-02-12',4,'서울',8744889),(206,'음료','2023-02-12',4,'서울',1654833),(207,'제한물품','2023-02-12',4,'서울',230850),(208,'문구','2023-02-12',4,'서울',7654883),(209,'위생용품','2023-02-12',4,'서울',3371542),(210,'주방용품','2023-02-12',4,'서울',3617939),(211,'게임','2023-02-13',1,'부산',3630944),(212,'음료','2023-02-13',1,'부산',8657971),(213,'제한물품','2023-02-13',1,'부산',1582948),(214,'문구','2023-02-13',1,'부산',284857),(215,'위생용품','2023-02-13',1,'부산',7603133),(216,'주방용품','2023-02-13',1,'부산',3413492),(217,'도서','2023-02-13',1,'서울',3650255),(218,'게임','2023-02-13',1,'서울',3584472),(219,'음료','2023-02-13',1,'서울',8691428),(220,'제한물품','2023-02-13',1,'서울',1603437),(221,'문구','2023-02-13',1,'서울',252096),(222,'위생용품','2023-02-13',1,'서울',7597436),(223,'주방용품','2023-02-13',1,'서울',3506888),(224,'도서','2023-02-13',2,'부산',3715836),(225,'게임','2023-02-13',2,'부산',3681853),(226,'음료','2023-02-13',2,'부산',8772332),(227,'제한물품','2023-02-13',2,'부산',1528630),(228,'문구','2023-02-13',2,'부산',342236),(229,'위생용품','2023-02-13',2,'부산',7503048),(230,'주방용품','2023-02-13',2,'부산',3594781),(231,'도서','2023-02-13',2,'서울',3709431),(232,'게임','2023-02-13',2,'서울',3596203),(233,'음료','2023-02-13',2,'서울',8715558),(234,'제한물품','2023-02-13',2,'서울',1624155),(235,'문구','2023-02-13',2,'서울',400758),(236,'위생용품','2023-02-13',2,'서울',7587175),(237,'주방용품','2023-02-13',2,'서울',3541697),(238,'도서','2023-02-13',3,'부산',3697601),(239,'게임','2023-02-13',3,'부산',3528418),(240,'음료','2023-02-13',3,'부산',8690060),(241,'제한물품','2023-02-13',3,'부산',1713221),(242,'문구','2023-02-13',3,'부산',444545),(243,'위생용품','2023-02-13',3,'부산',7659499),(244,'주방용품','2023-02-13',4,'부산',3461586),(245,'도서','2023-02-13',4,'서울',3712048),(246,'게임','2023-02-13',4,'서울',3563993),(247,'음료','2023-02-13',4,'서울',8624649),(248,'제한물품','2023-02-13',4,'서울',1618192),(249,'문구','2023-02-13',4,'서울',468317),(250,'위생용품','2023-02-13',4,'서울',7595834),(251,'주방용품','2023-02-13',4,'서울',3543555),(252,'게임','2023-02-14',1,'부산',3759758),(253,'음료','2023-02-14',1,'부산',3501037),(254,'제한물품','2023-02-14',1,'부산',8596937),(255,'문구','2023-02-14',1,'부산',1691375),(256,'위생용품','2023-02-14',1,'부산',468862),(257,'주방용품','2023-02-14',1,'부산',7653089),(258,'도서','2023-02-14',1,'서울',3564075),(259,'게임','2023-02-14',1,'서울',3673848),(260,'음료','2023-02-14',1,'서울',3567730),(261,'제한물품','2023-02-14',1,'서울',8690851),(262,'문구','2023-02-14',1,'서울',1663897),(263,'위생용품','2023-02-14',1,'서울',458975),(264,'주방용품','2023-02-14',1,'서울',7628319),(265,'도서','2023-02-14',2,'부산',3566837),(266,'게임','2023-02-14',2,'부산',3681350),(267,'음료','2023-02-14',2,'부산',3546694),(268,'제한물품','2023-02-14',2,'부산',8614899),(269,'문구','2023-02-14',2,'부산',1603236),(270,'위생용품','2023-02-14',2,'부산',486691),(271,'주방용품','2023-02-14',2,'부산',7586531),(272,'도서','2023-02-14',2,'서울',3653640),(273,'게임','2023-02-14',2,'서울',3659699),(274,'음료','2023-02-14',2,'서울',3628574),(275,'제한물품','2023-02-14',2,'서울',8711647),(276,'문구','2023-02-14',2,'서울',1675453),(277,'위생용품','2023-02-14',2,'서울',438291),(278,'주방용품','2023-02-14',2,'서울',7626604),(279,'도서','2023-02-14',3,'부산',3742949),(280,'게임','2023-02-14',3,'부산',3574248),(281,'음료','2023-02-14',3,'부산',3644846),(282,'제한물품','2023-02-14',3,'부산',8793090),(283,'문구','2023-02-14',3,'부산',1749065),(284,'위생용품','2023-02-14',3,'부산',373940),(285,'주방용품','2023-02-14',4,'부산',7656527),(286,'도서','2023-02-14',4,'서울',3699517),(287,'게임','2023-02-14',4,'서울',3545406),(288,'음료','2023-02-14',4,'서울',3657789),(289,'제한물품','2023-02-14',4,'서울',8853131),(290,'문구','2023-02-14',4,'서울',1733892),(291,'위생용품','2023-02-14',4,'서울',404791),(292,'주방용품','2023-02-14',4,'서울',7645683),(293,'게임','2023-02-15',1,'부산',3497493),(294,'음료','2023-02-15',1,'부산',3683121),(295,'제한물품','2023-02-15',1,'부산',8921215),(296,'문구','2023-02-15',1,'부산',1832319),(297,'위생용품','2023-02-15',1,'부산',383696),(298,'주방용품','2023-02-15',1,'부산',7721629),(299,'도서','2023-02-15',1,'서울',5347168),(300,'게임','2023-02-15',1,'서울',3510402),(301,'음료','2023-02-15',1,'서울',3658699),(302,'제한물품','2023-02-15',1,'서울',8905859),(303,'문구','2023-02-15',1,'서울',1776035),(304,'위생용품','2023-02-15',1,'서울',407403),(305,'주방용품','2023-02-15',1,'서울',7658913),(306,'도서','2023-02-15',2,'부산',5348126),(307,'게임','2023-02-15',2,'부산',3540008),(308,'음료','2023-02-15',2,'부산',3706347),(309,'제한물품','2023-02-15',2,'부산',8955252),(310,'문구','2023-02-15',2,'부산',1805245),(311,'위생용품','2023-02-15',2,'부산',400698),(312,'주방용품','2023-02-15',2,'부산',7615023),(313,'도서','2023-02-15',2,'서울',5348126),(314,'게임','2023-02-15',2,'서울',3639111),(315,'음료','2023-02-15',2,'서울',3713861),(316,'제한물품','2023-02-15',2,'서울',8983568),(317,'문구','2023-02-15',2,'서울',1817391),(318,'위생용품','2023-02-15',2,'서울',394626),(319,'주방용품','2023-02-15',2,'서울',7526895),(320,'도서','2023-02-15',3,'부산',5348126),(321,'게임','2023-02-15',3,'부산',3724772),(322,'음료','2023-02-15',3,'부산',3641717),(323,'제한물품','2023-02-15',3,'부산',9005892),(324,'문구','2023-02-15',3,'부산',1833836),(325,'위생용품','2023-02-15',3,'부산',434977),(326,'주방용품','2023-02-15',4,'부산',7579184),(327,'도서','2023-02-15',4,'서울',5348126),(328,'게임','2023-02-15',4,'서울',3720215),(329,'음료','2023-02-15',4,'서울',3616057),(330,'제한물품','2023-02-15',4,'서울',9004084),(331,'문구','2023-02-15',4,'서울',1854543),(332,'위생용품','2023-02-15',4,'서울',392419),(333,'주방용품','2023-02-15',4,'서울',7485931);
/*!40000 ALTER TABLE `sale_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_report_entity`
--

DROP TABLE IF EXISTS `sale_report_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_report_entity` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_report_entity`
--

LOCK TABLES `sale_report_entity` WRITE;
/*!40000 ALTER TABLE `sale_report_entity` DISABLE KEYS */;
INSERT INTO `sale_report_entity` VALUES ('sale_report',333);
/*!40000 ALTER TABLE `sale_report_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staff_id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `part` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `staff_login_id` varchar(255) DEFAULT NULL,
  `branch_id` bigint DEFAULT NULL,
  PRIMARY KEY (`staff_id`),
  KEY `FKc9xh37lh8sjk8m5hhp5bnq1ca` (`branch_id`),
  CONSTRAINT `FKc9xh37lh8sjk8m5hhp5bnq1ca` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,'이름','관리','대리','user1234',1),(2,'서컨턴','지점장','지점장','consult_admin',1),(3,'김코치','캐셔','직원','coach_admin',1);
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_report`
--

DROP TABLE IF EXISTS `user_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_report` (
  `user_report_id` bigint NOT NULL,
  `age` bigint DEFAULT NULL,
  `date` date DEFAULT NULL,
  `gender` int DEFAULT NULL,
  `population` bigint DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `sales` bigint DEFAULT NULL,
  PRIMARY KEY (`user_report_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_report`
--

LOCK TABLES `user_report` WRITE;
/*!40000 ALTER TABLE `user_report` DISABLE KEYS */;
INSERT INTO `user_report` VALUES (1,10,'2023-02-08',0,930,'부산',8907521),(2,10,'2023-02-08',0,832,'서울',7999851),(3,20,'2023-02-08',0,644,'부산',6838447),(4,20,'2023-02-08',0,221,'서울',9020928),(5,30,'2023-02-08',0,14,'부산',4073833),(6,30,'2023-02-08',0,358,'서울',7411347),(7,40,'2023-02-08',0,527,'부산',7515337),(8,40,'2023-02-08',0,720,'서울',606254),(9,50,'2023-02-08',0,896,'부산',5301939),(10,50,'2023-02-08',0,520,'서울',182922),(11,60,'2023-02-08',0,512,'부산',1962398),(12,60,'2023-02-08',0,232,'서울',5809852),(13,10,'2023-02-08',1,914,'부산',8835006),(14,10,'2023-02-08',1,870,'서울',8018071),(15,20,'2023-02-08',1,641,'부산',6916889),(16,20,'2023-02-08',1,218,'서울',8948532),(17,30,'2023-02-08',1,-15,'부산',4124339),(18,30,'2023-02-08',1,365,'서울',7446717),(19,40,'2023-02-08',1,541,'부산',7493126),(20,40,'2023-02-08',1,735,'서울',667915),(21,50,'2023-02-08',1,946,'부산',5299784),(22,50,'2023-02-08',1,488,'서울',231554),(23,60,'2023-02-08',1,536,'부산',2059055),(24,60,'2023-02-08',1,260,'서울',5725116),(25,10,'2023-02-09',0,974,'부산',434056),(26,10,'2023-02-09',0,627,'서울',144789),(27,20,'2023-02-09',0,648,'부산',218426),(28,20,'2023-02-09',0,269,'서울',6068618),(29,30,'2023-02-09',0,625,'부산',1364466),(30,30,'2023-02-09',0,678,'서울',6638954),(31,40,'2023-02-09',0,757,'부산',6590672),(32,40,'2023-02-09',0,313,'서울',8642622),(33,50,'2023-02-09',0,246,'부산',9356735),(34,50,'2023-02-09',0,688,'서울',2765052),(35,60,'2023-02-09',0,993,'부산',5104841),(36,60,'2023-02-09',0,490,'서울',8698323),(37,10,'2023-02-09',1,931,'부산',520552),(38,10,'2023-02-09',1,666,'서울',63311),(39,20,'2023-02-09',1,611,'부산',258373),(40,20,'2023-02-09',1,247,'서울',6043281),(41,30,'2023-02-09',1,613,'부산',1282459),(42,30,'2023-02-09',1,640,'서울',6594013),(43,40,'2023-02-09',1,782,'부산',6670218),(44,40,'2023-02-09',1,321,'서울',8574762),(45,50,'2023-02-09',1,205,'부산',9412602),(46,50,'2023-02-09',1,687,'서울',2731415),(47,60,'2023-02-09',1,1015,'부산',5019485),(48,60,'2023-02-09',1,504,'서울',8720573),(49,10,'2023-02-10',0,770,'부산',4548593),(50,10,'2023-02-10',0,788,'서울',1435782),(51,20,'2023-02-10',0,449,'부산',8681395),(52,20,'2023-02-10',0,68,'서울',9549966),(53,30,'2023-02-10',0,71,'부산',5150101),(54,30,'2023-02-10',0,64,'서울',9050132),(55,40,'2023-02-10',0,333,'부산',4470021),(56,40,'2023-02-10',0,306,'서울',6484384),(57,50,'2023-02-10',0,988,'부산',8671586),(58,50,'2023-02-10',0,859,'서울',8480147),(59,60,'2023-02-10',0,182,'부산',9197519),(60,60,'2023-02-10',0,263,'서울',8577005),(61,10,'2023-02-10',1,725,'부산',4480916),(62,10,'2023-02-10',1,766,'서울',1398396),(63,20,'2023-02-10',1,422,'부산',8696916),(64,20,'2023-02-10',1,33,'서울',9610724),(65,30,'2023-02-10',1,65,'부산',5098976),(66,30,'2023-02-10',1,104,'서울',8998740),(67,40,'2023-02-10',1,354,'부산',4489526),(68,40,'2023-02-10',1,262,'서울',6491921),(69,50,'2023-02-10',1,1027,'부산',8757223),(70,50,'2023-02-10',1,846,'서울',8579235),(71,60,'2023-02-10',1,219,'부산',9250844),(72,60,'2023-02-10',1,236,'서울',8523447),(73,10,'2023-02-11',0,800,'부산',5515755),(74,10,'2023-02-11',0,601,'서울',5792118),(75,20,'2023-02-11',0,649,'부산',5991910),(76,20,'2023-02-11',0,417,'서울',2622145),(77,30,'2023-02-11',0,817,'부산',4138095),(78,30,'2023-02-11',0,79,'서울',1507783),(79,40,'2023-02-11',0,727,'부산',1486528),(80,40,'2023-02-11',0,930,'서울',6446842),(81,50,'2023-02-11',0,42,'부산',1076633),(82,50,'2023-02-11',0,751,'서울',5180198),(83,60,'2023-02-11',0,505,'부산',9000408),(84,60,'2023-02-11',0,787,'서울',8228389),(85,10,'2023-02-11',1,765,'부산',5522040),(86,10,'2023-02-11',1,562,'서울',5700650),(87,20,'2023-02-11',1,697,'부산',5898688),(88,20,'2023-02-11',1,417,'서울',2638130),(89,30,'2023-02-11',1,850,'부산',4085801),(90,30,'2023-02-11',1,55,'서울',1599016),(91,40,'2023-02-11',1,718,'부산',1413500),(92,40,'2023-02-11',1,966,'서울',6392627),(93,50,'2023-02-11',1,77,'부산',1140552),(94,50,'2023-02-11',1,792,'서울',5190434),(95,60,'2023-02-11',1,512,'부산',8978566),(96,60,'2023-02-11',1,781,'서울',8324720),(97,10,'2023-02-12',0,338,'부산',8080496),(98,10,'2023-02-12',0,141,'서울',1669648),(99,20,'2023-02-12',0,693,'부산',2198490),(100,20,'2023-02-12',0,389,'서울',6541066),(101,30,'2023-02-12',0,853,'부산',1526352),(102,30,'2023-02-12',0,525,'서울',6115145),(103,40,'2023-02-12',0,535,'부산',4853749),(104,40,'2023-02-12',0,353,'서울',4796449),(105,50,'2023-02-12',0,153,'부산',4172069),(106,50,'2023-02-12',0,860,'서울',6724440),(107,60,'2023-02-12',0,665,'부산',9824441),(108,60,'2023-02-12',0,568,'서울',2355198),(109,10,'2023-02-12',1,380,'부산',8030504),(110,10,'2023-02-12',1,93,'서울',1717094),(111,20,'2023-02-12',1,690,'부산',2256572),(112,20,'2023-02-12',1,428,'서울',6449008),(113,30,'2023-02-12',1,866,'부산',1612108),(114,30,'2023-02-12',1,498,'서울',6159034),(115,40,'2023-02-12',1,557,'부산',4863081),(116,40,'2023-02-12',1,343,'서울',4730219),(117,50,'2023-02-12',1,201,'부산',4077528),(118,50,'2023-02-12',1,888,'서울',6754973),(119,60,'2023-02-12',1,704,'부산',9726929),(120,60,'2023-02-12',1,534,'서울',2453648),(121,10,'2023-02-13',0,449,'부산',927416),(122,10,'2023-02-13',0,707,'서울',5669918),(123,20,'2023-02-13',0,72,'부산',9815421),(124,20,'2023-02-13',0,832,'서울',2205105),(125,30,'2023-02-13',0,48,'부산',4009262),(126,30,'2023-02-13',0,931,'서울',1907826),(127,40,'2023-02-13',0,975,'부산',8495905),(128,40,'2023-02-13',0,237,'서울',715195),(129,50,'2023-02-13',0,566,'부산',3276924),(130,50,'2023-02-13',0,339,'서울',7143799),(131,60,'2023-02-13',0,233,'부산',2438489),(132,60,'2023-02-13',0,428,'서울',8212645),(133,10,'2023-02-13',1,446,'부산',932682),(134,10,'2023-02-13',1,687,'서울',5765760),(135,20,'2023-02-13',1,56,'부산',9777130),(136,20,'2023-02-13',1,799,'서울',2252856),(137,30,'2023-02-13',1,80,'부산',4089559),(138,30,'2023-02-13',1,891,'서울',1849041),(139,40,'2023-02-13',1,974,'부산',8594449),(140,40,'2023-02-13',1,232,'서울',713456),(141,50,'2023-02-13',1,559,'부산',3280648),(142,50,'2023-02-13',1,381,'서울',7107663),(143,60,'2023-02-13',1,217,'부산',2418905),(144,60,'2023-02-13',1,403,'서울',8187635),(145,10,'2023-02-14',0,779,'부산',7763877),(146,10,'2023-02-14',0,502,'서울',6221819),(147,20,'2023-02-14',0,841,'부산',7909580),(148,20,'2023-02-14',0,84,'서울',8345016),(149,30,'2023-02-14',0,125,'부산',3045125),(150,30,'2023-02-14',0,20,'서울',2740780),(151,40,'2023-02-14',0,770,'부산',8552615),(152,40,'2023-02-14',0,925,'서울',3561855),(153,50,'2023-02-14',0,870,'부산',6124268),(154,50,'2023-02-14',0,840,'서울',9009859),(155,60,'2023-02-14',0,845,'부산',1857278),(156,60,'2023-02-14',0,136,'서울',5978801),(157,10,'2023-02-14',1,770,'부산',7806446),(158,10,'2023-02-14',1,501,'서울',6217667),(159,20,'2023-02-14',1,795,'부산',7857914),(160,20,'2023-02-14',1,122,'서울',8346803),(161,30,'2023-02-14',1,107,'부산',3012340),(162,30,'2023-02-14',1,68,'서울',2773542),(163,40,'2023-02-14',1,744,'부산',8464552),(164,40,'2023-02-14',1,936,'서울',3658672),(165,50,'2023-02-14',1,903,'부산',6066721),(166,50,'2023-02-14',1,890,'서울',8922216),(167,60,'2023-02-14',1,875,'부산',1778789),(168,60,'2023-02-14',1,175,'서울',5904533),(169,10,'2023-02-15',0,140,'부산',7353213),(170,10,'2023-02-15',0,308,'서울',6249064),(171,20,'2023-02-15',0,196,'부산',2500865),(172,20,'2023-02-15',0,772,'서울',1563048),(173,30,'2023-02-15',0,135,'부산',1676442),(174,30,'2023-02-15',0,517,'서울',2140405),(175,40,'2023-02-15',0,822,'부산',9950741),(176,40,'2023-02-15',0,645,'서울',4695007),(177,50,'2023-02-15',0,586,'부산',6097215),(178,50,'2023-02-15',0,852,'서울',4228496),(179,60,'2023-02-15',0,731,'부산',3394041),(180,60,'2023-02-15',0,169,'서울',4674587),(181,10,'2023-02-15',1,120,'부산',7292570),(182,10,'2023-02-15',1,278,'서울',6250459),(183,20,'2023-02-15',1,194,'부산',2571727),(184,20,'2023-02-15',1,784,'서울',1520298),(185,30,'2023-02-15',1,173,'부산',1709937),(186,30,'2023-02-15',1,493,'서울',2093378),(187,40,'2023-02-15',1,848,'부산',9915531),(188,40,'2023-02-15',1,642,'서울',4613231),(189,50,'2023-02-15',1,609,'부산',6026759),(190,50,'2023-02-15',1,869,'서울',4173000),(191,60,'2023-02-15',1,732,'부산',3361726),(192,60,'2023-02-15',1,172,'서울',4714745);
/*!40000 ALTER TABLE `user_report` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_report_entity`
--

DROP TABLE IF EXISTS `user_report_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_report_entity` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_report_entity`
--

LOCK TABLES `user_report_entity` WRITE;
/*!40000 ALTER TABLE `user_report_entity` DISABLE KEYS */;
INSERT INTO `user_report_entity` VALUES ('user_report',192);
/*!40000 ALTER TABLE `user_report_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL,
  `ad_select` bit(1) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `default_card_id` bigint DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `login_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `pay_password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_i3xs7wmfu2i3jt079uuetycit` (`login_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,_binary '','1964-11-26',1,'email@email.com','MALE','user1234','이름','$2a$10$hf2coMBVOS6jo0Pnhk59RelcACAPWRTXbURrX0UWReA9QUUbPciNG','1445','010-4702-1492','ROLE_USER'),(2,_binary '\0','1960-02-27',2,'email@email.com','FEMALE','admin1234','이름','$2a$10$muvzn0jcfOI3XNCC7BWor.x2AtnQLzs2QfKitpzlUajDj0iNpWxwS','5677','010-8104-4684','ROLE_ADMIN'),(3,_binary '','1980-05-24',3,'constant@hanamail.com','MALE','consult_user','이컨턴','$2a$10$84CTo5GPuZxBDDdf8tN/.uIJi3XTeyBuyaAjyGnkOi/cP1uMc4Dki','3565','010-0198-7303','ROLE_USER'),(4,_binary '','1976-08-10',4,'constant@hanmail.com','MALE','consult_admin','서컨턴','$2a$10$aVKbsBC0N3jH7mYTH9KAFeD5bttn8vF.kl22PpzxioIvmovCXsV/W','3515','010-0629-8894','ROLE_ADMIN'),(5,_binary '','1973-05-22',5,'coach_park@gmail.com','MALE','coach_user','박코치','$2a$10$cVE96ogaIU656EMShsi2uubxVHUwEkyJIfMYDM12N8STBrQOmw4qS','0796','010-7595-9768','ROLE_USER'),(6,_binary '','1969-01-01',6,'coach_kim@gmail.com','FEMALE','coach_admin','김코치','$2a$10$d.B1lHjmM/kYvkYsc.CYn.VGLZ.quBkLB5lNy.P.hAgmouRJ2hi/G','2155','010-7265-6365','ROLE_ADMIN');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-17  9:09:31
