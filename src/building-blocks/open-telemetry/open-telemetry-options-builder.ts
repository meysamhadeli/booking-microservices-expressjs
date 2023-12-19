export class OpenTelemetryOptions {
  jaegerEndpoint: string;
  zipkinEndpoint: string;
  serviceName: string;
}

export class OpenTelemetryOptionsBuilder {
  private _options: OpenTelemetryOptions = new OpenTelemetryOptions();

  get jaegerEndpoint(): string {
    return this._options.jaegerEndpoint;
  }

  set jaegerEndpoint(value: string) {
    this._options.jaegerEndpoint = value;
  }

  get zipkinEndpoint(): string {
    return this._options.zipkinEndpoint;
  }

  set zipkinEndpoint(value: string) {
    this._options.zipkinEndpoint = value;
  }

  get serviceName(): string {
    return this._options.serviceName;
  }

  set serviceName(value: string) {
    this._options.serviceName = value;
  }

  build(): OpenTelemetryOptions {
    return this._options;
  }
}
