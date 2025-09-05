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
exports.OtelDiagnosticsProvider = void 0;
const api_logs_1 = require("@opentelemetry/api-logs");
const api_1 = __importDefault(require("@opentelemetry/api"));
const config_1 = __importDefault(require("../config/config"));
const tsyringe_1 = require("tsyringe");
let OtelDiagnosticsProvider = class OtelDiagnosticsProvider {
    getInstrumentationName() {
        return config_1.default.opentelemetry?.serviceName || 'default-service';
    }
    getTracer() {
        return api_1.default.trace.getTracer(config_1.default.opentelemetry?.serviceName || 'default-service', config_1.default.opentelemetry?.serviceVersion || '1.0.0');
    }
    getMeter() {
        return api_1.default.metrics.getMeter(config_1.default.opentelemetry?.serviceName || 'default-service', config_1.default.opentelemetry?.serviceVersion || '1.0.0');
    }
    getLogger() {
        return api_logs_1.logs.getLogger(config_1.default.opentelemetry?.serviceName || 'default-service', config_1.default.opentelemetry?.serviceVersion || '1.0.0');
    }
    getCurrentSpan() {
        return api_1.default.trace.getActiveSpan();
    }
    getSpanFromContext(ctx) {
        return api_1.default.trace.getSpan(ctx);
    }
};
exports.OtelDiagnosticsProvider = OtelDiagnosticsProvider;
exports.OtelDiagnosticsProvider = OtelDiagnosticsProvider = __decorate([
    (0, tsyringe_1.injectable)()
], OtelDiagnosticsProvider);
//# sourceMappingURL=otel-diagnostics-provider.js.map