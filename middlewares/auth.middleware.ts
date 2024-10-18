
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
  export interface Request {
    user?: any;
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'No token provided, authorization denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token is not valid' });
  }
};

export default authMiddleware;
