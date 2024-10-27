import mongoose  from "mongoose";
// export const connectDB=async()=>{
//     await mongoose.connect('mongodb+srv://sharatht:sharath1212@cluster0.fd61q.mongodb.net/food-del').then(()=>console.log('DB Connected'))
// }
// const mongoose =require('mongoose');
export const connectDB=()=>mongoose.connect('mongodb://localhost:27017/food-del')
   .then(() => {
      console.log("COnnection open connected to mongo");
   })
   .catch(err => {
      console.log("ohh no error");
      console.log(err);
   });