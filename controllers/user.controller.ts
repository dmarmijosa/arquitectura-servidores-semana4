
import { Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { randomBytes } from 'crypto';
dotenv.config();

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, bio } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ error: 'User already exists' });
      return;
    }

    const activationToken = randomBytes(16).toString('hex')

    const newUser: IUser = new User({ name, email, password, bio, activationToken });
    await newUser.save();
    const activationLink = `http://localhost:8000/api/users/activate/${activationToken}`;
    res.status(201).json(
      {
        message: 'User registered successfully',
        activationLink
      });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }


    if (!user.active) {
      const activationLink = `http://localhost:8000/api/users/activate/${user.activationToken}`;
      res.status(401).json({
        error: 'Account is not activated. Please activate your account using the provided link.',
        activationLink,
      });
      return;
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const activateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { activationToken } = req.params;

    const user = await User.findOne({ activationToken });
    if (!user) {
      res.status(400).json({ error: 'Invalid activation token' });
      return;
    }

    user.active = true;
    user.activationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Account activated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};