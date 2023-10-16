import { json } from "express";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";


export const getAllUser = async(req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return console.log(error);
    }
    if(!users){
        return res.status(404).json({message: "No user found...."});
    }
    return res.status(200).json({users});
};

export const signup = async(req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message: "User already exist!! Login instead."})
    } 
    const hashPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password:hashPassword,
        blogs:[],
    });
    
    try{
          await  user.save();
    } catch(err){
       return console.log(err);
    }
    return res.status(201).json({user})
};

export const signin = async(req,res,next) => {
    const { email, password } = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return console.log(err);
    }
    if(!existingUser){
        return res.status(404).json({message: "could not find user."})
    }  
    
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message: "incorrect password"});
    }
    return res.status(200).json({message: "Login succesfull!!!"});
};

export const deleteUser = async(req, res, next) =>{
    const userId = req.params.id;
    try{
        await User.findOneAndRemove(userId);
    }catch(error){
        return console.log(error);
    }
    if(!userId){
        return res.status(400).json({message:"unable to find the user........"})
    }
    return res.status(200).json({mssage:"succesfully deleted user"});
};
export const updateUser = async(req, res, next) => {
    const { name, email } = req.body;
    const userId =  req.params.id;

    let user;
    try{
         user = await User.findByIdAndUpdate(userId,{
            name,
            email
        });
    }catch(error){
        return console.log(error);
    }
    if(!userId){
        return res.status(400).json({message:"unable to find the user...."})
    }
    return res.status(200).json({user});
}


