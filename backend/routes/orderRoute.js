import express from "express"
import authMiddleware from "../middleware/auth.js";

<<<<<<< HEAD
import { placeOrder, verifyOrder,userOrders } from "../controllers/orderContoller.js";
=======
import { placeOrder } from "../controllers/orderContoller.js";
>>>>>>> 9318b2611041fc2619d913f59a391ae474bb7dfa


const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);

<<<<<<< HEAD
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders)
=======
>>>>>>> 9318b2611041fc2619d913f59a391ae474bb7dfa
export default orderRouter;


