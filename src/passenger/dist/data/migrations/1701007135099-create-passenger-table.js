"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePassengerTable1701007135099 = void 0;
class CreatePassengerTable1701007135099 {
    constructor() {
        this.name = 'CreatePassengerTable1701007135099';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."passenger_passengertype_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "passenger" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "passportNumber" character varying NOT NULL, "age" integer NOT NULL, "passengerType" "public"."passenger_passengertype_enum" NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, CONSTRAINT "PK_50e940dd2c126adc20205e83fac" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "passenger"`);
        await queryRunner.query(`DROP TYPE "public"."passenger_passengertype_enum"`);
    }
}
exports.CreatePassengerTable1701007135099 = CreatePassengerTable1701007135099;
//# sourceMappingURL=1701007135099-create-passenger-table.js.map