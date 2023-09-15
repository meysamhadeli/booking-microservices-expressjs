"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const custom_validation_1 = require("./custom.validation");
const role_1 = require("../users/enums/role");
const createUser = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().custom(custom_validation_1.password),
    name: joi_1.default.string().required(),
    role: joi_1.default.string().required().valid(role_1.Role.USER, role_1.Role.ADMIN)
});
const queryUsers = joi_1.default.object({
    page: joi_1.default.number().required(),
    pageSize: joi_1.default.number().required(),
});
const getUserById = {
    params: joi_1.default.object().keys({
        id: joi_1.default.number().integer()
    })
};
const getUserByEmail = {
    params: joi_1.default.object().keys({
        email: joi_1.default.string().email().required()
    })
};
const updateUserById = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().custom(custom_validation_1.password),
    name: joi_1.default.string().required(),
    role: joi_1.default.string().required().valid(role_1.Role.USER, role_1.Role.ADMIN)
});
const deleteUserById = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.number().integer()
    })
};
exports.default = {
    createUser,
    queryUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById
};
//# sourceMappingURL=user.validation.js.map