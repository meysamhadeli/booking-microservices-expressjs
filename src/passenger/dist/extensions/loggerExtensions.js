"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialLogger = void 0;
const logger_1 = require("building-blocks/logging/logger");
const tsyringe_1 = require("tsyringe");
const initialLogger = async () => {
    const logger = tsyringe_1.container.resolve(logger_1.Logger);
    tsyringe_1.container.registerSingleton('ILogger', logger_1.Logger);
    return logger;
};
exports.initialLogger = initialLogger;
//# sourceMappingURL=loggerExtensions.js.map