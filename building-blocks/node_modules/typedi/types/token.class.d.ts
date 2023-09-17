/**
 * Used to create unique typed service identifier.
 * Useful when service has only interface, but don't have a class.
 */
export declare class Token<T> {
    name?: string;
    /**
     * @param name Token name, optional and only used for debugging purposes.
     */
    constructor(name?: string);
}
