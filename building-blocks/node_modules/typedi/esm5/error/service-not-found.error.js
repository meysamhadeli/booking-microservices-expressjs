var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Token } from '../token.class';
/**
 * Thrown when requested service was not found.
 */
var ServiceNotFoundError = /** @class */ (function (_super) {
    __extends(ServiceNotFoundError, _super);
    function ServiceNotFoundError(identifier) {
        var _a, _b;
        var _this = _super.call(this) || this;
        _this.name = 'ServiceNotFoundError';
        /** Normalized identifier name used in the error message. */
        _this.normalizedIdentifier = '<UNKNOWN_IDENTIFIER>';
        if (typeof identifier === 'string') {
            _this.normalizedIdentifier = identifier;
        }
        else if (identifier instanceof Token) {
            _this.normalizedIdentifier = "Token<" + (identifier.name || 'UNSET_NAME') + ">";
        }
        else if (identifier && (identifier.name || ((_a = identifier.prototype) === null || _a === void 0 ? void 0 : _a.name))) {
            _this.normalizedIdentifier =
                "MaybeConstructable<" + identifier.name + ">" ||
                    "MaybeConstructable<" + ((_b = identifier.prototype) === null || _b === void 0 ? void 0 : _b.name) + ">";
        }
        return _this;
    }
    Object.defineProperty(ServiceNotFoundError.prototype, "message", {
        get: function () {
            return ("Service with \"" + this.normalizedIdentifier + "\" identifier was not found in the container. " +
                "Register it before usage via explicitly calling the \"Container.set\" function or using the \"@Service()\" decorator.");
        },
        enumerable: false,
        configurable: true
    });
    return ServiceNotFoundError;
}(Error));
export { ServiceNotFoundError };
//# sourceMappingURL=service-not-found.error.js.map