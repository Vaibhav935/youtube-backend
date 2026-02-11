import { v2 as cloudinary } from "cloudinary";
// import fs from "fs"; // callback based
import fs from "fs/promises"; // promise based
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath)
      return json({
        message: "File path is required",
      });

    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file uploaded successfully

    // fs.unlink(localFilePath, (err) => {
    //   if(err){
    //     console.error("Error in deleting local file, ", err)
    //   }else{
    //     console.log("local file deleted")
    //   }
    // })

    // await fs.promises.unlink(localFilePath)
    // OR
    await fs.unlink(localFilePath);

    return response;
  } catch (error) {
    if (localFilePath != "") {
      // fs.unlinkSync(localFilePath); // only in fs not fs/promises and no callback because synchronous
      // fs.unlink(localFilePath, (err) => console.error(err)) // not allowed in fs/promised
      await fs.unlink(localFilePath);
    }
    return error;
  }
};

export { uploadOnCloudinary };
