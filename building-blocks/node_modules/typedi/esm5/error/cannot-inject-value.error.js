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
/**
 * Thrown when DI cannot inject value into property decorated by @Inject decorator.
 */
var CannotInjectValueError = /** @class */ (function (_super) {
    __extends(CannotInjectValueError, _super);
    function CannotInjectValueError(target, propertyName) {
        var _this = _super.call(this) || this;
        _this.target = target;
        _this.propertyName = propertyName;
        _this.name = 'CannotInjectValueError';
        return _this;
    }
    Object.defineProperty(CannotInjectValueError.prototype, "message", {
        get: function () {
            return ("Cannot inject value into \"" + this.target.constructor.name + "." + this.propertyName + "\". " +
                "Please make sure you setup reflect-metadata properly and you don't use interfaces without service tokens as injection value.");
        },
        enumerable: false,
        configurable: true
    });
    return CannotInjectValueError;
}(Error));
export { CannotInjectValueError };
//# sourceMappingURL=cannot-inject-value.error.js.map