-- Active: 1769730037726@@127.0.0.1@5432@softjobs

CREATE DATABASE softjobs;
\c softjobs;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios ( id SERIAL, email VARCHAR(50) NOT NULL UNIQUE, password
VARCHAR(60) NOT NULL, rol VARCHAR(25), lenguage VARCHAR(20) );
SELECT * FROM usuarios;