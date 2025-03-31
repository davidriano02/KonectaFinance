-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-03-2025 a las 19:39:56
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `financial_bank`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `product` enum('Consumer Credit','Payroll Loan','Credit Card') NOT NULL,
  `requested_quota` varchar(20) NOT NULL,
  `franchise` enum('AMEX','VISA','MASTERCARD') DEFAULT NULL,
  `rate` decimal(4,2) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `product`, `requested_quota`, `franchise`, `rate`, `userId`, `createdAt`, `updatedAt`) VALUES
(82, 'Consumer Credit', '5000', 'VISA', 5.00, 4, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(83, 'Payroll Loan', '3000', 'AMEX', 7.50, 2, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(84, 'Consumer Credit', '2000', 'MASTERCARD', 10.00, 3, '2025-03-31 02:54:35', '2025-03-31 16:57:14'),
(85, 'Consumer Credit', '7000', 'VISA', 6.00, 4, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(86, 'Payroll Loan', '4000', 'AMEX', 8.00, 5, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(87, 'Credit Card', '1000', 'AMEX', 0.00, 3, '2025-03-31 02:54:35', '2025-03-31 17:04:46'),
(88, 'Consumer Credit', '6000', 'VISA', 5.50, 7, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(89, 'Payroll Loan', '3500', 'AMEX', 7.20, 8, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(90, 'Credit Card', '2500', 'MASTERCARD', 8.50, 9, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(91, 'Consumer Credit', '8000', 'VISA', 6.20, 10, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(92, 'Payroll Loan', '4500', 'AMEX', 7.80, 11, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(93, 'Credit Card', '1500', 'MASTERCARD', 9.50, 12, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(94, 'Consumer Credit', '5500', 'VISA', 5.70, 13, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(95, 'Payroll Loan', '3600', 'AMEX', 7.30, 14, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(96, 'Credit Card', '1800', 'MASTERCARD', 9.10, 15, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(97, 'Consumer Credit', '6500', 'VISA', 6.10, 16, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(98, 'Payroll Loan', '3800', 'AMEX', 7.60, 17, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(99, 'Credit Card', '2200', 'MASTERCARD', 8.80, 18, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(100, 'Consumer Credit', '7500', 'VISA', 6.30, 19, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(101, 'Payroll Loan', '4200', 'AMEX', 7.90, 3, '2025-03-31 02:54:35', '2025-03-31 02:54:35'),
(102, 'Credit Card', '1800', 'MASTERCARD', 9.10, 2, '2025-03-31 02:54:35', '2025-03-31 02:54:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `Id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `userType` enum('Administrator','Advisor') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`userId`, `name`, `email`, `password`, `userType`, `createdAt`, `updatedAt`) VALUES
(2, 'Jose Riaño', 'nuevo@email.com', '$2b$10$7aokYZh59ipBBKEnJaVieuKbMzoWy6pesgt/uxATFaaQvO.33clWq', 'Administrator', '2025-03-29 17:21:03', '2025-03-31 02:43:04'),
(3, 'david riaño', 'joseriano@hotmail.com', '$2b$10$XXJhXA.pMByx3i9WLvytNegqyj9CNq1b8NNz7NPDhKk190pBH0c8m', 'Advisor', '2025-03-30 03:44:10', '2025-03-30 16:18:57'),
(4, 'John Doe', 'john.doe@example.com', 'password123', 'Administrator', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(5, 'Jane Smith', 'jane.smith@example.com', 'password123', 'Advisor', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(6, 'Robert Brown', 'robert.brown@example.com', 'password123', 'Administrator', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(7, 'Emily White', 'emily.white@example.com', 'password123', 'Advisor', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(8, 'Michael Johnson', 'michael.johnson@example.com', 'password123', 'Administrator', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(9, 'Linda Green', 'linda.green@example.com', 'password123', 'Advisor', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(10, 'James Miller', 'james.miller@example.com', 'password123', 'Administrator', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(11, 'Elizabeth Wilson', 'elizabeth.wilson@example.com', 'password123', 'Advisor', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(12, 'David Taylor', 'david.taylor@example.com', 'password123', 'Administrator', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(13, 'Sarah Anderson', 'sarah.anderson@example.com', 'password123', 'Advisor', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(14, 'William Thomas', 'william.thomas@example.com', 'password123', 'Administrator', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(15, 'Olivia Jackson', 'olivia.jackson@example.com', 'password123', 'Advisor', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(16, 'Daniel Harris', 'daniel.harris@example.com', 'password123', 'Administrator', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(17, 'Sophia Clark', 'sophia.clark@example.com', 'password123', 'Advisor', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(18, 'Matthew Lewis', 'matthew.lewis@example.com', 'password123', 'Administrator', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(19, 'Ava Young', 'ava.young@example.com', 'password123', 'Advisor', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(20, 'Ethan Walker', 'ethan.walker@example.com', 'password123', 'Administrator', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(21, 'Mia Hall', 'mia.hall@example.com', 'password123', 'Advisor', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(22, 'Alexander Allen', 'alexander.allen@example.com', 'password123', 'Administrator', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(23, 'Charlotte Scott', 'charlotte.scott@example.com', 'password123', 'Advisor', '2025-03-31 02:48:38', '2025-03-31 02:48:38'),
(24, 'david riaño', 'joserianoP@hotmail.com', '$2b$10$VoM3iIcxa0LlRIQ9WZPlze2Jvwf6trjemEcwpdmmc3G5mb62A6mBG', 'Administrator', '2025-03-31 14:25:24', '2025-03-31 14:25:24');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`Id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
