"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pick_1 = __importDefault(require("../utils/pick"));
const joi_1 = __importDefault(require("joi"));
const applicationError_1 = __importDefault(require("../types/applicationError"));
const validate = (schema) => (req, res, next) => {
    const validSchema = (0, pick_1.default)(schema, ['params', 'query', 'body']);
    const obj = (0, pick_1.default)(req, Object.keys(validSchema));
    const { value, error } = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(obj);
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        return next(new applicationError_1.default(errorMessage));
    }
    Object.assign(req, value);
    return next();
};
exports.default = validate;
//# sourceMappingURL=validate.js.map