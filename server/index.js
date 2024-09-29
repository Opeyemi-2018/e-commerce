import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// import cors from "cors";
import path from "path";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();

let __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use(cors({
//   origin: 'http://localhost:5173', // Your frontend's origin
//   credentials: true,
// }));

mongoose
  .connect(process.env.mongoUrl)
  .then(() => {
    app.listen(1000, () => {
      console.log("Server is running on port 3000 and connected to MongoDB");
    });
  })
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/users", userRoute);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
