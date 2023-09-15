"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.DeleteUserByIdHandler = exports.DeleteUserByIdController = exports.DeleteUserById = void 0;
const mediatr_js_1 = require("../../mediatr.js");
const dataSource_1 = require("../../data/dataSource");
const user_1 = require("../entities/user");
const userDto_1 = require("../dtos/userDto");
const tsoa_1 = require("tsoa");
const joi_1 = __importDefault(require("joi"));
const mapping_1 = __importDefault(require("../mapping"));
const notFoundError_1 = __importDefault(require("../../types/notFoundError"));
const http_status_1 = __importDefault(require("http-status"));
class DeleteUserById {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.DeleteUserById = DeleteUserById;
const deleteUserValidations = {
    params: joi_1.default.object().keys({
        userId: joi_1.default.number().integer().required()
    })
};
let DeleteUserByIdController = class DeleteUserByIdController extends tsoa_1.Controller {
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield mediatr_js_1.mediatrJs.send(new DeleteUserById({
                id: id
            }));
            if (!user) {
                throw new notFoundError_1.default('User not found');
            }
            this.setStatus(http_status_1.default.NO_CONTENT);
            return user;
        });
    }
};
exports.DeleteUserByIdController = DeleteUserByIdController;
__decorate([
    (0, tsoa_1.Delete)('v1/delete'),
    (0, tsoa_1.Security)("jwt"),
    (0, tsoa_1.SuccessResponse)('204', 'NO_CONTENT'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DeleteUserByIdController.prototype, "deleteUserById", null);
exports.DeleteUserByIdController = DeleteUserByIdController = __decorate([
    (0, tsoa_1.Route)('/identity')
], DeleteUserByIdController);
class DeleteUserByIdHandler {
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield deleteUserValidations.params.validateAsync(request);
            const userRepository = dataSource_1.dataSource.getRepository(user_1.User);
            const user = yield userRepository.findOneBy({
                id: request.id
            });
            if (!user) {
                throw new notFoundError_1.default('User not found');
            }
            const usersEntity = yield userRepository.remove(user);
            const result = mapping_1.default.map(usersEntity, new userDto_1.UserDto());
            return result;
        });
    }
}
exports.DeleteUserByIdHandler = DeleteUserByIdHandler;
const deleteUserByIdHandler = new DeleteUserByIdHandler();
mediatr_js_1.mediatrJs.registerHandler(DeleteUserById, deleteUserByIdHandler);
//# sourceMappingURL=deleteUserById.js.map