import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const timestamp = new Date().toDateString();
    console.log(`${timestamp}] ${method} ${originalUrl}`);
    next();
  }
}
