import userModel  from "../models/usermodel";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


// login user
const loginUser=async (req,res)=>{

}


// register user
const registerUser=async(req,res)=>{

    const {name,email,password}=req.body;
    try{
        // checking for user is already registered or not
        const exists=await userModel.findOne({email});
        if(exists)
        {
            return res.json({success:false,message:"user is already exists"})
        }
        // 6:03
    }
}

export {loginUser,registerUser}