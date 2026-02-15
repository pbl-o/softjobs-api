import dotenv from "dotenv";
dotenv.config();
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import format from "pg-format";

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});

export const getDataConnection = async () => {
  const { rows } = await pool.query("SELECT NOW()");
  if (!rows || rows.length === 0) {
    console.log(error);
  }
  console.log(`Database connected at ${rows[0].now}`);
};

export const getUser = async (email) => {
  const query = "SELECT * from usuarios WHERE email = $1";
  const { rows: user, rowCount } = await pool.query(query, [email]);
  if (!rowCount) {
    throw { code: 404, message: "User not found" };
  }
  return user;
};

export const createUSer = async (usuario) => {
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

export const verifyUser = async (email, password) => {
  const values = [email];
  const query = "SELECT * from usuarios where email = $1";
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(query, values);

  if (!rowCount) {
    throw { code: 404, message: "User not found" };
  }

  const { password: encryptPass } = usuario;
  const rightPass = bcrypt.compareSync(password, encryptPass);

  if (!rightPass || !rowCount)
    throw {
      code: 401,
      message: "Email o contraseña incorrecta",
    };
};
