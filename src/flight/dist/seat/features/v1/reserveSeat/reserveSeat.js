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
exports.ReserveSeatHandler = exports.ReserveSeatController = exports.ReserveSeatRequestDto = exports.ReserveSeat = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const tsoa_1 = require("tsoa");
const http_status_1 = __importDefault(require("http-status"));
const joi_1 = __importDefault(require("joi"));
const tsyringe_1 = require("tsyringe");
const mappings_1 = __importDefault(require("../../../../aircraft/mappings"));
const seatDto_1 = require("../../../dtos/seatDto");
const notFoundException_1 = __importDefault(require("building-blocks/types/exception/not-found.exception"));
const seat_1 = require("../../../entities/seat");
const flightContract_1 = require("building-blocks/contracts/flight.contract");
class ReserveSeat {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.ReserveSeat = ReserveSeat;
class ReserveSeatRequestDto {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.ReserveSeatRequestDto = ReserveSeatRequestDto;
const reserveSeatValidations = joi_1.default.object({
    seatNumber: joi_1.default.string().required(),
    flightId: joi_1.default.number().required()
});
let ReserveSeatController = class ReserveSeatController extends tsoa_1.Controller {
    reserveSeat(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mediatr_js_1.mediatrJs.send(new ReserveSeat({
                flightId: request.flightId,
                seatNumber: request.seatNumber
            }));
            this.setStatus(http_status_1.default.NO_CONTENT);
            return result;
        });
    }
};
exports.ReserveSeatController = ReserveSeatController;
__decorate([
    (0, tsoa_1.Post)('v1/reserve'),
    (0, tsoa_1.Security)('jwt'),
    (0, tsoa_1.SuccessResponse)('204', 'NO_CONTENT'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ReserveSeatRequestDto]),
    __metadata("design:returntype", Promise)
], ReserveSeatController.prototype, "reserveSeat", null);
exports.ReserveSeatController = ReserveSeatController = __decorate([
    (0, tsoa_1.Route)('/seat')
], ReserveSeatController);
let ReserveSeatHandler = class ReserveSeatHandler {
    constructor(publisher, seatRepository, flightRepository) {
        this.publisher = publisher;
        this.seatRepository = seatRepository;
        this.flightRepository = flightRepository;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield reserveSeatValidations.validateAsync(request);
            const existFlight = yield this.flightRepository.findFlightById(request.flightId);
            if (existFlight == null) {
                throw new notFoundException_1.default('Flight not found!');
            }
            const seat = yield this.seatRepository.getAvailableSeat(request.flightId, request.seatNumber);
            if (seat == null) {
                throw new notFoundException_1.default('Seat not found!');
            }
            const seatEntity = yield this.seatRepository.reserveSeat(new seat_1.Seat({
                id: seat.id,
                flightId: request.flightId,
                seatNumber: request.seatNumber,
                seatClass: seat.seatClass,
                seatType: seat.seatType,
                isReserved: true,
                createdAt: seat.createdAt,
                updatedAt: new Date()
            }));
            yield this.publisher.publishMessage(new flightContract_1.SeatReserved(seatEntity));
            const result = mappings_1.default.map(seatEntity, new seatDto_1.SeatDto());
            return result;
        });
    }
};
exports.ReserveSeatHandler = ReserveSeatHandler;
exports.ReserveSeatHandler = ReserveSeatHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPublisher')),
    __param(1, (0, tsyringe_1.inject)('ISeatRepository')),
    __param(2, (0, tsyringe_1.inject)('IFlightRepository')),
    __metadata("design:paramtypes", [Object, Object, Object])
], ReserveSeatHandler);
//# sourceMappingURL=reserveSeat.js.map
