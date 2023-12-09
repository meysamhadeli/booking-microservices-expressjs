"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const morgan_1 = require("building-blocks/logging/morgan");
const routes_1 = require("./routes/routes");
const config_1 = __importDefault(require("building-blocks/config/config"));
const prom_client_1 = require("prom-client");
const swagger_1 = require("building-blocks/swagger/swagger");
const erro_handler_1 = require("building-blocks/error-handler/erro-handler");
const db_context_1 = require("./data/db.context");
const logger_extensions_1 = require("./extensions/logger.extensions");
const otel_extensions_1 = require("./extensions/otel.extensions");
const rabbitmq_extensions_1 = require("./extensions/rabbitmq.extensions");
const http_client_extensions_1 = require("./extensions/http-client.extensions");
const mediatr_extensions_1 = require("./extensions/mediatr.extensions");
const startupApp = async () => {
    (0, prom_client_1.collectDefaultMetrics)();
    const app = (0, express_1.default)();
    const logger = await (0, logger_extensions_1.initialLogger)();
    app.use(morgan_1.morganMiddleware);
    const databaseConnection = await (0, db_context_1.initialDbContext)();
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, compression_1.default)());
    app.use((0, cors_1.default)());
    app.options('*', (0, cors_1.default)());
    await (0, otel_extensions_1.initialOpenTelemetry)(app);
    app.use(passport_1.default.initialize());
    (0, routes_1.RegisterRoutes)(app);
    app.use(erro_handler_1.erroHandler);
    app.listen(config_1.default.port, () => {
        logger.info(`Listening to port ${config_1.default.port}`);
    });
    const rabbitmq = await (0, rabbitmq_extensions_1.initialRabbitmq)();
    await (0, http_client_extensions_1.initialHttpClientServices)();
    await (0, mediatr_extensions_1.registerMediatrHandlers)();
    if (config_1.default.env == 'development') {
        await (0, swagger_1.initialSwagger)(app);
    }
    process.on('SIGTERM', async () => {
        await databaseConnection.destroy();
        await rabbitmq.closeConnection();
    });
};
startupApp();
//# sourceMappingURL=app.js.map