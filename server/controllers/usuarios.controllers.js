import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

import usuariosModel from "../models/usuarios.models.js";
import { getDatabaseError } from "../lib/error.js";

const SECRET_KEY = process.env.SUPER_SECRET;

const getUserInfo = async (req, res) => {
  try {
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    //verificar
    jwt.verify(token, `${SECRET_KEY}`);
    //ejectuar acción autorizada

    //decode email
    const { email } = jwt.decode(token);
    console.log(`Usuario ${email}: Acceso a datos autorizado  `);

    const payload = await usuariosModel.getUser(email);
    return res.status(200).json(payload);
  } catch (error) {
    console.error(error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    await usuariosModel.verifyUser(email, password);
    const token = jwt.sign({ email }, `${SECRET_KEY}`);
    res.json({ token });
  } catch (error) {
    console.error(error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const usuario = req.body;
    await usuariosModel.createUser(usuario);
    res.status(201).send("Usuario creado con exito");
  } catch (error) {
    console.error(error);
    if (error.code) {
      const { code, message } = getDatabaseError(error.code);
      return res.status(code).json({ message });
    }
    return res.status(500).json({ message: error.message });
  }
};

const usuariosController = {
  getUserInfo,
  userLogin,
  registerUser,
};

export default usuariosController;
