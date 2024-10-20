import express, { Request, Response } from 'express';
import {  AuthRequest } from './auth';
import Post from '../models/Post';

const router = express.Router();

router.post('/', async (req: AuthRequest, res: Response) => {
  const { title, content, userId } = req.body;

  try {
    const post = new Post({
      title,
      content,
       userId: userId,
      reactions: {
        like: 0,
        love: 0,
        angry: 0,
      },
      comments: []
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create post', error });
  }
});

router.get('/', async (req: Request, res: Response) => {
  try {
    const posts = await Post.find()
     .sort({ createdAt: -1 })
      .populate('userId', 'username')
      .populate({
        path: 'comments',
        populate: {
          path: 'userId',
          select: 'username',
        },
      });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get posts', error });
  }
});

router.post('/:postId/react',  async (req: any, res: any) => {
  const { postId } = req.params;
  const { reactionType } = req.body; 

  try {
    const post = await Post.findById(postId);
    console.log(reactionType);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.reactions[reactionType] = (post.reactions[reactionType] || 0) + 1;
    

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to react to post', error });
  }
});

export { router as postRoutes };
