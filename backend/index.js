import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';

import {connectDB} from './db/connectDB.js'; 

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!123');
}); 



app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port: ${PORT}`);
});


