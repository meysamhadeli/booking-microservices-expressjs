"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenTelemetry = void 0;
const sdk_node_1 = require("@opentelemetry/sdk-node");
const exporter_trace_otlp_grpc_1 = require("@opentelemetry/exporter-trace-otlp-grpc");
const exporter_metrics_otlp_grpc_1 = require("@opentelemetry/exporter-metrics-otlp-grpc");
const exporter_logs_otlp_grpc_1 = require("@opentelemetry/exporter-logs-otlp-grpc");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const resources_1 = require("@opentelemetry/resources");
const core_1 = require("@opentelemetry/core");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const sdk_logs_1 = require("@opentelemetry/sdk-logs");
const config_1 = __importDefault(require("../config/config"));
class OpenTelemetry {
    static start() {
        const otelSdk = new sdk_node_1.NodeSDK({
            resource: (0, resources_1.defaultResource)().merge((0, resources_1.resourceFromAttributes)({
                [semantic_conventions_1.ATTR_SERVICE_NAME]: config_1.default.opentelemetry?.serviceName || 'express-app',
                [semantic_conventions_1.ATTR_SERVICE_VERSION]: config_1.default.opentelemetry?.serviceVersion || '1.0.0'
            })),
            instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
            traceExporter: new exporter_trace_otlp_grpc_1.OTLPTraceExporter({
                url: config_1.default.opentelemetry?.collectorUrl || 'http://localhost:4317'
            }),
            metricReader: new sdk_node_1.metrics.PeriodicExportingMetricReader({
                exporter: new exporter_metrics_otlp_grpc_1.OTLPMetricExporter({
                    url: config_1.default.opentelemetry?.collectorUrl || 'http://localhost:4317'
                })
            }),
            logRecordProcessors: [
                new sdk_logs_1.SimpleLogRecordProcessor(new exporter_logs_otlp_grpc_1.OTLPLogExporter({
                    url: config_1.default.opentelemetry?.collectorUrl || 'http://localhost:4317'
                }))
            ],
            textMapPropagator: new core_1.CompositePropagator({
                propagators: [new core_1.W3CTraceContextPropagator(), new core_1.W3CBaggagePropagator()]
            })
        });
        process.on('SIGTERM', () => {
            otelSdk
                .shutdown()
                .then(() => console.log('SDK shut down successfully'), (err) => console.log('Error shutting down SDK', err))
                .finally(() => process.exit(0));
        });
        otelSdk.start();
        console.log('OpenTelemetry SDK started');
    }
}
exports.OpenTelemetry = OpenTelemetry;
//# sourceMappingURL=open-telemetry.js.map