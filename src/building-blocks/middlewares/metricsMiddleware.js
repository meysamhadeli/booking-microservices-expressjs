"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestDurationMiddleware = exports.requestCounterMiddleware = void 0;
const metrics_1 = require("../openTelemetry/metrics");
const requestCounterMiddleware = (err, req, res, next) => {
    const route = req.route ? req.route.path : 'unknown';
    if (err) {
        metrics_1.requestCounter.inc(req.method, route, res.statusCode);
        next(err);
    }
    metrics_1.errorCounter.inc(req.method, route, res.statusCode);
    next();
};
exports.requestCounterMiddleware = requestCounterMiddleware;
function requestDurationMiddleware(req, res, next) {
    const end = metrics_1.requestDurationHistogram.startTimer();
    const route = req.route ? req.route.path : 'unknown';
    res.on('finish', () => {
        end({ method: req.method, route });
    });
    next();
}
exports.requestDurationMiddleware = requestDurationMiddleware;
//# sourceMappingURL=metricsMiddleware.js.map