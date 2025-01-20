import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { uploadMedia } from "../utils/cloudinary.js";

export const submitDetails = async (req, res) => {
    try {
    
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }

        const { name, socialMedia } = req.body;

        const images = req.files.map((file) => file.path);
        const invalidFiles = req.files.filter(file => !file.mimetype || !file.mimetype.startsWith('image/'));

        if (invalidFiles.length > 0) {
            return res.status(400).json({ message: "Invalid file type, only images are allowed" });
        }

        const imageUploadPromises = images.map((imagePath) => uploadMedia(imagePath));

        const uploadedImages = await Promise.all(imageUploadPromises);
        const imageUrls = uploadedImages.map(cloudResponse => cloudResponse.secure_url);

        const user = new User({
            name,
            socialMedia,
            images: imageUrls
        });

        await user.save();
        return res.status(200).json({
            message: "User submitted details successfully"
        });

    } catch (error) {
        console.error("Error in submitDetails:", error); 
        res.status(500).json({ message: 'Error submitting user data', error: error.message });
    }
}

export const getAllUserDetails = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error in getAllUserDetails:", error);  
        res.status(400).send('Error fetching user data');
    }
}
