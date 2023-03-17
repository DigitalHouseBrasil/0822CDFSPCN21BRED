-- Criar um banco de dados
CREATE DATABASE IF NOT EXISTS dh;

-- Selecionar um banco de dados
USE dh;

-- Criar tabelas no banco de dados: categoria_usuario, usuario
CREATE TABLE IF NOT EXISTS categoria_usuario (
	id INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
    nome VARCHAR(64) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS usuario (
	id INT NOT NULL PRIMARY KEY UNIQUE AUTO_INCREMENT,
    username VARCHAR(128) NOT NULL UNIQUE,
    nome VARCHAR(128),
    passwd VARCHAR(128) NOT NULL,
    categoria_id INT REFERENCES categoria_id(id)
);

-- Criar as entradas no banco de dados
INSERT INTO categoria_usuario (nome) VALUES ('superadmin'), ('admin'), ('user'), ('visitor');

INSERT INTO usuario (username, nome, passwd, categoria_id)
VALUES ('fulano@mail.com', 'Fulano', '123', 2), ('clicrano@mail.com', 'Cicrano', 'abc', 1), ('beltrano@mail.com', 'Beltrano', 'abc123', 0),  ('visitante@sistema', 'Visitante', 'null', 3);

-- Visualizar: tudo, certas colunas, certas linhas
SELECT * FROM usuario;
SELECT * FROM usuario WHERE username LIKE 'fulano%';

-- Deletar um registro
DELETE FROM usuario WHERE id = 3;

-- Deletar uma coluna
ALTER TABLE usuario DROP COLUMN categoria_id;

-- Deletar uma tabela
DROP TABLE categoria_usuario;

-- Deletar o banco de dados
DROP DATABASE dh;