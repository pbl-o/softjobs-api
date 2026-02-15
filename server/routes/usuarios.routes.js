import { Router } from "express";
import usuariosController from "../controllers/usuarios.controllers.js";
import middlewareToken from "../lib/tokenMiddleware.js";

const userRouter = Router();

userRouter.get(
  "/",
  middlewareToken.authMiddleware,
  middlewareToken.reportQuery,
  usuariosController.getUserInfo,
);
userRouter.post(
  "/login",
  middlewareToken.reportQuery,
  usuariosController.userLogin,
);
userRouter.post(
  "/",
  middlewareToken.reportQuery,
  usuariosController.registerUser,
);

export default userRouter;
