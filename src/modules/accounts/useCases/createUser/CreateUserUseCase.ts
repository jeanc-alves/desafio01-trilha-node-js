import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt'

import { AppError } from "@errors/AppError";
import { IUSerRepository } from "@modules/accounts/repositories/IUserRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private userRepository: IUSerRepository
    ) { }

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const userAlreadyExist = await this.userRepository.findByEmail(email)


        if (userAlreadyExist) {
            throw new AppError("User already Exists !")
        }
        const passwordHash = await hash(password, 8)
        await this.userRepository.create({
            name, email, password: passwordHash, driver_license
        })
    }
}
export { CreateUserUseCase }