export interface NewsArticle {
    title: string;
    author: string;
    description: string;
    content: string;
    url: string;
    publishedAt: string;
    source: {
        name: string;
        url: string;
    };
}