CREATE DATABASE IF NOT EXISTS item_manager;
USE item_manager;

-- Apaga tabela existente/antiga
DROP TABLE IF EXISTS items;

CREATE TABLE items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    foto VARCHAR(500) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    preco_minimo DECIMAL(20,2) NOT NULL,
    preco_maximo DECIMAL(20,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dados para teste
INSERT INTO items (foto, pais, nome, descricao, preco_minimo, preco_maximo) VALUES
('https://static.encyclopedia.warthunder.com/images/f_16c_block_52_aesa.png',
'USA', 'F-16CM PoBIT', 'Caça multirole 4ª geração', 18000000.00, 63000000.00),

('https://static.encyclopedia.warthunder.com/images/saab_jas39e.png',
'Suécia', 'JAS39E Gripen E', 'Caça leve multirole 4ª geração', 30000000.00, 85000000.00),

('https://static.encyclopedia.warthunder.com/images/j_10c.png',
'China', 'Chengdu J-10C', 'Caça multirole 4ª geração', 28000000.00, 40000000.00),

('https://static.encyclopedia.warthunder.com/images/ef_2000_aesa.png',
'Alemanha', 'EF-2000 Eurofighter Typhoon', 'Caça europeu 4.5ª geração', 90000000.00, 120000000.00),

('https://static.encyclopedia.warthunder.com/images/rafale_c_f3.png',
'França', 'Dassault Rafale C F3', 'Caça multirole francês', 80000000.00, 110000000.00),

('https://static.encyclopedia.warthunder.com/images/su_27.png',
'USSR', 'Su-27 Flanker', 'Caça pesado de superioridade aérea', 30000000.00, 40000000.00);

SELECT * FROM items;
