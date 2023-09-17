import { Token } from '../token.class';
/**
 * Thrown when DI cannot inject value into property decorated by @Inject decorator.
 */
export class CannotInstantiateValueError extends Error {
    constructor(identifier) {
        var _a, _b;
        super();
        this.name = 'CannotInstantiateValueError';
        /** Normalized identifier name used in the error message. */
        this.normalizedIdentifier = '<UNKNOWN_IDENTIFIER>';
        // TODO: Extract this to a helper function and share between this and NotFoundError.
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
        return (`Cannot instantiate the requested value for the "${this.normalizedIdentifier}" identifier. ` +
            `The related metadata doesn't contain a factory or a type to instantiate.`);
    }
}
//# sourceMappingURL=cannot-instantiate-value.error.js.map