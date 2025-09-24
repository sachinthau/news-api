import { Response } from 'express';
import cacheService from '../cache/cacheService';

export function sendResponseOr404(res: Response, payload: any, cacheKey: string, notFoundMessage = 'Payload not found') {
    if (payload && (Array.isArray(payload) ? payload.length > 0 : true)) {
        cacheService.set(cacheKey, payload);
        res.json(payload);
    } else {
        res.status(404).json({ message: notFoundMessage });
    }
}