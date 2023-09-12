"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (obj, keys) => {
    return keys.reduce((finalObj, key) => {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
        return finalObj;
    }, {});
};
exports.default = pick;
//# sourceMappingURL=pick.js.map