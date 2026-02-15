import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import { pool } from "../database/database.js";

const getUser = async (email) => {
  const query = "SELECT * from usuarios WHERE email = $1";
  const { rows: user, rowCount } = await pool.query(query, [email]);
  if (!rowCount) {
    throw { code: 404, message: "Usuario no encontrado" };
  }
  return user;
};

const createUser = async (usuario) => {
  // crear varaible usuario
  let { email, password, rol, lenguage } = usuario;
  password = password.toString();
  //encriptar clave
  const encryptPass = bcrypt.hashSync(password);
  //crear array de valores para consulta
  const values = [email, encryptPass, rol, lenguage];
  //crear consulta
  const query = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)";
  await pool.query(query, values);
};

const verifyUser = async (email, password) => {
  const values = [email];
  const query = "SELECT * from usuarios where email = $1";
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(query, values);

  if (!rowCount) {
    throw { code: 404, message: "Usuario no encontrado" };
  }

  const { password: encryptPass } = usuario;
  const rightPass = bcrypt.compareSync(password, encryptPass);

  if (!rightPass || !rowCount)
    throw {
      code: 401,
      message: "Email o contraseña incorrecta",
    };
};

const usuariosModel = {
  getUser,
  createUser,
  verifyUser,
};

export default usuariosModel;
