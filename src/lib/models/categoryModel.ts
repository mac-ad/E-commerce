import mongoose, { Schema, model } from 'mongoose';

interface ICategory {
    name: string;
    bannerImage:string;
}

const categorySchema = new Schema<ICategory>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bannerImage:{
        type: String,
        required: true
    }
    // isActive: {
    //     type: Boolean,
    //     default: true
    // }
}, {
    timestamps: true
});

const categoryModel = mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);

// const categoryModel = model<ICategory>('Category', categorySchema);

export default categoryModel;


