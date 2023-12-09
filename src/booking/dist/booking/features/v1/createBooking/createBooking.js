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
exports.CreateBookingHandler = exports.CreateBookingController = exports.CreateBookingRequestDto = exports.CreateBooking = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const tsoa_1 = require("tsoa");
const http_status_1 = __importDefault(require("http-status"));
const joi_1 = __importDefault(require("joi"));
const tsyringe_1 = require("tsyringe");
const mappings_1 = __importDefault(require("../../../mappings"));
const bookingDto_1 = require("../../../dtos/bookingDto");
const booking_1 = require("../../../entities/booking");
const notFoundException_1 = __importDefault(require("building-blocks/types/exception/not-found.exception"));
const bookingContract_1 = require("building-blocks/contracts/booking.contract");
class CreateBooking {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.CreateBooking = CreateBooking;
class CreateBookingRequestDto {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.CreateBookingRequestDto = CreateBookingRequestDto;
const createBookingValidations = joi_1.default.object({
    passengerId: joi_1.default.number().required(),
    flightId: joi_1.default.number().required(),
    description: joi_1.default.string().required()
});
let CreateBookingController = class CreateBookingController extends tsoa_1.Controller {
    async createBooking(request) {
        const result = await mediatr_js_1.mediatrJs.send(new CreateBooking({
            flightId: request.flightId,
            passengerId: request.passengerId,
            description: request.description
        }));
        this.setStatus(http_status_1.default.CREATED);
        return result;
    }
};
exports.CreateBookingController = CreateBookingController;
__decorate([
    (0, tsoa_1.Post)('v1/create'),
    (0, tsoa_1.Security)('jwt'),
    (0, tsoa_1.SuccessResponse)('201', 'CREATED'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateBookingRequestDto]),
    __metadata("design:returntype", Promise)
], CreateBookingController.prototype, "createBooking", null);
exports.CreateBookingController = CreateBookingController = __decorate([
    (0, tsoa_1.Route)('/booking')
], CreateBookingController);
let CreateBookingHandler = class CreateBookingHandler {
    constructor(bookingRepository, flightClientService, passengerClientService, publisher) {
        this.bookingRepository = bookingRepository;
        this.flightClientService = flightClientService;
        this.passengerClientService = passengerClientService;
        this.publisher = publisher;
    }
    async handle(request) {
        var _a, _b;
        await createBookingValidations.validateAsync(request);
        const flightDto = await this.flightClientService.getFlightById(request.flightId);
        const passengerDto = await this.passengerClientService.getPassengerById(request.passengerId);
        const avalibaleSeats = await this.flightClientService.getAvalibaleSeats(request.flightId);
        if (avalibaleSeats.length == 0) {
            throw new notFoundException_1.default('No seat available!');
        }
        await this.flightClientService.reserveSeat({
            seatNumber: (_a = avalibaleSeats[0]) === null || _a === void 0 ? void 0 : _a.seatNumber,
            flightId: flightDto === null || flightDto === void 0 ? void 0 : flightDto.id
        });
        const bookingEntity = await this.bookingRepository.createBooking(new booking_1.Booking({
            seatNumber: (_b = avalibaleSeats[0]) === null || _b === void 0 ? void 0 : _b.seatNumber,
            flightNumber: flightDto === null || flightDto === void 0 ? void 0 : flightDto.flightNumber,
            price: flightDto === null || flightDto === void 0 ? void 0 : flightDto.price,
            passengerName: passengerDto === null || passengerDto === void 0 ? void 0 : passengerDto.name,
            description: request === null || request === void 0 ? void 0 : request.description,
            flightDate: flightDto === null || flightDto === void 0 ? void 0 : flightDto.flightDate,
            aircraftId: flightDto === null || flightDto === void 0 ? void 0 : flightDto.aircraftId,
            departureAirportId: flightDto === null || flightDto === void 0 ? void 0 : flightDto.departureAirportId,
            arriveAirportId: flightDto === null || flightDto === void 0 ? void 0 : flightDto.arriveAirportId
        }));
        await this.publisher.publishMessage(new bookingContract_1.BookingCreated(bookingEntity));
        const result = mappings_1.default.map(bookingEntity, new bookingDto_1.BookingDto());
        return result;
    }
};
exports.CreateBookingHandler = CreateBookingHandler;
exports.CreateBookingHandler = CreateBookingHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IBookingRepository')),
    __param(1, (0, tsyringe_1.inject)('IFlightClientService')),
    __param(2, (0, tsyringe_1.inject)('IPassengerClientService')),
    __param(3, (0, tsyringe_1.inject)('IPublisher')),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], CreateBookingHandler);
//# sourceMappingURL=createBooking.js.map
