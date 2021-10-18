import { getRepository, Repository } from "typeorm";
import { ICategoriesRepository, ICreateCategoryDTO } from "@modules/cars/repositories/ICategoriesRepository";
import { Category } from "../entities/Category";




class CategoriesRepository implements ICategoriesRepository {
    private repository: Repository<Category>;

    constructor() {
        this.repository = getRepository(Category)
    }

    async create({ description, name }: ICreateCategoryDTO): Promise<void> {
        const category = this.repository.create({
            name,
            description,
        });

        await this.repository.save(category)
    }
    async list(): Promise<Category[]>{
        return  this.repository.find()
        
    }

    async findByName(name: string): Promise<Category> {
        return  this.repository.findOne({
            name
        })
    }
}

export { CategoriesRepository }