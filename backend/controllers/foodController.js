import { log } from "console";
import foodmodel from "../models/foodmodel.js";
import fs from 'fs'// it pre built in the node js

// add food item

const addFood=async(req,res)=>{

    if (!req.file) {
        return res.status(400).json({ success: false, message: "No image uploaded" });
    }
    let image_filename=`${req.file.filename}`;
    const food=new foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// all food list
const listFood=async (req,res)=>{
     try{
        const foods= await foodmodel.find({});
        res.json({success:true,data:foods})
     }
     catch{
        console.log(error);
        res.json({success:false,message:"Error"})
        
     }
}
// remove food item
const removeFood=async(req,res)=>{
    try{
        const food=await foodmodel.findById(req.body.id);

        console.log(food);
        fs.unlink(`uploads/${food.image}`,async()=>{
         await foodmodel.findByIdAndDelete(req.body.id);
        })
    }catch(error)
    {
        console.log(error);
        res.json({sucess:false,message:'error'});
        
    }
}


export {addFood,listFood,removeFood}



