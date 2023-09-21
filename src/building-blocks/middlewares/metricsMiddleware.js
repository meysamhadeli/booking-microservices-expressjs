"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLatencyMiddleware = exports.requestCounterMiddleware = void 0;
const metrics_1 = require("../openTelemetry/metrics");
const requestCounterMiddleware = (err, req, res, next) => {
    if (err) {
        metrics_1.errorsCounter.inc();
        next(err);
    }
    metrics_1.requestsCounter.inc();
    next();
};
exports.requestCounterMiddleware = requestCounterMiddleware;
const requestLatencyMiddleware = (err, req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const end = Date.now();
        const elapsedTimeInSeconds = (end - start) / 1000;
        metrics_1.requestLatencyHistogram.labels(req.path).observe(elapsedTimeInSeconds);
    });
    next();
};
exports.requestLatencyMiddleware = requestLatencyMiddleware;
//# sourceMappingURL=metricsMiddleware.js.map