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
exports.GetUsersHandler = exports.GetUsersController = exports.GetUsers = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const dataSource_1 = require("../../data/dataSource");
const user_1 = require("../entities/user");
const userDto_1 = require("../dtos/userDto");
const tsoa_1 = require("tsoa");
const joi_1 = __importDefault(require("joi"));
const mapping_1 = __importDefault(require("../mapping"));
const pagedResult_1 = require("building-blocks/types/pagination/pagedResult");
class GetUsers {
    constructor(request = {}) {
        this.page = 1;
        this.pageSize = 10;
        this.orderBy = 'id';
        this.order = 'ASC';
        this.searchTerm = null;
        Object.assign(this, request);
    }
}
exports.GetUsers = GetUsers;
const getUsersValidations = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1),
    pageSize: joi_1.default.number().integer().min(1).default(10),
    orderBy: joi_1.default.string().valid('id', 'name', 'email').default('id'),
    order: joi_1.default.string().valid('ASC', 'DESC').default('ASC'),
    searchTerm: joi_1.default.string().allow(null).optional()
});
let GetUsersController = class GetUsersController extends tsoa_1.Controller {
    getUsers(pageSize = 10, page = 1, order = 'ASC', orderBy = 'id', searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mediatr_js_1.mediatrJs.send(new GetUsers({
                page: page,
                pageSize: pageSize,
                searchTerm: searchTerm,
                order: order,
                orderBy: orderBy
            }));
            return result;
        });
    }
};
exports.GetUsersController = GetUsersController;
__decorate([
    (0, tsoa_1.Get)('v1/get'),
    (0, tsoa_1.Security)('jwt'),
    (0, tsoa_1.SuccessResponse)('200', 'OK'),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __param(3, (0, tsoa_1.Query)()),
    __param(4, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object, String]),
    __metadata("design:returntype", Promise)
], GetUsersController.prototype, "getUsers", null);
exports.GetUsersController = GetUsersController = __decorate([
    (0, tsoa_1.Route)('/identity')
], GetUsersController);
class GetUsersHandler {
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield getUsersValidations.validateAsync(request);
            const userRepository = dataSource_1.dataSource.getRepository(user_1.User);
            const skip = (request.page - 1) * request.pageSize;
            const take = request.pageSize;
            const queryBuilder = userRepository
                .createQueryBuilder('user')
                .orderBy(`user.${request.orderBy}`, request.order)
                .skip(skip)
                .take(take);
            // Apply filter criteria to the query
            if (request.searchTerm) {
                queryBuilder.andWhere('user.name LIKE :name', { name: `%${request.searchTerm}%` });
            }
            const [usersEntity, total] = yield queryBuilder.getManyAndCount();
            const result = usersEntity.map((user) => mapping_1.default.map(user, new userDto_1.UserDto()));
            return new pagedResult_1.PagedResult(result, total);
        });
    }
}
exports.GetUsersHandler = GetUsersHandler;
const getUsersHandler = new GetUsersHandler();
mediatr_js_1.mediatrJs.registerHandler(GetUsers, getUsersHandler);
//# sourceMappingURL=getUsers.js.map