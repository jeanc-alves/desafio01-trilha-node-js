import { NextFunction, Request, Response } from "express";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

import { verify } from "jsonwebtoken";




interface IPayload {
    sub: string
}


async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError("Token missing")
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, "c053edb3641fee928b29a5e5edc25e1c") as IPayload

        const usersRepository = new UsersRepository()

        const user = usersRepository.findById(user_id)

        if (!user) {
            throw new AppError("User does not exist!")
        }

        next()

        request.user = {
            id: user_id
        }
    } catch (error) {
        throw new AppError("Invalid token")
    }



}

export { ensureAuthenticated }