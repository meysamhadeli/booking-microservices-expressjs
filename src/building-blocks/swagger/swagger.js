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
exports.initialSwagger = void 0;
const path_1 = __importDefault(require("path"));
const reflection_1 = require("../utils/reflection");
const logger_1 = __importDefault(require("../logging/logger"));
const swaggerUi = __importStar(require("swagger-ui-express"));
const initialSwagger = (app) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Define the path to your single Swagger JSON file
        const swaggerFilePath = path_1.default.join(process.cwd(), 'src/docs', 'swagger.json');
        // Load the Swagger JSON document
        const swaggerDocument = require(swaggerFilePath);
        // Check if securityDefinitions exists in the Swagger document
        if ((0, reflection_1.isEmptyObject)(swaggerDocument.components.securitySchemes)) {
            // If it doesn't exist, add your security scheme here
            swaggerDocument.components.securitySchemes = {
                jwt: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            };
        }
        app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        return swaggerDocument;
    }
    catch (error) {
        logger_1.default.error(error);
    }
});
exports.initialSwagger = initialSwagger;
//# sourceMappingURL=swagger.js.map