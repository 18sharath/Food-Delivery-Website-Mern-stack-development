    import express from 'express'
    import { addFood,listFood,removeFood} from '../controllers/foodController.js'
    import multer from 'multer' //which is primarily used for uploading files. It simplifies the process of managing file uploads in web applications.
    const foodRouter=express.Router();

    // Image Stroge Engine
    const storage=multer.diskStorage({
        destination:"uploads",
        filename:(req,file,cb)=>{
            return cb(null,`${Date.now()}_${file.originalname}`)// file name become unique
        }
    })

    const upload=multer({storage:storage})
    foodRouter.post("/add",upload.single("image"),addFood);
    foodRouter.get("/list",listFood)
    foodRouter.post("/remove",removeFood);




    export default foodRouter;