import {MapperConfiguration, MappingPair} from "@dynamic-mapper/mapper";
import {User} from "./entities/user";
import {UserDto} from "./dtos/userDto";

const userToUserDto = new MappingPair<User, UserDto>();

const mapper = new MapperConfiguration(cfg => {
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

export default {
  mapper,
  userToUserDto
};
