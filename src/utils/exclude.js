"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Exclude keys from object
 * @param obj
 * @param keys
 * @returns
 */
const exclude = (obj, keys) => {
    for (const key of keys) {
        delete obj[key];
    }
    return obj;
};
exports.default = exclude;
//# sourceMappingURL=exclude.js.map