import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db';
import authRoutes from './routes/auth';
import txRoutes from './routes/transactions';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/transactions', txRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
    console.log(`✅ MongoDB connected\n🚀 Server running on port ${PORT}`)
);
