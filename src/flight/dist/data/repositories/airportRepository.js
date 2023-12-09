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
exports.AirportRepository = void 0;
const tsyringe_1 = require("tsyringe");
const dbContext_1 = require("building-blocks/typeorm/db-context");
const airport_1 = require("../../airport/entities/airport");
class AirportRepository {
    constructor() {
        this.ormRepository = tsyringe_1.container.resolve(dbContext_1.DbContext).connection.getRepository(airport_1.Airport);
    }
    createAirport(airport) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.save(airport);
        });
    }
    findAirportByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.findOneBy({
                name: name
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.find();
        });
    }
}
exports.AirportRepository = AirportRepository;
//# sourceMappingURL=airportRepository.js.map
