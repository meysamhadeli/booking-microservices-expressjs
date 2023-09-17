import { Container } from '../container.class';
import { Token } from '../token.class';
import { EMPTY_VALUE } from '../empty.const';
export function Service(optionsOrServiceIdentifier) {
    return targetConstructor => {
        const serviceMetadata = {
            id: targetConstructor,
            // TODO: Let's investigate why we receive Function type instead of a constructable.
            type: targetConstructor,
            factory: undefined,
            multiple: false,
            global: false,
            eager: false,
            transient: false,
            value: EMPTY_VALUE,
        };
        if (optionsOrServiceIdentifier instanceof Token || typeof optionsOrServiceIdentifier === 'string') {
            /** We received a Token or string ID. */
            serviceMetadata.id = optionsOrServiceIdentifier;
        }
        else if (optionsOrServiceIdentifier) {
            /** We received a ServiceOptions object. */
            serviceMetadata.id = optionsOrServiceIdentifier.id || targetConstructor;
            serviceMetadata.factory = optionsOrServiceIdentifier.factory || undefined;
            serviceMetadata.multiple = optionsOrServiceIdentifier.multiple || false;
            serviceMetadata.global = optionsOrServiceIdentifier.global || false;
            serviceMetadata.eager = optionsOrServiceIdentifier.eager || false;
            serviceMetadata.transient = optionsOrServiceIdentifier.transient || false;
        }
        Container.set(serviceMetadata);
    };
}
//# sourceMappingURL=service.decorator.js.map