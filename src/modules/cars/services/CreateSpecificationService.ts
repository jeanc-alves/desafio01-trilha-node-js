import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationService {
    constructor(private specificationsRepository: ISpecificationsRepository) {

    }
    execute({ name, description }: IRequest): void {
        const specificationAlreadExists = this.specificationsRepository.findByName(name)

        if (specificationAlreadExists) {
            throw new Error("Specification Alread Exists")
        }

        this.specificationsRepository.create({
            name,
            description
        })
    }
}
export { CreateSpecificationService }