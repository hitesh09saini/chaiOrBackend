import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error('Local file path is missing.');
            return null;
        }

        // upload file
        const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });

        // file has been uploaded successfully
        console.log('File is uploaded successfully:', response.url);
        return response;
    } catch (e) {
        console.error('Error uploading to Cloudinary:', e.message); // Log the error message
        console.error('Error stack trace:', e.stack); // Log the stack trace
        console.error('Error details:', e); // Log the entire error object
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
};

export default uploadOnCloudinary;