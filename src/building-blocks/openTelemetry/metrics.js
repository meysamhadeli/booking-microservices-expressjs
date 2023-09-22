"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestDurationHistogram = exports.errorCounter = exports.requestCounter = exports.register = void 0;
const client = require('prom-client');
exports.register = new client.Registry();
// Create and register custom metrics
exports.requestCounter = new client.Counter({
    name: 'express_request_total',
    help: 'Total number of HTTP requests handled by the Express app',
    labelNames: ['method', 'route', 'statusCode']
});
exports.errorCounter = new client.Counter({
    name: 'express_error_total',
    help: 'Total number of errors encountered by the Express app',
    labelNames: ['route']
});
exports.requestDurationHistogram = new client.Histogram({
    name: 'express_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route'],
    buckets: [0.1, 0.5, 1, 2, 5]
});
exports.register.registerMetric(exports.requestCounter);
exports.register.registerMetric(exports.errorCounter);
exports.register.registerMetric(exports.requestDurationHistogram);
//# sourceMappingURL=metrics.js.map