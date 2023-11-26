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
exports.CreateFlightTable1701006616850 = void 0;
class CreateFlightTable1701006616850 {
    constructor() {
        this.name = 'CreateFlightTable1701006616850';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "airport" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "code" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, CONSTRAINT "PK_ea1ecba8dec9bee0cb60194e788" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TYPE "public"."seat_seatclass_enum" AS ENUM('0', '1', '2', '3')`);
            yield queryRunner.query(`CREATE TYPE "public"."seat_seattype_enum" AS ENUM('0', '1', '2', '3')`);
            yield queryRunner.query(`CREATE TABLE "seat" ("id" SERIAL NOT NULL, "seatNumber" character varying NOT NULL, "seatClass" "public"."seat_seatclass_enum" NOT NULL DEFAULT '0', "seatType" "public"."seat_seattype_enum" NOT NULL DEFAULT '0', "flightId" integer NOT NULL, "isReserved" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, CONSTRAINT "PK_4e72ae40c3fbd7711ccb380ac17" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TYPE "public"."flight_flightstatus_enum" AS ENUM('0', '1', '2', '3', '4')`);
            yield queryRunner.query(`CREATE TABLE "flight" ("id" SERIAL NOT NULL, "flightNumber" character varying NOT NULL, "price" integer NOT NULL, "flightStatus" "public"."flight_flightstatus_enum" NOT NULL DEFAULT '0', "flightDate" TIMESTAMP NOT NULL, "departureDate" TIMESTAMP NOT NULL, "departureAirportId" integer NOT NULL, "aircraftId" integer NOT NULL, "arriveDate" TIMESTAMP NOT NULL, "arriveAirportId" integer NOT NULL, "durationMinutes" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, CONSTRAINT "PK_bf571ce6731cf071fc51b94df03" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "aircraft" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "model" character varying NOT NULL, "manufacturingYear" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, CONSTRAINT "PK_46f8c680e9ff88a752b7834bba4" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "seat" ADD CONSTRAINT "FK_5298809d13db3c04e6bf460e207" FOREIGN KEY ("flightId") REFERENCES "flight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "FK_df523f694abea3ed793a8aef725" FOREIGN KEY ("aircraftId") REFERENCES "aircraft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "FK_3a0c5e1517f31f39132ab8ed209" FOREIGN KEY ("departureAirportId") REFERENCES "airport"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "flight" ADD CONSTRAINT "FK_e4908c3ca75113e71befdfe36a1" FOREIGN KEY ("arriveAirportId") REFERENCES "airport"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_e4908c3ca75113e71befdfe36a1"`);
            yield queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_3a0c5e1517f31f39132ab8ed209"`);
            yield queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_df523f694abea3ed793a8aef725"`);
            yield queryRunner.query(`ALTER TABLE "seat" DROP CONSTRAINT "FK_5298809d13db3c04e6bf460e207"`);
            yield queryRunner.query(`DROP TABLE "aircraft"`);
            yield queryRunner.query(`DROP TABLE "flight"`);
            yield queryRunner.query(`DROP TYPE "public"."flight_flightstatus_enum"`);
            yield queryRunner.query(`DROP TABLE "seat"`);
            yield queryRunner.query(`DROP TYPE "public"."seat_seattype_enum"`);
            yield queryRunner.query(`DROP TYPE "public"."seat_seatclass_enum"`);
            yield queryRunner.query(`DROP TABLE "airport"`);
        });
    }
}
exports.CreateFlightTable1701006616850 = CreateFlightTable1701006616850;
//# sourceMappingURL=1701006616850-create-flight-table.js.map