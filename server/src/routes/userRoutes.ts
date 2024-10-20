import express, { Request } from 'express';
import User from '../models/User';
import Post from '../models/Post';

const router = express.Router();

router.get('/:userId/profile', async (req: Request, res: any) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const posts = await Post.find({ userId: user._id }).populate('userId', 'username');

    res.status(200).json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user profile', error });
  }
});

export { router as userRoutes };
