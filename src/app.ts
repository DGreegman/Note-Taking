// File: src/app.ts (updated)
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler, notFound } from './middlewares/errorMiddleware';
import { requestLogger } from './middlewares/loggingMiddleware';
import noteRoutes from './routes/noteRoutes';
import categoryRoutes from './routes/categoryRoutes';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(requestLogger);

// Routes
app.use('/api/notes', noteRoutes);
app.use('/api/categories', categoryRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

export default app;
