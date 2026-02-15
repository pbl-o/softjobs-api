# Soft-jobs-API

Servidor para autenticación y autorización de usuarios usando JWT.
(API REST)

## Tecnologías Empleadas

- Node.js, express.js, Postgre SQL

## Instalación y uso.

Instrucciones des instalación y configuración del proyecto:

1. Clonar repositorio:

```bash
git clone https://github.com/pbl-o/softjobs-api.git
```


2. Instalar dependencias:

```bash
npm install
```

3. Crear la base de datos en el servidor local usando el archivo
   'schema.sql' o copiándola directamente de aquí:

```bash


CREATE DATABASE softjobs;
\c softjobs;

DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios ( id SERIAL, email VARCHAR(50) NOT NULL UNIQUE, password
VARCHAR(60) NOT NULL, rol VARCHAR(25), lenguage VARCHAR(20) );
SELECT * FROM usuarios;

```

4. crear .env o modificar 'env.example' añadiendo las propias credenciales.

5. Para Levantar el servidor:

```bash
npm run dev
```

Para consultar datos por medio de un api tester:

Rutas:
GET /usuarios (viusalización de información autorizada)
POST /usuarios (registro de usuario)
POST /usuarios/login (incio de sesión)


Pablo E. Díaz. A.
