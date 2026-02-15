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
Para consultar datos por medio de un api tester (Thunder Client):
Los procesos descritos a continuación se ejecutan automáticamente al utilizar el lado cliente (REACT app).

Rutas:
1. Registrar un usuario nuevo:
POST /usuarios (registro de usuario) {"email": "tu_email", "password":"tu_contraseña, rol, lenguage"}
2. Acceder sesión personal (Obtener token)
POST /usuarios/login (incio de sesión)
      a. Ingresar Credenciales {"email": "tu_email", "password":"tu_contraseña"}
      b. Se desplegará el token en la pantalla del tester (copiar).
3. Acceder a información previamente ingresada (con autorización)
GET /usuarios (viusalización de información autorizada vía token validation) 
      a. Acceder a la apartado "headers" del método
      b. En el tercer item rellenar el espacio "header" con "Authorization" y el espacio "value" con "Bearer <Token>" (colocar el token a continuación de "Bearer " ) 
      b. Ejecutar la función, si las credenciales están correctas, la información ingresada al registrar el usuario será desplegada en la pantalla de Thunderclient. 


Pablo E. Díaz. A.
