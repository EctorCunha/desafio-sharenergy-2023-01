import { User } from "../models/User"

export const findAllService = (limit:number, offset:number) => {
User.find().sort({ _id: -1 }).limit(limit).skip(offset)
}

export const countDocuments = () => User.countDocuments()