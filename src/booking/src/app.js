"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const errorHandler_1 = require("building-blocks/middlewares/errorHandler");
const rabbitmqExtensions_1 = require("./extensions/rabbitmqExtensions");
const mediatrExtensions_1 = require("./extensions/mediatrExtensions");
const otelExtensions_1 = require("./extensions/otelExtensions");
const prom_client_1 = require("prom-client");
const dbContext_1 = require("./data/dbContext");
const swagger_1 = require("building-blocks/swagger/swagger");
const loggerExtensions_1 = require("./extensions/loggerExtensions");
const httpClientExtensions_1 = require("./extensions/httpClientExtensions");
const startupApp = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, prom_client_1.collectDefaultMetrics)();
    const app = (0, express_1.default)();
    const logger = yield (0, loggerExtensions_1.initialLogger)();
    app.use(morgan_1.morganMiddleware);
    const databaseConnection = yield (0, dbContext_1.initialDbContext)();
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, compression_1.default)());
    app.use((0, cors_1.default)());
    app.options('*', (0, cors_1.default)());
    yield (0, otelExtensions_1.initialOpenTelemetry)(app);
    app.use(passport_1.default.initialize());
    (0, routes_1.RegisterRoutes)(app);
    app.use(errorHandler_1.errorHandler);
    app.listen(config_1.default.port, () => {
        logger.info(`Listening to port ${config_1.default.port}`);
    });
    const rabbitmq = yield (0, rabbitmqExtensions_1.initialRabbitmq)();
    yield (0, httpClientExtensions_1.initialHttpClientServices)();
    yield (0, mediatrExtensions_1.registerMediatrHandlers)();
    if (config_1.default.env == 'development') {
        yield (0, swagger_1.initialSwagger)(app);
    }
    process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
        yield databaseConnection.destroy();
        yield rabbitmq.closeConnection();
    }));
});
startupApp();
//# sourceMappingURL=app.js.map