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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserConsumerHandler = void 0;
const logger_1 = __importDefault(require("building-blocks/logging/logger"));
const serialization_1 = require("building-blocks/utils/serialization");
const createUserConsumerHandler = (queue, message) => __awaiter(void 0, void 0, void 0, function* () {
    if (message == null || message == undefined)
        return;
    //todo: add some functionality for save write model to read database like mongo
    logger_1.default.info(`We received message: ${(0, serialization_1.serializeObject)(message)} in user consumers`);
});
exports.createUserConsumerHandler = createUserConsumerHandler;
//# sourceMappingURL=createUser.js.map