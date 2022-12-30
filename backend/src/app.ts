// config inicial
import express from "express";
import cors from "cors";
import logger from "morgan";
import { userRoutes } from "./Routes/userRoutes";
import { loginRoutes } from "./Routes/loginRoutes";

// import personRoutes from './routes/personRoutes'
export const app = express();

// forma de ler JSON / middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());
app.use(cors());
app.use(logger("dev"));

// Integra o endpoint na aplicação
app.use("/user", userRoutes);
app.use("/login", loginRoutes);
