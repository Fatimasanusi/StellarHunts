import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerModule,
} from '@nestjs/swagger';
import { buildApiPrefix } from './api-prefix';

/** Path the interactive Swagger UI is mounted at. */
export const API_DOC_PATH = 'docs';

/** Name of the bearer security scheme declared on the document. */
export const BEARER_AUTH_SCHEME = 'bearer';

/** `info.version` reported in the OpenAPI document. */
export const API_DOCUMENT_VERSION = '1.0.0';

/**
 * Builds the OpenAPI document metadata. Kept separate from the runtime so the
 * CI generator (`scripts/generate-openapi.ts`) and `src/main.ts` emit exactly
 * the same document (issue #555).
 *
 * The versioned prefix is exposed as the document's `servers[0].url` so the
 * generated reference advertises the real `/api/v1` surface rather than
 * listing bare controller paths.
 */
export function buildSwaggerConfig(
  configService?: ConfigService,
): Omit<OpenAPIObject, 'paths'> {
  const prefix = buildApiPrefix(configService?.get<string>('appConfig.apiVersion'));

  return new DocumentBuilder()
    .setTitle('StellarHunts API')
    .setDescription(
      'StellarHunts backend REST API. Generated from the NestJS controllers; ' +
        'route conventions are documented in docs/api-conventions.md.',
    )
    .setVersion(API_DOCUMENT_VERSION)
    .addServer(`/${prefix}`, 'Versioned API prefix')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      BEARER_AUTH_SCHEME,
    )
    .build();
}

/**
 * Produces the OpenAPI document for a booted application using the shared
 * configuration. Requires route scanning to have happened (i.e. a created
 * `NestApplication`), but not an initialized or listening server.
 */
export function buildOpenApiDocument(
  app: INestApplication,
  configService?: ConfigService,
): OpenAPIObject {
  return SwaggerModule.createDocument(app, buildSwaggerConfig(configService));
}
