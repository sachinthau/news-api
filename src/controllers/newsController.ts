import { Request, Response } from 'express';
import { 
    svcFetchArticles, 
    svcFindArticlesByTitle, 
    svcFindArticlesByAuthor, 
    svcSearchArticlesByKeywords 
} from '../services/gnewsService';
import { sendResponseOr404 } from '../utils/responseHelpers';
import logger from '../utils/logger';
import cacheService from '../cache/cacheService';

export async function fetchArticles(req: Request, res: Response) {
    const N = parseInt(req.query.N as string) || 10;
    const cacheKey = `articles:top:${N}`;
    
    try {
        // Check cache first
        const cachedArticles = cacheService.get(cacheKey);
        if (cachedArticles) {
            logger.info({ cacheKey }, 'Returning cached articles');
            res.json(cachedArticles);
            return;
        }

        // Fetch from service if not in cache, and cache the result and send response
        const articles = await svcFetchArticles(N);
        sendResponseOr404(res, articles, cacheKey, 'Article not found');
    } catch (error) {
        logger.error({ error }, 'Failed to fetch articles');
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
}

export async function findArticlesByTitle(req: Request, res: Response) {
    const title = req.query.title as string;
    if (!title) {
        return res.status(400).json({ error: 'Title parameter is required' });
    }
    
    const cacheKey = `articles:title:${title.toLowerCase()}`;
    
    try {
        // Check cache first
        const cachedArticles = cacheService.get(cacheKey);
        if (cachedArticles) {
            logger.info({ cacheKey }, 'Returning cached articles by title');
            res.json(cachedArticles);
            return;
        }

        // Fetch from service if not in cache, and cache the result and send response
        const articles = await svcFindArticlesByTitle(title);
        sendResponseOr404(res, articles, cacheKey, 'Article not found');
    } catch (error) {
        logger.error({ error }, 'Failed to find articles by title');
        res.status(500).json({ error: 'Failed to find articles by title' });
    }
}

export async function findArticlesByAuthor(req: Request, res: Response) {
    const author = req.query.author as string;
    if (!author) {
        return res.status(400).json({ error: 'Author parameter is required' });
    }
    
    const cacheKey = `articles:author:${author.toLowerCase()}`;
    
    try {
        // Check cache first
        const cachedArticles = cacheService.get(cacheKey);
        if (cachedArticles) {
            logger.info({ cacheKey }, 'Returning cached articles by author');
            res.json(cachedArticles);
            return;
        }

        // Fetch from service if not in cache, and cache the result and send response
        const articles = await svcFindArticlesByAuthor(author);
        sendResponseOr404(res, articles, cacheKey, 'Article not found');
    } catch (error) {
        logger.error({ error }, 'Failed to find articles by author');
        res.status(500).json({ error: 'Failed to find articles by author' });
    }
}

export async function searchArticlesByKeywords(req: Request, res: Response) {
    const keywords = req.query.keywords as string;
    if (!keywords) {
        return res.status(400).json({ error: 'Keywords parameter is required' });
    }
    
    const cacheKey = `articles:search:${keywords.toLowerCase()}`;
    
    try {
        // Check cache first
        const cachedArticles = cacheService.get(cacheKey);
        if (cachedArticles) {
            logger.info({ cacheKey }, 'Returning cached search results');
            res.json(cachedArticles);
            return;
        }

        // Fetch from service if not in cache, and cache the result and send response
        const articles = await svcSearchArticlesByKeywords(keywords);
        sendResponseOr404(res, articles, cacheKey, 'Article not found');
    } catch (error) {
        logger.error({ error }, 'Failed to search articles by keywords');
        res.status(500).json({ error: 'Failed to search articles by keywords' });
    }
}
