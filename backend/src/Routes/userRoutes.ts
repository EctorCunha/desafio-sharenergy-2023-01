import { Router } from "express";
import { User } from "../models/User";
import { IUser } from "../types/types";

export const userRoutes = Router();


// Rotas da API
// ============== CREATE ==================
userRoutes.post("/", async (req, res) => {
  const { fullName, photo, email, username, password, age } = req.body;

  if (!email) {
    res.status(422).json({ error: "O email é obrigatório" });
    return;
  }

  const user = { fullName, photo, email, username, password, age };


  try {
    // criando dados
    await User.create(user);

    res.status(201).json({ message: "Usuário criado" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// ============ READ ===================
userRoutes.get("/", async ({ req, res }: any) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

userRoutes.get("/:id", async (req, res) => {

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ error: "Usuário não encontrado" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// ========== UPDATE ==================
userRoutes.put("/:id", async (req, res) => {
  const id = req.params.id;

  const { fullName, photo, email, username, password, age } = req.body;

  const user = {
    fullName,
    photo,
    email,
    username,
    password,
    age,
  };

  try {
    const updateUser = await User.updateOne({ _id: id }, user);

    if (updateUser.matchedCount === 0) {
      res.status(422).json({ error: "Usuário não encontrado" });
      return;
    } else if (updateUser){
      res.status(200).json({ message: "Usuário atualizado" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// ============== DELETE ==================
userRoutes.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) {
    res.status(404).json({ error: "Usuário não encontrado" });
    return;
  }

  try {
    await User.deleteOne({ _id: id });

    res.status(200).json({ message: "Usuário deletado" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});
