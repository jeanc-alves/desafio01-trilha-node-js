import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"
import {inject,injectable} from 'tsyringe'


interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository) {}

    async execute ({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExist = await this.categoriesRepository.findByName(name)

        if (categoryAlreadyExist) {
            throw new Error("Category Already Exists")
        }
         await this.categoriesRepository.create({ name, description })
    }
}
export { CreateCategoryUseCase }