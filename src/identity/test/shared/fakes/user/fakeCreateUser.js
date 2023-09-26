"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeCreateUser = void 0;
const faker_1 = require("@faker-js/faker");
const role_1 = require("../../../../src/user/enums/role");
class FakeCreateUser {
    static generate(user) {
        var _a, _b, _c, _d, _e;
        const createUser = {
            name: (_a = user === null || user === void 0 ? void 0 : user.name) !== null && _a !== void 0 ? _a : faker_1.faker.person.fullName(),
            role: (_b = user === null || user === void 0 ? void 0 : user.role) !== null && _b !== void 0 ? _b : role_1.Role.USER,
            password: (_c = user === null || user === void 0 ? void 0 : user.password) !== null && _c !== void 0 ? _c : 'Admin@1234',
            email: (_d = user === null || user === void 0 ? void 0 : user.email) !== null && _d !== void 0 ? _d : faker_1.faker.internet.email(),
            passportNumber: (_e = user === null || user === void 0 ? void 0 : user.passportNumber) !== null && _e !== void 0 ? _e : faker_1.faker.string.numeric(9)
        };
        return createUser;
    }
}
exports.FakeCreateUser = FakeCreateUser;
//# sourceMappingURL=fakeCreateUser.js.map