import { Token } from '../token.class';
/**
 * Thrown when requested service was not found.
 */
export class ServiceNotFoundError extends Error {
    constructor(identifier) {
        var _a, _b;
        super();
        this.name = 'ServiceNotFoundError';
        /** Normalized identifier name used in the error message. */
        this.normalizedIdentifier = '<UNKNOWN_IDENTIFIER>';
        if (typeof identifier === 'string') {
            this.normalizedIdentifier = identifier;
        }
        else if (identifier instanceof Token) {
            this.normalizedIdentifier = `Token<${identifier.name || 'UNSET_NAME'}>`;
        }
        else if (identifier && (identifier.name || ((_a = identifier.prototype) === null || _a === void 0 ? void 0 : _a.name))) {
            this.normalizedIdentifier =
                `MaybeConstructable<${identifier.name}>` ||
                    `MaybeConstructable<${(_b = identifier.prototype) === null || _b === void 0 ? void 0 : _b.name}>`;
        }
    }
    get message() {
        return (`Service with "${this.normalizedIdentifier}" identifier was not found in the container. ` +
            `Register it before usage via explicitly calling the "Container.set" function or using the "@Service()" decorator.`);
    }
}
//# sourceMappingURL=service-not-found.error.js.map