import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import snippetRoutes from './routes/snippetRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', snippetRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("Server is online on port 5000");
});