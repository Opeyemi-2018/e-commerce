import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoute from './routes/authRoute.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:5173', // Your frontend's origin
//   credentials: true,
// }));

mongoose.connect(process.env.mongoUrl)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server is running on port 3000 and connected to MongoDB');
    });
  })
  .catch(err => console.log(err));

app.use('/api/auth', authRoute);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
