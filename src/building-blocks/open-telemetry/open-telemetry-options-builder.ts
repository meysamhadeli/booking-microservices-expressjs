export class OpenTelemetryOptions {
  jaegerEndpoint: string;
  zipkinEndpoint: string;
  serviceName: string;
}

export class OpenTelemetryOptionsBuilder {
  private _options: OpenTelemetryOptions = new OpenTelemetryOptions();

  jaegerEndpoint(value: string): OpenTelemetryOptionsBuilder {
    this._options.jaegerEndpoint = value;
    return this;
  }

  zipkinEndpoint(value: string): OpenTelemetryOptionsBuilder {
    this._options.zipkinEndpoint = value;
    return this;
  }

  serviceName(value: string) : OpenTelemetryOptionsBuilder{
    this._options.serviceName = value;
    return this;
  }

  build(): OpenTelemetryOptions {
    return this._options;
  }
}
