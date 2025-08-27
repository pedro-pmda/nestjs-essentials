import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const ALLOWED_VERSIONS = new Set(['v1', 'v2']);
const LATEST_VERSION = 'v2';
const DEFAULT_VERSION = 'v1';

// Si usas app.setGlobalPrefix('api'), pon 'api'; si no, deja null
const GLOBAL_PREFIX: string | null = null;

const isVersion = (s: string) => /^v\d+$/.test(s);
const joinUrl = (segs: string[], qs: string) =>
  '/' + segs.filter(Boolean).join('/') + (qs ? `?${qs}` : '');

export class VersioningManagementMiddleware implements NestMiddleware {
  private readonly logger = new Logger(VersioningManagementMiddleware.name);

  use(req: Request, _res: Response, next: NextFunction) {
    this.logger.log('Checking versioning…');

    // Separar ruta y query
    const [pathOnly, qs = ''] = req.url.split('?');
    const segments = pathOnly.replace(/^\/+/, '').split('/').filter(Boolean);

    // Calcular índice del segmento de versión (saltando prefijo global si aplica)
    const idx =
      GLOBAL_PREFIX &&
      segments[0]?.toLowerCase() === GLOBAL_PREFIX.toLowerCase()
        ? 1
        : 0;

    const current = (segments[idx] || '').toLowerCase();

    // 1) Sin versión → insertar DEFAULT_VERSION
    if (!isVersion(current)) {
      segments.splice(idx, 0, DEFAULT_VERSION);
      req.url = joinUrl(segments, qs);
      this.logger.warn(`No version provided. Rewriting to ${DEFAULT_VERSION}`);
      this.logger.warn(`Requesting to ${req.url}`);
      return next();
    }

    // 2) Con formato de versión pero no permitida → cambiar a LATEST_VERSION
    if (!ALLOWED_VERSIONS.has(current)) {
      segments[idx] = LATEST_VERSION;
      req.url = joinUrl(segments, qs);
      this.logger.warn(
        `Unsupported version "${current}". Rewriting to ${LATEST_VERSION}`,
      );
      this.logger.warn(`Requesting to ${req.url}`);
      return next();
    }

    // 3) Versión válida → seguir
    this.logger.warn(`Requesting to ${req.url}`);
    return next();
  }
}
