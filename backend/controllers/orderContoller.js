
import orderModel from "../models/orderModel.js";
import userModel from "../models/usermodel.js";
import Stripe from "stripe"
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
                unit_amount:item.price*100*80

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
          
        res.json({success:true,success_url:session.url}) 
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

// import orderModel from "../models/orderModel.js";
// import userModel from "../models/usermodel.js";
// import axios from "axios";

// const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;  
// const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
// const CASHFREE_BASE_URL = "https://sandbox.cashfree.com/pg/orders"; 

// const frontend_url = "http://localhost:5173";

// const placeOrder = async (req, res) => {
//     try {

        
//         console.log(req.body)
//         const newOrder = new orderModel({
//             userId: req.body.userId,
//             items: req.body.items,
//             amount: req.body.amount,
//             address: req.body.address,
//             payment: false
//         });

//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
//         const customerPhone = req.body.phone || "9999999999";
//         console.log(customerPhone);
        
//         // Prepare order details for Cashfree
//         const orderPayload = {
//             order_id: newOrder._id.toString(),
//             order_amount: req.body.amount,
//             order_currency: "INR",
//             order_note: "Food order",
            
//             customer_details: {
//                 customer_id: req.body.userId,
//                 customer_name: req.body.name,
//                 customer_email: req.body.email,
//                 customer_phone: customerPhone
                
//             },
//             order_meta: {
//                 return_url: `${frontend_url}/verify?orderId=${newOrder._id}&status={order_status}`
//             }
//         };

//         // Make request to Cashfree to create a payment order
//         const response = await axios.post(CASHFREE_BASE_URL, orderPayload, {
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-client-id": CASHFREE_APP_ID,
//                 "x-client-secret": CASHFREE_SECRET_KEY,
//                 "x-api-version": "2023-08-01"
//             }
//         });
//         console.log("Order Placement Response:", response?.data); 
//         // res.json(response?.data); 

//         // Send payment link to the frontend
//         // res.json({ success: true, payment_link: response.data.payment_link });
//         // res.json({ success: true, session_url: `https://your-payment-url/${response.data.payment_session_id}` });
//         const paymentBaseUrl = "https://sandbox.cashfree.com/pg/";
// const session_url = paymentBaseUrl + response.data.payment_session_id;
// res.json({ success: true, session_url });

//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: "Error creating order" });
//     }
// };

// // Order verification after payment
// const verifyOrder = async (req, res) => {
//     const { orderId, status } = req.query;
//     try {
//         if (status === "PAID") {
//             await orderModel.findByIdAndUpdate(orderId, { payment: true });
//             res.json({ success: true, message: "Payment successful" });
//         } else {
//             await orderModel.findByIdAndDelete(orderId);
//             res.json({ success: false, message: "Payment failed" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: "Error verifying payment" });
//     }
// };

// // Get user orders
// const userOrders = async (req, res) => {
//     try {
//         const orders = await orderModel.find({ userId: req.body.userId });
//         res.json({ success: true, orders });
//     } catch (error) {
//         res.json({ success: false, message: "Error fetching orders" });
//     }
// };

// export { placeOrder, verifyOrder, userOrders };
