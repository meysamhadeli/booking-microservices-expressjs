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
exports.initialOpenTelemetry = void 0;
const tsyringe_1 = require("tsyringe");
const otel_1 = require("building-blocks/openTelemetry/otel");
const config_1 = __importDefault(require("building-blocks/config/config"));
const logger_1 = require("building-blocks/logging/logger");
const metrics_1 = require("building-blocks/openTelemetry/metrics");
const metricsMiddleware_1 = require("building-blocks/middlewares/metricsMiddleware");
const initialOpenTelemetry = (app) => __awaiter(void 0, void 0, void 0, function* () {
    // tracing
    const openTelemetryTracer = tsyringe_1.container.resolve(otel_1.OpenTelemetryTracer);
    yield openTelemetryTracer.createTracer(config_1.default.serviceName);
    // monitoring
    if (app) {
        const logger = tsyringe_1.container.resolve(logger_1.Logger);
        app.get('/metrics', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                res.set('Content-Type', metrics_1.register.contentType);
                res.end(yield metrics_1.register.metrics());
                logger.info(`Metrics started on http://localhost:${config_1.default.port}/metrics`);
            }
            catch (err) {
                res.status(500).end(err);
            }
        }));
        // metrics for request counter
        app.use(metricsMiddleware_1.requestCounterMiddleware);
        // metrics for request duration
        app.use(metricsMiddleware_1.requestDurationMiddleware);
    }
    return openTelemetryTracer;
});
exports.initialOpenTelemetry = initialOpenTelemetry;
//# sourceMappingURL=otelExtensions.js.map