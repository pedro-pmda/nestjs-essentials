import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class BlockGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // In a real scenario, you'd implement some logic here
    return false;
  }
}
