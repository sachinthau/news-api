# News API

A RESTful API for fetching and searching news articles using the GNews service.

## Features

- Fetch news articles
- Search articles by title, author, or keywords  
- In-memory caching for improved performance
- Rate limiting and security middleware
- Swagger API documentation
- Request logging with Pino

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- GNews API key from [GNews.io](https://gnews.io/)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd news-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your GNews API key:
```env
GNEWS_API_KEY=your_actual_api_key_here
```

5. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GNEWS_API_KEY` | GNews API key (required) | - |
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment mode (development/production) | development |
| `CORS_ORIGIN` | CORS origin | http://localhost:3000 |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in ms | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## API Documentation

Interactive API documentation is available at `http://localhost:3000/api-docs` when the server is running.

## API Endpoints

### Get Articles
```
GET /api/news?N=10
```
Fetch the N news articles (default: 10)

### Find Article by Title
```
GET /api/news/title?title=article-title
```
Find a specific article by its title

### Find Article by Author
```
GET /api/news/author?author=author-name
```
Find articles by a specific author

### Search Articles
```
GET /api/news/search?keywords=word1,word2
```
Search articles using keywords

### Health Check
```
GET /livez
```
Check if the server is running

## Example Usage

```bash
# Get 5 articles
curl "http://localhost:3000/api/news?N=5"

# Search by title
curl "http://localhost:3000/api/news/title?title=Breaking%20News"

# Search by author  
curl "http://localhost:3000/api/news/author?author=Reuters"

# Search by keywords
curl "http://localhost:3000/api/news/search?keywords=technology"
```

## Project Structure

```
src/
├── cache/           # In-memory caching service
├── config/          # Application configuration
├── controllers/     # API controller implementation
├── docs/            # Swagger configuration
├── routes/          # API route definitions
├── services/        # External API integration
├── types/           # TypeScript type definitions
├── utils/           # Utility functions
└── server.ts        # Application entry point
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Configuration

The application uses the following default configuration:
- Port: 3000
- Rate limit: 100 requests per 15 minutes
- JSON body limit: 10kb
- CORS origin: http://localhost:3000

Configuration can be modified in `src/config/app.config.ts`

## Caching

The API implements in-memory caching to reduce external API calls and improve response times. Cache keys are generated based on request parameters.

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 400: Bad Request (missing required parameters)
- 404: Not Found
- 500: Internal Server Error

## License

MIT