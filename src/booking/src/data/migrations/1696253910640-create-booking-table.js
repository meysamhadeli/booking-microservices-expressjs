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
exports.CreateBookingTable1696253910640 = void 0;
class CreateBookingTable1696253910640 {
    constructor() {
        this.name = 'CreateBookingTable1696253910640';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "flightNumber" character varying NOT NULL, "aircraftId" integer NOT NULL, "departureAirportId" integer NOT NULL, "arriveAirportId" integer NOT NULL, "flightDate" TIMESTAMP NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "seatNumber" character varying NOT NULL, "passengerName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "booking"`);
        });
    }
}
exports.CreateBookingTable1696253910640 = CreateBookingTable1696253910640;
//# sourceMappingURL=1696253910640-create-booking-table.js.map