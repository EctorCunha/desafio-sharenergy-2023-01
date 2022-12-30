import { Router, Request, Response } from "express";
import { Login } from "../models/Login";
import { ILogin } from "../types/types";
import * as bcrypt from 'bcrypt'

export const loginRoutes = Router();

const logins:ILogin[] = []


// Criptografar senha
loginRoutes.post('/', async (req : Request, res : Response) => {

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const login = { username: req.body.username, password: hashedPassword };
    logins.push(login)
    res.status(201).send()
  } catch {
    res.status(500).send()
  }
})


// Comparar login
loginRoutes.post('/auth', async (req : Request, res : Response) => {
  const user = logins.find(user => user.username === req.body.username)
  if(user == null) {
    return res.status(400).send('Usuário não foi encontrado')
  }

  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success')
    } else {
      res.send('Not Allowed')
    }
  } catch (error) {
    res.status(500).send()
  }
})


// CREATE LOGIN
loginRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // const passwordHash = await bcrypt.hash(password, 10)

  if (!username || !password) {
    res.status(422).json({ error: "Campos obrigatórios" });
    return;
  }

  // const login = await getRepository(Login).save({
  //   username,
  //   password: passwordHash
  // })

  const login = { username, password };


  try {
    // criando dados
    await Login.create(login);

    res.status(201).json({ message: "Usuário criado" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});


// READ LOGIN
loginRoutes.get("/", async (req, res) => {
  try {
    const login = await Login.find();
    res.status(200).json(login);
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

