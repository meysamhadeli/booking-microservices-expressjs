"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CannotInjectValueError = void 0;
/**
 * Thrown when DI cannot inject value into property decorated by @Inject decorator.
 */
class CannotInjectValueError extends Error {
    constructor(target, propertyName) {
        super();
        this.target = target;
        this.propertyName = propertyName;
        this.name = 'CannotInjectValueError';
    }
    get message() {
        return (`Cannot inject value into "${this.target.constructor.name}.${this.propertyName}". ` +
            `Please make sure you setup reflect-metadata properly and you don't use interfaces without service tokens as injection value.`);
    }
}
exports.CannotInjectValueError = CannotInjectValueError;
//# sourceMappingURL=cannot-inject-value.error.js.map