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
exports.CreateSeatHandler = exports.CreateSeatController = exports.CreateSeatRequestDto = exports.CreateSeat = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const tsoa_1 = require("tsoa");
const http_status_1 = __importDefault(require("http-status"));
const joi_1 = __importDefault(require("joi"));
const tsyringe_1 = require("tsyringe");
const mappings_1 = __importDefault(require("../../../../aircraft/mappings"));
const seatDto_1 = require("../../../dtos/seatDto");
const seatClass_1 = require("../../../enums/seatClass");
const seatType_1 = require("../../../enums/seatType");
const notFoundException_1 = __importDefault(require("building-blocks/types/exception/notFoundException"));
const seat_1 = require("../../../entities/seat");
class CreateSeat {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.CreateSeat = CreateSeat;
class CreateSeatRequestDto {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.CreateSeatRequestDto = CreateSeatRequestDto;
const createSeatValidations = joi_1.default.object({
    seatNumber: joi_1.default.string().required(),
    flightId: joi_1.default.number().required(),
    seatClass: joi_1.default.string()
        .required()
        .valid(seatClass_1.SeatClass.UNKNOWN, seatClass_1.SeatClass.FIRST_CLASS, seatClass_1.SeatClass.BUSINESS, seatClass_1.SeatClass.ECONOMY),
    seatType: joi_1.default.string()
        .required()
        .valid(seatType_1.SeatType.UNKNOWN, seatType_1.SeatType.AISLE, seatType_1.SeatType.MIDDLE, seatType_1.SeatType.WINDOW)
});
let CreateSeatController = class CreateSeatController extends tsoa_1.Controller {
    createSeat(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mediatr_js_1.mediatrJs.send(new CreateSeat({
                flightId: request.flightId,
                seatNumber: request.seatNumber,
                seatClass: request.seatClass,
                seatType: request.seatType
            }));
            this.setStatus(http_status_1.default.CREATED);
            return result;
        });
    }
};
exports.CreateSeatController = CreateSeatController;
__decorate([
    (0, tsoa_1.Post)('v1/create'),
    (0, tsoa_1.Security)('jwt'),
    (0, tsoa_1.SuccessResponse)('201', 'CREATED'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSeatRequestDto]),
    __metadata("design:returntype", Promise)
], CreateSeatController.prototype, "createSeat", null);
exports.CreateSeatController = CreateSeatController = __decorate([
    (0, tsoa_1.Route)('/seat')
], CreateSeatController);
let CreateSeatHandler = class CreateSeatHandler {
    constructor(publisher, seatRepository, flightRepository) {
        this.publisher = publisher;
        this.seatRepository = seatRepository;
        this.flightRepository = flightRepository;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield createSeatValidations.validateAsync(request);
            const existFlight = yield this.flightRepository.findFlightById(request.flightId);
            if (existFlight == null) {
                throw new notFoundException_1.default('Flight not found!');
            }
            const seatEntity = yield this.seatRepository.createSeat(new seat_1.Seat({
                flightId: request.flightId,
                seatNumber: request.seatNumber,
                seatClass: request.seatClass,
                seatType: request.seatType,
                isReserved: false
            }));
            const result = mappings_1.default.map(seatEntity, new seatDto_1.SeatDto());
            return result;
        });
    }
};
exports.CreateSeatHandler = CreateSeatHandler;
exports.CreateSeatHandler = CreateSeatHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPublisher')),
    __param(1, (0, tsyringe_1.inject)('ISeatRepository')),
    __param(2, (0, tsyringe_1.inject)('IFlightRepository')),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateSeatHandler);
//# sourceMappingURL=createSeat.js.map