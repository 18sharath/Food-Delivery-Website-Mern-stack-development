import userModel  from "../models/usermodel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'


const createToken=(id)=>{ // we are taking the user id and returning the token
    return jwt.sign({id},process.env.JWT_SECRET)
}

// login user
const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user)
        {
            return res.json({success:false,message:"user doest Not exists"});
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.json({success:false,message:"Invalid credentials"})
        }
        const token=createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"error"})
        
    }


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
        // validating email format  and strong password
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"please enter a valid email"})
   
        }
        if(password.length<8)
        {
            return res.json({success:false,message:"password length should be above 8"})
        }
        // hashing my password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user=await newUser.save();
        const token=createToken(user._id);
        res.json({success:true,token});

    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"error"});
        
    }
}

export {loginUser,registerUser}