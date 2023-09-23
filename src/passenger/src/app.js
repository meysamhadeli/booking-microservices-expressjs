"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.startupApp = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const morgan_1 = require("building-blocks/logging/morgan");
const routes_1 = require("./routes/routes");
const swaggerUi = __importStar(require("swagger-ui-express"));
const dataSource_1 = require("./data/dataSource");
const logger_1 = __importDefault(require("building-blocks/logging/logger"));
const logger_2 = __importDefault(require("building-blocks/logging/logger"));
const config_1 = __importDefault(require("building-blocks/config/config"));
const errorHandler_1 = require("building-blocks/middlewares/errorHandler");
const rabbitmqExtensions_1 = require("./extensions/rabbitmqExtensions");
const mediatrExtensions_1 = require("./extensions/mediatrExtensions");
const otelExtensions_1 = require("./extensions/otelExtensions");
const monitoringExtensions_1 = require("./extensions/monitoringExtensions");
const prom_client_1 = require("prom-client");
const repositoryExtensions_1 = require("./extensions/repositoryExtensions");
const startupApp = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, prom_client_1.collectDefaultMetrics)();
    const app = (0, express_1.default)();
    if (config_1.default.env !== 'test') {
        app.use(morgan_1.morganMiddleware);
        yield (0, monitoringExtensions_1.initialMonitoring)(app);
    }
    const databaseConnection = yield (0, dataSource_1.initialDatabase)();
    yield (0, repositoryExtensions_1.registerRepositories)();
    app.use((0, helmet_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, compression_1.default)());
    app.use((0, cors_1.default)());
    app.options('*', (0, cors_1.default)());
    yield (0, otelExtensions_1.initialOtel)();
    app.use(passport_1.default.initialize());
    (0, routes_1.RegisterRoutes)(app);
    app.use(errorHandler_1.errorHandler);
    app.listen(config_1.default.port, () => {
        logger_2.default.info(`Listening to port ${config_1.default.port}`);
    });
    const rabbitmq = yield (0, rabbitmqExtensions_1.initialRabbitmq)();
    yield (0, mediatrExtensions_1.registerMediatrHandlers)();
    if (config_1.default.env !== 'test') {
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const swaggerDocument = require('./docs/swagger.json');
            app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        }
        catch (err) {
            logger_1.default.error('Unable to read swagger.json', err);
        }
        process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () {
            yield rabbitmq.closeConnection();
            yield databaseConnection.destroy();
        }));
    }
});
exports.startupApp = startupApp;
(0, exports.startupApp)();
//# sourceMappingURL=app.js.map