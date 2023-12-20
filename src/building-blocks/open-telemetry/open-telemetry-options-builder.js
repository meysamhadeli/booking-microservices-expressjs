"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenTelemetryOptionsBuilder = exports.OpenTelemetryOptions = void 0;
class OpenTelemetryOptions {
}
exports.OpenTelemetryOptions = OpenTelemetryOptions;
class OpenTelemetryOptionsBuilder {
    constructor() {
        this._options = new OpenTelemetryOptions();
    }
    jaegerEndpoint(value) {
        this._options.jaegerEndpoint = value;
        return this;
    }
    zipkinEndpoint(value) {
        this._options.zipkinEndpoint = value;
        return this;
    }
    serviceName(value) {
        this._options.serviceName = value;
        return this;
    }
    build() {
        return this._options;
    }
}
exports.OpenTelemetryOptionsBuilder = OpenTelemetryOptionsBuilder;
//# sourceMappingURL=open-telemetry-options-builder.js.map