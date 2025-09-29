import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.route.js';
import kycRoutes from './routes/kyc.rout.js';
import productRoutes from './routes/products.routes.js';
import buyRoutes from './routes/buy.routes.js';
import dataRoutes from './routes/data.route.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use("/api/products", productRoutes)

app.use('/api/auth', authRoutes);

app.use('/api/kyc', kycRoutes);

app.use('/api/data', dataRoutes);

app.use('/api/stocks', productRoutes);

app.use('/api/buy', buyRoutes);

app.listen(process.env.PORT, () => {
    connectDB();
    console.log('Server is running on port', process.env.PORT);
})