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
exports.SetDefaultValueForSeat1696196212329 = void 0;
class SetDefaultValueForSeat1696196212329 {
    constructor() {
        this.name = 'SetDefaultValueForSeat1696196212329';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "seat" ALTER COLUMN "isReserved" SET DEFAULT false`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "seat" ALTER COLUMN "isReserved" DROP DEFAULT`);
        });
    }
}
exports.SetDefaultValueForSeat1696196212329 = SetDefaultValueForSeat1696196212329;
//# sourceMappingURL=1696196212329-set-default-value-for-seat.js.map