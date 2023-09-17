"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const container_instance_class_1 = require("./container-instance.class");
/**
 * Service container.
 */
class Container {
    /**
     * Gets a separate container instance for the given instance id.
     */
    static of(containerId = 'default') {
        if (containerId === 'default')
            return this.globalInstance;
        let container = this.instances.find(instance => instance.id === containerId);
        if (!container) {
            container = new container_instance_class_1.ContainerInstance(containerId);
            this.instances.push(container);
            // TODO: Why we are not reseting here? Let's reset here. (I have added the commented code.)
            // container.reset();
        }
        return container;
    }
    static has(identifier) {
        return this.globalInstance.has(identifier);
    }
    static get(identifier) {
        return this.globalInstance.get(identifier);
    }
    static getMany(id) {
        return this.globalInstance.getMany(id);
    }
    static set(identifierOrServiceMetadata, value) {
        this.globalInstance.set(identifierOrServiceMetadata, value);
        return this;
    }
    /**
     * Removes services with a given service identifiers.
     */
    static remove(identifierOrIdentifierArray) {
        this.globalInstance.remove(identifierOrIdentifierArray);
        return this;
    }
    /**
     * Completely resets the container by removing all previously registered services and handlers from it.
     */
    static reset(containerId = 'default') {
        if (containerId == 'default') {
            this.globalInstance.reset();
            this.instances.forEach(instance => instance.reset());
        }
        else {
            const instance = this.instances.find(instance => instance.id === containerId);
            if (instance) {
                instance.reset();
                this.instances.splice(this.instances.indexOf(instance), 1);
            }
        }
        return this;
    }
    /**
     * Registers a new handler.
     */
    static registerHandler(handler) {
        this.handlers.push(handler);
        return this;
    }
    /**
     * Helper method that imports given services.
     */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    static import(services) {
        return this;
    }
}
exports.Container = Container;
/**
 * All registered handlers. The @Inject() decorator uses handlers internally to mark a property for injection.
 **/
Container.handlers = [];
/**  Global container instance. */
Container.globalInstance = new container_instance_class_1.ContainerInstance('default');
/** Other containers created using Container.of method. */
Container.instances = [];
//# sourceMappingURL=container.class.js.map