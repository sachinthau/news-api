import { Router } from 'express';
import {
    fetchArticles,
    findArticlesByTitle,
    findArticlesByAuthor,
    searchArticlesByKeywords
 } from '../controllers/newsController';

export default function setNewsRoutes(app: Router) {
    app.get('/api/news', (req, res) => {
        fetchArticles(req, res);
    });

    app.get('/api/news/title', (req, res) => {
        findArticlesByTitle(req, res);
    });

    app.get('/api/news/author', (req, res) => {
        findArticlesByAuthor(req, res);
    });

    app.get('/api/news/search', (req, res) => {
        searchArticlesByKeywords(req, res);
    });
}