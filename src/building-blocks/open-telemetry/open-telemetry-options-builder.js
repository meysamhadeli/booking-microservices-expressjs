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
    get jaegerEndpoint() {
        return this._options.jaegerEndpoint;
    }
    set jaegerEndpoint(value) {
        this._options.jaegerEndpoint = value;
    }
    get zipkinEndpoint() {
        return this._options.zipkinEndpoint;
    }
    set zipkinEndpoint(value) {
        this._options.zipkinEndpoint = value;
    }
    get serviceName() {
        return this._options.serviceName;
    }
    set serviceName(value) {
        this._options.serviceName = value;
    }
    build() {
        return this._options;
    }
}
exports.OpenTelemetryOptionsBuilder = OpenTelemetryOptionsBuilder;
//# sourceMappingURL=open-telemetry-options-builder.js.map