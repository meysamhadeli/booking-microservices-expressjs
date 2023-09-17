import { Token } from './token.class';
import { Constructable } from './types/constructable.type';
import { AbstractConstructable } from './types/abstract-constructable.type';
import { ServiceIdentifier } from './types/service-identifier.type';
import { ServiceMetadata } from './interfaces/service-metadata.interface';
import { ServiceOptions } from './interfaces/service-options.interface';
/**
 * TypeDI can have multiple containers.
 * One container is ContainerInstance.
 */
export declare class ContainerInstance {
    /** Container instance id. */
    readonly id: string;
    /** All registered services in the container. */
    private services;
    constructor(id: string);
    /**
     * Checks if the service with given name or type is registered service container.
     * Optionally, parameters can be passed in case if instance is initialized in the container for the first time.
     */
    has<T>(type: Constructable<T>): boolean;
    has<T>(id: string): boolean;
    has<T>(id: Token<T>): boolean;
    /**
     * Retrieves the service with given name or type from the service container.
     * Optionally, parameters can be passed in case if instance is initialized in the container for the first time.
     */
    get<T>(type: Constructable<T>): T;
    get<T>(type: AbstractConstructable<T>): T;
    get<T>(id: string): T;
    get<T>(id: Token<T>): T;
    get<T>(id: ServiceIdentifier<T>): T;
    /**
     * Gets all instances registered in the container of the given service identifier.
     * Used when service defined with multiple: true flag.
     */
    getMany<T>(type: Constructable<T>): T[];
    getMany<T>(type: AbstractConstructable<T>): T[];
    getMany<T>(id: string): T[];
    getMany<T>(id: Token<T>): T[];
    getMany<T>(id: ServiceIdentifier<T>): T[];
    /**
     * Sets a value for the given type or service name in the container.
     */
    set<T = unknown>(service: ServiceMetadata<T>): this;
    set<T = unknown>(type: Constructable<T>, instance: T): this;
    set<T = unknown>(type: AbstractConstructable<T>, instance: T): this;
    set<T = unknown>(name: string, instance: T): this;
    set<T = unknown>(token: Token<T>, instance: T): this;
    set<T = unknown>(token: ServiceIdentifier, instance: T): this;
    set<T = unknown>(metadata: ServiceOptions<T>): this;
    set<T = unknown>(metadataArray: ServiceOptions<T>[]): this;
    /**
     * Removes services with a given service identifiers.
     */
    remove(identifierOrIdentifierArray: ServiceIdentifier | ServiceIdentifier[]): this;
    /**
     * Completely resets the container by removing all previously registered services from it.
     */
    reset(options?: {
        strategy: 'resetValue' | 'resetServices';
    }): this;
    /**
     * Returns all services registered with the given identifier.
     */
    private findAllServices;
    /**
     * Finds registered service in the with a given service identifier.
     */
    private findService;
    /**
     * Gets the value belonging to `serviceMetadata.id`.
     *
     * - if `serviceMetadata.value` is already set it is immediately returned
     * - otherwise the requested type is resolved to the value saved to `serviceMetadata.value` and returned
     */
    private getServiceValue;
    /**
     * Initializes all parameter types for a given target service class.
     */
    private initializeParams;
    /**
     * Checks if given parameter type is primitive type or not.
     */
    private isPrimitiveParamType;
    /**
     * Applies all registered handlers on a given target class.
     */
    private applyPropertyHandlers;
    /**
     * Checks if the given service metadata contains a destroyable service instance and destroys it in place. If the service
     * contains a callable function named `destroy` it is called but not awaited and the return value is ignored..
     *
     * @param serviceMetadata the service metadata containing the instance to destroy
     * @param force when true the service will be always destroyed even if it's cannot be re-created
     */
    private destroyServiceInstance;
}
