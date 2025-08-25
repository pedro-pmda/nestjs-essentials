import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ResponseLoggingInterceptor implements NestInterceptor {
  intercept<T>(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<{ success: boolean; data: T; timestamp: string }> {
    const request: Request = context.switchToHttp().getRequest();
    const start = Date.now();

    return next.handle().pipe(
      map((data: T) => {
        const executionTime = Date.now() - start;
        console.log(
          `Request to ${request.method} - ${request.url} took ${executionTime}ms`,
        );

        return {
          success: !(data instanceof Error) && data !== null,
          data: data,
          timestamp: new Date().toDateString(),
        };
      }),
    );
  }
}
