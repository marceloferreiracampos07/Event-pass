import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EventPass Identity API',
      version: '1.0.0',
      description: 'Documentation for EventPass Identity service',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
  },
  // Path to the API docs
  apis: ['./src/infrastructure/http/routes/*.ts', './src/infrastructure/http/controller/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
