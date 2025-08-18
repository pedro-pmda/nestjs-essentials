import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HeaderCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['x-custom-header']) {
      console.log('Header is present');
      next();
    } else {
      res.status(400).send('Missing custom header');
    }
  }
}
