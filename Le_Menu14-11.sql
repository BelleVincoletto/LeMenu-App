-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para banco_lemenu
CREATE DATABASE IF NOT EXISTS `banco_lemenu` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `banco_lemenu`;

-- Copiando estrutura para tabela banco_lemenu.cadastro_clientes
CREATE TABLE IF NOT EXISTS `cadastro_clientes` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `data_nascimento` date NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(13) DEFAULT NULL,
  `email_recuperacao` varchar(255) NOT NULL,
  `verification_code` varchar(255) DEFAULT NULL,
  `verification_expires` datetime DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Copiando dados para a tabela banco_lemenu.cadastro_clientes: ~3 rows (aproximadamente)
INSERT INTO `cadastro_clientes` (`id_usuario`, `email`, `data_nascimento`, `nome`, `cpf`, `senha`, `telefone`, `email_recuperacao`, `verification_code`, `verification_expires`) VALUES
	(1, 'belle@gmail.com', '2006-02-15', 'belle', '46346356828', '59b4627b6ff817d2ec5d66ea8b7386e108fad00e5da0230aaaf58a6bfd6d2179', '18 99758-8835', 'isabelle@gmail.com', NULL, NULL),
	(11, 'kauaninha@gmail.com', '2006-11-15', 'kauana ', '99988866611', '9a6dcfb7d159160d1f5a14cd3a3229acb2e286092346ab412fb21e548ab1a272', '18 99138-9211', 'kauana@gmail.com', NULL, NULL),
	(14, 'freguglia.breno@gmail.com', '2006-09-18', 'Breno', '462.709.348', 'a5eaa5e6cb269a776bf1a7f0c617b1ab3e5bc19a06a86df18ffd732803471970', '18 99816-5083', 'freguglia.breno@gmail.com', '567909', '2024-11-05 15:25:46');

-- Copiando estrutura para tabela banco_lemenu.cadastro_receitas
CREATE TABLE IF NOT EXISTS `cadastro_receitas` (
  `id_receita` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `caloria` int(11) DEFAULT NULL,
  `ingredientes` text DEFAULT NULL,
  `tempo` int(11) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `sabor_tipo` varchar(255) DEFAULT NULL,
  `classificacao` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `porcoes` int(100) DEFAULT NULL,
  `preparo` varchar(10000) DEFAULT NULL,
  PRIMARY KEY (`id_receita`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Copiando dados para a tabela banco_lemenu.cadastro_receitas: ~22 rows (aproximadamente)
INSERT INTO `cadastro_receitas` (`id_receita`, `nome`, `caloria`, `ingredientes`, `tempo`, `url`, `sabor_tipo`, `classificacao`, `estado`, `porcoes`, `preparo`) VALUES
	(1, 'fondue', 450, 'queijo, carne, bacon', 20, 'https://png.pngtree.com/png-vector/20240801/ourmid/pngtree-french-speciality-cheese-fondue-with-set-png-image_13321375.png', 'salgado', 'nao_saudavel', 'comida', 2, NULL),
	(11, 'brigadeiro', 350, 'manteiga, leite condensado, achocolatado em pó', 20, 'https://imagensemoldes.com.br/wp-content/uploads/2020/05/Brigadeiro-com-Fundo-Transparente-Doces-PNG.png', 'doce', 'não saudavel', 'comida', 5, 'Em uma panela funda, acrescente o leite condensado, a margarina e o chocolate em pó.\n\nCozinhe em fogo médio e mexa até que o brigadeiro comece a desgrudar da panela.\n\nDeixe esfriar e faça pequenas bolas com a mão passando a massa no chocolate granulado.'),
	(12, 'bolinho de chuva ', 500, 'farinha, açucar, leite', 30, 'https://png.pngtree.com/png-vector/20231130/ourmid/pngtree-christmas-treats-dessert-sweets-powdered-png-image_10817755.png', 'salgado', 'nao saudavel', 'comida', 5, NULL),
	(13, 'maça do amor', 250, 'caramelo e maça', 50, 'https://static.wixstatic.com/media/9ec053_45068ad1bf8e41e89b05eae5f283cd48~mv2.png/v1/fill/w_560,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/ma%C3%A7a.png', 'doce', 'nao_sadavel', 'comida', 1, 'Lave e seque as maçãs\r\nEspete-as com 1 ou 2 palitos (ajudará na firmeza na hora de caramelizar)\r\nUnte formas de alumínio (pode ser de bolo) com óleo, bem pouco\r\nCalda\r\nColoque todos os ingredientes dentro de uma panela\r\nNesta receita não se usa nenhuma colher (pois, pode açucarar a calda)\r\nMisture/mexa apenas a panela\r\nNão use nenhum tipo de colher, pois, pode quebrar o ponto da calda\r\nAté a fervura, pode usar fogo alto, quando ferver, mude para médio e mantenha por aproximadamente 25 minutos\r\nMergulhe a ponta de um palito de sorvete na calda e pingue na forma em segundos pressione com o dedo (ela amassará) solte sobre a forma, se ela fizer barulho de sólida desligue imediatamente e comece o processo de mergulhar as maçãs e colocá-las sobre a forma previamente untada\r\nNote que o ideal é realizar este processo o mais breve possível, pois a calda vai , naturalmente endurecendo\r\n'),
	(14, 'coxinha', 350, 'frango, farinha, tempero, óleo', 20, 'https://png.pngtree.com/png-vector/20240706/ourmid/pngtree-tasty-coxinhas-brazilian-food-dish-png-image_13010705.png', 'salgado', 'nao saudavel', 'comida', 3, NULL),
	(15, 'macarrão', 500, 'macarrão, tempero, óleo, manteiga, calabresa, batata, creme de leite, carne, extrato de tomate ', 35, 'https://png.pngtree.com/png-vector/20240626/ourmid/pngtree-pasta-bolognese-with-basil-on-a-plate-png-image_12860139.png', 'salgado', 'nao saudavel', 'comida', 3, NULL),
	(16, 'brownie', 200, 'manteiga, ovos, farinha, chocolate', 15, 'https://png.pngtree.com/png-vector/20240207/ourmid/pngtree-brownie-cake-dessert-box-food-theme-decoration-png-image_11672805.png', 'doce', 'nao saudavel', 'comida', 4, NULL),
	(17, 'salada de fruta', 100, 'Mamão, melancia, abacaxi', 2, 'https://png.pngtree.com/png-vector/20231203/ourmid/pngtree-fruit-salad-in-a-glass-bowl-with-fresh-fruits-png-image_10876964.png', 'frutas', 'saudavel', 'comida', 2, 'Pique todos os ingredientes, a laranja em pedaços menores que as outras frutas, depois ela solta o caldo e a salada não fica tão ácida.'),
	(18, 'Suco de Laranja', 120, 'Laranjas, Açúcar, Água', 10, 'https://obahortifruti.vtexassets.com/arquivos/ids/6148743/Suco-De-Laranja-Oba-Bem-Querer-Sem-Casca-17l.png?v=638456683194170000', 'bebida', 'saudável', 'bebida', 2, '1. Esprema as laranjas para obter o suco. 2. Misture o suco com água e açúcar a gosto. 3. Sirva gelado.'),
	(19, 'Affogato', 150, 'Sorvete de Baunilha, Café Espresso, Chocolate Ralado, Cacau em Pó, Amêndoas Picadas', 5, 'https://png.pngtree.com/png-vector/20240510/ourmid/pngtree-exploring-global-cold-coffee-variations-from-vietnamese-iced-to-italian-affogato-png-image_12435184.png', 'bebida', 'refrescante', 'bebida', 1, '1. Coloque uma bola de sorvete em um copo. 2. Despeje o café quente sobre o sorvete. 3. Decore com chocolate, cacau ou amêndoas.'),
	(20, 'Café Gelado', 100, 'Café Forte, Leite, Açúcar, Gelo, Chantilly, Cacau em Pó, Calda de Chocolate', 10, 'https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-iced-coffee-png-png-image_10216699.png', 'bebida', 'refrescante', 'bebida', 1, '1. Faça o café forte e deixe esfriar. 2. Adoce o café. 3. Despeje sobre gelo e adicione leite. 4. Decore com chantilly e cacau, se desejar.'),
	(21, 'Banana Split', 350, 'Banana, Sorvete de Baunilha, Sorvete de Chocolate, Sorvete de Morango, Calda de Chocolate, Calda de Morango, Creme Chantilly, Nozes Picadas, Cerejas', 5, 'https://i.pinimg.com/originals/c0/8c/44/c08c44506e1a3295e452fa8077e87610.png', 'doce', 'sobremesa', 'comida', 1, '1. Corte a banana ao meio. 2. Coloque as bolas de sorvete sobre a banana. 3. Regue com caldas. 4. Adicione chantilly, nozes e cereja.'),
	(22, 'S’more', 250, 'Biscoitos Graham, Barra de Chocolate, Marshmallows', 5, 'https://static.vecteezy.com/system/resources/thumbnails/049/563/882/small/smores-biscuit-isolated-on-transparent-background-png.png', 'doce', 'sobremesa', 'comida', 1, '1. Torre o marshmallow. 2. Coloque chocolate sobre um biscoito. 3. Adicione o marshmallow quente e cubra com outro biscoito.'),
	(23, 'Café Gelado Refrescante', 120, 'Café Forte, Gelo, Leite, Açúcar, Chantilly, Calda de Chocolate', 5, 'https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-iced-coffee-png-png-image_10216699.png', 'bebida', 'refrescante', 'bebida', 1, '1. Prepare café forte e deixe esfriar. 2. Adoce o café a gosto. 3. Sirva sobre gelo com leite. 4. Decore com chantilly e calda de chocolate.'),
	(24, 'Margarita', 200, 'Tequila, Triple Sec, Limão, Sal', 5, 'https://png.pngtree.com/png-vector/20231120/ourmid/pngtree-classic-margarita-cocktail-with-lime-and-ice-png-image_10671309.png', 'bebida', 'refrescante', 'bebida', 1, '1. Misture tequila, triple sec e suco de limão. 2. Sirva com a borda do copo salgada.'),
	(25, 'Sopa de Lentilha', 150, 'Lentilhas, Cenoura, Cebola, Alho, Caldo de Legumes', 40, 'https://png.pngtree.com/png-vector/20240510/ourmid/pngtree-a-bowl-of-lentil-soup-with-piece-bread-vegetable-png-image_12433838.png', 'salgado', 'saudável', 'comida', 4, '1. Refogue cebola e alho. 2. Adicione cenoura e lentilhas. 3. Cozinhe com caldo de legumes até as lentilhas ficarem macias.'),
	(26, 'Sanduíche de Frango', 400, 'Pão, Frango Grelhado, Alface, Tomate, Maionese', 15, 'https://i.pinimg.com/originals/5b/cc/40/5bcc40ed48f73090c82cb0e441533543.png', 'salgado', 'saudável', 'comida', 1, '1. Grelhe o frango. 2. Monte o sanduíche com alface, tomate e maionese.'),
	(27, 'Smoothie de Morango', 180, 'Morango, Iogurte, Mel, Gelo', 5, 'https://png.pngtree.com/png-clipart/20231222/original/pngtree-glasses-of-fresh-strawberry-smoothie-juice-isolated-on-a-white-background-png-image_13915596.png', 'bebida', 'saudável', 'bebida', 2, '1. Bata todos os ingredientes no liquidificador. 2. Sirva gelado.'),
	(28, 'Quiche de Queijo', 300, 'Massa de Torta, Queijo, Creme de Leite, Ovos', 50, 'https://png.pngtree.com/png-vector/20240131/ourmid/pngtree-quiche-lorraine-png-with-ai-generated-png-image_11575468.png', 'salgado', 'nao saudavel', 'comida', 6, '1. Prepare a massa e forre a forma. 2. Misture queijo, creme e ovos. 3. Asse a 180°C por 30 minutos.'),
	(29, 'Panquecas de Banana', 250, 'Banana, Farinha, Ovos, Leite, Fermento', 20, 'https://www.pngall.com/wp-content/uploads/5/Pancake-PNG-Image.png', 'doce', 'saudavel ', 'comida', 4, '1. Misture todos os ingredientes. 2. Cozinhe em uma frigideira antiaderente até dourar.'),
	(30, 'Pizza Margherita', 400, 'Massa de Pizza, Molho de Tomate, Queijo, Manjericão', 30, 'https://png.pngtree.com/png-vector/20230909/ourmid/pngtree-margherita-pizza-in-a-dish-png-image_10012685.png', 'salgado', 'nao saudavel ', 'comida', 4, '1. Prepare a massa e adicione o molho. 2. Cubra com queijo e manjericão. 3. Asse a 220°C por 15 minutos.'),
	(31, 'Espaguete à Carbonara', 500, 'Espaguete, Bacon, Ovos, Queijo, Creme de Leite', 30, 'https://static.vecteezy.com/system/resources/previews/036/498/039/non_2x/ai-generated-spaghetti-carbonara-with-bacon-bits-on-transparent-background-png.png', 'salgado', 'não saudavel ', 'comida', 4, '1. Cozinhe o espaguete. 2. Frite o bacon e misture com ovos e queijo. 3. Combine com o espaguete e sirva.');

-- Copiando estrutura para tabela banco_lemenu.favoritos
CREATE TABLE IF NOT EXISTS `favoritos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `receita_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  KEY `receita_id` (`receita_id`),
  CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `cadastro_clientes` (`id_usuario`),
  CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`receita_id`) REFERENCES `cadastro_receitas` (`id_receita`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Copiando dados para a tabela banco_lemenu.favoritos: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
