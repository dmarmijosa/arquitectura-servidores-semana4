import mongoose from "mongoose";

export const connectDB = async () => {
    const uri = 'mongodb://localhost:27017/posts-api'; // Asegúrate de tener MongoDB corriendo en localhost
    try {
      await mongoose.connect(uri);
      console.log('Connected to MongoDB Database');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      process.exit(1);
    }
  };


export const disconnectDb = async () => {
    try {
        await mongoose.connection.close();
        console.log("Database disconnected successfully.");
    } catch (error) {
        console.error("Error disconnecting the database: ", error);
    }
};
