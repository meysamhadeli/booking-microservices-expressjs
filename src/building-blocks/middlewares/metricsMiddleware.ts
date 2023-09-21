import {errorsCounter, requestLatencyHistogram, requestsCounter} from "../openTelemetry/metrics";

export const requestCounterMiddleware = (err, req, res, next) => {

    if (err) {
        errorsCounter.inc();
        next(err);
    }

    requestsCounter.inc();
    next();
};

export const requestLatencyMiddleware = (err, req, res, next) => {

    const start = Date.now();

    res.on('finish', () => {
        const end = Date.now();
        const elapsedTimeInSeconds = (end - start) / 1000;

        requestLatencyHistogram.labels(req.path).observe(elapsedTimeInSeconds);
    });

    next();
};
