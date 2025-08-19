import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from '@nestjs/common';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { RoleGuard } from 'src/core/guards/role.guard';
import { LoggingService } from 'src/logging/logging.service';

export interface RequestCustom extends Partial<Request> {
  customMetadata?: Record<string, unknown>;
}

@Controller('info')
export class InfoController {
  constructor(private readonly logginService: LoggingService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Get()
  extractReqInfo(@Req() request: Request) {
    return {
      method: request.method,
      url: request.url,
      Headers: request.headers,
    };
  }

  @Get('headers')
  showHeaders(@Req() request: Request) {
    return request.headers;
  }

  @Get('annotate')
  annotateRequest(@Req() request: Request) {
    // Adding custom metadata
    const requestCustom: RequestCustom = {
      method: request.method,
      url: request.url,
      headers: request.headers,
      customMetadata: {
        timestamp: new Date(),
        route: request.url,
      },
    };
    this.logginService.logActivity(requestCustom);
    return requestCustom;
  }
}
