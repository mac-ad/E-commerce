import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;
const DB_NAME = process.env.DB_NAME as string

if (!MONGODB_URI || !DB_NAME)
    throw new Error("Missing mongo uri")


interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached = (global as any).mongoose || { conn: null, promise: null };


export async function connectToDb(): Promise<any> {
    if(!MONGODB_URI || !DB_NAME) throw new Error("Missing mongo uri or db name")
    try {
        if (cached.conn) return cached.conn;

        if (!cached.promise) {
            cached.promise = mongoose.connect(MONGODB_URI,{
                dbName:DB_NAME
            })
        }

        cached.conn = await cached.promise;
        (global as any).mongoose = cached;

        return cached.conn;
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        throw err; // Re-throw to handle it in the calling code
    }
}
