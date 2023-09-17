"use strict";
/**
 * We have a hard dependency on reflect-metadata package.
 * Without the dependency lookup wont work. So we should warn the users
 * when it's not loaded.
 */
// if(!Reflect || !(Reflect as any).getMetadata) {
//   throw new Error('Reflect.getMetadata is not a function. Please import the "reflect-metadata" package at the first line of your application.');
// }
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = exports.Container = exports.ContainerInstance = void 0;
const container_class_1 = require("./container.class");
__exportStar(require("./decorators/inject-many.decorator"), exports);
__exportStar(require("./decorators/inject.decorator"), exports);
__exportStar(require("./decorators/service.decorator"), exports);
__exportStar(require("./error/cannot-inject-value.error"), exports);
__exportStar(require("./error/cannot-instantiate-value.error"), exports);
__exportStar(require("./error/service-not-found.error"), exports);
var container_instance_class_1 = require("./container-instance.class");
Object.defineProperty(exports, "ContainerInstance", { enumerable: true, get: function () { return container_instance_class_1.ContainerInstance; } });
var container_class_2 = require("./container.class");
Object.defineProperty(exports, "Container", { enumerable: true, get: function () { return container_class_2.Container; } });
var token_class_1 = require("./token.class");
Object.defineProperty(exports, "Token", { enumerable: true, get: function () { return token_class_1.Token; } });
exports.default = container_class_1.Container;
//# sourceMappingURL=index.js.map