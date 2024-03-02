import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to Database');
  } catch (error) {
    console.error('Error connecting to Database:', error);
    throw error; 
  }
};

export default connectToDatabase;
