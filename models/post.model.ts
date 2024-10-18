import mongoose, { Schema, Document } from 'mongoose';

// Definir la interfaz para el Post
export interface IPost extends Document {
  title: string;
  text: string;
  author: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Definir el esquema del modelo Post
const PostSchema: Schema = new Schema(
  {
    title: { type: String, required: true, minlength: 5 },
    text: { type: String, required: true, minlength: 5 },
    author: { type: String, required: true },
  },
  {
    timestamps: true, // Añade automáticamente createdAt y updatedAt
  }
);

export default mongoose.model<IPost>('Post', PostSchema);
