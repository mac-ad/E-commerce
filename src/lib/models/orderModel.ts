import mongoose from 'mongoose';
import { IProductBasic } from './productModel';
import { OrderStatusEnum, OrderStatusEnumArray, PaymentStatusEnum, PaymentStatusEnumArray } from '@/utils/types/api/common';

interface IOrderItem {
    productId: mongoose.Types.ObjectId;
    quantity: number;
    price: number;
    total: number;
}

export interface IOrderItemWithProduct extends Omit<IOrderItem, 'productId'> {
    productId: IProductBasic;
}


interface IShippingAddress {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
}

export interface IOrder {
    user: mongoose.Types.ObjectId;
    items: IOrderItem[];
    totalAmount: number;
    shippingAddress: IShippingAddress;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    paymentStatus: 'pending' | 'completed';
    orderDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IOrderWithProduct extends Omit<IOrder, 'items'> {
    items: IOrderItemWithProduct[];
}


const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    shippingAddress: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
            default: 'India'
        }
    },
    status: {
        type: String,
        enum: OrderStatusEnumArray,
        default: OrderStatusEnum.PENDING
    },
    paymentStatus: {
        type: String,
        enum: PaymentStatusEnumArray,
        default: PaymentStatusEnum.PENDING
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    phone: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

export const OrderModel = mongoose.models.Order || mongoose.model<IOrder>('Order', orderSchema);
