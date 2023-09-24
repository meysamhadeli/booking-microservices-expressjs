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
require("reflect-metadata");
const initialIntegrationTestFixture_1 = require("../../../shared/initialIntegrationTestFixture");
describe('Integration Test', () => {
    let fixture;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        fixture = yield (0, initialIntegrationTestFixture_1.initialIntegrationTestFixture)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.postgresContainer.stop();
        yield fixture.rabbitmqContainer.stop();
    }));
    it('should create user and retrieve a user from the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const usersEntity = yield fixture.userRepository.findUserById(1);
        console.log('hiii');
    }));
});
//# sourceMappingURL=createUser.test.js.map