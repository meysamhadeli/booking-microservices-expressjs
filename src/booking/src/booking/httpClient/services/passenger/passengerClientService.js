"use strict";
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
exports.PassengerClientService = void 0;
const axios_1 = __importDefault(require("axios"));
const httpClientException_1 = __importDefault(require("building-blocks/types/exception/httpClientException"));
const authentication_1 = require("../../../../configurations/authentication");
class PassengerClientService {
    constructor() {
        this.passengerUrl = 'http://localhost:4001';
    }
    getPassengerById(id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = axios_1.default
                .get(`${this.passengerUrl}/passenger/v1/get-by-id?id=${id}`, {
                headers: {
                    Authorization: (_a = authentication_1.httpContext.request.headers.authorization) === null || _a === void 0 ? void 0 : _a.toString()
                }
            })
                .then((response) => {
                const passengerDto = response.data;
                return passengerDto;
            })
                .catch((error) => {
                throw new httpClientException_1.default(error);
            });
            return result;
        });
    }
}
exports.PassengerClientService = PassengerClientService;
//# sourceMappingURL=passengerClientService.js.map