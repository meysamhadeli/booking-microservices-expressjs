import path from 'path';
import { isEmptyObject } from '../utils/reflection';
import Logger from '../logging/logger';
import { Express } from 'express';
import * as swaggerUi from 'swagger-ui-express';

export const initialSwagger = async (app: Express): Promise<void> => {
  try {
    // Define the path to your single Swagger JSON file
    const swaggerFilePath = path.join(process.cwd(), 'src/docs', 'swagger.json');

    // Load the Swagger JSON document
    const swaggerDocument = require(swaggerFilePath);

    // Check if securityDefinitions exists in the Swagger document
    if (isEmptyObject(swaggerDocument.components.securitySchemes)) {
      // If it doesn't exist, add your security scheme here
      swaggerDocument.components.securitySchemes = {
        jwt: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      };
    }

    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    return swaggerDocument;
  } catch (error) {
    Logger.error(error);
  }
};
