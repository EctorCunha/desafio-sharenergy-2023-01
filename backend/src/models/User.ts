import mongoose from "mongoose";


const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const UserSchema = new Schema({
    id: ObjectId,
    fullName: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
})


export const User = mongoose.model("user", UserSchema);

