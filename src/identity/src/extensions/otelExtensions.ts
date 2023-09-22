import { container } from 'tsyringe';
import { OpenTelemetryTracer } from 'building-blocks/openTelemetry/otel';
import config from 'building-blocks/config/config';

export const initialOtel = async (): Promise<OpenTelemetryTracer> => {
  const openTelemetryTracer = container.resolve(OpenTelemetryTracer);
  await openTelemetryTracer.createTracer(config.serviceName);

  return openTelemetryTracer;
};
