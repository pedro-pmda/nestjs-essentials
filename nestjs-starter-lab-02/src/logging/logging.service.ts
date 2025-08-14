import { Injectable } from '@nestjs/common';

import { RequestCustom } from '../info/info.controller';

@Injectable()
export class LoggingService {
  logActivity(request: RequestCustom) {
    const metadata = request.customMetadata as Record<string, unknown>;
    console.log(`Accessed route: ${String(metadata.route)}`);
  }
}
