import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExist = await this.userRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new AppError("User already Exists !");
    }
    const passwordHash = await hash(password, 8);
    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    });
  }
}
export { CreateUserUseCase };
