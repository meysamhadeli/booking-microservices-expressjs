"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialOpenTelemetry = void 0;
const tsyringe_1 = require("tsyringe");
const otel_1 = require("building-blocks/openTelemetry/otel");
const config_1 = __importDefault(require("building-blocks/config/config"));
const prometheus_metrics_1 = require("building-blocks/monitoring/prometheus.metrics");
const initialOpenTelemetry = async (app) => {
    const openTelemetryTracer = tsyringe_1.container.resolve(otel_1.OpenTelemetryTracer);
    await openTelemetryTracer.createTracer(config_1.default.serviceName);
    if (app) {
        prometheus_metrics_1.PrometheusMetrics.registerMetricsEndpoint(app);
    }
    return openTelemetryTracer;
};
exports.initialOpenTelemetry = initialOpenTelemetry;
//# sourceMappingURL=otelExtensions.js.map