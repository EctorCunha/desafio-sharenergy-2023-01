import { Router } from "express";
import { Login } from "../models/Login";
import { IUser } from "../types/types";
import bcrypt from 'bcrypt'

export const loginRoutes = Router();


loginRoutes.post('/', async (req, res) => {
  const { email, password } = req.body;

  const usuario = Login.find(usuario => email.name === req.body.name)
  if(usuario == null) {
    return res.status(400).send('Usuário não foi encontrado')
  }

  // try {
  //   if(await bcrypt.compare(req.body.password, usuario.password)) {
  //     res.send('Success')
  //   } else {
  //     res.send('Not Allowed')
  //   }
  // } catch (error) {
  //   res.status(500).send()
  // }

  if (!email || !password) {
    res.status(422).json({ error: "Preencha todos os campos" });
    return;
  }
})


// CREATE LOGIN
// loginRoutes.post("/", async (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     res.status(422).json({ error: "Campos obrigatórios" });
//     return;
//   }

//   const login = { username, password };


//   try {
//     // criando dados
//     await Login.create(login);

//     res.status(201).json({ message: "Usuário criado" });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// });


// READ LOGIN
loginRoutes.get("/", async (req, res) => {
  try {
    const logins = await Login.find();
    res.status(200).json(logins);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


// DELETE LOGIN
loginRoutes.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const login = await Login.findById(id);

  if (!login) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  try {
    await Login.deleteOne({ _id: id });

    res.status(200).json({ message: "Usuário deletado" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

