import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes';
import tasksRoutes from './routes/tasksRoutes';
import categoriesRoutes from './routes/categoriesRoutes';
import corsMiddleware from './config/cors'

dotenv.config()

const app = express()

app.use(express.json())

app.use(corsMiddleware);

app.use('/api', authRoutes)
app.use('/api', tasksRoutes)
app.use('/api', categoriesRoutes)

export default app;