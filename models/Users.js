import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";

const userSchema = mongoose.Schema({
    userName: String,
    password: String,
    email: { type: String, unique: true },
    role: { type: String, default: "USER" }
})

export const userModel = mongoose.model("users", userSchema)

export const generateTokem = ( _id, role, userName ) => {
    let token = jwt.sign({ _id, role, userName }, process.env.SECRET_JWT, {expiresIn: "1h"});
    return token;
}

export const userValidator = (_user) => {
    const userValidatorionSchema =Joi.object({
        userName: Joi.string().min(3).max(15).required(),
        password: Joi.string().min(3).max(15),
        email: Joi.string().min(3).max(500),
        role: Joi.date()
    })
    return userValidatorionSchema.validate(_user);
}