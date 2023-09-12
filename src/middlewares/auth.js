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
const passport_1 = __importDefault(require("passport"));
const roles_1 = require("../config/roles");
const unauthorizedError_1 = __importDefault(require("../types/unauthorizedError"));
const forbiddenError_1 = __importDefault(require("../types/forbiddenError"));
const verifyCallback = (req, resolve, reject, requiredRights) => (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (err || info || !user) {
        return reject(new unauthorizedError_1.default('Please authenticate'));
    }
    req.user = user;
    if (requiredRights.length) {
        const userRights = (_a = roles_1.roleRights.get(user.role)) !== null && _a !== void 0 ? _a : [];
        const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
        if (!hasRequiredRights && req.params.userId !== user.id) {
            return reject(new forbiddenError_1.default('Forbidden'));
        }
    }
    resolve();
});
const auth = (...requiredRights) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        passport_1.default.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
});
exports.default = auth;
//# sourceMappingURL=auth.js.map