import mongoose, { Schema, models, model } from "mongoose";
import './categoryModel';

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    description: {
        type: String,
        trim: true
    },
    logo: {
        type: String
    },
    // isActive: {
    //     type: Boolean,
    //     default: true
    // }
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }]
}, {
    timestamps: true
});

// Use existing model if it exists (prevents overwriting in Next.js hot reload)
const brandModel = models.Brand || model('Brand', brandSchema);

export default brandModel;
