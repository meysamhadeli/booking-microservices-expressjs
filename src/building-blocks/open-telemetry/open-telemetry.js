"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenTelemetryTracer = void 0;
const sdk_trace_node_1 = require("@opentelemetry/sdk-trace-node");
const tsyringe_1 = require("tsyringe");
const exporter_jaeger_1 = require("@opentelemetry/exporter-jaeger");
const config_1 = __importDefault(require("../config/config"));
const exporter_zipkin_1 = require("@opentelemetry/exporter-zipkin");
const resources_1 = require("@opentelemetry/resources");
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { AmqplibInstrumentation } = require('@opentelemetry/instrumentation-amqplib');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
let OpenTelemetryTracer = class OpenTelemetryTracer {
    async createTracer(tracerName) {
        const provider = new NodeTracerProvider({
            resource: new resources_1.Resource({
                [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: config_1.default.serviceName
            })
        });
        const jaegerExporter = new exporter_jaeger_1.JaegerExporter({
            endpoint: config_1.default.monitoring.jaegerEndpoint
        });
        const zipkinExporter = new exporter_zipkin_1.ZipkinExporter({
            url: config_1.default.monitoring.zipkinEndpoint,
            serviceName: config_1.default.serviceName
        });
        provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
        provider.addSpanProcessor(new sdk_trace_node_1.BatchSpanProcessor(zipkinExporter));
        provider.register();
        registerInstrumentations({
            instrumentations: [
                new HttpInstrumentation(),
                new ExpressInstrumentation(),
                new AmqplibInstrumentation(),
            ]
        });
        const tracer = provider.getTracer(tracerName);
        return tracer;
    }
};
exports.OpenTelemetryTracer = OpenTelemetryTracer;
exports.OpenTelemetryTracer = OpenTelemetryTracer = __decorate([
    (0, tsyringe_1.injectable)()
], OpenTelemetryTracer);
//# sourceMappingURL=open-telemetry.js.map