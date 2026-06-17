import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EventPass API',
      version: '1.0.0',
      description: 'Documentation for EventPass API services',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  // Path to the API docs
  apis: ['./src/infrastructure/http/routes/*.ts', './src/infrastructure/http/controllers/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
