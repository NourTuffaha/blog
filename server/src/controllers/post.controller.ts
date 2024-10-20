import type { Request, Response } from "express";
import Post from "../models/Post";

export const createPost = async (req: Request, res: Response) => {
	const { title, content } = req.body;
	try {
		const newPost = new Post({ title, content, userId: (req as any).user?._id });
		await newPost.save();
		res.status(201).json(newPost);
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ message: error.message });
		}
	}
};

export const getPosts = async (req: Request, res: Response) => {
	try {
		const posts = await Post.find().populate("userId", "username");
		res.json(posts);
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ message: error.message });
		}
	}
};
