"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeUser = void 0;
const faker_1 = require("@faker-js/faker");
const role_1 = require("../../../../src/user/enums/role");
class FakeUser {
    static generate() {
        const user = {
            id: 1,
            name: faker_1.faker.person.fullName(),
            role: role_1.Role.USER,
            password: 'Admin@1234',
            email: faker_1.faker.internet.email(),
            passportNumber: faker_1.faker.string.numeric(9),
            isEmailVerified: false,
            createdAt: faker_1.faker.date.anytime(),
            tokens: []
        };
        return user;
    }
}
exports.FakeUser = FakeUser;
//# sourceMappingURL=fakeUser.js.map