import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";

import cors from "cors";

import { getDataConnection, getUser } from "./database/database.js";
import { verifyUser, createUSer } from "./database/database.js";
import { authMiddleware, reportQuery } from "./lib/tokenMiddleware.js";

const app = express();
const PORT = process.env.API_PORT;
const SECRET_KEY = process.env.SUPER_SECRET;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  await getDataConnection();
  res.send("Page working");
});

app.get("/usuarios",authMiddleware,reportQuery, async (req, res) => {
  try {
   const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    //verificar
    jwt.verify(token, `${SECRET_KEY}`);
    //ejectuar acción autorizada

    //decode email
    const {email} = jwt.decode(token)
    console.log(`User ${email} has accessed to his information via getUser`)
    
    const payload = await getUser(email);
    return res.status(200).json(payload);
  } catch (error) {
    console.error(error);
    return res.status(error.code || 500).send(error)
  }
});

app.post("/login",reportQuery, async (req, res) => {
  try {
    const { email, password } = req.body;
    await verifyUser(email, password);
    const token = jwt.sign({ email }, `${SECRET_KEY}`);
    res.json({token});
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).send(error);
  }
});

app.post("/usuarios",reportQuery, async (req, res) => {
  try {
    const usuario = req.body;
    await createUSer(usuario);
    res.status(201).send("Usuario creado con exito");
  } catch (error) {
    console.error(error);
    res.status(error.code || 500).send(error);
  }
});

app.listen(PORT, async () => {
  console.log(`page working on http://localhost:${PORT}`);
  await getDataConnection();
});
