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
        return request.constructor.name;
    }
}
exports.mediatrJs = new MediatrJs();
//# sourceMappingURL=mediatr-js.js.map