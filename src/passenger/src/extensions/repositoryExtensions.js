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
exports.registerRepositories = void 0;
const tsyringe_1 = require("tsyringe");
const passengerRepository_1 = require("../data/repositories/passengerRepository");
const registerRepositories = () => __awaiter(void 0, void 0, void 0, function* () {
    tsyringe_1.container.register('IPassengerRepository', passengerRepository_1.PassengerRepository);
});
exports.registerRepositories = registerRepositories;
//# sourceMappingURL=repositoryExtensions.js.map