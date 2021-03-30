-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 30 Mar 2021, 20:21
-- Wersja serwera: 10.4.13-MariaDB
-- Wersja PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `aidc_db`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `accounts`
--

CREATE TABLE `accounts` (
  `AccountId` int(10) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `Surname` varchar(30) NOT NULL,
  `Login` varchar(30) NOT NULL,
  `Password` varchar(64) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `Rank` int(2) NOT NULL,
  `State` int(2) NOT NULL,
  `InventoryId` int(10) NOT NULL,
  `PersonalUseId` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `accounts`
--

INSERT INTO `accounts` (`AccountId`, `Name`, `Surname`, `Login`, `Password`, `Email`, `Rank`, `State`, `InventoryId`, `PersonalUseId`) VALUES
(1, 'Tomasz', 'Karolak', 'TKarolak', 'admin', 'tkarolak@wp.pl', 1, 1, 5, 4),
(2, 'Borys', 'Szyc', 'Bszyc', 'admin', 'bszyc@wp.pl', 2, 1, 7, 6);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `articles`
--

CREATE TABLE `articles` (
  `ArticleId` int(10) NOT NULL,
  `LocationId` int(10) NOT NULL,
  `Name` varchar(60) NOT NULL,
  `Description` text NOT NULL,
  `AddtionDate` date NOT NULL,
  `ProductionYear` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `locations`
--

CREATE TABLE `locations` (
  `LocationId` int(10) NOT NULL,
  `Building` int(10) NOT NULL,
  `Floor` int(5) NOT NULL,
  `Room` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `locations`
--

INSERT INTO `locations` (`LocationId`, `Building`, `Floor`, `Room`) VALUES
(4, -1, 1, 1),
(5, -1, 2, 1),
(6, -1, 1, 2),
(7, -1, 2, 2);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`AccountId`),
  ADD KEY `InventoryId` (`InventoryId`),
  ADD KEY `PersonalUseId` (`PersonalUseId`);

--
-- Indeksy dla tabeli `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`ArticleId`),
  ADD KEY `LocationId` (`LocationId`);

--
-- Indeksy dla tabeli `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`LocationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `accounts`
--
ALTER TABLE `accounts`
  MODIFY `AccountId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `articles`
--
ALTER TABLE `articles`
  MODIFY `ArticleId` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `locations`
--
ALTER TABLE `locations`
  MODIFY `LocationId` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`InventoryId`) REFERENCES `locations` (`LocationId`),
  ADD CONSTRAINT `accounts_ibfk_2` FOREIGN KEY (`PersonalUseId`) REFERENCES `locations` (`LocationId`);

--
-- Ograniczenia dla tabeli `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`LocationId`) REFERENCES `locations` (`LocationId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
