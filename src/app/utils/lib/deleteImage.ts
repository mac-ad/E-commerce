import fs from 'fs'
import path from 'path'
import { deleteImages as DeleteCloudinaryImages } from './cloudinary'

export const deleteImages = async (imagePaths: string[]): Promise<void> => {
    try {
        // const deletePromises = imagePaths.map(imagePath => {
        //     return new Promise<void>((resolve, reject) => {
        //         const fullPath = path.join(process.cwd(), 'public', imagePath)
        //         fs.unlink(fullPath, (err) => {
        //             if (err) {
        //                 reject(err)
        //             } else {
        //                 resolve()
        //             }
        //         })
        //     })
        // })

        // await Promise.all(deletePromises)
        const publicIds = imagePaths.map(imagePath => {
            const publicId = imagePath.split('/').pop()?.split('.')[0];
            return publicId;
        })
        await DeleteCloudinaryImages(publicIds as string[])
    } catch (error) {
        console.error('Error deleting images:', error)
        throw error
    }
}
