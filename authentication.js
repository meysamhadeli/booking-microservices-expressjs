"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressAuthentication = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("./src/config/config"));
const unauthorizedError_1 = __importDefault(require("./src/types/unauthorizedError"));
function expressAuthentication(request, securityName, scopes) {
    if (securityName === "api_key") {
        let token;
        if (request.query && request.query.access_token) {
            token = request.query.access_token;
        }
    }
    if (securityName === "jwt") {
        let token = request.body.token ||
            request.query.token ||
            request.headers["x-access-token"];
        // Get the "Authorization" header from the request
        const authorizationHeader = request.headers['authorization'];
        if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
            token = authorizationHeader.split(' ')[1];
        }
        else {
            throw new unauthorizedError_1.default("Unauthorized");
        }
        return new Promise((resolve, reject) => {
            if (!token) {
                reject(new unauthorizedError_1.default("Unauthorized"));
            }
            jwt.verify(token, config_1.default.jwt.secret, function (err, decoded) {
                var _a;
                if (err) {
                    reject(new unauthorizedError_1.default("Unauthorized"));
                }
                else {
                    // Check if JWT contains all required scopes
                    if (scopes != undefined) {
                        for (let scope of scopes) {
                            if (!((_a = decoded === null || decoded === void 0 ? void 0 : decoded.scopes) === null || _a === void 0 ? void 0 : _a.includes(scope))) {
                                reject(new unauthorizedError_1.default("Unauthorized: JWT does not contain required scope."));
                            }
                        }
                    }
                    resolve(decoded);
                }
            });
        });
    }
    // If securityName is neither "api_key" nor "jwt", return a promise that rejects
    return Promise.reject(new unauthorizedError_1.default("Unauthorized"));
}
exports.expressAuthentication = expressAuthentication;
//# sourceMappingURL=authentication.js.map