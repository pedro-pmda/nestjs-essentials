// This interceptor is not a good idea because when the pipe is executed, the StatusCode hasn't been set yet.
// It's better to handle this wrapper at the top of the stack, like a middleware.
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request, Response } from 'express';
@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpCtx = context.switchToHttp();
    const request = httpCtx.getRequest<Request>();
    const response = httpCtx.getRequest<Response>();

    return next.handle().pipe(
      map((data) => ({
        statusCode: response.statusCode ?? 200, //You don't have here
        message: 'OK',
        timestamp: new Date().toDateString(),
        path: request.url,
        method: request.method,
        data: data,
      })),
    );
  }
}
