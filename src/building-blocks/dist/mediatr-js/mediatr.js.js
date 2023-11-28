"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediatrJs = void 0;
class MediatrJs {
    constructor() {
        this.handlers = {};
    }
    registerHandler(request, handler) {
        const requestName = this.GetTypeName(new request());
        if (this.handlers[requestName] !== undefined) {
            throw new Error('Request is already attribute to a handler');
        }
        this.handlers[requestName] = handler;
    }
    async send(request) {
        if (request === undefined || request === null) {
            throw new Error('Null or undefined request');
        }
        const requestName = this.GetTypeName(request);
        const handlerFunction = this.handlers[requestName];
        if (!!!handlerFunction) {
            throw new Error('Request is not registered');
        }
        const handler = this.handlers[requestName];
        return await handler.handle(request);
    }
    GetTypeName(request) {
        return request.constructor.name;
    }
}
exports.mediatrJs = new MediatrJs();
//# sourceMappingURL=mediatr.js.js.map