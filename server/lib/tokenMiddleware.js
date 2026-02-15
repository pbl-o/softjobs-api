import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

/* 

code : 23505 // user already exists

*/

/* 
const isMatch = bcrypt.compareSync(password, user.password)
!isMatch && res.status(400).json({message: "invalid credentials"})
 */

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, process.env.SUPER_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};

export const reportQuery = async (req, res, next) => {
  try {
    const method = req.method;
    const route = req.route.path;
    console.log(`${method} ${route}`);
    next()
  } catch (error) {
    console.error(error);
  }
};
