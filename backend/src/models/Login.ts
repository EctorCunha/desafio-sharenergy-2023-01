import mongoose from "mongoose";
import { IUser } from "../types/types";


const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const LoginSchema = new Schema({
    id: ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    }
})



export const Login = mongoose.model("login", LoginSchema);

