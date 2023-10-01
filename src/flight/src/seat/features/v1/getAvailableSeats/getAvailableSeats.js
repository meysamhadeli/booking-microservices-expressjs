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
exports.GetAvailableSeatsHandler = exports.GetAvailableSeatsController = exports.GetAvailableSeats = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const tsoa_1 = require("tsoa");
const joi_1 = __importDefault(require("joi"));
const tsyringe_1 = require("tsyringe");
const mappings_1 = __importDefault(require("../../../mappings"));
const seatDto_1 = require("../../../dtos/seatDto");
class GetAvailableSeats {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.GetAvailableSeats = GetAvailableSeats;
const getAvailableSeatsValidations = {
    params: joi_1.default.object().keys({
        flightId: joi_1.default.number().required()
    })
};
let GetAvailableSeatsController = class GetAvailableSeatsController extends tsoa_1.Controller {
    getAvailableSeats(flightId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mediatr_js_1.mediatrJs.send(new GetAvailableSeats({
                flightId: flightId
            }));
            return result;
        });
    }
};
exports.GetAvailableSeatsController = GetAvailableSeatsController;
__decorate([
    (0, tsoa_1.Get)('v1/get-available-seats'),
    (0, tsoa_1.Security)('jwt'),
    (0, tsoa_1.SuccessResponse)('200', 'OK'),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GetAvailableSeatsController.prototype, "getAvailableSeats", null);
exports.GetAvailableSeatsController = GetAvailableSeatsController = __decorate([
    (0, tsoa_1.Route)('/seat')
], GetAvailableSeatsController);
let GetAvailableSeatsHandler = class GetAvailableSeatsHandler {
    constructor(seatRepository) {
        this.seatRepository = seatRepository;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield getAvailableSeatsValidations.params.validateAsync(request);
            const seatsEntity = yield this.seatRepository.getSeatsByFlightId(request.flightId);
            const result = seatsEntity.map((seat) => mappings_1.default.map(seat, new seatDto_1.SeatDto()));
            return result;
        });
    }
};
exports.GetAvailableSeatsHandler = GetAvailableSeatsHandler;
exports.GetAvailableSeatsHandler = GetAvailableSeatsHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('ISeatRepository')),
    __metadata("design:paramtypes", [Object])
], GetAvailableSeatsHandler);
//# sourceMappingURL=getAvailableSeats.js.map