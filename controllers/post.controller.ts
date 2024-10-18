import { Request, Response } from 'express';
import Post, { IPost } from '../models/post.model';

export const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, text, author } = req.body;

    const post: IPost = new Post({ title, text, author });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data provided' });
  }
};

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.status(404).json({ error: 'Post not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
