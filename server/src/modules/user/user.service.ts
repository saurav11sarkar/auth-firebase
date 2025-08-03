import config from "../../config";
import { IUser } from "./user.interface";
import User from "./user.model";
import jwt, { Secret } from "jsonwebtoken";

const generatePassword = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const createUserSocial = async (payload: IUser) => {
  let user = await User.findOne({ email: payload.email });

  if (!user) {
    user = await User.create({
      ...payload,
      password: generatePassword(),
    });
  }

  const accessToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    config.jwt.jwt_secret as Secret,
    { expiresIn: config.jwt.jwt_expires_in as any }
  );

  const refreshToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    },
    config.jwt.jwt_secret_refresh as Secret,
    { expiresIn: config.jwt.jwt_expires_in_refresh as any }
  );

  return { user, accessToken, refreshToken };
};

const getUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

export const userService = {
  createUserSocial,
  getUser,
};
