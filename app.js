import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// import { PrismaClient } from './generated/prisma/index.js';
import authRoute from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));



app.use('/api/auth', authRoute);
app.use('/api/user', userRoutes);




export default app;
