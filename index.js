import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import connectToDatabase from './db/connection.js';

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use('/auth',authRoutes);


const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  connectToDatabase();
  
});
