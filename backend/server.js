// package why it is usefull
// whenever we will type npm run server it will execute server.js file
 import express from "express"
 import cors from "cors"//Using cors, you can configure your server to accept requests from specific domains, or allow requests from any domain if needed. Here’s how it is typically used:
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"




 //app config
const app=express()
const port=4000


//middle ware
app.use(express.json()) // whenever  we will get request from user it will parse the data
app.use(cors()) // using this we can access the  bankend from any frontend
// If your frontend (React/Vue/Angular) is hosted on http://localhost:3000 and your backend API is on http://localhost:5000, without enabling CORS,
// requests from the frontend to the backend would be blocked. By using cors, you can allow your backend to accept these requests, thus enabling cross-origin communication.



// db connection
connectDB();


// api endpoints
app.use('/api/food',foodRouter)
app.use("/images",express.static('uploads'))

app.get("/",(req,res)=>{
    res.send("API working")
}) //http method using that we can request the data from the server

app.listen(port,()=>{
    console.log(`server started : http://localhost:${port}`)
})
