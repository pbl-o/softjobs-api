import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

import usuariosModel from "../models/usuarios.models.js";

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
    console.log(`User ${email} has accessed to his information via getUser`);

    const payload = await usuariosModel.getUser(email);
    return res.status(200).json(payload);
  } catch (error) {
    console.error(error);
    return res.status(error.code || 500).send(error);
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
    res.status(error.code || 500).send(error);
  }
};

const registerUser = async (req, res) => {
  try {
    const usuario = req.body;
    await usuariosModel.createUser(usuario);
    res.status(201).send("Usuario creado con exito");
  } catch (error) {
    console.error(error);
    if (error.code === "23505") {
      return res.status(409).json({
        message: "Usuario o email ya registrado",
      });
    }
    res.status(error.code || 500).send(error);
  }
};

const usuariosController = {
  getUserInfo,
  userLogin,
  registerUser,
};

export default usuariosController;
