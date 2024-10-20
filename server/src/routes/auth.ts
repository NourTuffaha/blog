import express, { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const router = express.Router();
const JWT_SECRET = 'secret';

export interface AuthRequest extends Request {
  user?: { _id: string };
}

router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: 'User already exists' });
  }
});

router.post('/login', async (req: Request, res : any ) => {
  const { username, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});
export interface AuthRequest extends Request {
  user?: { _id: string }; 
}





export { router as authRoutes };
