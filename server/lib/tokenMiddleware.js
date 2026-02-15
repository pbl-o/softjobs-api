import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

// Verifica existencia para validar posteriormente (2.a, 2.b)
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, process.env.SUPER_SECRET);
    req.user = payload;
    console.log("Token exists");
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};

//Reporta consulta vía terminal
const reportQuery = async (req, res, next) => {
  try {
    const method = req.method;
    const route = req.route.path;
    const realRoute = req.originalUrl;
    console.log(`${method} ${realRoute}`);
    next();
  } catch (error) {
    console.error(error);
  }
};

const middlewareToken = {
  authMiddleware,
  reportQuery,
};

export default middlewareToken;
