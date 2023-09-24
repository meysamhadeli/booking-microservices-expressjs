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
const role_1 = require("../../../../src/user/enums/role");
const request = require('supertest');
describe('End To End Test', () => {
    let fixture;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        fixture = yield (0, initialIntegrationTestFixture_1.initialIntegrationTestFixture)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.postgresContainer.stop();
        yield fixture.rabbitmqContainer.stop();
    }));
    it('should create user and retrieve a user from the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserRequestDto = {
            email: 'test@test.com',
            password: 'Admin@1234',
            name: 'test',
            role: role_1.Role.USER,
            passportNumber: '123456789'
        };
        const createUserResponse = yield request(fixture.app)
            .post('/user/v1/create')
            .send(createUserRequestDto)
            .expect(201);
    }));
});
//# sourceMappingURL=createUser.test.js.map