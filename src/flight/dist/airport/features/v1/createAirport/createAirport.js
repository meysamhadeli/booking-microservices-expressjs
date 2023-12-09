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
exports.CreateAirportHandler = exports.CreateAirportController = exports.CreateAirportRequestDto = exports.CreateAirport = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const tsoa_1 = require("tsoa");
const http_status_1 = __importDefault(require("http-status"));
const joi_1 = __importDefault(require("joi"));
const conflictException_1 = __importDefault(require("building-blocks/types/exception/conflict.exception"));
const tsyringe_1 = require("tsyringe");
const airportDto_1 = require("../../../dtos/airportDto");
const airport_1 = require("../../../entities/airport");
const mappings_1 = __importDefault(require("../../../../aircraft/mappings"));
const flightContract_1 = require("building-blocks/contracts/flight.contract");
class CreateAirport {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.CreateAirport = CreateAirport;
class CreateAirportRequestDto {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.CreateAirportRequestDto = CreateAirportRequestDto;
const createAirportValidations = joi_1.default.object({
    code: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    name: joi_1.default.string().required()
});
let CreateAirportController = class CreateAirportController extends tsoa_1.Controller {
    createAirport(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mediatr_js_1.mediatrJs.send(new CreateAirport({
                code: request.code,
                name: request.name,
                address: request.address
            }));
            this.setStatus(http_status_1.default.CREATED);
            return result;
        });
    }
};
exports.CreateAirportController = CreateAirportController;
__decorate([
    (0, tsoa_1.Post)('v1/create'),
    (0, tsoa_1.Security)('jwt'),
    (0, tsoa_1.SuccessResponse)('201', 'CREATED'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAirportRequestDto]),
    __metadata("design:returntype", Promise)
], CreateAirportController.prototype, "createAirport", null);
exports.CreateAirportController = CreateAirportController = __decorate([
    (0, tsoa_1.Route)('/airport')
], CreateAirportController);
let CreateAirportHandler = class CreateAirportHandler {
    constructor(publisher, airportRepository) {
        this.publisher = publisher;
        this.airportRepository = airportRepository;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield createAirportValidations.validateAsync(request);
            const existAirport = yield this.airportRepository.findAirportByName(request.name);
            if (existAirport) {
                throw new conflictException_1.default('Airport already taken');
            }
            const airportEntity = yield this.airportRepository.createAirport(new airport_1.Airport({
                name: request.name,
                code: request.code,
                address: request.address
            }));
            yield this.publisher.publishMessage(new flightContract_1.AirportCreated(airportEntity));
            const result = mappings_1.default.map(airportEntity, new airportDto_1.AirportDto());
            return result;
        });
    }
};
exports.CreateAirportHandler = CreateAirportHandler;
exports.CreateAirportHandler = CreateAirportHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPublisher')),
    __param(1, (0, tsyringe_1.inject)('IAirportRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateAirportHandler);
//# sourceMappingURL=createAirport.js.map
