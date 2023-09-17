var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Container } from './container.class';
import { ServiceNotFoundError } from './error/service-not-found.error';
import { CannotInstantiateValueError } from './error/cannot-instantiate-value.error';
import { Token } from './token.class';
import { EMPTY_VALUE } from './empty.const';
/**
 * TypeDI can have multiple containers.
 * One container is ContainerInstance.
 */
var ContainerInstance = /** @class */ (function () {
    function ContainerInstance(id) {
        /** All registered services in the container. */
        this.services = [];
        this.id = id;
    }
    ContainerInstance.prototype.has = function (identifier) {
        return !!this.findService(identifier);
    };
    ContainerInstance.prototype.get = function (identifier) {
        var globalContainer = Container.of(undefined);
        var globalService = globalContainer.findService(identifier);
        var scopedService = this.findService(identifier);
        if (globalService && globalService.global === true)
            return this.getServiceValue(globalService);
        if (scopedService)
            return this.getServiceValue(scopedService);
        /** If it's the first time requested in the child container we load it from parent and set it. */
        if (globalService && this !== globalContainer) {
            var clonedService = __assign({}, globalService);
            clonedService.value = EMPTY_VALUE;
            /**
             * We need to immediately set the empty value from the root container
             * to prevent infinite lookup in cyclic dependencies.
             */
            this.set(clonedService);
            var value = this.getServiceValue(clonedService);
            this.set(__assign(__assign({}, clonedService), { value: value }));
            return value;
        }
        if (globalService)
            return this.getServiceValue(globalService);
        throw new ServiceNotFoundError(identifier);
    };
    ContainerInstance.prototype.getMany = function (identifier) {
        var _this = this;
        return this.findAllServices(identifier).map(function (service) { return _this.getServiceValue(service); });
    };
    ContainerInstance.prototype.set = function (identifierOrServiceMetadata, value) {
        var _this = this;
        if (identifierOrServiceMetadata instanceof Array) {
            identifierOrServiceMetadata.forEach(function (data) { return _this.set(data); });
            return this;
        }
        if (typeof identifierOrServiceMetadata === 'string' || identifierOrServiceMetadata instanceof Token) {
            return this.set({
                id: identifierOrServiceMetadata,
                type: null,
                value: value,
                factory: undefined,
                global: false,
                multiple: false,
                eager: false,
                transient: false,
            });
        }
        if (typeof identifierOrServiceMetadata === 'function') {
            return this.set({
                id: identifierOrServiceMetadata,
                // TODO: remove explicit casting
                type: identifierOrServiceMetadata,
                value: value,
                factory: undefined,
                global: false,
                multiple: false,
                eager: false,
                transient: false,
            });
        }
        var newService = __assign({ id: new Token('UNREACHABLE'), type: null, factory: undefined, value: EMPTY_VALUE, global: false, multiple: false, eager: false, transient: false }, identifierOrServiceMetadata);
        var service = this.findService(newService.id);
        if (service && service.multiple !== true) {
            Object.assign(service, newService);
        }
        else {
            this.services.push(newService);
        }
        if (newService.eager) {
            this.get(newService.id);
        }
        return this;
    };
    /**
     * Removes services with a given service identifiers.
     */
    ContainerInstance.prototype.remove = function (identifierOrIdentifierArray) {
        var _this = this;
        if (Array.isArray(identifierOrIdentifierArray)) {
            identifierOrIdentifierArray.forEach(function (id) { return _this.remove(id); });
        }
        else {
            this.services = this.services.filter(function (service) {
                if (service.id === identifierOrIdentifierArray) {
                    _this.destroyServiceInstance(service);
                    return false;
                }
                return true;
            });
        }
        return this;
    };
    /**
     * Completely resets the container by removing all previously registered services from it.
     */
    ContainerInstance.prototype.reset = function (options) {
        var _this = this;
        if (options === void 0) { options = { strategy: 'resetValue' }; }
        switch (options.strategy) {
            case 'resetValue':
                this.services.forEach(function (service) { return _this.destroyServiceInstance(service); });
                break;
            case 'resetServices':
                this.services.forEach(function (service) { return _this.destroyServiceInstance(service); });
                this.services = [];
                break;
            default:
                throw new Error('Received invalid reset strategy.');
        }
        return this;
    };
    /**
     * Returns all services registered with the given identifier.
     */
    ContainerInstance.prototype.findAllServices = function (identifier) {
        return this.services.filter(function (service) { return service.id === identifier; });
    };
    /**
     * Finds registered service in the with a given service identifier.
     */
    ContainerInstance.prototype.findService = function (identifier) {
        return this.services.find(function (service) { return service.id === identifier; });
    };
    /**
     * Gets the value belonging to `serviceMetadata.id`.
     *
     * - if `serviceMetadata.value` is already set it is immediately returned
     * - otherwise the requested type is resolved to the value saved to `serviceMetadata.value` and returned
     */
    ContainerInstance.prototype.getServiceValue = function (serviceMetadata) {
        var _a;
        var value = EMPTY_VALUE;
        /**
         * If the service value has been set to anything prior to this call we return that value.
         * NOTE: This part builds on the assumption that transient dependencies has no value set ever.
         */
        if (serviceMetadata.value !== EMPTY_VALUE) {
            return serviceMetadata.value;
        }
        /** If both factory and type is missing, we cannot resolve the requested ID. */
        if (!serviceMetadata.factory && !serviceMetadata.type) {
            throw new CannotInstantiateValueError(serviceMetadata.id);
        }
        /**
         * If a factory is defined it takes priority over creating an instance via `new`.
         * The return value of the factory is not checked, we believe by design that the user knows what he/she is doing.
         */
        if (serviceMetadata.factory) {
            /**
             * If we received the factory in the [Constructable<Factory>, "functionName"] format, we need to create the
             * factory first and then call the specified function on it.
             */
            if (serviceMetadata.factory instanceof Array) {
                var factoryInstance = void 0;
                try {
                    /** Try to get the factory from TypeDI first, if failed, fall back to simply initiating the class. */
                    factoryInstance = this.get(serviceMetadata.factory[0]);
                }
                catch (error) {
                    if (error instanceof ServiceNotFoundError) {
                        factoryInstance = new serviceMetadata.factory[0]();
                    }
                    else {
                        throw error;
                    }
                }
                value = factoryInstance[serviceMetadata.factory[1]](this, serviceMetadata.id);
            }
            else {
                /** If only a simple function was provided we simply call it. */
                value = serviceMetadata.factory(this, serviceMetadata.id);
            }
        }
        /**
         * If no factory was provided and only then, we create the instance from the type if it was set.
         */
        if (!serviceMetadata.factory && serviceMetadata.type) {
            var constructableTargetType = serviceMetadata.type;
            // setup constructor parameters for a newly initialized service
            var paramTypes = ((_a = Reflect) === null || _a === void 0 ? void 0 : _a.getMetadata('design:paramtypes', constructableTargetType)) || [];
            var params = this.initializeParams(constructableTargetType, paramTypes);
            // "extra feature" - always pass container instance as the last argument to the service function
            // this allows us to support javascript where we don't have decorators and emitted metadata about dependencies
            // need to be injected, and user can use provided container to get instances he needs
            params.push(this);
            value = new (constructableTargetType.bind.apply(constructableTargetType, __spreadArrays([void 0], params)))();
            // TODO: Calling this here, leads to infinite loop, because @Inject decorator registerds a handler
            // TODO: which calls Container.get, which will check if the requested type has a value set and if not
            // TODO: it will start the instantiation process over. So this is currently called outside of the if branch
            // TODO: after the current value has been assigned to the serviceMetadata.
            // this.applyPropertyHandlers(constructableTargetType, value as Constructable<unknown>);
        }
        /** If this is not a transient service, and we resolved something, then we set it as the value. */
        if (!serviceMetadata.transient && value !== EMPTY_VALUE) {
            serviceMetadata.value = value;
        }
        if (value === EMPTY_VALUE) {
            /** This branch should never execute, but better to be safe than sorry. */
            throw new CannotInstantiateValueError(serviceMetadata.id);
        }
        if (serviceMetadata.type) {
            this.applyPropertyHandlers(serviceMetadata.type, value);
        }
        return value;
    };
    /**
     * Initializes all parameter types for a given target service class.
     */
    ContainerInstance.prototype.initializeParams = function (target, paramTypes) {
        var _this = this;
        return paramTypes.map(function (paramType, index) {
            var paramHandler = Container.handlers.find(function (handler) {
                /**
                 * @Inject()-ed values are stored as parameter handlers and they reference their target
                 * when created. So when a class is extended the @Inject()-ed values are not inherited
                 * because the handler still points to the old object only.
                 *
                 * As a quick fix a single level parent lookup is added via `Object.getPrototypeOf(target)`,
                 * however this should be updated to a more robust solution.
                 *
                 * TODO: Add proper inheritance handling: either copy the handlers when a class is registered what
                 * TODO: has it's parent already registered as dependency or make the lookup search up to the base Object.
                 */
                return ((handler.object === target || handler.object === Object.getPrototypeOf(target)) && handler.index === index);
            });
            if (paramHandler)
                return paramHandler.value(_this);
            if (paramType && paramType.name && !_this.isPrimitiveParamType(paramType.name)) {
                return _this.get(paramType);
            }
            return undefined;
        });
    };
    /**
     * Checks if given parameter type is primitive type or not.
     */
    ContainerInstance.prototype.isPrimitiveParamType = function (paramTypeName) {
        return ['string', 'boolean', 'number', 'object'].includes(paramTypeName.toLowerCase());
    };
    /**
     * Applies all registered handlers on a given target class.
     */
    ContainerInstance.prototype.applyPropertyHandlers = function (target, instance) {
        var _this = this;
        Container.handlers.forEach(function (handler) {
            if (typeof handler.index === 'number')
                return;
            if (handler.object.constructor !== target && !(target.prototype instanceof handler.object.constructor))
                return;
            if (handler.propertyName) {
                instance[handler.propertyName] = handler.value(_this);
            }
        });
    };
    /**
     * Checks if the given service metadata contains a destroyable service instance and destroys it in place. If the service
     * contains a callable function named `destroy` it is called but not awaited and the return value is ignored..
     *
     * @param serviceMetadata the service metadata containing the instance to destroy
     * @param force when true the service will be always destroyed even if it's cannot be re-created
     */
    ContainerInstance.prototype.destroyServiceInstance = function (serviceMetadata, force) {
        if (force === void 0) { force = false; }
        /** We reset value only if we can re-create it (aka type or factory exists). */
        var shouldResetValue = force || !!serviceMetadata.type || !!serviceMetadata.factory;
        if (shouldResetValue) {
            /** If we wound a function named destroy we call it without any params. */
            if (typeof (serviceMetadata === null || serviceMetadata === void 0 ? void 0 : serviceMetadata.value)['destroy'] === 'function') {
                try {
                    serviceMetadata.value.destroy();
                }
                catch (error) {
                    /** We simply ignore the errors from the destroy function. */
                }
            }
            serviceMetadata.value = EMPTY_VALUE;
        }
    };
    return ContainerInstance;
}());
export { ContainerInstance };
//# sourceMappingURL=container-instance.class.js.map