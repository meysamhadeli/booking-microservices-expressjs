import { BatchSpanProcessor, Tracer } from '@opentelemetry/sdk-trace-node';
import { singleton } from 'tsyringe';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import config from '../config/config';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { AmqplibInstrumentation } = require('@opentelemetry/instrumentation-amqplib');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');

export interface IOpenTelemetryTracer {
  createTracer(tracerName: string): Promise<Tracer>;
}

@singleton()
export class OpenTelemetryTracer implements IOpenTelemetryTracer {
  async createTracer(tracerName: string): Promise<Tracer> {
    const provider = new NodeTracerProvider({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: config.serviceName
      })
    });

    const jaegerExporter = new JaegerExporter({
      endpoint: config.monitoring.jaegerEndpoint
    });

    const zipkinExporter = new ZipkinExporter({
      url: config.monitoring.zipkinEndpoint,
      serviceName: config.serviceName
    });

    provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
    provider.addSpanProcessor(new BatchSpanProcessor(zipkinExporter));

    provider.register();

    registerInstrumentations({
      instrumentations: [
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
        new AmqplibInstrumentation(),
      ]
    });

    const tracer = provider.getTracer(tracerName);

    return tracer;
  }
}
