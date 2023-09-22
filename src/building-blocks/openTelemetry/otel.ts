import {ConsoleSpanExporter, Tracer} from "@opentelemetry/sdk-trace-node";
import {singleton} from "tsyringe";

const {NodeTracerProvider} = require('@opentelemetry/node');
const {SimpleSpanProcessor} = require('@opentelemetry/tracing');
const {registerInstrumentations} = require('@opentelemetry/instrumentation');
const {AmqplibInstrumentation} = require('@opentelemetry/instrumentation-amqplib');
const {ExpressInstrumentation} = require('@opentelemetry/instrumentation-express');


export interface IOpenTelemetryTracer {
    createTracer(tracerName: string): Promise<Tracer>
}

@singleton()
export class OpenTelemetryTracer implements IOpenTelemetryTracer {
    async createTracer(tracerName: string): Promise<Tracer> {
        const provider = new NodeTracerProvider();
        const tracerExporter = new ConsoleSpanExporter();

        provider.addSpanProcessor(new SimpleSpanProcessor(tracerExporter));

        provider.register();

        registerInstrumentations({
            instrumentations: [
                new AmqplibInstrumentation(),
                new ExpressInstrumentation(),
            ],
        });

        const tracer = provider.getTracer(tracerName);

        return tracer;
    }

}
