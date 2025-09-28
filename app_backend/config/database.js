import mongoose from 'mongoose';

export const connectDB = async() => {

    try {
        console.log("connecting to db");
        const conn = await mongoose.connect(process.env.MONGODB_URI, { dbName: "finance_app" });
        console.log(`MongoDB Connnected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Error:", error.message);
        process.exit(1);
    }
}