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
exports.CreatePassengerTable1695138686471 = void 0;
class CreatePassengerTable1695138686471 {
    constructor() {
        this.name = 'CreatePassengerTable1695138686471';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."passenger_passengertype_enum" AS ENUM('0', '1', '2', '3')`);
            yield queryRunner.query(`CREATE TABLE "passenger" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "passportNumber" character varying NOT NULL, "age" integer NOT NULL, "passengerType" "public"."passenger_passengertype_enum" NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, CONSTRAINT "PK_50e940dd2c126adc20205e83fac" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "passenger"`);
            yield queryRunner.query(`DROP TYPE "public"."passenger_passengertype_enum"`);
        });
    }
}
exports.CreatePassengerTable1695138686471 = CreatePassengerTable1695138686471;
//# sourceMappingURL=1695138686471-create-passenger-table.js.map