-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Vært: 127.0.0.1
-- Genereringstid: 06. 09 2018 kl. 12:43:00
-- Serverversion: 5.6.24
-- PHP-version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `city_cykler`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `bruger`
--

CREATE TABLE IF NOT EXISTS `bruger` (
  `id` int(11) NOT NULL,
  `navn` varchar(45) NOT NULL,
  `password` varchar(77) NOT NULL,
  `aktiv` tinyint(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `bruger`
--

INSERT INTO `bruger` (`id`, `navn`, `password`, `aktiv`) VALUES
(1, 'admin', '$2b$10$mEBS7G6qW0s/Su14r8yN/.fLJgz9WIy5ufN3CSkLkwVRnxAnQx5a2', 1),
(10, 'Katarina', '$2b$10$IQ2pwpU/nQHpKMAoW6YIWuQOWhpCzF.Qf2oG579av8jr4woYmDvoO', 0);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `cykel`
--

CREATE TABLE IF NOT EXISTS `cykel` (
  `id` int(11) NOT NULL,
  `model` varchar(30) NOT NULL,
  `beskrivelse` varchar(500) NOT NULL,
  `FK_producent` int(11) NOT NULL,
  `FK_type` int(11) NOT NULL,
  `url` varchar(50) NOT NULL,
  `dato` datetime NOT NULL,
  `pris` int(11) NOT NULL,
  `tilbudspris` int(11) NOT NULL,
  `aktiv` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `cykel`
--

INSERT INTO `cykel` (`id`, `model`, `beskrivelse`, `FK_producent`, `FK_type`, `url`, `dato`, `pris`, `tilbudspris`, `aktiv`) VALUES
(10, 'Jala', 'Her er cyklen for dig, der skal være smart og hurtig. Du får her en supersmart mountainbike, der også er rigtig god til bykørsel. Cyklen har aerodynamisk facon, så vindmodstanden mindskes. Cyklen fås i flere størrelser og med forskelligt udstyr.', 1, 1, 'MTB1.jpg', '2018-09-03 08:01:00', 2195, 0, 1),
(11, 'Mont blanc', 'Dette er den ultimative cykel til bykørsel. For her får du en rigtig supersmart og elegant mountainbike. Cyklen har aerodynamisk facon, så vindmodstanden mindskes. Cyklen fås i flere størrelser, farver og med forskelligt udstyr.', 2, 1, 'MTB2.jpg', '2018-09-03 08:00:00', 2995, 1600, 1),
(12, 'Fun', 'Er du barn eller ung og gerne vil have en mountainbike kan vi selvfølgelig også magte det. Cyklen fås i hvid med blå eller rød dekoration. Cyklen en særdeles god til bykørsel, så det bliver en leg at cykle til skole.', 3, 1, 'MTB3.jpg', '2018-09-03 08:02:00', 2595, 0, 1),
(13, 'Racer B29', 'Er man til fart og elegance, så er dette cyklen for dig. For her får du en smart, smuk og funktionel cykel, som bringer dig hurtigt frem til dit bestemmelsessted. Cyklen fås til både piger og drenge, store som små.', 4, 2, 'racer1.jpg', '2018-09-03 08:03:00', 4995, 0, 1),
(14, 'Race4', 'Er du til specialcykler med superudstyr og gode køreegenskaber, så er dette cyklen for dig. Her får du 21 gear med tre klinger. Bremsesystemet er et af de allerbedste på markedet. Cyklen fås i flere størrelser til både kvinder og mænd. Cyklen fås i sølv, sort og rød og blå metalic.', 5, 2, 'racer2.jpg', '2018-09-03 08:04:00', 9599, 0, 1),
(15, 'Tvb Racer', 'Er man til fart og elegance, så er dette cyklen for dig. For her får du en smart, smuk og funktionel cykel, som bringer dig hurtigt frem til dit bestemmelsessted. Cyklen fås til både piger og drenge, store som små og i farverne sølv, sort og rød og blå metalic.', 6, 2, 'racer3.jpg', '2018-09-03 08:05:00', 8995, 7500, 1),
(16, 'City 3', 'Denne elegante cykel er en rigtig god og all-round cykel til den aktive cyklist. Den fås i flere størrelser og i farverne rød og sølv metalic. Cyklen har 7 indvendige gear, fodbremse og håndforbremse.', 6, 3, 'dame1.jpg', '2018-09-03 08:06:00', 4295, 0, 1),
(17, 'Classic 2', 'Er man til nostalgi eller synes at de moderne cykler er forkerte, så har man muligheden for her at få en cykel, der ligner bedstemors. Men teknologien er forbedret, så du får en topmoderne cykel i forklædning.', 7, 3, 'dame2.jpg', '2018-09-03 08:07:00', 3595, 3000, 1),
(18, 'Classic 2 Pink edition', 'Er man til nostalgi eller synes at de moderne cykler er forkerte, så har man muligheden for her at få en cykel, der ligner bedstemors. Men teknologien er forbedret, så du får en topmoderne cykel i forklædning. Synes man at de originale farver er for kedelige, kan den også fås i en lidt mere moderne udgave i farven pink.', 7, 3, 'dame3.jpg', '2018-09-03 08:08:00', 3999, 0, 1),
(19, 'Street', 'En god all-round cykel, som fås i flere farver og størrelser. På cyklen er der monteret et indvendigt Shimano-gearsystem med 7 gear. Så det er også nemt at komme op ad bakken. Cyklen er fabrikeret af aluminium med speciallakering, der kan tåle det danske vejr.', 6, 3, 'dame4.jpg', '2018-09-03 08:09:00', 4595, 3500, 1),
(20, 'Classic', 'En god all-round herrecykel, som fås i sort og sort metallic og størrelser. På cyklen er der monteret et indvendigt Shimano-gearsystem med 7 gear. Så det er også nemt at komme op ad bakken. Cyklen er fabrikeret af aluminium med speciallakering, der kan tåle det danske vejr.', 7, 4, 'herre1.jpg', '2018-09-03 08:10:00', 5550, 0, 1),
(21, 'Katmandu', 'En let og elegant herrecykel til dig, der har brug for en god og solid cykel. Cyklen fås i flere størrelser og farver, bl.a. lys blå metalic, sort metalic og sølv metalic. På cyklen er der monteret et indvendigt Shimanogearsystem med 7 gear. Lakeringen er en speciallakering fremstillet til at modstå det danske vejr.', 6, 4, 'herre2.jpg', '2018-09-03 08:11:00', 4595, 0, 1),
(22, 'City Limit', 'Denne cykel er for dig, der bare har brug for en cykel uden de store dikkedarer. Her får du en god all-round cykel, der kan holde til de mange gøremål, der er i dagligdagen. Cyklen er monteret med et indvendigt Shimano gearsystem med 5 gear. Cyklen har desuden bagagebærer og støttefod. Lakeringen er en speciallakering fremstillet til at modstå det danske vejr.', 7, 4, 'herre3.jpg', '2018-09-03 08:12:00', 3595, 3000, 1),
(23, 'WB-1', 'Her er den første juniorcykel. Cyklen fås til både drenge og piger. Den fås i flere farver. Cyklen passer til aldersgruppen 3 – 6 år. Man kan få støttehjul til cyklen, så det bliver nemmere for barnet at lære at cykle selv.', 7, 6, 'barn1.jpg', '2018-09-03 08:13:00', 1495, 1000, 1),
(24, 'WB-2', 'Når barnet når skolealderen er dette den perfekte cykel. Her får man en god gedigen cykel, der kan holde til at blive til at blive brugt hver dag. Cyklen har forbremser og fodbremser. Cyklen fås i et smart layout med gult og sort stel til drenge og orange og sort til piger. Cyklen har en sort bagagebærer.', 7, 6, 'barn2.jpg', '2018-09-03 08:14:00', 2195, 1800, 1),
(25, 'WB-3', 'Når barnet når skolealderen er dette den perfekte cykel. Her får man en god gedigen cykel, der kan holde til at blive til at blive brugt hver dag. Cyklen har forbremser og fodbremser. Cyklen fås i et smart layout med rødt og hvidt stel til piger og blåt og hvidt stel til drenge. Cyklen har en sort bagagebærer.', 7, 6, 'barn3.jpg', '2018-09-03 08:15:00', 2295, 0, 1),
(26, 'WB-4', 'Denne smarte cykel er rigtig god, når barnet skal cykle til skole hver dag og også bruge cyklen i de øvrige hverdagssituationer. Cyklen leveres i smarte farver og findes til både drenge og piger.', 7, 6, 'barn4.jpg', '2018-09-03 08:16:00', 1695, 0, 1),
(27, 'Mini', 'Her får dit barn en god og solid cykel i nogle spændende farver. Lige til at tage sig en god cykeltur på. Cyklen er, som alle vore øvrige cykler, solidt bygget, så den kan holde til dagligt brug. Cyklen er konstrueret, så barnet får den største fornøjelse af cyklen.', 7, 5, 'trehjulet1.jpg', '2018-09-03 08:17:00', 548, 0, 1),
(28, 'Midi', 'Her får dit barn den gode velkendte røde trehjulede cykel, som gennem generationer har været det første valg. Cyklen har tippelad. Cyklen er, som alle vore øvrige cykler, solidt bygget, så den kan holde til dagligt og solidt brug. Cyklen er konstrueret, så barnet får den største fornøjelse af cyklen.', 7, 5, 'trehjulet2.jpg', '2018-09-03 08:18:00', 548, 0, 1),
(29, 'Maxi', 'Den trehjulede velkendte trehjulede cykel fås også i andre farver, f. eks. I pink og blå. Gennem generationer har været den trehjulede cykel altid været det første valg. Cyklen har tippelad. Cyklen er, som alle vore øvrige cykler, solidt bygget, så den kan holde til dagligt og solidt brug. Cyklen er konstrueret, så barnet får den største fornøjelse af cyklen.', 7, 5, 'trehjulet3.jpg', '2018-09-03 08:19:00', 548, 0, 1),
(34, 'ret med tilbudspris', 'med tilbudspris?', 16, 2, 'pexels-photo-459793.jpeg', '0000-00-00 00:00:00', 1000, 0, 0),
(42, 'test', '10', 17, 2, 'pexels-photo-459793.jpeg', '0000-00-00 00:00:00', 100, 10, 0),
(43, 'ret med tilbudspris 100', 'tilbudspris?', 18, 2, 'pexels-photo-459793.jpeg', '0000-00-00 00:00:00', 100, 100, 0),
(44, 'test uden tilbud 1', 'efqwef', 16, 3, 'pexels-photo-459793.jpeg', '0000-00-00 00:00:00', 2000, 0, 0);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `cykelfarve`
--

CREATE TABLE IF NOT EXISTS `cykelfarve` (
  `id` int(11) NOT NULL,
  `FK_cykel` int(11) NOT NULL,
  `FK_farve` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `cykelfarve`
--

INSERT INTO `cykelfarve` (`id`, `FK_cykel`, `FK_farve`) VALUES
(1, 10, 8),
(2, 10, 9),
(3, 10, 1),
(4, 11, 1),
(5, 11, 2),
(6, 11, 8),
(7, 11, 9),
(8, 11, 10),
(9, 12, 1),
(10, 12, 5),
(11, 12, 8),
(12, 13, 1),
(13, 13, 5),
(14, 13, 9),
(15, 13, 10),
(16, 14, 1),
(17, 14, 5),
(18, 14, 9),
(19, 14, 10),
(20, 15, 1),
(21, 15, 5),
(22, 15, 9),
(23, 15, 10),
(24, 16, 1),
(25, 16, 9),
(26, 17, 8),
(27, 17, 10),
(28, 18, 7),
(29, 18, 8),
(30, 18, 9),
(31, 18, 10),
(32, 19, 3),
(33, 19, 4),
(34, 19, 10),
(35, 20, 9),
(36, 20, 10),
(37, 21, 5),
(38, 21, 9),
(39, 21, 10),
(40, 22, 8),
(41, 22, 9),
(42, 22, 10),
(43, 23, 1),
(44, 23, 6),
(45, 23, 7),
(46, 23, 5),
(47, 23, 4),
(48, 23, 10),
(49, 24, 2),
(50, 24, 10),
(51, 25, 1),
(52, 25, 5),
(53, 25, 8),
(54, 26, 1),
(55, 26, 2),
(56, 26, 3),
(57, 26, 5),
(58, 26, 8),
(59, 27, 1),
(60, 27, 2),
(61, 27, 3),
(62, 28, 1),
(63, 28, 2),
(64, 28, 3),
(65, 28, 4),
(66, 28, 5),
(67, 29, 6),
(68, 29, 7),
(69, 29, 8),
(70, 29, 9),
(71, 29, 10);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `cykeltype`
--

CREATE TABLE IF NOT EXISTS `cykeltype` (
  `id` int(11) NOT NULL,
  `navn` varchar(30) NOT NULL,
  `url` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `cykeltype`
--

INSERT INTO `cykeltype` (`id`, `navn`, `url`) VALUES
(1, 'Mountainbikes', 'mountainbikes.jpg'),
(2, 'Racercykler', 'racercykler.jpg'),
(3, 'Damecykler', 'damecykler.jpg'),
(4, 'Herrecykler', 'herrecykler.jpg'),
(5, 'Trehjulede', 'trehjulede.jpg'),
(6, 'Børnecykler', 'boernecykler.jpg');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `farve`
--

CREATE TABLE IF NOT EXISTS `farve` (
  `id` int(11) NOT NULL,
  `navn` varchar(30) NOT NULL,
  `url` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `farve`
--

INSERT INTO `farve` (`id`, `navn`, `url`) VALUES
(1, 'Rød', 'cykelfarve_1.jpg'),
(2, 'Gul', 'cykelfarve_2.jpg'),
(3, 'Mørk Grøn', 'cykelfarve_3.jpg'),
(4, 'Lys Grøn', 'cykelfarve_4.jpg'),
(5, 'Lys Blå', 'cykelfarve_5.jpg'),
(6, 'Lilla', 'cykelfarve_6.jpg'),
(7, 'Pink', 'cykelfarve_7.jpg'),
(8, 'Hvid', 'cykelfarve_8.jpg'),
(9, 'Sølv', 'cykelfarve_9.jpg'),
(10, 'Sort', 'cykelfarve_10.jpg');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `kontakt`
--

CREATE TABLE IF NOT EXISTS `kontakt` (
  `id` int(11) NOT NULL,
  `firmanavn` varchar(15) NOT NULL,
  `vejnavn` varchar(30) NOT NULL,
  `husnummer` int(11) NOT NULL,
  `postnummer` char(4) NOT NULL,
  `bynavn` varchar(30) NOT NULL,
  `telefon` char(8) NOT NULL,
  `fax` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `kontakt`
--

INSERT INTO `kontakt` (`id`, `firmanavn`, `vejnavn`, `husnummer`, `postnummer`, `bynavn`, `telefon`, `fax`, `email`) VALUES
(1, 'City Cykler A/S', 'Nygade', 65, '9000', 'Ålborg', '98101011', '98101012', 'contact@cc.dk');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `producent`
--

CREATE TABLE IF NOT EXISTS `producent` (
  `id` int(11) NOT NULL,
  `navn` varchar(30) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `producent`
--

INSERT INTO `producent` (`id`, `navn`) VALUES
(1, 'Kildemoes'),
(2, 'MBK'),
(3, 'Mustang'),
(4, 'Jensen'),
(5, 'Bianchi'),
(6, 'Tårnby'),
(7, 'Winther'),
(8, 'MET'),
(9, 'Lazer'),
(10, 'VDO'),
(11, 'Tranz-x'),
(12, 'Michelin'),
(13, 'Lipu'),
(14, 'Sidi'),
(15, 'Nike'),
(16, 'Alessi Bianchi'),
(17, 'John D'),
(18, 'Hamax'),
(19, 'Shimano');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `side`
--

CREATE TABLE IF NOT EXISTS `side` (
  `id` int(11) NOT NULL,
  `navn` varchar(30) NOT NULL,
  `afsnit1` varchar(500) NOT NULL,
  `afsnit2` varchar(500) NOT NULL,
  `afsnit3` varchar(500) NOT NULL,
  `afsnit4` varchar(500) NOT NULL,
  `afsnit5` varchar(500) NOT NULL,
  `url` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `side`
--

INSERT INTO `side` (`id`, `navn`, `afsnit1`, `afsnit2`, `afsnit3`, `afsnit4`, `afsnit5`, `url`) VALUES
(6, 'Forside', 'Velkommen til City Cykler', 'Hos os får du en cykel, der er tilpasset lige præcis til dig. Vi har nemlig bygget cykler gennem generationer, så vi ved hvilke krav en cykel kan blive udsat for i det danske vejr. Vores cykler er bygget på generationers erfaring og solidt håndværk.', 'Vi har cyklen til alle i familien. Lige fra barnets første trehjulede cykel til bedstemors turcykel. Vælger du en cykel fra os, så får du en cykel, der giver maksimal køreglæde og derved gør det til en leg at få fælles familieoplevelser på cykel med masser af frisk luft og motion, for vi producerer flotte og funktionelle hverdagscykler til hele familien.', 'En god cykel udvikles ikke af sig selv. Den er et resultat af mange års produktudvikling. Som et 100% danskejet firma kender vi det danske klima og kan tilpasse vore cykler til det ved at bruge de bedste materialer og de mest optimale processer i fremstillingen af cykler.', 'Vi udvikler og producerer danske kvalitetscykler, der giver dig stor køreglæde, en god funktionalitet og som samtidig lever op til dine krav om holdbarhed og minimal vedligeholdelse. Men samtidig går vi ikke på kompromis med sikkerheden.', 'forside.jpg');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `udstyr`
--

CREATE TABLE IF NOT EXISTS `udstyr` (
  `id` int(11) NOT NULL,
  `model` varchar(30) NOT NULL,
  `beskrivelse` varchar(500) NOT NULL,
  `FK_producent` int(11) NOT NULL,
  `FK_kategori` int(11) NOT NULL,
  `url` varchar(50) NOT NULL,
  `pris` int(11) NOT NULL,
  `aktiv` int(1) NOT NULL DEFAULT '1'
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `udstyr`
--

INSERT INTO `udstyr` (`id`, `model`, `beskrivelse`, `FK_producent`, `FK_kategori`, `url`, `pris`, `aktiv`) VALUES
(1, 'Junior', 'Alle bør have en cykelhjelm. Vi har derfor fundet denne smarte model til små piger, der gerne vil være prinsesser. Hjelmen er pink med hvide blomster og passer til piger i alderen 5 – 12 år.', 8, 1, 'hjelm1.jpg', 395, 1),
(2, 'Mouse', 'Alle bør have en cykelhjelm. Også når man sidder bagpå fars eller mors cykel Vi har derfor fundet denne smarte model til små piger og drenge. Hjelmen er designet, så den ligner en sød lille mus. Den passer til piger og drenge i alderen 1 - 5 år.', 9, 1, 'hjelm2.gif', 275, 1),
(3, 'Regular', 'ykelhjelme er for alle. Både børn og voksne. Vi har derfor fundet denne smarte model, som fås til både børn og voksne. Hjelmen fås i farverne rød og blå. Den fås i børnestørrelser fra 6 år og i voksenstørrelser op til 60 cm.', 9, 1, 'hjelm3.gif', 495, 1),
(4, 'Blue', 'For den professionelle rytter eller for hende, der gerne vil have den ultimative cykelhjelm har vi denne aerodynamiske model i hvid og blå.', 8, 1, 'hjelm4.jpg', 995, 1),
(5, 'CompuSpeed 2', 'Cykelcomputeren her har mange forskellige funktioner. F.eks. kan man måle den aktuelle hastighed, kørt tid, gennemsnitshastighed. Man kan også se den kørte distance for en eller to cykler.', 10, 2, 'computer4.jpg', 399, 1),
(6, 'Com3', 'Her får man en god og gedigen cykelcomputer. Computeren har otte forskellige funktioner. Computeren har et stort display og den er nem at indstille.', 2, 2, 'computer1.jpg', 349, 1),
(7, 'CompuSpeed 1', 'Her får man en trådløs og programmerbar cykelcomputer. Computeren har selvfølgelig et stort læsevenligt display. Der er femten indbyggede funktioner inklusiv kalorie- og fedtforbrænding, så man uden problemer kan følge med i fedtforbrændingen.', 10, 2, 'computer2.jpg', 259, 1),
(8, 'Com2', 'Her får man en god og gedigen cykelcomputer. Computeren har ni forskellige funktioner, som f.eks. tidsmåler og temperatur måler. Computeren har et stort display og den er nem at indstille.', 2, 2, 'computer3.jpg', 299, 1),
(9, 'Kædeadskiller', 'Vil man holde sin cykel i en god stand, er man nødt til at have det rigtige værktøj. Så derfor bør denne flotte kædeadskiller med flere forskellige funktioner være i enhver handymans cykelværktøjskasse. Der er bl.a. unbracho nøgler og skruetrækker med stjernekærv og lige kærv.', 11, 3, 'vaerktoej1.jpg', 89, 1),
(10, 'Dækjern', 'Det sker jo at selv det bedste dæk kan punktere. Derfor er et sæt dækjern uundværligt. Ellers bliver det at skifte dæk for besværligt.', 12, 3, 'vaerktoej2.jpg', 12, 1),
(11, 'Foldeværktøj', 'Foldeværktøjet med 6 forskellige funktioner fås i rød. Her er bl.a. unbracho nøgler i forkellige størrelser. Skruetrækker med stjerne og lige kærv.', 13, 3, 'vaerktoej3.jpg', 45, 1),
(12, 'Cykelsko', 'Cykler man meget på en racercykel, så kan det være en god ide, at investere i et par rigtige cykelsko. Så får du nemlig en meget større fornøjelse af din cykeltur. Her får du et rigtig godt par til en fornuftig pris.', 14, 4, 'toej1.jpg', 599, 1),
(13, 'Frakke', 'En god sommerjakke til herrer. Der er en god ventilation i jakken, som er både vandtæt og åndbar.', 15, 4, 'toej2.jpg', 899, 1),
(14, 'Kasket', 'Køb denne smarte cap fra Alessi Bianchi. Så er du med på moden. Cappen fås kun i en størrelse.', 16, 4, 'toej3.jpg', 89, 1),
(15, 'Cykelsæt', 'Dette vintersæt med jakke og bukser er i vores sædvanlige gode kvalitet. Både jakke og bukser kan købes separat til følgende priser: Bukser 799 kr. og jakke 699 kr.', 17, 4, 'toej4.jpg', 999, 1),
(16, 'Bukser', 'Cykler man meget og langt, kan man i det lange løb ikke undvære et par gode cykelbukser. Bukserne er med korte bukser og fremstillet af sort lycra.', 17, 4, 'toej5.jpg', 299, 1),
(17, 'Mini', 'Her får du en elegant barnestol med den største comfort til dit barn, når I cykler. Cyklen er fremstillet i formstøbt plastik med benforlængere, så benene ikke kan komme ind i cyklens hjul.', 18, 5, 'stol1.jpg', 1595, 1),
(18, 'Midi', 'Her får du en elegant barnestol med den største comfort til dit barn, når I cykler. Cyklen er fremstillet i formstøbt plastik med benforlængere, der ender som støtter til barnets fødder. Derved undgår man at barnets ben kommer ind i cyklens hjul.', 18, 5, 'stol2.gif', 1795, 1),
(19, 'Kæde', 'Skal cyklen have skiftet kæde, er denne kæde et godt valg. Kæden er rustfri og passer til 7 og 8 udvendige gear. Når du skifter kæde, bør du også skifte krans.', 7, 6, 'reserve1.jpg', 99, 1),
(20, 'Støtteben', 'Støtteben til mountainbikes og citycyklen. Ja, det er ren rigtig god ting, da man jo ikke altid kan regne med at der er et cykelstativ, man kan placere sin cykel i. Støttebenet er blankt og kan justeres.', 7, 6, 'reserve2.jpg', 149, 1),
(21, 'Dæk', 'Træt af at punktere i tide og utide. Så prøv dette punkterfrie dæk med kevlar. Så får du nedsat dine punkteringer med 90 procent. Dækket er meget nemt at montere.', 3, 6, 'reserve3.jpg', 299, 1),
(22, 'Deore Gear', 'Her får du et godt og solidt baggear. Gearskiftet bliver derved til en leg.', 19, 6, 'reserve4.jpg', 249, 1),
(24, 'test sql mmmmm', 'test sql', 1, 1, 'pexels-photo-459793.jpeg', 1000, 1);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `udstyrskategori`
--

CREATE TABLE IF NOT EXISTS `udstyrskategori` (
  `id` int(11) NOT NULL,
  `navn` varchar(30) NOT NULL,
  `url` varchar(50) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `udstyrskategori`
--

INSERT INTO `udstyrskategori` (`id`, `navn`, `url`) VALUES
(1, 'Cykelhjelme', 'cykelhjelme.jpg'),
(2, 'Cykelcomputere', 'cykelcomputere.jpg'),
(3, 'Værktøj', 'vaerktoej.jpg'),
(4, 'Cykeltøj', 'cykeltoej.jpg'),
(5, 'Barnestole', 'barnestole.jpg'),
(6, 'Reservedele', 'reservedele.jpg');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `bruger`
--
ALTER TABLE `bruger`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `cykel`
--
ALTER TABLE `cykel`
  ADD PRIMARY KEY (`id`), ADD KEY `FK_producent` (`FK_producent`), ADD KEY `FK_cykeltype` (`FK_type`), ADD KEY `FK_type` (`FK_type`);

--
-- Indeks for tabel `cykelfarve`
--
ALTER TABLE `cykelfarve`
  ADD PRIMARY KEY (`id`), ADD KEY `FK_cykel` (`FK_cykel`), ADD KEY `FK_cykelfarve` (`FK_farve`);

--
-- Indeks for tabel `cykeltype`
--
ALTER TABLE `cykeltype`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `farve`
--
ALTER TABLE `farve`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `kontakt`
--
ALTER TABLE `kontakt`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `producent`
--
ALTER TABLE `producent`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `side`
--
ALTER TABLE `side`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `udstyr`
--
ALTER TABLE `udstyr`
  ADD PRIMARY KEY (`id`), ADD KEY `FK_producent` (`FK_producent`), ADD KEY `FK_cykeltype` (`FK_kategori`), ADD KEY `FK_kategori` (`FK_kategori`);

--
-- Indeks for tabel `udstyrskategori`
--
ALTER TABLE `udstyrskategori`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `bruger`
--
ALTER TABLE `bruger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- Tilføj AUTO_INCREMENT i tabel `cykel`
--
ALTER TABLE `cykel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=45;
--
-- Tilføj AUTO_INCREMENT i tabel `cykelfarve`
--
ALTER TABLE `cykelfarve`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=72;
--
-- Tilføj AUTO_INCREMENT i tabel `cykeltype`
--
ALTER TABLE `cykeltype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- Tilføj AUTO_INCREMENT i tabel `farve`
--
ALTER TABLE `farve`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- Tilføj AUTO_INCREMENT i tabel `kontakt`
--
ALTER TABLE `kontakt`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Tilføj AUTO_INCREMENT i tabel `producent`
--
ALTER TABLE `producent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=20;
--
-- Tilføj AUTO_INCREMENT i tabel `side`
--
ALTER TABLE `side`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- Tilføj AUTO_INCREMENT i tabel `udstyr`
--
ALTER TABLE `udstyr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=25;
--
-- Tilføj AUTO_INCREMENT i tabel `udstyrskategori`
--
ALTER TABLE `udstyrskategori`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `cykel`
--
ALTER TABLE `cykel`
ADD CONSTRAINT `cykel_ibfk_1` FOREIGN KEY (`FK_producent`) REFERENCES `producent` (`id`),
ADD CONSTRAINT `cykel_ibfk_2` FOREIGN KEY (`FK_type`) REFERENCES `cykeltype` (`id`);

--
-- Begrænsninger for tabel `cykelfarve`
--
ALTER TABLE `cykelfarve`
ADD CONSTRAINT `cykelfarve_ibfk_1` FOREIGN KEY (`FK_farve`) REFERENCES `farve` (`id`),
ADD CONSTRAINT `cykelfarve_ibfk_2` FOREIGN KEY (`FK_cykel`) REFERENCES `cykel` (`id`);

--
-- Begrænsninger for tabel `udstyr`
--
ALTER TABLE `udstyr`
ADD CONSTRAINT `udstyr_ibfk_1` FOREIGN KEY (`FK_producent`) REFERENCES `producent` (`id`),
ADD CONSTRAINT `udstyr_ibfk_2` FOREIGN KEY (`FK_kategori`) REFERENCES `udstyrskategori` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
