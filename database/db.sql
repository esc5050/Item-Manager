CREATE DATABASE IF NOT EXISTS item_manager;
USE item_manager;

CREATE TABLE items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    foto VARCHAR(500) NOT NULL,
    pais VARCHAR(100) NOT NULL,
    nome VARCHAR(150) NOT NULL,
    descricao TEXT,
    preco_minimo DECIMAL(20,2) NOT NULL,
    preco_maximo DECIMAL(20,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dados para teste
INSERT INTO items (foto, pais, nome, descricao, preco_minimo, preco_maximo) VALUES
('url da imagem', 'USA', 'F-22 Raptor', '5ª Geração', 150000000.00, 350000000.00),
('url da imagem', 'USSR', 'Su-27 Flanker', '4ª Geração', 30000000.00, 40000000.00),
('url da imagem', 'China', 'J-20 Mighty Dragon', '5ª Geração', 100000000.00, 110000000.00);

SELECT * FROM items;
