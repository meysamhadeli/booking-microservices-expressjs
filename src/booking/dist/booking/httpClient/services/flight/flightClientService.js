"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightClientService = void 0;
const axios_1 = __importDefault(require("axios"));
const httpClientException_1 = __importDefault(require("building-blocks/types/exception/httpClientException"));
const authentication_1 = require("../../../../configurations/authentication");
class FlightClientService {
    constructor() {
        this.flightUrl = 'http://localhost:4002';
    }
    async getFlightById(id) {
        var _a;
        const result = axios_1.default
            .get(`${this.flightUrl}/flight/v1/get-by-id?id=${id}`, {
            headers: {
                Authorization: (_a = authentication_1.httpContext.request.headers.authorization) === null || _a === void 0 ? void 0 : _a.toString()
            }
        })
            .then((response) => {
            const flightDto = response.data;
            return flightDto;
        })
            .catch((error) => {
            throw new httpClientException_1.default(error);
        });
        return result;
    }
    async getAvalibaleSeats(flightId) {
        var _a;
        const result = axios_1.default
            .get(`${this.flightUrl}/seat/v1/get-available-seats?flightId=${flightId}`, {
            headers: {
                Authorization: (_a = authentication_1.httpContext.request.headers.authorization) === null || _a === void 0 ? void 0 : _a.toString()
            }
        })
            .then((response) => {
            const seatDtos = response.data;
            return seatDtos;
        })
            .catch((error) => {
            throw new httpClientException_1.default(error);
        });
        return result;
    }
    async reserveSeat(request) {
        var _a;
        const result = axios_1.default
            .post(`${this.flightUrl}/seat/v1/reserve`, request, {
            headers: {
                Authorization: (_a = authentication_1.httpContext.request.headers.authorization) === null || _a === void 0 ? void 0 : _a.toString()
            }
        })
            .then((response) => { })
            .catch((error) => {
            throw new httpClientException_1.default(error);
        });
    }
}
exports.FlightClientService = FlightClientService;
//# sourceMappingURL=flightClientService.js.map