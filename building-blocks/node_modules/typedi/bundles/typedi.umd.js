(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ClassTransformer = {}));
}(this, (function (exports) { 'use strict';

    /**
     * Used to create unique typed service identifier.
     * Useful when service has only interface, but don't have a class.
     */
    var Token = /** @class */ (function () {
        /**
         * @param name Token name, optional and only used for debugging purposes.
         */
        function Token(name) {
            this.name = name;
        }
        return Token;
    }());

    var __extends = (undefined && undefined.__extends) || (function () {
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

    var __extends$1 = (undefined && undefined.__extends) || (function () {
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
    var CannotInstantiateValueError = /** @class */ (function (_super) {
        __extends$1(CannotInstantiateValueError, _super);
        function CannotInstantiateValueError(identifier) {
            var _a, _b;
            var _this = _super.call(this) || this;
            _this.name = 'CannotInstantiateValueError';
            /** Normalized identifier name used in the error message. */
            _this.normalizedIdentifier = '<UNKNOWN_IDENTIFIER>';
            // TODO: Extract this to a helper function and share between this and NotFoundError.
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
        Object.defineProperty(CannotInstantiateValueError.prototype, "message", {
            get: function () {
                return ("Cannot instantiate the requested value for the \"" + this.normalizedIdentifier + "\" identifier. " +
                    "The related metadata doesn't contain a factory or a type to instantiate.");
            },
            enumerable: false,
            configurable: true
        });
        return CannotInstantiateValueError;
    }(Error));

    var EMPTY_VALUE = Symbol('EMPTY_VALUE');

    var __assign = (undefined && undefined.__assign) || function () {
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
    var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };
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

    var __extends$2 = (undefined && undefined.__extends) || (function () {
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
        __extends$2(CannotInjectValueError, _super);
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

    /**
     * Helper function used in inject decorators to resolve the received identifier to
     * an eager type when possible or to a lazy type when cyclic dependencies are possibly involved.
     *
     * @param typeOrIdentifier a service identifier or a function returning a type acting as service identifier or nothing
     * @param target the class definition of the target of the decorator
     * @param propertyName the name of the property in case of a PropertyDecorator
     * @param index the index of the parameter in the constructor in case of ParameterDecorator
     */
    function resolveToTypeWrapper(typeOrIdentifier, target, propertyName, index) {
        /**
         * ? We want to error out as soon as possible when looking up services to inject, however
         * ? we cannot determine the type at decorator execution when cyclic dependencies are involved
         * ? because calling the received `() => MyType` function right away would cause a JS error:
         * ? "Cannot access 'MyType' before initialization", so we need to execute the function in the handler,
         * ? when the classes are already created. To overcome this, we use a wrapper:
         * ?  - the lazyType is executed in the handler so we never have a JS error
         * ?  - the eagerType is checked when decorator is running and an error is raised if an unknown type is encountered
         */
        var typeWrapper;
        /** If requested type is explicitly set via a string ID or token, we set it explicitly. */
        if ((typeOrIdentifier && typeof typeOrIdentifier === 'string') || typeOrIdentifier instanceof Token) {
            typeWrapper = { eagerType: typeOrIdentifier, lazyType: function () { return typeOrIdentifier; } };
        }
        /** If requested type is explicitly set via a () => MyClassType format, we set it explicitly. */
        if (typeOrIdentifier && typeof typeOrIdentifier === 'function') {
            /** We set eagerType to null, preventing the raising of the CannotInjectValueError in decorators.  */
            typeWrapper = { eagerType: null, lazyType: function () { return typeOrIdentifier(); } };
        }
        /** If no explicit type is set and handler registered for a class property, we need to get the property type. */
        if (!typeOrIdentifier && propertyName) {
            var identifier_1 = Reflect.getMetadata('design:type', target, propertyName);
            typeWrapper = { eagerType: identifier_1, lazyType: function () { return identifier_1; } };
        }
        /** If no explicit type is set and handler registered for a constructor parameter, we need to get the parameter types. */
        if (!typeOrIdentifier && typeof index == 'number' && Number.isInteger(index)) {
            var paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyName);
            /** It's not guaranteed, that we find any types for the constructor. */
            var identifier_2 = paramTypes === null || paramTypes === void 0 ? void 0 : paramTypes[index];
            typeWrapper = { eagerType: identifier_2, lazyType: function () { return identifier_2; } };
        }
        return typeWrapper;
    }

    function InjectMany(typeOrIdentifier) {
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
                    return containerInstance.getMany(evaluatedLazyType);
                },
            });
        };
    }

    function Inject(typeOrIdentifier) {
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

    function Service(optionsOrServiceIdentifier) {
        return function (targetConstructor) {
            var serviceMetadata = {
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

    /**
     * We have a hard dependency on reflect-metadata package.
     * Without the dependency lookup wont work. So we should warn the users
     * when it's not loaded.
     */

    exports.CannotInjectValueError = CannotInjectValueError;
    exports.CannotInstantiateValueError = CannotInstantiateValueError;
    exports.Container = Container;
    exports.ContainerInstance = ContainerInstance;
    exports.Inject = Inject;
    exports.InjectMany = InjectMany;
    exports.Service = Service;
    exports.ServiceNotFoundError = ServiceNotFoundError;
    exports.Token = Token;
    exports.default = Container;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=typedi.umd.js.map
