"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const custom_validation_1 = require("./custom.validation");
const login = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().custom(custom_validation_1.password)
});
const logout = {
    params: joi_1.default.object().keys({
        refreshToken: joi_1.default.string().required()
    })
};
const refreshToken = {
    params: joi_1.default.object().keys({
        refreshToken: joi_1.default.string().required()
    })
};
exports.default = {
    login,
    logout,
    refreshToken
};
//# sourceMappingURL=auth.validation.js.map