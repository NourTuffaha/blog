import express, { Request, Response } from 'express';
import Post from '../models/Post';
import Comment from '../models/Comment';

const router = express.Router();

router.post('/:postId/comment' , async (req: Request, res: any) => {
  const { postId } = req.params;
  const { content, userId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = new Comment({
      postId: post._id,
      userId: userId,
      content,
      reactions: {
        like: 0,
        love: 0,
        angry: 0,
      },
      replies: [],
    });

    await comment.save();

    post.comments.push(comment._id as any);
    await post.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error });
  }
});

router.post('/comment/:commentId/react', async (req: Request, res: any) => {
  const { commentId } = req.params;
  const { reactionType } = req.body;  

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    comment.reactions[reactionType] = (comment.reactions[reactionType] || 0) + 1;

    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to react to comment', error });
  }
});

export { router as commentRoutes };
