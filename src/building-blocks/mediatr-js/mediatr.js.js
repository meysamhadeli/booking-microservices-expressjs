"use strict";
// ref: https://github.com/RifautAlexis/vertical-slice/blob/master/src/verticalSlice.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mediatrJs = void 0;
/**


/**
 * Manage registration and resolving handlers
 */
class MediatrJs {
    constructor() {
        this.handlers = {};
    }
    /**
     * Register a handler in a dictionnary
     *
     * @param request - Request associated with handler in registration
     * @param handler - Handler in registration
     */
    registerHandler(request, handler) {
        const requestName = this.GetTypeName(new request());
        if (this.handlers[requestName] !== undefined) {
            throw new Error('Request is already attribute to a handler');
        }
        this.handlers[requestName] = handler;
    }
    /**
     * Return the handler corresponding to the request
     *
     * @param request - Request associated with desired handler
     * @returns The result from the handler
     */
    send(request) {
        return __awaiter(this, void 0, void 0, function* () {
            if (request === undefined || request === null) {
                throw new Error('Null or undefined request');
            }
            const requestName = this.GetTypeName(request);
            const handlerFunction = this.handlers[requestName];
            if (!!!handlerFunction) {
                throw new Error('Request is not registered');
            }
            const handler = this.handlers[requestName];
            return yield handler.handle(request);
        });
    }
    GetTypeName(request) {
        return request.constructor.name;
    }
}
exports.mediatrJs = new MediatrJs();
//# sourceMappingURL=mediatr.js.js.map