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
exports.CreateSeatTable1696190894872 = void 0;
class CreateSeatTable1696190894872 {
    constructor() {
        this.name = 'CreateSeatTable1696190894872';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."seat_seatclass_enum" AS ENUM('0', '1', '2', '3')`);
            yield queryRunner.query(`CREATE TYPE "public"."seat_seattype_enum" AS ENUM('0', '1', '2', '3')`);
            yield queryRunner.query(`CREATE TABLE "seat" ("id" SERIAL NOT NULL, "seatNumber" character varying NOT NULL, "price" integer NOT NULL, "seatClass" "public"."seat_seatclass_enum" NOT NULL DEFAULT '0', "seatType" "public"."seat_seattype_enum" NOT NULL DEFAULT '0', "flightId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP, CONSTRAINT "PK_4e72ae40c3fbd7711ccb380ac17" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "seat" ADD CONSTRAINT "FK_5298809d13db3c04e6bf460e207" FOREIGN KEY ("flightId") REFERENCES "flight"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "seat" DROP CONSTRAINT "FK_5298809d13db3c04e6bf460e207"`);
            yield queryRunner.query(`DROP TABLE "seat"`);
            yield queryRunner.query(`DROP TYPE "public"."seat_seattype_enum"`);
            yield queryRunner.query(`DROP TYPE "public"."seat_seatclass_enum"`);
        });
    }
}
exports.CreateSeatTable1696190894872 = CreateSeatTable1696190894872;
//# sourceMappingURL=1696190894872-create-seat-table.js.map