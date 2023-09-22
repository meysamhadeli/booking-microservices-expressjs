"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenTelemetryTracer = void 0;
const sdk_trace_node_1 = require("@opentelemetry/sdk-trace-node");
const tsyringe_1 = require("tsyringe");
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { AmqplibInstrumentation } = require('@opentelemetry/instrumentation-amqplib');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
let OpenTelemetryTracer = class OpenTelemetryTracer {
    createTracer(tracerName) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const tracer = provider.getTracer(tracerName);
            return tracer;
        });
    }
};
exports.OpenTelemetryTracer = OpenTelemetryTracer;
exports.OpenTelemetryTracer = OpenTelemetryTracer = __decorate([
    (0, tsyringe_1.singleton)()
], OpenTelemetryTracer);
//# sourceMappingURL=otel.js.map