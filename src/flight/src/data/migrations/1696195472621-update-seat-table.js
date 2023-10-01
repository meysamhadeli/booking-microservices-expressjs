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
exports.UpdateSeatTable1696195472621 = void 0;
class UpdateSeatTable1696195472621 {
    constructor() {
        this.name = 'UpdateSeatTable1696195472621';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "seat" RENAME COLUMN "price" TO "isReserved"`);
            yield queryRunner.query(`ALTER TABLE "seat" DROP COLUMN "isReserved"`);
            yield queryRunner.query(`ALTER TABLE "seat" ADD "isReserved" boolean NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "seat" DROP COLUMN "isReserved"`);
            yield queryRunner.query(`ALTER TABLE "seat" ADD "isReserved" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "seat" RENAME COLUMN "isReserved" TO "price"`);
        });
    }
}
exports.UpdateSeatTable1696195472621 = UpdateSeatTable1696195472621;
//# sourceMappingURL=1696195472621-update-seat-table.js.map