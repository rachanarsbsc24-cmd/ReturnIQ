import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import returnRoutes from './routes/returns.js';

const app = express();
app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '20kb' }));
app.use('/api/auth', rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, standardHeaders: 'draft-8', legacyHeaders: false }));
app.use('/api/auth', authRoutes);
app.use('/api/returns', returnRoutes);
app.get('/api/health', (_req, res) => res.json({ status: 'ok', service: 'ReturnIQ API' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.name === 'ValidationError' || err.name === 'CastError') return res.status(400).json({ message: err.message });
  if (err.code === 11000) return res.status(409).json({ message: 'That account already exists.' });
  return res.status(500).json({ message: 'An unexpected server error occurred.' });
});

const port = Number(process.env.PORT) || 5000;
connectDB().then(() => app.listen(port, () => console.log(`ReturnIQ API running at http://localhost:${port}`)))
  .catch((error) => { console.error('Could not start API:', error.message); process.exit(1); });
