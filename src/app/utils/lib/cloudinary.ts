import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET ,
});


export const uploadImage = async (file: File) => {
    // Convert File to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    // Convert buffer to base64 string
    const base64String = buffer.toString('base64');
    const dataURI = `data:${file.type};base64,${base64String}`;

    const result = await cloudinary.uploader.upload(dataURI);
    return result.secure_url;
}


export const uploadImages = async (files: File[]) => {
    const results = await Promise.all(files.map(async (file) => {
        // Convert File to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Convert buffer to base64 string
        const base64String = buffer.toString('base64');
        const dataURI = `data:${file.type};base64,${base64String}`;

        const result = await cloudinary.uploader.upload(dataURI);
        return result.secure_url;
    }));
    return results;
}

export const deleteImage = async (publicId: string) => {
    await cloudinary.uploader.destroy(publicId);
}

export const deleteImages = async (publicIds: string[]) => {
    await Promise.all(publicIds.map(id => cloudinary.uploader.destroy(id)));
    console.log('Images deleted successfully');
}

