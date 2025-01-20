import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    socialMedia_url: {
        type: String,
        required: true
    },
    imageFile:[{
        type:String,
        required: true
    }]
},{timestamps: true})

export const User = new mongoose.model("User",userSchema);