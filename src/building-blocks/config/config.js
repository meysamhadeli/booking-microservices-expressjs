"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
const envVarsSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string().valid('production', 'development', 'test').required(),
    SERVICE_NAME: joi_1.default.string(),
    PORT: joi_1.default.number().default(3000),
    JWT_SECRET: joi_1.default.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: joi_1.default.number()
        .default(30)
        .description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: joi_1.default.number()
        .default(30)
        .description('days after which refresh tokens expire'),
    RABBITMQ_Host: joi_1.default.string().default('localhost').description('Rabbitmq host'),
    RABBITMQ_PORT: joi_1.default.number().default(5672).description('Rabbitmq port'),
    RABBITMQ_USERNAME: joi_1.default.string().default('guest').description('Rabbitmq username'),
    RABBITMQ_PASSWORD: joi_1.default.string().default('guest').description('Rabbitmq password'),
    RETRY_COUNT: joi_1.default.number().default(3).description('Number of retries'),
    RETRY_FACTOR: joi_1.default.number().default(2).description('Exponential backoff factor'),
    RETRY_MIN_TIMEOUT: joi_1.default.number().default(1000).description('Minimum time before retrying (1 second)'),
    RETRY_MAX_TIMEOUT: joi_1.default.number().default(60000).description('Maximum time before retrying (60 seconds)'),
})
    .unknown();
const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
exports.default = {
    env: envVars.NODE_ENV,
    serviceName: envVars.SERVICE_NAME,
    port: envVars.PORT,
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS
    },
    rabbitmq: {
        host: envVars.RABBITMQ_Host,
        port: envVars.RABBITMQ_PORT,
        userName: envVars.RABBITMQ_USERNAME,
        password: envVars.RABBITMQ_PASSWORD
    },
    retry: {
        count: envVars.RETRY_COUNT,
        factor: envVars.RETRY_FACTOR,
        minTimeout: envVars.RETRY_MIN_TIMEOUT,
        maxTimeout: envVars.RETRY_MAX_TIMEOUT
    }
};
//# sourceMappingURL=config.js.map