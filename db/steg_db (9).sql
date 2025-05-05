-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 01, 2025 at 05:04 PM
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
-- Database: `steg_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` bigint(20) NOT NULL,
  `centraluser_id` int(11) DEFAULT NULL,
  `groupementuser_id` int(11) DEFAULT NULL,
  `action` varchar(50) NOT NULL,
  `target_table` varchar(50) NOT NULL,
  `daily_report_id` int(11) DEFAULT NULL,
  `changes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`changes`)),
  `description` text DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `alarms`
--

CREATE TABLE `alarms` (
  `id` int(11) NOT NULL,
  `turbine_id` int(11) DEFAULT NULL,
  `reportid` int(11) DEFAULT NULL,
  `alarm_code` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Active','Resolved') DEFAULT 'Active',
  `happened_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `resolved_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `central`
--

CREATE TABLE `central` (
  `central_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `groupement_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `central`
--

INSERT INTO `central` (`central_id`, `name`, `groupement_id`) VALUES
(1, 'Goulette', 1),
(2, 'Bir M\'cherga', 1),
(3, 'Radès', 4),
(4, 'Sousse', 3),
(5, 'Korba', 1),
(6, 'Menzel Bourguiba', 1),
(7, 'Mornaguia', 1),
(8, 'Ghannouch', 2),
(9, 'Thyna', 2),
(10, 'Bouchemma', 2),
(11, 'Fériana', 2),
(12, 'Robbana', 2),
(13, 'Zarzis', 2),
(14, 'Kasserine', 2),
(15, 'Radès CC', 4),
(16, 'Radès D', 4);

-- --------------------------------------------------------

--
-- Table structure for table `central_accounts`
--

CREATE TABLE `central_accounts` (
  `id` int(11) NOT NULL,
  `fullname` varchar(20) NOT NULL,
  `steg_email` varchar(50) NOT NULL,
  `password` varchar(70) NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `central_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `central_accounts`
--

INSERT INTO `central_accounts` (`id`, `fullname`, `steg_email`, `password`, `is_verified`, `central_id`) VALUES
(1, 'mohamed chinne', 'ahmed.benali@steg.co', '$2b$10$KoRGGoBby/cen.KpJTYHnOU', 1, 1),
(6, 'mohamed chinne', 'karim.mahmoudi@steg.', '$2b$10$RGAtoVxnAgTLDftEhR8J2e1', 0, 2),
(7, 'mohamed chine', 'raouf.benammar@steg.com.tn', '$2b$10$OO0aFKIU9lSM1cjZRNCAbO5VybxbeQ9hg6yk2pu0S8CrFiNprpnQG', 0, 1),
(13, 'iheb  lahmer', 'ilahmar@steg.com.tn', '$2b$10$b9xuWKChqZifAb40gxlbI.SZN140Dh3TamYWjjAvjQbLiuJZi63r2', 0, 5),
(22, 'mohamed chinne', 'nizar.chaabane@steg.com.tn', '$2b$10$7zj8U6nv2jnbapNglTbaCe3OHGS8WTK7QAqG//kxmGAK/AlE69TM.', 0, 4),
(25, 'mouhamed chinne', 'mouhamedchinne@gmail.com', '$2b$10$AAPL9MV/xCKAay20JBrL0OtQpe/QCqe3wKzQO2aOp28O2ZZFlBeKi', 1, 2),
(26, 'iheb  lahmer', 'arkanmsss80@gmail.com', '$2b$10$ShItMZM/vN1QMMtFYvkeZedO0BUudd9dmSWwX7J2mYf3MaYr02pHC', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `central_employee_emails`
--

CREATE TABLE `central_employee_emails` (
  `employee_email` varchar(50) NOT NULL,
  `central_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `central_employee_emails`
--

INSERT INTO `central_employee_emails` (`employee_email`, `central_id`) VALUES
('ahmed.benali@steg.com.tn', 1),
('raouf.benammar@steg.com.tn', 1),
('karim.mahmoudi@steg.com.tn', 2),
('mohamed.trabelsi@steg.com.tn', 2),
('mouhamedchinne@gmail.com', 2),
('fethi.jlassi@steg.com.tn', 3),
('lotfi.benromdhane@steg.com.tn', 3),
('nizar.chaabane@steg.com.tn', 4),
('arkanmsss80@gmail.com', 5),
('hassen.belhaj@steg.com.tn', 5),
('ilahmar@steg.com.tn', 5),
('omar.khalifa@steg.com.tn', 6),
('slim.hajji@steg.com.tn', 7);

-- --------------------------------------------------------

--
-- Table structure for table `defective_equipment`
--

CREATE TABLE `defective_equipment` (
  `id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL,
  `turbine_id` int(11) NOT NULL,
  `kks` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `reported_at` date DEFAULT NULL,
  `fixed_at` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `direction`
--

CREATE TABLE `direction` (
  `direction_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT 'Direction Générale de la Maîtrise du Patrimoine Électrique (DGMPE)',
  `abbreviation` varchar(10) DEFAULT 'DGMPE',
  `headquarters_address` varchar(255) DEFAULT NULL,
  `contact_phone` varchar(20) DEFAULT NULL,
  `contact_email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `direction`
--

INSERT INTO `direction` (`direction_id`, `name`, `abbreviation`, `headquarters_address`, `contact_phone`, `contact_email`) VALUES
(1, 'Direction de gestion des moyens de production', 'DGMPE', 'Siège Social, Tunis', '+216 71 000 000', 'dgmpe@steg.com.tn');

-- --------------------------------------------------------

--
-- Table structure for table `direction_accounts`
--

CREATE TABLE `direction_accounts` (
  `id` int(11) NOT NULL,
  `fullname` varchar(20) DEFAULT NULL,
  `steg_email` varchar(50) NOT NULL,
  `password` varchar(70) NOT NULL,
  `direction_id` int(11) NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `direction_accounts`
--

INSERT INTO `direction_accounts` (`id`, `fullname`, `steg_email`, `password`, `direction_id`, `is_verified`) VALUES
(4, 'mohamed chinne', 'adel.bahri@steg.com.tn', '$2b$10$sEg2OakILK4n0eOuisdP4u5', 1, 1),
(7, 'mohamed chinne', 'foued.trabelsi@steg.com.tn', '$2b$10$BF9r0XAbn4bKs7uhN2PLr.ZodyZSazoHoJmYic6fnjoUGrMZtmxXi', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `direction_employee_emails`
--

CREATE TABLE `direction_employee_emails` (
  `employee_email` varchar(50) NOT NULL,
  `direction_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `direction_employee_emails`
--

INSERT INTO `direction_employee_emails` (`employee_email`, `direction_id`) VALUES
('adel.bahri@steg.com.tn', 1),
('chokri.bensalah@steg.com.tn', 1),
('foued.trabelsi@steg.com.tn', 1),
('houssem.abid@steg.com.tn', 1),
('imed.bedoui@steg.com.tn', 1),
('lassaad.mezghani@steg.com.tn', 1),
('naceur.jabri@steg.com.tn', 1),
('ridha.kharrat@steg.com.tn', 1),
('salem.majri@steg.com.tn', 1),
('zied.chebbi@steg.com.tn', 1);

-- --------------------------------------------------------

--
-- Table structure for table `environmental`
--

CREATE TABLE `environmental` (
  `id` int(11) NOT NULL,
  `turbine_id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL,
  `temp_min` decimal(5,2) DEFAULT NULL,
  `temp_max` decimal(5,2) DEFAULT NULL,
  `humidity_min` decimal(5,2) DEFAULT NULL,
  `humidity_max` decimal(5,2) DEFAULT NULL,
  `pressure_min` decimal(7,2) DEFAULT NULL,
  `pressure_max` decimal(7,2) DEFAULT NULL,
  `co_ppm` decimal(6,2) DEFAULT NULL,
  `no_ppm` decimal(6,2) DEFAULT NULL,
  `so2_ppm` decimal(6,2) DEFAULT NULL,
  `co2_percent` decimal(5,3) DEFAULT NULL,
  `o2_percent` decimal(5,2) DEFAULT NULL,
  `chlore_ppm` decimal(6,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exploitationmaneuvers`
--

CREATE TABLE `exploitationmaneuvers` (
  `ManeuverID` int(11) NOT NULL,
  `Reportid` int(11) NOT NULL,
  `Turbine` varchar(10) NOT NULL,
  `Time` time NOT NULL,
  `Description` text NOT NULL,
  `Operator` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groupement`
--

CREATE TABLE `groupement` (
  `groupement_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `id_direction` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groupement`
--

INSERT INTO `groupement` (`groupement_id`, `name`, `id_direction`) VALUES
(1, 'Groupement Nord', 1),
(2, 'Groupement Sud', 1),
(3, 'Groupement Sousse', 1),
(4, 'Groupement Rades', 1);

-- --------------------------------------------------------

--
-- Table structure for table `groupement_accounts`
--

CREATE TABLE `groupement_accounts` (
  `id` int(11) NOT NULL,
  `fullname` varchar(20) NOT NULL,
  `steg_email` varchar(50) NOT NULL,
  `password` varchar(70) NOT NULL,
  `is_verified` tinyint(1) DEFAULT 0,
  `groupement_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groupement_accounts`
--

INSERT INTO `groupement_accounts` (`id`, `fullname`, `steg_email`, `password`, `is_verified`, `groupement_id`) VALUES
(5, 'mohamed chinne', 'xy@steg.com.tn', '$2b$10$qGXlyoUABCXJD', 0, 1),
(6, 'mohamed chinne', 'xys@steg.com.tn', '$2b$10$G678X.pjV1kBA', 0, 1),
(7, 'mohamed chinne', 'xysaa@steg.com.tn', '$2b$10$IavOmijzXqBX4', 0, 1),
(8, 'mohamed chinne', 'xsaa@steg.com.tn', '$2b$10$40UbYN7dHp9IC', 0, 1),
(21, 'mohamed chinne', 'trettr973@gmail.com', '$2b$10$1wFms70qwSd6Z', 1, 1),
(22, 'mohamed chinne', 'trett73@gmail.com', '$2b$10$4oEZft/vpGU8j', 1, 1),
(23, 'mohamed chinne', 'tret7873@gmail.com', '$2b$10$gzvdEIAM8xTB1', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `groupement_employee_emails`
--

CREATE TABLE `groupement_employee_emails` (
  `employee_email` varchar(50) NOT NULL,
  `groupement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groupement_employee_emails`
--

INSERT INTO `groupement_employee_emails` (`employee_email`, `groupement_id`) VALUES
('mehdi.kacem@steg.com.tn', 1),
('mourad.gharsalli@steg.com.tn', 1),
('riad.benothman@steg.com.tn', 1),
('faouzi.bouzid@steg.com.tn', 2),
('hatem.belhassen@steg.com.tn', 2),
('walid.ghodbane@steg.com.tn', 2),
('atef.zouari@steg.com.tn', 3),
('sami.jebali@steg.com.tn', 3),
('anis.chakroun@steg.com.tn', 4),
('salah.mezri@steg.com.tn', 4);

-- --------------------------------------------------------

--
-- Table structure for table `json_test`
--

CREATE TABLE `json_test` (
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `json_test`
--

INSERT INTO `json_test` (`data`) VALUES
('{\"name\": \"Alice\", \"age\": 30, \"location\": {\"city\": \"Paris\", \"country\": \"France\"}}');

-- --------------------------------------------------------

--
-- Table structure for table `maintenance`
--

CREATE TABLE `maintenance` (
  `id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL,
  `turbine_id` int(11) NOT NULL,
  `kks` varchar(255) DEFAULT NULL,
  `ot_number` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `type` enum('Curative','Systematic') NOT NULL,
  `related_item_type` enum('Alarm','Defective Equipment') NOT NULL,
  `related_item_id` int(11) DEFAULT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `performance`
--

CREATE TABLE `performance` (
  `id` int(11) NOT NULL,
  `central_id` int(11) NOT NULL,
  `turbine_id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL,
  `performance_date` date NOT NULL,
  `fuel_type` enum('Gas','Gas-oil') NOT NULL,
  `load_status` enum('No Load','Loaded') NOT NULL,
  `period` enum('Day','Peak','Night') NOT NULL,
  `fuel_consumption` decimal(12,2) DEFAULT NULL,
  `gross_energy_production` decimal(12,2) DEFAULT NULL,
  `auxiliaries_consumption` decimal(12,2) DEFAULT NULL,
  `net_active_energy_production` decimal(12,2) DEFAULT NULL,
  `reactive_energy_production` decimal(12,2) DEFAULT NULL,
  `startups` int(11) DEFAULT 0,
  `ignitions` int(11) DEFAULT 0,
  `couplings` int(11) DEFAULT 0,
  `load_trips` int(11) DEFAULT 0,
  `net_energy_distribution` decimal(12,2) DEFAULT NULL,
  `starts_since_last_inspection` int(11) DEFAULT NULL,
  `max_power_peak` decimal(10,2) DEFAULT NULL,
  `flame_hours` decimal(10,2) DEFAULT NULL,
  `production_hours` decimal(10,2) DEFAULT NULL,
  `daily_availability` decimal(6,2) DEFAULT NULL,
  `average_hourly_power` decimal(8,2) DEFAULT NULL,
  `gas_calorific_value` decimal(10,2) DEFAULT NULL,
  `gasoil_calorific_value` decimal(10,2) DEFAULT NULL,
  `specific_consumption` decimal(10,2) DEFAULT NULL,
  `daily_availability_rate` decimal(5,2) DEFAULT NULL,
  `cumulative_availability_rate` decimal(5,2) DEFAULT NULL,
  `operating_hours_last_inspection` int(11) DEFAULT NULL,
  `starts_since_first_coupling` int(11) DEFAULT NULL,
  `operating_hours_since_first_coupling` int(11) DEFAULT NULL,
  `pumpable_gasoil_stock` decimal(12,2) DEFAULT NULL,
  `autonomy_at_pmc` decimal(10,2) DEFAULT NULL,
  `mwh_peak` decimal(12,2) DEFAULT NULL,
  `mwh_tlr` decimal(12,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `central_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report`
--

INSERT INTO `report` (`id`, `central_id`, `created_at`) VALUES
(2, 1, '2025-05-01 09:20:00'),
(3, 2, '2025-05-01 09:20:00'),
(4, 5, '2025-05-01 09:20:00'),
(5, 6, '2025-05-01 09:20:00'),
(6, 7, '2025-05-01 09:20:00'),
(7, 8, '2025-05-01 09:20:00'),
(8, 9, '2025-05-01 09:20:00'),
(9, 10, '2025-05-01 09:20:00'),
(10, 11, '2025-05-01 09:20:00'),
(11, 12, '2025-05-01 09:20:00'),
(12, 13, '2025-05-01 09:20:00'),
(13, 14, '2025-05-01 09:20:00'),
(14, 4, '2025-05-01 09:20:00'),
(15, 3, '2025-05-01 09:20:00'),
(16, 15, '2025-05-01 09:20:00'),
(17, 16, '2025-05-01 09:20:00');

-- --------------------------------------------------------

--
-- Table structure for table `turbine`
--

CREATE TABLE `turbine` (
  `turbine_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `central_id` int(11) NOT NULL,
  `manufacturer` varchar(100) DEFAULT NULL,
  `fuel_type` varchar(100) DEFAULT NULL,
  `commissioning_year` year(4) DEFAULT NULL,
  `net_power_at_commissioning` decimal(6,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `turbine`
--

INSERT INTO `turbine` (`turbine_id`, `name`, `central_id`, `manufacturer`, `fuel_type`, `commissioning_year`, `net_power_at_commissioning`) VALUES
(1, 'TV1', 3, 'MITSUBISHI', 'Gaz - Fuel', '1985', 160.00),
(2, 'TV2', 3, 'MITSUBISHI', 'Gaz - Fuel', '1985', 160.00),
(3, 'TV3', 3, 'ANSALDO', 'Gaz - Fuel', '1997', 170.00),
(4, 'TV4', 3, 'ANSALDO', 'Gaz - Fuel', '1997', 170.00),
(5, 'CS', 15, 'MITSUBISHI', 'Gaz - Fuel', '2019', 296.10),
(7, 'CC', 16, 'GE - ALSTOM', 'Gaz - Gasoil', '2002', 471.00),
(8, 'Etape B', 4, 'GE - ALSTOM', 'Gaz - Gasoil', '1995', 354.20),
(9, 'Etape C', 4, 'ANSALDO', 'Gaz - Gasoil', '2015', 424.00),
(10, 'Etape D', 4, 'ANSALDO', 'Gaz - Gasoil', '2016', 424.00),
(11, 'TG1', 1, 'GE', 'Gaz - Gasoil', '2005', 121.20),
(12, 'TG11', 7, 'ANSALDO', 'Gaz - Gasoil', '2020', 312.10),
(13, 'TG12', 7, 'ANSALDO', 'Gaz - Gasoil', '2020', 311.40),
(14, 'TG1', 2, 'GE', 'Gaz - Gasoil', '1997', 119.40),
(15, 'TG2', 2, 'GE', 'Gaz - Gasoil', '1997', 120.40),
(16, 'TG3', 2, 'GE', 'GAZ', '2013', 125.00),
(17, 'TG4', 2, 'GE', 'GAZ', '2013', 126.20),
(18, 'TG1', 2, 'ALSTHOM - GE', 'Gaz', '1978', 21.50),
(19, 'TG2', 2, 'FIAT', 'Gaz', '1984', 34.50),
(20, 'TG1', 6, 'ALSTHOM - GE', 'Gasoil', '1978', 22.30),
(21, 'TG2', 6, 'ALSTHOM - GE', 'Gasoil', '1978', 22.30),
(22, 'CC', 8, 'ALSTOM', 'Gaz - Gasoil', '2011', 409.00),
(23, 'TG3', 10, 'GE', 'Gaz - Gasoil', '1999', 122.50),
(24, 'TG4', 10, 'GE', 'GAZ', '2016', 125.00),
(25, 'TG5', 10, 'GE', 'GAZ', '2016', 125.00),
(26, 'TG1', 9, 'GE', 'Gaz - Gasoil', '2004', 120.70),
(56, 'TG2', 9, 'GE', 'Gaz - Gasoil', '2007', 120.40),
(57, 'TG3', 9, 'GE', 'Gaz - Gasoil', '2010', 122.00),
(58, 'TG1', 11, 'GE', 'Gaz - Gasoil', '2005', 122.40),
(59, 'TG2', 11, 'GE', 'Gaz - Gasoil', '2009', 125.50),
(60, 'TG1', 14, 'FIAT', 'Gaz', '1984', 33.80),
(61, 'TG2', 14, 'FIAT', 'Gaz', '1984', 33.80),
(62, 'TG1', 12, 'FIAT', 'Gasoil', '1984', 34.50),
(63, 'TG1', 13, 'FIAT', 'Gasoil', '1984', 34.50);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_central_user` (`centraluser_id`),
  ADD KEY `fk_groupement_user` (`groupementuser_id`),
  ADD KEY `fk_daily_report` (`daily_report_id`);

--
-- Indexes for table `alarms`
--
ALTER TABLE `alarms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_turbine` (`turbine_id`),
  ADD KEY `fk_report` (`reportid`);

--
-- Indexes for table `central`
--
ALTER TABLE `central`
  ADD PRIMARY KEY (`central_id`),
  ADD KEY `central_ibfk_1` (`groupement_id`);

--
-- Indexes for table `central_accounts`
--
ALTER TABLE `central_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `central_id` (`central_id`);

--
-- Indexes for table `central_employee_emails`
--
ALTER TABLE `central_employee_emails`
  ADD UNIQUE KEY `employee_email` (`employee_email`),
  ADD KEY `central_id` (`central_id`);

--
-- Indexes for table `defective_equipment`
--
ALTER TABLE `defective_equipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_defective_equipment_report` (`report_id`),
  ADD KEY `fk_defective_equipment_turbine` (`turbine_id`);

--
-- Indexes for table `direction`
--
ALTER TABLE `direction`
  ADD PRIMARY KEY (`direction_id`);

--
-- Indexes for table `direction_accounts`
--
ALTER TABLE `direction_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `directionfk` (`direction_id`);

--
-- Indexes for table `direction_employee_emails`
--
ALTER TABLE `direction_employee_emails`
  ADD UNIQUE KEY `employee_email` (`employee_email`),
  ADD KEY `direction_id` (`direction_id`);

--
-- Indexes for table `environmental`
--
ALTER TABLE `environmental`
  ADD PRIMARY KEY (`id`),
  ADD KEY `turbine_id` (`turbine_id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `exploitationmaneuvers`
--
ALTER TABLE `exploitationmaneuvers`
  ADD PRIMARY KEY (`ManeuverID`),
  ADD KEY `Reportid` (`Reportid`);

--
-- Indexes for table `groupement`
--
ALTER TABLE `groupement`
  ADD PRIMARY KEY (`groupement_id`),
  ADD KEY `x` (`id_direction`);

--
-- Indexes for table `groupement_accounts`
--
ALTER TABLE `groupement_accounts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groupement_id` (`groupement_id`);

--
-- Indexes for table `groupement_employee_emails`
--
ALTER TABLE `groupement_employee_emails`
  ADD UNIQUE KEY `employee_email` (`employee_email`),
  ADD KEY `groupement_id` (`groupement_id`);

--
-- Indexes for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_maintenance_report` (`report_id`),
  ADD KEY `fk_maintenance_turbine` (`turbine_id`);

--
-- Indexes for table `performance`
--
ALTER TABLE `performance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_performance_central` (`central_id`),
  ADD KEY `fk_performance_turbine` (`turbine_id`),
  ADD KEY `fk_performance_report` (`report_id`);

--
-- Indexes for table `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `central_id` (`central_id`);

--
-- Indexes for table `turbine`
--
ALTER TABLE `turbine`
  ADD PRIMARY KEY (`turbine_id`),
  ADD KEY `central_id` (`central_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `alarms`
--
ALTER TABLE `alarms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `central`
--
ALTER TABLE `central`
  MODIFY `central_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `central_accounts`
--
ALTER TABLE `central_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `defective_equipment`
--
ALTER TABLE `defective_equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `direction`
--
ALTER TABLE `direction`
  MODIFY `direction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `direction_accounts`
--
ALTER TABLE `direction_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `environmental`
--
ALTER TABLE `environmental`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exploitationmaneuvers`
--
ALTER TABLE `exploitationmaneuvers`
  MODIFY `ManeuverID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groupement`
--
ALTER TABLE `groupement`
  MODIFY `groupement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `groupement_accounts`
--
ALTER TABLE `groupement_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `maintenance`
--
ALTER TABLE `maintenance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `performance`
--
ALTER TABLE `performance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `turbine`
--
ALTER TABLE `turbine`
  MODIFY `turbine_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD CONSTRAINT `fk_central_user` FOREIGN KEY (`centraluser_id`) REFERENCES `central_accounts` (`id`),
  ADD CONSTRAINT `fk_daily_report` FOREIGN KEY (`daily_report_id`) REFERENCES `report` (`id`),
  ADD CONSTRAINT `fk_groupement_user` FOREIGN KEY (`groupementuser_id`) REFERENCES `groupement_accounts` (`id`);

--
-- Constraints for table `alarms`
--
ALTER TABLE `alarms`
  ADD CONSTRAINT `fk_report` FOREIGN KEY (`reportid`) REFERENCES `report` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_turbine` FOREIGN KEY (`turbine_id`) REFERENCES `turbine` (`turbine_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `central`
--
ALTER TABLE `central`
  ADD CONSTRAINT `central_ibfk_1` FOREIGN KEY (`groupement_id`) REFERENCES `groupement` (`groupement_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `central_accounts`
--
ALTER TABLE `central_accounts`
  ADD CONSTRAINT `central_accounts_ibfk_1` FOREIGN KEY (`central_id`) REFERENCES `central` (`central_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `central_employee_emails`
--
ALTER TABLE `central_employee_emails`
  ADD CONSTRAINT `central_employee_emails_ibfk_1` FOREIGN KEY (`central_id`) REFERENCES `central` (`central_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `defective_equipment`
--
ALTER TABLE `defective_equipment`
  ADD CONSTRAINT `fk_defective_equipment_report` FOREIGN KEY (`report_id`) REFERENCES `report` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_defective_equipment_turbine` FOREIGN KEY (`turbine_id`) REFERENCES `turbine` (`turbine_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `direction_accounts`
--
ALTER TABLE `direction_accounts`
  ADD CONSTRAINT `directionfk` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `direction_employee_emails`
--
ALTER TABLE `direction_employee_emails`
  ADD CONSTRAINT `direction_employee_emails_ibfk_1` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `environmental`
--
ALTER TABLE `environmental`
  ADD CONSTRAINT `environmental_ibfk_1` FOREIGN KEY (`turbine_id`) REFERENCES `turbine` (`turbine_id`),
  ADD CONSTRAINT `environmental_ibfk_2` FOREIGN KEY (`report_id`) REFERENCES `report` (`id`);

--
-- Constraints for table `exploitationmaneuvers`
--
ALTER TABLE `exploitationmaneuvers`
  ADD CONSTRAINT `exploitationmaneuvers_ibfk_1` FOREIGN KEY (`Reportid`) REFERENCES `report` (`id`);

--
-- Constraints for table `groupement`
--
ALTER TABLE `groupement`
  ADD CONSTRAINT `x` FOREIGN KEY (`id_direction`) REFERENCES `direction` (`direction_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `groupement_accounts`
--
ALTER TABLE `groupement_accounts`
  ADD CONSTRAINT `groupement_accounts_ibfk_1` FOREIGN KEY (`groupement_id`) REFERENCES `groupement` (`groupement_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `groupement_employee_emails`
--
ALTER TABLE `groupement_employee_emails`
  ADD CONSTRAINT `groupement_employee_emails_ibfk_1` FOREIGN KEY (`groupement_id`) REFERENCES `groupement` (`groupement_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD CONSTRAINT `fk_maintenance_report` FOREIGN KEY (`report_id`) REFERENCES `report` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_maintenance_turbine` FOREIGN KEY (`turbine_id`) REFERENCES `turbine` (`turbine_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `performance`
--
ALTER TABLE `performance`
  ADD CONSTRAINT `fk_performance_central` FOREIGN KEY (`central_id`) REFERENCES `central` (`central_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_performance_report` FOREIGN KEY (`report_id`) REFERENCES `report` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_performance_turbine` FOREIGN KEY (`turbine_id`) REFERENCES `turbine` (`turbine_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `report_ibfk_1` FOREIGN KEY (`central_id`) REFERENCES `central` (`central_id`);

--
-- Constraints for table `turbine`
--
ALTER TABLE `turbine`
  ADD CONSTRAINT `turbine_ibfk_1` FOREIGN KEY (`central_id`) REFERENCES `central` (`central_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
