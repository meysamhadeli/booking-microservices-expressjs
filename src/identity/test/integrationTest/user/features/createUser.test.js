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
const initialIntegrationTestFixture_1 = require("../../../shared/fixtures/initialIntegrationTestFixture");
const mediatr_js_1 = require("building-blocks/mediatr-js/mediatr.js");
const identityContract_1 = require("building-blocks/contracts/identityContract");
const fakeCreateUser_1 = require("../../../shared/fakes/user/fakeCreateUser");
describe('integration test for create user', () => {
    let fixture;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        fixture = yield (0, initialIntegrationTestFixture_1.initialIntegrationTestFixture)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield fixture.postgresContainer.stop();
        yield fixture.rabbitmqContainer.stop();
    }));
    it('should create user and retrieve a user from the database', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield mediatr_js_1.mediatrJs.send(fakeCreateUser_1.FakeCreateUser.generate());
        const isPublished = yield fixture.publisher.isPublished(new identityContract_1.UserCreated());
        expect(isPublished).toBe(true);
        const isConsumed = yield fixture.consumer.isConsumed(new identityContract_1.UserCreated());
        expect(isConsumed).toBe(true);
        const user = fixture.userRepository.findUserById(result.id);
        expect(user).not.toBeNull();
    }));
});
//# sourceMappingURL=createUser.test.js.map