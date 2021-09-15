import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";

interface IUSerRepository {
    create(Data: ICreateUserDTO): Promise<void>
    findByEmail(email: string): Promise<User>
}

export { IUSerRepository }