import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import PinoHttp from "pino-http";
import { AppConfig } from './config/app.config';
import setNewsRoutes from './routes/newsRoutes';

// Establish Express app
const app = express();

// Configurations http logger
app.use(PinoHttp());

// Security configurations
app.use(helmet());
app.use(cors({ origin: AppConfig.corsOrigin }));
// Rate limiting (100 requests per 15 minutes)
app.use(
  rateLimit({
    windowMs: AppConfig.rateLimit.windowMs,
    max: AppConfig.rateLimit.maxRequests,
    standardHeaders: true,
    legacyHeaders: false
  })
);
app.use(express.json({ limit: AppConfig.jsonBodyLimit }));

// Check server liveness endpoint
app.get("/livez", (_req, res) => res.json({ message: "Server is live" }));

// Set news routes
setNewsRoutes(app);

const PORT = Number(3000);

app.listen(PORT, () => {
  console.log(`News API server listening on http://localhost:${PORT}`);
});