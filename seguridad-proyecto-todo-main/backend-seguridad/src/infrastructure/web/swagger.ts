import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Product API',
            version: '1.0.0',
            description: 'A simple Express Product API',
        },
    },
    apis: [
        './src/infrastructure/web/product.routes.ts',
        './src/infrastructure/web/rol/rol.routes.ts',
        './src/infrastructure/web/usuario/usuario.routes.ts',
        './src/infrastructure/web/zona/zona.routes.ts',
        './src/infrastructure/web/turno/turno.routes.ts',
        './src/infrastructure/web/registro-asistencia/registro-asistencia.routes.ts',
        './src/infrastructure/web/tipos-incidente/tipos-incidente.routes.ts',
        './src/infrastructure/web/incidente/incidente.routes.ts',
        './src/infrastructure/web/evidencia-incidente/evidencia-incidente.routes.ts',
        './src/infrastructure/web/equipo-catalogo/equipo-catalogo.routes.ts',
        './src/infrastructure/web/equipo-asignado/equipo-asignado.routes.ts',
        './src/infrastructure/web/certificacion/certificacion.routes.ts',
        './src/infrastructure/web/guardia-certificacion/guardia-certificacion.routes.ts'
    ],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app: Express) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
