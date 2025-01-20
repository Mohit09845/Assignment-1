import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { uploadMedia } from "../utils/cloudinary.js";


export const submitDetails = async (req, res) => {
    try {
        const { name, socialMedia } = req.body;
        const images = req.files?.map((file) => file.path);

        if (!images || !req.files || !req.files.every(file => file.mimetype.startsWith('image/'))) {
            return res.status(400).json({ message: "Invalid file or file is missing" });
        }

        const imageUploadPromises = images.map((imagePath) => uploadMedia(imagePath));

        const uploadedImages = await Promise.all(imageUploadPromises);
        const imageUrls = uploadedImages.map(cloudResponse => cloudResponse.secure_url)

        const user = new User({ name, socialMedia, images: imageUrls });
        await user.save();
        return res.status(200).json({
            message: "User submitted details successfully"
        })
    } catch (error) {
        res.status(400).send('Error submitting user data');
    }
}

export const getAllUserDetails = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        res.status(400).send('Error fetching user data');
    }
}