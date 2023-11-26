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
Object.defineProperty(exports, "__esModule", { value: true });
const createUser_1 = require("../../../../src/user/features/v1/createUser/createUser");
const identityContract_1 = require("building-blocks/contracts/identityContract");
const faker_1 = require("@faker-js/faker");
const fakeUser_1 = require("../../../shared/fakes/user/fakeUser");
const user_1 = require("../../../../src/user/entities/user");
const fakeCreateUser_1 = require("../../../shared/fakes/user/fakeCreateUser");
const TypeMoq = __importStar(require("typemoq"));
describe('unit test for create user', () => {
    let createUserHandler;
    const fakeUser = fakeUser_1.FakeUser.generate();
    const mockUserRepository = TypeMoq.Mock.ofType();
    const mockPublisher = TypeMoq.Mock.ofType();
    beforeEach(() => {
        createUserHandler = new createUser_1.CreateUserHandler(mockPublisher.object, mockUserRepository.object);
    });
    it('should create a user and retrieve a valid data', () => __awaiter(void 0, void 0, void 0, function* () {
        const email = faker_1.faker.internet.email();
        mockUserRepository
            .setup((x) => x.findUserByEmail(TypeMoq.It.isAnyString()))
            .returns(() => null);
        // Mock userRepository's behavior when creating a user
        mockUserRepository
            .setup((x) => x.createUser(TypeMoq.It.isAnyObject(user_1.User)))
            .returns(() => Promise.resolve(fakeUser));
        // Mock publisher's behavior when publishing a user created
        mockPublisher.setup((x) => x.publishMessage(TypeMoq.It.isAnyObject(identityContract_1.UserCreated))).returns(() => Promise.resolve(null));
        const result = yield createUserHandler.handle(fakeCreateUser_1.FakeCreateUser.generate(fakeUser));
        // Verify that the publishMessage method was called exactly once
        mockUserRepository.verify((x) => x.findUserByEmail(TypeMoq.It.isAnyString()), TypeMoq.Times.once());
        mockPublisher.verify((x) => x.publishMessage(TypeMoq.It.isAnyObject(identityContract_1.UserCreated)), TypeMoq.Times.once());
        mockUserRepository.verify((x) => x.createUser(TypeMoq.It.isAnyObject(user_1.User)), TypeMoq.Times.once());
        expect(result).not.toBeNull();
    }));
});
//# sourceMappingURL=createUser.test.js.map