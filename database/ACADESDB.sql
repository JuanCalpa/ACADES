-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: acades
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `id_admin` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  PRIMARY KEY (`id_admin`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1,'Sofia Burbano','sofi.blu@acades.com','admin1'),(2,'Juan Calpa','nadaplete@acades.com','admin2'),(3,'Cristhian Padilla','hentai.lopez@acades.com','admin3'),(4,'Stiven Burbano','barca@acades.com','admin4');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `citas`
--

DROP TABLE IF EXISTS `citas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `citas` (
  `id_cita` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_especialista` int NOT NULL,
  `id_procedimiento` int DEFAULT NULL,
  `notas` text,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `estado` enum('Pendiente','Finalizada','Cancelada','Confirmada') DEFAULT 'Pendiente',
  `estado_hora` enum('Disponible','Ocupada') DEFAULT 'Ocupada',
  PRIMARY KEY (`id_cita`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_procedimiento` (`id_procedimiento`),
  KEY `id_especialista` (`id_especialista`),
  CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`),
  CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`id_procedimiento`) REFERENCES `procedimientos` (`id_procedimiento`),
  CONSTRAINT `citas_ibfk_3` FOREIGN KEY (`id_especialista`) REFERENCES `especialista` (`id_especialista`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `citas`
--

LOCK TABLES `citas` WRITE;
/*!40000 ALTER TABLE `citas` DISABLE KEYS */;
INSERT INTO `citas` VALUES (1,1,1,2,'Aplicación de uñas acrílicas','2025-05-20','11:00:00','Pendiente','Ocupada'),(2,2,2,2,'Corte de cabello moderno','2025-05-21','09:00:00','Finalizada','Ocupada'),(3,3,3,2,'Masaje relajante de espalda','2025-05-22','15:00:00','Pendiente','Ocupada'),(4,4,4,6,'Maquillaje para evento','2025-05-22','17:00:00','Confirmada','Disponible'),(5,1,5,6,'Evento especial - maquillaje','2025-05-25','10:00:00','Pendiente','Ocupada'),(6,2,6,2,'Depilación de piernas','2025-05-23','10:00:00','Confirmada','Ocupada'),(7,3,7,2,'Barba clásica','2025-05-23','12:00:00','Finalizada','Ocupada'),(8,4,8,4,'Limpieza facial completa','2025-05-23','14:00:00','Pendiente','Ocupada'),(9,1,9,3,'Tinte de cabello rubio','2025-05-24','16:00:00','Pendiente','Ocupada'),(10,2,10,1,'Extensiones naturales','2025-05-24','18:00:00','Confirmada','Ocupada'),(11,5,2,2,'Corte aleta pa las bbs','2025-05-23','10:00:00','Pendiente','Ocupada');
/*!40000 ALTER TABLE `citas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `cedula` varchar(20) DEFAULT NULL,
  `fecha_nacimiento` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `contrasena` varchar(100) NOT NULL,
  `id_admin` int DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `correo` (`correo`),
  KEY `id_admin` (`id_admin`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `administrador` (`id_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'Valeria Sánchez','valeria.s@gmail.com','12345','1995-06-12','5551230001','valeria123',1),(2,'Bruno Díaz','bruno.d@gmail.com','5678','1992-03-08','5551230002','bruno123',2),(3,'Camila Torres','camila.t@gmail.com','911911','1998-11-20','5551230003','camila123',3),(4,'Miguel Ángel','miguel.a@gmail.com','0029901','1990-09-05','5551230004','miguel123',4),(5,'Neider Burbano','nsbcpro@gmail.com','1086132085','2003-12-01','3113925873','Neider123',1);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialista`
--

DROP TABLE IF EXISTS `especialista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialista` (
  `id_especialista` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL,
  PRIMARY KEY (`id_especialista`),
  UNIQUE KEY `correo` (`correo`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialista`
--

LOCK TABLES `especialista` WRITE;
/*!40000 ALTER TABLE `especialista` DISABLE KEYS */;
INSERT INTO `especialista` VALUES (1,'Sofía Mendoza','Uñas acrílicas','5551234567','sofia.mendoza@example.com','contrasena123'),(2,'Javier Peña','Cortes de cabello','5559876543','javier.pena@example.com','contrasena123'),(3,'Lucía Herrera','Masajes terapéuticos','5554567890','lucia.herrera@example.com','contrasena123'),(4,'Pedro Ramírez','Maquillaje profesional','5552223344','pedro.ramirez@example.com','contrasena123'),(5,'Carla Gómez','Peinados de gala','5556781234','carla.gomez@example.com','contrasena123'),(6,'Andrea Morales','Depilación con cera','5558887766','andrea.morales@example.com','contrasena123'),(7,'Diego Fernández','Barbería y afeitado','5553344556','diego.fernandez@example.com','contrasena123'),(8,'Laura Niño','Tratamientos faciales','5551122334','laura.nino@example.com','contrasena123'),(9,'Esteban Paredes','Tintes de cabello','5559988776','esteban.paredes@example.com','contrasena123'),(10,'Mónica Vélez','Extensiones de pestañas','5554455667','monica.velez@example.com','contrasena123');
/*!40000 ALTER TABLE `especialista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialista_procedimiento`
--

DROP TABLE IF EXISTS `especialista_procedimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialista_procedimiento` (
  `id_especialista` int NOT NULL,
  `id_procedimiento` int NOT NULL,
  PRIMARY KEY (`id_especialista`,`id_procedimiento`),
  KEY `id_procedimiento` (`id_procedimiento`),
  CONSTRAINT `especialista_procedimiento_ibfk_1` FOREIGN KEY (`id_especialista`) REFERENCES `especialista` (`id_especialista`) ON DELETE CASCADE,
  CONSTRAINT `especialista_procedimiento_ibfk_2` FOREIGN KEY (`id_procedimiento`) REFERENCES `procedimientos` (`id_procedimiento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialista_procedimiento`
--

LOCK TABLES `especialista_procedimiento` WRITE;
/*!40000 ALTER TABLE `especialista_procedimiento` DISABLE KEYS */;
INSERT INTO `especialista_procedimiento` VALUES (1,1),(5,1),(2,2),(10,2),(3,3),(7,3),(4,4),(5,4),(8,4),(6,5),(9,5);
/*!40000 ALTER TABLE `especialista_procedimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horarios_especialista`
--

DROP TABLE IF EXISTS `horarios_especialista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horarios_especialista` (
  `id_horario` int NOT NULL AUTO_INCREMENT,
  `id_especialista` int DEFAULT NULL,
  `id_dia_semana` int DEFAULT NULL,
  `hora` time NOT NULL,
  `estado` enum('Disponible','Ocupada') DEFAULT 'Disponible',
  PRIMARY KEY (`id_horario`),
  KEY `id_especialista` (`id_especialista`),
  CONSTRAINT `horarios_especialista_ibfk_1` FOREIGN KEY (`id_especialista`) REFERENCES `especialista` (`id_especialista`)
) ENGINE=InnoDB AUTO_INCREMENT=241 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horarios_especialista`
--

LOCK TABLES `horarios_especialista` WRITE;
/*!40000 ALTER TABLE `horarios_especialista` DISABLE KEYS */;
INSERT INTO `horarios_especialista` VALUES (1,1,1,'09:00:00','Disponible'),(2,1,1,'10:00:00','Disponible'),(3,1,1,'11:00:00','Disponible'),(4,1,1,'12:00:00','Disponible'),(5,1,1,'13:00:00','Disponible'),(6,1,1,'14:00:00','Disponible'),(7,1,1,'15:00:00','Disponible'),(8,1,1,'16:00:00','Disponible'),(9,1,2,'09:00:00','Disponible'),(10,1,2,'10:00:00','Disponible'),(11,1,2,'11:00:00','Disponible'),(12,1,2,'12:00:00','Disponible'),(13,1,2,'13:00:00','Disponible'),(14,1,2,'14:00:00','Disponible'),(15,1,2,'15:00:00','Disponible'),(16,1,2,'16:00:00','Disponible'),(17,1,3,'09:00:00','Disponible'),(18,1,3,'10:00:00','Disponible'),(19,1,3,'11:00:00','Disponible'),(20,1,3,'12:00:00','Disponible'),(21,1,3,'13:00:00','Disponible'),(22,1,3,'14:00:00','Disponible'),(23,1,3,'15:00:00','Disponible'),(24,1,3,'16:00:00','Disponible'),(25,1,4,'09:00:00','Disponible'),(26,1,4,'10:00:00','Disponible'),(27,1,4,'11:00:00','Disponible'),(28,1,4,'12:00:00','Disponible'),(29,1,4,'13:00:00','Disponible'),(30,1,4,'14:00:00','Disponible'),(31,1,4,'15:00:00','Disponible'),(32,1,4,'16:00:00','Disponible'),(33,1,5,'09:00:00','Disponible'),(34,1,5,'10:00:00','Disponible'),(35,1,5,'11:00:00','Disponible'),(36,1,5,'12:00:00','Disponible'),(37,1,5,'13:00:00','Disponible'),(38,1,5,'14:00:00','Disponible'),(39,1,5,'15:00:00','Disponible'),(40,1,5,'16:00:00','Disponible'),(41,2,1,'09:00:00','Disponible'),(42,2,1,'10:00:00','Disponible'),(43,2,1,'11:00:00','Disponible'),(44,2,1,'12:00:00','Disponible'),(45,2,1,'13:00:00','Disponible'),(46,2,1,'14:00:00','Disponible'),(47,2,1,'15:00:00','Disponible'),(48,2,1,'16:00:00','Disponible'),(49,2,2,'09:00:00','Disponible'),(50,2,2,'10:00:00','Disponible'),(51,2,2,'11:00:00','Disponible'),(52,2,2,'12:00:00','Disponible'),(53,2,2,'13:00:00','Disponible'),(54,2,2,'14:00:00','Disponible'),(55,2,2,'15:00:00','Disponible'),(56,2,2,'16:00:00','Disponible'),(57,2,3,'09:00:00','Disponible'),(58,2,3,'10:00:00','Disponible'),(59,2,3,'11:00:00','Disponible'),(60,2,3,'12:00:00','Disponible'),(61,2,3,'13:00:00','Disponible'),(62,2,3,'14:00:00','Disponible'),(63,2,3,'15:00:00','Disponible'),(64,2,3,'16:00:00','Disponible'),(65,2,4,'09:00:00','Disponible'),(66,2,4,'10:00:00','Disponible'),(67,2,4,'11:00:00','Disponible'),(68,2,4,'12:00:00','Disponible'),(69,2,4,'13:00:00','Disponible'),(70,2,4,'14:00:00','Disponible'),(71,2,4,'15:00:00','Disponible'),(72,2,4,'16:00:00','Disponible'),(73,2,5,'09:00:00','Disponible'),(74,2,5,'10:00:00','Disponible'),(75,2,5,'11:00:00','Disponible'),(76,2,5,'12:00:00','Disponible'),(77,2,5,'13:00:00','Disponible'),(78,2,5,'14:00:00','Disponible'),(79,2,5,'15:00:00','Disponible'),(80,2,5,'16:00:00','Disponible'),(81,3,1,'09:00:00','Disponible'),(82,3,1,'10:00:00','Disponible'),(83,3,1,'11:00:00','Disponible'),(84,3,1,'12:00:00','Disponible'),(85,3,1,'13:00:00','Disponible'),(86,3,1,'14:00:00','Disponible'),(87,3,1,'15:00:00','Disponible'),(88,3,1,'16:00:00','Disponible'),(89,3,2,'09:00:00','Disponible'),(90,3,2,'10:00:00','Disponible'),(91,3,2,'11:00:00','Disponible'),(92,3,2,'12:00:00','Disponible'),(93,3,2,'13:00:00','Disponible'),(94,3,2,'14:00:00','Disponible'),(95,3,2,'15:00:00','Disponible'),(96,3,2,'16:00:00','Disponible'),(97,3,3,'09:00:00','Disponible'),(98,3,3,'10:00:00','Disponible'),(99,3,3,'11:00:00','Disponible'),(100,3,3,'12:00:00','Disponible'),(101,3,3,'13:00:00','Disponible'),(102,3,3,'14:00:00','Disponible'),(103,3,3,'15:00:00','Disponible'),(104,3,3,'16:00:00','Disponible'),(105,3,4,'09:00:00','Disponible'),(106,3,4,'10:00:00','Disponible'),(107,3,4,'11:00:00','Disponible'),(108,3,4,'12:00:00','Disponible'),(109,3,4,'13:00:00','Disponible'),(110,3,4,'14:00:00','Disponible'),(111,3,4,'15:00:00','Disponible'),(112,3,4,'16:00:00','Disponible'),(113,3,5,'09:00:00','Disponible'),(114,3,5,'10:00:00','Disponible'),(115,3,5,'11:00:00','Disponible'),(116,3,5,'12:00:00','Disponible'),(117,3,5,'13:00:00','Disponible'),(118,3,5,'14:00:00','Disponible'),(119,3,5,'15:00:00','Disponible'),(120,3,5,'16:00:00','Disponible'),(121,4,1,'09:00:00','Disponible'),(122,4,1,'10:00:00','Disponible'),(123,4,1,'11:00:00','Disponible'),(124,4,1,'12:00:00','Disponible'),(125,4,1,'13:00:00','Disponible'),(126,4,1,'14:00:00','Disponible'),(127,4,1,'15:00:00','Disponible'),(128,4,1,'16:00:00','Disponible'),(129,4,2,'09:00:00','Disponible'),(130,4,2,'10:00:00','Disponible'),(131,4,2,'11:00:00','Disponible'),(132,4,2,'12:00:00','Disponible'),(133,4,2,'13:00:00','Disponible'),(134,4,2,'14:00:00','Disponible'),(135,4,2,'15:00:00','Disponible'),(136,4,2,'16:00:00','Disponible'),(137,4,3,'09:00:00','Disponible'),(138,4,3,'10:00:00','Disponible'),(139,4,3,'11:00:00','Disponible'),(140,4,3,'12:00:00','Disponible'),(141,4,3,'13:00:00','Disponible'),(142,4,3,'14:00:00','Disponible'),(143,4,3,'15:00:00','Disponible'),(144,4,3,'16:00:00','Disponible'),(145,4,4,'09:00:00','Disponible'),(146,4,4,'10:00:00','Disponible'),(147,4,4,'11:00:00','Disponible'),(148,4,4,'12:00:00','Disponible'),(149,4,4,'13:00:00','Disponible'),(150,4,4,'14:00:00','Disponible'),(151,4,4,'15:00:00','Disponible'),(152,4,4,'16:00:00','Disponible'),(153,4,5,'09:00:00','Disponible'),(154,4,5,'10:00:00','Disponible'),(155,4,5,'11:00:00','Disponible'),(156,4,5,'12:00:00','Disponible'),(157,4,5,'13:00:00','Disponible'),(158,4,5,'14:00:00','Disponible'),(159,4,5,'15:00:00','Disponible'),(160,4,5,'16:00:00','Disponible'),(161,5,1,'09:00:00','Disponible'),(162,5,1,'10:00:00','Disponible'),(163,5,1,'11:00:00','Disponible'),(164,5,1,'12:00:00','Disponible'),(165,5,1,'13:00:00','Disponible'),(166,5,1,'14:00:00','Disponible'),(167,5,1,'15:00:00','Disponible'),(168,5,1,'16:00:00','Disponible'),(169,5,2,'09:00:00','Disponible'),(170,5,2,'10:00:00','Disponible'),(171,5,2,'11:00:00','Disponible'),(172,5,2,'12:00:00','Disponible'),(173,5,2,'13:00:00','Disponible'),(174,5,2,'14:00:00','Disponible'),(175,5,2,'15:00:00','Disponible'),(176,5,2,'16:00:00','Disponible'),(177,5,3,'09:00:00','Disponible'),(178,5,3,'10:00:00','Disponible'),(179,5,3,'11:00:00','Disponible'),(180,5,3,'12:00:00','Disponible'),(181,5,3,'13:00:00','Disponible'),(182,5,3,'14:00:00','Disponible'),(183,5,3,'15:00:00','Disponible'),(184,5,3,'16:00:00','Disponible'),(185,5,4,'09:00:00','Disponible'),(186,5,4,'10:00:00','Disponible'),(187,5,4,'11:00:00','Disponible'),(188,5,4,'12:00:00','Disponible'),(189,5,4,'13:00:00','Disponible'),(190,5,4,'14:00:00','Disponible'),(191,5,4,'15:00:00','Disponible'),(192,5,4,'16:00:00','Disponible'),(193,5,5,'09:00:00','Disponible'),(194,5,5,'10:00:00','Disponible'),(195,5,5,'11:00:00','Disponible'),(196,5,5,'12:00:00','Disponible'),(197,5,5,'13:00:00','Disponible'),(198,5,5,'14:00:00','Disponible'),(199,5,5,'15:00:00','Disponible'),(200,5,5,'16:00:00','Disponible'),(201,6,1,'09:00:00','Disponible'),(202,6,1,'10:00:00','Disponible'),(203,6,1,'11:00:00','Disponible'),(204,6,1,'12:00:00','Disponible'),(205,6,1,'13:00:00','Disponible'),(206,6,1,'14:00:00','Disponible'),(207,6,1,'15:00:00','Disponible'),(208,6,1,'16:00:00','Disponible'),(209,6,2,'09:00:00','Disponible'),(210,6,2,'10:00:00','Disponible'),(211,6,2,'11:00:00','Disponible'),(212,6,2,'12:00:00','Disponible'),(213,6,2,'13:00:00','Disponible'),(214,6,2,'14:00:00','Disponible'),(215,6,2,'15:00:00','Disponible'),(216,6,2,'16:00:00','Disponible'),(217,6,3,'09:00:00','Disponible'),(218,6,3,'10:00:00','Disponible'),(219,6,3,'11:00:00','Disponible'),(220,6,3,'12:00:00','Disponible'),(221,6,3,'13:00:00','Disponible'),(222,6,3,'14:00:00','Disponible'),(223,6,3,'15:00:00','Disponible'),(224,6,3,'16:00:00','Disponible'),(225,6,4,'09:00:00','Disponible'),(226,6,4,'10:00:00','Disponible'),(227,6,4,'11:00:00','Disponible'),(228,6,4,'12:00:00','Disponible'),(229,6,4,'13:00:00','Disponible'),(230,6,4,'14:00:00','Disponible'),(231,6,4,'15:00:00','Disponible'),(232,6,4,'16:00:00','Disponible'),(233,6,5,'09:00:00','Disponible'),(234,6,5,'10:00:00','Disponible'),(235,6,5,'11:00:00','Disponible'),(236,6,5,'12:00:00','Disponible'),(237,6,5,'13:00:00','Disponible'),(238,6,5,'14:00:00','Disponible'),(239,6,5,'15:00:00','Disponible'),(240,6,5,'16:00:00','Disponible');
/*!40000 ALTER TABLE `horarios_especialista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `procedimientos`
--

DROP TABLE IF EXISTS `procedimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `procedimientos` (
  `id_procedimiento` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  PRIMARY KEY (`id_procedimiento`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `procedimientos`
--

LOCK TABLES `procedimientos` WRITE;
/*!40000 ALTER TABLE `procedimientos` DISABLE KEYS */;
INSERT INTO `procedimientos` VALUES (1,'Tratamientos Faciales'),(2,'Tratamientos Corporales'),(3,'Yesoterapia Lipolítica'),(4,'Limpieza Facial'),(5,'Facial con Dermapen'),(6,'Curso de Capacitación');
/*!40000 ALTER TABLE `procedimientos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-20 22:26:56
