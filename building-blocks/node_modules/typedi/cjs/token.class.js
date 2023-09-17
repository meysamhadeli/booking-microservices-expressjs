"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
/**
 * Used to create unique typed service identifier.
 * Useful when service has only interface, but don't have a class.
 */
class Token {
    /**
     * @param name Token name, optional and only used for debugging purposes.
     */
    constructor(name) {
        this.name = name;
    }
}
exports.Token = Token;
//# sourceMappingURL=token.class.js.map