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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPassengersHandler = exports.GetPassengersController = exports.GetPassengers = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const passengerDto_1 = require("../../../dtos/passengerDto");
const tsoa_1 = require("tsoa");
const mappings_1 = __importDefault(require("../../../mappings"));
const tsyringe_1 = require("tsyringe");
const joi_1 = __importDefault(require("joi"));
const pagedResult_1 = require("building-blocks/types/pagination/pagedResult");
class GetPassengers {
    constructor(request = {}) {
        this.page = 1;
        this.pageSize = 10;
        this.orderBy = 'id';
        this.order = 'ASC';
        this.searchTerm = null;
        Object.assign(this, request);
    }
}
exports.GetPassengers = GetPassengers;
const getPassengersValidations = joi_1.default.object({
    page: joi_1.default.number().integer().min(1).default(1),
    pageSize: joi_1.default.number().integer().min(1).default(10),
    orderBy: joi_1.default.string().valid('id', 'name', 'email').default('id'),
    order: joi_1.default.string().valid('ASC', 'DESC').default('ASC'),
    searchTerm: joi_1.default.string().allow(null).optional()
});
let GetPassengersController = class GetPassengersController extends tsoa_1.Controller {
    async getPassengers(pageSize = 10, page = 1, order = 'ASC', orderBy = 'id', searchTerm) {
        const result = await mediatr_js_1.mediatrJs.send(new GetPassengers({
            page: page,
            pageSize: pageSize,
            searchTerm: searchTerm,
            order: order,
            orderBy: orderBy
        }));
        return result;
    }
};
exports.GetPassengersController = GetPassengersController;
__decorate([
    (0, tsoa_1.Get)('v1/get-all'),
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
], GetPassengersController.prototype, "getPassengers", null);
exports.GetPassengersController = GetPassengersController = __decorate([
    (0, tsoa_1.Route)('/passenger')
], GetPassengersController);
let GetPassengersHandler = class GetPassengersHandler {
    constructor(passengerRepository) {
        this.passengerRepository = passengerRepository;
    }
    async handle(request) {
        await getPassengersValidations.validateAsync(request);
        const [passengersEntity, total] = await this.passengerRepository.findPassengers(request.page, request.pageSize, request.orderBy, request.order, request.searchTerm);
        if ((passengersEntity === null || passengersEntity === void 0 ? void 0 : passengersEntity.length) == 0)
            return new pagedResult_1.PagedResult(null, total);
        const result = passengersEntity.map((user) => mappings_1.default.map(user, new passengerDto_1.PassengerDto()));
        return new pagedResult_1.PagedResult(result, total);
    }
};
exports.GetPassengersHandler = GetPassengersHandler;
exports.GetPassengersHandler = GetPassengersHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPassengerRepository')),
    __metadata("design:paramtypes", [Object])
], GetPassengersHandler);
//# sourceMappingURL=getPassengers.js.map