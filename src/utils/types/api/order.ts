import mongoose from "mongoose";
import { z } from "zod";

// Common schemas
const addressSchema = z.object({
    street: z.string().min(1, 'Street is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    pincode: z.string().min(1, 'Pincode is required'),
    country: z.string().optional()
});

const userIdSchema = z.instanceof(mongoose.Types.ObjectId).or(z.string().min(1, 'User ID is required'));
const productIdSchema = z.instanceof(mongoose.Types.ObjectId).or(z.string().min(1, 'Product ID is required'));

// Base order schema
export const orderSchema = z.object({
    user: userIdSchema,
    items: z.array(z.object({
        productId: productIdSchema,
        quantity: z.number().min(1, 'Quantity must be at least 1'),
    })),
    shippingAddress: addressSchema,
    phone: z.number().min(1, 'Phone number is required')
});

// Extended schema for order creation
const orderSchemaToCreate = orderSchema.extend({
    items: z.array(z.object({
        productId: productIdSchema,
        quantity: z.number().min(1, 'Quantity must be at least 1'),
        price: z.number().min(1, 'Price must be at least 1'),
        total: z.number().min(1, 'Total must be at least 1'),
    })),
    totalAmount: z.number().min(1, "TotalAmount must be at least 1"),
});

export type IOrderToCreate = z.infer<typeof orderSchemaToCreate>