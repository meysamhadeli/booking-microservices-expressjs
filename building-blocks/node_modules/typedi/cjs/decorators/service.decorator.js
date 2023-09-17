"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const container_class_1 = require("../container.class");
const token_class_1 = require("../token.class");
const empty_const_1 = require("../empty.const");
function Service(optionsOrServiceIdentifier) {
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
            value: empty_const_1.EMPTY_VALUE,
        };
        if (optionsOrServiceIdentifier instanceof token_class_1.Token || typeof optionsOrServiceIdentifier === 'string') {
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
        container_class_1.Container.set(serviceMetadata);
    };
}
exports.Service = Service;
//# sourceMappingURL=service.decorator.js.map