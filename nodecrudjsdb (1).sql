-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 14, 2025 at 09:41 AM
-- Server version: 9.1.0
-- PHP Version: 8.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodecrudjsdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senderId` int NOT NULL,
  `receiverId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `seen` tinyint(1) NOT NULL DEFAULT '0',
  `seenAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Message_senderId_fkey` (`senderId`),
  KEY `Message_receiverId_fkey` (`receiverId`)
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `content`, `senderId`, `receiverId`, `createdAt`, `seen`, `seenAt`) VALUES
(1, 'test', 2, 1, '2025-08-11 12:16:55.504', 0, NULL),
(2, 'testtttt', 1, 2, '2025-08-11 12:17:03.684', 0, NULL),
(3, 'hello', 1, 2, '2025-08-11 12:25:20.708', 0, NULL),
(4, 'hellooo', 2, 1, '2025-08-11 12:25:35.031', 0, NULL),
(5, '', 2, 1, '2025-08-11 12:25:36.655', 0, NULL),
(6, 'hello', 1, 2, '2025-08-11 12:25:56.391', 0, NULL),
(7, 'helloddd', 2, 1, '2025-08-11 12:26:07.855', 0, NULL),
(8, 'dfdddf', 1, 2, '2025-08-11 12:26:14.839', 0, NULL),
(9, 'sadsadsdsasaddsa', 2, 1, '2025-08-11 12:26:26.598', 0, NULL),
(10, 'Hello USer 1', 1, 2, '2025-08-11 12:26:43.302', 0, NULL),
(11, 'Hello User 2', 1, 2, '2025-08-11 12:26:54.799', 0, NULL),
(12, 'Helllo User 1', 2, 1, '2025-08-11 12:27:07.286', 0, NULL),
(13, 'How are u User 1', 2, 1, '2025-08-11 12:27:23.654', 0, NULL),
(14, 'i am also fine User 2', 1, 2, '2025-08-11 12:27:39.294', 0, NULL),
(15, 'asdsdsd', 1, 2, '2025-08-11 12:39:52.655', 0, NULL),
(16, 'asdsd', 2, 1, '2025-08-11 12:39:55.109', 0, NULL),
(17, 'asdasd', 1, 2, '2025-08-11 12:50:30.621', 0, NULL),
(18, 'asdasd', 2, 1, '2025-08-11 12:50:36.433', 0, NULL),
(19, 'Hello', 1, 2, '2025-08-11 12:50:42.617', 0, NULL),
(20, 'hello', 2, 1, '2025-08-11 12:50:48.608', 0, NULL),
(21, 'hello', 2, 1, '2025-08-11 12:50:59.472', 0, NULL),
(22, 'heliiiiii', 1, 2, '2025-08-11 12:51:05.896', 0, NULL),
(23, 'hello', 2, 1, '2025-08-12 04:17:18.803', 0, NULL),
(24, 'how are u', 1, 2, '2025-08-12 04:17:26.295', 0, NULL),
(25, 'Helllo', 2, 1, '2025-08-12 04:36:29.819', 0, NULL),
(26, 'how are u', 1, 2, '2025-08-12 04:36:35.922', 0, NULL),
(27, 'helllo', 1, 2, '2025-08-12 04:54:55.792', 0, NULL),
(28, 'helllloooo', 2, 1, '2025-08-12 04:55:01.720', 0, NULL),
(29, 'hello', 1, 2, '2025-08-12 05:30:09.568', 0, NULL),
(30, 'hello', 1, 2, '2025-08-12 05:30:23.868', 0, NULL),
(31, 'sdaddsd', 1, 2, '2025-08-12 05:30:30.718', 0, NULL),
(32, 'asdsdsds', 2, 1, '2025-08-12 05:30:49.835', 0, NULL),
(33, 'asdsddadd', 2, 1, '2025-08-12 05:31:03.179', 0, NULL),
(34, 'asdasd', 2, 1, '2025-08-12 05:31:04.003', 0, NULL),
(35, 'adasd', 2, 1, '2025-08-12 05:31:04.827', 0, NULL),
(36, 'adasdd', 2, 1, '2025-08-12 05:31:05.667', 0, NULL),
(37, 'adsdas', 2, 1, '2025-08-12 05:31:06.572', 0, NULL),
(38, 'asdasd', 2, 1, '2025-08-12 05:31:07.459', 0, NULL),
(39, 'adsdsad', 2, 1, '2025-08-12 05:31:08.395', 0, NULL),
(40, 'asdasd', 2, 1, '2025-08-12 05:34:11.193', 0, NULL),
(41, 'helllo', 2, 1, '2025-08-12 07:10:38.147', 0, NULL),
(42, 'sdfsfs', 2, 1, '2025-08-12 09:19:59.960', 0, NULL),
(43, 'sfdf', 2, 1, '2025-08-12 09:20:00.800', 0, NULL),
(44, 'sdfsdf', 2, 1, '2025-08-12 09:20:01.584', 0, NULL),
(45, 'sfsfs', 2, 1, '2025-08-12 09:20:02.376', 0, NULL),
(46, 'sfdfs', 2, 1, '2025-08-12 09:20:03.504', 0, NULL),
(47, 'sdfsffs', 1, 2, '2025-08-12 09:21:28.929', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `passwordresettoken`
--

DROP TABLE IF EXISTS `passwordresettoken`;
CREATE TABLE IF NOT EXISTS `passwordresettoken` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `expiresAt` datetime(3) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `PasswordResetToken_token_key` (`token`),
  KEY `PasswordResetToken_userId_fkey` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

DROP TABLE IF EXISTS `token`;
CREATE TABLE IF NOT EXISTS `token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `expiresAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Token_token_key` (`token`),
  KEY `Token_userId_fkey` (`userId`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`id`, `token`, `userId`, `createdAt`, `expiresAt`) VALUES
(1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1NDY0NjI1NCwiZXhwIjoxNzU0NjQ5ODU0fQ.GJoEk9aZRKIz9FvWEH7QzegpJievp1h8byNkysJGPIs', 1, '2025-08-08 09:44:14.791', '2025-08-08 10:44:14.791'),
(2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1NDY1MzYzNywiZXhwIjoxNzU0NjU3MjM3fQ.5lF2mc3VyrGPAp2QkfVqxOUiv6FpP_ad0vM7-SAGnxo', 1, '2025-08-08 11:47:17.479', '2025-08-08 12:47:17.479'),
(3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1NDY1NTUzMSwiZXhwIjoxNzU0NjU5MTMxfQ.FYLpU_AwCPcXgYqpXzwUzn3WRRf7dazeeHtvs61KovU', 1, '2025-08-08 12:18:51.627', '2025-08-08 13:18:51.627'),
(4, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1NDg4NTg0NSwiZXhwIjoxNzU0ODg5NDQ1fQ.uWFfJzPbqsncOHlD6udxqxnlzT3f6TC6B2dCj6LmZxM', 1, '2025-08-11 04:17:25.635', '2025-08-11 05:17:25.635'),
(5, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1NDkxMDQwOSwiZXhwIjoxNzU0OTE0MDA5fQ.O40OGC4ejqRtu3fa2E474vDA-EMqzYmPnc5Nu0TxvX8', 1, '2025-08-11 11:06:49.005', '2025-08-11 12:06:49.004'),
(6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1NDkxMDg5MywiZXhwIjoxNzU0OTE0NDkzfQ.2en1694aXL0r5AuykqdZNTvHflBcIKGw7zYfmuZFZh8', 1, '2025-08-11 11:14:53.130', '2025-08-11 12:14:53.129'),
(7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1NDkxMTI3NSwiZXhwIjoxNzU0OTE0ODc1fQ.1mxRmzURCEpFwus8wl58kvtPEjspgozhzG3Ht1x4H5g', 1, '2025-08-11 11:21:15.575', '2025-08-11 12:21:15.575'),
(8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1NDkxMTI4MiwiZXhwIjoxNzU0OTE0ODgyfQ.HhEtt_FeuKG3p-FfNSW018S7iXXtyLN78E3U4rIMeI8', 1, '2025-08-11 11:21:22.869', '2025-08-11 12:21:22.869'),
(9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc1NDk3MjE3MCwiZXhwIjoxNzU0OTc1NzcwfQ.WMWKeKaAtXd4JxfSS-be0vz3KXEWugGo7NDe_kZ-k88', 1, '2025-08-12 04:16:10.794', '2025-08-12 05:16:10.794');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `profileImage` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `createdAt`, `profileImage`) VALUES
(1, 'nikhil', 'nikhilsss23@yopmail.com', '$2b$10$oqhLZ.w/4qJ/xgbuNeXr1.jL87Y3yqLuIHZ9ddS9WnR2dNdwma/AW', '2025-08-07 06:09:50.899', '/uploads/profiles/1754648147875-764401260.png'),
(2, 'brij', 'brij123@yopmail.com', '$2b$10$vQiO8bQ4Pymc5kspWZz0cugBMlNXOjlsYer9O5fdcGbSWFwpswp5W', '2025-08-07 06:20:40.620', '/uploads/profiles/1754649025614-523256263.png'),
(4, 'brij', 'brij1235@yopmail.com', '$2b$10$cMobaHAUEsjVaEkV3ocy7uRyPU9F5l3AhrHss02iLwBSeh2aE4CG6', '2025-08-08 09:30:59.441', '/uploads/profiles/1754649086002-2843055.jpg'),
(5, 'brij', 'brij12355@yopmail.com', '$2b$10$9Xv3QbuD6U6fOVMhLeS1meD1o1nDZS3.w7eGyFhlwwQWyuxPUiLUO', '2025-08-08 09:52:06.905', '/uploads/profiles/1754646726804-53427552.png'),
(6, 'bhavesh', 'bhavesh1212@yopmail.com', '$2b$10$HfGJTv.TWBNwS73fs93kK.dFXNj6lLJ4V/9x6SGgGUFkkkOWvIS.K', '2025-08-08 10:32:45.943', '/uploads/profiles/1754649165856-60525362.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('a030044c-baca-46f3-8004-c724f021ffaa', '283f518b58a696b65727998614be0c8cb7680c3405bd7446b52e962930a54f9e', '2025-08-06 12:28:13.604', '20250806122813_init', NULL, NULL, '2025-08-06 12:28:13.582', 1),
('3be50b09-268b-4416-9b8e-7c72ac14bb06', '37deb7c4788d698f27b0a4cfc4946ef9c523d69aec2db9c0ca8419d3330c8a8a', '2025-08-07 10:16:25.696', '20250807101625_add_token_model', NULL, NULL, '2025-08-07 10:16:25.594', 1),
('33f77867-ed33-4a19-ac63-20c827c986d3', '5596206dbe175d6f8472a32106bc61bf5ab85b6f7745b9025ca2399a59422b9a', '2025-08-07 11:42:05.110', '20250807114204_add_password_reset', NULL, NULL, '2025-08-07 11:42:04.898', 1),
('90f37ac9-04b3-4dd0-8e3b-cfb981481158', '996fdf3eccd47e3636914269bf9b864ce3e168e1e7e5e9ac6f3d31501c8dc05c', '2025-08-08 09:18:14.556', '20250808091814_add_profile_image', NULL, NULL, '2025-08-08 09:18:14.143', 1),
('464a7250-8235-4eed-b3f5-e623f30e1d6a', '9e45acb8b80c4cad44882ba4e9296c836ca2de14227a954495b9f11dd1e1325c', '2025-08-11 11:33:56.556', '20250811113356_create_chat_tables', NULL, NULL, '2025-08-11 11:33:56.028', 1),
('490914fe-f8ee-4148-9d33-57151077a633', '4f94af92a1d68e7a8c56e47d76a73975427e4e6982ce765fdcfb311cab72baf2', '2025-08-11 11:34:15.857', '20250811113415_create_chat_tables', NULL, NULL, '2025-08-11 11:34:15.344', 1),
('528267bc-e4a4-4342-8946-77352587ed9d', '228e2c1dfd805e09f8c512b90100ec4d0c803e7133626dd1ca0baa55bd0e8531', '2025-08-12 07:28:35.122', '20250812072834_add_seed_field', NULL, NULL, '2025-08-12 07:28:34.486', 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
