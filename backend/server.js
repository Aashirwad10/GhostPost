import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import snippetRoutes from './routes/snippetRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', snippetRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("Server is online on port 5000");
});