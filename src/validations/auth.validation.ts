import Joi from 'joi';
import {password} from './custom.validation';

const login =
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password)
  });


const logout = {
  params: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

const refreshToken = {
  params: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};


export default {
  login,
  logout,
  refreshToken
};
