const client = require('prom-client');
export const register = new client.Registry();

// Create and register custom metrics
export const requestCounter = new client.Counter({
  name: 'express_request_total',
  help: 'Total number of HTTP requests handled by the Express app',
  labelNames: ['method', 'route', 'statusCode']
});

export const errorCounter = new client.Counter({
  name: 'express_error_total',
  help: 'Total number of errors encountered by the Express app',
  labelNames: ['route']
});

export const requestDurationHistogram = new client.Histogram({
  name: 'express_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

register.registerMetric(requestCounter);
register.registerMetric(errorCounter);
register.registerMetric(requestDurationHistogram);
