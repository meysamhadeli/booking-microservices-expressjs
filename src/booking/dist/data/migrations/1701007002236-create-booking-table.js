"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBookingTable1701007002236 = void 0;
class CreateBookingTable1701007002236 {
    constructor() {
        this.name = 'CreateBookingTable1701007002236';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "booking" ("id" SERIAL NOT NULL, "flightNumber" character varying NOT NULL, "aircraftId" integer NOT NULL, "departureAirportId" integer NOT NULL, "arriveAirportId" integer NOT NULL, "flightDate" TIMESTAMP NOT NULL, "price" integer NOT NULL, "description" character varying NOT NULL, "seatNumber" character varying NOT NULL, "passengerName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "booking"`);
    }
}
exports.CreateBookingTable1701007002236 = CreateBookingTable1701007002236;
//# sourceMappingURL=1701007002236-create-booking-table.js.map