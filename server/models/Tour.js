import mongoose from "mongoose";

const tourSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    name:{
        type:String,
    },
    creator:{
        type:String
    },
    tags:{
        type:Array,
    },
    imageFile:{
        type:String
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
    likeCount:{
        type:Number,
        default:0
    },
});


const Tour=mongoose.model("tour",tourSchema);

export default Tour;
