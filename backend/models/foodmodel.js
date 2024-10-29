import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        // required: true
    }
})

const foodmodel=mongoose.models.food|| mongoose.model("food",foodSchema);
export default foodmodel;
// when we run this file it will create again to solve that problem we are using above one
// if the model is already there it will use that one if it is not there it will create new model