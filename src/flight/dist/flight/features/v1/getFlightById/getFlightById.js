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
exports.GetFlightByIdHandler = exports.GetUserByIdController = exports.GetFlightById = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const tsoa_1 = require("tsoa");
const joi_1 = __importDefault(require("joi"));
const notFoundException_1 = __importDefault(require("building-blocks/types/exception/not-found.exception"));
const tsyringe_1 = require("tsyringe");
const flightDto_1 = require("../../../dtos/flightDto");
const mappings_1 = __importDefault(require("../../../mappings"));
class GetFlightById {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.GetFlightById = GetFlightById;
const getFlightByIdValidations = {
    params: joi_1.default.object().keys({
        id: joi_1.default.number().required()
    })
};
let GetUserByIdController = class GetUserByIdController extends tsoa_1.Controller {
    getFlightById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mediatr_js_1.mediatrJs.send(new GetFlightById({
                id: id
            }));
            if (!result) {
                throw new notFoundException_1.default('Flight not found');
            }
            return result;
        });
    }
};
exports.GetUserByIdController = GetUserByIdController;
__decorate([
    (0, tsoa_1.Get)('v1/get-by-id'),
    (0, tsoa_1.Security)('jwt'),
    (0, tsoa_1.SuccessResponse)('200', 'OK'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GetUserByIdController.prototype, "getFlightById", null);
exports.GetUserByIdController = GetUserByIdController = __decorate([
    (0, tsoa_1.Route)('/flight')
], GetUserByIdController);
let GetFlightByIdHandler = class GetFlightByIdHandler {
    constructor(flightRepository) {
        this.flightRepository = flightRepository;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield getFlightByIdValidations.params.validateAsync(request);
            const flightEntity = yield this.flightRepository.findFlightById(request.id);
            const result = mappings_1.default.map(flightEntity, new flightDto_1.FlightDto());
            return result;
        });
    }
};
exports.GetFlightByIdHandler = GetFlightByIdHandler;
exports.GetFlightByIdHandler = GetFlightByIdHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IFlightRepository')),
    __metadata("design:paramtypes", [Object])
], GetFlightByIdHandler);
//# sourceMappingURL=getFlightById.js.map
