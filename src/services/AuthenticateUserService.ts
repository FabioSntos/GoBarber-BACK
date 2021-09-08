import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";

import User from "../models/User";

interface Request {
  email: string;
  password: string;
}

interface ResponseUser {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<ResponseUser> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error("Incorrect email/password Combination");
    }
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("Incorrect email/password Combination");
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
