const MyError = require('./error');
const { wrapAsync } = require('./wrapAsync');
const fs = require("fs")

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});


const uploadToCloud = async (filePath) => {

    try {

        if (!filePath || filePath.length === 0) {
            throw new MyError(400, "Please select files to upload.");
        }


        const fileUrl =  await Promise.all(filePath.map(async (item) => {

                const displayName = item.replace(/^uploads[\\/]+/g, '').replace(/\.(jpg|jpeg|mp3|mp4|png)$/g, '')

                console.log(displayName);
                const res = await cloudinary.uploader.upload(item, {
                    resource_type: 'auto',
                    asset_folder:"flipkart_Clone",	
                    public_id: displayName,
                    
                } )

                await fs.promises.unlink(item);

                return res.secure_url;
            }))

        return fileUrl;

    } catch (error) {
        console.log(error)
        throw new MyError(400, error.message)
    }



}

const deleteFile = async(filePath) =>{

    try {
         if (!filePath || filePath.length === 0) {
            throw new MyError(400, "Please select files to upload.");
        }

        
    } catch (error) {
        console.log(error)
        throw new MyError(400, error.message)
    }
}

module.exports = uploadToCloud