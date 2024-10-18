import express from 'express';
import postsRoutes from './routes/post.route';
import userRoutes from './routes/user.route';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/posts', postsRoutes); // Rutas de posts
app.use('/api/users', userRoutes);   // Rutas de usuarios (registro y login)


export default app;
