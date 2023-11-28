"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRepositories = void 0;
const tsyringe_1 = require("tsyringe");
const passengerRepository_1 = require("../data/repositories/passengerRepository");
const registerRepositories = async () => {
    tsyringe_1.container.register('IPassengerRepository', passengerRepository_1.PassengerRepository);
};
exports.registerRepositories = registerRepositories;
//# sourceMappingURL=repositoryExtensions.js.map