import Joi, {object} from 'joi';
import { password } from './custom.validation';
import {Role} from "../users/enums/role";

const createUser =
  Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid(Role.USER, Role.ADMIN)
  });

const queryUsers =
  Joi.object({
    page: Joi.number().required(),
    pageSize: Joi.number().required(),
  });


const getUserById = {
  params: Joi.object().keys({
    id: Joi.number().integer()
  })
};

const getUserByEmail = {
  params: Joi.object().keys({
    email: Joi.string().email().required()
  })
};

const updateUserById =
  Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid(Role.USER, Role.ADMIN)
  });


const deleteUserById = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

export default {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById
};
