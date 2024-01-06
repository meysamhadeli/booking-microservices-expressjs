"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediatrJs = void 0;
class MediatrJs {
    constructor() {
        this.requestHandlersRegistrations = {};
    }
    registerRequestHandler(request, handler) {
        const requestTypeName = this.GetTypeName(request);
        this.requestHandlersRegistrations[requestTypeName] = handler;
    }
    async send(request) {
        const requestTypeName = this.GetTypeName(request);
        const handlerFunction = this
            .requestHandlersRegistrations[requestTypeName];
        if (handlerFunction) {
            return await handlerFunction.handle(request);
        }
        else {
            throw new Error(`No handler registered for request type: ${requestTypeName}`);
        }
    }
    GetTypeName(request) {
        var _a;
        return (_a = request === null || request === void 0 ? void 0 : request.name) !== null && _a !== void 0 ? _a : request.constructor.name;
    }
}
exports.mediatrJs = new MediatrJs();
//# sourceMappingURL=mediatr-js.js.map