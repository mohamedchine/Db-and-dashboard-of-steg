-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2025 at 01:45 AM
-- Server version: Standard SQL Compatible
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



--
-- Database: `steg_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `id` bigint(20) NOT NULL,
  `central_user_email` varchar(255) DEFAULT NULL,
  `action` varchar(50) NOT NULL,
  `target_table` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `target_table_old_value` longtext  DEFAULT NULL,
  `target_table_new_value` longtext  DEFAULT NULL,
  `consequence_table` varchar(50) DEFAULT NULL,
  `consequence_table_old_value` longtext  DEFAULT NULL,
  `consequence_table_new_value` longtext  DEFAULT NULL);

--
-- Dumping data for table `activity_logs`
--

INSERT INTO `activity_logs` (`id`, `central_user_email`, `action`, `target_table`, `description`, `created_at`, `target_table_old_value`, `target_table_new_value`, `consequence_table`, `consequence_table_old_value`, `consequence_table_new_value`) VALUES
(24, 'arkanmsss80@gmail.com', 'add', 'alarms', 'added an alarm', '2025-05-21 00:16:44', NULL, '{\"id\":53,\"turbine_id\":2,\"central_id\":5,\"alarm_code\":\"B2\",\"description\":\"Low oil pressure\",\"status\":\"Active\",\"happened_at\":\"2023-05-15T07:00:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-05-20T23:16:44.000Z\"}', NULL, NULL, NULL),
(25, 'arkanmsss80@gmail.com', 'delete', 'alarms', 'deleted an alarm', '2025-05-21 00:20:34', '{\"id\":40,\"turbine_id\":2,\"central_id\":5,\"alarm_code\":\"B2\",\"description\":\"Low oil pressure\",\"status\":\"Active\",\"happened_at\":\"2023-05-15T07:00:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-05-13T17:04:45.000Z\"}', NULL, NULL, NULL, NULL),
(26, 'arkanmsss80@gmail.com', 'delete', 'alarms', 'deleted an alarm', '2025-05-21 00:23:39', '{\"id\":49,\"turbine_id\":1,\"central_id\":5,\"alarm_code\":\"ALM-0425\",\"description\":\"Coolant leak detected\",\"status\":\"Resolved\",\"happened_at\":\"2025-04-01T13:00:00.000Z\",\"resolved_at\":\"2025-05-17T15:00:00.000Z\",\"created_at\":\"2025-05-17T15:28:23.000Z\"}', NULL, 'maintenance', '{\"id\":31,\"central_id\":5,\"kks\":\"KKS-ALM0425\",\"ot_number\":\"OT-ALM0425\",\"description\":\"Fixed coolant leak in turbine #1\",\"type\":\"Curative\",\"related_item_type\":\"Alarm\",\"related_item_id\":49,\"start\":\"2025-05-02T08:00:00.000Z\",\"end\":\"2025-05-17T15:00:00.000Z\",\"created_at\":\"2025-05-17T15:28:23.000Z\",\"updated_at\":null}', NULL),
(27, 'arkanmsss80@gmail.com', 'add', 'defectivee_equipements', 'added a defecitve_equipement', '2025-05-21 00:40:22', NULL, '{\"id\":32,\"central_id\":5,\"turbine_id\":1,\"kks\":\"KKS12345\",\"description\":\"Broken rotor blade\",\"comments\":\"Needs immediate replacement\",\"reported_at\":\"2023-05-15T07:00:00.000Z\",\"fixed_at\":null,\"created_at\":\"2025-05-20T23:40:22.000Z\",\"status\":\"\"}', NULL, NULL, NULL),
(28, 'arkanmsss80@gmail.com', 'add', 'defective_equipement', 'added a defecitve_equipement', '2025-05-21 00:41:29', NULL, '{\"id\":33,\"central_id\":5,\"turbine_id\":1,\"kks\":\"KKS12345\",\"description\":\"Broken rotor blade\",\"comments\":\"Needs immediate replacement\",\"reported_at\":\"2023-05-15T07:00:00.000Z\",\"fixed_at\":null,\"created_at\":\"2025-05-20T23:41:29.000Z\",\"status\":\"\"}', NULL, NULL, NULL),
(29, 'arkanmsss80@gmail.com', 'add', 'maintenances', 'added a maintenance', '2025-05-21 01:11:43', NULL, '{\"id\":33,\"central_id\":5,\"kks\":\"KKS123\",\"ot_number\":\"OT-001\",\"description\":\"Repair done\",\"type\":\"Systematic\",\"related_item_type\":\"Alarm\",\"related_item_id\":45,\"start\":\"2025-05-10T07:00:00.000Z\",\"end\":null,\"created_at\":\"2025-05-21T00:11:43.000Z\",\"updated_at\":null}', 'alarms', '{\"id\":45,\"turbine_id\":64,\"central_id\":5,\"alarm_code\":\"ALM-K003\",\"description\":\"Vibration threshold exceeded\",\"status\":\"Active\",\"happened_at\":\"2025-05-03T08:45:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-05-15T21:53:05.000Z\"}', '{\"id\":45,\"turbine_id\":64,\"central_id\":5,\"alarm_code\":\"ALM-K003\",\"description\":\"Vibration threshold exceeded\",\"status\":\"Pending\",\"happened_at\":\"2025-05-03T08:45:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-05-15T21:53:05.000Z\"}'),
(30, 'arkanmsss80@gmail.com', 'add', 'alarms', 'added an alarm', '2025-05-22 23:12:00', NULL, '{\"id\":54,\"turbine_id\":2,\"central_id\":5,\"alarm_code\":\"B2\",\"description\":\"Low oil pressure\",\"status\":\"Active\",\"happened_at\":\"2023-05-15T07:00:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-05-22T22:12:00.000Z\"}', NULL, NULL, NULL),
(31, 'arkanmsss80@gmail.com', 'update', 'performances', 'updated a performance record', '2025-05-22 23:27:55', '{\"id\":2,\"central_id\":5,\"turbine_id\":64,\"performance_date\":\"2025-04-30T23:00:00.000Z\",\"fuel_type\":\"Gas\",\"load_status\":\"Loaded\",\"period\":\"Day\",\"fuel_consumption\":\"125.50\",\"gross_energy_production\":\"3100.00\",\"auxiliaries_consumption\":\"155.00\",\"net_active_energy_production\":\"2945.00\",\"reactive_energy_production\":\"210.00\",\"startups\":0,\"ignitions\":0,\"couplings\":0,\"load_trips\":0,\"net_energy_distribution\":null,\"starts_since_last_inspection\":null,\"max_power_peak\":null,\"flame_hours\":null,\"production_hours\":\"20.50\",\"daily_availability\":\"23.00\",\"average_hourly_power\":null,\"gas_calorific_value\":null,\"gasoil_calorific_value\":null,\"specific_consumption\":\"0.43\",\"daily_availability_rate\":\"95.83\",\"cumulative_availability_rate\":null,\"operating_hours_last_inspection\":null,\"starts_since_first_coupling\":null,\"operating_hours_since_first_coupling\":null,\"pumpable_gasoil_stock\":null,\"autonomy_at_pmc\":null,\"mwh_peak\":null,\"mwh_tlr\":null,\"created_at\":\"2025-05-14T21:36:50.000Z\",\"updated_at\":\"2025-05-14T21:36:50.000Z\"}', '{\"id\":2,\"central_id\":\"5\",\"turbine_id\":\"64\",\"performance_date\":\"2025-05-01\",\"fuel_type\":\"Gas\",\"load_status\":\"Loaded\",\"period\":\"Day\",\"fuel_consumption\":120.55,\"gross_energy_production\":3000.75,\"auxiliaries_consumption\":150.25,\"net_active_energy_production\":2850.5,\"reactive_energy_production\":200,\"startups\":4,\"ignitions\":3,\"couplings\":1,\"load_trips\":0,\"net_energy_distribution\":2750.45,\"starts_since_last_inspection\":10,\"max_power_peak\":450.75,\"flame_hours\":18.25,\"production_hours\":20,\"daily_availability\":98.5,\"average_hourly_power\":142.53,\"gas_calorific_value\":45.78,\"gasoil_calorific_value\":42.3,\"specific_consumption\":0.43,\"daily_availability_rate\":97.25,\"cumulative_availability_rate\":96,\"operating_hours_last_inspection\":2500,\"starts_since_first_coupling\":80,\"operating_hours_since_first_coupling\":10500,\"pumpable_gasoil_stock\":1200.6,\"autonomy_at_pmc\":15.75,\"mwh_peak\":120.5,\"mwh_tlr\":85.25}', NULL, NULL, NULL),
(32, 'arkanmsss80@gmail.com', 'add', 'alarms', 'added an alarm', '2025-07-25 18:37:55', NULL, '{\"id\":55,\"turbine_id\":64,\"central_id\":5,\"alarm_code\":\"LV30S\",\"description\":\"an alarm keep blinking in  turbine 1 \",\"status\":\"Active\",\"happened_at\":\"2025-07-25T16:37:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-07-25T17:37:55.000Z\"}', NULL, NULL, NULL),
(33, 'arkanmsss80@gmail.com', 'delete', 'alarms', 'deleted an alarm', '2025-07-25 18:46:36', '{\"id\":45,\"turbine_id\":64,\"central_id\":5,\"alarm_code\":\"ALM-K003\",\"description\":\"Vibration threshold exceeded\",\"status\":\"Pending\",\"happened_at\":\"2025-05-03T08:45:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-05-15T21:53:05.000Z\"}', NULL, 'maintenance', '{\"id\":33,\"central_id\":5,\"kks\":\"KKS123\",\"ot_number\":\"OT-001\",\"description\":\"Repair done\",\"type\":\"Systematic\",\"related_item_type\":\"Alarm\",\"related_item_id\":45,\"start\":\"2025-05-10T07:00:00.000Z\",\"end\":null,\"created_at\":\"2025-05-21T00:11:43.000Z\",\"updated_at\":null}', NULL),
(34, 'arkanmsss80@gmail.com', 'delete', 'alarms', 'deleted an alarm', '2025-07-25 18:46:37', '{\"id\":37,\"turbine_id\":65,\"central_id\":5,\"alarm_code\":\"B2\",\"description\":\"Low oil pressure\",\"status\":\"Pending\",\"happened_at\":\"2023-05-15T07:00:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-05-12T21:59:10.000Z\"}', NULL, 'maintenance', '{\"id\":18,\"central_id\":5,\"kks\":\"KKS123\",\"ot_number\":\"OT-001\",\"description\":\"Repair done\",\"type\":\"Systematic\",\"related_item_type\":\"Alarm\",\"related_item_id\":37,\"start\":\"2025-05-10T07:00:00.000Z\",\"end\":null,\"created_at\":\"2025-05-13T16:24:33.000Z\",\"updated_at\":null}', NULL),
(35, 'arkanmsss80@gmail.com', 'delete', 'defective_equipement', 'deleted a defective_equipement', '2025-07-25 18:46:41', '{\"id\":23,\"central_id\":5,\"turbine_id\":65,\"kks\":\"KKS-K003\",\"description\":\"Leaking oil seal\",\"comments\":null,\"reported_at\":\"2025-05-03T09:30:00.000Z\",\"fixed_at\":null,\"created_at\":\"2025-05-15T21:53:05.000Z\",\"status\":\"Pending\"}', NULL, 'maintenance', '{\"id\":32,\"central_id\":5,\"kks\":\"KKS-DEF023\",\"ot_number\":\"OT-DEF023\",\"description\":\"Repair for defective equipment #23\",\"type\":\"Curative\",\"related_item_type\":\"Defective Equipment\",\"related_item_id\":23,\"start\":\"2025-05-18T08:00:00.000Z\",\"end\":\"2025-05-18T13:30:00.000Z\",\"created_at\":\"2025-05-17T18:43:31.000Z\",\"updated_at\":null}', NULL),
(36, 'arkanmsss80@gmail.com', 'delete', 'defective_equipement', 'deleted a defective_equipement', '2025-07-25 18:46:41', '{\"id\":24,\"central_id\":5,\"turbine_id\":64,\"kks\":\"KKS-K004\",\"description\":\"Cracked valve housing\",\"comments\":null,\"reported_at\":\"2025-05-04T08:15:00.000Z\",\"fixed_at\":null,\"created_at\":\"2025-05-15T21:53:05.000Z\",\"status\":\"Pending\"}', NULL, NULL, NULL, NULL),
(37, 'arkanmsss80@gmail.com', 'add', 'defective_equipement', 'added a defecitve_equipement', '2025-07-25 18:47:09', NULL, '{\"id\":34,\"central_id\":5,\"turbine_id\":64,\"kks\":\"As8082\",\"description\":\"abcd1234\",\"comments\":null,\"reported_at\":\"2025-07-25T17:47:09.000Z\",\"fixed_at\":null,\"created_at\":\"2025-07-25T17:47:09.000Z\",\"status\":\"Not Fixed\"}', NULL, NULL, NULL),
(38, 'arkanmsss80@gmail.com', 'add', 'maintenances', 'added a maintenance', '2025-07-25 23:46:29', NULL, '{\"id\":34,\"central_id\":5,\"kks\":\"kks846\",\"ot_number\":\"ot8000\",\"description\":\"abcd hi\",\"type\":\"Systematic\",\"related_item_type\":\"Alarm\",\"related_item_id\":55,\"start\":\"2025-07-25T21:46:00.000Z\",\"end\":null,\"created_at\":\"2025-07-25T22:46:29.000Z\",\"updated_at\":null}', 'alarms', '{\"id\":55,\"turbine_id\":64,\"central_id\":5,\"alarm_code\":\"LV30S\",\"description\":\"an alarm keep blinking in  turbine 1 \",\"status\":\"Active\",\"happened_at\":\"2025-07-25T16:37:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-07-25T17:37:55.000Z\"}', '{\"id\":55,\"turbine_id\":64,\"central_id\":5,\"alarm_code\":\"LV30S\",\"description\":\"an alarm keep blinking in  turbine 1 \",\"status\":\"Pending\",\"happened_at\":\"2025-07-25T16:37:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-07-25T17:37:55.000Z\"}'),
(39, 'arkanmsss80@gmail.com', 'delete', 'maintenances', 'deleted a maintenance', '2025-07-25 23:46:45', '{\"id\":34,\"central_id\":5,\"kks\":\"kks846\",\"ot_number\":\"ot8000\",\"description\":\"abcd hi\",\"type\":\"Systematic\",\"related_item_type\":\"Alarm\",\"related_item_id\":55,\"start\":\"2025-07-25T21:46:00.000Z\",\"end\":null,\"created_at\":\"2025-07-25T22:46:29.000Z\",\"updated_at\":null}', NULL, 'alarms', '{\"id\":55,\"turbine_id\":64,\"central_id\":5,\"alarm_code\":\"LV30S\",\"description\":\"an alarm keep blinking in  turbine 1 \",\"status\":\"Pending\",\"happened_at\":\"2025-07-25T16:37:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-07-25T17:37:55.000Z\"}', '{\"id\":55,\"turbine_id\":64,\"central_id\":5,\"alarm_code\":\"LV30S\",\"description\":\"an alarm keep blinking in  turbine 1 \",\"status\":\"Active\",\"happened_at\":\"2025-07-25T16:37:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-07-25T17:37:55.000Z\"}'),
(40, 'zus32192@gmail.com', 'add', 'alarms', 'added an alarm', '2025-07-26 00:06:20', NULL, '{\"id\":56,\"turbine_id\":65,\"central_id\":5,\"alarm_code\":\"Lvv879s\",\"description\":\"alarm keep doing voices in this turbine\",\"status\":\"Active\",\"happened_at\":\"2025-07-25T22:05:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-07-25T23:06:20.000Z\"}', NULL, NULL, NULL),
(41, 'zus32192@gmail.com', 'add', 'maintenances', 'added a maintenance', '2025-07-26 00:07:29', NULL, '{\"id\":35,\"central_id\":5,\"kks\":\"84KTBx\",\"ot_number\":\"Ot800\",\"description\":\"maintenance on this alarm \",\"type\":\"Systematic\",\"related_item_type\":\"Alarm\",\"related_item_id\":56,\"start\":\"2025-07-25T22:07:00.000Z\",\"end\":null,\"created_at\":\"2025-07-25T23:07:29.000Z\",\"updated_at\":null}', 'alarms', '{\"id\":56,\"turbine_id\":65,\"central_id\":5,\"alarm_code\":\"Lvv879s\",\"description\":\"alarm keep doing voices in this turbine\",\"status\":\"Active\",\"happened_at\":\"2025-07-25T22:05:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-07-25T23:06:20.000Z\"}', '{\"id\":56,\"turbine_id\":65,\"central_id\":5,\"alarm_code\":\"Lvv879s\",\"description\":\"alarm keep doing voices in this turbine\",\"status\":\"Pending\",\"happened_at\":\"2025-07-25T22:05:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-07-25T23:06:20.000Z\"}'),
(42, 'zus32192@gmail.com', 'delete', 'maintenances', 'deleted a maintenance', '2025-07-26 00:08:05', '{\"id\":35,\"central_id\":5,\"kks\":\"84KTBx\",\"ot_number\":\"Ot800\",\"description\":\"maintenance on this alarm \",\"type\":\"Systematic\",\"related_item_type\":\"Alarm\",\"related_item_id\":56,\"start\":\"2025-07-25T22:07:00.000Z\",\"end\":null,\"created_at\":\"2025-07-25T23:07:29.000Z\",\"updated_at\":null}', NULL, 'alarms', '{\"id\":56,\"turbine_id\":65,\"central_id\":5,\"alarm_code\":\"Lvv879s\",\"description\":\"alarm keep doing voices in this turbine\",\"status\":\"Pending\",\"happened_at\":\"2025-07-25T22:05:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-07-25T23:06:20.000Z\"}', '{\"id\":56,\"turbine_id\":65,\"central_id\":5,\"alarm_code\":\"Lvv879s\",\"description\":\"alarm keep doing voices in this turbine\",\"status\":\"Active\",\"happened_at\":\"2025-07-25T22:05:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-07-25T23:06:20.000Z\"}');

-- --------------------------------------------------------

--
-- Table structure for table `alarms`
--

CREATE TABLE `alarms` (
  `id` int(11) NOT NULL,
  `turbine_id` int(11) DEFAULT NULL,
  `central_id` int(11) NOT NULL,
  `alarm_code` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Active','Resolved','Pending') DEFAULT 'Active',
  `happened_at` datetime NOT NULL,
  `resolved_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

--
-- Dumping data for table `alarms`
--

INSERT INTO `alarms` (`id`, `turbine_id`, `central_id`, `alarm_code`, `description`, `status`, `happened_at`, `resolved_at`, `created_at`) VALUES
(35, 64, 5, 'B2', 'Low oil pressure', 'Resolved', '2023-05-15 08:00:00', '2023-05-15 10:30:00', '2025-05-12 21:56:16'),
(38, 65, 5, 'B2', 'Low oil pressure', 'Resolved', '2023-05-15 08:00:00', '2025-05-10 08:11:00', '2025-05-13 13:51:21'),
(42, 64, 5, 'B2', 'Low oil pressure', 'Resolved', '2023-05-15 08:00:00', '2025-05-01 14:30:00', '2025-05-13 17:11:57'),
(43, 64, 5, 'ALM-K001', 'High temperature in generator', 'Resolved', '2025-05-01 08:30:00', '2025-05-01 14:45:00', '2025-05-15 21:53:05'),
(44, 65, 5, 'ALM-K002', 'Low oil pressure', 'Resolved', '2025-05-02 10:15:00', '2025-05-02 16:20:00', '2025-05-15 21:53:05'),
(46, 65, 5, 'ALM-K004', 'Cooling system malfunction', 'Active', '2025-05-04 11:30:00', NULL, '2025-05-15 21:53:05'),
(47, 65, 5, 'ALM-K005', 'Emergency shutdown triggered', 'Resolved', '2025-05-01 07:15:00', '2025-05-01 12:30:00', '2025-05-15 21:53:05'),
(48, 64, 5, 'xyz', 'terks', 'Resolved', '2025-04-01 16:12:16', '2025-05-07 16:12:16', '2025-05-17 15:15:28'),
(51, 65, 5, 'B2', 'Low oil pressure', 'Active', '2023-05-15 08:00:00', NULL, '2025-05-20 23:00:21'),
(52, 64, 5, 'B2', 'Low oil pressure', 'Active', '2023-05-15 08:00:00', NULL, '2025-05-20 23:03:30'),
(53, 65, 5, 'B2', 'Low oil pressure', 'Active', '2023-05-15 08:00:00', NULL, '2025-05-20 23:16:44'),
(54, 64, 5, 'B2', 'Low oil pressure', 'Active', '2023-05-15 08:00:00', NULL, '2025-05-22 22:12:00'),
(55, 64, 5, 'LV30S', 'an alarm keep blinking in  turbine 1 ', 'Active', '2025-07-25 17:37:00', NULL, '2025-07-25 17:37:55'),
(56, 65, 5, 'Lvv879s', 'alarm keep doing voices in this turbine', 'Active', '2025-07-25 23:05:00', NULL, '2025-07-25 23:06:20');

-- --------------------------------------------------------

--
-- Table structure for table `central`
--

CREATE TABLE `central` (
  `central_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `groupement_id` int(11) DEFAULT NULL
);

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
  `central_id` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1
);

--
-- Dumping data for table `central_accounts`
--

INSERT INTO `central_accounts` (`id`, `fullname`, `steg_email`, `password`, `is_verified`, `central_id`, `is_active`) VALUES
(1, 'mohamed chinne', 'ahmed.benali@steg.co', '$2b$10$KoRGGoBby/cen.KpJTYHnOU', 1, 1, 1),
(6, 'mohamed chinne', 'karim.mahmoudi@steg.', '$2b$10$RGAtoVxnAgTLDftEhR8J2e1', 0, 2, 1),
(7, 'mohamed chine', 'raouf.benammar@steg.com.tn', '$2b$10$OO0aFKIU9lSM1cjZRNCAbO5VybxbeQ9hg6yk2pu0S8CrFiNprpnQG', 0, 1, 1),
(13, 'iheb  lahmer', 'ilahmar@steg.com.tn', '$2b$10$b9xuWKChqZifAb40gxlbI.SZN140Dh3TamYWjjAvjQbLiuJZi63r2', 0, 5, 1),
(22, 'mohamed chinne', 'nizar.chaabane@steg.com.tn', '$2b$10$7zj8U6nv2jnbapNglTbaCe3OHGS8WTK7QAqG//kxmGAK/AlE69TM.', 0, 4, 1),
(28, 'iheb  lahmer', 'trettr973@gmail.com', '$2b$10$aFT6e8EtWORa3v/tfrhVUe.K/qsKQdjRWYgHdftlttiXPo8TqvAYK', 0, 5, 0),
(29, 'chine mohamed', 'arkanmsss80@gmail.com', '$2b$10$s21Aa974xIS4ZlDkQHJx8OGH.kOGZZQG/qe1WItvgRytdP6OdnPBe', 1, 5, 1),
(34, 'mouhamed chine', 'zus32192@gmail.com', '$2b$10$BBojquLXSYwhCeEqai/XDOLkHh6j9IPyXNxXEGsE.j1knXN2F4cNC', 1, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `central_employee_emails`
--

CREATE TABLE `central_employee_emails` (
  `employee_email` varchar(50) NOT NULL,
  `central_id` int(11) NOT NULL,
  `is_chef` tinyint(1) NOT NULL DEFAULT 0
);

--
-- Dumping data for table `central_employee_emails`
--

INSERT INTO `central_employee_emails` (`employee_email`, `central_id`, `is_chef`) VALUES
('ahmed.benali@steg.com.tn', 1, 0),
('arkanmsss80@gmail.com', 5, 1),
('fethi.jlassi@steg.com.tn', 3, 0),
('hassen.belhaj@steg.com.tn', 5, 0),
('ilahmar@steg.com.tn', 5, 0),
('karim.mahmoudi@steg.com.tn', 2, 0),
('lotfi.benromdhane@steg.com.tn', 3, 0),
('mohamed.trabelsi@steg.com.tn', 2, 0),
('mouhamedchinne@gmail.com', 2, 0),
('nizar.chaabane@steg.com.tn', 4, 0),
('omar.khalifa@steg.com.tn', 6, 0),
('raouf.benammar@steg.com.tn', 1, 0),
('slim.hajji@steg.com.tn', 7, 0),
('trettr973@gmail.com', 5, 0),
('zus32192@gmail.com', 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `defective_equipment`
--

CREATE TABLE `defective_equipment` (
  `id` int(11) NOT NULL,
  `central_id` int(11) NOT NULL,
  `turbine_id` int(11) NOT NULL,
  `kks` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `comments` text DEFAULT NULL,
  `reported_at` datetime DEFAULT NULL,
  `fixed_at` datetime DEFAULT NULL COMMENT 'Only set when status is Fixed',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('Fixed','Not Fixed','Pending') DEFAULT 'Not Fixed'
);

--
-- Dumping data for table `defective_equipment`
--

INSERT INTO `defective_equipment` (`id`, `central_id`, `turbine_id`, `kks`, `description`, `comments`, `reported_at`, `fixed_at`, `created_at`, `status`) VALUES
(13, 5, 64, 'KKS12345', 'Broken rotor blade', 'Needs immediate replacement', '2023-05-15 08:00:00', '2023-05-17 14:30:00', '2025-05-12 23:10:48', 'Fixed'),
(15, 5, 64, 'KKS12345', 'Broken rotor blade', 'Needs immediate replacement', '2023-05-15 08:00:00', '2023-05-17 14:30:00', '2025-05-13 12:59:02', 'Fixed'),
(16, 5, 65, 'KKS12345', 'Broken rotor blade', 'Needs immediate replacement', '2023-05-15 08:00:00', '2023-05-17 14:30:00', '2025-05-13 12:59:04', 'Fixed'),
(17, 5, 65, 'KKS12345', 'Broken rotor blade', 'Needs immediate replacement', '2023-05-15 08:00:00', '2023-05-17 14:30:00', '2025-05-13 12:59:05', 'Fixed'),
(18, 5, 65, 'KKS12345', 'Broken rotor blade', 'Needs immediate replacement', '2023-05-15 08:00:00', NULL, '2025-05-13 12:59:16', ''),
(19, 5, 65, 'KKS12345', 'Broken rotor blade', 'Needs immediate replacement', '2023-05-15 08:00:00', NULL, '2025-05-13 12:59:18', ''),
(20, 5, 65, 'KKS12345', 'Broken rotor blade', 'Needs immediate replacement', '2023-05-15 08:00:00', NULL, '2025-05-13 12:59:19', ''),
(21, 5, 64, 'KKS-K001', 'Faulty pressure sensor', NULL, '2025-05-01 09:00:00', '2025-05-02 15:30:00', '2025-05-15 21:53:05', 'Fixed'),
(22, 5, 64, 'KKS-K002', 'Damaged bearing', NULL, '2025-05-02 08:45:00', '2025-05-03 14:00:00', '2025-05-15 21:53:05', 'Fixed'),
(25, 5, 65, 'KKS-K005', 'Worn out coupling', NULL, '2025-05-01 11:45:00', '2025-05-02 16:30:00', '2025-05-15 21:53:05', 'Fixed'),
(29, 5, 65, 'KKS12345', 'Broken rotor blade', 'Needs immediate replacement', '2023-05-15 08:00:00', NULL, '2025-05-20 20:23:28', ''),
(30, 5, 65, 'KKS12345', 'Broken rotor blade', 'Needs immediate replacement', '2023-05-15 08:00:00', NULL, '2025-05-20 23:37:54', ''),
(31, 5, 64, 'KKS12345', 'Broken rotor blade', 'Needs immediate replacement', '2023-05-15 08:00:00', NULL, '2025-05-20 23:38:17', ''),
(32, 5, 64, 'KKS12345', 'Broken rotor blade', 'Needs immediate replacement', '2023-05-15 08:00:00', NULL, '2025-05-20 23:40:22', ''),
(33, 5, 64, 'KKS12345', 'Broken rotor blade', 'Needs immediate replacement', '2023-05-15 08:00:00', NULL, '2025-05-20 23:41:29', ''),
(34, 5, 64, 'As8082', 'abcd1234', NULL, '2025-07-25 18:47:09', NULL, '2025-07-25 17:47:09', 'Not Fixed');

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
);

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
);

-- --------------------------------------------------------

--
-- Table structure for table `direction_employee_emails`
--

CREATE TABLE `direction_employee_emails` (
  `employee_email` varchar(50) NOT NULL,
  `direction_id` int(11) NOT NULL
);

--
-- Dumping data for table `direction_employee_emails`
--

INSERT INTO `direction_employee_emails` (`employee_email`, `direction_id`) VALUES
('amine.belhadj@steg.com.tn', 1),
('dalila.benzarti@steg.com.tn', 1),
('farid.mansour@steg.com.tn', 1),
('leila.nasri@steg.com.tn', 1),
('marwan.cherif@steg.com.tn', 1),
('nacer.jaouadi@steg.com.tn', 1),
('rafik.hamdi@steg.com.tn', 1),
('samia.frikha@steg.com.tn', 1),
('sonia.benmohamed@steg.com.tn', 1),
('tarek.aouididi@steg.com.tn', 1),
('wassim.chebbi@steg.com.tn', 1),
('yassine.khelifi@steg.com.tn', 1);

-- --------------------------------------------------------

--
-- Table structure for table `groupement`
--

CREATE TABLE `groupement` (
  `groupement_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `id_direction` int(11) NOT NULL
);

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
);

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
(23, 'mohamed chinne', 'tret7873@gmail.com', '$2b$10$gzvdEIAM8xTB1', 0, 1),
(24, 'mohamed chinne', 'madoumc54@gmail.com', '$2b$10$4oEZft/vpGU8jkqR3k3GnuyVgKKLq9XehexyykMxlW9HgEUmLJjty', 1, 4),
(25, 'Johnathan Doe', 'john.doe@steg.com.tn', '$2b$10$E8BkqsiQt4Wr2TI9j/.zQOyD3hb1golJASbRTUxWzVFQJXIHld7ie', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `groupement_employee_emails`
--

CREATE TABLE `groupement_employee_emails` (
  `employee_email` varchar(50) NOT NULL,
  `groupement_id` int(11) NOT NULL
);

--
-- Dumping data for table `groupement_employee_emails`
--

INSERT INTO `groupement_employee_emails` (`employee_email`, `groupement_id`) VALUES
('john.doe@steg.com.tn', 1),
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
-- Table structure for table `maintenance`
--

CREATE TABLE `maintenance` (
  `id` int(11) NOT NULL,
  `central_id` int(11) NOT NULL,
  `kks` varchar(255) DEFAULT NULL,
  `ot_number` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `type` enum('Curative','Systematic') NOT NULL,
  `related_item_type` enum('Alarm','Defective Equipment') NOT NULL,
  `related_item_id` int(11) DEFAULT NULL,
  `start` datetime NOT NULL,
  `end` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP
);

-- --------------------------------------------------------

--
-- Table structure for table `performance`
--

CREATE TABLE `performance` (
  `id` int(11) NOT NULL,
  `central_id` int(11) NOT NULL,
  `turbine_id` int(11) NOT NULL,
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
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--
-- Dumping data for table `performance`
--

INSERT INTO `performance` (`id`, `central_id`, `turbine_id`, `performance_date`, `fuel_type`, `load_status`, `period`, `fuel_consumption`, `gross_energy_production`, `auxiliaries_consumption`, `net_active_energy_production`, `reactive_energy_production`, `startups`, `ignitions`, `couplings`, `load_trips`, `net_energy_distribution`, `starts_since_last_inspection`, `max_power_peak`, `flame_hours`, `production_hours`, `daily_availability`, `average_hourly_power`, `gas_calorific_value`, `gasoil_calorific_value`, `specific_consumption`, `daily_availability_rate`, `cumulative_availability_rate`, `operating_hours_last_inspection`, `starts_since_first_coupling`, `operating_hours_since_first_coupling`, `pumpable_gasoil_stock`, `autonomy_at_pmc`, `mwh_peak`, `mwh_tlr`, `created_at`, `updated_at`) VALUES
(1, 5, 64, '2025-05-14', 'Gas', 'Loaded', 'Day', 120.55, 3000.75, 150.25, 2850.50, 200.00, 4, 3, 1, 0, 2750.45, 10, 450.75, 18.25, 20.00, 98.50, 142.53, 45.78, 42.30, 0.43, 97.25, 96.00, 2500, 80, 10500, 1200.60, 15.75, 120.50, 85.25, '2025-05-14 14:48:16', '2025-05-14 14:48:42'),
(2, 5, 64, '2025-05-01', 'Gas', 'Loaded', 'Day', 120.55, 3000.75, 150.25, 2850.50, 200.00, 4, 3, 1, 0, 2750.45, 10, 450.75, 18.25, 20.00, 98.50, 142.53, 45.78, 42.30, 0.43, 97.25, 96.00, 2500, 80, 10500, 1200.60, 15.75, 120.50, 85.25, '2025-05-14 21:36:50', '2025-05-22 22:27:55'),
(3, 5, 64, '2025-05-02', 'Gas', 'Loaded', 'Day', 130.20, 3200.00, 160.00, 3040.00, 215.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 21.00, 22.50, NULL, NULL, NULL, 0.43, 93.75, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:50', '2025-05-14 21:36:50'),
(4, 5, 64, '2025-05-03', 'Gas', 'Loaded', 'Day', 128.75, 3150.00, 157.50, 2992.50, 212.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 20.75, 23.50, NULL, NULL, NULL, 0.43, 97.92, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:50', '2025-05-14 21:36:50'),
(5, 5, 64, '2025-05-04', 'Gas', 'Loaded', 'Day', 132.40, 3250.00, 162.50, 3087.50, 218.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 21.25, 24.00, NULL, NULL, NULL, 0.43, 100.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:50', '2025-05-14 21:36:50'),
(6, 5, 64, '2025-05-05', 'Gas', 'Loaded', 'Day', 127.30, 3125.00, 156.25, 2968.75, 211.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 20.60, 23.25, NULL, NULL, NULL, 0.43, 96.88, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:50', '2025-05-14 21:36:50'),
(7, 5, 64, '2025-05-06', 'Gas', 'Loaded', 'Day', 129.85, 3175.00, 158.75, 3016.25, 214.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 20.90, 22.75, NULL, NULL, NULL, 0.43, 94.79, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:50', '2025-05-14 21:36:50'),
(8, 5, 64, '2025-05-07', 'Gas', 'Loaded', 'Day', 131.05, 3225.00, 161.25, 3063.75, 217.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 21.10, 23.75, NULL, NULL, NULL, 0.43, 98.96, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:50', '2025-05-14 21:36:50'),
(9, 5, 64, '2025-05-08', 'Gas', 'Loaded', 'Day', 126.65, 3112.50, 155.63, 2956.88, 209.50, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 20.45, 22.25, NULL, NULL, NULL, 0.43, 92.71, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:50', '2025-05-14 21:36:50'),
(10, 5, 64, '2025-05-09', 'Gas', 'Loaded', 'Day', 133.75, 3275.00, 163.75, 3111.25, 220.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 21.40, 23.90, NULL, NULL, NULL, 0.43, 99.58, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:50', '2025-05-14 21:36:50'),
(11, 5, 64, '2025-05-10', 'Gas', 'Loaded', 'Day', 124.15, 3050.00, 152.50, 2897.50, 205.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 20.30, 22.00, NULL, NULL, NULL, 0.43, 91.67, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:50', '2025-05-14 21:36:50'),
(12, 11, 58, '2025-05-01', 'Gas', 'Loaded', 'Day', 2800.00, 13000.00, 650.00, 12350.00, 900.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 18.50, 22.00, NULL, NULL, NULL, 0.23, 91.67, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(13, 11, 58, '2025-05-02', 'Gas', 'Loaded', 'Day', 2750.00, 12800.00, 640.00, 12160.00, 880.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 18.20, 21.50, NULL, NULL, NULL, 0.23, 89.58, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(14, 11, 58, '2025-05-03', 'Gas', 'Loaded', 'Day', 2900.00, 13500.00, 675.00, 12825.00, 930.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 19.00, 23.00, NULL, NULL, NULL, 0.23, 95.83, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(15, 11, 58, '2025-05-04', 'Gas', 'Loaded', 'Day', 2850.00, 13200.00, 660.00, 12540.00, 910.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 18.80, 22.50, NULL, NULL, NULL, 0.23, 93.75, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(16, 11, 58, '2025-05-05', 'Gas', 'Loaded', 'Day', 2950.00, 13700.00, 685.00, 13015.00, 950.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 19.30, 23.50, NULL, NULL, NULL, 0.23, 97.92, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(17, 11, 58, '2025-05-06', 'Gas', 'Loaded', 'Day', 2700.00, 12500.00, 625.00, 11875.00, 860.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 17.90, 21.00, NULL, NULL, NULL, 0.23, 87.50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(18, 11, 58, '2025-05-07', 'Gas', 'Loaded', 'Day', 2650.00, 12300.00, 615.00, 11685.00, 850.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 17.70, 20.50, NULL, NULL, NULL, 0.23, 85.42, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(19, 11, 58, '2025-05-08', 'Gas', 'Loaded', 'Day', 2880.00, 13400.00, 670.00, 12730.00, 920.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 18.90, 22.75, NULL, NULL, NULL, 0.23, 94.79, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(20, 11, 58, '2025-05-09', 'Gas', 'Loaded', 'Day', 2920.00, 13600.00, 680.00, 12920.00, 940.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 19.20, 23.25, NULL, NULL, NULL, 0.23, 96.88, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(21, 11, 58, '2025-05-10', 'Gas', 'Loaded', 'Day', 2780.00, 12900.00, 645.00, 12255.00, 890.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 18.40, 21.75, NULL, NULL, NULL, 0.23, 90.63, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(22, 10, 23, '2025-05-01', 'Gas', 'Loaded', 'Day', 1350.00, 5400.00, 270.00, 5130.00, 380.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 16.80, 20.00, NULL, NULL, NULL, 0.26, 83.33, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(23, 10, 23, '2025-05-02', 'Gas', 'Loaded', 'Day', 1400.00, 5600.00, 280.00, 5320.00, 395.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 17.50, 21.00, NULL, NULL, NULL, 0.26, 87.50, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(24, 10, 23, '2025-05-03', 'Gas', 'Loaded', 'Day', 1375.00, 5500.00, 275.00, 5225.00, 387.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 17.20, 20.50, NULL, NULL, NULL, 0.26, 85.42, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(25, 10, 23, '2025-05-04', 'Gas', 'Loaded', 'Day', 1425.00, 5700.00, 285.00, 5415.00, 402.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 17.80, 21.50, NULL, NULL, NULL, 0.26, 89.58, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(26, 10, 23, '2025-05-05', 'Gas', 'Loaded', 'Day', 1450.00, 5800.00, 290.00, 5510.00, 410.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 18.10, 22.00, NULL, NULL, NULL, 0.26, 91.67, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(27, 10, 23, '2025-05-06', 'Gas', 'Loaded', 'Day', 1325.00, 5300.00, 265.00, 5035.00, 373.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 16.50, 19.50, NULL, NULL, NULL, 0.26, 81.25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(28, 10, 23, '2025-05-07', 'Gas', 'Loaded', 'Day', 1300.00, 5200.00, 260.00, 4940.00, 366.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 16.20, 19.00, NULL, NULL, NULL, 0.26, 79.17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(29, 10, 23, '2025-05-08', 'Gas', 'Loaded', 'Day', 1475.00, 5900.00, 295.00, 5605.00, 417.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 18.40, 22.50, NULL, NULL, NULL, 0.26, 93.75, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(30, 10, 23, '2025-05-09', 'Gas', 'Loaded', 'Day', 1500.00, 6000.00, 300.00, 5700.00, 425.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 18.70, 23.00, NULL, NULL, NULL, 0.26, 95.83, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(31, 10, 23, '2025-05-10', 'Gas', 'Loaded', 'Day', 1425.00, 5700.00, 285.00, 5415.00, 402.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 17.80, 21.50, NULL, NULL, NULL, 0.26, 89.58, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 21:36:51', '2025-05-14 21:36:51'),
(32, 1, 11, '2025-05-01', 'Gas', 'Loaded', 'Day', 2500.00, 12000.00, 600.00, 11400.00, 850.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 18.00, 22.00, NULL, NULL, NULL, 0.22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(33, 1, 11, '2025-05-02', 'Gas', 'Loaded', 'Day', 2600.00, 12500.00, 625.00, 11875.00, 880.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 19.00, 23.00, NULL, NULL, NULL, 0.22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(34, 1, 11, '2025-05-03', 'Gas', 'Loaded', 'Day', 2550.00, 12200.00, 610.00, 11590.00, 860.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 18.50, 22.50, NULL, NULL, NULL, 0.22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(35, 2, 14, '2025-05-01', 'Gas', 'Loaded', 'Day', 2800.00, 13000.00, 650.00, 12350.00, 900.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 19.00, 22.50, NULL, NULL, NULL, 0.23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(36, 2, 14, '2025-05-02', 'Gas', 'Loaded', 'Day', 2850.00, 13200.00, 660.00, 12540.00, 920.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 19.30, 23.00, NULL, NULL, NULL, 0.23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(37, 2, 14, '2025-05-03', 'Gas', 'Loaded', 'Day', 2820.00, 13100.00, 655.00, 12445.00, 910.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 19.10, 22.80, NULL, NULL, NULL, 0.23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(38, 2, 15, '2025-05-01', 'Gas', 'Loaded', 'Day', 2900.00, 13500.00, 675.00, 12825.00, 940.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 19.50, 23.00, NULL, NULL, NULL, 0.23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(39, 2, 15, '2025-05-02', 'Gas', 'Loaded', 'Day', 2950.00, 13700.00, 685.00, 13015.00, 960.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 19.80, 23.50, NULL, NULL, NULL, 0.23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(40, 2, 15, '2025-05-03', 'Gas', 'Loaded', 'Day', 2920.00, 13600.00, 680.00, 12920.00, 950.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 19.60, 23.20, NULL, NULL, NULL, 0.23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(41, 2, 16, '2025-05-01', 'Gas', 'Loaded', 'Day', 1200.00, 5500.00, 275.00, 5225.00, 380.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 17.00, 21.00, NULL, NULL, NULL, 0.23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(42, 2, 16, '2025-05-02', 'Gas', 'Loaded', 'Day', 1250.00, 5700.00, 285.00, 5415.00, 400.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 17.50, 21.50, NULL, NULL, NULL, 0.23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(43, 2, 16, '2025-05-03', 'Gas', 'Loaded', 'Day', 1220.00, 5600.00, 280.00, 5320.00, 390.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 17.20, 21.20, NULL, NULL, NULL, 0.23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(44, 2, 17, '2025-05-01', 'Gas', 'Loaded', 'Day', 1300.00, 6000.00, 300.00, 5700.00, 420.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 18.00, 22.00, NULL, NULL, NULL, 0.23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(45, 2, 17, '2025-05-02', 'Gas', 'Loaded', 'Day', 1350.00, 6200.00, 310.00, 5890.00, 440.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 18.50, 22.50, NULL, NULL, NULL, 0.23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(46, 2, 17, '2025-05-03', 'Gas', 'Loaded', 'Day', 1320.00, 6100.00, 305.00, 5795.00, 430.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 18.20, 22.20, NULL, NULL, NULL, 0.23, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(47, 2, 18, '2025-05-01', 'Gas', 'Loaded', 'Day', 500.00, 2000.00, 100.00, 1900.00, 140.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 16.00, 20.00, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(48, 2, 18, '2025-05-02', 'Gas', 'Loaded', 'Day', 520.00, 2100.00, 105.00, 1995.00, 150.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 16.50, 20.50, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(49, 2, 18, '2025-05-03', 'Gas', 'Loaded', 'Day', 510.00, 2050.00, 102.50, 1947.50, 145.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 16.20, 20.20, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(50, 2, 19, '2025-05-01', 'Gas', 'Loaded', 'Day', 800.00, 3400.00, 170.00, 3230.00, 240.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 17.00, 21.00, NULL, NULL, NULL, 0.25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(51, 2, 19, '2025-05-02', 'Gas', 'Loaded', 'Day', 820.00, 3500.00, 175.00, 3325.00, 250.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 17.50, 21.50, NULL, NULL, NULL, 0.25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(52, 2, 19, '2025-05-03', 'Gas', 'Loaded', 'Day', 810.00, 3450.00, 172.50, 3277.50, 245.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 17.20, 21.20, NULL, NULL, NULL, 0.25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(53, 5, 64, '2025-05-01', 'Gas', 'Loaded', 'Day', 750.00, 3000.00, 150.00, 2850.00, 210.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 15.50, 19.50, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(54, 5, 64, '2025-05-02', 'Gas', 'Loaded', 'Day', 770.00, 3100.00, 155.00, 2945.00, 220.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 16.00, 20.00, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(55, 5, 64, '2025-05-03', 'Gas', 'Loaded', 'Day', 760.00, 3050.00, 152.50, 2897.50, 215.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 15.70, 19.70, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(56, 5, 65, '2025-05-01', 'Gas', 'Loaded', 'Day', 780.00, 3200.00, 160.00, 3040.00, 220.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 16.00, 20.00, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(57, 5, 65, '2025-05-02', 'Gas', 'Loaded', 'Day', 800.00, 3300.00, 165.00, 3135.00, 230.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 16.50, 20.50, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(58, 5, 65, '2025-05-03', 'Gas', 'Loaded', 'Day', 790.00, 3250.00, 162.50, 3087.50, 225.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 16.20, 20.20, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(59, 6, 20, '2025-05-01', 'Gas-oil', 'Loaded', 'Day', 520.00, 2100.00, 105.00, 1995.00, 150.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 15.00, 19.00, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(60, 6, 20, '2025-05-02', 'Gas-oil', 'Loaded', 'Day', 540.00, 2200.00, 110.00, 2090.00, 160.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 15.50, 19.50, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(61, 6, 20, '2025-05-03', 'Gas-oil', 'Loaded', 'Day', 530.00, 2150.00, 107.50, 2042.50, 155.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 15.20, 19.20, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(62, 6, 21, '2025-05-01', 'Gas-oil', 'Loaded', 'Day', 530.00, 2150.00, 107.50, 2042.50, 155.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 15.20, 19.20, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(63, 6, 21, '2025-05-02', 'Gas-oil', 'Loaded', 'Day', 550.00, 2250.00, 112.50, 2137.50, 165.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 15.70, 19.70, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(64, 6, 21, '2025-05-03', 'Gas-oil', 'Loaded', 'Day', 540.00, 2200.00, 110.00, 2090.00, 160.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 15.40, 19.40, NULL, NULL, NULL, 0.26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(65, 7, 12, '2025-05-01', 'Gas', 'Loaded', 'Day', 6500.00, 31000.00, 1550.00, 29450.00, 2200.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 21.00, 24.00, NULL, NULL, NULL, 0.22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(66, 7, 12, '2025-05-02', 'Gas', 'Loaded', 'Day', 6600.00, 31500.00, 1575.00, 29925.00, 2250.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 21.50, 24.00, NULL, NULL, NULL, 0.22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(67, 7, 12, '2025-05-03', 'Gas', 'Loaded', 'Day', 6550.00, 31200.00, 1560.00, 29640.00, 2220.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 21.20, 24.00, NULL, NULL, NULL, 0.22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(68, 7, 13, '2025-05-01', 'Gas', 'Loaded', 'Day', 6400.00, 30500.00, 1525.00, 28975.00, 2150.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 20.50, 23.50, NULL, NULL, NULL, 0.22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(69, 7, 13, '2025-05-02', 'Gas', 'Loaded', 'Day', 6500.00, 31000.00, 1550.00, 29450.00, 2200.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 21.00, 24.00, NULL, NULL, NULL, 0.22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(70, 7, 13, '2025-05-03', 'Gas', 'Loaded', 'Day', 6450.00, 30700.00, 1535.00, 29165.00, 2170.00, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 20.70, 23.70, NULL, NULL, NULL, 0.22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-15 13:17:47', '2025-05-15 13:17:47'),
(71, 5, 64, '2025-05-19', 'Gas', 'Loaded', 'Day', 120.55, 3000.75, 150.25, 2850.50, 200.00, 4, 3, 1, 0, 2750.45, 10, 450.75, 18.25, 20.00, 98.50, 142.53, 45.78, 42.30, 0.43, 97.25, 96.00, 2500, 80, 10500, 1200.60, 15.75, 120.50, 85.25, '2025-05-19 15:20:52', '2025-05-19 15:20:52');

-- --------------------------------------------------------

--
-- Table structure for table `request_modification`
--

CREATE TABLE `request_modification` (
  `id` int(11) NOT NULL,
  `table_name` varchar(100) NOT NULL COMMENT 'Name of the table where the record exists',
  `record_id` int(11) NOT NULL COMMENT 'ID of the record being modified',
  `old_value` longtext  DEFAULT NULL COMMENT 'Original value of the field (JSON format)',
  `new_value` longtext  DEFAULT NULL COMMENT 'Requested new value (JSON format)',
  `receiver_groupement_id` int(11) DEFAULT NULL COMMENT 'Groupement ID of the receiver',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `raison` varchar(500) DEFAULT NULL COMMENT 'Reason for the modification request',
  `method` enum('update','delete','insert') NOT NULL DEFAULT 'update' COMMENT 'Type of modification requested',
  `requester` longtext  NOT NULL COMMENT 'Requester information in JSON format (id, central_id, name, etc.)');

--
-- Dumping data for table `request_modification`
--

INSERT INTO `request_modification` (`id`, `table_name`, `record_id`, `old_value`, `new_value`, `receiver_groupement_id`, `created_at`, `raison`, `method`, `requester`) VALUES
(8, 'alarms', 39, '{\"id\":39,\"turbine_id\":2,\"central_id\":5,\"alarm_code\":\"B2\",\"description\":\"Low oil pressure\",\"status\":\"Active\",\"happened_at\":\"2023-05-15T07:00:00.000Z\",\"resolved_at\":null,\"created_at\":\"2025-05-13T13:51:35.000Z\"}', NULL, 1, '2025-05-20 17:13:40', 'incorrectly inserted it', 'delete', '{\"id\":26,\"fullname\":\"iheb  lahmer\",\"steg_email\":\"arkanmsss80@gmail.com\",\"is_verified\":1,\"central_id\":5,\"is_active\":1,\"unittype\":\"central\",\"unitname\":\"Korba\"}');

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
  `commissioning_year` SMALLINT DEFAULT NULL,
  `net_power_at_commissioning` decimal(6,2) DEFAULT NULL
);

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
(63, 'TG1', 13, 'FIAT', 'Gasoil', '1984', 34.50),
(64, 'TG1', 5, 'ALSTHOM - GE', 'Gaz', '1978', 21.50),
(65, 'TG2', 5, 'FIAT', ' Gaz', '1984', 34.50);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `alarms`
--
ALTER TABLE `alarms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_turbine` (`turbine_id`),
  ADD KEY `fk_alarms_central` (`central_id`);

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
  ADD KEY `fk_defective_equipment_turbine` (`turbine_id`),
  ADD KEY `fk_defective_equipment_central` (`central_id`);

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
  ADD PRIMARY KEY (`employee_email`);

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
  ADD KEY `fk_maintenance_central` (`central_id`);

--
-- Indexes for table `performance`
--
ALTER TABLE `performance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_performance_central` (`central_id`),
  ADD KEY `fk_performance_turbine` (`turbine_id`);

--
-- Indexes for table `request_modification`
--
ALTER TABLE `request_modification`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_receiver_groupement` (`receiver_groupement_id`);

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
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `alarms`
--
ALTER TABLE `alarms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `central`
--
ALTER TABLE `central`
  MODIFY `central_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `central_accounts`
--
ALTER TABLE `central_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `defective_equipment`
--
ALTER TABLE `defective_equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `direction`
--
ALTER TABLE `direction`
  MODIFY `direction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `direction_accounts`
--
ALTER TABLE `direction_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `groupement`
--
ALTER TABLE `groupement`
  MODIFY `groupement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `groupement_accounts`
--
ALTER TABLE `groupement_accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `maintenance`
--
ALTER TABLE `maintenance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `performance`
--
ALTER TABLE `performance`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `request_modification`
--
ALTER TABLE `request_modification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `turbine`
--
ALTER TABLE `turbine`
  MODIFY `turbine_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `alarms`
--
ALTER TABLE `alarms`
  ADD CONSTRAINT `fk_alarms_central` FOREIGN KEY (`central_id`) REFERENCES `central` (`central_id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
  ADD CONSTRAINT `fk_defective_equipment_central` FOREIGN KEY (`central_id`) REFERENCES `central` (`central_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_defective_equipment_turbine` FOREIGN KEY (`turbine_id`) REFERENCES `turbine` (`turbine_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `direction_accounts`
--
ALTER TABLE `direction_accounts`
  ADD CONSTRAINT `directionfk` FOREIGN KEY (`direction_id`) REFERENCES `direction` (`direction_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `fk_maintenance_central` FOREIGN KEY (`central_id`) REFERENCES `central` (`central_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `request_modification`
--
ALTER TABLE `request_modification`
  ADD CONSTRAINT `fk_receiver_groupement` FOREIGN KEY (`receiver_groupement_id`) REFERENCES `groupement` (`groupement_id`);

--
-- Constraints for table `turbine`
--
ALTER TABLE `turbine`
  ADD CONSTRAINT `turbine_ibfk_1` FOREIGN KEY (`central_id`) REFERENCES `central` (`central_id`);
COMMIT;

