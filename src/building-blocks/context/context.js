"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpContextMiddleware = exports.HttpContext = void 0;
class HttpContext {
}
exports.HttpContext = HttpContext;
const httpContextMiddleware = (req, res, next) => {
    HttpContext.request = req;
    HttpContext.response = res;
    HttpContext.headers = req.headers;
    next();
};
exports.httpContextMiddleware = httpContextMiddleware;
//# sourceMappingURL=context.js.map