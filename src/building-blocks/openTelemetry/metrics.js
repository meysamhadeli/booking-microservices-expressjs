"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLatencyHistogram = exports.errorsCounter = exports.requestsCounter = void 0;
const prom_client_1 = require("prom-client");
// Define custom metrics
exports.requestsCounter = new prom_client_1.Counter({
    name: 'express_requests_total',
    help: 'Total number of Express requests',
});
exports.errorsCounter = new prom_client_1.Counter({
    name: 'express_errors_total',
    help: 'Total number of Express errors',
});
exports.requestLatencyHistogram = new prom_client_1.Histogram({
    name: 'express_request_latency_seconds',
    help: 'Request latency in seconds for Express routes',
    labelNames: ['route'],
    buckets: [0.1, 0.5, 1, 2, 5],
});
// Register the custom metrics
prom_client_1.register.registerMetric(exports.requestsCounter);
prom_client_1.register.registerMetric(exports.errorsCounter);
prom_client_1.register.registerMetric(exports.requestLatencyHistogram);
//# sourceMappingURL=metrics.js.map