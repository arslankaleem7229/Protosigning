-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 08, 2021 at 08:19 PM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `protosigning`
--

-- --------------------------------------------------------

--
-- Table structure for table `designs`
--

CREATE TABLE `designs` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `thumbnail` text NOT NULL,
  `type` text NOT NULL,
  `description` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `designs`
--

INSERT INTO `designs` (`id`, `title`, `thumbnail`, `type`, `description`, `date`) VALUES
(3, 'Love Who you are', '1596633394 - 2020-08-05 - 01356 Love Who You Are.svg', 'Quote', 'Love Who you are', '2020-08-05 13:16:34'),
(4, 'Family Is EveryThing', '1596633567 - 2020-08-05 - 01351 Family Is Everything.svg', 'Quote', 'Family Is EveryThing', '2020-08-05 13:19:27'),
(5, 'Hello Sunshine', '1596633618 - 2020-08-05 - 01354 Hello Sunshine.svg', 'Quote', 'Hello Sunshine', '2020-08-05 13:20:18'),
(6, 'Papa Is My Hero', '1596633675 - 2020-08-05 - 01347 Papa Is My Hero.svg', 'Quote', 'Papa Is My Hero', '2020-08-05 13:21:15'),
(7, 'Kindness Is Contagious', '1596633721 - 2020-08-05 - 01358 Kindness Is Contagious.svg', 'Quote', 'Kindness Is Contagious', '2020-08-05 13:22:01'),
(8, 'Make Yourself At Home', '1596633771 - 2020-08-05 - 01366 Make Yourself At Home.svg', 'Quote', 'Make Yourself At Home', '2020-08-05 13:22:51'),
(9, 'Mandala', '1596711262 - 2020-08-06 - 01379 Mandala.svg', 'Art', 'mandala', '2020-08-06 10:54:22'),
(10, 'Sunflower Mandala', '1596711419 - 2020-08-06 - 01376 Sunflower Mandala.svg', 'Art', 'mandala', '2020-08-06 10:56:59'),
(11, 'Sunflower Mandala', '1596711439 - 2020-08-06 - 01373 Mandala.svg', 'Art', 'mandala', '2020-08-06 10:57:19'),
(12, 'Sunflower Mandala', '1596711450 - 2020-08-06 - 01378 Floral Mandala.svg', 'Art', 'mandala', '2020-08-06 10:57:30'),
(13, 'Sunflower Mandala', '1596711459 - 2020-08-06 - 01381 Mandala.svg', 'Art', 'mandala', '2020-08-06 10:57:39'),
(14, 'Sunflower Mandala', '1596711466 - 2020-08-06 - 01382 Mandala.svg', 'Art', 'mandala', '2020-08-06 10:57:46'),
(15, 'Bring on Summer', '1596711654 - 2020-08-06 - 01334 Bring On Summer.svg', 'Quote', 'Bring on Summer', '2020-08-06 11:00:54'),
(16, 'Bring on Summer', '1596711663 - 2020-08-06 - 01345 Made With Love.svg', 'Quote', 'Bring on Summer', '2020-08-06 11:01:03'),
(17, 'Bring on Summer', '1596711670 - 2020-08-06 - 01364 Gone Fishing.svg', 'Quote', 'Bring on Summer', '2020-08-06 11:01:10'),
(18, 'Bring on Summer', '1596711678 - 2020-08-06 - 01372 Relationship Status Long Distance.svg', 'Quote', 'Bring on Summer', '2020-08-06 11:01:18'),
(19, 'Flyer 1', '1596712497 - 2020-08-06 - 1543687318.svg', 'Flyer', 'Flyer', '2020-08-06 11:14:57'),
(20, 'Christmas', '1596713417 - 2020-08-06 - christmas2013.svg', 'Flyer', 'christmas', '2020-08-06 11:30:17'),
(21, 'Christmas', '1596713442 - 2020-08-06 - 1394426941.svg', 'Flyer', 'christmas', '2020-08-06 11:30:42'),
(22, 'Christmas', '1596713445 - 2020-08-06 - 1540727477.svg', 'Flyer', 'christmas', '2020-08-06 11:30:45'),
(23, 'Christmas', '1596713451 - 2020-08-06 - 1540727277.svg', 'Flyer', 'christmas', '2020-08-06 11:30:51'),
(24, 'Christmas', '1596713455 - 2020-08-06 - merzok-La-commune-de-paris-y-la-revolution-espanola.svg', 'Flyer', 'christmas', '2020-08-06 11:30:55'),
(25, 'Christmas', '1596713460 - 2020-08-06 - 1534415454.svg', 'Flyer', 'christmas', '2020-08-06 11:31:00'),
(26, 'Christmas', '1596713464 - 2020-08-06 - 1534415391.svg', 'Flyer', 'christmas', '2020-08-06 11:31:04'),
(27, 'Christmas', '1596713468 - 2020-08-06 - 1519918093.svg', 'Flyer', 'christmas', '2020-08-06 11:31:08'),
(28, 'Christmas', '1596713472 - 2020-08-06 - Easter-Egg-Hunt-Generic.svg', 'Flyer', 'christmas', '2020-08-06 11:31:12'),
(29, 'Movie Poster', '1596714050 - 2020-08-06 - Movie Night Poster.svg', 'Movie Poster', 'Movie Poster', '2020-08-06 11:40:50'),
(30, 'Movie Poster', '1596714495 - 2020-08-06 - Movie Night Poster.svg', 'Movie Poster', 'Movie Poster', '2020-08-06 11:48:15'),
(31, 'Movie Poster', '1596714502 - 2020-08-06 - DD Vintage Silent Film Illustration 67823.svg', 'Movie Poster', 'Movie Poster', '2020-08-06 11:48:22'),
(32, 'Movie Poster', '1596714511 - 2020-08-06 - Movie Night Poster.svg', 'Movie Poster', 'Movie Poster', '2020-08-06 11:48:31'),
(33, 'Movie Poster', '1596714517 - 2020-08-06 - free-hitchcock-the-birds-vector-poster.svg', 'Movie Poster', 'Movie Poster', '2020-08-06 11:48:37'),
(34, 'Movie Poster', '1596714524 - 2020-08-06 - charlie-chaplin-vector-retro-poster.svg', 'Movie Poster', 'Movie Poster', '2020-08-06 11:48:44'),
(35, 'Movie Poster', '1596714530 - 2020-08-06 - Retro poster.svg', 'Movie Poster', 'Movie Poster', '2020-08-06 11:48:50'),
(36, 'Movie Poster', '1596714536 - 2020-08-06 - Movie Night Poster Template Vector.svg', 'Movie Poster', 'Movie Poster', '2020-08-06 11:48:56'),
(37, 'Movie Poster', '1596714543 - 2020-08-06 - movie night poster.svg', 'Movie Poster', 'Movie Poster', '2020-08-06 11:49:03');

-- --------------------------------------------------------

--
-- Table structure for table `logos`
--

CREATE TABLE `logos` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `thumbnail` text NOT NULL,
  `type` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logos`
--

INSERT INTO `logos` (`id`, `title`, `thumbnail`, `type`, `date`) VALUES
(2, 'Flower With Bird', '1596618877 - 2020-08-05 - asd.svg', 'flower, bird, blue, black, dark-blue, round', '2020-08-05 09:14:37'),
(3, 'Flower With Trees', '1596620111 - 2020-08-05 - asd.svg', 'flower, trees, green, yellow, sun, camping', '2020-08-05 09:35:11'),
(4, 'The Burger Shack', '1596624592 - 2020-08-05 - asd.svg', 'burger, red, black, shack, burger king, food, fast food', '2020-08-05 10:49:52'),
(5, 'fire', '1596715130 - 2020-08-06 - fire.svg', 'fire, yellow, bee', '2020-08-06 11:58:50'),
(6, 'Resturant Logo', '1596715269 - 2020-08-06 - fire.svg', 'resturant logo, cyan, casala, resturant', '2020-08-06 12:01:09'),
(7, 'fire Tiger', '1596715337 - 2020-08-06 - fire.svg', 'princess, blue, black, round, circle, cupcake', '2020-08-06 12:02:17'),
(8, 'Rounded fire', '1596715464 - 2020-08-06 - fire.svg', 'fire, rounded, circle, black, white, tree, leaf', '2020-08-06 12:04:24'),
(9, 'St. John high school', '1596715561 - 2020-08-06 - fire.svg', 'school, old school, blue, yellow, dark blue, high school, john', '2020-08-06 12:06:01'),
(10, 'The Green Orchard', '1596715627 - 2020-08-06 - fire.svg', 'tree, green, orchard, green orchard', '2020-08-06 12:07:07'),
(11, 'The Beast', '1596715682 - 2020-08-06 - fire.svg', 'security, beast, red, blue, dark blue, wolf', '2020-08-06 12:08:02'),
(12, 'rounded fire', '1596715748 - 2020-08-06 - fire.svg', 'fire, red, round, circle, shape', '2020-08-06 12:09:08'),
(13, 'medal of honour fire', '1596715789 - 2020-08-06 - fire.svg', 'medal, fire, rounded, honour, yellow, black', '2020-08-06 12:09:49');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `type` text NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `html_file` text DEFAULT NULL,
  `css_file` text DEFAULT NULL,
  `js_file` text DEFAULT NULL,
  `thumbnail` text DEFAULT NULL,
  `owner` text NOT NULL,
  `collaborators` text DEFAULT '',
  `changes` text DEFAULT NULL,
  `cursor_location` text DEFAULT NULL,
  `comments` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `type`, `datetime`, `html_file`, `css_file`, `js_file`, `thumbnail`, `owner`, `collaborators`, `changes`, `cursor_location`, `comments`) VALUES
(7, 'My First Project', 'Web', '2020-08-09 17:38:34', NULL, NULL, NULL, NULL, 'cameron1998', '[]', '', '', ''),
(8, 'My Second Project', 'Web', '2020-08-09 17:39:20', NULL, NULL, NULL, NULL, 'cameron1998', '[]', '', '', ''),
(9, 'My Final Year Project', 'Web', '2020-08-09 17:39:52', NULL, NULL, NULL, NULL, 'cameron1998', '[]', '', '', ''),
(10, 'This is my design project', 'Design', '2020-08-09 17:44:45', NULL, NULL, NULL, NULL, 'cameron1998', '[]', '', '', ''),
(11, 'A Project', 'Web', '2020-08-15 05:49:48', NULL, NULL, NULL, NULL, 'cameron1998', '[\"arslankaleem1234\",\"hamzaimran4499\",\"cameron199812345\"]', '', '', ''),
(12, 'My Web Project', 'Web', '2020-08-10 21:24:57', '{\"owner\":\"1597077321849 - html.txt\"}', NULL, NULL, NULL, 'arslankaleem1234', '[\"sirhassanalikhattak\"]', NULL, '{\"cameron1998\":{\"left\":823,\"top\":262}}', NULL),
(13, 'This is my logo project', 'Logo', '2020-08-10 15:20:49', NULL, NULL, NULL, NULL, 'cameron1998', '[]', NULL, NULL, NULL),
(14, 'My First Design Project', 'design', '2020-08-10 21:37:32', NULL, NULL, NULL, NULL, 'cameron19981234', '[]', NULL, NULL, NULL),
(15, 'My Design project', 'Design', '2020-08-10 21:43:46', NULL, NULL, NULL, NULL, 'cameron199812345', '[]', NULL, NULL, NULL),
(16, 'Web Project', 'web', '2020-08-10 21:46:11', NULL, NULL, NULL, NULL, 'cameron199812345', '[\"cameron1998\"]', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`) VALUES
(1, 'cameron1998', 'pakistan'),
(2, 'arslankaleem1234', 'pakistan'),
(3, 'hamzaimran4499', 'pakistan'),
(4, 'danielRadcliffe1234', 'pakistan1'),
(5, 'salmankhan1234', 'pakistan'),
(6, 'sirhassanalikhattak', '123456'),
(7, 'cameron19981234', 'pakistan'),
(8, 'cameron199812345', 'pakistan');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `designs`
--
ALTER TABLE `designs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logos`
--
ALTER TABLE `logos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `designs`
--
ALTER TABLE `designs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `logos`
--
ALTER TABLE `logos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
