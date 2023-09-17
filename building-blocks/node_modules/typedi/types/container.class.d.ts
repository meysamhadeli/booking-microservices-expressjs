import { ContainerInstance } from './container-instance.class';
import { Token } from './token.class';
import { Handler } from './interfaces/handler.interface';
import { Constructable } from './types/constructable.type';
import { ServiceIdentifier } from './types/service-identifier.type';
import { ServiceOptions } from './interfaces/service-options.interface';
import { AbstractConstructable } from './types/abstract-constructable.type';
/**
 * Service container.
 */
export declare class Container {
    /**
     * All registered handlers. The @Inject() decorator uses handlers internally to mark a property for injection.
     **/
    static readonly handlers: Handler[];
    /**  Global container instance. */
    private static readonly globalInstance;
    /** Other containers created using Container.of method. */
    private static readonly instances;
    /**
     * Gets a separate container instance for the given instance id.
     */
    static of(containerId?: string): ContainerInstance;
    /**
     * Checks if the service with given name or type is registered service container.
     * Optionally, parameters can be passed in case if instance is initialized in the container for the first time.
     */
    static has<T>(type: Constructable<T>): boolean;
    static has<T>(id: string): boolean;
    static has<T>(id: Token<T>): boolean;
    /**
     * Retrieves the service with given name or type from the service container.
     * Optionally, parameters can be passed in case if instance is initialized in the container for the first time.
     */
    static get<T>(type: Constructable<T>): T;
    static get<T>(type: AbstractConstructable<T>): T;
    static get<T>(id: string): T;
    static get<T>(id: Token<T>): T;
    /**
     * Gets all instances registered in the container of the given service identifier.
     * Used when service defined with multiple: true flag.
     */
    static getMany<T>(id: string): T[];
    static getMany<T>(id: Token<T>): T[];
    /**
     * Sets a value for the given type or service name in the container.
     */
    static set<T = unknown>(type: Function, value: any): Container;
    static set<T = unknown>(type: Constructable<T>, value: any): Container;
    static set<T = unknown>(type: AbstractConstructable<T>, value: any): Container;
    static set<T = unknown>(name: string, value: any): Container;
    static set<T = unknown>(token: Token<T>, value: any): Container;
    static set<T = unknown>(value: ServiceOptions<T>): Container;
    static set<T = unknown>(values: ServiceOptions<T>[]): Container;
    /**
     * Removes services with a given service identifiers.
     */
    static remove(identifierOrIdentifierArray: ServiceIdentifier | ServiceIdentifier[]): Container;
    /**
     * Completely resets the container by removing all previously registered services and handlers from it.
     */
    static reset(containerId?: string): Container;
    /**
     * Registers a new handler.
     */
    static registerHandler(handler: Handler): Container;
    /**
     * Helper method that imports given services.
     */
    static import(services: Function[]): Container;
}
