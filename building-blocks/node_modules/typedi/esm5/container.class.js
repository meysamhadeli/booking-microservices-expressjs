import { ContainerInstance } from './container-instance.class';
/**
 * Service container.
 */
var Container = /** @class */ (function () {
    function Container() {
    }
    /**
     * Gets a separate container instance for the given instance id.
     */
    Container.of = function (containerId) {
        if (containerId === void 0) { containerId = 'default'; }
        if (containerId === 'default')
            return this.globalInstance;
        var container = this.instances.find(function (instance) { return instance.id === containerId; });
        if (!container) {
            container = new ContainerInstance(containerId);
            this.instances.push(container);
            // TODO: Why we are not reseting here? Let's reset here. (I have added the commented code.)
            // container.reset();
        }
        return container;
    };
    Container.has = function (identifier) {
        return this.globalInstance.has(identifier);
    };
    Container.get = function (identifier) {
        return this.globalInstance.get(identifier);
    };
    Container.getMany = function (id) {
        return this.globalInstance.getMany(id);
    };
    Container.set = function (identifierOrServiceMetadata, value) {
        this.globalInstance.set(identifierOrServiceMetadata, value);
        return this;
    };
    /**
     * Removes services with a given service identifiers.
     */
    Container.remove = function (identifierOrIdentifierArray) {
        this.globalInstance.remove(identifierOrIdentifierArray);
        return this;
    };
    /**
     * Completely resets the container by removing all previously registered services and handlers from it.
     */
    Container.reset = function (containerId) {
        if (containerId === void 0) { containerId = 'default'; }
        if (containerId == 'default') {
            this.globalInstance.reset();
            this.instances.forEach(function (instance) { return instance.reset(); });
        }
        else {
            var instance = this.instances.find(function (instance) { return instance.id === containerId; });
            if (instance) {
                instance.reset();
                this.instances.splice(this.instances.indexOf(instance), 1);
            }
        }
        return this;
    };
    /**
     * Registers a new handler.
     */
    Container.registerHandler = function (handler) {
        this.handlers.push(handler);
        return this;
    };
    /**
     * Helper method that imports given services.
     */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    Container.import = function (services) {
        return this;
    };
    /**
     * All registered handlers. The @Inject() decorator uses handlers internally to mark a property for injection.
     **/
    Container.handlers = [];
    /**  Global container instance. */
    Container.globalInstance = new ContainerInstance('default');
    /** Other containers created using Container.of method. */
    Container.instances = [];
    return Container;
}());
export { Container };
//# sourceMappingURL=container.class.js.map