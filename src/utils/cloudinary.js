import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null
        // Upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        })
        // file has been uploaded successfully
        console.log("File has been uploaded successfully ", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localfilepath)  //remove the 
        return null
    }
}

export {uploadOnCloudinary}