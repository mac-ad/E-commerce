import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = "mongodb://admin:6711@127.0.0.1:27017/myDb?authSource=admin"
// process.env.MONGODB_URI as string;

if (!MONGODB_URI)
    throw new Error("Missing mongo uri")

interface MongooseCache {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached = (global as any).mongoose || { conn: null, promise: null };


export async function connectToDb(): Promise<any> {
    console.log("inside connectToDb", MONGODB_URI)
    try {
        if (cached.conn) return cached.conn;
        console.log(MONGODB_URI)

        if (!cached.promise) {
            cached.promise = mongoose.connect(MONGODB_URI)
        }

        cached.conn = await cached.promise;
        (global as any).mongoose = cached;

        return cached.conn;
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        throw err; // Re-throw to handle it in the calling code
    }
}
