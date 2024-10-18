import { Router } from 'express';
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from '../controllers/post.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

// Proteger las rutas de posts con el middleware de autenticación
router.post('/', authMiddleware, createPost);
router.get('/', authMiddleware, getAllPosts);
router.get('/:id', authMiddleware, getPostById);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;
