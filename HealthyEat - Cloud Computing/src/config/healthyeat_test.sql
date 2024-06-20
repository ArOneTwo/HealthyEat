-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2024 at 02:08 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `healthyeat_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id_classes` int(11) NOT NULL,
  `fruit_classes` varchar(255) NOT NULL,
  `id_fruit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fruit-tests`
--

CREATE TABLE `fruit-tests` (
  `fruit_Id` int(11) NOT NULL,
  `buah` varchar(255) NOT NULL,
  `tujuan` enum('Menurunkan Berat Badan','Menaikkan Berat Badan') NOT NULL,
  `urutan` enum('S','A','B','C','D') NOT NULL,
  `deskripsi` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fruit-tests`
--

INSERT INTO `fruit-tests` (`fruit_Id`, `buah`, `tujuan`, `urutan`, `deskripsi`) VALUES
(2, 'Pir', 'Menaikkan Berat Badan', 'A', 'Cuman Pir biasa ygy'),
(3, 'Nanas', 'Menaikkan Berat Badan', 'D', 'Cuman nanas biasa ygy'),
(4, 'Dragonfruit', 'Menaikkan Berat Badan', 'C', 'Cuman Dragonfruit biasa ygy'),
(5, 'Squash', 'Menurunkan Berat Badan', 'S', 'Cuman Squash biasa ygy'),
(6, 'Magma', 'Menurunkan Berat Badan', 'D', 'Cuman Magma biasa ygy'),
(7, 'Jambu', 'Menurunkan Berat Badan', 'A', 'Cuman Jambu biasa ygy'),
(8, 'Paprika', 'Menurunkan Berat Badan', 'C', 'Cuman Paprika biasa ygy'),
(9, 'Mangga', 'Menurunkan Berat Badan', 'B', 'Mangga mengandung vitamin A dan C, serta serat yang tinggi. Kandungan gulanya yang alami dapat memberikan energi tambahan, ideal untuk menambah berat badan dengan cara yang sehat.'),
(18, 'Apple Barnbaurn', 'Menurunkan Berat Badan', 'S', 'Cuman Apple biasa ygy'),
(19, 'Apple Granny Smith', 'Menurunkan Berat Badan', 'S', 'Cuman Apple biasa ygy'),
(20, 'Apple Golden 1', 'Menurunkan Berat Badan', 'S', 'Cuman Apple biasa ygy'),
(21, 'Mangga', 'Menurunkan Berat Badan', 'B', 'Jenis buah yang mempunyai sumber vitamin dan mineral yang banyak terdapat di indonesia');

-- --------------------------------------------------------

--
-- Table structure for table `fruitclasses`
--

CREATE TABLE `fruitclasses` (
  `id` int(11) NOT NULL,
  `id_fruit` int(11) NOT NULL,
  `id_classes` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `test-register2s`
--

CREATE TABLE `test-register2s` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id_classes`),
  ADD KEY `id_fruit` (`id_fruit`);

--
-- Indexes for table `fruit-tests`
--
ALTER TABLE `fruit-tests`
  ADD PRIMARY KEY (`fruit_Id`);

--
-- Indexes for table `fruitclasses`
--
ALTER TABLE `fruitclasses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `FruitClasses_id_classes_id_fruit_unique` (`id_fruit`,`id_classes`),
  ADD KEY `id_classes` (`id_classes`);

--
-- Indexes for table `test-register2s`
--
ALTER TABLE `test-register2s`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id_classes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `fruit-tests`
--
ALTER TABLE `fruit-tests`
  MODIFY `fruit_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `fruitclasses`
--
ALTER TABLE `fruitclasses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `test-register2s`
--
ALTER TABLE `test-register2s`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`id_fruit`) REFERENCES `fruit-tests` (`fruit_Id`);

--
-- Constraints for table `fruitclasses`
--
ALTER TABLE `fruitclasses`
  ADD CONSTRAINT `fruitclasses_ibfk_1` FOREIGN KEY (`id_fruit`) REFERENCES `fruit-tests` (`fruit_Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fruitclasses_ibfk_2` FOREIGN KEY (`id_classes`) REFERENCES `classes` (`id_classes`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
