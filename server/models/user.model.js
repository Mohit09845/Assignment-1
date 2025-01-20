import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    socialMedia: {
        type: String,
        required: true
    },
    images:[{
        type:String,
        required: true
    }]
},{timestamps: true})

export const User = new mongoose.model("User",userSchema);