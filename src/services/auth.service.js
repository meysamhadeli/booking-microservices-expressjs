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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("./user.service"));
const encryption_1 = require("../utils/encryption");
const notFoundError_1 = __importDefault(require("../types/notFoundError"));
const unauthorizedError_1 = __importDefault(require("../types/unauthorizedError"));
const dataSource_1 = require("../data/dataSource");
const token_1 = require("../users/entities/token");
const tokenType_1 = require("../users/enums/tokenType");
const moment_1 = __importDefault(require("moment/moment"));
const config_1 = __importDefault(require("../config/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const notFoundError_2 = __importDefault(require("../types/notFoundError"));
const auth_validation_1 = __importDefault(require("../validations/auth.validation"));
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Omit<User, 'password'>>}
 */
const login = (loginDto) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_validation_1.default.login.validateAsync(loginDto);
    const user = yield user_service_1.default.getUserByEmail(loginDto.email);
    if (!user || !(yield (0, encryption_1.isPasswordMatch)(loginDto.password, user.password))) {
        throw new unauthorizedError_1.default('Incorrect email or password');
    }
    const token = yield generateTokens(user.id);
    return token;
});
/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const logout = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_validation_1.default.logout.params.validateAsync(refreshToken);
    const tokenRepository = yield dataSource_1.dataSource.getRepository(token_1.Token);
    const token = yield tokenRepository.findOneBy({
        token: refreshToken,
        type: tokenType_1.TokenType.REFRESH
    });
    if (!token) {
        throw new notFoundError_1.default('Refresh Token Not found');
    }
    yield tokenRepository.remove(token);
});
/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<AuthTokensResponse>}
 */
const refreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    yield auth_validation_1.default.refreshToken.params.validateAsync(refreshToken);
    try {
        const refreshTokenData = yield verifyToken(refreshToken, tokenType_1.TokenType.REFRESH);
        const { userId } = refreshTokenData;
        const tokenRepository = dataSource_1.dataSource.getRepository(token_1.Token);
        yield tokenRepository.remove(refreshTokenData);
        return generateTokens(userId);
    }
    catch (error) {
        throw new unauthorizedError_1.default('Please authenticate');
    }
});
/**
 * Generate auth tokens
 * @param {number} userId
 * @returns {Promise<AuthTokensResponse>}
 */
const generateTokens = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const accessTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateJwtToken(userId, accessTokenExpires.unix(), tokenType_1.TokenType.ACCESS);
    const refreshTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateJwtToken(userId, refreshTokenExpires.unix(), tokenType_1.TokenType.REFRESH);
    const tokenRepository = dataSource_1.dataSource.getRepository(token_1.Token);
    const token = {
        createdAt: new Date(),
        type: tokenType_1.TokenType.REFRESH,
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
        userId: userId,
        blacklisted: false
    };
    yield tokenRepository.save(token);
    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate()
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate()
        }
    };
});
/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = (token, type) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
    const userId = Number(payload.sub);
    const tokenRepository = dataSource_1.dataSource.getRepository(token_1.Token);
    const tokenData = yield tokenRepository.findOneBy({
        token: token,
        type: type,
        userId: userId,
        blacklisted: false
    });
    if (!tokenData) {
        throw new notFoundError_2.default("Token not found");
    }
    return tokenData;
});
/**
 * Generate token
 * @param {number} userId
 * @param {number} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateJwtToken = (userId, expires, type, secret = config_1.default.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: (0, moment_1.default)().unix(),
        exp: expires,
        type
    };
    return jsonwebtoken_1.default.sign(payload, secret);
};
exports.default = {
    login,
    logout,
    refreshToken
};
//# sourceMappingURL=auth.service.js.map