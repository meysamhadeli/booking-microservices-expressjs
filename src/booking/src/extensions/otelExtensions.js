"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialOtel = void 0;
const tsyringe_1 = require("tsyringe");
const otel_1 = require("building-blocks/openTelemetry/otel");
const config_1 = __importDefault(require("building-blocks/config/config"));
const initialOtel = () => __awaiter(void 0, void 0, void 0, function* () {
    const openTelemetryTracer = tsyringe_1.container.resolve(otel_1.OpenTelemetryTracer);
    yield openTelemetryTracer.createTracer(config_1.default.serviceName);
    return openTelemetryTracer;
});
exports.initialOtel = initialOtel;
//# sourceMappingURL=otelExtensions.js.map