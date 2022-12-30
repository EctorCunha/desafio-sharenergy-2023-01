import mongoose from "mongoose";
import { IUser } from "../types/types";


const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const LoginSchema = new Schema({
    id: ObjectId,
    username: String,
    password: String,
})


export const Login = mongoose.model("login", LoginSchema);

