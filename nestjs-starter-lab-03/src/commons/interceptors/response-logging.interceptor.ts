import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ResponseLoggingInterceptor implements NestInterceptor {
  intercept<T>(context: ExecutionContext, next: CallHandler<T>): Observable<T> {
    const request: Request = context.switchToHttp().getRequest();
    const start = Date.now();

    return next.handle().pipe(
      // Efecto secundario que no muta la respuesta
      tap((data: T) => {
        const executionTime = Date.now() - start;
        Logger.log(
          `INTERCEPTOR - Request to ${request.method} - ${request.url} took ${executionTime}ms`,
        );
        // return {
        //   success: !(data instanceof Error) && data !== null,
        //   data: data,
        //   timestamp: new Date().toDateString(),
        // };
      }),
    );
  }
}
