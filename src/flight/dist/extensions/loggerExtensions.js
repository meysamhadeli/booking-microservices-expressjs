"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialLogger = void 0;
const logger_1 = require("building-blocks/logging/logger");
const tsyringe_1 = require("tsyringe");
const initialLogger = () => __awaiter(void 0, void 0, void 0, function* () {
    const logger = tsyringe_1.container.resolve(logger_1.Logger);
    tsyringe_1.container.registerSingleton('ILogger', logger_1.Logger);
    return logger;
});
exports.initialLogger = initialLogger;
//# sourceMappingURL=loggerExtensions.js.map