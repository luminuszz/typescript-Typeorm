import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { authConfig } from '../config/auth.config';
import { AppError } from '../errors/appError';

interface TokenPayload {
   iat: number;
   exp: number;
   sub: string;
}

export function ensureAuth(
   req: Request,
   res: Response,
   next: NextFunction,
): void {
   const authHeader = req.headers.authorization;

   if (!authHeader) {
      throw new AppError('JWT token is missing', 401);
   }

   const [, token] = authHeader.split(' ');

   try {
      const decoded = verify(token, authConfig.secret);

      const { sub } = decoded as TokenPayload;

      req.user = {
         id: sub,
      };

      return next();
   } catch {
      throw new AppError('Invalid JWT token', 401);
   }
}
