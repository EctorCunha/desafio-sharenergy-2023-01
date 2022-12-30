import mongoose from "mongoose";
import { IUser } from "../types/types";


const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
    id: ObjectId,
    fullName: String,
    photo: String,
    email: String,
    username: String,
    password: String,
    age: Number,
})


export const User = mongoose.model("user", UserSchema);

