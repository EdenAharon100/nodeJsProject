import { generateTokem, userModel, userValidator } from "../models/Users.js";
import bcrypt from "bcryptjs"


export const addUser = async (req, res) => {
    let { email, password, userName, role } = req.body

   let result=userValidator();
   if(result.error)
   return res.status(400).json({ type: "invalid data", message: result.error.details[0].message })
    try {
       
        const sameUser = await userModel.findOne({ email: email });
    
        if (sameUser)
            return res.status(409).json({ type: "same user", message: "usre with such email already exists" })
        
        let hashedPassword = await bcrypt.hash(password, 10);
        let newUser = new userModel({ email, password: hashedPassword, userName,role });
        await newUser.save();
        let token = generateTokem(newUser._id, newUser.role, newUser.userName); console.log(token)
        return res.json({_id:newUser._id,token,userName:newUser.userName,role:newUser.role,email:newUser.email})
       }
    catch (err) {
        res.status(400).json({ typr: "invalid operation", message: "cannot add user" })
    }
}

export const login = async (req, res) => {
    let { email, password } = req.body;

    if (!email || !password)

        return res.status(404).json({ type: "missing parameters", message: "please send email and password" })
    try {
        const user = await userModel.findOne({ email: email });
        console.log(user)
        if (!user)
            return res.status(404).json({ type: "no user", message: "one or more details are invalid" });
        let token = generateTokem(user._id,user.role,  user.userName);
        return res.json({_id:user._id, token, userName:user.userName, role:user.role,email:user.email})
    }
    catch (err) {
        res.status(400).json({ type: "invalid operation", message: "cannot sign in user" })
    }
}

export const getAllUsres = async (req, res) => {
    try {
        let allUsers = await userModel.find({}, "-password");
        res.json(allUsers)
    }
    catch (err) {
        res.status(400).json({ typr: "invalid operation", message: "sorry cannot get wines" })
    }
}