import mongoose from 'mongoose';


export interface IProduct {
    _id: mongoose.Types.ObjectId;
    name: string;
    brand: mongoose.Types.ObjectId;
    discount: number;
    price: number;
    quantity: number;
    description?: string;
    images: string[];
    category: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export type IProductBasic = Pick<IProduct, '_id' | 'name' | 'discount' | 'price' | 'quantity' | 'images' | 'category'>;

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    discount: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: false
    },
    images: {
        type: [String],
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, {
    timestamps: true
});

const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productModel;
