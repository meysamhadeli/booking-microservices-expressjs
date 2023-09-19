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
const dataSource_1 = require("../dataSource");
const token_1 = require("../../auth/entities/token");
class AuthRepository {
    createToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenRepository = dataSource_1.dataSource.getRepository(token_1.Token);
            yield tokenRepository.save(token);
        });
    }
    findToken(token, tokenType) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenRepository = dataSource_1.dataSource.getRepository(token_1.Token);
            return yield tokenRepository.findOneBy({
                token: token,
                type: tokenType
            });
        });
    }
    findTokenByUserId(token, tokenType, userId, blacklisted) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenRepository = dataSource_1.dataSource.getRepository(token_1.Token);
            return yield tokenRepository.findOneBy({
                token: token,
                type: tokenType,
                userId: userId,
                blacklisted: blacklisted
            });
        });
    }
    removeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const tokenRepository = dataSource_1.dataSource.getRepository(token_1.Token);
            return yield tokenRepository.remove(token);
        });
    }
}
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=authRepository.js.map