import express from 'express';
import connectDB from './config/db';
import { authRoutes } from './routes/auth';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
