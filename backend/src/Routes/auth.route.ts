import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import { loginService } from "../service/auth.service";
import { ILogin } from "../types/types";

export const authRoute = Router();

// const logins: ILogin[] = [];

// Comparar login
authRoute.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await loginService(username);

    if (user !== null) {
      const passwordIsValid = bcrypt.compareSync(password, user.password);
      console.log(passwordIsValid);
      if (!passwordIsValid) {
        return res.status(401).json({ message: "Senha inválida" });
      }
    }
    res.send(user);
  } catch (error) {
    res.status(500).json({ message: "Usuário não foi encontrado" });
  }
});

// authRoute.post('/login', async (req : Request, res : Response) => {
//     const user = logins.find(user => user.username === req.body.username)
//     const password = logins.find(user => user.password === req.body.password)

//     if(user == null) {
//         return res.status(400).json({message:'Usuário não foi encontrado'})
//     }

//     if(password == null) {
//         return res.status(400).json({message:'Senha não foi encontrada'})
//     }
// })

// authRoute.post('/login', async (req : Request, res : Response) => {
//     res.json({message:'Login ok'})
// })
