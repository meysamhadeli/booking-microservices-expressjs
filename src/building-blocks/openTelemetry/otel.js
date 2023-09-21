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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialOpenTelemetry = void 0;
const sdk_trace_node_1 = require("@opentelemetry/sdk-trace-node");
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { AmqplibInstrumentation } = require('@opentelemetry/instrumentation-amqplib');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
// const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus'); // Import PrometheusExporter
const initialOpenTelemetry = () => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new NodeTracerProvider();
    const tracerExporter = new sdk_trace_node_1.ConsoleSpanExporter();
    provider.addSpanProcessor(new SimpleSpanProcessor(tracerExporter));
    // const prometheusExporter = new PrometheusExporter({startServer: true});
    //
    // provider.addSpanProcessor(new SimpleSpanProcessor(prometheusExporter));
    provider.register();
    registerInstrumentations({
        instrumentations: [
            new AmqplibInstrumentation(),
            new ExpressInstrumentation(),
        ],
    });
    const tracer = provider.getTracer('rabbitmq-tracing');
    return tracer;
});
exports.initialOpenTelemetry = initialOpenTelemetry;
//# sourceMappingURL=otel.js.map