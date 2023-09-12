"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const custom_validation_1 = require("./custom.validation");
const register = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required().custom(custom_validation_1.password)
    })
};
const login = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    })
};
const logout = {
    body: joi_1.default.object().keys({
        refreshToken: joi_1.default.string().required()
    })
};
const refreshTokens = {
    body: joi_1.default.object().keys({
        refreshToken: joi_1.default.string().required()
    })
};
const forgotPassword = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().email().required()
    })
};
const resetPassword = {
    query: joi_1.default.object().keys({
        token: joi_1.default.string().required()
    }),
    body: joi_1.default.object().keys({
        password: joi_1.default.string().required().custom(custom_validation_1.password)
    })
};
const verifyEmail = {
    query: joi_1.default.object().keys({
        token: joi_1.default.string().required()
    })
};
exports.default = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    verifyEmail
};
//# sourceMappingURL=auth.validation.js.map