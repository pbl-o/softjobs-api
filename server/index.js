import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./routes/usuarios.routes.js";

import cors from "cors";

import { getDataConnection} from "./database/database.js";

const app = express();
const PORT = process.env.API_PORT;

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  await getDataConnection();
  res.send("Page working");
});


app.use("/usuarios", userRouter);


app.listen(PORT, async () => {
  console.log(`page working on http://localhost:${PORT}`);
  await getDataConnection();
});
