"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const morgan_1 = require("building-blocks/logging/morgan");
const routes_1 = require("./routes/routes");
const dataSource_1 = require("./data/dataSource");
const logger_1 = __importDefault(require("building-blocks/logging/logger"));
const config_1 = __importDefault(require("building-blocks/config/config"));
const errorHandler_1 = require("../../building-blocks/middlewares/errorHandler");
const swagger_1 = require("./docs/swagger");
const app = (0, express_1.default)();
// request and response logging
if (config_1.default.env !== 'test') {
    app.use(morgan_1.morganMiddleware);
}
// establish database connection
(0, dataSource_1.initialDataSource)();
// set security HTTP headers
app.use((0, helmet_1.default)());
// parse json request body
app.use(express_1.default.json());
// parse urlencoded request body
app.use(express_1.default.urlencoded({ extended: true }));
// gzip compression
app.use((0, compression_1.default)());
// enable cors
app.use((0, cors_1.default)());
app.options('*', (0, cors_1.default)());
// jwt authentication
app.use(passport_1.default.initialize());
// register routes with tsoa
(0, routes_1.RegisterRoutes)(app);
// error handler
app.use(errorHandler_1.errorHandler);
// register swagger
(0, swagger_1.initialSwagger)();
// run the server
app.listen(config_1.default.port, () => {
    logger_1.default.info(`Listening to port ${config_1.default.port}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map