import express, { json, urlencoded } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './utils/db.js';
import userRoutes from "./routes/userRoutes.js"
import companyRoutes from "./routes/companyRoutes.js"
import jobRoutes from "./routes/jobRoutes.js"
import applicationRoutes from "./routes/applicationRoutes.js"
const app = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
    origin: ['http://localhost:5173'],
    credentials: true,
};
app.use(cors(corsOption));

//API's
app.use('/api/user', userRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/application', applicationRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});
