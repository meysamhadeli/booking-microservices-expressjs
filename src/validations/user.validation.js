"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const custom_validation_1 = require("./custom.validation");
const role_1 = require("../enums/role");
const createUser = {
    body: joi_1.default.object().keys({
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required().custom(custom_validation_1.password),
        name: joi_1.default.string().required(),
        role: joi_1.default.string().required().valid(role_1.Role.USER, role_1.Role.ADMIN)
    })
};
const getUsers = {
    query: joi_1.default.object().keys({
        name: joi_1.default.string(),
        role: joi_1.default.string(),
        sortBy: joi_1.default.string(),
        limit: joi_1.default.number().integer(),
        page: joi_1.default.number().integer()
    })
};
const getUser = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.number().integer()
    })
};
const updateUser = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.number().integer()
    }),
    body: joi_1.default.object()
        .keys({
        email: joi_1.default.string().email(),
        password: joi_1.default.string().custom(custom_validation_1.password),
        name: joi_1.default.string()
    })
        .min(1)
};
const deleteUser = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.number().integer()
    })
};
exports.default = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
};
//# sourceMappingURL=user.validation.js.map