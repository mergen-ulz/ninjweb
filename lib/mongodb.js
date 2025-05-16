// lib/mongodb.js
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Env variable дутуу');
}

let cached = globalThis.mongoose || { conn: null, promise: null };

async function connectToDatabase() {
    if (cached.conn) return cached.conn;
    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });
    }
    cached.conn = await cached.promise;
    globalThis.mongoose = cached;
    return cached.conn;
}

export default connectToDatabase;
