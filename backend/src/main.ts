import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { securityHeadersConfig } from './security-headers';
import { setupSwagger } from './swagger';

/**
 * Hard limit (ms) we allow the graceful shutdown sequence to take before
 * forcing process exit. Kubernetes/the container runtime send a SIGKILL
 * ~30s after SIGTERM, so we stay safely underneath that to avoid being
 * killed mid-shutdown while still guaranteeing the process eventually exits.
 */
const FORCE_SHUTDOWN_TIMEOUT_MS = 25_000;

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);

  app.setGlobalPrefix('api', { exclude: ['docs', 'docs-json'] });
  app.enableCors({
    origin: configService.get<string>('appConfig.cors.origin') ?? '*',
    methods: configService.get<string[]>('appConfig.cors.methods') ?? ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: configService.get<string[]>('appConfig.cors.allowedHeaders') ?? ['Content-Type', 'Authorization'],
    credentials: configService.get<boolean>('appConfig.cors.credentials') ?? true,
  });
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Respect `appConfig.swagger.enabled` (see backend/config/app.config.ts):
  // the UI is mounted in development but stays off by default in
  // production/staging/test unless `SWAGGER_ENABLED=true` is set explicitly.
  setupSwagger(app, configService);

  const port = Number.parseInt(process.env.PORT ?? '3001', 10);
  await app.listen(port);
  logger.log(`StellarHunts API listening on http://localhost:${port}`);
}

void bootstrap();
