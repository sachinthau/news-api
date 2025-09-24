import { Router } from 'express';
import {
    fetchArticles,
    findArticlesByTitle,
    findArticlesByAuthor,
    searchArticlesByKeywords
 } from '../controllers/newsController';

export default function setNewsRoutes(app: Router) {
    /**
     * @openapi
     * /api/news:
     *   get:
     *     summary: Fetch all news articles
     *     parameters:
     *       - in: query
     *         name: N
     *         schema:
     *           type: integer
     *         required: false
     *         description: Number of articles to fetch
     *     responses:
     *       200:
     *         description: Successfully fetched news articles
     */
    app.get('/api/news', (req, res) => {
        fetchArticles(req, res);
    });

    /**
     * @openapi
     * /api/news/title:
     *   get:
     *     summary: Find articles by title
     *     parameters:
     *       - in: query
     *         name: title
     *         schema:
     *           type: string
     *         required: true
     *         description: Title to search for
     *     responses:
     *       200:
     *         description: Articles matching the title
     */
    app.get('/api/news/title', (req, res) => {
        findArticlesByTitle(req, res);
    });

    /**
     * @openapi
     * /api/news/author:
     *   get:
     *     summary: Find articles by author
     *     parameters:
     *       - in: query
     *         name: author
     *         schema:
     *           type: string
     *         required: true
     *         description: Author to search for
     *     responses:
     *       200:
     *         description: Articles matching the author
     */
    app.get('/api/news/author', (req, res) => {
        findArticlesByAuthor(req, res);
    });

    /**
     * @openapi
     * /api/news/search:
     *   get:
     *     summary: Search articles by keywords
     *     parameters:
     *       - in: query
     *         name: keywords
     *         schema:
     *           type: string
     *         required: true
     *         description: Keywords to search for
     *     responses:
     *       200:
     *         description: Articles matching the keywords
     */
    app.get('/api/news/search', (req, res) => {
        searchArticlesByKeywords(req, res);
    });
}