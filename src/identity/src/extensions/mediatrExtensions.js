"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerMediatrHandlers = void 0;
const tsyringe_1 = require("tsyringe");
const createUser_1 = require("../user/features/v1/createUser");
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const deleteUserById_1 = require("../user/features/v1/deleteUserById");
const getUserById_1 = require("../user/features/v1/getUserById");
const getUsers_1 = require("../user/features/v1/getUsers");
const updateUser_1 = require("../user/features/v1/updateUser");
const generateToken_1 = require("../auth/features/v1/generateToken");
const validateToken_1 = require("../auth/features/v1/validateToken");
const login_1 = require("../auth/features/v1/login");
const logout_1 = require("../auth/features/v1/logout");
const refreshToken_1 = require("../auth/features/v1/refreshToken");
const registerMediatrHandlers = () => {
    mediatr_js_1.mediatrJs.registerHandler(createUser_1.CreateUser, tsyringe_1.container.resolve(createUser_1.CreateUserHandler));
    mediatr_js_1.mediatrJs.registerHandler(deleteUserById_1.DeleteUserById, tsyringe_1.container.resolve(deleteUserById_1.DeleteUserByIdHandler));
    mediatr_js_1.mediatrJs.registerHandler(getUserById_1.GetUserById, tsyringe_1.container.resolve(getUserById_1.GetUserByIdHandler));
    mediatr_js_1.mediatrJs.registerHandler(getUsers_1.GetUsers, tsyringe_1.container.resolve(getUsers_1.GetUsersHandler));
    mediatr_js_1.mediatrJs.registerHandler(updateUser_1.UpdateUser, tsyringe_1.container.resolve(updateUser_1.UpdateUserHandler));
    mediatr_js_1.mediatrJs.registerHandler(generateToken_1.GenerateToken, tsyringe_1.container.resolve(generateToken_1.GenerateTokenHandler));
    mediatr_js_1.mediatrJs.registerHandler(validateToken_1.ValidateToken, tsyringe_1.container.resolve(validateToken_1.ValidateTokenHandler));
    mediatr_js_1.mediatrJs.registerHandler(login_1.Login, tsyringe_1.container.resolve(login_1.LoginHandler));
    mediatr_js_1.mediatrJs.registerHandler(logout_1.Logout, tsyringe_1.container.resolve(logout_1.LogoutHandler));
    mediatr_js_1.mediatrJs.registerHandler(refreshToken_1.RefreshToken, tsyringe_1.container.resolve(refreshToken_1.RefreshTokenHandler));
};
exports.registerMediatrHandlers = registerMediatrHandlers;
//# sourceMappingURL=mediatrExtensions.js.map