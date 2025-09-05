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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrometheusMetrics = void 0;
const Prometheus = __importStar(require("prom-client"));
const request_counter_middleware_1 = require("./request-counter.middleware");
const request_duration_middleware_1 = require("./request-duration.middleware");
const logger_1 = require("../logging/logger");
const tsyringe_1 = require("tsyringe");
let PrometheusMetrics = class PrometheusMetrics {
    static registerMetricsEndpoint(app) {
        app.use('/metrics', async (req, res) => {
            try {
                const metrics = await Prometheus.register.metrics();
                res.set('Content-Type', Prometheus.register.contentType);
                res.end(metrics);
            }
            catch (error) {
                logger_1.Logger.error(error);
                res.status(500).end();
            }
        });
        app.use(request_counter_middleware_1.requestCounterMiddleware);
        app.use(request_duration_middleware_1.requestDurationMiddleware);
    }
};
exports.PrometheusMetrics = PrometheusMetrics;
exports.PrometheusMetrics = PrometheusMetrics = __decorate([
    (0, tsyringe_1.injectable)()
], PrometheusMetrics);
//# sourceMappingURL=prometheus.metrics.js.map