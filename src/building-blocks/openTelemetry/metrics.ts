import { Counter, Histogram, register } from 'prom-client';

// Define custom metrics
export const requestsCounter = new Counter({
    name: 'express_requests_total',
    help: 'Total number of Express requests',
});

export const errorsCounter = new Counter({
    name: 'express_errors_total',
    help: 'Total number of Express errors',
});

export const requestLatencyHistogram = new Histogram({
    name: 'express_request_latency_seconds',
    help: 'Request latency in seconds for Express routes',
    labelNames: ['route'],
    buckets: [0.1, 0.5, 1, 2, 5],
});

// Register the custom metrics
register.registerMetric(requestsCounter);
register.registerMetric(errorsCounter);
register.registerMetric(requestLatencyHistogram);
