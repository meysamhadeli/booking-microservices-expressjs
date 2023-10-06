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
exports.CreateAircraftHandler = exports.CreateAircraftController = exports.CreateAircraftRequestDto = exports.CreateAircraft = void 0;
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const tsoa_1 = require("tsoa");
const http_status_1 = __importDefault(require("http-status"));
const joi_1 = __importDefault(require("joi"));
const conflictException_1 = __importDefault(require("building-blocks/types/exception/conflictException"));
const tsyringe_1 = require("tsyringe");
const aircraftDto_1 = require("../../../dtos/aircraftDto");
const aircraft_1 = require("../../../entities/aircraft");
const mappings_1 = __importDefault(require("../../../mappings"));
const flightContract_1 = require("building-blocks/contracts/flightContract");
class CreateAircraft {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.CreateAircraft = CreateAircraft;
class CreateAircraftRequestDto {
    constructor(request = {}) {
        Object.assign(this, request);
    }
}
exports.CreateAircraftRequestDto = CreateAircraftRequestDto;
const createAircraftValidations = joi_1.default.object({
    model: joi_1.default.string().required(),
    manufacturingYear: joi_1.default.number().required(),
    name: joi_1.default.string().required()
});
let CreateAircraftController = class CreateAircraftController extends tsoa_1.Controller {
    createAircraft(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mediatr_js_1.mediatrJs.send(new CreateAircraft({
                model: request.model,
                name: request.name,
                manufacturingYear: request.manufacturingYear
            }));
            this.setStatus(http_status_1.default.CREATED);
            return result;
        });
    }
};
exports.CreateAircraftController = CreateAircraftController;
__decorate([
    (0, tsoa_1.Post)('v1/create'),
    (0, tsoa_1.Security)('jwt'),
    (0, tsoa_1.SuccessResponse)('201', 'CREATED'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAircraftRequestDto]),
    __metadata("design:returntype", Promise)
], CreateAircraftController.prototype, "createAircraft", null);
exports.CreateAircraftController = CreateAircraftController = __decorate([
    (0, tsoa_1.Route)('/aircraft')
], CreateAircraftController);
let CreateAircraftHandler = class CreateAircraftHandler {
    constructor(publisher, aircraftRepository) {
        this.publisher = publisher;
        this.aircraftRepository = aircraftRepository;
    }
    handle(request) {
        return __awaiter(this, void 0, void 0, function* () {
            yield createAircraftValidations.validateAsync(request);
            const existAircraft = yield this.aircraftRepository.findAircraftByName(request.name);
            if (existAircraft) {
                throw new conflictException_1.default('Aircraft already taken');
            }
            const aircraftEntity = yield this.aircraftRepository.createAircraft(new aircraft_1.Aircraft({
                name: request.name,
                manufacturingYear: request.manufacturingYear,
                model: request.model
            }));
            yield this.publisher.publishMessage(new flightContract_1.AircraftCreated(aircraftEntity));
            const result = mappings_1.default.map(aircraftEntity, new aircraftDto_1.AircraftDto());
            return result;
        });
    }
};
exports.CreateAircraftHandler = CreateAircraftHandler;
exports.CreateAircraftHandler = CreateAircraftHandler = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)('IPublisher')),
    __param(1, (0, tsyringe_1.inject)('IAircraftRepository')),
    __metadata("design:paramtypes", [Object, Object])
], CreateAircraftHandler);
//# sourceMappingURL=createAircraft.js.map