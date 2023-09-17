import { Container } from '../container.class';
import { CannotInjectValueError } from '../error/cannot-inject-value.error';
import { resolveToTypeWrapper } from '../utils/resolve-to-type-wrapper.util';
export function Inject(typeOrIdentifier) {
    return function (target, propertyName, index) {
        var typeWrapper = resolveToTypeWrapper(typeOrIdentifier, target, propertyName, index);
        /** If no type was inferred, or the general Object type was inferred we throw an error. */
        if (typeWrapper === undefined || typeWrapper.eagerType === undefined || typeWrapper.eagerType === Object) {
            throw new CannotInjectValueError(target, propertyName);
        }
        Container.registerHandler({
            object: target,
            propertyName: propertyName,
            index: index,
            value: function (containerInstance) {
                var evaluatedLazyType = typeWrapper.lazyType();
                /** If no type was inferred lazily, or the general Object type was inferred we throw an error. */
                if (evaluatedLazyType === undefined || evaluatedLazyType === Object) {
                    throw new CannotInjectValueError(target, propertyName);
                }
                return containerInstance.get(evaluatedLazyType);
            },
        });
    };
}
//# sourceMappingURL=inject.decorator.js.map