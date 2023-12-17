import { BatchSpanProcessor, Tracer } from '@opentelemetry/sdk-trace-node';
import { injectable, singleton } from 'tsyringe';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import config from '../config/config';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { RabbitmqOptionsBuilder } from '../rabbitmq/rabbitmq-options-builder';
import { OpenTelemetryOptionsBuilder } from './open-telemetry-options-builder';

const { NodeTracerProvider } = require('@opentelemetry/node');
const { SimpleSpanProcessor } = require('@opentelemetry/tracing');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { AmqplibInstrumentation } = require('@opentelemetry/instrumentation-amqplib');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');

export class OpenTelemetryOptions {
  jaegerEndpoint: string;
  zipkinEndpoint: string;
  serviceName: string;
}

export interface IOpenTelemetryTracer {
  createTracer(
    openTelemetryOptionsBuilder?: (
      openTelemetryOptionsBuilder?: OpenTelemetryOptionsBuilder
    ) => void
  ): Promise<Tracer>;
}

@injectable()
export class OpenTelemetryTracer implements IOpenTelemetryTracer {
  async createTracer(
    openTelemetryOptionsBuilder: (openTelemetryOptionsBuilder?: OpenTelemetryOptionsBuilder) => void
  ): Promise<Tracer> {
    const builder = new OpenTelemetryOptionsBuilder();
    openTelemetryOptionsBuilder(builder);

    const options = builder.build();

    const provider = new NodeTracerProvider({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: options?.serviceName ?? config.serviceName
      })
    });

    const jaegerExporter = new JaegerExporter({
      endpoint: options?.jaegerEndpoint ?? config.monitoring.jaegerEndpoint
    });

    const zipkinExporter = new ZipkinExporter({
      url: options?.zipkinEndpoint ?? config.monitoring.zipkinEndpoint,
      serviceName: options?.serviceName ?? config.serviceName
    });

    provider.addSpanProcessor(new SimpleSpanProcessor(jaegerExporter));
    provider.addSpanProcessor(new BatchSpanProcessor(zipkinExporter));

    provider.register();

    registerInstrumentations({
      instrumentations: [
        new HttpInstrumentation(),
        new ExpressInstrumentation(),
        new AmqplibInstrumentation()
      ]
    });

    const tracer = provider.getTracer(options?.serviceName ?? config.serviceName);

    return tracer;
  }
}
