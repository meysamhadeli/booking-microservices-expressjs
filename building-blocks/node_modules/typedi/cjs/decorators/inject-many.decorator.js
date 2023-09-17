"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectMany = void 0;
const container_class_1 = require("../container.class");
const cannot_inject_value_error_1 = require("../error/cannot-inject-value.error");
const resolve_to_type_wrapper_util_1 = require("../utils/resolve-to-type-wrapper.util");
function InjectMany(typeOrIdentifier) {
    return function (target, propertyName, index) {
        const typeWrapper = resolve_to_type_wrapper_util_1.resolveToTypeWrapper(typeOrIdentifier, target, propertyName, index);
        /** If no type was inferred, or the general Object type was inferred we throw an error. */
        if (typeWrapper === undefined || typeWrapper.eagerType === undefined || typeWrapper.eagerType === Object) {
            throw new cannot_inject_value_error_1.CannotInjectValueError(target, propertyName);
        }
        container_class_1.Container.registerHandler({
            object: target,
            propertyName: propertyName,
            index: index,
            value: containerInstance => {
                const evaluatedLazyType = typeWrapper.lazyType();
                /** If no type was inferred lazily, or the general Object type was inferred we throw an error. */
                if (evaluatedLazyType === undefined || evaluatedLazyType === Object) {
                    throw new cannot_inject_value_error_1.CannotInjectValueError(target, propertyName);
                }
                return containerInstance.getMany(evaluatedLazyType);
            },
        });
    };
}
exports.InjectMany = InjectMany;
//# sourceMappingURL=inject-many.decorator.js.map