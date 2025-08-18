import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] Request made to: ${req.path}`);
    next();
  }
}
