import { Login } from "../models/Login";
import jwt, { Secret } from 'jsonwebtoken';
const dotenv = require('dotenv')
dotenv.config()


const token = process.env.SECRET_JWT

export const loginService = async (username: string) => Login.findOne({username: username}).select('+password')

export const generateToken = (id: any) => jwt.sign({id: id}, '7273c538218fe576bdb0bad9dcd391c2', {expiresIn: 10})