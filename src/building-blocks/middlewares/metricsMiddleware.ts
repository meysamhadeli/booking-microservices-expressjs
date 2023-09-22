import { errorCounter, requestCounter, requestDurationHistogram } from '../openTelemetry/metrics';

export const requestCounterMiddleware = (err, req, res, next) => {
  const route = req.route ? req.route.path : 'unknown';

  if (err) {
    requestCounter.inc(req.method, route, res.statusCode);
    next(err);
  }

  errorCounter.inc(req.method, route, res.statusCode);
  next();
};

export function requestDurationMiddleware(req, res, next) {
  const end = requestDurationHistogram.startTimer();
  const route = req.route ? req.route.path : 'unknown';

  res.on('finish', () => {
    end({ method: req.method, route });
  });

  next();
}
