import express from 'express';
import connectDB from './config/db';
import { authRoutes } from './routes/auth';
import bodyParser from 'body-parser';
import cors from 'cors';
import { postRoutes } from './routes/postRoutes';
import { commentRoutes } from './routes/commentRoutes';
import { userRoutes } from './routes/userRoutes';

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
