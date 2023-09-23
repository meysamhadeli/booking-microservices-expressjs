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
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialIntegrationTestFixture = void 0;
const app_1 = require("../../src/app");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, exports.initialIntegrationTestFixture)();
    console.log('before all test');
}));
// After all tests
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('after all test');
}));
const initialIntegrationTestFixture = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, app_1.startupApp)();
});
exports.initialIntegrationTestFixture = initialIntegrationTestFixture;
//# sourceMappingURL=initialIntegrationTestFixture.js.map