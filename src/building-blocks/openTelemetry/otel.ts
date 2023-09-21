import { ConsoleSpanExporter, Tracer } from "@opentelemetry/sdk-trace-node";
const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { AmqplibInstrumentation } = require('@opentelemetry/instrumentation-amqplib');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
// const { PrometheusExporter } = require('@opentelemetry/exporter-prometheus'); // Import PrometheusExporter

export const initialOpenTelemetry = async (): Promise<Tracer> => {

    const provider = new NodeTracerProvider();
    const tracerExporter = new ConsoleSpanExporter();

    provider.addSpanProcessor(new SimpleSpanProcessor(tracerExporter));

    // const prometheusExporter = new PrometheusExporter({startServer: true});
    //
    // provider.addSpanProcessor(new SimpleSpanProcessor(prometheusExporter));

    provider.register();

    registerInstrumentations({
        instrumentations: [
            new AmqplibInstrumentation(),
            new ExpressInstrumentation(),
        ],
    });

    const tracer = provider.getTracer('rabbitmq-tracing');

    return tracer;
};
