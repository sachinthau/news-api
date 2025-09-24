import { Request, Response } from 'express';
import { 
    svcFetchArticles, 
    svcFindArticlesByTitle, 
    svcFindArticlesByAuthor, 
    svcSearchArticlesByKeywords 
} from '../services/gnewsService';
import { sendResponseOr404 } from '../utils/responseHelpers';
import logger from '../utils/logger';

export async function fetchArticles(req: Request, res: Response) {
    const N = parseInt(req.query.N as string) || 10;
    try {
        const articles = await svcFetchArticles(N);
        sendResponseOr404(res, articles, 'Article not found');
    } catch (error) {
        logger.error({ error }, 'Failed to fetch articles');
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
}

export async function findArticlesByTitle(req: Request, res: Response) {
    const title = req.query.title as string;
    try {
        const articles = await svcFindArticlesByTitle(title);
        sendResponseOr404(res, articles, 'Article not found');
    } catch (error) {
        logger.error({ error }, 'Failed to find articles by title');
        res.status(500).json({ error: 'Failed to find articles by title' });
    }
}

export async function findArticlesByAuthor(req: Request, res: Response) {
    const author = req.query.author as string;
    try {
        const articles = await svcFindArticlesByAuthor(author);
        sendResponseOr404(res, articles, 'Article not found');
    } catch (error) {
        logger.error({ error }, 'Failed to find articles by author');
        res.status(500).json({ error: 'Failed to find articles by author' });
    }
}

export async function searchArticlesByKeywords(req: Request, res: Response) {
    const keywords = req.query.keywords as string;
    try {
        const articles = await svcSearchArticlesByKeywords(keywords);
        sendResponseOr404(res, articles, 'Article not found');
    } catch (error) {
        logger.error({ error }, 'Failed to search articles by keywords');
        res.status(500).json({ error: 'Failed to search articles by keywords' });
    }
}
