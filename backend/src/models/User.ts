import mongoose from "mongoose";


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

