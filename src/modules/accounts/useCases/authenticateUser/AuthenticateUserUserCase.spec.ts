import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUserCase";

import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

let userRepositoryInMemory: UserRepositoryInMemory
let createUserUseCase: CreateUserUseCase
let authenticateUserUseCase: AuthenticateUserUseCase

describe("Authenticate User", () => {
    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemory()
        createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory)
    })

    it("Shoud be able authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "1231231",
            email: "test@test.com",
            name: "test",
            password: "senha123",
        }

        await createUserUseCase.execute(user)

        const resultado = await authenticateUserUseCase.execute({ email: user.email, password: user.password })

        expect(resultado).toHaveProperty("token")
    })

    it("Shoud not be able authenticate nonexists user", () => {
        expect(async () => {
            const user = await authenticateUserUseCase.execute({
                email: "email@errado.com",
                password: "1234"
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("Should not be able authenticate a user with incorrect password", () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: "User Test Error",
                password: "senha123",
                email: "test@error.com",
                driver_license: "2135468"
            }

            await createUserUseCase.execute(user)

            await authenticateUserUseCase.execute({
                email: user.email, password: "1321"
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})