import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

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
    } catch (error) {
        throw new AppError("Invalid token")
    }



}

export { ensureAuthenticated }