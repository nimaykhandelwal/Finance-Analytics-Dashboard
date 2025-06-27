// src/middleware/verifyToken.ts

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Augment the base Request so TS knows about userId
export interface AuthRequest extends Request {
    userId?: string;
}

const verifyToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const header = req.header('Authorization');
    if (!header) {
        res.status(401).json({ msg: 'No token provided' });
        return;
    }

    const token = header.split(' ')[1];
    try {
        // jwt.verify returns your payload
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        
        req.userId = (payload as any).id;
        next();
    } catch {
        res.status(401).json({ msg: 'Token is invalid' });
    }
};

export default verifyToken;
