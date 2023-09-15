"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mapper_1 = require("@dynamic-mapper/mapper");
const userToUserDto = new mapper_1.MappingPair();
const mapper = new mapper_1.MapperConfiguration(cfg => {
    cfg.createMap(userToUserDto, {
        email: opt => opt.mapFrom(src => src.email),
        isEmailVerified: opt => opt.mapFrom(src => src.isEmailVerified),
        role: opt => opt.mapFrom(src => src.role),
        name: opt => opt.mapFrom(src => src.name),
        id: opt => opt.mapFrom(src => src.id),
        createdAt: opt => opt.mapFrom(src => src.createdAt),
        updatedAt: opt => opt.mapFrom(src => src.updatedAt)
    });
}).createMapper();
exports.default = {
    mapper,
    userToUserDto
};
//# sourceMappingURL=mapping.js.map