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
exports.GetPassengerByIdHandler = exports.GetPassengerByIdController = exports.GetPassengerById = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const passengerDto_1 = require("../../dtos/passengerDto");
const tsoa_1 = require("tsoa");
const joi_1 = __importDefault(require("joi"));
const notFoundException_1 = __importDefault(require("building-blocks/types/exception/notFoundException"));
const mappings_1 = __importDefault(require("../../mappings"));
const tsyringe_1 = require("tsyringe");
class GetPassengerById {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.GetPassengerById = GetPassengerById;
const getPassengerByIdValidations = {
    params: joi_1.default.object().keys({
        id: joi_1.default.number().integer().required()
    })
};
let GetPassengerByIdController = class GetPassengerByIdController extends tsoa_1.Controller {
    getPassengerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mediatr_js_1.mediatrJs.send(new GetPassengerById({
                id: id
            }));
            if (!result) {
                throw new notFoundException_1.default('Passenger not found');
            }
            return result;
        });
    }
};
exports.GetPassengerByIdController = GetPassengerByIdController;
__decorate([
    (0, tsoa_1.Get)('v1/get-by-id'),
    (0, tsoa_1.Security)('jwt'),
    (0, tsoa_1.SuccessResponse)('200', 'OK'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GetPassengerByIdController.prototype, "getPassengerById", null);
exports.GetPassengerByIdController = GetPassengerByIdController = __decorate([
    (0, tsoa_1.Route)('/passenger')
], GetPassengerByIdController);
let GetPassengerByIdHandler = class GetPassengerByIdHandler {
    constructor(passengerRepository) {
        this.passengerRepository = passengerRepository;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield getPassengerByIdValidations.params.validateAsync(request);
            const passengerEntity = yield this.passengerRepository.findPassengerById(request.id);
            const result = mappings_1.default.map(passengerEntity, new passengerDto_1.PassengerDto());
            return result;
        });
    }
};
exports.GetPassengerByIdHandler = GetPassengerByIdHandler;
exports.GetPassengerByIdHandler = GetPassengerByIdHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPassengerRepository')),
    __metadata("design:paramtypes", [Object])
], GetPassengerByIdHandler);
//# sourceMappingURL=getPassengerById.js.map