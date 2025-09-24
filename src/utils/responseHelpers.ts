import { Response } from 'express';

export function sendResponseOr404(res: Response, payload: any, notFoundMessage = 'Payload not found') {
    if (payload && (Array.isArray(payload) ? payload.length > 0 : true)) {
        res.json(payload);
    } else {
        res.status(404).json({ message: notFoundMessage });
    }
}