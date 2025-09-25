import 'dotenv/config';

export const AppConfig = {
  applicationName: 'News API',
  jsonBodyLimit: '10kb',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes default
    maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100')
  },
  gnews: {
    apiKey: process.env.GNEWS_API_KEY || '',
    baseUrl: 'https://gnews.io/api/v4'
  },
  server: {
    port: parseInt(process.env.PORT || '3000'),
    nodeEnv: process.env.NODE_ENV || 'development'
  }
};