import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});



const uploadOnCloudinary = async (localFilePath) =>{
    try {
        if (!fs.existsSync(localFilePath)) {
            throw new Error("File not found");
        }
        // Upload the file into cloudinary
        response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        })
        // file has beed uploaded successfully
        console.log("File uploaded successfully", response.url);

    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the file as the upload operation failed
        return null;
    }
}

export {uploadOnCloudinary}