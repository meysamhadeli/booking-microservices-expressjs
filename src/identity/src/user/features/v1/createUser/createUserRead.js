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
exports.createUserConsumerHandler = void 0;
const logger_1 = require("building-blocks/logging/logger");
const serialization_1 = require("building-blocks/utils/serialization");
const tsyringe_1 = require("tsyringe");
const createUserConsumerHandler = (queue, message) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = tsyringe_1.container.resolve(logger_1.Logger);
    if (message == null || message == undefined)
        return;
    //todo: add some functionality for save write model to read database like mongo
    logger.info(`We received message: ${(0, serialization_1.serializeObject)(message)} in user consumers`);
});
exports.createUserConsumerHandler = createUserConsumerHandler;
//# sourceMappingURL=createUserRead.js.map