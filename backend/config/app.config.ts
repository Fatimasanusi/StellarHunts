import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => {
    const environment = process.env.NODE_ENV || 'development';

    // `/docs` is default-on in development only. Every other environment
    // (production, staging, test) must opt back in explicitly via
    // `SWAGGER_ENABLED=true`.
    const swaggerDisabledByDefault =
        environment === 'production' ||
        environment === 'staging' ||
        environment === 'test';

    return {
        environment,
        // Version segment of the global route prefix (`api/<version>`).
        // Kept in sync with `frontend/lib/api.js` (API_VERSION) and the
        // generated API reference — see docs/api-conventions.md.
        apiVersion: process.env.API_VERSION || 'v1',
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: [
                'Origin',
                'X-Requested-With',
                'Content-Type',
                'Accept',
                'Authorization',
            ],
            credentials: true,
        },
        // Swagger /docs is a powerful introspection surface (it can reveal
        // controller paths, DTO shapes, and schema internals), so it is
        // disabled by default outside development/test. To opt back in on a
        // non-local environment, set SWAGGER_ENABLED=true explicitly.
        swagger: {
            // Both the Swagger UI and its `/docs-json` document endpoint are
            // gated by this flag in backend/src/swagger.ts.
            enabled: swaggerDisabledByDefault
                ? process.env.SWAGGER_ENABLED === 'true'
                : true,
        },
    };
});