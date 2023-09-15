import bcrypt from 'bcryptjs';
import config from "../config/config";
import moment from "moment";
import jwt from "jsonwebtoken";
import {TokenType} from "../identities/enums/tokenType";

export const encryptPassword = async (password: string) => {
  const encryptedPassword = await bcrypt.hash(password, 8);
  return encryptedPassword;
};

export const isPasswordMatch = async (password: string, userPassword: string) => {
  return bcrypt.compare(password, userPassword);
};

export const generateJwtToken = (
  userId: number,
  expires: number,
  type: TokenType,
  secret = config.jwt.secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires,
    type
  };
  return jwt.sign(payload, secret);
};
