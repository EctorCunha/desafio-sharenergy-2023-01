import mongoose from "mongoose";


const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId;

const RegisterSchema = new Schema({
    id: ObjectId,
    name: String,
    email: String,
    telephone: String,
    address: String,
    cpf: String,

})


export const Register = mongoose.model("register", RegisterSchema);

