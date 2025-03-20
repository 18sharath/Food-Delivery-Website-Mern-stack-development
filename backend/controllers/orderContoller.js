
import orderModel from "../models/orderModel.js";
import userModel from "../models/usermodel.js";
import Stripe from "stripe"
import dotenv from 'dotenv'
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


const placeOrder = async (req, res) => {
    // elli change madde
    try {
        const frontend_url="http://localhost:5173";


        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        const line_items = req.body.items.map((item) => ({

            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name
                },
                // unit_amount:item.price*100*80
                // Convert INR to USD cents:
                unit_amount: Math.round((item.price / 80) * 100)


            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency: "usd",
                product_data: {
                    name: "Delivery charges"
                },
                unit_amount:2*100

            },
            quantity:1

        })

        // const session=await stripe.checkout.sessions.create({
        //     line_items:line_items,
        //     mode:'payment',
        //     success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        // })
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // <-- added payment methods
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
          });
          console.log("Stripe session:", session);
          
        res.json({success:true,session_url:session.url}) 
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
        // 8:04:30
    }
}

const verifyOrder = async (req,res)=>{
 const {success, orderId}=req.body;
 try{

 
 if(success=="true")
 {
    await orderModel.findByIdAndUpdate(orderId,{payment:true});
    res.json({success:true,message:"Paid"});
 }
 else
 {
    await orderModel.findByIdAndDelete(orderId);
    res.json({success:false,message:"Not Paid"});
 }
}
catch(error)
{
    res.json({success:false,message:"Error"});
}
}

// user orders for frontend

const userOrders=async (req,res)=>{
    try {
        const orders=await orderModel.find({userId:req.body.userId});
        
    } catch (error) {
        
    }
}


export { placeOrder,verifyOrder,userOrders };
