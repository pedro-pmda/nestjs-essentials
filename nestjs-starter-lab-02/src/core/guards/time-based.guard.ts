import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class TimeBasedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const currentHour = new Date().getHours();
    // Allow access only during office hours
    return currentHour >= 5 && currentHour <= 18;
  }
}
