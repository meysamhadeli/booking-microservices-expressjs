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
exports.CreateFlightHandler = exports.CreateFlightController = exports.CreateFlightRequestDto = exports.CreateFlight = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const tsoa_1 = require("tsoa");
const http_status_1 = __importDefault(require("http-status"));
const joi_1 = __importDefault(require("joi"));
const conflictException_1 = __importDefault(require("building-blocks/types/exception/conflictException"));
const tsyringe_1 = require("tsyringe");
const mappings_1 = __importDefault(require("../../../../aircraft/mappings"));
const flightStatus_1 = require("../../../enums/flightStatus");
const flightDto_1 = require("../../../dtos/flightDto");
const flight_1 = require("../../../entities/flight");
class CreateFlight {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.CreateFlight = CreateFlight;
class CreateFlightRequestDto {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.CreateFlightRequestDto = CreateFlightRequestDto;
const createFlightValidations = joi_1.default.object({
    flightNumber: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    flightStatus: joi_1.default.string()
        .required()
        .valid(flightStatus_1.FlightStatus.UNKNOWN, flightStatus_1.FlightStatus.DELAY, flightStatus_1.FlightStatus.CANCELED, flightStatus_1.FlightStatus.FLYING, flightStatus_1.FlightStatus.COMPLETED),
    flightDate: joi_1.default.date().required(),
    departureDate: joi_1.default.date().required(),
    departureAirportId: joi_1.default.number().required(),
    aircraftId: joi_1.default.number().required(),
    arriveDate: joi_1.default.date().required(),
    arriveAirportId: joi_1.default.number().required(),
    durationMinutes: joi_1.default.number().required()
});
let CreateFlightController = class CreateFlightController extends tsoa_1.Controller {
    createFlight(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mediatr_js_1.mediatrJs.send(new CreateFlight({
                flightNumber: request.flightNumber,
                aircraftId: request.aircraftId,
                arriveAirportId: request.arriveAirportId,
                arriveDate: request.arriveDate,
                price: request.price,
                departureAirportId: request.departureAirportId,
                departureDate: request.departureDate,
                flightDate: request.flightDate,
                flightStatus: request.flightStatus,
                durationMinutes: request.durationMinutes
            }));
            this.setStatus(http_status_1.default.CREATED);
            return result;
        });
    }
};
exports.CreateFlightController = CreateFlightController;
__decorate([
    (0, tsoa_1.Post)('v1/create'),
    (0, tsoa_1.Security)('jwt'),
    (0, tsoa_1.SuccessResponse)('201', 'CREATED'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateFlightRequestDto]),
    __metadata("design:returntype", Promise)
], CreateFlightController.prototype, "createFlight", null);
exports.CreateFlightController = CreateFlightController = __decorate([
    (0, tsoa_1.Route)('/flight')
], CreateFlightController);
let CreateFlightHandler = class CreateFlightHandler {
    constructor(publisher, flightRepository) {
        this.publisher = publisher;
        this.flightRepository = flightRepository;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield createFlightValidations.validateAsync(request);
            const existFlight = yield this.flightRepository.findFlightByNumber(request.flightNumber);
            if (existFlight) {
                throw new conflictException_1.default('Flight already taken');
            }
            const flightEntity = yield this.flightRepository.createFlight(new flight_1.Flight({
                flightNumber: request.flightNumber,
                aircraftId: request.aircraftId,
                arriveAirportId: request.arriveAirportId,
                arriveDate: request.arriveDate,
                price: request.price,
                departureAirportId: request.departureAirportId,
                departureDate: request.departureDate,
                flightDate: request.flightDate,
                flightStatus: request.flightStatus,
                durationMinutes: request.durationMinutes
            }));
            const result = mappings_1.default.map(flightEntity, new flightDto_1.FlightDto());
            return result;
        });
    }
};
exports.CreateFlightHandler = CreateFlightHandler;
exports.CreateFlightHandler = CreateFlightHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPublisher')),
    __param(1, (0, tsyringe_1.inject)('IFlightRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateFlightHandler);
//# sourceMappingURL=createFlight.js.map