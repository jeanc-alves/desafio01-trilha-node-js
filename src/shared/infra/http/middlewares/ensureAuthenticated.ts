import { NextFunction, Request, Response } from "express";
import { AppError } from "@shared/errors/AppError";

import { verify } from "jsonwebtoken";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "../../../../config/auth";
interface IPayload {
  sub: string;
}

async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  const usersTokensRepository = new UsersTokensRepository();
  const { secret_refresh_token } = auth;

  if (!authHeader) {
    throw new AppError("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, secret_refresh_token) as IPayload;

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    if (!user) {
      throw new AppError("User does not exist!");
    }

    request.user = {
      id: user_id,
    };
    return next();
  } catch (error) {
    throw new AppError("Invalid token");
  }
}

export { ensureAuthenticated };
