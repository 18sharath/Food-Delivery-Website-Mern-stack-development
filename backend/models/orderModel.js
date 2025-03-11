import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food processing"},
    date:{type:Date,default:Date.now()},
<<<<<<< HEAD
    payment:{type:Boolean,default:false},
    
=======
    payment:{type:Boolean,default:false}
>>>>>>> 9318b2611041fc2619d913f59a391ae474bb7dfa

})

const orderModel= mongoose.models.order || mongoose.model("order",orderSchema)

export default orderModel;