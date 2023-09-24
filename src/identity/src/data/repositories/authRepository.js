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
exports.AuthRepository = void 0;
const token_1 = require("../../auth/entities/token");
const tsyringe_1 = require("tsyringe");
const dbContext_1 = require("building-blocks/typeorm/dbContext");
class AuthRepository {
    constructor() {
        this.ormRepository = tsyringe_1.container.resolve(dbContext_1.DbContext).connection.getRepository(token_1.Token);
    }
    createToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ormRepository.save(token);
        });
    }
    findToken(token, tokenType) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.findOneBy({
                token: token,
                type: tokenType
            });
        });
    }
    findTokenByUserId(token, tokenType, userId, blacklisted) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.findOneBy({
                token: token,
                type: tokenType,
                userId: userId,
                blacklisted: blacklisted
            });
        });
    }
    removeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.ormRepository.remove(token);
        });
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=authRepository.js.map