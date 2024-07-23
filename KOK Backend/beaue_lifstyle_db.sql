-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 23, 2024 at 07:10 AM
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
-- Database: `beaue_lifstyle_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` bigint(20) NOT NULL,
  `category_name` text NOT NULL,
  `category_image` text DEFAULT NULL,
  `category_banner_image` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`, `category_image`, `category_banner_image`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, 'Passport cover', '1_765646_1.png', '1_8338460_1.png', 1, 0, '2024-07-18 03:01:14', '2024-07-19 12:29:21'),
(2, 'Cover', '2_1154292_2.png', '2_275252_2.png', 1, 0, '2024-07-19 12:52:01', '2024-07-19 12:52:01');

-- --------------------------------------------------------

--
-- Table structure for table `charms`
--

CREATE TABLE `charms` (
  `charm_id` bigint(20) NOT NULL,
  `charm_name` text NOT NULL,
  `charm_description` text DEFAULT NULL,
  `charm_price` float DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `charms`
--

INSERT INTO `charms` (`charm_id`, `charm_name`, `charm_description`, `charm_price`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, 'Dog', '', NULL, 1, 0, '2024-07-18 03:04:29', '2024-07-18 03:04:29'),
(3, 'Camera', '', NULL, 1, 0, '2024-07-18 03:12:12', '2024-07-18 03:12:12'),
(4, 'Plane', '', NULL, 1, 0, '2024-07-18 03:12:26', '2024-07-18 03:12:26'),
(5, 'Scooter', '', NULL, 1, 0, '2024-07-18 03:12:40', '2024-07-18 03:12:40'),
(6, 'King', '', NULL, 1, 0, '2024-07-18 03:12:51', '2024-07-18 03:12:51'),
(7, 'Cat', '', NULL, 1, 0, '2024-07-18 03:13:08', '2024-07-18 03:13:08'),
(8, 'Model', '', NULL, 1, 0, '2024-07-18 03:13:14', '2024-07-18 03:13:14'),
(9, 'Queen', '', NULL, 1, 0, '2024-07-18 03:13:20', '2024-07-18 03:13:20'),
(10, 'Prince', '', NULL, 1, 0, '2024-07-18 03:13:28', '2024-07-18 03:13:28'),
(11, 'Cycle', '', NULL, 1, 0, '2024-07-18 03:13:35', '2024-07-18 03:13:35');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `color_id` bigint(20) NOT NULL,
  `color_name` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`color_id`, `color_name`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, 'BLACK', 1, 0, '2024-07-18 03:03:43', '2024-07-18 03:03:43'),
(2, 'BROWN', 1, 0, '2024-07-18 03:03:53', '2024-07-18 03:03:53'),
(3, 'MARUN', 1, 0, '2024-07-18 03:04:02', '2024-07-18 03:04:02'),
(4, 'BLUE', 1, 0, '2024-07-18 03:04:10', '2024-07-18 03:04:10');

-- --------------------------------------------------------

--
-- Table structure for table `contactpages`
--

CREATE TABLE `contactpages` (
  `contact_id` bigint(20) NOT NULL,
  `user_first_name` text NOT NULL,
  `user_last_name` text NOT NULL,
  `user_email` text NOT NULL,
  `user_mobile_no` bigint(20) NOT NULL,
  `msg` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contactpages`
--

INSERT INTO `contactpages` (`contact_id`, `user_first_name`, `user_last_name`, `user_email`, `user_mobile_no`, `msg`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, 'dhruv', 'sidhapara', 'dhruvsiddhapara@gmail.com', 9879131393, 'jwefws fy  f9if9uerhgurthtrh9rthrtjhrth rgh9irtigtg hrtguihrtgir urghruhgr rg 9quh0e 4 tt74yt4ht4jh t4tghherugh h4ujtioerhijebr', 1, 0, '2024-07-19 08:34:05', '2024-07-19 08:34:05'),
(2, 'qwf', 'sdvfs', 'Dhruv123@gmail.com', 9879131393, 'sdc', 1, 0, '2024-07-19 10:43:52', '2024-07-19 10:43:52');

-- --------------------------------------------------------

--
-- Table structure for table `couponcards`
--

CREATE TABLE `couponcards` (
  `couponCard_id` bigint(20) NOT NULL,
  `couponCard_name` text NOT NULL,
  `discount_code` text NOT NULL,
  `discount_Amt` float NOT NULL,
  `discount_per` float NOT NULL,
  `couponCard_image` text DEFAULT NULL,
  `product_id` bigint(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `couponcards`
--

INSERT INTO `couponcards` (`couponCard_id`, `couponCard_name`, `discount_code`, `discount_Amt`, `discount_per`, `couponCard_image`, `product_id`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, 'Rakhi Special', '106621', 0, 5, '1_2457855_1.png', 9, 1, 0, '2024-07-18 07:38:14', '2024-07-18 07:38:14');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `image_id` bigint(20) NOT NULL,
  `product_id` bigint(20) DEFAULT NULL,
  `images` text NOT NULL,
  `image_type` int(11) NOT NULL,
  `image_tital` text DEFAULT NULL,
  `image_description` text DEFAULT NULL,
  `image_sub_description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`image_id`, `product_id`, `images`, `image_type`, `image_tital`, `image_description`, `image_sub_description`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, NULL, '1_4789786_1.png', 1, NULL, NULL, NULL, 1, 0, '2024-07-18 03:42:43', '2024-07-18 03:42:43'),
(2, NULL, '1_5685701_1.png', 1, NULL, NULL, NULL, 1, 0, '2024-07-18 03:42:44', '2024-07-18 03:42:44'),
(3, NULL, '1_4535352_1.png', 1, NULL, NULL, NULL, 1, 0, '2024-07-18 03:42:44', '2024-07-18 03:42:44'),
(5, NULL, '2_4429464_2.png', 2, NULL, NULL, NULL, 1, 0, '2024-07-18 03:43:52', '2024-07-18 03:43:52'),
(6, NULL, '3_9498409_3.png', 3, NULL, NULL, NULL, 1, 0, '2024-07-18 03:43:57', '2024-07-18 03:43:57'),
(7, NULL, '5_7853922_5.png', 5, 'End of Summer!', 'Up to 40% off on all items.', 'Sign up to our Newsletter and get the discount code!', 1, 0, '2024-07-18 03:45:58', '2024-07-18 03:45:58'),
(8, NULL, '4_6780380_4.png', 4, 'Bulk Corporate Orders', 'Ditch the boring traditional gifts and explore from a range of personalised products to find the perfect gift for your employees, clients and vendors. Make it special by customising it with their name and brand logo.', NULL, 1, 0, '2024-07-18 03:46:23', '2024-07-18 03:46:23');

-- --------------------------------------------------------

--
-- Table structure for table `mycarts`
--

CREATE TABLE `mycarts` (
  `mycart_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `user_token` text NOT NULL,
  `product_modify_object` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`product_modify_object`)),
  `in_cart` tinyint(1) NOT NULL DEFAULT 1,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mycarts`
--

INSERT INTO `mycarts` (`mycart_id`, `product_id`, `user_id`, `user_token`, `product_modify_object`, `in_cart`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, 5, 2, 'eyJhbGciOiJIUzI1NiJ9.Mg.aOzXb1sZ3dxThOGH8woO-6SQ4zluRkxZjvMD5Wgz75I', '{}', 1, 0, 0, '2024-07-18 04:30:20', '2024-07-18 04:30:20'),
(23, 9, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', '{}', 1, 0, 0, '2024-07-18 13:09:37', '2024-07-18 13:09:37'),
(24, 3, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', '{}', 1, 0, 0, '2024-07-18 13:10:40', '2024-07-18 13:10:40'),
(25, 3, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', '{}', 1, 0, 0, '2024-07-18 13:15:50', '2024-07-18 13:15:50'),
(26, 3, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', '{\"Enter Name\":\"lk.k.kj\"}', 1, 0, 0, '2024-07-18 13:22:57', '2024-07-18 13:22:57'),
(27, 5, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', '{}', 1, 0, 0, '2024-07-18 13:38:04', '2024-07-18 13:38:04'),
(28, 5, 4, 'eyJhbGciOiJIUzI1NiJ9.NA.93Y7B4Na3o2CT559MV37fYsDYWQ4qpfCSWM9XXKkmWU', '{}', 1, 0, 0, '2024-07-19 04:13:52', '2024-07-19 04:13:52'),
(29, 3, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', '{\"Enter Name\":\"erg\"}', 1, 0, 0, '2024-07-19 04:56:06', '2024-07-19 04:56:06'),
(30, 3, 5, 'eyJhbGciOiJIUzI1NiJ9.NQ._wymZ69L6NWQptYFtRomjUQ72ba74gjDltc0mDwGMro', '{}', 1, 0, 0, '2024-07-19 04:56:28', '2024-07-19 04:56:28'),
(31, 5, 5, 'eyJhbGciOiJIUzI1NiJ9.NQ._wymZ69L6NWQptYFtRomjUQ72ba74gjDltc0mDwGMro', '{}', 1, 0, 0, '2024-07-19 05:01:56', '2024-07-19 05:01:56'),
(32, 2, 7, 'eyJhbGciOiJIUzI1NiJ9.Nw.oPcxcitgP2GKjw0Oq7HXwyL3XMQMPOV6pVRD5GXM_xw', '{}', 1, 0, 0, '2024-07-19 05:36:50', '2024-07-19 05:36:50'),
(33, 2, 8, 'eyJhbGciOiJIUzI1NiJ9.OA.UsHNJA2jkD5E5GJTPtlRw6b37gR5YoWa-_l7vBfBEGc', '{\"Enter Name\":\"efsefsf\"}', 1, 0, 0, '2024-07-19 05:41:06', '2024-07-19 05:41:28'),
(34, 2, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', '{\"Enter Name\":\"3erwbvhebi\"}', 1, 0, 0, '2024-07-19 08:16:53', '2024-07-19 08:16:53'),
(35, 1, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', '{\"Enter Name\":\"nhvfcgf\"}', 1, 0, 0, '2024-07-19 08:18:07', '2024-07-19 08:18:07'),
(36, 2, 9, 'eyJhbGciOiJIUzI1NiJ9.OQ.Q_DKxaMlmARd_-xBjEcnNQHrPxJKETvP5SCGBEfvEcY', '{\"Enter Name\":\"fvd\"}', 1, 0, 0, '2024-07-19 08:29:46', '2024-07-19 08:29:46'),
(38, 2, 10, 'eyJhbGciOiJIUzI1NiJ9.MTA.Lyl64LkjvMlh65ZOJigrcLN83IaAvvSBoL0lf9wE4fw', '{\"Enter Name\":\"ethbf\"}', 1, 0, 0, '2024-07-19 10:46:35', '2024-07-19 10:46:35'),
(39, 3, 10, 'eyJhbGciOiJIUzI1NiJ9.MTA.Lyl64LkjvMlh65ZOJigrcLN83IaAvvSBoL0lf9wE4fw', '{\"Enter Name\":\"efver\"}', 1, 0, 0, '2024-07-19 11:06:45', '2024-07-19 11:06:45'),
(40, 1, 7, 'eyJhbGciOiJIUzI1NiJ9.Nw.oPcxcitgP2GKjw0Oq7HXwyL3XMQMPOV6pVRD5GXM_xw', '{}', 1, 0, 0, '2024-07-19 11:40:40', '2024-07-19 11:40:40');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `user_token` text NOT NULL,
  `order_status` int(11) NOT NULL,
  `order_total` float NOT NULL,
  `user_first_name` text DEFAULT NULL,
  `user_last_name` text DEFAULT NULL,
  `user_mobile_no` bigint(20) DEFAULT NULL,
  `user_address` text NOT NULL,
  `user_pincode` varchar(255) DEFAULT NULL,
  `user_country` text DEFAULT NULL,
  `user_state` text DEFAULT NULL,
  `payment_type` text NOT NULL,
  `proceed_to_payment` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `user_token`, `order_status`, `order_total`, `user_first_name`, `user_last_name`, `user_mobile_no`, `user_address`, `user_pincode`, `user_country`, `user_state`, `payment_type`, `proceed_to_payment`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(10000, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 899, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-18 05:18:38', '2024-07-18 05:18:38'),
(10001, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 899, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-18 05:41:17', '2024-07-18 05:41:17'),
(10002, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 899, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-18 05:41:59', '2024-07-18 05:41:59'),
(10003, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 899, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-18 05:47:31', '2024-07-18 05:47:31'),
(10004, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 1798, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-18 05:53:17', '2024-07-18 05:53:17'),
(10005, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 2599, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-18 06:00:46', '2024-07-18 06:00:46'),
(10006, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 7597, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-18 07:16:05', '2024-07-18 07:16:05'),
(10007, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 1500, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-18 10:25:35', '2024-07-18 10:25:35'),
(10008, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 2301, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-18 10:29:17', '2024-07-18 10:29:17'),
(10009, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 2301, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-18 10:46:34', '2024-07-18 10:46:34'),
(10010, 5, 'eyJhbGciOiJIUzI1NiJ9.NQ._wymZ69L6NWQptYFtRomjUQ72ba74gjDltc0mDwGMro', 1, 899, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 05:02:12', '2024-07-19 05:02:12'),
(10011, 7, 'eyJhbGciOiJIUzI1NiJ9.Nw.oPcxcitgP2GKjw0Oq7HXwyL3XMQMPOV6pVRD5GXM_xw', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 05:37:43', '2024-07-19 05:37:43'),
(10012, 8, 'eyJhbGciOiJIUzI1NiJ9.OA.UsHNJA2jkD5E5GJTPtlRw6b37gR5YoWa-_l7vBfBEGc', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 05:41:47', '2024-07-19 05:41:47'),
(10013, 8, 'eyJhbGciOiJIUzI1NiJ9.OA.UsHNJA2jkD5E5GJTPtlRw6b37gR5YoWa-_l7vBfBEGc', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 05:41:48', '2024-07-19 05:41:48'),
(10014, 8, 'eyJhbGciOiJIUzI1NiJ9.OA.UsHNJA2jkD5E5GJTPtlRw6b37gR5YoWa-_l7vBfBEGc', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 05:41:51', '2024-07-19 05:41:51'),
(10015, 8, 'eyJhbGciOiJIUzI1NiJ9.OA.UsHNJA2jkD5E5GJTPtlRw6b37gR5YoWa-_l7vBfBEGc', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 05:42:04', '2024-07-19 05:42:04'),
(10016, 8, 'eyJhbGciOiJIUzI1NiJ9.OA.UsHNJA2jkD5E5GJTPtlRw6b37gR5YoWa-_l7vBfBEGc', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 05:57:06', '2024-07-19 05:57:06'),
(10017, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 10296, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 06:14:38', '2024-07-19 06:14:38'),
(10018, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 10296, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 06:18:20', '2024-07-19 06:18:20'),
(10019, 7, 'eyJhbGciOiJIUzI1NiJ9.Nw.oPcxcitgP2GKjw0Oq7HXwyL3XMQMPOV6pVRD5GXM_xw', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 06:27:27', '2024-07-19 06:27:27'),
(10020, 7, 'eyJhbGciOiJIUzI1NiJ9.Nw.oPcxcitgP2GKjw0Oq7HXwyL3XMQMPOV6pVRD5GXM_xw', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 06:40:13', '2024-07-19 06:40:13'),
(10021, 7, 'eyJhbGciOiJIUzI1NiJ9.Nw.oPcxcitgP2GKjw0Oq7HXwyL3XMQMPOV6pVRD5GXM_xw', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 06:48:54', '2024-07-19 06:48:54'),
(10022, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 10296, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 07:05:09', '2024-07-19 07:05:09'),
(10023, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 10296, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 07:08:58', '2024-07-19 07:08:58'),
(10024, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 10296, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 07:27:33', '2024-07-19 07:27:33'),
(10025, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 10296, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 07:50:27', '2024-07-19 07:50:27'),
(10026, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 10296, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 08:10:30', '2024-07-19 08:10:30'),
(10027, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 10995, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 08:16:55', '2024-07-19 08:16:55'),
(10028, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 11844, 'sad', 'edewfe', 1000000000, '164,Laxmi Nagar-1,Near Navjivan,Sarthana', '395006', 'India', 'GUJARAT', 'upi', 1, 1, 0, '2024-07-19 08:18:15', '2024-07-19 08:19:45'),
(10029, 9, 'eyJhbGciOiJIUzI1NiJ9.OQ.Q_DKxaMlmARd_-xBjEcnNQHrPxJKETvP5SCGBEfvEcY', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 08:30:45', '2024-07-19 08:30:45'),
(10030, 9, 'eyJhbGciOiJIUzI1NiJ9.OQ.Q_DKxaMlmARd_-xBjEcnNQHrPxJKETvP5SCGBEfvEcY', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 09:22:24', '2024-07-19 09:22:24'),
(10031, 9, 'eyJhbGciOiJIUzI1NiJ9.OQ.Q_DKxaMlmARd_-xBjEcnNQHrPxJKETvP5SCGBEfvEcY', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 10:17:37', '2024-07-19 10:17:37'),
(10032, 9, 'eyJhbGciOiJIUzI1NiJ9.OQ.Q_DKxaMlmARd_-xBjEcnNQHrPxJKETvP5SCGBEfvEcY', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 10:43:48', '2024-07-19 10:43:48'),
(10033, 10, 'eyJhbGciOiJIUzI1NiJ9.MTA.Lyl64LkjvMlh65ZOJigrcLN83IaAvvSBoL0lf9wE4fw', 1, 699, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 10:47:07', '2024-07-19 10:47:07'),
(10034, 10, 'eyJhbGciOiJIUzI1NiJ9.MTA.Lyl64LkjvMlh65ZOJigrcLN83IaAvvSBoL0lf9wE4fw', 1, 4893, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 10:51:00', '2024-07-19 10:51:00'),
(10035, 10, 'eyJhbGciOiJIUzI1NiJ9.MTA.Lyl64LkjvMlh65ZOJigrcLN83IaAvvSBoL0lf9wE4fw', 1, 1598, '', '', 0, '', '', '', '', '', 0, 1, 0, '2024-07-19 11:06:52', '2024-07-19 11:06:52'),
(10036, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 1, 12843, 'sad', 'edewfe', 1000000000, '164,Laxmi Nagar-1,Near Navjivan,Sarthana', '395006', 'India', 'GUJARAT', 'card', 1, 1, 0, '2024-07-19 15:02:45', '2024-07-19 15:04:04');

-- --------------------------------------------------------

--
-- Table structure for table `orderstatuses`
--

CREATE TABLE `orderstatuses` (
  `status_id` bigint(20) NOT NULL,
  `status_name` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderstatuses`
--

INSERT INTO `orderstatuses` (`status_id`, `status_name`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, 'Inprocess', 1, 0, '2024-07-18 06:38:15', '2024-07-18 06:38:15'),
(2, 'Shipped', 1, 0, '2024-07-18 06:38:23', '2024-07-18 06:38:23'),
(3, 'Delivered', 1, 0, '2024-07-18 06:38:36', '2024-07-18 06:38:36');

-- --------------------------------------------------------

--
-- Table structure for table `ordertrns`
--

CREATE TABLE `ordertrns` (
  `orderTrn_id` bigint(20) NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `mycart_id` bigint(20) NOT NULL,
  `product_modify_object` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`product_modify_object`)),
  `product_quantity` int(11) NOT NULL,
  `product_price` float NOT NULL,
  `Product_GST` float DEFAULT NULL,
  `Product_tax` float DEFAULT NULL,
  `order_coupon_code` int(11) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ordertrns`
--

INSERT INTO `ordertrns` (`orderTrn_id`, `order_id`, `product_id`, `mycart_id`, `product_modify_object`, `product_quantity`, `product_price`, `Product_GST`, `Product_tax`, `order_coupon_code`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, 10000, 3, 2, '\"{\\\"Enter Name\\\":\\\"kik\\\",\\\"Select Color\\\":{\\\"id\\\":2,\\\"color\\\":\\\"BROWN\\\"},\\\"Select Charm\\\":{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-18 05:18:38', '2024-07-18 05:18:38'),
(2, 10001, 3, 2, '\"{\\\"Enter Name\\\":\\\"kik\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-18 05:41:17', '2024-07-18 05:41:17'),
(3, 10002, 3, 2, '\"{\\\"Enter Name\\\":\\\"kik\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-18 05:41:59', '2024-07-18 05:41:59'),
(4, 10003, 3, 2, '\"{\\\"Enter Name\\\":\\\"kik\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-18 05:47:31', '2024-07-18 05:47:31'),
(5, 10004, 3, 2, '\"{\\\"Enter Name\\\":\\\"kik\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-18 05:53:17', '2024-07-18 05:53:17'),
(6, 10004, 1, 3, '\"{\\\"Enter Name\\\":\\\"viken\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-18 05:53:17', '2024-07-18 05:53:17'),
(7, 10005, 3, 2, '\"{\\\"Enter Name\\\":\\\"kik\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-18 06:00:46', '2024-07-18 06:00:46'),
(8, 10005, 1, 3, '\"{\\\"Enter Name\\\":\\\"viken\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-18 06:00:46', '2024-07-18 06:00:46'),
(9, 10005, 5, 4, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-18 06:00:46', '2024-07-18 06:00:46'),
(10, 10006, 3, 5, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-18 07:16:05', '2024-07-18 07:16:05'),
(11, 10006, 3, 6, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-18 07:16:05', '2024-07-18 07:16:05'),
(12, 10006, 3, 7, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-18 07:16:05', '2024-07-18 07:16:05'),
(13, 10006, 3, 8, '\"{\\\"Enter Name\\\":\\\"DQWD\\\",\\\"Select Color\\\":{\\\"id\\\":2,\\\"color\\\":\\\"BROWN\\\"},\\\"Select Charm\\\":{\\\"id\\\":4,\\\"charmName\\\":\\\"Plane\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-18 07:16:05', '2024-07-18 07:16:05'),
(14, 10006, 5, 9, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-18 07:16:05', '2024-07-18 07:16:05'),
(15, 10006, 5, 10, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-18 07:16:05', '2024-07-18 07:16:05'),
(16, 10006, 5, 11, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-18 07:16:05', '2024-07-18 07:16:05'),
(17, 10006, 2, 12, '\"{}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-18 07:16:05', '2024-07-18 07:16:05'),
(18, 10006, 1, 13, '\"{\\\"Enter Name\\\":\\\"sfs\\\",\\\"Select Color\\\":{\\\"id\\\":2,\\\"color\\\":\\\"BROWN\\\"},\\\"Select Charm\\\":{\\\"id\\\":10,\\\"charmName\\\":\\\"Prince\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-18 07:16:05', '2024-07-18 07:16:05'),
(19, 10007, 2, 12, '\"{}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-18 10:25:35', '2024-07-18 10:25:35'),
(20, 10007, 5, 15, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-18 10:25:35', '2024-07-18 10:25:35'),
(21, 10008, 2, 12, '\"{}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-18 10:29:17', '2024-07-18 10:29:17'),
(22, 10008, 5, 15, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-18 10:29:17', '2024-07-18 10:29:17'),
(23, 10008, 5, 16, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-18 10:29:17', '2024-07-18 10:29:17'),
(24, 10009, 2, 12, '\"{}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-18 10:46:34', '2024-07-18 10:46:34'),
(25, 10009, 5, 15, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-18 10:46:34', '2024-07-18 10:46:34'),
(26, 10009, 5, 16, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-18 10:46:34', '2024-07-18 10:46:34'),
(27, 10010, 3, 30, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 05:02:12', '2024-07-19 05:02:12'),
(28, 10011, 2, 32, '\"{}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 05:37:43', '2024-07-19 05:37:43'),
(29, 10012, 2, 33, '\"{\\\"Enter Name\\\":\\\"efsefsf\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 05:41:47', '2024-07-19 05:41:47'),
(30, 10013, 2, 33, '\"{\\\"Enter Name\\\":\\\"efsefsf\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 05:41:48', '2024-07-19 05:41:48'),
(31, 10014, 2, 33, '\"{\\\"Enter Name\\\":\\\"efsefsf\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 05:41:51', '2024-07-19 05:41:51'),
(32, 10015, 2, 33, '\"{\\\"Enter Name\\\":\\\"efsefsf\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 05:42:04', '2024-07-19 05:42:04'),
(33, 10016, 2, 33, '\"{\\\"Enter Name\\\":\\\"efsefsf\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 05:57:06', '2024-07-19 05:57:06'),
(34, 10017, 1, 22, '\"{\\\"Enter Name\\\":\\\"asdff\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 06:14:38', '2024-07-19 06:14:38'),
(35, 10017, 9, 23, '\"{}\"', 1, 5000, 0, 100, 0, 1, 0, '2024-07-19 06:14:39', '2024-07-19 06:14:39'),
(36, 10017, 3, 24, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 06:14:39', '2024-07-19 06:14:39'),
(37, 10017, 3, 25, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 06:14:39', '2024-07-19 06:14:39'),
(38, 10017, 3, 26, '\"{\\\"Enter Name\\\":\\\"lk.k.kj\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 06:14:39', '2024-07-19 06:14:39'),
(39, 10017, 5, 27, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-19 06:14:39', '2024-07-19 06:14:39'),
(40, 10017, 3, 29, '\"{\\\"Enter Name\\\":\\\"erg\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 06:14:39', '2024-07-19 06:14:39'),
(41, 10018, 1, 22, '\"{\\\"Enter Name\\\":\\\"asdff\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 06:18:20', '2024-07-19 06:18:20'),
(42, 10018, 9, 23, '\"{}\"', 1, 5000, 0, 100, 0, 1, 0, '2024-07-19 06:18:20', '2024-07-19 06:18:20'),
(43, 10018, 3, 24, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 06:18:20', '2024-07-19 06:18:20'),
(44, 10018, 3, 25, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 06:18:20', '2024-07-19 06:18:20'),
(45, 10018, 3, 26, '\"{\\\"Enter Name\\\":\\\"lk.k.kj\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 06:18:20', '2024-07-19 06:18:20'),
(46, 10018, 5, 27, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-19 06:18:20', '2024-07-19 06:18:20'),
(47, 10018, 3, 29, '\"{\\\"Enter Name\\\":\\\"erg\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 06:18:20', '2024-07-19 06:18:20'),
(48, 10019, 2, 32, '\"{}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 06:27:27', '2024-07-19 06:27:27'),
(49, 10020, 2, 32, '\"{}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 06:40:13', '2024-07-19 06:40:13'),
(50, 10021, 2, 32, '\"{}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 06:48:54', '2024-07-19 06:48:54'),
(51, 10022, 1, 22, '\"{\\\"Enter Name\\\":\\\"asdff\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:05:09', '2024-07-19 07:05:09'),
(52, 10022, 9, 23, '\"{}\"', 1, 5000, 0, 100, 0, 1, 0, '2024-07-19 07:05:09', '2024-07-19 07:05:09'),
(53, 10022, 3, 24, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:05:09', '2024-07-19 07:05:09'),
(54, 10022, 3, 25, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:05:09', '2024-07-19 07:05:09'),
(55, 10022, 3, 26, '\"{\\\"Enter Name\\\":\\\"lk.k.kj\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:05:09', '2024-07-19 07:05:09'),
(56, 10022, 5, 27, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-19 07:05:09', '2024-07-19 07:05:09'),
(57, 10022, 3, 29, '\"{\\\"Enter Name\\\":\\\"erg\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:05:09', '2024-07-19 07:05:09'),
(58, 10023, 1, 22, '\"{\\\"Enter Name\\\":\\\"asdff\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:08:58', '2024-07-19 07:08:58'),
(59, 10023, 9, 23, '\"{}\"', 1, 5000, 0, 100, 0, 1, 0, '2024-07-19 07:08:58', '2024-07-19 07:08:58'),
(60, 10023, 3, 24, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:08:58', '2024-07-19 07:08:58'),
(61, 10023, 3, 25, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:08:58', '2024-07-19 07:08:58'),
(62, 10023, 3, 26, '\"{\\\"Enter Name\\\":\\\"lk.k.kj\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:08:58', '2024-07-19 07:08:58'),
(63, 10023, 5, 27, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-19 07:08:58', '2024-07-19 07:08:58'),
(64, 10023, 3, 29, '\"{\\\"Enter Name\\\":\\\"erg\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:08:58', '2024-07-19 07:08:58'),
(65, 10024, 1, 22, '\"{\\\"Enter Name\\\":\\\"asdff\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:27:33', '2024-07-19 07:27:33'),
(66, 10024, 9, 23, '\"{}\"', 1, 5000, 0, 100, 0, 1, 0, '2024-07-19 07:27:33', '2024-07-19 07:27:33'),
(67, 10024, 3, 24, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:27:33', '2024-07-19 07:27:33'),
(68, 10024, 3, 25, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:27:33', '2024-07-19 07:27:33'),
(69, 10024, 3, 26, '\"{\\\"Enter Name\\\":\\\"lk.k.kj\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:27:33', '2024-07-19 07:27:33'),
(70, 10024, 5, 27, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-19 07:27:33', '2024-07-19 07:27:33'),
(71, 10024, 3, 29, '\"{\\\"Enter Name\\\":\\\"erg\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:27:33', '2024-07-19 07:27:33'),
(72, 10025, 1, 22, '\"{\\\"Enter Name\\\":\\\"asdff\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:50:27', '2024-07-19 07:50:27'),
(73, 10025, 9, 23, '\"{}\"', 1, 5000, 0, 100, 0, 1, 0, '2024-07-19 07:50:27', '2024-07-19 07:50:27'),
(74, 10025, 3, 24, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:50:27', '2024-07-19 07:50:27'),
(75, 10025, 3, 25, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:50:27', '2024-07-19 07:50:27'),
(76, 10025, 3, 26, '\"{\\\"Enter Name\\\":\\\"lk.k.kj\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:50:27', '2024-07-19 07:50:27'),
(77, 10025, 5, 27, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-19 07:50:27', '2024-07-19 07:50:27'),
(78, 10025, 3, 29, '\"{\\\"Enter Name\\\":\\\"erg\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 07:50:27', '2024-07-19 07:50:27'),
(79, 10026, 1, 22, '\"{\\\"Enter Name\\\":\\\"asdff\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:10:30', '2024-07-19 08:10:30'),
(80, 10026, 9, 23, '\"{}\"', 1, 5000, 0, 100, 0, 1, 0, '2024-07-19 08:10:30', '2024-07-19 08:10:30'),
(81, 10026, 3, 24, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:10:30', '2024-07-19 08:10:30'),
(82, 10026, 3, 25, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:10:30', '2024-07-19 08:10:30'),
(83, 10026, 3, 26, '\"{\\\"Enter Name\\\":\\\"lk.k.kj\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:10:30', '2024-07-19 08:10:30'),
(84, 10026, 5, 27, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-19 08:10:30', '2024-07-19 08:10:30'),
(85, 10026, 3, 29, '\"{\\\"Enter Name\\\":\\\"erg\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:10:30', '2024-07-19 08:10:30'),
(86, 10027, 1, 22, '\"{\\\"Enter Name\\\":\\\"asdff\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:16:55', '2024-07-19 08:16:55'),
(87, 10027, 9, 23, '\"{}\"', 1, 5000, 0, 100, 0, 1, 0, '2024-07-19 08:16:55', '2024-07-19 08:16:55'),
(88, 10027, 3, 24, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:16:55', '2024-07-19 08:16:55'),
(89, 10027, 3, 25, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:16:55', '2024-07-19 08:16:55'),
(90, 10027, 3, 26, '\"{\\\"Enter Name\\\":\\\"lk.k.kj\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:16:55', '2024-07-19 08:16:55'),
(91, 10027, 5, 27, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-19 08:16:55', '2024-07-19 08:16:55'),
(92, 10027, 3, 29, '\"{\\\"Enter Name\\\":\\\"erg\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:16:55', '2024-07-19 08:16:55'),
(93, 10027, 2, 34, '\"{\\\"Enter Name\\\":\\\"3erwbvhebi\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 08:16:55', '2024-07-19 08:16:55'),
(94, 10028, 1, 22, '\"{\\\"Enter Name\\\":\\\"asdff\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:18:15', '2024-07-19 08:18:15'),
(95, 10028, 9, 23, '\"{}\"', 1, 5000, 0, 100, 0, 1, 0, '2024-07-19 08:18:15', '2024-07-19 08:18:15'),
(96, 10028, 3, 24, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:18:15', '2024-07-19 08:18:15'),
(97, 10028, 3, 25, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:18:15', '2024-07-19 08:18:15'),
(98, 10028, 3, 26, '\"{\\\"Enter Name\\\":\\\"lk.k.kj\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:18:15', '2024-07-19 08:18:15'),
(99, 10028, 5, 27, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-19 08:18:15', '2024-07-19 08:18:15'),
(100, 10028, 3, 29, '\"{\\\"Enter Name\\\":\\\"erg\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 08:18:15', '2024-07-19 08:18:15'),
(101, 10028, 2, 34, '\"{\\\"Enter Name\\\":\\\"3erwbvhebi\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 08:18:15', '2024-07-19 08:18:15'),
(102, 10029, 2, 36, '\"{\\\"Enter Name\\\":\\\"fvd\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 08:30:45', '2024-07-19 08:30:45'),
(103, 10030, 2, 36, '\"{\\\"Enter Name\\\":\\\"fvd\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 09:22:24', '2024-07-19 09:22:24'),
(104, 10031, 2, 36, '\"{\\\"Enter Name\\\":\\\"fvd\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 10:17:37', '2024-07-19 10:17:37'),
(105, 10032, 2, 36, '\"{\\\"Enter Name\\\":\\\"fvd\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 10:43:48', '2024-07-19 10:43:48'),
(106, 10033, 2, 38, '\"{\\\"Enter Name\\\":\\\"ethbf\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 10:47:07', '2024-07-19 10:47:07'),
(107, 10034, 2, 38, '\"{\\\"Enter Name\\\":\\\"ethbf\\\"}\"', 7, 4893, 0, 100, 0, 1, 0, '2024-07-19 10:51:00', '2024-07-19 10:51:00'),
(108, 10035, 2, 38, '\"{\\\"Enter Name\\\":\\\"ethbf\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 11:06:52', '2024-07-19 11:06:52'),
(109, 10035, 3, 39, '\"{\\\"Enter Name\\\":\\\"efver\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 11:06:52', '2024-07-19 11:06:52'),
(110, 10036, 1, 22, '\"{\\\"Enter Name\\\":\\\"asdff\\\",\\\"Select Color\\\":{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},\\\"Select Charm\\\":{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"}}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 15:02:45', '2024-07-19 15:02:45'),
(111, 10036, 9, 23, '\"{}\"', 1, 5000, 0, 100, 0, 1, 0, '2024-07-19 15:02:45', '2024-07-19 15:02:45'),
(112, 10036, 3, 24, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 15:02:45', '2024-07-19 15:02:45'),
(113, 10036, 3, 25, '\"{}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 15:02:45', '2024-07-19 15:02:45'),
(114, 10036, 3, 26, '\"{\\\"Enter Name\\\":\\\"lk.k.kj\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 15:02:45', '2024-07-19 15:02:45'),
(115, 10036, 5, 27, '\"{}\"', 1, 801, 0, 100, 0, 1, 0, '2024-07-19 15:02:45', '2024-07-19 15:02:45'),
(116, 10036, 3, 29, '\"{\\\"Enter Name\\\":\\\"erg\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 15:02:45', '2024-07-19 15:02:45'),
(117, 10036, 2, 34, '\"{\\\"Enter Name\\\":\\\"3erwbvhebi\\\"}\"', 1, 699, 0, 100, 0, 1, 0, '2024-07-19 15:02:45', '2024-07-19 15:02:45'),
(118, 10036, 1, 35, '\"{\\\"Enter Name\\\":\\\"nhvfcgf\\\"}\"', 1, 899, 0, 100, 0, 1, 0, '2024-07-19 15:02:45', '2024-07-19 15:02:45');

-- --------------------------------------------------------

--
-- Table structure for table `productimages`
--

CREATE TABLE `productimages` (
  `productImage_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `image` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productimages`
--

INSERT INTO `productimages` (`productImage_id`, `product_id`, `image`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, 1, '1_3493852_1.png', 1, 0, '2024-07-18 03:18:04', '2024-07-18 03:18:04'),
(2, 1, '1_682606_1.png', 1, 0, '2024-07-18 03:18:04', '2024-07-18 03:18:04'),
(3, 1, '1_1642281_1.png', 1, 0, '2024-07-18 03:18:04', '2024-07-18 03:18:04'),
(4, 1, '1_8035898_1.png', 1, 0, '2024-07-18 03:18:04', '2024-07-18 03:18:04'),
(5, 1, '1_967131_1.png', 1, 0, '2024-07-18 03:18:04', '2024-07-18 03:18:04'),
(6, 2, '2_3339477_2.png', 1, 0, '2024-07-18 03:19:57', '2024-07-18 03:19:57'),
(7, 2, '2_8432304_2.png', 1, 0, '2024-07-18 03:19:57', '2024-07-18 03:19:57'),
(8, 2, '2_7979781_2.png', 1, 0, '2024-07-18 03:19:57', '2024-07-18 03:19:57'),
(9, 2, '2_7075907_2.png', 1, 0, '2024-07-18 03:19:57', '2024-07-18 03:19:57'),
(10, 2, '2_8709090_2.png', 1, 0, '2024-07-18 03:19:57', '2024-07-18 03:19:57'),
(11, 3, '3_1300257_3.png', 1, 0, '2024-07-18 03:21:37', '2024-07-18 03:21:37'),
(12, 3, '3_4314074_3.png', 1, 0, '2024-07-18 03:21:37', '2024-07-18 03:21:37'),
(13, 3, '3_6303961_3.png', 1, 0, '2024-07-18 03:21:37', '2024-07-18 03:21:37'),
(14, 3, '3_5115238_3.png', 1, 0, '2024-07-18 03:21:37', '2024-07-18 03:21:37'),
(15, 3, '3_732708_3.png', 1, 0, '2024-07-18 03:21:37', '2024-07-18 03:21:37'),
(16, 4, '4_867518_4.png', 1, 0, '2024-07-18 03:24:53', '2024-07-18 03:24:53'),
(17, 4, '4_4621219_4.png', 1, 0, '2024-07-18 03:24:53', '2024-07-18 03:24:53'),
(18, 4, '4_8620593_4.png', 1, 0, '2024-07-18 03:24:53', '2024-07-18 03:24:53'),
(19, 4, '4_2677181_4.png', 1, 0, '2024-07-18 03:24:53', '2024-07-18 03:24:53'),
(20, 4, '4_112047_4.png', 1, 0, '2024-07-18 03:24:53', '2024-07-18 03:24:53'),
(21, 5, '5_9604428_5.png', 1, 0, '2024-07-18 03:26:29', '2024-07-18 03:26:29'),
(22, 5, '5_6384525_5.png', 1, 0, '2024-07-18 03:26:29', '2024-07-18 03:26:29'),
(23, 5, '5_7766296_5.png', 1, 0, '2024-07-18 03:26:29', '2024-07-18 03:26:29'),
(24, 5, '5_9694795_5.png', 1, 0, '2024-07-18 03:26:29', '2024-07-18 03:26:29'),
(25, 5, '5_8613405_5.png', 1, 0, '2024-07-18 03:26:29', '2024-07-18 03:26:29'),
(26, 6, '6_3875262_6.png', 1, 0, '2024-07-18 03:32:02', '2024-07-18 03:32:02'),
(27, 6, '6_3810838_6.png', 1, 0, '2024-07-18 03:32:02', '2024-07-18 03:32:02'),
(28, 6, '6_6338021_6.png', 1, 0, '2024-07-18 03:32:02', '2024-07-18 03:32:02'),
(29, 6, '6_8043133_6.png', 1, 0, '2024-07-18 03:32:02', '2024-07-18 03:32:02'),
(30, 6, '6_4168834_6.png', 1, 0, '2024-07-18 03:32:02', '2024-07-18 03:32:02'),
(31, 7, '7_7793816_7.png', 1, 0, '2024-07-18 03:34:24', '2024-07-18 03:34:24'),
(32, 7, '7_2739858_7.png', 1, 0, '2024-07-18 03:34:24', '2024-07-18 03:34:24'),
(33, 7, '7_3080047_7.png', 1, 0, '2024-07-18 03:34:24', '2024-07-18 03:34:24'),
(34, 7, '7_5223351_7.png', 1, 0, '2024-07-18 03:34:24', '2024-07-18 03:34:24'),
(35, 7, '7_5618166_7.png', 1, 0, '2024-07-18 03:34:24', '2024-07-18 03:34:24'),
(36, 8, '8_586152_8.png', 1, 0, '2024-07-18 03:38:01', '2024-07-18 03:38:01'),
(37, 8, '8_4425523_8.png', 1, 0, '2024-07-18 03:38:01', '2024-07-18 03:38:01'),
(38, 8, '8_4910233_8.png', 1, 0, '2024-07-18 03:38:01', '2024-07-18 03:38:01'),
(39, 8, '8_3255821_8.png', 1, 0, '2024-07-18 03:38:01', '2024-07-18 03:38:01'),
(40, 8, '8_6413182_8.png', 1, 0, '2024-07-18 03:38:01', '2024-07-18 03:38:01'),
(41, 9, '9_8120080_9.png', 1, 0, '2024-07-18 07:35:30', '2024-07-18 07:35:30'),
(42, 9, '9_8987180_9.png', 1, 0, '2024-07-18 07:35:30', '2024-07-18 07:35:30'),
(43, 9, '9_7556939_9.png', 1, 0, '2024-07-18 07:35:30', '2024-07-18 07:35:30'),
(44, 9, '9_5657167_9.png', 1, 0, '2024-07-18 07:35:31', '2024-07-18 07:35:31'),
(45, 9, '9_6533852_9.png', 1, 0, '2024-07-18 07:35:31', '2024-07-18 07:35:31'),
(46, 10, '10_9863666_10.png', 1, 0, '2024-07-18 09:06:15', '2024-07-18 09:06:15'),
(47, 10, '10_5051440_10.png', 1, 0, '2024-07-18 09:06:15', '2024-07-18 09:06:15'),
(48, 10, '10_4603955_10.png', 1, 0, '2024-07-18 09:06:15', '2024-07-18 09:06:15'),
(49, 10, '10_821777_10.png', 1, 0, '2024-07-18 09:06:15', '2024-07-18 09:06:15'),
(50, 10, '10_4988109_10.png', 1, 0, '2024-07-18 09:06:15', '2024-07-18 09:06:15'),
(51, 11, '11_3786252_11.png', 1, 0, '2024-07-19 12:54:17', '2024-07-19 12:54:17'),
(52, 11, '11_8224574_11.png', 1, 0, '2024-07-19 12:54:17', '2024-07-19 12:54:17'),
(53, 11, '11_1138403_11.png', 1, 0, '2024-07-19 12:54:18', '2024-07-19 12:54:18');

-- --------------------------------------------------------

--
-- Table structure for table `productreviews`
--

CREATE TABLE `productreviews` (
  `review_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `rating` int(11) NOT NULL,
  `admin_rating` int(11) NOT NULL DEFAULT 0,
  `review_text` text DEFAULT NULL,
  `is_testimonials` tinyint(1) DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productreviews`
--

INSERT INTO `productreviews` (`review_id`, `product_id`, `user_id`, `rating`, `admin_rating`, `review_text`, `is_testimonials`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, 6, 3, 0, 0, 'nmhjmh', 1, 1, 0, '2024-07-18 04:38:13', '2024-07-18 12:56:38'),
(2, 2, 3, 5, 0, 'vfdfds', 1, 1, 0, '2024-07-18 04:39:39', '2024-07-18 12:56:37'),
(3, 5, 7, 2, 0, 'edr43r', 0, 1, 0, '2024-07-19 08:54:54', '2024-07-19 08:55:14'),
(4, 2, 10, 2, 0, 'etrhfb', 0, 1, 0, '2024-07-19 10:46:26', '2024-07-19 10:46:26'),
(5, 3, 10, 3, 0, 'aaaaaaaaaaaaaaaaaa', 0, 1, 0, '2024-07-19 11:04:50', '2024-07-19 11:06:37'),
(6, 1, 7, 3, 0, 'gfbdfhtehygty', 0, 1, 0, '2024-07-19 12:13:34', '2024-07-19 12:13:56'),
(7, 4, 7, 3, 0, 'vfgtrtefvgrtvgtr', 0, 1, 0, '2024-07-19 12:17:01', '2024-07-19 12:17:19');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` bigint(20) NOT NULL,
  `product_name` text NOT NULL,
  `product_description` text DEFAULT NULL,
  `product_price` float NOT NULL,
  `GST` float DEFAULT NULL,
  `Product_tax` float DEFAULT NULL,
  `product_discount` float DEFAULT NULL,
  `product_discount_price` float DEFAULT NULL,
  `product_video` text DEFAULT NULL,
  `shipping_charge` float DEFAULT NULL,
  `product_category` int(11) NOT NULL,
  `product_modify_object` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`product_modify_object`)),
  `product_view` int(11) DEFAULT 0,
  `product_quantity` int(11) DEFAULT 0,
  `admin_topview` int(11) NOT NULL DEFAULT 0,
  `admin_bestselling` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `product_description`, `product_price`, `GST`, `Product_tax`, `product_discount`, `product_discount_price`, `product_video`, `shipping_charge`, `product_category`, `product_modify_object`, `product_view`, `product_quantity`, `admin_topview`, `admin_bestselling`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, 'PERSONALISED CLASSIC TOTE BAG', 'WORK SAVE TRAVEL REPEAT', 1199, 0, 250, 300, 899, '1_4089269_1.mp4', 250, 1, '\"{\\\"Enter Name\\\":\\\"Text\\\",\\\"Select Color\\\":[{\\\"id\\\":1,\\\"color\\\":\\\"BLACK\\\"},{\\\"id\\\":2,\\\"color\\\":\\\"BROWN\\\"},{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},{\\\"id\\\":4,\\\"color\\\":\\\"BLUE\\\"}],\\\"Select Charm\\\":[{\\\"id\\\":1,\\\"charmName\\\":\\\"Dog\\\"},{\\\"id\\\":3,\\\"charmName\\\":\\\"Camera\\\"},{\\\"id\\\":4,\\\"charmName\\\":\\\"Plane\\\"},{\\\"id\\\":5,\\\"charmName\\\":\\\"Scooter\\\"},{\\\"id\\\":6,\\\"charmName\\\":\\\"King\\\"},{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"},{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"},{\\\"id\\\":9,\\\"charmName\\\":\\\"Queen\\\"},{\\\"id\\\":10,\\\"charmName\\\":\\\"Prince\\\"},{\\\"id\\\":11,\\\"charmName\\\":\\\"Cycle\\\"}]}\"', 49, 27, 1, 1, 1, 0, '2024-07-18 03:18:04', '2024-07-18 03:18:04'),
(2, 'PERSONALISED CLASSIC', 'EXCLUSIVE PASSPORT COVER', 1199, 0, 250, 500, 699, '2_3763303_2.mp4', 250, 1, '\"{\\\"Enter Name\\\":\\\"Text\\\",\\\"Select Color\\\":[{\\\"id\\\":1,\\\"color\\\":\\\"BLACK\\\"},{\\\"id\\\":2,\\\"color\\\":\\\"BROWN\\\"},{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},{\\\"id\\\":4,\\\"color\\\":\\\"BLUE\\\"}],\\\"Select Charm\\\":[{\\\"id\\\":1,\\\"charmName\\\":\\\"Dog\\\"},{\\\"id\\\":3,\\\"charmName\\\":\\\"Camera\\\"},{\\\"id\\\":4,\\\"charmName\\\":\\\"Plane\\\"},{\\\"id\\\":5,\\\"charmName\\\":\\\"Scooter\\\"},{\\\"id\\\":6,\\\"charmName\\\":\\\"King\\\"},{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"},{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"},{\\\"id\\\":9,\\\"charmName\\\":\\\"Queen\\\"},{\\\"id\\\":10,\\\"charmName\\\":\\\"Prince\\\"},{\\\"id\\\":11,\\\"charmName\\\":\\\"Cycle\\\"}]}\"', 52, 28, 1, 1, 1, 0, '2024-07-18 03:19:57', '2024-07-18 03:19:57'),
(3, 'PERSONALISED', 'PASSPORT COVER - I DON\'T CATCH FEELINGS I CATCH FLIGHTS', 1199, 0, 250, 300, 899, '3_6303759_3.mp4', 250, 1, '\"{\\\"Enter Name\\\":\\\"Text\\\",\\\"Select Color\\\":[{\\\"id\\\":1,\\\"color\\\":\\\"BLACK\\\"},{\\\"id\\\":2,\\\"color\\\":\\\"BROWN\\\"},{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},{\\\"id\\\":4,\\\"color\\\":\\\"BLUE\\\"}],\\\"Select Charm\\\":[{\\\"id\\\":1,\\\"charmName\\\":\\\"Dog\\\"},{\\\"id\\\":3,\\\"charmName\\\":\\\"Camera\\\"},{\\\"id\\\":4,\\\"charmName\\\":\\\"Plane\\\"},{\\\"id\\\":5,\\\"charmName\\\":\\\"Scooter\\\"},{\\\"id\\\":6,\\\"charmName\\\":\\\"King\\\"},{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"},{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"},{\\\"id\\\":9,\\\"charmName\\\":\\\"Queen\\\"},{\\\"id\\\":10,\\\"charmName\\\":\\\"Prince\\\"},{\\\"id\\\":11,\\\"charmName\\\":\\\"Cycle\\\"}]}\"', 81, 22, 1, 1, 1, 0, '2024-07-18 03:21:37', '2024-07-18 03:21:37'),
(4, 'ROAD TRIPPING', 'EXCLUSIVE PASSPORT COVER - ROAD TRIPPING', 999, 0, 250, 300, 699, '4_6281108_4.mp4', 250, 1, '\"{\\\"Enter Name\\\":\\\"Text\\\",\\\"Select Color\\\":[{\\\"id\\\":1,\\\"color\\\":\\\"BLACK\\\"},{\\\"id\\\":2,\\\"color\\\":\\\"BROWN\\\"},{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},{\\\"id\\\":4,\\\"color\\\":\\\"BLUE\\\"}],\\\"Select Charm\\\":[{\\\"id\\\":1,\\\"charmName\\\":\\\"Dog\\\"},{\\\"id\\\":3,\\\"charmName\\\":\\\"Camera\\\"},{\\\"id\\\":4,\\\"charmName\\\":\\\"Plane\\\"},{\\\"id\\\":5,\\\"charmName\\\":\\\"Scooter\\\"},{\\\"id\\\":6,\\\"charmName\\\":\\\"King\\\"},{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"},{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"},{\\\"id\\\":9,\\\"charmName\\\":\\\"Queen\\\"},{\\\"id\\\":10,\\\"charmName\\\":\\\"Prince\\\"},{\\\"id\\\":11,\\\"charmName\\\":\\\"Cycle\\\"}]}\"', 35, 30, 1, 1, 1, 0, '2024-07-18 03:24:53', '2024-07-18 03:24:53'),
(5, 'COMPASSIONATE CANCER', 'EXCLUSIVE PASSPORT COVER - COMPASSIONATE CANCER', 1199, 0, 250, 398, 801, '5_8196592_5.mp4', 250, 1, '\"{\\\"Enter Name\\\":\\\"Text\\\",\\\"Select Color\\\":[{\\\"id\\\":1,\\\"color\\\":\\\"BLACK\\\"},{\\\"id\\\":2,\\\"color\\\":\\\"BROWN\\\"},{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},{\\\"id\\\":4,\\\"color\\\":\\\"BLUE\\\"}],\\\"Select Charm\\\":[{\\\"id\\\":1,\\\"charmName\\\":\\\"Dog\\\"},{\\\"id\\\":3,\\\"charmName\\\":\\\"Camera\\\"},{\\\"id\\\":4,\\\"charmName\\\":\\\"Plane\\\"},{\\\"id\\\":5,\\\"charmName\\\":\\\"Scooter\\\"},{\\\"id\\\":6,\\\"charmName\\\":\\\"King\\\"},{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"},{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"},{\\\"id\\\":9,\\\"charmName\\\":\\\"Queen\\\"},{\\\"id\\\":10,\\\"charmName\\\":\\\"Prince\\\"},{\\\"id\\\":11,\\\"charmName\\\":\\\"Cycle\\\"}]}\"', 136, 28, 1, 1, 1, 0, '2024-07-18 03:26:29', '2024-07-18 03:26:29'),
(6, 'SPECTACULAR SCORPIO', 'EXCLUSIVE PASSPORT COVER - SPECTACULAR SCORPIO', 1199, 0, 250, 400, 799, '6_2045233_6.mp4', 250, 1, '\"{\\\"Enter Name\\\":\\\"Text\\\",\\\"Select Color\\\":[{\\\"id\\\":1,\\\"color\\\":\\\"BLACK\\\"},{\\\"id\\\":2,\\\"color\\\":\\\"BROWN\\\"},{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},{\\\"id\\\":4,\\\"color\\\":\\\"BLUE\\\"}],\\\"Select Charm\\\":[{\\\"id\\\":1,\\\"charmName\\\":\\\"Dog\\\"},{\\\"id\\\":3,\\\"charmName\\\":\\\"Camera\\\"},{\\\"id\\\":4,\\\"charmName\\\":\\\"Plane\\\"},{\\\"id\\\":5,\\\"charmName\\\":\\\"Scooter\\\"},{\\\"id\\\":6,\\\"charmName\\\":\\\"King\\\"},{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"},{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"},{\\\"id\\\":9,\\\"charmName\\\":\\\"Queen\\\"},{\\\"id\\\":10,\\\"charmName\\\":\\\"Prince\\\"},{\\\"id\\\":11,\\\"charmName\\\":\\\"Cycle\\\"}]}\"', 4, 30, 1, 1, 1, 0, '2024-07-18 03:32:02', '2024-07-18 03:32:02'),
(7, 'BACKPACKER', 'EXCLUSIVE PASSPORT COVER - BACKPACKER', 1199, 0, 250, 400, 799, '7_4179397_7.mp4', 250, 1, '\"{\\\"Enter Name\\\":\\\"Text\\\",\\\"Select Color\\\":[{\\\"id\\\":1,\\\"color\\\":\\\"BLACK\\\"},{\\\"id\\\":2,\\\"color\\\":\\\"BROWN\\\"},{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},{\\\"id\\\":4,\\\"color\\\":\\\"BLUE\\\"}],\\\"Select Charm\\\":[{\\\"id\\\":1,\\\"charmName\\\":\\\"Dog\\\"},{\\\"id\\\":3,\\\"charmName\\\":\\\"Camera\\\"},{\\\"id\\\":4,\\\"charmName\\\":\\\"Plane\\\"},{\\\"id\\\":5,\\\"charmName\\\":\\\"Scooter\\\"},{\\\"id\\\":6,\\\"charmName\\\":\\\"King\\\"},{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"},{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"},{\\\"id\\\":9,\\\"charmName\\\":\\\"Queen\\\"},{\\\"id\\\":10,\\\"charmName\\\":\\\"Prince\\\"},{\\\"id\\\":11,\\\"charmName\\\":\\\"Cycle\\\"}]}\"', 0, 30, 1, 0, 1, 0, '2024-07-18 03:34:24', '2024-07-18 03:34:24'),
(8, 'ROAD RUSH', 'EXCLUSIVE PASSPORT COVER - ROAD RUSH', 999, 0, 250, 300, 699, '8_6888341_8.mp4', 250, 1, '\"{\\\"Enter Name\\\":\\\"Text\\\",\\\"Select Color\\\":[{\\\"id\\\":1,\\\"color\\\":\\\"BLACK\\\"},{\\\"id\\\":2,\\\"color\\\":\\\"BROWN\\\"},{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},{\\\"id\\\":4,\\\"color\\\":\\\"BLUE\\\"}],\\\"Select Charm\\\":[{\\\"id\\\":1,\\\"charmName\\\":\\\"Dog\\\"},{\\\"id\\\":3,\\\"charmName\\\":\\\"Camera\\\"},{\\\"id\\\":4,\\\"charmName\\\":\\\"Plane\\\"},{\\\"id\\\":5,\\\"charmName\\\":\\\"Scooter\\\"},{\\\"id\\\":6,\\\"charmName\\\":\\\"King\\\"},{\\\"id\\\":7,\\\"charmName\\\":\\\"Cat\\\"},{\\\"id\\\":8,\\\"charmName\\\":\\\"Model\\\"},{\\\"id\\\":9,\\\"charmName\\\":\\\"Queen\\\"},{\\\"id\\\":10,\\\"charmName\\\":\\\"Prince\\\"},{\\\"id\\\":11,\\\"charmName\\\":\\\"Cycle\\\"}]}\"', 0, 30, 0, 0, 1, 0, '2024-07-18 03:38:01', '2024-07-18 07:25:01'),
(9, 'PERSONALIZED COUPLE PASSPORT COVER', 'Made to cater to your instincts, you and your partner won\'t have to think twice while using the classic couple edition passport holder. With a slide-in passport section and easy to slip in your pocket or in your handbag, the holder is as simple as it should be.\r\n- Synthetic leather/ Vegan leather\r\n- Contains 2 passport holders.\r\n- Each passport cover can hold only one passport.\r\n- Price includes name personalisation\r\n- Dimensions: 5.5”x 3.8”', 999, 5, 0, 1499, 5000, '9_2306238_9.mp4', 49, 1, '\"{\\\"Passport Cover - Color*\\\":[{\\\"id\\\":1,\\\"color\\\":\\\"BLACK\\\"},{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},{\\\"id\\\":4,\\\"color\\\":\\\"BLUE\\\"}],\\\"Passport Cover 1 - Name\\\":\\\"Text\\\"}\"', 7, 198, 1, 0, 1, 0, '2024-07-18 07:35:30', '2024-07-18 07:35:30'),
(10, 'THE WORLD IS OURS - PERSONA', 'gfhngn', 4, 0, 45, 564, 56000, '10_4015368_10.mp4', 454, 1, '\"{\\\"dsfvds\\\":[{\\\"id\\\":2,\\\"color\\\":\\\"BROWN\\\"},{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"}]}\"', 3, 545, 0, 0, 1, 0, '2024-07-18 09:06:15', '2024-07-18 09:06:15'),
(11, 'Addd', 'fdsfd', 546, 0, 4545, 6456, -5910, '11_9635226_11.mp4', 4545, 2, '\"{\\\"Add Name\\\":\\\"Text\\\",\\\"Add Color\\\":[{\\\"id\\\":2,\\\"color\\\":\\\"BROWN\\\"},{\\\"id\\\":1,\\\"color\\\":\\\"BLACK\\\"},{\\\"id\\\":3,\\\"color\\\":\\\"MARUN\\\"},{\\\"id\\\":4,\\\"color\\\":\\\"BLUE\\\"}]}\"', 0, 45, 0, 0, 1, 0, '2024-07-19 12:54:17', '2024-07-19 12:54:17');

-- --------------------------------------------------------

--
-- Table structure for table `subscriptionemails`
--

CREATE TABLE `subscriptionemails` (
  `email_id` bigint(20) NOT NULL,
  `user_email` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `user_token` text DEFAULT NULL,
  `user_first_name` text DEFAULT NULL,
  `user_last_name` text DEFAULT NULL,
  `user_email` text NOT NULL,
  `user_profile_photo` text DEFAULT NULL,
  `user_mobile_no` bigint(20) DEFAULT NULL,
  `user_password` text NOT NULL,
  `user_address` text DEFAULT NULL,
  `user_pincode` varchar(255) DEFAULT NULL,
  `user_country` text DEFAULT NULL,
  `user_state` text DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `auth_token` text DEFAULT NULL,
  `verify_email_code` varchar(255) DEFAULT NULL,
  `is_logged_out` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_token`, `user_first_name`, `user_last_name`, `user_email`, `user_profile_photo`, `user_mobile_no`, `user_password`, `user_address`, `user_pincode`, `user_country`, `user_state`, `is_admin`, `auth_token`, `verify_email_code`, `is_logged_out`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, 'eyJhbGciOiJIUzI1NiJ9.MQ.GhIyuC5Taizd1MU7NWdUM_k-wIaSP6N_pHUMXU8dxVY', 'Admin', 'Admin', 'Admin@gmail.com', NULL, 1234567890, '$2a$10$tyMWU.s9s1NL3bw3l5N5M.TzfkU3gJ/atnIsPdY2A8TMbY1uRSGCu', NULL, NULL, NULL, NULL, 1, '1zI2kpp1n41h941b467950FolrG2a67umv9co62gA31IedEpe0ra0F36xEj1wr2DD1w7i88mlCAtsqjbkqaubxcy0CB55nyst9do7HGank3cfkqr8lbdvodcgpjsqB48n5imjh3msHzfl1', NULL, 0, 1, 0, '2024-07-18 02:49:33', '2024-07-18 02:49:33'),
(2, 'eyJhbGciOiJIUzI1NiJ9.Mg.aOzXb1sZ3dxThOGH8woO-6SQ4zluRkxZjvMD5Wgz75I', 'shruti', 'goyani', 'shruti@gmail.com', NULL, 1234567890, '$2a$10$aQuEAv0zOZEP/NE/iq36nOrGX5Mta7m7KWWawfdLoqbQDHTPVHal6', NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 0, 0, '2024-07-18 03:36:10', '2024-07-18 03:36:10'),
(3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 'sad', 'edewfe', 'vikenlakkad970@gmail.com', 'http://192.168.1.12:4000/src/images/profileimage/3_8181841_3.png', 1000000000, '$2a$10$xfBcWBJxChYLu4movCSwBOjny6fvmUi1VSqJtrA.ilzE7k2gW/2qG', '164,Laxmi Nagar-1,Near Navjivan,Sarthana', '395006', 'India', 'GUJARAT', 0, '3b11G1q4Id2728blaBkxEqk8omd2hsynjpmd3z97s4aucg9536vre1p089A6osijcq6gdnrc5w7kCHhoa8mF1Ctjbc4r04sej5B7yAmitGznlE9bFk6v5DH0fq2p01ollnauI3xfwDrp33', '3036', 0, 1, 0, '2024-07-18 03:47:52', '2024-07-19 04:53:43'),
(4, 'eyJhbGciOiJIUzI1NiJ9.NA.93Y7B4Na3o2CT559MV37fYsDYWQ4qpfCSWM9XXKkmWU', 'shruti', 'goyani', 'shruti123@gmail.com', NULL, 1234567890, '$2a$10$nnBsv8/eMhuXoG.Lu.2qTOmliWOoD9jrL0sjzw7KdaMcx9CjPgona', NULL, NULL, NULL, NULL, 0, '4EzBl0ng0s3zIH4gk5juwrjve2iCAcrHym9m1idcGb90d7np5vxBkj4o3oI2t5bhecf4FCF8pE7qGoo924a6sdals61f1lk1n8rty2q1sD5lh7nm7cmAbqwj6udra3Db0pa93kp61q88x4', NULL, 0, 1, 0, '2024-07-19 04:12:57', '2024-07-19 04:12:57'),
(5, 'eyJhbGciOiJIUzI1NiJ9.NQ._wymZ69L6NWQptYFtRomjUQ72ba74gjDltc0mDwGMro', 'shruti', 'goyani', 'shruti1234@gmail.com', NULL, 1234567890, '$2a$10$ms9PfzspasvzN9bSfFZmiOnElHfSdokkZWYPDn3vpvBhwu4rRPRwe', NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 0, 0, '2024-07-19 04:50:29', '2024-07-19 04:50:29'),
(6, 'eyJhbGciOiJIUzI1NiJ9.Ng.7HeXBHkIzTepR2lCDCqpMJWt3FHVmt8eEQeidGKhviY', 'viken', 'lakkad', 'viken@gmail.com', NULL, 1234567890, '$2a$10$frnS4NCOLBPPIyMbd34cNe1fcnonXa5TYgbGdrNQzO3dsHBVDtcCO', NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 0, 0, '2024-07-19 04:53:43', '2024-07-19 04:53:43'),
(7, 'eyJhbGciOiJIUzI1NiJ9.Nw.oPcxcitgP2GKjw0Oq7HXwyL3XMQMPOV6pVRD5GXM_xw', 'shruti11', 'goyani1', 'shruti111@gmail.com', NULL, 1234567890, '$2a$10$HG6Gcg3LLCt2giCJXN3rNeeVNC4GQlOI.rm7z5fIYUyAtoYg87o5i', NULL, NULL, NULL, NULL, 0, NULL, NULL, 1, 0, 0, '2024-07-19 05:35:22', '2024-07-19 05:35:22'),
(8, 'eyJhbGciOiJIUzI1NiJ9.OA.UsHNJA2jkD5E5GJTPtlRw6b37gR5YoWa-_l7vBfBEGc', 'Dhruv', 'jj,', 'webeke8671@oniecan.com', NULL, 7862902342, '$2a$10$IBSFMkkWiMr1rnSQFacmuOErRrnTUyxU7rm5w8SX14n7qAr8LFMb2', NULL, NULL, NULL, NULL, 0, '8EpD7lw36a8tAe9fbh21o00493Aaamd6p2bnpyciigb4omdk7kcfnq11rrjcjnkm3e5g8hd9csCn9zByv7s1q5EFpj0qrHxI82s5lG7lurk2CvGBI1lzm6jD0Fouqdtxb43wH54a1so868', NULL, 0, 1, 0, '2024-07-19 05:38:55', '2024-07-19 05:38:55'),
(9, 'eyJhbGciOiJIUzI1NiJ9.OQ.Q_DKxaMlmARd_-xBjEcnNQHrPxJKETvP5SCGBEfvEcY', 'naitik', 'gondaliya', 'naitik56@gmail.com', NULL, 1234567890, '$2a$10$x1kByg3yy.C1vHuLIqbxeus59KrtMy31rlOFUumnP5uYP9m6mRt5a', NULL, NULL, NULL, NULL, 0, '9e49fyrx1rdd7CcBn405v01FiG82jlbA66oBlm8qu3owclpnIbf33859b2skz1ldnAmp7kdhoqE5eHjhocpqFc1s9taki78201myqn4g6ms7Cs3avDjrpa9uwDxG6Ib02zaj4k15EHtgr9', NULL, 0, 1, 0, '2024-07-19 08:27:57', '2024-07-19 08:27:57'),
(10, 'eyJhbGciOiJIUzI1NiJ9.MTA.Lyl64LkjvMlh65ZOJigrcLN83IaAvvSBoL0lf9wE4fw', 'Dhruv', 'Siddhapara', 'dhruv@gmail.com', NULL, 1234567890, '$2a$10$fvnFqI38dLRkgf7Se7h45ex1SmxP/ZENEBesAzsDF5C2vcEcIBONO', NULL, NULL, NULL, NULL, 0, '10a155dpDrniu4qpt37AsEk6hmr12pjtlm3xuf5dqpk6C191nFs06kBjw426o0aj7Hhk8yb1c4Bi3cCGGIn0b5q9esqDzzflb78odly2Er8gA0b1cmn4sj3oaHcFI2gvavml7xe89word910', NULL, 0, 1, 0, '2024-07-19 10:39:52', '2024-07-19 10:39:52'),
(11, 'eyJhbGciOiJIUzI1NiJ9.MTE.tMEGQ8-PSSKgZ1rvty2czNwn58faeuHXfNIQmajwYqU', 'sagar', 'pansuriya', 'sagar56@gmail.com', NULL, 1234567890, '$2a$10$ZWpX8KOHIdsqjASJdq4QdugN7Yr/ZKP0OgeI8X5btJnTDf2fkR9IK', NULL, NULL, NULL, NULL, 0, '11mp80o9ctEuqBnhnkgy6x29l6D28FclxrIeo4zk82aFj1C17sD3bo05ybnl74kpC5rphIwjw4fa5ac4f1bvp1z33eB1i0jdGA2Hicm918nkA7svqgs60dmqr9rad3tduH6jbGqmo5E7sl11', NULL, 0, 1, 0, '2024-07-20 05:45:40', '2024-07-23 04:47:09');

-- --------------------------------------------------------

--
-- Table structure for table `user_adresses`
--

CREATE TABLE `user_adresses` (
  `user_adress_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `user_token` text DEFAULT NULL,
  `user_first_name` text DEFAULT NULL,
  `user_last_name` text DEFAULT NULL,
  `user_mobile_no` bigint(20) DEFAULT NULL,
  `user_address` text DEFAULT NULL,
  `user_pincode` varchar(255) DEFAULT NULL,
  `user_country` text DEFAULT NULL,
  `user_state` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_deleted` tinyint(1) NOT NULL DEFAULT 0,
  `created_date` datetime NOT NULL,
  `updated_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_adresses`
--

INSERT INTO `user_adresses` (`user_adress_id`, `user_id`, `user_token`, `user_first_name`, `user_last_name`, `user_mobile_no`, `user_address`, `user_pincode`, `user_country`, `user_state`, `is_active`, `is_deleted`, `created_date`, `updated_date`) VALUES
(1, 3, 'eyJhbGciOiJIUzI1NiJ9.Mw.KguheLZ3MhlV3wlm9c0YWMBh4Lyp-BQ4hzcL_NXtaN0', 'Srushti', 'Goyani', 1234567890, 'fhnd', '395006', 'India', 'gujrat', 1, 0, '2024-07-18 07:19:04', '2024-07-18 07:19:04'),
(2, 7, 'eyJhbGciOiJIUzI1NiJ9.Nw.oPcxcitgP2GKjw0Oq7HXwyL3XMQMPOV6pVRD5GXM_xw', 'sad', 'dscscd', 7862902342, 'zxcsc', '395006', 'India', 'gujrat', 1, 0, '2024-07-19 06:39:49', '2024-07-19 06:39:49');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `charms`
--
ALTER TABLE `charms`
  ADD PRIMARY KEY (`charm_id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`color_id`);

--
-- Indexes for table `contactpages`
--
ALTER TABLE `contactpages`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indexes for table `couponcards`
--
ALTER TABLE `couponcards`
  ADD PRIMARY KEY (`couponCard_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `mycarts`
--
ALTER TABLE `mycarts`
  ADD PRIMARY KEY (`mycart_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `orderstatuses`
--
ALTER TABLE `orderstatuses`
  ADD PRIMARY KEY (`status_id`);

--
-- Indexes for table `ordertrns`
--
ALTER TABLE `ordertrns`
  ADD PRIMARY KEY (`orderTrn_id`);

--
-- Indexes for table `productimages`
--
ALTER TABLE `productimages`
  ADD PRIMARY KEY (`productImage_id`);

--
-- Indexes for table `productreviews`
--
ALTER TABLE `productreviews`
  ADD PRIMARY KEY (`review_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `subscriptionemails`
--
ALTER TABLE `subscriptionemails`
  ADD PRIMARY KEY (`email_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_adresses`
--
ALTER TABLE `user_adresses`
  ADD PRIMARY KEY (`user_adress_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `charms`
--
ALTER TABLE `charms`
  MODIFY `charm_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `color_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `contactpages`
--
ALTER TABLE `contactpages`
  MODIFY `contact_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `couponcards`
--
ALTER TABLE `couponcards`
  MODIFY `couponCard_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `image_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `mycarts`
--
ALTER TABLE `mycarts`
  MODIFY `mycart_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10037;

--
-- AUTO_INCREMENT for table `orderstatuses`
--
ALTER TABLE `orderstatuses`
  MODIFY `status_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `ordertrns`
--
ALTER TABLE `ordertrns`
  MODIFY `orderTrn_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT for table `productimages`
--
ALTER TABLE `productimages`
  MODIFY `productImage_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `productreviews`
--
ALTER TABLE `productreviews`
  MODIFY `review_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `subscriptionemails`
--
ALTER TABLE `subscriptionemails`
  MODIFY `email_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `user_adresses`
--
ALTER TABLE `user_adresses`
  MODIFY `user_adress_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
