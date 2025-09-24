export const AppConfig = {
  applicationName: 'News API',
  jsonBodyLimit: '10kb',
  corsOrigin: 'http://localhost:3000',
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100
  }
};