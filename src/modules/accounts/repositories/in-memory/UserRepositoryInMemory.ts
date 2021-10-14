import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUSerRepository } from "../IUserRepository";



class UserRepositoryInMemory implements IUSerRepository {
    users: User[] = []


    async create({ name, driver_license, password, email }: ICreateUserDTO): Promise<void> {
        const user = new User()

        Object.assign(user, {
            name, driver_license, password, email
        })

        this.users.push(user)
    }
    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email)
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id)

    }

}

export { UserRepositoryInMemory }