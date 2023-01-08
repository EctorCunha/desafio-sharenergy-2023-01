import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import { loginService } from "../service/auth.service";
import {generateToken} from "../service/auth.service";

export const authRoute = Router();


// Comparar login
authRoute.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await loginService(username);

    if(!user){
        return res.status(401).json({ message: "Usuário ou Senha não encontrados" });
    }

    if (user !== null) {
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).json({ message: "Usuário ou Senha não encontrados" });
      }
    }

    const token = generateToken(user.id);

    res.json({token});

    if(!token){
        return res.status(401).json({ message: "Usuário ou Senha não encontrados" });
    }

  } catch (error) {
    res.status(500).json({ message: "Usuário não foi encontrado" });
  }
});
