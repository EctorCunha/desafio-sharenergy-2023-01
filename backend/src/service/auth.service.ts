import { Login } from "../models/Login";

export const loginService = async (username: string) => Login.findOne({username: username}).select('+password')