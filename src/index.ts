import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express'; 
import path from 'path';
import cors from 'cors';

import authRouter from './routes/authRouter';
import reportRouter from './routes/reportRouter'

const app: Express = express(); 

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads'))); // Sert les fichiers
app.use('/api', authRouter);
app.use('/api', reportRouter); 

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
