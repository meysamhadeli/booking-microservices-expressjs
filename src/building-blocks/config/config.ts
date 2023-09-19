import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';

dotenv.config({path: path.join(process.cwd(), '.env')});

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3000),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
            .default(30)
            .description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
            .default(30)
            .description('days after which refresh tokens expire'),
        RABBITMQ_Host: Joi.string().default('localhost').description('Rabbitmq host'),
        RABBITMQ_PORT: Joi.number().default(5672).description('Rabbitmq port'),
        RETRY_COUNT: Joi.number().default(3).description('Number of retries'),
        RETRY_FACTOR: Joi.number().default(2).description('Exponential backoff factor'),
        RETRY_MIN_TIMEOUT: Joi.number().default(1000).description('Minimum time before retrying (1 second)'),
        RETRY_MAX_TIMEOUT: Joi.number().default(60000).description('Maximum time before retrying (60 seconds)'),
    })
    .unknown();

const {value: envVars, error} = envVarsSchema
    .prefs({errors: {label: 'key'}})
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS
    },
    rabbitmq:{
        host: envVars.RABBITMQ_Host,
        port: envVars.RABBITMQ_PORT
    },
    retry:{
        count: envVars.RETRY_COUNT,
        factor: envVars.RETRY_FACTOR,
        minTimout: envVars.RETRY_MIN_TIMEOUT,
        maxTimeout: envVars.maxTimeout
    }
};
