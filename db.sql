-- --------------------------------------------------------
-- Host:                         10.0.0.114
-- Server version:               10.3.27-MariaDB-0+deb10u1 - Raspbian 10
-- Server OS:                    debian-linux-gnueabihf
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table printMgmt.colors
CREATE TABLE IF NOT EXISTS `colors` (
  `ID` int(11) DEFAULT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table printMgmt.customers
CREATE TABLE IF NOT EXISTS `customers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` text DEFAULT NULL,
  `lastName` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `dateAdded` text DEFAULT NULL,
  `addedBy` text DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table printMgmt.filament
CREATE TABLE IF NOT EXISTS `filament` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `barcode` text DEFAULT NULL,
  `material` text DEFAULT NULL,
  `spoolAmount` text DEFAULT NULL,
  `amountRemaining` text DEFAULT NULL,
  `purchasePrice` text DEFAULT NULL,
  `color` text DEFAULT NULL,
  `openedOn` text DEFAULT NULL,
  `purchaceDate` text DEFAULT NULL,
  `deliveryDate` text DEFAULT NULL,
  `vendor` text DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table printMgmt.files
CREATE TABLE IF NOT EXISTS `files` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` text DEFAULT NULL,
  `fileName` text DEFAULT NULL,
  `time` text DEFAULT NULL,
  `filament` text DEFAULT NULL,
  `dateAdded` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table printMgmt.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `jobCode` text DEFAULT NULL,
  `fileID` int(11) DEFAULT NULL,
  `dateAdded` timestamp NULL DEFAULT current_timestamp(),
  `status` int(11) DEFAULT 1,
  `filamentID` int(11) DEFAULT NULL,
  `estPrintTime` text DEFAULT NULL,
  `actualPrintTime` text DEFAULT NULL,
  `timelapse` text DEFAULT NULL,
  `orderID` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table printMgmt.materials
CREATE TABLE IF NOT EXISTS `materials` (
  `ID` int(11) DEFAULT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table printMgmt.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `customerID` int(11) DEFAULT NULL,
  `orderDate` text DEFAULT NULL,
  `orderName` text DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table printMgmt.printers
CREATE TABLE IF NOT EXISTS `printers` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `barcode` text DEFAULT NULL,
  `currentFilament` text DEFAULT NULL,
  `make` text DEFAULT NULL,
  `model` text DEFAULT NULL,
  `purchasePrice` text DEFAULT NULL,
  `purchaseDate` text DEFAULT NULL,
  `buildHeight` text DEFAULT NULL,
  `buildWidth` text DEFAULT NULL,
  `buildLength` text DEFAULT NULL,
  `IPAddress` text DEFAULT NULL,
  `APIKEY` text DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table printMgmt.users
CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` text DEFAULT NULL,
  `password` text DEFAULT NULL,
  `type` text DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

-- Dumping structure for table printMgmt.vendors
CREATE TABLE IF NOT EXISTS `vendors` (
  `ID` int(11) DEFAULT NULL,
  `name` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
