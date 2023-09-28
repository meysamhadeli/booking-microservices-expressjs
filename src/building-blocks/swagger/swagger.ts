import path from 'path';
import { isEmptyObject } from '../utils/reflection';
import { Express } from 'express';
import * as swaggerUi from 'swagger-ui-express';

export const initialSwagger = async (app: Express): Promise<void> => {
  try {
    const swaggerFilePath = path.join(process.cwd(), 'src/docs', 'swagger.json');

    const swaggerDocument = require(swaggerFilePath);

    if (isEmptyObject(swaggerDocument.components.securitySchemes)) {
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
    throw new Error(error);
  }
};
