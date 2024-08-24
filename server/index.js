import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoute from './routes/authRoute.js'

dotenv.config()

let app = express()
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.mongoUrl)
.then(() => {
    app.listen(1000, ()=> {
        console.log('server is running is connected');
        
    })
}).catch(err => console.log(err))

app.use('/api/auth', authRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });


