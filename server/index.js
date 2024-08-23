import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

let app = express()
app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.mongoUrl)
.then(() => {
    app.listen(3000, ()=> {
        console.log('server is running is connected');
        
    })
}).catch(err => console.log(err))


