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
const createUser_1 = require("../../../../src/user/features/v1/createUser/createUser");
const role_1 = require("../../../../src/user/enums/role");
const identityContract_1 = require("building-blocks/contracts/identityContract");
describe('unit test for create user', () => {
    let createUserHandler;
    const user = {
        id: 1,
        name: 'test',
        role: role_1.Role.USER,
        password: 'Admin@1234',
        email: 'test@test.com',
        passportNumber: '123456789',
        isEmailVerified: false,
        createdAt: new Date(),
        tokens: []
    };
    const mockUserRepository = {
        createUser: jest.fn().mockReturnValue(Promise.resolve(user)),
        updateUser: jest.fn(),
        findUsers: jest.fn(),
        findUserByName: jest.fn(),
        findUserByEmail: jest.fn().mockReturnValue(Promise.resolve(undefined)),
        findUserById: jest.fn(),
        getAllUsers: jest.fn(),
        removeUser: jest.fn()
    };
    const mockPublisher = {
        publishMessage: jest.fn(),
        isPublished: jest.fn()
    };
    beforeEach(() => {
        createUserHandler = new createUser_1.CreateUserHandler(mockPublisher, mockUserRepository);
    });
    it('should create a user and retrieve a valid data', () => __awaiter(void 0, void 0, void 0, function* () {
        const createUserRequest = {
            name: 'test',
            role: role_1.Role.USER,
            password: 'Admin@1234',
            email: 'test@test.com',
            passportNumber: '123456789'
        };
        const email = 'test@test.com';
        const userCreated = new identityContract_1.UserCreated(user.id, user.name, user.passportNumber);
        // Mock userRepository's behavior when finding a user by email
        yield mockUserRepository.findUserByEmail(email);
        // Mock userRepository's behavior when creating a user
        yield mockUserRepository.createUser(user);
        // Mock publisher's behavior when publishing a user created
        yield mockPublisher.publishMessage(userCreated);
        const result = yield createUserHandler.handle(createUserRequest);
        // Assertions based on your expected behavior
        expect(mockUserRepository.findUserByEmail).toHaveBeenCalledWith(email);
        expect(mockUserRepository.createUser).toHaveBeenCalledWith(user);
        expect(mockPublisher.publishMessage).toHaveBeenCalledWith(userCreated);
        expect(result).not.toBeNull();
    }));
});
//# sourceMappingURL=createUser.test.js.map