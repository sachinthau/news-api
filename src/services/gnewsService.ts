import axios from 'axios';
import { NewsArticle } from '../types';
import { AppConfig } from '../config/app.config.js';

// Check API key is available
if (!AppConfig.gnews.apiKey) {
    throw new Error('GNews API key is required but not provided');
}

async function fetchAndMapArticles(url: string): Promise<NewsArticle[]> {
    const response = await axios.get(url);

    if (!response.data || !response.data.articles) {
        return [];
    }

    return response.data.articles.map((article: any) => ({
        title: article.title,
        author:  article.source?.name || '',
        description: article.description,
        content: article.content || '',
        url: article.url,
        publishedAt: article.publishedAt,
        source: {
            name: article.source?.name || '',
            url: article.source?.url || ''
        }
    }));
}

export async function svcFetchArticles(N: number): Promise<NewsArticle[]> {
    const url = `${AppConfig.gnews.baseUrl}/top-headlines?max=${N}&token=${AppConfig.gnews.apiKey}`;
    return fetchAndMapArticles(url);
}

export async function svcFindArticlesByTitle(title: string): Promise<NewsArticle | null> {
    const articles = await svcFetchArticles(100);
    return articles.find(article => article.title.toLowerCase() === title.toLowerCase()) || null;
}

export async function svcFindArticlesByAuthor(author: string): Promise<NewsArticle | null> {
    const articles = await svcFetchArticles(100);
    return articles.find(article => article.author && article.author.toLowerCase() === author.toLowerCase()) || null;
}

export async function svcSearchArticlesByKeywords(keywords: string): Promise<NewsArticle[]> {
    const url = `${AppConfig.gnews.baseUrl}/search?q=${encodeURIComponent(keywords)}&token=${AppConfig.gnews.apiKey}`;
    return fetchAndMapArticles(url);
}
